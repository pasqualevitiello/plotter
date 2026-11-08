# Contributing to Plotter

Start with the [local setup](README.md#run-the-website) and [repository guidelines](AGENTS.md). For illustration work, follow the [Plotter skill](skills/plotter/SKILL.md) and its drawing or animation workflow.

## Sources of truth

| Source                                           | Owns                                                                       |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| `skills/plotter/`                                | The complete, portable skill package                                       |
| `skills/plotter/assets/foundation/standard.json` | Shared numeric drawing roles and helper defaults                           |
| `skills/plotter/assets/foundation/`              | Portable geometry helpers and generated role styles                        |
| `components/plotter/drawings/`                   | Editable catalogue SVG sources                                             |
| `components/plotter/`                            | Website catalogue, animation timelines, playback, and grammar interactions |
| `content/docs/`                                  | Website documentation                                                      |
| `scripts/`                                       | Website adapters, generators, and export scripts                           |

Edit SVG sources before regenerating drawing components. Foundation runtime data, CSS, and reference tables derive from `standard.json`. Keep approved reference revisions and stable catalogue codes intact; historical records are evidence, not current instructions.

Drawings use a native `560 × 440` viewBox and scale proportionally in the website. Every current illustration uses 1-unit visible strokes. Shared role-token customization currently covers **AGT-01, MEC-05, GEO-11, SYS-06, and CRF-06**. Other drawings retain their authored opacity and dash patterns; uniform width does not imply a catalogue-wide token migration.

Keep static geometry, animation timing, and host playback separate. Website loops have no visible controls, pause off-screen, and use a readable static fallback for reduced motion. Preserve transparent forms, attached hatching, and one owner per shared edge.

## Regenerate affected outputs

Choose the commands that match the sources you changed:

```sh
python3 skills/plotter/scripts/build-standard.py # Shared standard outputs
bun run drawings                              # Drawing components
bun run grammar                               # Grammar components
bun run catalogue                             # Bundled catalogue SVGs and index
bun run downloads                             # Catalogue, downloads, and public docs
```

After a shared-standard change, regenerate the drawing components that consume it. After a catalogue change, refresh the bundled catalogue. `bun run build` also refreshes the documentation copies in `public/docs` before building the website.

The [website integration guide](skills/plotter/references/implementation.md) maps individual adapters and export paths. Generation produces files; it does not establish visual correctness.

Repository previews live in `.github/assets/`. The cover combines **OBJ-05** and **NAT-01**; the animation comes from **MEC-01**. Preview SVGs outline typography for consistent rendering and have 3200-pixel-wide PNG companions. The iris GIF is exported at twice its displayed size and has a static SVG fallback for reduced motion. Editable text and drawing sources remain in the catalogue and animation components; refresh these presentation exports when the featured artwork changes.

## Formatting and checks

Biome formats handwritten JavaScript/TypeScript, JSON, CSS, Markdown, and YAML: two spaces, 80 columns, double quotes, and trailing commas. Use the recommended Biome editor extension for formatting on save.

```sh
bun run format        # Format source files
bun run format:check  # Read-only formatting check; also runs in CI
bun run imports       # Organize imports separately
bun run lint          # Report lint diagnostics
bun run lint:fix      # Apply safe lint fixes for review
bun run typecheck
bun run plotter:check
```

Formatting does not apply lint fixes. Linting uses Biome’s recommended rules and reports Tailwind class ordering; it is separate from the formatting CI job. Neither fix command enables unsafe fixes.

Generated drawing components, foundation outputs, public assets, and historical records are excluded in `biome.json`. SVG sources and HTML examples are excluded to preserve reference hashes and embedded stylesheet checks. Markdown code blocks stay as authored. Python is outside Biome’s scope.

## Review and portable output

Include the brief and relevant before/after drawings when proposing visual changes. Inspect the drawing at its intended size and, for motion, watch a complete cycle and inspect its fallback. Report the review actually performed; sampled frames establish poses, not playback rhythm.

Keep exports independent of the website. Resolved static SVG carries its own appearance and definitions. Standalone animation includes its editable timeline and required local resources, or inlines them in one HTML file. Exact Cal Sans appearance requires the font to be available; SVG text remains editable with a sans-serif fallback.

The skill’s historical coss paths and review records remain as provenance. Preserve [ATTRIBUTION.md](ATTRIBUTION.md), [LICENSE](LICENSE), and accompanying third-party license information.
