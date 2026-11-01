# Customization

Plotter separates the meaning of a mark from its numerical treatment. The visual grammar defines what a mark communicates; shared tokens and geometry helpers define how it is drawn.

## Start with the adoption boundary

Shared role tokens currently style **AGT-01 and MEC-05** in the catalogue. Other drawings retain their authored attributes and inherited defaults. A global token override does not imply that every illustration has adopted that role.

Preserve an existing drawing’s composition, opacity grouping, text, timing, and intentional exceptions during implementation changes. Adopt roles only where the result preserves its appearance or where a redesign is requested.

## Override a role in the host

A role-enabled SVG has `data-plotter=""` on its root and uses `data-plotter-role` on strokes or existing groups. The generated role stylesheet reads CSS variables from the host.

```css
.illustration {
  --plotter-ink: currentColor;
  --plotter-stroke-primary: 0.95;
  --plotter-opacity-guide: 0.24;
}
```

Apply overrides to a scoped container when changing one illustration. Keep opacity between zero and one and stroke widths non-negative. Unclassified marks keep their authored attributes.

Opacity grouping matters: moving the same value from a group to its children can change overlapping strokes. Keep the original grouping level. A transfer arrow’s head remains solid even when its shaft uses dashes.

Text stays filled and editable with its own typography. Grammar focus markers control isolation independently of drawing roles; selecting a mark keeps its original color, width, opacity, and dash pattern.

## Change the shared standard

The canonical source is:

```text
skills/plotter/assets/foundation/standard.json
```

It owns numerical role defaults and supported geometry constants. From the repository root, regenerate its derived runtime data, stylesheet, and marked reference tables with:

```sh
python3 skills/plotter/scripts/build-standard.py
```

The generated `standard.mjs`, `roles.css`, and reference tables are outputs. Keep one shared standard instead of editing those files as separate palettes. Regenerate affected SVG geometry and embedded example styles when a standard change affects them.

Hatch pitch, geometry constants, and dash meanings are not interchangeable visual presets. Preserve the semantics described by the drafting standard.

## Use the geometry helpers

From an authoring module at the installed skill’s root:

```js
import { arrow, dimension, hatch } from "./assets/foundation/index.mjs";

const transfer = arrow({
  kind: "line",
  from: [268, 186],
  to: [268, 212],
});

const core = hatch({
  region: { kind: "rect", x: 0, y: 0, width: 48, height: 48 },
  pattern: "H1",
});
```

The arrow returns separate shaft and head geometry. The hatch returns clipped line segments without drawing a boundary or fill. Dimensions support horizontal and vertical witnesses, with an authored label and clearance box. The helper does not measure text.

Use native SVG for curved arrows, radius dimensions, and curved or holed hatch regions. The shared helpers handle arithmetic; they do not decide which mark belongs in the composition.

## Keep exports explicit

A detached SVG cannot read a website’s computed theme. Supply the desired ink and token values when exporting:

```sh
python3 scripts/export-svg.py drawing.svg exported.svg \
  --ink '#171717' \
  --token=--plotter-opacity-guide=0.24 \
  --id-prefix example
```

Run this command from the installed skill directory. The output resolves supported styles while preserving editable labels and local definitions. Animated HTML must carry its required local resources, or inline the generated stylesheet for a single file.

## Set type by role

Use Cal Sans or the host font, with `font-optical-sizing: auto`, no added letter-spacing, and `font-synthesis: none`. Keep one `GEOM` value per role: 25 for ordinary illustration text and 0 for identifiers where supported. Use typeset punctuation such as ’, –, −, “, and ”.

A sans-serif fallback keeps the SVG usable without a font download. Review the actual font’s label bounds when exact spacing matters.
