# Motion workflow revision — 2026-11-01

## Feedback and change

The user questioned whether the animation skill worked, specifically calling out the prompt requirements “Include pause/resume, replay, a static mode, and a reduced-motion still” and “Deliver editable animation HTML with its required local resources” as unrelated. The user agreed to revise the workflow and test it.

Interpretation: the skill emphasized delivery mechanics more than choosing and shaping the movement. The revised [workflow](../motion.md) prioritizes the relationship, staging, significant events, speed, holds, return meaning, and observation. Playback and packaging now follow the requested destination. Reduced-motion and readable fallback behavior remain implementation requirements; they are not the brief’s creative focus.

Three existing animations became [annotated teaching examples](../motion-examples.md): assembly, Newton’s cradle, and orbits. The portable gallery is generated from their current sources. This does not expand the approved reference selection. The user's separate request to feature Newton’s cradle in the homepage header establishes that placement preference only.

## Fresh-run pilot

Three existing drawings received identical briefs with and without the revised full skill, in six fresh agents with no conversation history. The inputs were INT-02, SYS-02, and GEO-03. A separate reviewer received anonymous A/B copies, the inputs, and briefs. It inspected source and sampled poses without author notes. Delivery format, fallback, and seek requirements were common to both conditions and do not count as benefits from the skill.

- Assembly gained cleaner placement but added an unnecessarily large whole-scene restart. The control kept the carrier fixed and reversed the parts, with busier intermediate linework.
- Routing used continuous travel and fewer effects with the skill, but its request marker could still merge visually with a junction. The control emphasized processing and arrival more explicitly.
- Both geometry runs preserved the fixed center and 24-unit offset. Measurement attachment, numeric readability, annotation motion, and timing involved tradeoffs.

The assembly finding prompted a narrow correction: an exploded/assembled comparison can reverse meaningfully; do not invent another mechanism or scene transition just to avoid reversal. A seventh fresh run with that correction kept the carrier fixed and reversed the parts. This is evidence of the specific decision changing once, not general reliability.

## Scope of the evidence

The root checkout retains briefs, input SVGs, raw self-contained outputs, author notes, instruction snapshots, hashes, the independent review, and a comparison viewer under `evaluations/motion-2026-11-01/`. Those experimental artifacts are intentionally outside the portable skill package. That path is provenance; an installed skill needs no evaluation checkout.

Review used source, sampled browser poses, and focused runtime/geometry checks. Continuous normal-speed playback was not visually watched, and exact host-font metrics were not verified in the pilot. The sample used one model/settings combination and one run per case/condition, plus the follow-up. It did not compare the prior workflow as a third condition or isolate the new motion text from the shared static guidance. No output was promoted to the catalogue or approved reference set.
