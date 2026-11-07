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
    goal: "Prova social e narrativa de carreira para completar a história do portfólio.",
    status: "pending",
    items: [
      {
        slug: "secao-toolbox",
        title: "Toolbox visual",
        summary:
          "Stack agrupada por categoria, com nome textual e logos oficiais.",
        category: "Seção",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
      },
      {
        slug: "secao-timeline",
        title: "Timeline de carreira",
        summary:
          "Marcos de formação, certificação e trabalho em ordem cronológica.",
        category: "Seção",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 3,
      },
    ],
  },
  {
    id: 5,
    title: "PWA",
    goal: "Instalação e leitura offline, depois que o restante estiver estável.",
    status: "pending",
    items: [
      {
        slug: "pwa-offline",
        title: "PWA offline",
        summary:
          "Manifest, service worker versionado e fallback offline acessível.",
        category: "Técnico",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: ["seo-metadados", "code-splitting-lazy"],
      },
    ],
  },
  {
    id: 6,
    title: "Refactor imersivo",
    goal: "Uma experiência editorial imersiva: portal cinematográfico, vidro arquitetônico, tipografia Syne e deck físico de releases — sem perder acessibilidade nem performance.",
    status: "in-progress",
    items: [
      {
        slug: "design-system-immersive",
        title: "Design system imersivo",
        summary:
          "Tokens, tipografia Syne/Inter/Sora, vidro, grão e primitivas com foco e contraste AA.",
        category: "UX",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
      },
      {
        slug: "portal-hero",
        title: "Portal hero cinematográfico",
        summary:
          "Hero dirigido por scroll: painéis, foto duotônica e wordmark dividido, reversível e com movimento reduzido.",
        category: "UX",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
      },
      {
        slug: "editorial-narrative",
        title: "Narrativa editorial",
        summary:
          "Declaração, faixa clara, roster, trajetória e fechamento com wordmark cortado.",
        category: "Seção",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
      },
      {
        slug: "release-deck",
        title: "Deck físico de releases",
        summary:
          "Capas empilhadas com arrasto, arremesso, teclado, indicadores e conteúdo provisório marcado.",
        category: "Feature",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
      },
      {
        slug: "immersive-preview-page",
        title: "Página /immersive",
        summary:
          "Laboratório navegável com a direção completa, conteúdo real e capas provisórias sinalizadas.",
        category: "Seção",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        note: "Entregue em /immersive; link disponível no painel do roadmap e no header em desenvolvimento.",
      },
      {
        slug: "motion-a11y-performance",
        title: "Movimento, a11y e performance",
        summary:
          "Tokens de motion, contrato de movimento reduzido, auditoria axe e orçamento de performance.",
        category: "Técnico",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: [
          "portal-hero",
          "editorial-narrative",
          "release-deck",
        ],
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
