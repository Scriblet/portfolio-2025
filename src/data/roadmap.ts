export type RoadmapStatus = "done" | "in-progress" | "pending";

export type RoadmapCategory =
  | "Técnico"
  | "UX"
  | "Feature"
  | "Seção";

export type RoadmapItem = {
  slug: string;
  title: string;
  summary: string;
  category: RoadmapCategory;
  status: RoadmapStatus;
  issuesDone: number;
  issuesTotal: number;
  dependsOn?: string[];
  note?: string;
};

export type RoadmapWave = {
  id: number;
  title: string;
  goal: string;
  status: RoadmapStatus;
  items: RoadmapItem[];
};

export const roadmapWaves: RoadmapWave[] = [
  {
    id: 0,
    title: "Fundação",
    goal: "Base técnica que destrava todo o resto: dados tipados, contato seguro, tipografia e SEO.",
    status: "done",
    items: [
      {
        slug: "dados-centralizados",
        title: "Dados centralizados",
        summary:
          "Camada src/data tipada para experiências, skills, site e links sociais.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "seguranca-contato",
        title: "Segurança do contato",
        summary:
          "Webhook fora do bundle, endpoint /api/contact com validação e rate limit.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "hierarquia-tipografica",
        title: "Hierarquia tipográfica",
        summary:
          "Escala central no tema, contraste dos textos secundários e remoção do título vazio.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "seo-metadados",
        title: "SEO e metadados",
        summary:
          "Open Graph, Twitter Cards, JSON-LD, canonical, favicon e imagem 1200×630.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
    ],
  },
  {
    id: 1,
    title: "Quick wins",
    goal: "Ganhos visíveis de navegação, feedback e identidade sem esperar as ondas maiores.",
    status: "done",
    items: [
      {
        slug: "header-scroll-inteligente",
        title: "Header com scroll inteligente",
        summary:
          "Esconde ao descer e reaparece ao subir, com foco e reduced motion respeitados.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "progresso-leitura",
        title: "Progresso de leitura",
        summary:
          "Barra fina de 0–100% no topo, acessível e sem bloquear a navegação.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "microinteracoes-foco",
        title: "Microinterações e foco",
        summary:
          "Hover, focus-visible e active padronizados no tema para toda a superfície interativa.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "snackbar-contato",
        title: "Snackbar de contato",
        summary:
          "Feedback global de sucesso/erro no formulário, com fila, live region e analytics.",
        category: "Feature",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "download-cv",
        title: "Download de CV",
        summary:
          "Botão de PDF na apresentação e no contato, com fallback e evento de download.",
        category: "Feature",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "tema-claro-escuro",
        title: "Tema claro/escuro",
        summary:
          "Toggle no header, preferência persistida e paleta clara derivada da identidade.",
        category: "Feature",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
    ],
  },
  {
    id: 2,
    title: "Performance",
    goal: "Primeira dobra mais rápida, com chunks separados e skeleton de altura reservada.",
    status: "done",
    items: [
      {
        slug: "code-splitting-lazy",
        title: "Code-splitting e lazy loading",
        summary:
          "Chunks por seção, skeleton com altura reservada e bundle inicial menor.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["dados-centralizados"],
      },
    ],
  },
  {
    id: 4,
    title: "Seções novas",
    goal: "Narrativa de carreira para completar a história do portfólio.",
    status: "done",
    items: [
      {
        slug: "secao-timeline",
        title: "Timeline de carreira",
        summary:
          "Marcos de formação, certificação e trabalho em ordem cronológica.",
        category: "Seção",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
    ],
  },
  {
    id: 5,
    title: "PWA",
    goal: "Instalação e leitura offline, depois que o restante estiver estável.",
    status: "done",
    items: [
      {
        slug: "pwa-offline",
        title: "PWA offline",
        summary:
          "Manifest, service worker versionado e fallback offline acessível.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["seo-metadados", "code-splitting-lazy"],
      },
    ],
  },
  {
    id: 6,
    title: "Refactor imersivo",
    goal: "Uma experiência editorial imersiva aplicada ao portfólio inteiro: vidro arquitetônico, tipografia Syne, narrativa por seções e movimento contido, sem perder acessibilidade nem performance.",
    status: "done",
    items: [
      {
        slug: "design-system-immersive",
        title: "Design system imersivo",
        summary:
          "Tokens, tipografia Syne/Inter/Sora, vidro, grão e primitivas com foco e contraste AA, agora globais.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "portal-hero",
        title: "Portal hero cinematográfico",
        summary:
          "Hero dirigido por scroll: painéis, foto duotônica e wordmark dividido, reversível e com movimento reduzido.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
      },
      {
        slug: "editorial-narrative",
        title: "Narrativa editorial",
        summary:
          "Sobre, Skills, Experiência e Contato com a linguagem editorial da referência imersiva.",
        category: "Seção",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
      },
      {
        slug: "release-deck",
        title: "Deck físico de releases",
        summary:
          "Explorado no preview e removido na consolidação; a página seguiu com Skills em cards de vidro.",
        category: "Feature",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
        note: "Removido na consolidação do preview.",
      },
      {
        slug: "immersive-preview-page",
        title: "Página /immersive",
        summary:
          "Laboratório navegável com a direção completa e conteúdo real, mantido como referência visual.",
        category: "Seção",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        note: "Referência visual do refactor do site.",
      },
      {
        slug: "motion-a11y-performance",
        title: "Movimento, a11y e performance",
        summary:
          "Tokens de motion, contrato de movimento reduzido, foco, contraste e orçamento de performance.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["portal-hero", "editorial-narrative"],
      },
    ],
  },
  {
    id: 7,
    title: "Refactor do site",
    goal: "Aplicar a linguagem da referência /immersive a cada seção real do portfólio, com PRDs por seção e validação de acessibilidade.",
    status: "done",
    items: [
      {
        slug: "global-shell",
        title: "Shell global",
        summary:
          "Grão, container, ritmo vertical e contrato de reveal aplicados ao site inteiro.",
        category: "Técnico",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "header-hero",
        title: "Header e Hero",
        summary:
          "Header glass pill e hero editorial com foto, metadados reais e CTA pill.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "experience-section",
        title: "Experiência",
        summary:
          "Cards de vidro e numeração para as empresas reais de experiences.ts.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "timeline-section",
        title: "Jornada",
        summary:
          "Timeline com trilho em degradê, marcadores e cards de vidro.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "philosophy-section",
        title: "Filosofia",
        summary:
          "Seção editorial escura com foto, texto e CTA, sem o marrom hardcoded.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "skills-section",
        title: "Habilidades",
        summary:
          "Cards de vidro com ícone, título, descrição e tags a partir de skills.ts.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "github-section",
        title: "Banner GitHub",
        summary:
          "Painel de vidro com CTA pill e o logo como elemento gráfico.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "contact-section",
        title: "Contato",
        summary:
          "Fechamento editorial com card de vidro e formulário preservado.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "footer-section",
        title: "Rodapé",
        summary:
          "Wordmark, links mono, ícones sociais e hairline no fecho do site.",
        category: "Seção",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
    ],
  },
  {
    id: 8,
    title: "Identidade como Engenheiro de IA",
    goal: "Reposicionar o portfólio para refletir a atuação atual de Lucas como engenheiro de IA: prova social, maturidade técnica, princípios e contato orientado a valor.",
    status: "done",
    items: [
      {
        slug: "mapa-maturidade-ia",
        title: "Mapa de Maturidade em IA",
        summary:
          "Nova seção que comunica as camadas de competência em IA, de uso produtivo a governança.",
        category: "Seção",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "manifesto-tecnico",
        title: "Manifesto Técnico",
        summary:
          "Seção de princípios técnicos que comunica como Lucas pensa e trabalha.",
        category: "Seção",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "selected-work",
        title: "Selected Work narrativo",
        summary:
          "Substitui as seções Experience e Jornada por uma narrativa contínua de cases reais.",
        category: "Seção",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["mapa-maturidade-ia", "manifesto-tecnico"],
      },
      {
        slug: "contato-proposta-valor",
        title: "Contato com Proposta de Valor",
        summary:
          "Reformula o contato com cartões de proposta antes do formulário.",
        category: "Seção",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        dependsOn: ["selected-work"],
      },
    ],
  },
  {
    id: 9,
    title: "Testes E2E",
    goal: "Cobertura ponta a ponta das interações críticas do site com Cypress (navegação, conteúdo, contato, PWA e acessibilidade), sempre opt-in, sem voltar a travar a máquina no loop de desenvolvimento.",
    status: "done",
    items: [
      {
        slug: "cypress-infraestrutura",
        title: "Infraestrutura E2E",
        summary:
          "Cypress, servidor de teste, comandos de apoio e regras de execução opt-in.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        note: "Análise do site em .scratch/07-testes-e2e/ANALISE.md.",
      },
      {
        slug: "cypress-smoke-navegacao",
        title: "Smoke e navegação",
        summary:
          "Home, rotas, âncoras do header e do footer, drawer mobile, tema e header ao rolar.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["cypress-infraestrutura"],
        note: "theme.cy.ts e header-scroll.cy.ts fecham auto-hide, meta theme-color e progresso.",
      },
      {
        slug: "cypress-secoes-conteudo",
        title: "Conteúdo das seções",
        summary:
          "Mapa de IA, manifesto, selected work, skills, GitHub e footer renderizados com links íntegros.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        dependsOn: ["cypress-infraestrutura"],
      },
      {
        slug: "cypress-formularios-contato",
        title: "Formulários de contato",
        summary:
          "Validação, honeypot, envio, estados de erro e feedback nos formulários da home e da /immersive.",
        category: "Técnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["cypress-infraestrutura"],
      },
      {
        slug: "cypress-pwa-offline",
        title: "PWA e offline",
        summary:
          "Service worker em build, conteúdo em cache, fallback de navegação, OfflineNotice e instalação.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        dependsOn: ["cypress-infraestrutura"],
      },
      {
        slug: "cypress-a11y-responsivo",
        title: "Acessibilidade e responsivo",
        summary:
          "axe-core na home e na /immersive, navegação por teclado e viewports móveis.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        dependsOn: ["cypress-infraestrutura"],
      },
    ],
  },
  {
    id: 10,
    title: "Correções da avaliação",
    goal: "Fechar os pontos que seguraram a nota do site na avaliação de 2026-11: CI em Node 22, contato funcional em produção, imagens otimizadas, README consistente e cobertura E2E crítica.",
    status: "done",
    items: [
      {
        slug: "ci-node-22",
        title: "CI consistente em Node 22 e lint limpo",
        summary:
          "Node 22 em deploy/netlify/engines/.nvmrc e os 8 warnings do ESLint zerados sem desativar regras.",
        category: "Técnico",
        status: "done",
        issuesDone: 2,
        issuesTotal: 2,
      },
      {
        slug: "contato-producao",
        title: "Contato funcional em produção",
        summary:
          "POST /api/contact não existe no GitHub Pages; function publicada no Netlify, com CORS restrito e endpoint configurável por env.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        note: "Ativo em https://lucas-nonato.netlify.app/api/contact; Pages aponta para lá via VITE_CONTACT_ENDPOINT.",
      },
      {
        slug: "otimizacao-imagens",
        title: "Otimização de imagens",
        summary:
          "Hero (294 KB) e filosofia (821 KB) em AVIF/WebP com srcset, lazy-load e orçamento de peso anti-regressão.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        dependsOn: ["ci-node-22"],
      },
      {
        slug: "readme-consistencia",
        title: "README consistente com o repositório",
        summary:
          "Node 22, scripts reais, deploy GitHub Pages, árvore de diretórios atual e contato descrito como server-side.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        dependsOn: ["ci-node-22"],
      },
      {
        slug: "e2e-cobertura-critica",
        title: "Cobertura E2E crítica",
        summary:
          "Smoke/navegação/tema, conteúdo das seções e formulário de contato cobertos de ponta a ponta no job e2e do CI.",
        category: "Técnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
        note: "Complementa a onda 9 sem duplicar PWA/a11y (que seguem em 07-testes-e2e).",
      },
    ],
  },
];

export const roadmapStats = () => {
  const items = roadmapWaves.flatMap((wave) => wave.items);
  const issuesDone = items.reduce((total, item) => total + item.issuesDone, 0);
  const issuesTotal = items.reduce((total, item) => total + item.issuesTotal, 0);

  return {
    prdsDone: items.filter((item) => item.status === "done").length,
    prdsTotal: items.length,
    issuesDone,
    issuesTotal,
    wavesDone: roadmapWaves.filter((wave) => wave.status === "done").length,
    wavesTotal: roadmapWaves.length,
    inProgress: items.filter((item) => item.status === "in-progress").length,
    progress: issuesTotal === 0 ? 0 : Math.round((issuesDone / issuesTotal) * 100),
  };
};

type WaveTotals = {
  prds: number;
  openPrds: number;
  issuesDone: number;
  issuesTotal: number;
};

const totalsOf = (waves: RoadmapWave[]): WaveTotals => {
  const items = waves.flatMap((wave) => wave.items);

  return {
    prds: items.length,
    openPrds: items.filter((item) => item.status !== "done").length,
    issuesDone: items.reduce((total, item) => total + item.issuesDone, 0),
    issuesTotal: items.reduce((total, item) => total + item.issuesTotal, 0),
  };
};

/**
 * Separa o roadmap em três faixas de leitura: o que está em execução, o que
 * vem depois e o que já foi entregue (recolhido na página).
 */
export const roadmapGroups = () => {
  const activeWaves = roadmapWaves.filter((wave) => wave.status === "in-progress");
  const upcomingWaves = roadmapWaves.filter((wave) => wave.status === "pending");
  const shippedWaves = roadmapWaves.filter((wave) => wave.status === "done");

  return {
    activeWaves,
    upcomingWaves,
    shippedWaves,
    active: totalsOf(activeWaves),
    upcoming: totalsOf(upcomingWaves),
    shipped: totalsOf(shippedWaves),
  };
};
