# Portfolio 2025 - Instruções para Agentes de IA

## Visão Geral do Projeto
Portfólio React moderno e totalmente responsivo construído com TypeScript, Material-UI v7 e Framer Motion. Aplicação de página única com navegação baseada em seções e testes e2e abrangentes com Playwright.

## Arquitetura e Padrões Principais

### Estrutura de Componentes
- **Layout de página única**: `App.tsx` orquestra todas as seções (Header → Presentation → Experience → Philosophy → Skills → GitHub → ContactForm → Footer)
- **Navegação por seções**: Cada seção principal tem um `id` para navegação por scroll (ex: `#experience`, `#skills`, `#contact`)
- **Componentes de página**: Localizados em `src/pages/`, cada seção principal fica em sua própria pasta com estilos co-localizados

### Sistema de Estilos
**Tripla abordagem de estilização** - entenda onde usar cada uma:
1. **Prop `sx` do Material-UI**: Método principal para estilos a nível de componente (veja `src/pages/presentation.styles.ts`)
2. **Módulos SCSS**: Usados com moderação (apenas `experience.module.scss` existe) para animações/estilos aninhados complexos
3. **Tema global**: `src/theme.ts` define tipografia responsiva com `clamp()`, breakpoints e paleta de tema escuro

**Padrão de tipografia responsiva** (crítico):
```typescript
fontSize: "clamp(min, preferred, max)"  // Exemplo: "clamp(1.8rem, 4vw, 3.052rem)"
```
Todo texto usa escala baseada em viewport. Nunca use tamanhos de fonte fixos.

### Gerenciamento de Estado
- **Sem biblioteca de estado global**: Apenas React hooks + estado de componente
- **Tema/breakpoints**: Use os hooks `useTheme()` e `useMediaQuery()` do MUI
- **Estado de formulário**: `useState` local no ContactForm com integração de webhook do Discord

### Padrões de Animação
**Framer Motion + Intersection Observer** é o padrão:
```typescript
const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.35 });

<motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```
Sempre anime na entrada no viewport, nunca no mount.

## Requisitos de Testes

### Estrutura de Testes
- **Apenas e2e com Playwright** (sem testes unitários)
- Todos os arquivos de teste em `tests/` espelham a estrutura de páginas
- Testes usam atributos `data-testid` (veja `src/pages/presentation.tsx` para exemplos)

### Escrevendo Testes
**Sempre adicione `data-testid` ao criar novos elementos interativos**:
```typescript
<Box data-testid="experience-section">
<Typography data-testid={`experience-company-${exp.id}`}>
```

**Padrão de teste**:
```typescript
test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Aguardar animações
});
```

**Executar testes**: `npm run test` (inicia servidor dev automaticamente via `playwright.config.ts` webServer)

## Fluxo de Desenvolvimento

### Comandos Essenciais
```powershell
npm run dev          # Servidor dev Vite em localhost:5173
npm run build        # Verificação TypeScript + build Vite
npm run lint         # ESLint com regras TypeScript
npm run preview      # Preview do build de produção
npx playwright test  # Executar testes e2e
npx playwright test --ui  # UI interativa de testes
```

### Fazendo Alterações

**Ao adicionar novas seções**:
1. Criar pasta em `src/pages/` com componente + estilos
2. Importar e adicionar ao `App.tsx` na ordem correta
3. Adicionar `id` da seção para navegação
4. Adicionar link de navegação nos menuItems do `Header.tsx`
5. Criar arquivo de teste correspondente em `tests/`
6. Adicionar atributos `data-testid` para testabilidade

**Ao modificar estilos**:
- Verificar `src/theme.ts` primeiro para tipografia/cores globais
- Usar prop `sx` com breakpoints do tema: `theme.breakpoints.down('sm')`
- Testar nos breakpoints: 360px, 600px, 900px, 1200px, 1536px
- Veja `RESPONSIVITY-IMPROVEMENTS.md` para padrões responsivos

**Ao adicionar formulários/interações**:
- ContactForm usa webhook do Discord (veja `src/pages/formContact/contactForm.tsx`)
- Rastreamento de analytics via `src/services/analytics.ts` (GA4)
- Padrão de config: Variáveis de ambiente via `import.meta.env.VITE_*` (veja `src/config/app.config.ts`)

## Padrões e Convenções Comuns

### Estrutura de Arquivo de Componente
```
src/pages/experience/
├── experience.tsx          # Lógica do componente
├── experience.styles.ts    # Estilos sx do MUI (se complexo)
└── experience.module.scss  # Módulo SCSS (raro)
```

### Padrão de Hooks Responsivos
```typescript
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
const isTablet = useMediaQuery(theme.breakpoints.down("md"));
```
Use estes para renderizar condicionalmente ou ajustar layouts.

### Componentes Data-Driven
Veja `experience.tsx` - arrays de dados mapeados para UI:
```typescript
const experiences = [
  { id: 1, company: "...", position: "...", description: "..." },
  // ...
];
return experiences.map(exp => <Card key={exp.id} data-testid={`experience-card-${exp.id}`} />);
```

## Integrações Externas

- **Deploy**: Netlify (veja `netlify.toml`, build com Node 20.10)
- **Analytics**: Google Analytics 4 via pacote `ga-gtag`
- **Contato**: Webhook do Discord hardcoded no ContactForm (substituir para produção)
- **Fontes**: `@fontsource/poppins` (sem chamadas CDN externas)

## Referência de Arquivos Principais

- `src/App.tsx` - Orquestração principal do layout
- `src/theme.ts` - Toda tipografia, cores, breakpoints
- `src/pages/presentation.tsx` - Exemplo de animação complexa
- `src/pages/experience/experience.tsx` - Padrão de componente data-driven
- `playwright.config.ts` - Configuração de testes (nota: webServer inicia servidor dev automaticamente)
- `RESPONSIVITY-IMPROVEMENTS.md` - Documentação de design responsivo

## Pegadinhas e Notas Importantes

1. **React 19 + TypeScript 5.7**: Versões mais recentes, verifique compatibilidade ao adicionar deps
2. **Sem runtime CSS-in-JS**: MUI usa Emotion mas prefira prop `sx` ao invés de styled components
3. **Módulos SCSS raros**: Use apenas quando absolutamente necessário para pseudo-seletores complexos
4. **Test IDs são obrigatórios**: Nunca pule `data-testid` em elementos interativos
5. **Mobile-first**: Design para largura de 360px primeiro, depois escale
6. **Sem roteamento**: App de página única, toda navegação é baseada em scroll via `react-scroll`
7. **Variáveis de ambiente**: Prefixe com `VITE_` para expor ao cliente (requisito do Vite)
