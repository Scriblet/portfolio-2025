import type { HTMLAttributes, ReactNode } from "react";

type Tone = "dark" | "light";

const cx = (...values: Array<string | false | undefined>) =>
  values.filter(Boolean).join(" ");

type GlassPanelProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: Tone;
  as?: "div" | "li" | "section" | "article" | "footer" | "header";
};

/** Superfície de vidro do design system. */
export const GlassPanel = ({
  children,
  tone = "dark",
  as: Tag = "div",
  className,
  ...rest
}: GlassPanelProps) => (
  <Tag
    className={cx(
      "ds-glass",
      tone === "dark" ? "ds-glass--dark" : "ds-glass--light",
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
);

/** Linha de 1px com cor de token. Decorativa por padrão. */
export const Hairline = ({
  tone = "dark",
  className,
}: {
  tone?: Tone;
  className?: string;
}) => (
  <span
    className={cx(
      "ds-hairline",
      tone === "light" && "ds-hairline--light",
      className,
    )}
    role="presentation"
    aria-hidden="true"
  />
);

/** Grão SVG fixo do design system. */
export const GrainOverlay = ({ className }: { className?: string }) => (
  <div className={cx("ds-grain", className)} aria-hidden="true" />
);

/** Numeral vazado decorativo. O consumidor define o posicionamento. */
export const IndexNumeral = ({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) => (
  <span
    className={cx(
      "ds-index-numeral",
      tone === "dark" && "ds-index-numeral--dark",
      className,
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);

/** Ícone circular usado dentro dos pill buttons. */
export const PillIcon = ({ children = "↗" }: { children?: ReactNode }) => (
  <span className="ds-pill__icon" aria-hidden="true">
    {children}
  </span>
);

type PillButtonProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "solid" | "ghost-dark" | "ghost-light";
  testId?: string;
};

/** Botão-pílula com ícone circular aninhado. */
export const PillButton = ({
  href,
  children,
  external = false,
  variant = "solid",
  testId,
}: PillButtonProps) => (
  <a
    className={cx(
      "ds-pill",
      variant === "solid"
        ? "ds-pill--solid"
        : variant === "ghost-dark"
          ? "ds-pill--ghost-dark"
          : "ds-pill--ghost-light",
    )}
    href={href}
    data-testid={testId}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    <span>{children}</span>
    <PillIcon />
  </a>
);

/** Label editorial mono, usado acima de títulos de seção. */
export const SectionLabel = ({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: Tone;
}) => (
  <p
    className={cx(
      "ds-label",
      tone === "dark" ? "ds-label--dark" : "ds-label--light",
    )}
    data-reveal
  >
    {children}
  </p>
);
