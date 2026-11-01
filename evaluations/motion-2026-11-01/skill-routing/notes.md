# Routing motion

The viewer sees one request travel from B through the selected junction to 02, explaining how one closed contact chooses a route through the matrix.

- **Artifact:** `index.html`, self-contained inline SVG/CSS/JavaScript, native 560 × 440 and proportional on narrow screens. No visible playback controls or external resources.
- **Duration:** 5.4 seconds. `window.study.duration` exposes this; `window.study.seek(seconds)` pauses and renders the requested position using the playback renderer. Seek clamps to the cycle endpoints.
- **Design:** Preserve every supplied construction stroke, label, and opacity group. One 3-unit filled request marker moves; the grid, selected contact, and route stay fixed. The supplied SYS-02 catalogue reference was the direct visual reference. The motion examples informed constant travel and a deliberate arrival.
- **Beats:** 0–0.35s: route alone; 0.35–0.55s: request appears inside B; 0.55–0.9s: source registers; 0.9–3.3s: continuous transfer at 120 SVG units/s; 3.3–4.3s: receipt at 02; 4.3–4.6s: request clears; 4.6–5.4s: quiet interval. The marker turns without stopping at 2.2333s. The next cycle is a new request; nothing travels backward.
- **Fallback:** Authored markup already shows the receipt still, equivalent to 3.8s. Reduced motion selects that still and responds to preference changes. Normal playback pauses while hidden or outside the viewport.

## Checks performed

- Inspected the supplied SVG and rendered the matching bundled SYS-02 reference.
- Used `html_preview` to inspect travel and receipt at native size, the junction at 390px, and the script-free receipt still. The preview console reported no errors.
- Executed the actual inline script in a Node VM with mocked browser scheduling: verified nine exact timeline samples, paused seeking, loop wrap, reduced motion, live preference changes, and hidden-page clock suspension. The request reaches `(280, 212)` and `(280, 340)` exactly; tested coordinate residuals were below `1e-8` SVG units.
- Checked that the fallback is present in markup and no external assets are required.

## Limits

This is a conceptual routing diagram, not an electrical schematic or a claim about network latency. Empty intersections retain the supplied drawing’s convention; the original central filled contact stays selected. The moving filled point represents a request and momentarily coincides with that contact. Cal Sans is named but not embedded, so an unavailable font uses the system sans-serif fallback. The preview tool supplied sampled stills, not continuous playback; rhythm has not been visually verified through a full live cycle. Visibility and preference behavior were exercised with mocks, not an interactive browser session.
