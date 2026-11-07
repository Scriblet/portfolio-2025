/**
 * POST /api/contact
 *
 * Netlify Functions v2 (modern handler signature).
 * Recebe o formulário de contato, valida no servidor e encaminha ao Discord.
 *
 * O webhook NUNCA é exposto ao cliente: vive apenas em
 * `process.env.DISCORD_WEBHOOK_URL` (sem prefixo VITE_).
 *
 * Contrato: ver docs/CONTACT-ENDPOINT.md
 */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const DISCORD_TIMEOUT_MS = 8_000;
const EMBED_COLOR = 5814783;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const DISCORD_FIELD_VALUE_MAX = 1020; // limite do Discord é 1024

// Regex simples e deliberadamente permissiva: o servidor não é autoridade
// sobre a existência do endereço, apenas sobre o formato.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** @type {Map<string, number[]>} */
const rateLimitStore = new Map();

const json = (status, body, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });

/** Log seguro: apenas status HTTP e timestamp, nunca dados do visitante. */
const log = (status) => {
  console.log(`[contact] status=${status} at=${new Date().toISOString()}`);
};

const getClientIp = (req) => {
  const netlifyIp = req.headers.get("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp.trim();

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
};

/** Janela deslizante de 1 minuto por IP. Retorna true quando o limite estourou. */
const isRateLimited = (ip) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const hits = (rateLimitStore.get(ip) ?? []).filter((t) => t > windowStart);
  hits.push(now);
  rateLimitStore.set(ip, hits);

  // Limpeza oportunista para o Map não crescer indefinidamente.
  if (rateLimitStore.size > 5000) {
    for (const [key, timestamps] of rateLimitStore) {
      if (!timestamps.some((t) => t > windowStart)) rateLimitStore.delete(key);
    }
  }

  return hits.length > RATE_LIMIT_MAX;
};

const truncate = (value, max) =>
  value.length > max ? `${value.slice(0, max - 1)}…` : value;

/**
 * Lê e valida o corpo da requisição.
 * @returns {Promise<
 *   | { ok: true, honeypot: true }
 *   | { ok: true, honeypot: false, name: string, email: string, message: string }
 *   | { ok: false }
 * >}
 */
const readPayload = async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return { ok: false };
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false };
  }

  const { name, email, message, website } = body;

  // Honeypot: bots costumam preencher tudo. Responde sucesso falso e descarta.
  if (website !== undefined && website !== null) {
    if (typeof website !== "string") return { ok: false };
    if (website.trim() !== "") return { ok: true, honeypot: true };
  }

  if (typeof name !== "string") return { ok: false };
  if (typeof email !== "string") return { ok: false };
  if (typeof message !== "string") return { ok: false };

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (cleanName.length < 1 || cleanName.length > MAX_NAME) return { ok: false };
  if (cleanEmail.length < 1 || cleanEmail.length > MAX_EMAIL) return { ok: false };
  if (!EMAIL_RE.test(cleanEmail)) return { ok: false };
  if (cleanMessage.length < 1 || cleanMessage.length > MAX_MESSAGE) {
    return { ok: false };
  }

  return {
    ok: true,
    honeypot: false,
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
  };
};

const buildDiscordPayload = ({ name, email, message }) => ({
  content: "📬 Nova mensagem do formulário de contato!",
  embeds: [
    {
      title: "Detalhes do Contato",
      fields: [
        { name: "Nome", value: truncate(name, DISCORD_FIELD_VALUE_MAX) },
        { name: "Email", value: truncate(email, DISCORD_FIELD_VALUE_MAX) },
        { name: "Mensagem", value: truncate(message, DISCORD_FIELD_VALUE_MAX) },
      ],
      color: EMBED_COLOR,
    },
  ],
});

const getWebhookUrl = () => {
  const raw = process.env.DISCORD_WEBHOOK_URL;
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const host = url.hostname;
    if (host !== "discord.com" && host !== "discordapp.com") return null;
    if (!url.pathname.startsWith("/api/webhooks/")) return null;
    return url.toString();
  } catch {
    return null;
  }
};

export default async (req) => {
  if (req.method !== "POST") {
    log(405);
    return json(
      405,
      { ok: false, error: "method_not_allowed" },
      { Allow: "POST" },
    );
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    log(429);
    return json(
      429,
      { ok: false, error: "rate_limited" },
      { "Retry-After": "60" },
    );
  }

  const payload = await readPayload(req);

  if (!payload.ok) {
    log(400);
    return json(400, { ok: false, error: "invalid_payload" });
  }

  // Honeypot preenchido: 200 falso, nada é enviado.
  if (payload.honeypot) {
    log(200);
    return json(200, { ok: true });
  }

  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    console.error(
      "[contact] DISCORD_WEBHOOK_URL ausente ou inválida; mensagem não enviada.",
    );
    log(503);
    return json(503, { ok: false, error: "not_configured" });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DISCORD_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildDiscordPayload(payload)),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`[contact] Discord respondeu ${response.status}.`);
      log(502);
      return json(502, { ok: false, error: "upstream_error" });
    }

    log(200);
    return json(200, { ok: true });
  } catch {
    // Timeout, DNS, rede: detalhes nunca vão para o cliente.
    console.error("[contact] Falha de rede ao enviar para o Discord.");
    log(502);
    return json(502, { ok: false, error: "upstream_error" });
  } finally {
    clearTimeout(timer);
  }
};

export const config = {
  path: "/api/contact",
};
