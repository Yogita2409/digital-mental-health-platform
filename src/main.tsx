import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // <-- HashRouter avoids blank page issues
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
