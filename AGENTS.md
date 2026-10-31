# Repository instructions

For creating, critiquing, refining, or animating Plotter illustrations, read [skills/plotter/SKILL.md](skills/plotter/SKILL.md). Use its drawing or animation workflow and load only the references relevant to the task.

## Sources of truth

- `skills/plotter/` is the canonical portable package. Preserve one skill entrypoint and one shared token/geometry implementation.
- `skills/plotter/assets/foundation/standard.json` owns numeric role defaults and helper constants. Its generated runtime data, CSS, and reference tables are outputs.
- Edit catalogue and grammar SVG sources before regenerating their React output. Keep stable study IDs and approved reference revisions.
- Token adoption currently covers AG01 and W05. Preserve legacy drawings’ authored styling unless a change is requested.

## Preserve the art

Keep drawings at their native `560 × 440` geometry and preserve their composition during implementation changes. Forms remain transparent; hatch marks identify bounded regions and travel with those regions. Give each coincident edge one stroke owner. Preserve the grammar’s hover, keyboard, touch, and isolation behavior without boosting the selected marks’ styling.

Keep static drawings, timelines, and playback responsibilities separate. Preserve pause/resume, replay, static fallback, reduced motion, and visibility behavior when changing motion.

## Typography and records

Use Cal Sans with no added letter-spacing, `font-optical-sizing: auto`, one `GEOM` value per role, and `font-synthesis: none`. Keep text editable and use typeset punctuation (’ – − “ ”).

Treat coss paths and evaluations under `skills/plotter/references/history/` as historical evidence. Keep current integration paths in `skills/plotter/references/implementation.md`. Report only inspection and verification actually performed; source generation does not establish visual approval.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
