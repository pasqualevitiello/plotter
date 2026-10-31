# Plotter

Editable monochrome construction illustrations. Plotter pairs a visual grammar with native SVG drawings, drawing and animation workflows, and a small portable geometry foundation.

This is the standalone home of Plotter, extracted from coss. The repository is private at [pasqualevitiello/plotter](https://github.com/pasqualevitiello/plotter).

## Explore locally

With Bun installed, run from the repository root:

```sh
bun install
bun run dev
```

The development site uses port `4100`. The homepage presents Plotter’s drawings and workflows. `/proto` contains the design exploration. Documentation covers [installation](content/docs/installation.md), [drawing](content/docs/drawing.md), [animation](content/docs/animation.md), and [customization](content/docs/customization.md).

## Install the skill

Copy the **complete** [`skills/plotter`](skills/plotter) folder to your agent’s personal skills directory, preserving its name and relative paths:

| Agent | Destination | Invocation |
| --- | --- | --- |
| Codex | `~/.codex/skills/plotter` | `$plotter` |
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

Shared role tokens are adopted by **AG01 and W05**. Other catalogue drawings retain their authored appearance; the extraction does not imply a gallery-wide token migration.

Portable output includes resolved static SVG and animated HTML with its required local resources. The skill runs independently of the website. Exact Cal Sans appearance requires the font to be available; SVG text remains editable with a sans-serif fallback.

Historical coss paths, routes, and review records remain in the package as provenance. See [ATTRIBUTION.md](ATTRIBUTION.md) and the preserved [LICENSE](LICENSE) for the source and licensing record.
