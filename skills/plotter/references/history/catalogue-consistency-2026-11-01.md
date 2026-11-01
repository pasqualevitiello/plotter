# Catalogue consistency review — 2026-11-01

## Request and scope

After removing background fills exposed unwanted guides, the user requested a review of all illustrations and a consistent general rule with justified exceptions. This review covers all 100 active catalogue drawings, the 13 shipped compact empty-state variants, all nine existing grammar examples, a new highlight example, and representative poses of six animated companions. It preserves the earlier requested background removals and line repairs.

This pass changes 60 catalogue exports, mostly through local label/guide clearance and removal of decorative or opaque fills. Some export changes come from the shared horizontal-dimension label offset. Eight existing grammar examples are repaired; one is unchanged. Compact variants need no changes. The seven frozen composition references and four retired SVG sources remain historical evidence.

## Decisions

The authoritative rule is [Fills and line clearance](../drafting-standard.md#fills-and-line-clearance):

- Ordinary forms are transparent. Clear underlying geometry rather than painting a surface over it.
- A highlight identifies a named selection, intersection, or result. TIM-01, TIM-03, and TIM-05 use the shared `--plotter-opacity-highlight` default of `0.055`, independently of lines and labels; each physical patch is painted once.
- Text, plotted points, selected junctions, and pips may be filled symbols. This does not authorize decorative whole-object tint.
- Background guides clear UI forms and text. Start with an 8-unit contour gap; keep at least 3 units around actual glyphs. Remove short fragments that no longer explain anything.
- Axes, generating circles, radii, meaningful coordinate grids, physical contacts, and bounded hatching stay when they explain the subject. They still clear text. AGT-01’s short padding witnesses are an explicit local exception inside its card.
- Connectors terminate at open-node boundaries. Each coincident edge has one owner. Existing invisible motion masks transfer edge ownership without painting a background.

The customization control includes the new highlight token and an independent sample. Stroke-role adoption remains limited to AGT-01, MEC-05, GEO-11, SYS-06, and CRF-06; highlight adoption does not migrate other marks to those roles.

## Review evidence and limits

All 100 catalogue drawings were source-reviewed and rendered in light and dark with the actual Cal Sans font. Repaired clusters received native 560 × 440 follow-up inspection. Browser clearance screens sample visible stroke geometry and transform points into each label’s coordinate space, including rotated labels. Clipped hatching is checked visually. A final screen of the regenerated 100 exports leaves only TIM-01’s enclosing A/B circles as conservative font-box candidates; measured actual-glyph clearances are 4.94 and 5.42 units, so those circles remain unchanged.

The 13 compact variants, EMP-05 through EMP-17, were inspected at native 96 × 96 in both themes. They have no internal text or filled geometry; all computed strokes are 1px with non-scaling-stroke. No compact changes are needed.

The new highlight example was inspected in both themes and passes the same clearance screen. A mounted customization component test verifies keyboard adjustment from 0.055 to 0.06, unchanged outline width/opacity, CSS output, and Reset to 0.055. Standalone export resolves a requested highlight override of 0.2.

These are visual-consistency and relevant geometry checks, not renewed product-fact research, mechanical certification, approval of new reference revisions, or an exhaustive test of animation playback. Reduced motion, off-screen pausing, and interactive measurement updates were not re-tested in this pass.

## Hand-authored geometry, interface, time, type, and empty states

| Code | Review and fixes | Retained intentional construction |
| --- | --- | --- |
| GEO-01 | Removed hatch-area tint and marker fills; rebuilt grid segments around labels, removed duplicate diagonals and square-edge/axis overlays. | Circle, square, generating diagonal, radii and lower-left hatching explain geometric construction. |
| GEO-02 | Removed duplicated low-opacity baseline; clear in both themes. | Tangency line, perpendicular markers, center axes and radius guides. |
| GEO-03 | Removed offset-band tint and marker fills; cleared R104, moved that label along its radius; removed duplicate construction edges. | Inner generating circle, offsets, radius and center axes explain the curved band. |
| GEO-04 | Removed large-square tint and marker fills; cut grid near ×1.5 and duplicate square edges. | Growth ray, proportional squares and largest square's diagonals. |
| INT-02 | Cleared loose icon, Workspace label, Ready pill and assembled row from grid/projection strokes. | Exterior assembly guides and directional arrows terminate outside forms. |
| INT-03 | Reviewed existing rework; no further changes. | Exterior dimensions and separated construction grid. |
| INT-04 | Enlarged the gap in the u dimension around its label. | Assembly arrows, component rows and empty exterior grid. |
| INT-05 | Reviewed; no changes. | Shared gutter hatching is semantic; panel interiors remain clear. |
| TIM-01 | Tokenized two shared-window patches; cut grid and baselines at bars, removed doubled projection lines, cleared the equality sign. | Dashed selected-column projection connects the same interval across schedules; A/B circles are label enclosures. |
| TIM-02 | Cut hour grid around UTC/UTC+03 and hour labels. | Timeline ticks, booking alignment and equality mark. |
| TIM-03 | Tokenized selected cell, removed marker fill; split calendar lattice so the selected square owns each boundary once. | Calendar grid is the temporal coordinate system; meeting center/radius marks are explanatory. |
| TIM-04 | Reviewed existing rework; no further changes. | Local radius callout and exterior assembly arrows. |
| TIM-05 | Tokenized overlap square, removed marker fill; split interval outlines to avoid duplicate overlap boundaries; cleared labels, dimensions and callout; moved meeting caption down. | Selected intersection and its center mark; vertical availability centerline. |
| TIM-06 | Reviewed; no changes. | Hatching denotes reserved before/after buffers and stays out of appointment text. |
| TYP-01 | Removed letter tint and control-point fills; cleared x-height/r labels. | Generating circle, letter handles and center/baseline axes explain the letter. |
| TYP-02 | Removed C tint and control-point fills; reduced duplicate generating circles to the open right arcs and cleared 90°. | Radius/angle geometry explains terminals and opening. |
| EMP-01 | Removed whole L-shape tint and marker fills. | Modular grid, missing square and center/edge witnesses explain the absent module; 404 stays clear. |
| EMP-02 | Removed wall tint beneath hatch and marker fills; cleared r = 4u and 90°. | Wall hatching, door sweep, radius and pivot guides remain meaningful. |
| EMP-03 | Removed route-band tint; cut circle/grid segments around Request/Missing link/Unresolved; moved R60 to clear its shaft. | Generating circles and center axes explain the route and its absent connection. |
| EMP-04 | Shortened central axis above 7u; retained existing transparent arch rework. | Arch radii and keystone geometry are explanatory, not background decoration. |


## Other hand-authored studies

| Code | Result / fix | Retained meaningful exception |
| --- | --- | --- |
| INT-01 | Existing repair passes; no new edit. | Local R16 corner construction inside the top pill. |
| INT-06 | Broke background grid/axes outside the fragments and assembled row; removed redundant circle bounding box and unlabeled radius fragment. | R16 generating circle and its center cross explain the pill end. Projection arrows remain. |
| INT-07 | Shortened upper-right continuation to clear R12. | Browser corner radius and content-inset construction. |
| INT-08 | Shortened lower projections to clear both 1.5u labels. | Safe-area, inset, and corner-radius geometry. |
| INT-09 | Previous transparent-dialogue repair passes; preserved. | Small labeled corner-radius witnesses. |
| OBJ-01 | Passes; no new edit. | Cropped key rows and dashed continuation explain pitch/stagger. |
| OBJ-02 | Shortened axis above shade to clear 2r; shortened lower guide beside Generating circle; shifted rotated r label from x316 to306. | Generating circle, shade radius, centerline, and base dimensions are geometric explanations. |
| OBJ-03 | Passes; no new edit. | Paired R8 circles explain the shared folder tab. |
| OBJ-04 | Existing processor omissions pass; no new edit. | Electrical routing, package pitch, and small registration/symbol dots. |
| OBJ-05 | Passes; no new edit. | Pendulum trajectory, pivot marks, equal radii, and fixed-support hatch. |
| SYS-01 | Passes; no new edit. | Route radius and inactive branch alternatives. |
| SYS-02 | Removed node covers; split all row/column connections at node perimeters; primary selected route owns its segments; removed coincident secondary route parts; stopped input axis before the open port. | Filled selected junction and its geometric locator circle/square. |
| SYS-03 | Expanded the n₁ text omission through y180. | Grid explains circuit-node positions; electrical node fill remains meaningful. |
| SYS-04 | Removed node covers and redundant lattice dots under outlined data points; broke grid/projections around points and coordinate label. | Coordinate field is the subject; measurement projection intentionally connects the selected point to the axes. |
| MEC-05 | Added grid omissions around Load and Assembled; label positions unchanged. | Bounded core hatch identifies the inserted part. |
| SRV-01 | Prior edge/cache repair passes; no new edit. | Routing and cache bend radius. |
| SRV-02 | Prior deployment-card repair passes; no new edit. | Promotion path, inset, and radius witnesses. |
| SRV-03 | Prior payment aggregation repair passes; no new edit. | Explicit collection arrows and corner radius. |
| SRV-04 | Split grid and cycle-end projection outside issue bars; cleared Week 1/Week 2 labels. | Local R16 end constructions explain shared bar geometry. |
| SRV-05 | Prior checkout repair passes; no new edit. | Routing into the Pay node and out to the result port. |
| SRV-06 | Removed six commit covers; trimmed branch/main routes at each circle, including exact arc intersections; removed duplicated main-axis segments; broke grid at captions; widened Pull request dimension gap. | Branch radii and review bracket remain explanatory. |
| SRV-07 | Prior component/instance repair passes; no new edit. | Resize bounds, control handles, and corner-radius witness. |
| SRV-08 | Removed duplicated upper projection guides and lower-left guide behind Page. | Existing dashed insertion slot and inset dimensions. |
| SRV-09 | Prior relationship-table repair passes; no new edit. | Table row dividers, connector ports, and route radius. |
| EMP-05 | Shortened lower Request projection. | Missing destination outline and routing geometry. |
| EMP-06 | Interrupted index grid outside cards; removed guide behind Index. | Missing C slot, search glyph, and dashed query projection. |
| EMP-07 | Removed guide segments coincident with cloud baseline and route edges. | Cloud generating circles, route centerline/radius, and gap witnesses. |
| EMP-08 | Interrupted notification grid outside cards and Read caption. | Stream connections terminate at open node boundaries. |
| EMP-09 | Removed guide segments coincident with page/fold perimeter; kept exterior witnesses. | Fold diagonal, writing-area proportion, and leader to the insertion point. |
| EMP-10 | Passes; no new edit. | Coordinate grid is the empty-state subject. |
| EMP-11 | Cleared R16 and keyhole-width 8; interrupted generic outer guides; shortened keyhole construction frame. | Shackle/lock inset/radius geometry remains purposeful. |
| EMP-12 | Removed guide beside Fold and grid segment coincident with envelope bottom. | Actual envelope folds and symmetry axis. |
| EMP-13 | Passes; no new edit. | Gear pitch circles and geometric construction. |
| EMP-14 | Moved Socket label x376→400, extended leader to M376 172V162H400; interrupted guides outside plug body. | Fixed-support hatch and socket section kept. Compact source geometry untouched. |
| EMP-15 | Started vertical R40-adjacent guide at y156. | Pin generating radius and coordinate field. |
| EMP-16 | Interrupted guides outside calendar frame; set Today `labelOffset={10}` to clear dimension tick. | Calendar grid is subject geometry; selected-day lines remain. |
| EMP-17 | Interrupted guides outside image frame to avoid coincident solid/dashed perimeter strokes. | Aspect-ratio diagonal and right-angle mark. |
| COS-01 | Interrupted proposed upper outline behind SMS. | Common-interface construction, generating radii, bounded profile hatch. |
| COS-02 | Started top center axis at y72; moved rotated r=u label (302,120)→(298,116); widened local horizontal grid omission to x278–318. | Half-unit field and complementary generating circles explain the seam. |


## SVG-authored studies

| Code | Result and reason |
| --- | --- |
| AGT-01 | Shortened the x328 upper guide to y218 to clear Registered agent. Transparent card, buttons, and avatar retained. Short local internal alignment witnesses remain because they demonstrate the registered layout and avoid content; root confirmed this exception and will document it. |
| AGT-02 | Reviewed; no change. Delegation projections stop outside the resulting task forms. |
| AGT-03 | Reviewed; no change. Handoff connectors/ports and text remain clear. |
| AGT-04 | Shortened the upper 32-unit dimension segment by 1 unit for full label clearance. Tool control interiors remain clear. |
| AGT-05 | Reviewed; no change. Permission geometry, labels, and local hatching remain clear. |
| AGT-06 | Moved R24 above the corner-center witness so it clears both the witness and the input connector. Shared-memory table and open ports preserved. |
| AGT-07 | Reviewed; no change. Checkpoint labels and local construction remain clear. |
| AGT-08 | Reviewed; no change. Parallel routing and open-node clearances retained. |
| GEO-05 | Repositioned R = u between its radius witness, rounded outline, and prior circle. The circle remains as meaningful before-state geometry. |
| GEO-06 | Repositioned all three radius labels away from their shafts, arc, and arrowhead. The three tangent radii and continuous primary curve are unchanged. |
| GEO-07 | Moved R = u outside the hatched lobe and extended its radius shaft along the same ray to support the label. XOR hatch and shared void preserved. |
| GEO-08 | Reviewed; no change. Interrupted pattern and its meaningful construction remain clear. |
| MEC-01 | Moved Aperture 4 units right and extended its leader equally, keeping the 8-unit leader-to-label gap while clearing the outside ring. Blade hatch and aperture geometry preserved. |
| MEC-02 | Repositioned 2r and r inside clear regions of their pulleys, away from radius shafts, centerlines, and hubs. Belt tangencies and pulley geometry unchanged. |
| MEC-03 | Moved e = 24 away from the cam/follower center ray. Mechanical centers/radii remain as explanatory construction. |
| MEC-04 | Reviewed; no change. Latch/receiver geometry and labels remain clear. |
| GEO-09 | Reviewed; no change. Staircase dimensions and construction are meaningful and clear. |
| NAT-01 | Widened the u dimension gap and removed the surplus bottom centerline segment behind 4u. Leaf geometry and vein construction unchanged. |
| NAT-02 | Reviewed; no change. Honeycomb repetition, cell construction, and labels remain clear. |
| TIM-08 | Reviewed; no change. Chord geometry and annotations remain clear. |
| NAT-03 | Extended the existing break in the 175 contour by removing two short sampled segments at each end. Label position and overall contour shape retained. |
| SYS-05 | Reviewed; no change. Converging routes meet their intended geometry without text collisions. |
| TYP-03 | Reviewed; no change. Letter construction and hatch areas remain clear. |
| TYP-04 | Reviewed; no change. Shared glyph geometry and labels remain clear. |
| TYP-05 | Split the upper horizontal height guide around R56. Shared-stroke hatch and glyph geometry retained. |
| TYP-06 | Removed the short surplus upper centerline behind 8u. Negative monogram and hatch field retained. |
| TYP-07 | Reviewed; no change. Optical alignment guides remain meaningful and avoid labels. |
| INT-10 | Reviewed; no change. Corner-rule witnesses and text remain clear. |
| INT-11 | Shortened the left upper dimension witness before Wide. Reflow cards remain transparent with clear interiors. |
| INT-12 | Reviewed; no change. Slider track and leader already terminate at the open control boundary. |
| TIM-07 | Reviewed; no change. Recurrence geometry and labels remain clear. |
| CRF-01 | Raised Warp by 2 units to clear its dimension witness. Alternating weave cuts and hatch remain intact. |
| CRF-02 | Reviewed; no change. Stitch paths already terminate at hole rims rather than crossing open holes. |
| CRF-03 | Reviewed; no change. Dovetail geometry and annotations remain clear. |
| CRF-04 | Moved 45° off the fold diagonal and hatch region. Folded and proposed sheet geometry unchanged. |
| CRF-05 | Reviewed; no change. Tile geometry and local annotations remain clear. |
| GEO-10 | Trimmed the Missing leader start by 2 units for label clearance. Domino dots retained as semantic pips, not object background fills. |
| MEC-06 | Reviewed; no change. Balance geometry and its explanatory axes remain clear. |
| GEO-11 | Reviewed; no change. Radius annotation already has a deliberate clear interval. |
| SYS-06 | Reviewed; no change. Resilient-route connectors terminate at open port rims. |
| CRF-06 | Split the right projection around Rejoin. Repair-key and broken-board geometry retained. |


## Existing grammar examples

| Drawing | Result and reason |
| --- | --- |
| arrows | Repositioned 90° into the clear pocket between the proposed part, angle arc, and current part. Started the left long-dimension witness below the 2u annotation. |
| callouts | Same geometry/annotation repair as arrows, preserving its separate grammar focus. |
| centerlines | Stopped the bottom centerline before ⌀264 and widened its horizontal dimension-label gap. |
| dimensions | Moved rotated R120 inward along its construction so it clears the object band and radius shaft. Moved Offset left to clear the explanatory full-circle construction. |
| grids | Moved 3u and 2u into clear grid cells away from their radii and circle boundaries. Existing complementary isolation-only grid segments remain unchanged. |
| hatching | Same Aperture callout repair as MEC-01; hatch region and focus preserved. |
| outlines | Same Registered agent guide repair as AGT-01; short named alignment witnesses retained. |
| projections | Reviewed; no change. Projection lines stop outside the source and destination task forms. |
| states | Moved R52 into the clear lower-right interior of the circular opening, away from its radius shaft, centerline, and circumference. Hidden channel semantics preserved. |


The new `highlights.svg` teaches the common two-hour interval in two schedules. Each row has one highlight patch; guides, outlines, and labels remain separate.

## Animated companions

Six companions were inspected at representative poses in both themes. The PrimitivesMorph follow-up covers all six held stages at 1.8, 5.0, 8.2, 11.4, 14.6, and 17.8 seconds: Avatar, Pill, Switch, Button, Card, and Slider. Local grid gaps clear each annotation; slider extension guides now clear their endpoint percentages while retaining matching path topology across stages. The 45° annotation moves outside the intact hatch sector. Final held-pose screens include visible animated guide references and report no candidates. Timing, easing, primary shapes, and existing edge-ownership masks are preserved.

Assembly was inspected at its Workspace, Booking, and Activity holds. Production-chain poses cover the entering/seated core; its feed guide now breaks around Load. Cradle inspection includes rest and left/right swing states. Orbits and missing-destination companions were checked at representative positions; the latter inherits its static Request clearance fix. These samples establish the reviewed appearance, not continuous playback or full transition correctness. Morph previews populate measurement labels from held geometry; they do not execute the React measurement effect.

## Verification

- Repository formatting, TypeScript, catalogue integrity, unique IDs, skill links, and all seven frozen-reference hashes pass.
- The skill-creator validator passes using an isolated temporary Python environment with its PyYAML dependency.
- All 100 resolved catalogue exports retain explicit 1-unit strokes. Invisible animation masks retain their separate clearance widths.
- Highlight keyboard adjustment, reset, CSS output, grammar isolation without opacity amplification, and standalone token override pass.
- Full lint still reports the pre-existing array-index key in `particles-assembly-drawing.tsx:440`, plus 15 existing warnings. The key is identical to the committed version; this audit does not change it.
