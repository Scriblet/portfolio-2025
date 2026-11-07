import { Route, Routes } from "react-router-dom";
import Experience from "./pages/experience/experience";
import PhilosophyBanner from "./pages/filosofia/filosofia";
import Footer from "./pages/footer";
import ContactForm from "./pages/formContact/contactForm";
import GithubBanner from "./pages/github/github";
import Header from "./pages/header";
import Presentation from "./pages/presentation";
import SkillsSection from "./pages/skills/skills";
import ReadingProgress from "./components/ReadingProgress";
import Roadmap from "./pages/roadmap/roadmap";

const Portfolio = () => (
  <div className="app-container">
    <ReadingProgress />
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

export default function App() {
  return (
    <Routes>
      {import.meta.env.DEV && <Route path="/roadmap" element={<Roadmap />} />}
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}
