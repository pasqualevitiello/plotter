import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { drawingAt } from "./drawing.mjs";

const dir = new URL("./", import.meta.url);
const font = readFileSync(
  new URL("../../skills/plotter/assets/fonts/CalSansVF.woff2", dir),
).toString("base64");
const geometry = readFileSync(new URL("geometry.mjs", dir), "utf8").replaceAll(
  "export ",
  "",
);
const player = readFileSync(new URL("player.js", dir), "utf8");
const svg = drawingAt();
writeFileSync(new URL("slotted-lever.svg", dir), svg);
writeFileSync(
  new URL("slotted-lever.html", dir),
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>A rotation becomes a return</title>
<style>
@font-face { font-family: "Cal Sans"; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 100 900; font-style: normal; }
:root { color-scheme: light dark; --ink: var(--foreground, light-dark(#171717, #ededed)); --line: var(--border, light-dark(#ddd, #383838)); }
html, body { margin: 0; }
body { color: var(--ink); font-family: "Cal Sans", sans-serif; font-optical-sizing: auto; font-synthesis: none; font-variation-settings: "GEOM" 25; font-weight: 400; }
main { max-width: 560px; margin-inline: auto; }
svg { display: block; width: 100%; height: auto; }
.controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding-block: 8px 16px; }
button { color: inherit; background: transparent; border: 1px solid var(--line); border-radius: 6px; padding: 8px 12px; font: inherit; font-size: 13px; min-height: 40px; cursor: pointer; }
button[aria-pressed="true"] { border-color: currentColor; }
button:focus-visible, input:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
button:disabled, input:disabled { opacity: .5; cursor: default; }
input { min-width: 80px; flex: 1; accent-color: currentColor; height: 32px; }
output { font-size: 11px; font-variant-numeric: tabular-nums; min-width: 62px; text-align: right; }
p { font-size: 12px; margin: 4px 0 12px; opacity: .65; }
@media (max-width: 400px) { .controls { gap: 6px; } button { padding-inline: 10px; } output { flex-basis: 100%; } }
</style></head><body><main>
${svg}
<div class="controls" aria-label="Animation playback">
<button id="play" type="button">Pause</button><button id="replay" type="button">Replay</button><button id="still" type="button" aria-pressed="false">Still</button>
<input id="scrub" type="range" min="0" max="6" value="0" step="0.01" aria-label="Animation time"><output id="time" for="scrub">0.0 / 6.0 s</output>
</div>
<p id="motion-note" hidden>Reduced motion is on. Showing the selected still.</p>
<noscript><p>The static construction is shown. Enable JavaScript to play the linkage.</p></noscript>
</main><script>${geometry}\n${player}</script></body></html>`,
);
console.log(`Wrote ${fileURLToPath(new URL("slotted-lever.html", dir))}`);
