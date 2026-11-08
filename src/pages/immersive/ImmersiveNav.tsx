import { Link as RouterLink } from "react-router-dom";
import { navLinks } from "./content";
import styles from "./immersive.module.scss";

const ImmersiveNav = () => (
  <div className={styles.navWrap}>
    <nav className={styles.nav} aria-label="Navegação da prévia imersiva">
      <a className={styles.navBrand} href="#immersive-hero">
        Lucas Nonato<span className={styles.navPeriod}>.</span>
      </a>

      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <RouterLink className={styles.navCta} to="/">
        <span>Portfólio</span>
        <span className={styles.navCtaIcon} aria-hidden="true">
          ↗
        </span>
      </RouterLink>
    </nav>
  </div>
);

export default ImmersiveNav;
