# Animation

Animate a relationship that the still already explains. A part seats, an aperture changes, an interval advances, or a route transfers something. The drawing, timeline, and player have different responsibilities.

## Start from a readable still

For a new subject, finish the [drawing](/docs/drawing) first. For an existing one, supply the editable source and preserve its composition unless you want a redesign.

Choose a static fallback that explains the subject. The first frame of the timeline may not be the right still.

```text
$plotter Animate this drawing so the selected core seats in the carrier.
Preserve the static composition and transparent forms.
Keep the hatching attached to the core, with one stroke at contact.
Include pause/resume, replay, a static mode, and a reduced-motion still.
Deliver editable animation HTML with its required local resources.
```

Use `/plotter` in Claude Code.

## Describe the change

Name the initial state, significant event, and final state. Decide whether the motion plays once, reverses, or loops. Give a loop a meaningful return.

Keep rigid parts the same size, pivoted parts attached to their pivots, and hatching attached to its region. At contact, decide which shape owns the shared edge before, during, and after seating. Keep a single visible stroke at the join.

A conceptual transition can explain a mechanism without claiming a physical simulation. State only the invariants and behavior the drawing actually supports.

## Separate responsibilities

| Part     | Owns                                                                       |
| -------- | -------------------------------------------------------------------------- |
| Drawing  | Geometry, semantic groups, line roles, labels, hatch regions, chosen still |
| Timeline | Transforms, path changes, timing, contact, loop or reset                   |
| Playback | Start, pause/resume, replay, static mode, reduced motion, visibility       |

The foundation supplies shared geometry and style roles; it has no clock or player dependency. Keep timing local to the mechanism. Transform a rigid part and its hatching together, preserving the still’s opacity grouping and line hierarchy.

## Make playback deliberate

Repeating motion needs pause/resume and replay. Pause when the drawing leaves the viewport or the page is hidden. Respect `prefers-reduced-motion`, including changes while the page is open, with the selected still.

Keep paused motion distinct from static mode. A paused frame may be halfway through a transition, while the fallback is chosen for readability. Show that fallback when JavaScript or the animation capability is unavailable.

## Package animated HTML

The complete skill includes `assets/examples/assembly-motion.html`. Open it directly in a modern browser, keeping its relative dependency on `assets/foundation/roles.css`. It uses local resources and needs no website checkout or development server.

For one-file delivery, inline the generated role stylesheet. For a folder delivery, include every actual local resource and preserve its relative path. A portable animation should not depend on website imports or application CSS.

[Download the assembly animation](/plotter/downloads/assembly-line.html) for a portable HTML example. This example is an implementation study; its timing is not the catalogue’s exact W05 timeline.

## Export the still separately

The static SVG exporter accepts the selected still. Active animation is outside its contract. Export that still using the command in the [drawing guide](/docs/drawing#export-a-static-svg), and deliver it alongside the animation when requested.

Inspect approach, contact, separation, and the return boundary. Look for doubled edges, hatch drift, accidental occlusion, and labels crossed by moving forms. Exercise controls, visibility pausing, and reduced motion within the requested review scope. Name any unperformed review instead of treating source inspection as runtime verification.
