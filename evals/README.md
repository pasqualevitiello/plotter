# Cold-run briefs

Seventeen briefs that show what the downloadable skill produces for someone who has never seen this repository. Run them after any change to `skills/plotter`, then compare the drawings with the previous run and with the catalogue.

```sh
bun run downloads        # rebuild the archive under test
evals/run.sh claude      # or: evals/run.sh claude opus
evals/run.sh codex       # needs the same build at ~/.codex/skills/plotter
evals/run.sh claude sonnet 07   # one brief, by number
```

Each brief runs in its own fresh session in a temporary folder outside this checkout, printed when the run ends; set `PLOTTER_EVAL_OUT` to choose another. A session started inside the checkout would read this repository’s `AGENTS.md` and stop being a clean install. The session's files are the deliverables; `transcript.jsonl` records what the agent read, ran, and reported.

| Briefs | What they test                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------ |
| 01–03  | README briefs. Each describes a catalogue drawing, so they mostly test retrieval.                      |
| 04–05  | Open briefs. The agent should stop and offer three options.                                            |
| 06–10  | Plain-language subjects, including a small size and TSX.                                               |
| 11     | Animating a supplied drawing into one self-contained HTML file.                                        |
| 12     | Critique. `upload-card.svg` has eight planted faults, listed below; none may be fixed.                 |
| 13–16  | Small placements and feature subjects. No pictogram as the main form; a compact version, not a redraw. |
| 17     | “Draw a magnifying glass.” The object is the brief, so a large constructed magnifier is correct here.  |

Planted faults in `attachments/upload-card.svg`: a gradient and drop shadow on the card; a skewed icon; hatching that leaves its region; a 240-unit span labelled 200; a dashed arrowhead on an arrow used for alignment; a heavy unexplained grid with every stroke at full weight; a letter-spaced bold title with straight quotes and a hyphen; a rule through the title.

Judge the drawings by eye. Rendering a result with `python3 skills/plotter/scripts/render.py` shows what the agent saw, or should have seen. One run per brief is a single sample, so a difference between two runs is not evidence until it repeats.
