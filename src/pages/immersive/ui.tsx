import type { HTMLAttributes, ReactNode } from "react";
import styles from "./immersive.module.scss";

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
    className={
      variant === "solid"
        ? styles.pill
        : variant === "ghost-dark"
          ? styles.ghostDark
          : styles.ghostLight
    }
    href={href}
    data-testid={testId}
    {...(external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {})}
  >
    <span>{children}</span>
    <PillIcon />
  </a>
);

/** Ícone circular usado dentro dos pill buttons. */
export const PillIcon = ({ children = "↗" }: { children?: ReactNode }) => (
  <span className={styles.pillIcon} aria-hidden="true">
    {children}
  </span>
);

export const SectionLabel = ({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) => (
  <p
    className={tone === "dark" ? styles.labelDark : styles.labelLight}
    data-reveal
  >
    {children}
  </p>
);

type GlassPanelProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: "dark" | "light";
  as?: "div" | "li" | "section" | "article" | "footer";
};

/** Superfície de vidro. O consumidor adiciona apenas layout/espaçamento. */
export const GlassPanel = ({
  children,
  tone = "dark",
  as: Tag = "div",
  className,
  ...rest
}: GlassPanelProps) => (
  <Tag
    className={[
      styles.glassPanel,
      tone === "dark" ? styles.glassPanelDark : styles.glassPanelLight,
      className,
    ]
      .filter(Boolean)
      .join(" ")}
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
  tone?: "dark" | "light";
  className?: string;
}) => (
  <span
    className={[styles.hairline, tone === "light" ? styles.hairlineLight : "", className]
      .filter(Boolean)
      .join(" ")}
    role="presentation"
    aria-hidden="true"
  />
);

/** Grão SVG fixo do escopo imersivo. */
export const GrainOverlay = ({ className }: { className?: string }) => (
  <div
    className={[styles.grain, className].filter(Boolean).join(" ")}
    aria-hidden="true"
  />
);

/** Numeral vazado decorativo. O consumidor define o posicionamento. */
export const IndexNumeral = ({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) => (
  <span
    className={[
      styles.indexNumeral,
      tone === "dark" ? styles.indexNumeralDark : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    aria-hidden="true"
  >
    {children}
  </span>
);
