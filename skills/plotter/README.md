# Plotter

Editable flat monochrome construction illustrations, with drawing and animation workflows.

## Install and invoke

Copy this **complete `plotter` directory** into the agent’s personal skills directory, keeping its name and relative paths:

| Agent | Destination | Invocation |
| --- | --- | --- |
| Codex | `~/.codex/skills/plotter` | `$plotter` |
| Claude Code | `~/.claude/skills/plotter` | `/plotter` |

The canonical source is `skills/plotter` in the private `pasqualevitiello/plotter` repository. Obtain it through authenticated repository access or the complete skill download. Update installed copies as complete folders. Standalone work needs no website checkout, conversation history, package manager, or external font download.

Example briefs for Codex:

- “Use $plotter to show a 20-minute appointment between two 5-minute buffers as a standalone 560 × 440 SVG.”
- “Use $plotter to illustrate agent registration as fragments becoming one record. Keep the forms transparent and use a grid only if it explains the construction.”
- “Use $plotter to animate this SVG so the selected core seats in the carrier. Preserve its static appearance and include pause/replay and a reduced-motion still.”
- “Use $plotter to critique this loop’s contact and hatch behavior without editing it.”

In Claude Code, start the same request with `/plotter`. One entrypoint routes to the [drawing workflow](references/drawing.md) or [animation workflow](references/motion.md); both share direction, grammar, tokens, and references.

## What is portable

Seven bundled SVG anchors support construction-reference selection. The [visual grammar](references/visual-grammar.md) includes teaching SVGs; the [foundation](references/foundation.md) contains dependency-free geometry helpers and generated role styles. [Website integration](references/implementation.md) and dated feedback are optional branches.

| Example | Open or generate it from the copied skill directory |
| --- | --- |
| Static registration, using the shared arrow/dimension helpers | `node assets/examples/registration.mjs > registration.svg` |
| Resolved static SVG with editable labels | `python3 scripts/export-svg.py registration.svg registration-export.svg --id-prefix registration` |
| Animation and static fallback, with shared role CSS | Open `assets/examples/assembly-motion.html` in a modern browser; keep `assets/foundation/roles.css` in place. |

Node.js is needed for the authoring example; Python 3 is needed for the static exporter. Recipients opening a resolved SVG need neither. The motion example uses browser SVG animation and a small player without a build or server. Keep its local stylesheet alongside it, or inline that generated stylesheet when delivering one HTML file. Exact Cal Sans typography depends on the font being available; the fallback is sans-serif.

The examples demonstrate implementation; they are not additional approved style references. The static exporter handles the selected still, not active animation.

## Maintain the package

[`standard.json`](assets/foundation/standard.json) owns shared numeric defaults; `scripts/build-standard.py` generates runtime data, CSS, and marked drafting tables. Generated or example-embedded styles are outputs, not separate palettes. Regenerate an example’s SVG before export when the standard changes. Website token adoption currently covers AG01 and W05; legacy catalogue drawings retain their authored treatment.

Current instructions live outside [history](references/history/index.md). Preserve the seven reference snapshots and their revision manifest. Historical coss records establish only their original tasks and revisions; coss paths in those records are provenance, not active dependencies. Update general guidance from specific evidence rather than extending every past preference to all drawings.

See [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE) for the preserved source and licensing record.
