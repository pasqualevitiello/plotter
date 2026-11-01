# Switching matrix — plain control

- Deliverable: `index.html`; self-contained inline SVG, CSS, and JavaScript, with a responsive 560 × 440 native viewBox and no visible controls.
- Duration: **6.4 seconds**. `window.study.duration` reports the duration; `window.study.seek(seconds)` pauses and renders a clamped exact timeline position. Normal playback uses the same render function.
- One small request leaves B, travels horizontally from 1.0–2.4 s, rests at the selected junction until 2.8 s, then travels down to 02 by 4.0 s. A restrained ring marks the turn and arrival. The destination rests briefly, fades by 5.7 s, and the loop has a quiet interval before restarting.
- The supplied grid, construction marks, node positions, route emphasis, labels, and proportions are preserved. The moving request has a white edge so it remains readable over the existing lines.
- Reduced motion and no JavaScript show the selected route with filled source and destination terminals. Reduced-motion preference changes are handled during playback. The explicit review hook can still select a motion frame.

## Checks performed

- `node --check` passed for the inline script.
- Browser previews inspected at 560 px at the turn, 320 px while traveling downward, and 560 px with JavaScript removed. No console errors or horizontal overflow were observed.
- Browser assertions checked request coordinates at 0, 1.7, 2.6, 3.4, 4.2, and 6.4 seconds, and confirmed that dynamic marks are hidden at the loop boundary.
- A Node DOM/animation-frame harness verified advancing normal playback, exact paused seeking, reduced-motion initialization, live preference changes, and the absence of external assets.

## Limitations

- Cal Sans is retained as the preferred font from the source but is not bundled; the self-contained file uses the system sans-serif fallback if Cal Sans is unavailable.
- Original small labels scale with the diagram and are correspondingly small on narrow screens.
- Reduced-motion scheduling was checked with a simulated media query; OS-level preference switching and an uninterrupted full-loop visual recording were not inspected.
