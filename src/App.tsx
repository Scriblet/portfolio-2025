import Experience from "./pages/experience/experience";
import PhilosophyBanner from "./pages/filosofia/filosofia";
import GithubBanner from "./pages/github/github";
import Header from "./pages/header";
import Presentation from "./pages/presentation";
import SkillsSection from "./pages/skills/skills";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          gap: "64px",
          flexDirection: "column",
        }}
      >
        <Presentation />
        <Experience />
        <PhilosophyBanner />
        <SkillsSection />
        <GithubBanner />
      </div>
    </div>
  );
}
