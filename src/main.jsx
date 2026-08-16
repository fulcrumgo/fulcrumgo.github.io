import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Served from https://r11up.github.io/fulcrum/, so the router has to know that
// "/about" actually lives at "/fulcrum/about". Derived from Vite's base so the
// two can never drift apart.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");

const container = document.getElementById("root");

const tree = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages ship prerendered markup, so attach to it rather than
// throwing it away. The dev server has an empty root, which needs createRoot.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
