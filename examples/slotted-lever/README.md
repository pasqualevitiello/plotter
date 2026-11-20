# A rotation becomes a return

A standalone Plotter adaptation of the supplied `Untitled.mov`. Open
`slotted-lever.html` directly; it contains the drawing, timeline, player, shared
role stylesheet, and Cal Sans font. No server or website build is needed.

The rotating crank pin stays on a circular locus and inside the rocking lever’s
slot. A fixed-length connecting link drives a carriage along horizontal rails.
Hatching identifies the output carriage. This is an ideal geometric construction,
not a manufacturing or dynamics model.

The composition borrows the shared center and generating locus from **Circle,
square, line**, and the constrained output relationship from **An offset becomes
a lift**. It retains the supplied clip’s linkage and three-spoke wheel, with a
six-second constant-speed crank revolution. The return emerges from the linkage;
there are no holds, easing effects, or resets at the cycle boundary.

- `geometry.mjs`: dimensions and pose calculation, independent of playback.
- `drawing.mjs`: editable SVG construction using the canonical Plotter foundation.
- `player.js`: clock, controls, visibility suspension, and reduced-motion fallback.
- `build.mjs`: self-contained HTML and themeable SVG generation.
- `slotted-lever.svg`: editable themeable source, with embedded role CSS.
- `slotted-lever-export.svg`: resolved static export with embedded Cal Sans.
- `slotted-lever-light.png` and `slotted-lever-dark.png`: still previews.

Rebuild from the repository root:

```sh
node examples/slotted-lever/build.mjs
python3 skills/plotter/scripts/check.py examples/slotted-lever/slotted-lever.svg
python3 skills/plotter/scripts/export-svg.py examples/slotted-lever/slotted-lever.svg examples/slotted-lever/slotted-lever-export.svg --embed-font
python3 skills/plotter/scripts/render.py examples/slotted-lever/slotted-lever.svg --theme both
```

Inspected the selected still in light and dark at 560 × 440, three additional
quarter-cycle poses, and the HTML at desktop and narrow widths. The SVG checker
and source lint pass. Headless Chromium interaction checks passed for animation,
pause/resume, replay, still selection, scrubbing, and changing reduced-motion
preferences. Source review covers off-screen/document visibility suspension.
A 60,001-pose sweep found a maximum connecting-link length residual of
4.3 × 10⁻¹⁴ units; the carriage stays inside the rails and the crank pin inside
the slot. Full-cycle normal-speed rhythm has not been visually reviewed.

The website includes this study at `/animations#slotted-lever-animation`. Its
generated React drawing comes from the standalone SVG, while the native SVG
timeline samples the same `geometry.mjs`. Run `bun run drawings` to regenerate
both outputs. The gallery uses the shared playback wrapper without controls.
