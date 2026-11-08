import type { ReactNode } from "react";
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
    <span className={styles.pillIcon} aria-hidden="true">
      ↗
    </span>
  </a>
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
