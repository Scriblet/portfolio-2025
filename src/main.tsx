import React from "react";
import ReactDOM from "react-dom/client";
import { initGA } from "./services/analytics";
import { ColorModeProvider } from "./theme/ColorModeProvider";
import ThemedApp from "./theme/ThemedApp";
import "./index.css";
import "./styles/responsive-utils.css";
import "./styles/design-system.css";

import "@fontsource/syne/latin-600.css";
import "@fontsource/syne/latin-700.css";
import "@fontsource/syne/latin-800.css";
import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/sora/latin-400.css";
import "@fontsource/sora/latin-500.css";

// Inicializar Google Analytics
initGA();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider>
  </React.StrictMode>,
);
