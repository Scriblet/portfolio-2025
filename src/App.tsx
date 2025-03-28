import Header from "./pages/header";
import Presentation from "./pages/presentation";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ marginTop: "10vh" }}>
        <Presentation />
      </div>
    </div>
  );
}
