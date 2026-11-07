# src/data

Fonte única dos dados de conteúdo do portfólio. Componentes apenas consomem
estes módulos; nenhum texto de conteúdo deve ficar hardcoded em JSX.

## Onde editar cada coisa

| O que | Arquivo | Export |
| --- | --- | --- |
| Empresas da seção Experiência | `experiences.ts` | `experiences: Experience[]` |
| Cards de Habilidades | `skills.ts` | `skills: Skill[]` |
| SEO, nome, autor, keywords | `site.ts` | `SITE_CONFIG: SiteConfig` |
| GitHub, LinkedIn, Instagram, Twitter | `social.ts` | `SOCIAL_LINKS: SocialLinks` |
| Projetos (feature futura) | `projects.ts` | `projects: Project[]` |
| Depoimentos (feature futura) | `testimonials.ts` | `testimonials: Testimonial[]` |
| Shape de todos os tipos | `types.ts` | interfaces e unions |

`index.ts` é o barrel: prefira `import { experiences, SITE_CONFIG } from "../data";`.

## Como adicionar

- **Experiência:** acrescente um objeto em `experiences` com `id` único e
  `number` formatado (`"05"`). A ordem do array é a ordem renderizada.
- **Skill:** acrescente um objeto em `skills`. `icon` deve ser uma das chaves de
  `SkillIconKey` (`code`, `design`, `api`, `accessibility`, `storage`, `build`,
  `cloud`); o mapa de ícones MUI fica em `src/pages/skills/skills.tsx`.
- **Projeto / depoimento:** preencha os arrays em `projects.ts` /
  `testimonials.ts` quando as seções correspondentes forem implementadas.

## Validação

`npx tsc --noEmit` valida o shape de todos os registros. Campo faltando ou
`icon` inválido quebra o typecheck antes do build.

Arrays vazios são seguros: os componentes renderizam a seção sem itens, sem
erro em runtime.
