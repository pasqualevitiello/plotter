# Drawing

Make one construction relationship carry the idea: alignment, proportion, assembly, routing, tangency, or intersection. Start with the forms and their relationship; add drafting marks when they explain something specific.

## Give the drawing a job

A useful brief names the subject, placement, output size, relationship, and deliverable. For an existing illustration, supply its editable source and say which parts should change.

```text
/plotter Illustrate fragments becoming one registered record.
Use a flat 560 × 440 composition with transparent forms.
Make the connection between the fragments and the assembled record clear.
Deliver editable SVG plus a resolved standalone SVG.
```

In Codex, start with `$plotter` instead. For critique, ask for findings and proposed corrections; editing is a separate instruction.

## Choose a construction reference

The package includes seven approved snapshots. Choose by the relationship, rather than the subject alone.

| Relationship                            | Reference |
| --------------------------------------- | --------- |
| Circle, square, radius, tangency        | GEO-01    |
| Separate fragments becoming one form    | INT-02    |
| Modules following an allocation rule    | INT-03    |
| Time intervals combining into a whole   | TIM-04    |
| Work aligned to a cycle                 | SRV-04    |
| Conversation through a few UI fragments | INT-09    |
| Absence interrupting a structure        | EMP-03    |

Any drawing on the [illustrations page](/illustrations) can also be named by its code, for example “like TIM-06”. The skill bundles every catalogue drawing in `references/catalogue/`, so the code works without this website. A named drawing shows a relationship to borrow; the seven snapshots above remain the style anchors.

The skill’s `references/approved-references.md` links the SVGs and records their revision boundary. These snapshots preserve their original composition; the current drafting standard supplies the treatment for new work.

## Construct the image

Arrange the main forms and essential labels first. The focal relationship should survive at thumbnail size. Use a flat plan, elevation, or conceptual plane, with monochrome ink and transparent forms.

Every supporting mark needs a purpose. A grid reveals a shared coordinate or module system. A dimension measures between actual witnesses. Hatching identifies a bounded region. An arrow expresses a transfer or movement. Keep callouts, measurements, and state lines distinct by meaning.

Shared edges have one visible stroke owner. Clear text and guides by splitting or shortening geometry. Derive numeric labels and witnesses from the same geometry and local unit.

## Keep the source editable

Use native SVG with named geometry parameters and local IDs. The portable foundation provides straight arrows, horizontal and vertical dimensions, and rectangular H1/H2 hatching. Curved arrows, radius dimensions, and curved or holed hatch regions use authored SVG geometry.

The package has one shared implementation at `assets/foundation/index.mjs`. The numerical standard lives beside it in `standard.json`. [Customization](/docs/customization) explains role styles and overrides.

Use filled, editable text, automatic optical sizing, and no added letter-spacing. Include an accessible title and description when the standalone drawing conveys meaning.

## Export a static SVG

From the installed `plotter` directory, the registration example can produce an editable source and then a resolved export:

```sh
node assets/examples/registration.mjs > registration.svg
python3 scripts/export-svg.py registration.svg registration-export.svg --id-prefix registration
```

For your own drawing:

```sh
python3 scripts/export-svg.py drawing.svg exported.svg \
  --id-prefix example \
  --title 'Example construction' \
  --description 'A concise explanation of the relationship.'
```

The exporter resolves supported role styles and tokens, keeps labels editable, and prefixes local definition IDs and references. It reports unsupported external resources or styles rather than silently dropping them. The resolved SVG has no website, JavaScript, or external stylesheet dependency. Exact Cal Sans appearance still depends on the font.

Download the resolved [AGT-01 registration SVG](/plotter/downloads/agent-registration.svg) or [MEC-05 production-chain SVG](/plotter/downloads/production-chain.svg) as examples of portable static output.

## Review the result

Compare the candidate with its chosen reference at the intended size and as a thumbnail. For a revision, compare with the previous drawing too. Inspect the host’s themes and narrow layout when those are part of delivery.

Confirm that the focal relationship reads, guides remain subordinate, labels have space, transparent forms keep their meaning, and numeric or behavioral claims match their evidence. Deliver the editable source and requested export, naming any visual review that remains pending. Source generation alone does not establish visual approval.
