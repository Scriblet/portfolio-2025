# Endpoint de contato (`POST /api/contact`)

Documentação operacional da Netlify Function que recebe o formulário de contato
e encaminha a mensagem para o Discord.

- Implementação: `netlify/functions/contact.mjs`
- Cliente: `src/pages/formContact/contactForm.tsx`
- Configuração de deploy: `netlify.toml`
- Segredo: `DISCORD_WEBHOOK_URL` (server-only, **nunca** com prefixo `VITE_`)

O webhook não existe mais no bundle do navegador. Qualquer URL de webhook
encontrada em `src/` é um vazamento e deve ser removida/rotacionada.

---

## 1. Contrato HTTP

### Requisição

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Maria Silva",
  "email": "maria@exemplo.com",
  "message": "Olá, gostaria de conversar sobre uma oportunidade.",
  "website": ""
}
```

| Campo     | Tipo   | Regras                                                        |
| --------- | ------ | ------------------------------------------------------------- |
| `name`    | string | obrigatório, 1–100 caracteres (após `trim`)                   |
| `email`   | string | obrigatório, formato de email válido, até 254 caracteres      |
| `message` | string | obrigatório, 1–2000 caracteres (após `trim`)                  |
| `website` | string | honeypot: deve estar vazio/ausente. Se preenchido, é descartado |

O servidor é a autoridade da validação; o cliente replica as mesmas regras
apenas para dar feedback rápido.

### Respostas

Todas as respostas são JSON com `Cache-Control: no-store`.

| Status | Corpo                                   | Quando                                                     |
| ------ | --------------------------------------- | ---------------------------------------------------------- |
| `200`  | `{"ok":true}`                           | mensagem aceita (ou honeypot preenchido — descarte silencioso) |
| `204`  | vazio                                   | preflight `OPTIONS` (CORS) — nunca valida payload nem chama o Discord |
| `400`  | `{"ok":false,"error":"invalid_payload"}`| JSON inválido ou campo fora das regras                     |
| `405`  | `{"ok":false,"error":"method_not_allowed"}` | método diferente de `POST`/`OPTIONS` (header `Allow: POST, OPTIONS`) |
| `429`  | `{"ok":false,"error":"rate_limited"}`   | mais de 5 requisições por IP em 1 minuto (header `Retry-After: 60`) |
| `502`  | `{"ok":false,"error":"upstream_error"}` | Discord recusou, timeout (8s) ou falha de rede             |
| `503`  | `{"ok":false,"error":"not_configured"}` | `DISCORD_WEBHOOK_URL` ausente/inválida no ambiente         |

Nenhuma resposta expõe stack trace, corpo do Discord ou dados do visitante.

### Mensagem enviada ao Discord

```json
{
  "content": "📬 Nova mensagem do formulário de contato!",
  "embeds": [
    {
      "title": "Detalhes do Contato",
      "fields": [
        { "name": "Nome", "value": "Maria Silva" },
        { "name": "Email", "value": "maria@exemplo.com" },
        { "name": "Mensagem", "value": "Olá, gostaria de conversar..." }
      ],
      "color": 5814783
    }
  ]
}
```

Valores de embed são truncados em 1020 caracteres (limite do Discord: 1024).

---

## 2. Rate limit

- Janela deslizante de **60 segundos**, **5 requisições por IP**.
- IP obtido de `x-nf-client-connection-ip` (preenchido pela Netlify) com
  fallback para o primeiro valor de `x-forwarded-for`.
- Estado **em memória** do processo da função. Em cenários de múltiplas
  instâncias, o limite é por instância — suficiente para conter spam simples,
  não é uma garantia distribuída. Se isso virar problema, migrar para
  Netlify Blobs/Upstash.
- Ao exceder: `429` + `Retry-After: 60`.

---

## 3. Configurar a variável no Netlify

1. Netlify → **Site configuration** → **Environment variables** → **Add a variable**.
2. Key: `DISCORD_WEBHOOK_URL`
3. Value: a URL completa do webhook do Discord
   (`https://discord.com/api/webhooks/<id>/<token>`).
4. Escopos: marque pelo menos **Functions** (e **Builds** se quiser usar
   `netlify dev`/builds). Não é necessário expor ao runtime do navegador.
5. Faça um novo deploy (ou "Clear cache and deploy site") para o valor valer.

Via CLI:

```bash
netlify env:set DISCORD_WEBHOOK_URL "https://discord.com/api/webhooks/<id>/<token>"
netlify env:list
```

> ⚠️ Nunca crie `VITE_DISCORD_WEBHOOK_URL`. Variáveis `VITE_*` são injetadas
> no bundle público pelo Vite.

---

## 4. Testar localmente

Pré-requisitos: Node 22.19+, Netlify CLI (`npm i -g netlify-cli`).

1. Copie `.env.example` para `.env` e preencha `DISCORD_WEBHOOK_URL`.
2. Rode:

   ```bash
   netlify dev
   ```

   O CLI sobe o Vite e serve as functions em `http://localhost:8888`,
   roteando `POST /api/contact` para `netlify/functions/contact.mjs`.

