import Experience from "./pages/experience/experience";
import PhilosophyBanner from "./pages/filosofia/filosofia";
import Footer from "./pages/footer";
import ContactForm from "./pages/formContact/contactForm";
import GithubBanner from "./pages/github/github";
import Header from "./pages/header";
import Presentation from "./pages/presentation";
import SkillsSection from "./pages/skills/skills";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Presentation />
        <Experience />
        <PhilosophyBanner />
        <SkillsSection />
        <GithubBanner />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}
