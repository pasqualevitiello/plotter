import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const destination = resolve(root, "public/docs");
mkdirSync(destination, { recursive: true });
for (const filename of readdirSync(resolve(root, "content/docs"))) {
  if (filename.endsWith(".md")) copyFileSync(resolve(root, "content/docs", filename), resolve(destination, filename));
}
