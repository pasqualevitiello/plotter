# Installation

Install the complete Plotter skill to draw, critique, refine, or animate construction illustrations with your coding agent. The website is a catalogue and companion guide; the installed skill works independently.

## Get the complete package

[Download the Plotter skill](/plotter/downloads/plotter.zip) and extract the archive. Keep the folder named `plotter`, with `SKILL.md`, `agents/`, `assets/`, `references/`, and `scripts/` inside it.

The canonical source is `skills/plotter` in the private `pasqualevitiello/plotter` repository. If you already have authenticated access, you can copy that folder from your checkout. A single copied `SKILL.md` file is incomplete: the instructions load the bundled SVG references, geometry helpers, examples, and exporter.

## Choose your agent

| Agent       | Personal installation      | Start a request |
| ----------- | -------------------------- | --------------- |
| Codex       | `~/.codex/skills/plotter`  | `$plotter`      |
| Claude Code | `~/.claude/skills/plotter` | `/plotter`      |

Place the complete extracted folder at the destination for your agent. The entrypoint should be directly at `~/.codex/skills/plotter/SKILL.md` or `~/.claude/skills/plotter/SKILL.md`, with no second nested `plotter` folder. If the agent is already open, start a new session so it can discover the installation.

For an update, replace the installed package as a complete folder. Keep your own drawings and custom overrides outside it so a package update does not replace your work.

## Make a first request

In Codex:

```text
$plotter Draw a 20-minute appointment between two 5-minute buffers.
Deliver an editable 560 × 440 SVG and a resolved static export.
Keep the forms transparent and make the interval proportions visible.
```

In Claude Code:

```text
/plotter Draw a 20-minute appointment between two 5-minute buffers.
Deliver an editable 560 × 440 SVG and a resolved static export.
Keep the forms transparent and make the interval proportions visible.
```

For an existing drawing, attach its editable source and describe the change. To animate it, name the movement and request its static fallback. One skill entrypoint chooses the [drawing](/docs/drawing) or [animation](/docs/animation) workflow.

## What you need

Reading the skill and opening its bundled SVGs needs no package manager or website checkout. The registration authoring example uses Node.js; the resolved static SVG exporter uses Python 3. The animation example opens in a modern browser with its packaged local stylesheet.

Recipients opening an exported SVG need neither Node.js nor Python. Cal Sans is optional for opening the files; a sans-serif fallback keeps labels editable, while exact text metrics depend on the font being available.

## Run the website

With Bun installed, run from the standalone repository root:

```sh
bun install
bun run dev
```

The development site uses port `3000`. The homepage is the main experience, and `/docs` contains these guides. Installing the skill does not require running the website.
