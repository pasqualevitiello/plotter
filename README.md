# Plotter

Editable monochrome construction illustrations. Plotter pairs a visual grammar with native SVG drawings, drawing and animation workflows, and a small portable geometry foundation.

This is the standalone home of Plotter, extracted from coss. The repository is private at [pasqualevitiello/plotter](https://github.com/pasqualevitiello/plotter).

## Explore locally

With Bun installed, run from the repository root:

```sh
bun install
bun run dev
```

The development site uses port `3000`. Every page uses the Sheet design: one ruled drawing sheet, with drawings at their native 560 × 440. The former `/proto` links redirect to the homepage. Documentation covers [installation](content/docs/installation.md), [drawing](content/docs/drawing.md), [animation](content/docs/animation.md), and [customization](content/docs/customization.md).

## Formatting and checks

Biome owns formatting for handwritten JavaScript/TypeScript, JSON, CSS, Markdown, and YAML. It uses the coss style: two spaces, 80 columns, double quotes, and trailing commas. Install the recommended Biome editor extension to format on save.

```sh
bun run format        # Format source files
bun run format:check  # Check formatting without writing (also runs in CI)
bun run imports       # Organize imports separately
bun run lint          # Report lint diagnostics
bun run lint:fix      # Apply safe lint fixes for review
bun run typecheck
bun run plotter:check
```

Formatting does not apply lint fixes. Linting uses Biome’s recommended rules and reports Tailwind class ordering; it is a separate check from the formatting CI job. Neither fix command enables unsafe fixes.

Generated drawing components, foundation outputs, public assets, and historical reference records are excluded in `biome.json`. SVG sources and HTML examples are also excluded to preserve reference hashes and embedded stylesheet checks. Markdown code blocks stay as authored. Python scripts are outside Biome’s scope. After editing website documentation, `bun run build` refreshes its copies in `public/docs`.

## Install the skill

Copy the **complete** [`skills/plotter`](skills/plotter) folder to your agent’s personal skills directory, preserving its name and relative paths:

| Agent       | Destination                | Invocation |
| ----------- | -------------------------- | ---------- |
| Codex       | `~/.codex/skills/plotter`  | `$plotter` |
| Claude Code | `~/.claude/skills/plotter` | `/plotter` |

Use your authenticated repository access or the complete skill download from the site. A single `SKILL.md` file is not a complete installation: the workflows load bundled references, SVGs, geometry helpers, and exporters. One entrypoint handles drawing, critique, refinement, and animation.

Example for Codex:

> Use $plotter to draw a 20-minute appointment between two 5-minute buffers as an editable 560 × 440 SVG.

For Claude Code, start the same brief with `/plotter`.

## Source boundaries

- `skills/plotter/` is the canonical skill package. Its `assets/foundation/standard.json` owns shared numeric defaults; its adjacent foundation module owns geometry.
- `components/plotter/` contains the website’s catalogue, playback, and grammar interactions. Editable SVGs remain the source of generated drawing components.
- `content/docs/` contains the website documentation.
- `scripts/` contains website adapters and generation scripts. Download artifacts are produced by `bun scripts/build-plotter-downloads.tsx`.

Shared role tokens are adopted by **AGT-01, MEC-05, GEO-11, SYS-06, and CRF-06**. Every current illustration uses 1-unit visible strokes. Other drawings retain their authored opacity and dash patterns; uniform width does not imply a gallery-wide token migration.

Portable output includes resolved static SVG and animated HTML with its required local resources. The skill runs independently of the website. Exact Cal Sans appearance requires the font to be available; SVG text remains editable with a sans-serif fallback.

Historical coss paths, routes, and review records remain in the package as provenance. See [ATTRIBUTION.md](ATTRIBUTION.md) and the preserved [LICENSE](LICENSE) for the source and licensing record.
