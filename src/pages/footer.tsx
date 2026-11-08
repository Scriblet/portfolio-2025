import { GitHub, LinkedIn, Instagram, Twitter } from "@mui/icons-material";
import { scroller } from "react-scroll";
import { trackPortfolioEvents } from "../services/analytics";
import { SOCIAL_LINKS, SITE_CONFIG } from "../data";
import { Hairline } from "../components/design-system";
import styles from "./pages.module.scss";

const footerNav = [
  { label: "Home", to: "home" },
  { label: "Experiência", to: "experience" },
  { label: "Jornada", to: "jornada" },
  { label: "Habilidades", to: "skills" },
  { label: "Toolbox", to: "toolbox" },
  { label: "Contato", to: "contact" },
];

const socials = [
  { label: "GitHub", href: SOCIAL_LINKS.GITHUB, Icon: GitHub },
  { label: "LinkedIn", href: SOCIAL_LINKS.LINKEDIN, Icon: LinkedIn },
  { label: "Instagram", href: SOCIAL_LINKS.INSTAGRAM, Icon: Instagram },
  { label: "Twitter", href: SOCIAL_LINKS.TWITTER, Icon: Twitter },
];

const Footer = () => {
  const handleSmoothScroll = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    trackPortfolioEvents.footerLinkClick(targetId);
    scroller.scrollTo(targetId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <p className={styles.footerWordmark}>
            {SITE_CONFIG.AUTHOR}
            <span className={styles.footerWordmarkPeriod}>.</span>
          </p>
          <p className={styles.footerTagline}>
            {SITE_CONFIG.TAGLINE}. Portfólio em constante evolução.
          </p>
          <div className={styles.footerSocials}>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                className={styles.footerSocialLink}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => trackPortfolioEvents.socialLinkClick(label.toLowerCase())}
              >
                <Icon fontSize="small" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Navegação do rodapé" className={styles.footerNav}>
          {footerNav.map(({ label, to }) => (
            <a
              key={to}
              className={styles.footerNavLink}
              href={`#${to}`}
              onClick={handleSmoothScroll(to)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <Hairline tone="dark" className={styles.footerRule} />

      <div className={styles.bigWordmarkWrap} aria-hidden="true">
        <span className={styles.bigWordmark}>
          {SITE_CONFIG.AUTHOR.toUpperCase()}.
        </span>
      </div>

      <div className={styles.footerFinePrint}>
        <span>
          © {new Date().getFullYear()} {SITE_CONFIG.AUTHOR}
        </span>
        <span>Feito com React + Vite + TypeScript</span>
      </div>
    </footer>
  );
};

export default Footer;
