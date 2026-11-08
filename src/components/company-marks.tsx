import type { CompanyMark as CompanyMarkData } from "../data/types";

// Os SVGs oficiais ficam em src/img/companies e entram como markup inline
// para que o `currentColor` herde o roxo do tema (escuro/claro).
import vivoLogo from "../img/companies/vivo.svg?raw";
import portoSeguroLogo from "../img/companies/porto-seguro.svg?raw";
import thoughtworksLogo from "../img/companies/thoughtworks.svg?raw";
import arcotechLogo from "../img/companies/arcotech.svg?raw";

const logoByKey = {
  vivo: vivoLogo,
  "porto-seguro": portoSeguroLogo,
  thoughtworks: thoughtworksLogo,
  arcotech: arcotechLogo,
} as const;

/** Avião de papel — marca da Finger Consultoria (pedido explícito). */
const FingerMark = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 12 22 2" />
  </svg>
);

type CompanyMarkProps = {
  mark: CompanyMarkData;
  className?: string;
};

/** Marca da empresa em flat, monocromática e adaptável ao tema. */
export const CompanyMark = ({ mark, className }: CompanyMarkProps) => {
  const testId = `company-mark-${mark.key}`;

  if (mark.key === "finger") {
    return (
      <span
        className={className}
        aria-hidden="true"
        data-testid={testId}
        data-key={mark.key}
      >
        <FingerMark />
      </span>
    );
  }

  return (
    <span
      className={className}
      aria-hidden="true"
      data-testid={testId}
      data-key={mark.key}
      dangerouslySetInnerHTML={{ __html: logoByKey[mark.key] }}
    />
  );
};
