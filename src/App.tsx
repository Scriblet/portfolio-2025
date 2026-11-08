import { lazy, Suspense, type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./pages/header";
import Presentation from "./pages/presentation";
import ReadingProgress from "./components/ReadingProgress";
import OfflineNotice from "./components/pwa/OfflineNotice";
import SectionFallback, {
  type SectionFallbackVariant,
} from "./components/SectionFallback";
import LazySectionErrorBoundary from "./components/LazySectionErrorBoundary";
import { GrainOverlay } from "./components/design-system";
import { RevealRoot } from "./hooks/useRevealOnScroll";
const Roadmap = lazy(() => import("./pages/roadmap/roadmap"));
const Immersive = lazy(() => import("./pages/immersive/immersive"));

// Dobra inicial (Header + Presentation) continua eager; todo o resto vira
// chunk próprio, baixado logo após o primeiro commit.
const Experience = lazy(() => import("./pages/experience/experience"));
const Timeline = lazy(() => import("./pages/timeline/timeline"));
const PhilosophyBanner = lazy(() => import("./pages/filosofia/filosofia"));
const SkillsSection = lazy(() => import("./pages/skills/skills"));
const Toolbox = lazy(() => import("./pages/toolbox/toolbox"));
const GithubBanner = lazy(() => import("./pages/github/github"));
const ContactForm = lazy(() => import("./pages/formContact/contactForm"));
const Footer = lazy(() => import("./pages/footer"));

type LazySectionProps = {
  variant: SectionFallbackVariant;
  /** Âncora preservada no fallback para o react-scroll durante o load. */
  anchorId?: string;
  children: ReactNode;
};

const LazySection = ({ variant, anchorId, children }: LazySectionProps) => (
  <LazySectionErrorBoundary>
    <Suspense fallback={<SectionFallback variant={variant} id={anchorId} />}>
      {children}
    </Suspense>
  </LazySectionErrorBoundary>
);

const Portfolio = () => (
  <div className="app-container">
    <a href="#home" className="skip-link">
      Pular para o conteúdo
    </a>
    <ReadingProgress />
    <Header />
    <RevealRoot>
      <main className="main-content" id="home">
        <Presentation />
        <LazySection variant="experience" anchorId="experience">
          <Experience />
        </LazySection>
        <LazySection variant="timeline" anchorId="jornada">
          <Timeline />
        </LazySection>
        <LazySection variant="philosophy">
          <PhilosophyBanner />
        </LazySection>
        <LazySection variant="skills" anchorId="skills">
          <SkillsSection />
        </LazySection>
        <LazySection variant="toolbox" anchorId="toolbox">
          <Toolbox />
        </LazySection>
        <LazySection variant="github">
          <GithubBanner />
        </LazySection>
        <LazySection variant="contact" anchorId="contact">
          <ContactForm />
        </LazySection>
      </main>
      <LazySection variant="footer">
        <Footer />
      </LazySection>
    </RevealRoot>
    <OfflineNotice />
    <GrainOverlay />
  </div>
);

export default function App() {
  return (
    <Routes>
      {import.meta.env.DEV && <Route path="/roadmap" element={<Roadmap />} />}
      <Route
        path="/immersive"
        element={
          <Suspense
            fallback={
              <div
                aria-hidden="true"
                style={{ minHeight: "100vh", background: "var(--void)" }}
              />
            }
          >
            <Immersive />
          </Suspense>
        }
      />
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}
