# Motion workflow pilot — 2026-11-01

Open `comparison.html` directly to compare the six initial outputs. Each individual `index.html` is self-contained and retains an editable SVG and timeline. These are uncurated evaluation artifacts, not catalogue additions or approved visual references.

## Protocol

Three existing drawings were copied from the catalogue at repository commit `63e073a`: INT-02 (assembly), SYS-02 (routing), and GEO-03 (changing corner radius). Each received the exact brief in `briefs.json`. Six fresh native agents used the current parent model/settings (gpt-6-astra, ultra), with no conversation history. One condition used the revised portable Plotter skill and its relevant bundled references; the other was explicitly restricted to the supplied SVG and its own judgment, without Plotter or animation-design skills. Agents could not inspect each other's outputs or edit the repository.

The common harness required self-contained HTML, native 560 × 440 responsive geometry, no visible illustration controls, reduced-motion/no-JS stills, and an exact `window.study.seek(seconds)` API. Those delivery features were imposed equally and are **not evidence of a benefit from the skill**. Each agent could inspect sampled previews and revise its own output. The full skill condition also had the shared static guidance and references, so this does not isolate the effect of the new motion wording from the rest of Plotter. The previous workflow was not a third condition.

The condition names were withheld from a separate reviewer. Review copies used A/B labels; the mapping was assembly A = skill, routing B = skill, geometry A = skill. The reviewer saw source, input drawings, briefs, and sampled rendered poses, but no author notes. Read `blind-review.md` for findings before the condition names were revealed. This was one exploratory sample per case and condition, not a statistical or user-preference study.

## Findings

- **Assembly:** the skill run staged placement more clearly and cleared crossing edges, but its 560-unit whole-scene restart added a dominant second event. The control kept the carrier fixed and reversed the parts; its intermediates were busier and the carrier line crossed an entering icon. Neither version met both goals better.
- **Routing:** the skill run used one marker with continuous travel and no added pulses. The control introduced junction processing and acknowledgement rings. The skill version was more restrained, but the marker briefly became indistinguishable from a fixed junction dot. The simpler choreography did not solve every communication problem.
- **Geometry:** both kept the center and 24-unit offset correct. The skill run supplied clearer measurement witnesses and more stationary annotation staging; the control offered an easier horizontal number and slower transitions. Sampled frames did not establish a general visual-quality advantage.

The first assembly result prompted a narrow guidance correction: reversal can legitimately compare exploded and assembled states; do not invent a scene transition or mechanism merely to avoid it. `instruction-snapshots/revised` records the tested first wording and `instruction-snapshots/refined` records that correction. These are evidence snapshots, not standalone skill installations; their links refer to the full skill package.

## Follow-up after the loop correction

A seventh fresh agent received the same assembly brief and harness, with the refined skill and no earlier outputs or feedback. Open [the follow-up](refined-assembly/index.html). It kept the carrier fixed, staged the three placements, held the assembled row, and reversed the parts to compare the exploded state again. The added whole-scene transition was absent. Source review and root previews at 1.35, 3.5, and 5.4 seconds confirmed this specific behavioral change; the author inspected six poses and reported endpoint, mobile, and fallback checks in `refined-assembly/notes.md`.

This supports the narrower correction in one run. It does not establish a reliable overall quality advantage, and the other two briefs were not rerun after that wording change. The six-way viewer preserves the initial comparison unchanged.

## Limits and evidence

Author notes record checks performed in each run; optional temporary authoring/check scripts mentioned there are not required to open the saved HTML and are not included. The root reviewer inspected a combined browser preview, and the independent reviewer sampled exact event and return poses. Normal-speed continuous playback was not visually watched, so claims about perceived rhythm remain open. Geometry/source checks, simulated visibility/media-query events, and successful previews do not constitute artistic approval.

The model, briefs, references, and available tools were narrow. Further runs could reverse any preference. The useful result is a more actionable workflow plus an observed failure that led to a specific correction, not proof that the skill reliably produces better animation. Raw outputs remain unchanged so their limitations stay reviewable.
