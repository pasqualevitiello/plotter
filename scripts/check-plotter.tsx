/// <reference types="bun-types" />

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { YAML } from "bun";
import { renderToStaticMarkup } from "react-dom/server";
import { concepts } from "../components/plotter/coss-concepts";
import { illustrations } from "../components/plotter/illustrations";
import { familyPrefix } from "../components/plotter/study-types";

const skillRoot = resolve(import.meta.dir, "../skills/plotter");
const skill = readFileSync(resolve(skillRoot, "SKILL.md"), "utf8");
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatter?.[1]) throw new Error("Plotter is missing YAML frontmatter.");
const metadata = YAML.parse(frontmatter[1]) as Record<string, unknown>;
if (metadata.name !== "plotter" || typeof metadata.description !== "string") {
  throw new Error("Plotter needs a name and description for skill discovery.");
}

function checkLinks(directory: string) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) checkLinks(file);
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (!target) continue;
      if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith("#"))
        continue;
      statSync(resolve(dirname(file), target.replace(/#.*/, "")));
    }
  }
}
checkLinks(skillRoot);

const referenceRoot = resolve(skillRoot, "references/drawings");
const manifest = JSON.parse(
  readFileSync(resolve(referenceRoot, "manifest.json"), "utf8"),
) as { references: { code: string; file: string; sha256: string }[] };
for (const reference of manifest.references) {
  const contents = readFileSync(resolve(referenceRoot, reference.file));
  const hash = createHash("sha256").update(contents).digest("hex");
  if (hash !== reference.sha256) {
    throw new Error(
      `${reference.code}: bundled snapshot differs from its manifest.`,
    );
  }
}

const codes = new Set<string>();
const ids = new Set<string>();
const svgIds = new Set<string>();
for (const study of illustrations) {
  if (codes.has(study.code) || ids.has(study.id)) {
    throw new Error(`${study.code}: duplicate catalog code or deep-link ID.`);
  }
  codes.add(study.code);
  ids.add(study.id);
  const svg = renderToStaticMarkup(study.illustration);
  if (!svg.startsWith("<svg") || !svg.includes('viewBox="0 0 560 440"')) {
    throw new Error(`${study.code}: expected a 560 × 440 SVG.`);
  }
  for (const match of svg.matchAll(/\bid="([^"]+)"/g)) {
    const id = match[1];
    if (!id) continue;
    if (svgIds.has(id)) throw new Error(`Duplicate SVG ID: ${id}`);
    svgIds.add(id);
  }
}

// Codes: a three-letter family prefix and a number, without gaps in a family.
// Every coded drawing is bundled in the skill, so a brief can cite it.
const catalogueRoot = resolve(skillRoot, "references/catalogue");
const catalogueIndex = readFileSync(resolve(catalogueRoot, "index.md"), "utf8");
const coded = [
  ...illustrations.map((study) => ({
    code: study.code,
    prefix: familyPrefix[study.category],
  })),
  ...concepts.map((concept) => ({ code: concept.code, prefix: "COS" })),
];
const numbers = new Map<string, number[]>();
for (const { code, prefix } of coded) {
  const match = code.match(/^([A-Z]{3})-(\d{2})$/);
  if (!match || match[1] !== prefix) {
    throw new Error(`${code}: expected a ${prefix}-NN code for its family.`);
  }
  numbers.set(prefix, [...(numbers.get(prefix) ?? []), Number(match[2])]);
  statSync(resolve(catalogueRoot, `${code}.svg`));
  if (!catalogueIndex.includes(`[${code}](${code}.svg)`)) {
    throw new Error(`${code}: missing from the bundled catalogue index.`);
  }
}
for (const [prefix, values] of numbers) {
  const sorted = [...values].sort((a, b) => a - b);
  sorted.forEach((value, index) => {
    if (value !== index + 1) {
      throw new Error(`${prefix}: codes must run from 01 without gaps.`);
    }
  });
}
const bundled = readdirSync(catalogueRoot).filter((file) =>
  file.endsWith(".svg"),
);
if (bundled.length !== coded.length) {
  throw new Error(
    `Catalogue has ${bundled.length} SVGs for ${coded.length} codes. Run \`bun run catalogue\`.`,
  );
}

console.log(
  `Plotter: ${illustrations.length} drawings render, catalog/SVG IDs are unique, ${coded.length} codes follow the family scheme and are bundled, skill links resolve, and ${manifest.references.length} reference hashes match.`,
);
console.log(
  "Visual fit and geometric claims still need review of the affected drawings.",
);
