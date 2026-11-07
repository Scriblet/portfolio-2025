import { test, expect, type Page } from "@playwright/test";

/**
 * E2E do formulário de contato com `POST /api/contact` mockado.
 * Não depende do Discord nem da Netlify Function real.
 */

const fillForm = async (
  page: Page,
  values: { nome?: string; email?: string; message?: string } = {},
) => {
  const nome = values.nome ?? "Maria Silva";
  const email = values.email ?? "maria@exemplo.com";
  const message = values.message ?? "Olá, gostaria de conversar.";

  await page.getByLabel("Nome").fill(nome);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Mensagem").fill(message);
};

const goToContact = async (page: Page) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
};

test.describe("Formulário de contato — POST /api/contact", () => {
  test("envia payload válido e mostra sucesso", async ({ page }) => {
    let payload: Record<string, unknown> | null = null;

    await page.route("**/api/contact", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(
      page.getByText("Obrigado! Vou responder em breve."),
    ).toBeVisible();

    expect(payload).toMatchObject({
      name: "Maria Silva",
      email: "maria@exemplo.com",
      message: "Olá, gostaria de conversar.",
      website: "",
    });

    // Campos limpos após sucesso.
    await expect(page.getByLabel("Nome")).toHaveValue("");
    await expect(page.getByLabel("Email")).toHaveValue("");
    await expect(page.getByLabel("Mensagem")).toHaveValue("");
  });

  test("valida campos no cliente e não chama a API", async ({ page }) => {
    let requests = 0;

    await page.route("**/api/contact", async (route) => {
      requests += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await goToContact(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.getByText("Informe seu nome.")).toBeVisible();
    await expect(page.getByText("Informe seu email.")).toBeVisible();
    await expect(page.getByText("Escreva sua mensagem.")).toBeVisible();

    // Acessibilidade: helperText ligado ao input via aria-describedby.
    await expect(page.getByLabel("Nome")).toHaveAttribute(
      "aria-describedby",
      /helper-text/,
    );

    expect(requests).toBe(0);
  });

  test("rejeita email com formato inválido sem enviar", async ({ page }) => {
    let requests = 0;

    await page.route("**/api/contact", async (route) => {
      requests += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await goToContact(page);
    await fillForm(page, { email: "nao-e-email" });
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.getByText("Informe um email válido.")).toBeVisible();
    expect(requests).toBe(0);
  });

  test("mostra erro genérico em falha do servidor e preserva os campos", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "upstream_error" }),
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(
      page.getByText("Não foi possível enviar. Tente novamente."),
    ).toBeVisible();

    // Retry amigável: conteúdo continua preenchido.
    await expect(page.getByLabel("Nome")).toHaveValue("Maria Silva");
    await expect(page.getByLabel("Email")).toHaveValue("maria@exemplo.com");
    await expect(page.getByLabel("Mensagem")).toHaveValue(
      "Olá, gostaria de conversar.",
    );
  });

  test("mostra aviso de rate limit no 429", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        headers: { "Retry-After": "60" },
        body: JSON.stringify({ ok: false, error: "rate_limited" }),
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(
      page.getByText(
        "Muitas tentativas. Aguarde um minuto e tente novamente.",
      ),
    ).toBeVisible();
  });

  test("não mostra sucesso se a resposta 200 não for o JSON do contrato", async ({
    page,
  }) => {
    // Cenário de fallback da SPA (function não publicada): 200 com HTML.
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<!doctype html><html><body>index</body></html>",
      });
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(
      page.getByText("Não foi possível enviar. Tente novamente."),
    ).toBeVisible();
  });

  test("mostra erro genérico em falha de rede", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.abort("failed");
    });

    await goToContact(page);
    await fillForm(page);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(
      page.getByText("Não foi possível enviar. Tente novamente."),
    ).toBeVisible();
  });
});
