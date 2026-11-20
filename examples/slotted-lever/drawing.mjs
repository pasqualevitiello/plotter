import {
  dimension,
  hatch,
  roleCss,
} from "../../skills/plotter/assets/foundation/index.mjs";
import { geometry as g, poseAt } from "./geometry.mjs";

const n = (value) => Number(value.toFixed(6));
const p = (point) => `${n(point.x)} ${n(point.y)}`;
const translate = (point) => `translate(${p(point)})`;
const centerDistance = g.pivot.y - g.center.y;
const axleOffset = dimension({
  axis: "y",
  witnesses: [
    [g.center.x, g.center.y],
    [g.pivot.x, g.pivot.y],
  ],
  position: 134,
  extensions: { gap: 12, overshoot: 8 },
  label: {
    text: String(centerDistance),
    anchor: [134, 309],
    clearance: { x: 120, y: 296, width: 28, height: 20 },
  },
});
const carriageHatch = hatch({
  region: {
    kind: "rect",
    x: -g.carriageWidth / 2,
    y: -g.carriageHeight / 2,
    width: g.carriageWidth,
    height: g.carriageHeight,
  },
  pattern: "H1",
});

export function drawingAt(seconds = 0) {
  const pose = poseAt(seconds);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="440" viewBox="0 0 560 440" data-plotter="" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="butt" stroke-linejoin="round" role="img" aria-labelledby="sl-title sl-desc" style="font-family:Cal Sans,sans-serif;font-optical-sizing:auto;font-synthesis:none;font-variation-settings:'GEOM' 25;font-weight:400">
<title id="sl-title">A rotation becomes a return</title>
<desc id="sl-desc">A crank pin slides along a lever pivoted below the wheel. The lever rocks, and a short link moves a hatched carriage along two horizontal rails.</desc>
<metadata>Geometric construction adapted from the supplied Untitled.mov. Fixed crank center (250,254), pivot (250,358), crank radius 70, lever length 272, connecting link 80, carriage ordinate 86. Dimensions are SVG units. Ideal planar linkage only; no loads, interference, or manufacture are asserted. Hatching identifies the output carriage. Axes and the crank-pin locus cross transparent geometric forms to explain their constraints. Masks clear joints without painting a background. Reference: Circle, square, line (GEO-01), shared center and generating locus; An offset becomes a lift (MEC-03), rotation driving a constrained output.</metadata>
<style data-plotter-styles="true">${roleCss}</style>
<defs>
  <mask id="sl-joints" maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="440">
    <rect width="560" height="440" fill="white" stroke="none"/>
    <g fill="black" stroke="none">
      <circle cx="${g.center.x}" cy="${g.center.y}" r="11"/>
      <circle cx="${g.pivot.x}" cy="${g.pivot.y}" r="8"/>
      <circle id="sl-pin-clear" cx="${n(pose.pin.x)}" cy="${n(pose.pin.y)}" r="7"/>
      <circle id="sl-tip-clear" cx="${n(pose.tip.x)}" cy="${n(pose.tip.y)}" r="6"/>
      <circle id="sl-carriage-clear" cx="${n(pose.carriage.x)}" cy="${g.carriageY}" r="7"/>
    </g>
  </mask>
  <mask id="sl-hatch-clear" maskUnits="userSpaceOnUse" x="-32" y="-18" width="64" height="36">
    <rect x="-32" y="-18" width="64" height="36" fill="white" stroke="none"/>
    <circle r="8" fill="black" stroke="none"/>
  </mask>
</defs>
<g data-plotter-role="secondary">
  <path d="M64 58H510M64 114H510"/>
  <circle cx="${g.center.x}" cy="${g.center.y}" r="${g.wheelRadius}"/>
</g>
<g data-plotter-role="centerline" mask="url(#sl-joints)">
  <circle cx="${g.center.x}" cy="${g.center.y}" r="${g.crankRadius}"/>
  <path d="M262 254H346M250 158V374"/>
</g>
<g mask="url(#sl-joints)">
  <g id="sl-wheel" transform="rotate(${n(pose.crankAngle)} ${p(g.center)})">
    <g transform="${translate(g.center)}">
      <rect x="0" y="-4" width="70" height="8" rx="4" data-plotter-role="primary"/>
      <g data-plotter-role="secondary">
        <rect x="0" y="-4" width="70" height="8" rx="4" transform="rotate(120)"/>
        <rect x="0" y="-4" width="70" height="8" rx="4" transform="rotate(240)"/>
      </g>
    </g>
  </g>
  <g transform="${translate(g.pivot)}">
    <g id="sl-lever" transform="rotate(${n(pose.leverAngle)})">
      <rect x="-7" y="-${g.leverLength + 7}" width="14" height="${g.leverLength + 14}" rx="7" data-plotter-role="primary"/>
      <rect x="-3" y="-250" width="6" height="228" rx="3" data-plotter-role="secondary"/>
    </g>
  </g>
  <g id="sl-link" transform="${translate(pose.tip)} rotate(${n(pose.linkAngle)})" data-plotter-role="primary">
    <rect x="0" y="-4" width="${g.linkLength}" height="8" rx="4"/>
  </g>
</g>
<g id="sl-carriage" transform="${translate(pose.carriage)}">
  <path d="${carriageHatch.d}" data-plotter-role="hatch" mask="url(#sl-hatch-clear)"/>
  <rect x="-32" y="-18" width="64" height="36" data-plotter-role="primary"/>
  <circle r="5" data-plotter-role="primary"/>
</g>
<g data-plotter-role="primary">
  <circle id="sl-pin" cx="${n(pose.pin.x)}" cy="${n(pose.pin.y)}" r="5"/>
  <circle id="sl-tip" cx="${n(pose.tip.x)}" cy="${n(pose.tip.y)}" r="4"/>
  <circle cx="${g.center.x}" cy="${g.center.y}" r="9"/>
  <circle cx="${g.pivot.x}" cy="${g.pivot.y}" r="6"/>
  <path d="M214 374H286"/>
</g>
<g data-plotter-role="secondary">
  <circle cx="${g.center.x}" cy="${g.center.y}" r="2.5"/>
  <path d="M247 365L240 374M253 365L260 374"/>
</g>
<g data-plotter-role="guide">
  <path d="${axleOffset.witnessD}"/>
</g>
<g data-plotter-role="dimension">
  <path d="${axleOffset.lineD} ${axleOffset.slashD}"/>
</g>
<g data-plotter-role="leader">
  <path d="M92 44V58M258 358H292L304 378"/>
</g>
<g fill="currentColor" stroke="none" font-size="11" opacity="0.72">
  <text x="74" y="36">Linear guide</text>
  <text x="310" y="384">Fixed pivot</text>
</g>
<g fill="currentColor" stroke="none" font-size="10" opacity="0.5">
  <text x="134" y="309" text-anchor="middle">${centerDistance}</text>
</g>
</svg>`;
}
