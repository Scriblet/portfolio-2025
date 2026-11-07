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
    goal: "Primeira dobra mais rápida e uma rede de segurança de acessibilidade e regressão visual.",
    status: "pending",
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
      {
        slug: "testes-a11y-visual",
        title: "Testes de a11y e visual",
        summary:
          "axe no CI e screenshots por viewport para travar regressões.",
        category: "Técnico",
        status: "in-progress",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: ["code-splitting-lazy"],
      },
    ],
  },
  {
    id: 3,
    title: "Features",
    goal: "Conteúdo e prova técnica que aumentam a conversão do portfólio.",
    status: "pending",
    items: [
      {
        slug: "secao-projetos",
        title: "Seção de projetos",
        summary:
          "Grid curado de 3–6 projetos com stack, links e estado vazio amigável.",
        category: "Seção",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        note: "Não depende da API pública do GitHub.",
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
