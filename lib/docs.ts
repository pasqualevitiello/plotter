import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const documents = [
  {
    slug: "installation",
    title: "Install Plotter",
    description: "Bring the complete skill into Codex or Claude.",
  },
  {
    slug: "drawing",
    title: "Draw an illustration",
    description: "Turn a brief into an editable construction study.",
  },
  {
    slug: "animation",
    title: "Add motion",
    description: "Make a relationship unfold without losing the drawing.",
  },
  {
    slug: "customization",
    title: "Tokens and exports",
    description: "Customize supported linework and deliver portable files.",
  },
] as const;

export function readDocument(slug: string) {
  if (!documents.some((document) => document.slug === slug)) return null;
  return readFile(join(process.cwd(), "content/docs", `${slug}.md`), "utf8");
}
