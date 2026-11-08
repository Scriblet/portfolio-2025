export type RoadmapStatus = "done" | "in-progress" | "pending";

export type RoadmapCategory =
  | "TÃ©cnico"
  | "UX"
  | "Feature"
  | "SeÃ§Ã£o";

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
    title: "FundaÃ§Ã£o",
    goal: "Base tÃ©cnica que destrava todo o resto: dados tipados, contato seguro, tipografia e SEO.",
    status: "done",
    items: [
      {
        slug: "dados-centralizados",
        title: "Dados centralizados",
        summary:
          "Camada src/data tipada para experiÃªncias, skills, site e links sociais.",
        category: "TÃ©cnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "seguranca-contato",
        title: "SeguranÃ§a do contato",
        summary:
          "Webhook fora do bundle, endpoint /api/contact com validaÃ§Ã£o e rate limit.",
        category: "TÃ©cnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "hierarquia-tipografica",
        title: "Hierarquia tipogrÃ¡fica",
        summary:
          "Escala central no tema, contraste dos textos secundÃ¡rios e remoÃ§Ã£o do tÃ­tulo vazio.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "seo-metadados",
        title: "SEO e metadados",
        summary:
          "Open Graph, Twitter Cards, JSON-LD, canonical, favicon e imagem 1200Ã—630.",
        category: "TÃ©cnico",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
    ],
  },
  {
    id: 1,
    title: "Quick wins",
    goal: "Ganhos visÃ­veis de navegaÃ§Ã£o, feedback e identidade sem esperar as ondas maiores.",
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
          "Barra fina de 0â€“100% no topo, acessÃ­vel e sem bloquear a navegaÃ§Ã£o.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "microinteracoes-foco",
        title: "MicrointeraÃ§Ãµes e foco",
        summary:
          "Hover, focus-visible e active padronizados no tema para toda a superfÃ­cie interativa.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "snackbar-contato",
        title: "Snackbar de contato",
        summary:
          "Feedback global de sucesso/erro no formulÃ¡rio, com fila, live region e analytics.",
        category: "Feature",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "download-cv",
        title: "Download de CV",
        summary:
          "BotÃ£o de PDF na apresentaÃ§Ã£o e no contato, com fallback e evento de download.",
        category: "Feature",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
      {
        slug: "tema-claro-escuro",
        title: "Tema claro/escuro",
        summary:
          "Toggle no header, preferÃªncia persistida e paleta clara derivada da identidade.",
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
    goal: "Primeira dobra mais rÃ¡pida, com chunks separados e skeleton de altura reservada.",
    status: "done",
    items: [
      {
        slug: "code-splitting-lazy",
        title: "Code-splitting e lazy loading",
        summary:
          "Chunks por seÃ§Ã£o, skeleton com altura reservada e bundle inicial menor.",
        category: "TÃ©cnico",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["dados-centralizados"],
      },
    ],
  },
  {
    id: 4,
    title: "SeÃ§Ãµes novas",
    goal: "Narrativa de carreira para completar a histÃ³ria do portfÃ³lio.",
    status: "done",
    items: [
      {
        slug: "secao-timeline",
        title: "Timeline de carreira",
        summary:
          "Marcos de formaÃ§Ã£o, certificaÃ§Ã£o e trabalho em ordem cronolÃ³gica.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 3,
        issuesTotal: 3,
      },
    ],
  },
  {
    id: 5,
    title: "PWA",
    goal: "InstalaÃ§Ã£o e leitura offline, depois que o restante estiver estÃ¡vel.",
    status: "done",
    items: [
      {
        slug: "pwa-offline",
        title: "PWA offline",
        summary:
          "Manifest, service worker versionado e fallback offline acessÃ­vel.",
        category: "TÃ©cnico",
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
    goal: "Uma experiÃªncia editorial imersiva aplicada ao portfÃ³lio inteiro: vidro arquitetÃ´nico, tipografia Syne, narrativa por seÃ§Ãµes e movimento contido â€” sem perder acessibilidade nem performance.",
    status: "done",
    items: [
      {
        slug: "design-system-immersive",
        title: "Design system imersivo",
        summary:
          "Tokens, tipografia Syne/Inter/Sora, vidro, grÃ£o e primitivas com foco e contraste AA â€” agora globais.",
        category: "UX",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
      },
      {
        slug: "portal-hero",
        title: "Portal hero cinematogrÃ¡fico",
        summary:
          "Hero dirigido por scroll: painÃ©is, foto duotÃ´nica e wordmark dividido, reversÃ­vel e com movimento reduzido.",
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
          "Sobre, Skills, ExperiÃªncia e Contato com a linguagem editorial da referÃªncia imersiva.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
      },
      {
        slug: "release-deck",
        title: "Deck fÃ­sico de releases",
        summary:
          "Explorado no preview e removido na consolidaÃ§Ã£o; a pÃ¡gina seguiu com Skills em cards de vidro.",
        category: "Feature",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        dependsOn: ["design-system-immersive"],
        note: "Removido na consolidaÃ§Ã£o do preview.",
      },
      {
        slug: "immersive-preview-page",
        title: "PÃ¡gina /immersive",
        summary:
          "LaboratÃ³rio navegÃ¡vel com a direÃ§Ã£o completa e conteÃºdo real, mantido como referÃªncia visual.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 4,
        issuesTotal: 4,
        note: "ReferÃªncia visual do refactor do site.",
      },
      {
        slug: "motion-a11y-performance",
        title: "Movimento, a11y e performance",
        summary:
          "Tokens de motion, contrato de movimento reduzido, foco, contraste e orÃ§amento de performance.",
        category: "TÃ©cnico",
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
    goal: "Aplicar a linguagem da referÃªncia /immersive a cada seÃ§Ã£o real do portfÃ³lio, com PRDs por seÃ§Ã£o e validaÃ§Ã£o de acessibilidade.",
    status: "done",
    items: [
      {
        slug: "global-shell",
        title: "Shell global",
        summary:
          "GrÃ£o, container, ritmo vertical e contrato de reveal aplicados ao site inteiro.",
        category: "TÃ©cnico",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "header-hero",
        title: "Header e Hero",
        summary:
          "Header glass pill e hero editorial com foto, metadados reais e CTA pill.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "experience-section",
        title: "ExperiÃªncia",
        summary:
          "Cards de vidro e numeraÃ§Ã£o para as empresas reais de experiences.ts.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "timeline-section",
        title: "Jornada",
        summary:
          "Timeline com trilho em degradÃª, marcadores e cards de vidro.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "philosophy-section",
        title: "Filosofia",
        summary:
          "SeÃ§Ã£o editorial escura com foto, texto e CTA, sem o marrom hardcoded.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "skills-section",
        title: "Habilidades",
        summary:
          "Cards de vidro com Ã­cone, tÃ­tulo, descriÃ§Ã£o e tags a partir de skills.ts.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "github-section",
        title: "Banner GitHub",
        summary:
          "Painel de vidro com CTA pill e o logo como elemento grÃ¡fico.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "contact-section",
        title: "Contato",
        summary:
          "Fechamento editorial com card de vidro e formulÃ¡rio preservado.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
      {
        slug: "footer-section",
        title: "RodapÃ©",
        summary:
          "Wordmark, links mono, Ã­cones sociais e hairline no fecho do site.",
        category: "SeÃ§Ã£o",
        status: "done",
        issuesDone: 1,
        issuesTotal: 1,
      },
    ],
  },
  {
    id: 8,
    title: "Identidade como Engenheiro de IA",
    goal: "Reposicionar o portfÃ³lio para refletir a atuaÃ§Ã£o atual de Lucas como engenheiro de IA: prova social, maturidade tÃ©cnica, princÃ­pios e contato orientado a valor.",
    status: "in-progress",
    items: [
      {
        slug: "mapa-maturidade-ia",
        title: "Mapa de Maturidade em IA",
        summary:
          "Nova seÃ§Ã£o que comunica as camadas de competÃªncia em IA, de uso produtivo a governanÃ§a.",
        category: "SeÃ§Ã£o",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 3,
      },
      {
        slug: "manifesto-tecnico",
        title: "Manifesto TÃ©cnico",
        summary:
          "SeÃ§Ã£o de princÃ­pios tÃ©cnicos que comunica como Lucas pensa e trabalha.",
        category: "SeÃ§Ã£o",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 3,
      },
      {
        slug: "selected-work",
        title: "Selected Work narrativo",
        summary:
          "Substitui as seÃ§Ãµes Experience e Jornada por uma narrativa contÃ­nua de cases reais.",
        category: "SeÃ§Ã£o",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 4,
        dependsOn: ["mapa-maturidade-ia", "manifesto-tecnico"],
      },
      {
        slug: "contato-proposta-valor",
        title: "Contato com Proposta de Valor",
        summary:
          "Reformula o contato com cartÃµes de proposta antes do formulÃ¡rio.",
        category: "SeÃ§Ã£o",
        status: "pending",
        issuesDone: 0,
        issuesTotal: 3,
        dependsOn: ["selected-work"],
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
