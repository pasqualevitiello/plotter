# Assembly study

- **Artifact:** `index.html`; inline, editable SVG/CSS/JavaScript; native 560 × 440 and responsive. No visible controls or external resources.
- **Duration:** 9.6 seconds. `window.study.duration` returns seconds; `window.study.seek(seconds)` pauses playback and evaluates the same timeline at a clamped exact position.
- **Relationship:** the viewer sees three identifiable parts move into shared row spacing, explaining how separate UI fragments become one composition. The carrier stays fixed during placement. Parts retain their size; all move 137 units down and Workspace also moves 11 units left.
- **Beats:** exploded hold to 0.70; icon 0.70–1.70; Workspace 1.35–2.35; Ready 2.00–3.00; completed reading hold 3.00–5.80; the completed construction leaves intact as a fresh exploded construction indexes in from 5.80–8.40; rest to 9.60. The repeat has matching position and zero speed at its seam.
- **Treatment:** original monochrome linework, transparency, text, dimensions, and part geometry retained. Guides withdraw before their associated part crosses them. Transparent clearance masks remove the carrier line briefly at each entry; there are no opaque patches or duplicate seated outlines. The repeat is a conceptual succession of constructions, not a physical conveyor claim.
- **Fallback:** no JavaScript and reduced motion show the original exploded-and-complete composition, not an arbitrary intermediate pose. Preference changes update the still. Normal playback pauses while hidden or outside the viewport.

## Checks performed

Read the supplied revised Plotter skill and its animation, direction, grammar, standard, reference, and motion-example guidance. Inspected the supplied SVG and bundled INT-02 reference using `html_preview` at native size. Inspected timeline frames at 0, 1.2, 2.5, 3.4, 7.1, and 9.6 seconds, plus the icon crossing at 1.42 seconds. JavaScript syntax check passed. Browser assertions passed for the exact three final transforms, removed fallback duplicates, matching loop-seam content and position, 961 finite timeline samples, and mask attachment. Simulated reduced-motion initialization and live preference changes passed. Inspected the no-JavaScript still at 280 × 220 and the reduced-motion still at 560 × 440. Preview reported no errors.

## Limits

The available preview produces still frames; full-cycle playback rhythm was not visually verified. Visibility pausing was implemented but not exercised in a hidden-tab/off-screen browser session. Cal Sans is requested with a sans-serif fallback; the font is not bundled, so exact host typography depends on its availability. This is a conceptual UI illustration, not an engineering specification.
