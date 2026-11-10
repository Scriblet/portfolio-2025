# PRD: Segurança do formulário de contato

Status: ready-for-agent
Feature slug: `seguranca-contato`

## Problem Statement

Como mantenedor, o webhook do Discord está hardcoded no cliente (`DISCORD_WEBHOOK` em `contactForm.tsx`), qualquer visitante pode inspecionar o bundle, extrair a URL e fazer spam/phishing. Além disso, sem validação de servidor nem rate limit, o formulário é vulnerável e pode expor dados.

## Solution

Remover webhook do cliente, expor endpoint mínimo em Netlify Function (`/api/contact`) que valida payload, aplica rate limit e envia ao Discord com segredo via env, mantendo mesma UX, porém segura e auditável.

## User Stories

1. Como visitante, quero ver o mesmo formulário e campos (nome, email, mensagem) pós-migração, para não reaprender.
2. Como visitante, quero validação de email e mensagem obrigatória no cliente e servidor, para feedback claro.
3. Como visitante, quero sucesso/erro exibido via snackbar (ver `snackbar-contato`) com mensagem amigável.
4. Como mantenedor, quero webhook fora do bundle, para não vazar segredo.
5. Como mantenedor, quero webhook em env `DISCORD_WEBHOOK_URL` no servidor, para rotação fácil.
6. Como mantenedor, quero endpoint `POST /api/contact` com schema, para rejeitar payload malformado com 400.
7. Como mantenedor, quero rate limit básico (ex: 5/min/IP), para mitigar spam.
8. Como mantenedor, quero honeypot/campo invisível ou validação de tamanho, para bots simples.
9. Como visitante, quero formulário protegido por reCAPTCHA/Turnstile opcional, para não penalizar humanos.
10. Como mantenedor, quero log server-side sem dados sensíveis, para debug.
11. Como mantenedor, quero teste E2E mockando `/api/contact`, para não depender de Discord em CI.
12. Como visitante, quero retry amigável se rede falhar, para não perder mensagem.
13. Como mantenedor, quero telemetria de sucesso via GA4, para medir conversão.
14. Como mantenedor, quero documentação de deploy Netlify Function, para setup reproducible.
15. Como usuário, quero acessibilidade (labels, `aria-describedby` para erro), para navegação por teclado/leitor.

## Implementation Decisions

- **Seam principal:** Serviço/API: contrato HTTP `POST /api/contact` + E2E com stub.
- **Seam secundário:** Componente: `contactForm.tsx` passa a `fetch('/api/contact')`.
- Módulos afetados: nova função `netlify/functions/contact.ts`, `src/pages/formContact/contactForm.tsx`, `src/services/analytics.ts` (eventos já existentes), `.env.example`, `netlify.toml`.
- Decisões:
  - Validação compartilhada: cliente usa mesma regra mínima; servidor é autoridade (zod ou manual).
  - Rate limit in-memory por IP (simples) com `429 Retry-After`.
  - Sem concorrência de dados: endpoint stateless.
  - Token/Discord URL apenas em env server-side, nunca prefixado `VITE_`.
  - Fallback: se função indisponível, exibe erro genérico sem expor detalhes.
- Protótipo: não se aplica.

## Testing Decisions

- Bom teste = contrato HTTP externo (status, shape) + comportamento do form (loading, erro, sucesso).
- Testar em: E2E Playwright com mock de rota + teste manual da function via `netlify dev`.
- Priors: asserts de `tests/app.spec.ts` (Contact Form) para `input`, `textarea`, botão Enviar.
- Casos: 200 com payload válido, 400 sem email/mensagem, 429 sob flood, bundle não contém webhook, snackbar exibe.

## Out of Scope

- EmailJS/Formspree como backend final.
- Persistência em banco, autenticação, captcha completo.
- Resposta automática por email.

## Further Notes

- Co-design com `snackbar-contato`.
- Reduz risco de spam que hoje é crítico (webhook público).
