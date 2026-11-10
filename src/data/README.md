# src/data

Fonte única dos dados de conteúdo do portfólio. Componentes apenas consomem
estes módulos; nenhum texto de conteúdo deve ficar hardcoded em JSX.

## Onde editar cada coisa

| O que | Arquivo | Export |
| --- | --- | --- |
| Empresas da seção Trabalho | `selectedWorks.ts` | `selectedWorks: SelectedWork[]` |
| Empresas da prévia imersiva | `experiences.ts` | `experiences: Experience[]` |
| Cards de Habilidades | `skills.ts` | `skills: Skill[]` |
| SEO, nome, autor, keywords | `site.ts` | `SITE_CONFIG: SiteConfig` |
| GitHub, LinkedIn, Instagram, Twitter | `social.ts` | `SOCIAL_LINKS: SocialLinks` |
| Projetos (feature futura) | `projects.ts` | `projects: Project[]` |
| Depoimentos (feature futura) | `testimonials.ts` | `testimonials: Testimonial[]` |
| Mapa de maturidade em IA | `aiMaturity.ts` | `aiMaturityLayers` |
| Manifesto técnico | `principles.ts` | `principles: Principle[]` |
| Propostas da seção Contato | `contact.ts` | `valuePropositions: ValueProposition[]` |
| Shape de todos os tipos | `types.ts` | interfaces e unions |

`index.ts` é o barrel: prefira `import { experiences, SITE_CONFIG } from "../data";`.

## Como adicionar

- **Case:** acrescente um objeto em `selectedWorks` com `id` único, `number`
  formatado (`"06"`) e `start` ordenável (`"2026-03"`). A ordem do array é a
  ordem renderizada e precisa continuar do mais recente para o mais antigo.
- **Skill:** acrescente um objeto em `skills`. `icon` deve ser uma das chaves de
  `SkillIconKey` (`code`, `design`, `api`, `accessibility`, `storage`, `build`,
  `cloud`); o mapa de ícones MUI fica em `src/pages/skills/skills.tsx`.
- **Projeto / depoimento:** preencha os arrays em `projects.ts` /
  `testimonials.ts` quando as seções correspondentes forem implementadas.
- **Camada de IA / princípio:** edite `aiMaturity.ts` / `principles.ts`. A ordem
  do array é a ordem renderizada.

## Validação

`npx tsc --noEmit` valida o shape de todos os registros. Campo faltando ou
`icon` inválido quebra o typecheck antes do build.

Arrays vazios são seguros: os componentes renderizam a seção sem itens, sem
erro em runtime.
