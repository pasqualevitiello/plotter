# Corner construction

- Artifact: `index.html`; self-contained inline SVG, CSS, and JavaScript. Native size 560 × 440, responsive down to 240 px wide. No visible controls or external assets.
- Duration: **10 seconds**, repeating. Hold R104 from 0–1.2 s; contract over 3 s; hold R80 from 4.2–5.8 s; expand over 3 s; hold R104 to the loop boundary. Quintic easing brings speed and acceleration to zero at each transition.
- The common center remains at (282, 212). Inner radius = outer radius − 24. Tangents, circles, projection, radius arrow, and measurement marks derive from the same radius. The value is quantized to 0.1 unit so displayed measurements match the geometry exactly. The lower offset measurement stays labeled 24.
- Preserved the supplied monochrome construction, quiet guides, and generous whitespace. Motion changes the corner itself; no entrance or decorative animation.
- `window.study.duration` is 10. `window.study.seek(seconds)` clamps to 0–10, pauses playback, and renders the same timeline used by normal playback.
- Reduced motion and no JavaScript show the complete R104 / inner R80 construction with its 24-unit offset.

## Checks performed

- Used `html_preview` to inspect both endpoint drawings at 560 px, the R92 midpoint at 320 px, the script-free still, and a simulated reduced-motion still. No preview console errors.
- Executed browser assertions over 1,001 timeline samples: outer radius stays within 80–104 and the offset stays 24. Also checked expected endpoint/midpoint values, tangent positions, and that seeking stays paused across two animation frames.
- Confirmed 320 px layout has equal client and scroll widths; the native preview is 560 × 440.
- Reduced-motion simulation remained at timeline position zero across two animation frames.

## Limitations

- Cal Sans is used if locally installed; the file embeds no font and otherwise uses Arial/sans-serif.
- Fine labels scale with the SVG and are small on narrow screens.
- Preview verification sampled the timeline; it did not include watching a full real-time loop or testing an OS-level reduced-motion preference.
