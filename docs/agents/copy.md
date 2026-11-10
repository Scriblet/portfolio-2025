# Copy rules

## Em dash is off limits

O travessão (em dash, o caractere **U+2014**, aquele traço longo) é proibido em
todo texto do repositório: copy do site, dados, comentários, PRDs, README e
mensagens de script. No lugar dele, use o sinal que a frase pede:

| Situação | Use | Exemplo |
| --- | --- | --- |
| Explicação ou consequência | vírgula | `Sete regras para decidir, não para decorar.` |
| Rótulo seguido de definição | dois-pontos | `Issue: Contato sem fricção` |
| Aposto curto no meio de uma frase | parênteses | `Cinco passagens (UX e IA) conectadas pelo mesmo método.` |
| Quebra de ritmo entre frases | ponto final | `Não é ranking. É mapa.` |
| Separação de metadados | `·` | `Lucas Nonato · Consultor de IA` |

A meia-risca (en dash, U+2013) continua liberada apenas para intervalos
numéricos e de data: `mar/2026 – atual`, `linhas 2–17`, `0–100%`.

## How it is enforced

- **Código (`*.ts`, `*.tsx`, `*.js`, `*.mjs`, `*.jsx`)**: regra local do ESLint
  `local/no-em-dash` (`eslint-rules/no-em-dash.mjs`). Pega strings, JSX,
  templates e comentários.
- **Todo o resto (`*.md`, `*.scss`, `*.css`, `*.html`, `*.json`, `*.yml`,
  `*.txt`)**: `npm run lint:text` (`scripts/check-no-em-dash.mjs`).
- `npm run lint` roda as duas verificações, e o job `quality` do CI roda
  `npm run lint`. Um travessão novo derruba o build.

Nenhum dos dois aceita a entidade HTML nem o escape unicode do caractere como
alternativa: a forma de escrever muda, o caractere continua proibido.

Os únicos arquivos isentos são os que precisam citar o caractere para
consegui-lo proibir: `eslint-rules/no-em-dash.mjs`, `scripts/lib/em-dash.mjs` e
`scripts/check-no-em-dash.mjs`.

## Referências normativas

- `AGENTS.md` (regra visível para qualquer agente que entrar no repositório).
- `README.md`, seção "Padrões de Código" (Contribuição).
- `.github/copilot-instructions.md`.
