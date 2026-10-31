import { createRoot } from "react-dom/client";
import { PrototypeHarness } from "./harness";

const element = document.getElementById("plotter-preview");

if (element) {
  const value = Number(element.dataset.variant ?? new URLSearchParams(window.location.search).get("v"));
  const initialVariant = Number.isInteger(value) && value >= 1 && value <= 3 ? value - 1 : 0;
  createRoot(element).render(<PrototypeHarness initialVariant={initialVariant} />);
}
