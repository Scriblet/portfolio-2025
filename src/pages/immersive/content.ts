import { experiences, skills } from '../../data';
import { SOCIAL_LINKS } from '../../data/social';

// Placeholder visual — substituir por fotografia real de Lucas Nonato quando disponível.
export const portraitImage =
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1920&q=80';

// Dados reais exibidos no HUD do hero e da seção Sobre.
// Fonte: currículo de Lucas Nonato (public/cv/lucas-nonato-cv.pdf).
export const PERSON = {
  name: 'Lucas Nonato de Sá',
  displayName: 'Lucas Nonato',
  role: 'Consultor de IA · Software Engineer · Full Stack',
  shortRole: 'Software Engineer',
  location: 'São Paulo, SP',
  stack: 'TypeScript · React · Node.js',
  availability: 'A combinar',
  languages: 'Português · Inglês avançado',
  experienceLabel: '7+ anos',
  email: 'lucas.nonato1@hotmail.com',
  phone: '+55 87 99999-8133',
} as const;

export const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Contato', href: '#contact' },
];

export const heroMeta = {
  topLeft: { label: 'Portfólio', value: 'Edição 2026' },
  topRight: { label: 'Base', value: PERSON.location },
  bottomLeft: { label: 'Stack principal', value: PERSON.stack },
  bottomRight: { label: 'Experiência', value: PERSON.experienceLabel },
} as const;

export const wordmark = {
  left: 'LUCAS',
  right: 'NONATO',
  period: '.',
} as const;

export const aboutContent = {
  label: 'Sobre',
  index: '01',
  statement: [
    'Construo interfaces acessíveis onde ',
    'design e engenharia ',
    'são a mesma decisão.',
  ] as const,
  highlightIndex: 1,
  footnote: 'Mais de 7 anos desenvolvendo produtos digitais com foco em acessibilidade, arquitetura e IA.',
  hud: [
    { label: 'Experiência', value: PERSON.experienceLabel },
    { label: 'Cargo atual', value: PERSON.role },
    { label: 'Localização', value: PERSON.location },
    { label: 'Stack principal', value: PERSON.stack },
    { label: 'Disponibilidade', value: PERSON.availability },
    { label: 'Idiomas', value: PERSON.languages },
  ],
} as const;

export const skillsContent = {
  label: 'Skills',
  index: '02',
  heading: 'Competências técnicas',
  description:
    'Domínio construído ao longo de projetos reais: front-end, back-end, qualidade, infraestrutura e design de experiência.',
} as const;

export const skillCards = skills.map((skill, index) => ({
  id: `skill-${index + 1}`,
  index: String(index + 1).padStart(2, '0'),
  title: skill.title,
  description: skill.description,
  tags: skill.tags,
}));

export const experienceContent = {
  label: 'Experiência',
  index: '03',
  heading: 'Trajetória profissional',
  description:
    'Cinco passagens — de consultoria de UX a engenharia de IA — conectadas pela obsessão em resolver problemas com código bem feito.',
} as const;

export const experienceTimeline = experiences.map((experience) => ({
  id: `exp-${experience.id}`,
  number: experience.number,
  period: experience.period,
  company: experience.company,
  position: experience.position,
  description: experience.description,
}));

export const contactContent = {
  label: 'Contato',
  index: '04',
  headline: 'Vamos construir algo juntos?',
  body: 'Seja para uma vaga, um projeto ou só para trocar ideia sobre tecnologia, me mande uma mensagem.',
  primaryAction: {
    label: 'Enviar e-mail',
    href: `mailto:${PERSON.email}`,
  },
  secondaryAction: {
    label: 'LinkedIn',
    href: SOCIAL_LINKS.LINKEDIN,
  },
  form: {
    id: 'immersive-contact-form',
    title: 'Mande uma mensagem',
    action: '/api/contact',
  },
  footer: {
    email: PERSON.email,
    location: PERSON.location,
    social: [
      { label: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN },
      { label: 'GitHub', href: SOCIAL_LINKS.GITHUB },
    ],
  },
} as const;

const ONES = ['', 'Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove'] as const;
const TEENS = ['Dez', 'Onze', 'Doze', 'Treze', 'Quatorze', 'Quinze', 'Dezesseis', 'Dezessete', 'Dezoito', 'Dezenove'] as const;
const TENS = ['', '', 'Vinte', 'Trinta', 'Quarenta', 'Cinquenta', 'Sessenta', 'Setenta', 'Oitenta', 'Noventa'] as const;

export function countWord(n: number): string {
  if (n < 1 || n > 99) return String(n);
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return one === 0 ? TENS[ten] : `${TENS[ten]} e ${ONES[one]}`;
}
