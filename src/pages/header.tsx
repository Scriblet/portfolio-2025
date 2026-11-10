import { useEffect, useRef, useState, type FocusEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { scroller } from "react-scroll";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SITE_CONFIG } from "../data";
import useScrollDirection from "../hooks/useScrollDirection";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import ThemeToggle from "../components/ThemeToggle";
import InstallButton from "../components/pwa/InstallButton";
import { trackPortfolioEvents } from "../services/analytics";
import styles from "./header.module.scss";

const menuItems = [
  { text: "IA", to: "ia-maturity" },
  { text: "Manifesto", to: "manifesto" },
  { text: "Trabalho", to: "selected-work" },
  { text: "Habilidades", to: "skills" },
  { text: "Contato", to: "contact" },
];

const scrollTo = (target: string) => {
  trackPortfolioEvents.navigationClick(target);
  scroller.scrollTo(target, {
    duration: 800,
    delay: 0,
    smooth: true,
    offset: -80,
  });
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { hidden: scrollHidden } = useScrollDirection();
  const reduced = usePrefersReducedMotion();
  const isDev = import.meta.env.DEV;

  const hidden = scrollHidden && !focusWithin;

  useEffect(() => {
    if (!mobileOpen) return;

    const trigger = menuButtonRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    const closeButton = document.querySelector<HTMLButtonElement>(
      `.${styles.drawerClose}`,
    );
    closeButton?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [mobileOpen]);

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target?.matches || target.matches(":focus-visible")) {
      setFocusWithin(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !event.currentTarget.contains(next)) {
      setFocusWithin(false);
    }
  };

  const handleNavClick = (to: string) => {
    scrollTo(to);
  };

  return (
    <>
      <header
        className={styles.navWrap}
        style={{
          transform: hidden ? "translateY(-140%)" : "translateY(0)",
          transition: reduced
            ? "none"
            : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        {...(hidden ? { inert: true } : {})}
        aria-hidden={hidden ? "true" : undefined}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        data-testid="site-header"
      >
        <nav className={styles.nav} aria-label="Navegação principal">
          <a
            className={styles.navBrand}
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
          >
            {SITE_CONFIG.AUTHOR}
            <span className={styles.navPeriod}>.</span>
          </a>

          <ul className={styles.navLinks}>
            {menuItems.map((item) => (
              <li key={item.to}>
                <a
                  className={styles.navLink}
                  href={`#${item.to}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.to);
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
            {isDev && (
              <li>
                <RouterLink
                  className={styles.navLink}
                  to="/roadmap"
                  onClick={() =>
                    trackPortfolioEvents.navigationClick("roadmap")
                  }
                >
                  Roadmap
                </RouterLink>
              </li>
            )}
            {isDev && (
              <li>
                <RouterLink
                  className={styles.navLink}
                  to="/immersive"
                  onClick={() =>
                    trackPortfolioEvents.navigationClick("immersive")
                  }
                >
                  Imersivo
                </RouterLink>
              </li>
            )}
          </ul>

          <div className={styles.navActions}>
            <InstallButton />
            <ThemeToggle />
            <a
              className={styles.navCta}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
              data-testid="header-cta"
            >
              <span>Contato</span>
              <span className={styles.navCtaIcon} aria-hidden="true">
                ↗
              </span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              data-testid="mobile-menu-button"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <>
          <div
            className={styles.drawerOverlay}
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-menu"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            data-testid="mobile-menu"
          >
            <button
              type="button"
              className={styles.drawerClose}
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon />
            </button>
            <ul className={styles.drawerList}>
              {menuItems.map((item) => (
                <li key={item.to}>
                  <a
                    className={styles.drawerLink}
                    href={`#${item.to}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      // O drawer trava o scroll do body enquanto está aberto.
                      // Fechar e rolar no mesmo tick faz o scroll suave parar
                      // no lugar errado; o timeout roda depois do cleanup que
                      // destrava o body.
                      window.setTimeout(() => handleNavClick(item.to), 0);
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            {isDev && (
              <div className={styles.drawerDev}>
                <RouterLink
                  className={styles.drawerDevLink}
                  to="/roadmap"
                  onClick={() => setMobileOpen(false)}
                >
                  Roadmap (dev)
                </RouterLink>
                <RouterLink
                  className={styles.drawerDevLink}
                  to="/immersive"
                  onClick={() => setMobileOpen(false)}
                >
                  Prévia imersiva (dev)
                </RouterLink>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
