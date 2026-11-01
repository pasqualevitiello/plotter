# Blind motion review

Compared only each pair’s `input.svg`, `A.html`, `B.html`, and `briefs.json`. Evidence: source inspection plus exact `window.study.seek()` poses rendered through `html_preview`; no continuous playback was observed. Timing and loop descriptions below come from source, while composition observations come from sampled frames. No numeric ranking.

## Assembly

Both candidates move the same rigid parts into the correct carrier positions: 137 units down, with the label also moving 11 units left. Both preserve the original thin monochrome strokes, dimensions, labels, and proportions.

**A’s advantages:** Placement reads as three clearer beats: icon 0.70–1.70 s, label 1.35–2.35 s, pill 2.00–3.00 s. The 1.5 s and 2.5 s poses show the relationship without persistent destination duplicates. Guides and part numbers withdraw as their parts move; a moving mask prevents the carrier edge from cutting through entering parts. The completed row has a 2.8 s hold. Its repeat preserves the completed object: the diagram advances and a fresh exploded arrangement arrives.

**A’s costs:** That return moves the entire scene 560 units from 5.8–8.4 s, including dimensions and caption. Samples at 6.8 and 7.1 s contain cropped incoming/outgoing diagrams at opposite edges. This introduces a substantial second event and conveyor-like meaning beyond the requested assembly; it is less spatially quiet than B’s fixed carrier. Removing the part numbers and witnesses also loses some of the original technical context in the finished pose.

**B’s advantages:** Faint destination outlines make the mapping explicit before placement, and retained numbering preserves the source’s construction context. The fixed carrier supports a clear assembly/disassembly repeat: placements overlap from 0.9–3.15 s, hold until 6.1 s, then return pill → label → icon by 8.35 s. The longer hold and stable drawing give the repeat a calmer overall composition.

**B’s costs:** More parts are simultaneously in transit, and the pale destination duplicates plus retained guides make the intermediate poses busier. At 1.95 s the fixed carrier edge visibly crosses the moving icon; A addresses this overlap. The reverse return is coherent as disassembly, but it undoes the assembled result rather than advancing to another completed row.

**Tradeoff:** A makes the placement itself cleaner and more sequential; B makes the overall loop more spatially restrained. Neither dominates both requirements.

## Routing

Both keep the supplied switching matrix, selected B → 02 path, junctions, measurements, and hierarchy fixed. Both send one marker right and then down, acknowledge arrival, clear it, and begin a new request without depicting a backward trip.

**A’s advantages:** Separate eased legs (1.0–2.4 s and 2.8–4.0 s) create a readable pause at the selected junction. Sampled 2.55 s and 4.3 s poses show small rings distinguishing junction processing and arrival; the white-edged moving marker is easier to distinguish from permanent filled junctions. The received state persists before fading, and the 6.4 s cycle leaves an empty interval before repetition.

**A’s costs:** Junction and arrival rings add expanding geometry to an already annotated center/output. This spends more visual attention than B’s single marker and introduces a processing beat not demanded by the brief. The reduced-motion still fills both source and destination, which describes transfer less specifically than B’s single received marker.

**B’s advantages:** One 3-unit marker and no extra pulses closely preserve the input’s visual hierarchy. The 2.4 s traversal is constant-speed along both legs; the received marker remains at 02 from 3.3–4.3 s, then fades by 4.6 s before the 5.4 s repeat. This is a compact, coherent request lifecycle, and the reduced-motion still shows its result.

**B’s costs:** The marker has the same fill and radius as the permanent selected dot, so it visually merges with that dot at the sampled 2.2333 s turn. At 1.7 s it also fills an otherwise open crossing, briefly resembling a selected junction. Source confirms no turn pause or velocity easing at departure/arrival; whether those transitions feel abrupt needs continuous playback.

**Tradeoff:** A explains the junction and completion more explicitly; B preserves greater restraint, at the cost of a less distinct request identity at crossings.

## Geometry

Both fulfill the geometric constraint in source and sampled poses: center (282, 212) stays fixed; outer radii 104, 92, and 80 correspond to inner radii 80, 68, and 56. The offset remains 24, the tangent points track the arcs, and the faint complementary circles remain concentric. Both replace the original offset symbol with an explicit “24” and use a coherent contraction/expansion repeat. No incorrect geometric relationship was found at the inspected poses.

**A’s advantages:** The top dimension stays at y = 78 while new witness lines connect it to the changing feature; right-side and offset witnesses likewise make the measured spans more explicit. In the endpoint/midpoint frames this gives the measurements stable staging and clear attachment. The radius leader starts at the center marker’s edge, and the rotated numeric label is repositioned with the construction. Its 8 s cycle uses 2.2 s eased changes with a 1.8 s minimum-radius hold and an effective 1.8 s maximum hold across the repeat.

**A’s costs:** Added witnesses alter the input’s annotation density, particularly above and to the right of the smallest corner. The radius is only numeric on the rotated leader, and “R104.0” is longer than the original “R104.” Source uses continuous geometry with a label rounded to one decimal, so the numeric text is an approximation within 0.05 unit, as disclosed in metadata.

**B’s advantages:** It retains more of the original short dimension marks and adds a horizontal `r = …` readout, making the changing radius easier to read than A’s rotated value alone. Geometry and text use the same tenth-unit radius, so displayed values agree exactly with the authored paths. The source’s 3 s eased changes within a 10 s cycle are slower than A’s, with endpoint holds and no extra reset event.

**B’s costs:** The upper dimension and its label move vertically by 24 units along with the corner, adding annotation motion that A avoids. Radius values appear twice, increasing text activity. It preserves the original detached short dimension marks rather than adding witnesses, so the relationship between measurement endpoints and the changing feature is less explicit. Geometry advances in 0.1-unit steps; sampled frames cannot establish whether that quantization is perceptible in playback.

**Tradeoff:** A improves measurement attachment and stationary staging; B offers a more accessible numeric readout, slower timing, and closer preservation of the original dimension-mark treatment. Both preserve the central geometric argument.
