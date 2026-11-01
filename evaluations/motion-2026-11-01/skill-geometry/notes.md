# The corner rule

Finished artifact: `index.html`, a self-contained editable SVG/CSS/JS illustration. Native 560 × 440, proportionally responsive, no visible controls. Duration: **8 seconds**. `window.study.seek(seconds)` pauses the same timeline at a clamped 0–8-second position and returns the current geometry.

The viewer sees the outer radius change, which explains that a constant offset does not require a constant radius. Center (282, 212) stays fixed. Outer radius varies 104 → 80 → 104; inner radius is always outer minus 24. Straight segments remain tangent. Circle remainders, envelope, dimensions, witnesses, and labels derive from the same radius. Radius text is rounded to the nearest 0.1; the offset reads 24. Units are SVG construction units, not physical dimensions.

Beats: 0–0.9 s hold R104; 0.9–3.1 s ease to R80; 3.1–4.9 s hold R80; 4.9–7.1 s ease to R104; 7.1–8 s hold. The seam joins two halves of one 1.8-second hold. Quintic easing gives zero velocity and acceleration at each adjustment boundary. Reversal represents an adjustable corner, so the return preserves the explanation.

The supplied composition and opacity hierarchy are retained. No new decorative entrances or pulsing. The original ambiguous offset label “u” now reads “24”. The radius label moves within the inner clearance; a first preview exposed a collision with the contracting inner arc, which was corrected. Relevant supplied references inspected: GEO-01, dimension grammar, centerline grammar, and motion guidance. Dimension helpers are inlined from the supplied foundation.

Checks actually performed:
- `html_preview` inspection at R104, R92, and R80 at 560 px; an intermediate 320 px preview confirmed proportional fitting. Final R80 preview inspected after the label-clearance correction. No browser console errors.
- 801 exact timeline samples through the authored runtime: constant offset maximum residual 1.43e−14 units; radius-leader endpoint maximum residual 4.27e−14 units; numeric-label rounding error below 0.05 units. All arcs remain centered at (282, 212).
- Runtime harness verified normal startup schedules animation, seek cancels it and remains paused across visibility changes, reduced motion renders R104 without scheduling animation, and live preference changes select the still or resume playback.
- The meaningful R104/inner R80/offset 24 still is fully present before JavaScript. Off-screen and hidden-page playback suspends without advancing the illustration.

Limitations: sampled frames establish poses and clearances; a full cycle was not watched at normal speed, so rhythm is not claimed as visually verified. Cal Sans is used when installed; the preview used the available sans-serif fallback, and exact Cal Sans glyph metrics were not verified. At narrow widths the native drawing scales, including annotations. This is a geometric illustration, not a physical specification.

`build.mjs` is optional authoring source; it rebuilds using the supplied skill foundation. `check.mjs` records the focused runtime checks. Neither file is required to open `index.html`.