3. Teste o contrato:

   ```bash
   # sucesso
   curl -i -X POST http://localhost:8888/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Teste","email":"teste@exemplo.com","message":"Olá!"}'

   # payload inválido -> 400
   curl -i -X POST http://localhost:8888/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Teste"}'

   # método errado -> 405
   curl -i http://localhost:8888/api/contact

   # honeypot -> 200 sem enviar nada
   curl -i -X POST http://localhost:8888/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Bot","email":"bot@exemplo.com","message":"spam","website":"http://spam"}'
   ```

4. Para exercitar o `429`, dispare 6 POSTs seguidos do mesmo IP.

> `npm run dev` (Vite puro) **não** serve a function: o formulário responderá
> erro genérico nesse modo. Use `netlify dev` para testar o fluxo completo.

---

## 5. Rotação do webhook

Se a URL vazar (histórico do Git, print, log etc.):

1. Discord → **Server Settings** → **Integrations** → **Webhooks** →
   **Delete** o webhook comprometido (ou **Regenerate URL**).
2. Crie/regenerate o webhook e copie a nova URL.
3. Atualize `DISCORD_WEBHOOK_URL` no Netlify
   (`netlify env:set ...`) e redeploy.
4. Atualize o `.env` local.
5. Confirme que `grep -rn "discord.com/api/webhooks" src` continua vazio.

O token antigo deixa de funcionar assim que o webhook é deletado/regenerado.

---

## 6. Deploy com o site estático no GitHub Pages

O site é publicado em `https://scriblet.github.io/portfolio-2025/` (GitHub Pages,
100% estático). **Não existe function no GitHub Pages**: por isso
`POST /api/contact` responde 404 lá. A função roda em um deploy separado no
Netlify, e o cliente precisa apontar para ela.

### 6.1 Configurar o endpoint no cliente

No build do GitHub Actions, defina a variável de repositório
**Settings → Secrets and variables → Actions → Variables**:

| Nome                    | Exemplo                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT` | `https://lucas-contato.netlify.app/api/contact`             |

O workflow já a repassa ao build (`deploy.yml`). Sem a variável, o fallback é
`/api/contact` (útil só em `netlify dev`).

Localmente, copie `.env.example` → `.env` e defina o mesmo valor para testar o
endpoint remoto.

### 6.2 Publicar somente as functions

Crie um segundo site Netlify ligado ao mesmo repositório e configure em
**Site configuration → Build & deploy**:

- **Build command:** vazio
- **Publish directory:** `public`
- **Functions directory:** `netlify/functions`

Ou, via CLI, a partir da raiz do repositório:

```bash
netlify deploy --prod --dir=public --functions=netlify/functions
```

Configure `DISCORD_WEBHOOK_URL` nesse site (seção 3) e, se necessário,
`CONTACT_ALLOWED_ORIGINS` (seção 6.3).

### 6.3 CORS

Como o site e a função ficam em origens diferentes, a função responde CORS
apenas para origens autorizadas:

- Padrão: `https://scriblet.github.io` e `https://lucasnonato.site`.
- Extras: variável `CONTACT_ALLOWED_ORIGINS`, separada por vírgula
  (ex.: `http://localhost:5173`).
- Requisições de origem não autorizada continuam funcionando server-to-server
  (sem header `Access-Control-Allow-Origin`), mas o navegador bloqueia a leitura.

### 6.4 Verificação em produção

```bash
# deve responder 204 com Access-Control-Allow-Origin
curl -i -X OPTIONS https://<site-functions>.netlify.app/api/contact \
  -H "Origin: https://scriblet.github.io" \
  -H "Access-Control-Request-Method: POST"

# deve responder 400 (payload vazio), não 404
curl -i -X POST https://<site-functions>.netlify.app/api/contact \
  -H "Content-Type: application/json" -d '{}'
```

---

## 7. Observabilidade e privacidade

- Logs da function registram apenas `[contact] status=<código> at=<timestamp>`
  e erros genéricos de configuração/upstream.
- Nome, email e mensagem **não** são logados.
- O cliente exibe mensagens genéricas; detalhes ficam no log do servidor.
- O cliente só considera sucesso quando a resposta é `200` **e** o corpo é
  `{"ok":true}`. Isso evita falso positivo caso a function não esteja publicada
  e o fallback da SPA devolva `index.html` com status 200.

---

## 8. Testes

- E2E com mock de rota: `cypress/e2e/contact-form.cy.ts`
  (`cy.interceptContact(...)`) — cobrem sucesso, erro, rate limit, validação
  client-side e payload enviado, sem depender do Discord.
- Teste manual do endpoint real: `netlify dev` + `curl` (seção 4).

```bash
# terminal 1
npm run dev:test

# terminal 2 — um spec por vez (ver docs/agents/testing.md)
npm run test:e2e:spec -- cypress/e2e/contact-form.cy.ts
```
