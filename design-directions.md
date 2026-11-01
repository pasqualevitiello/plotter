# Plotter identity: Sheet

Selected on 2026-11-01. The site is set as one drawing sheet. It replaces the Manual direction chosen on 2026-10-31.

## Decision

- The whole site sits inside one hairline-framed sheet, with small registration ticks at its outer corners. Rules (`--rule`) divide it into cells. Inside the sheet, `--border` follows the rule color, so component borders and cell rules match.
- The header is a ruled strip: wordmark, navigation, a catalogue count (“95 drawings · Editable SVG”, computed), and actions. The footer is a title block: wordmark, guides, skill, and credits.
- Sections open with a ruled bar: a mono label numbered by page (`01 — Illustrations`, `03.1 — Glossary`), an optional mono meta note, and an optional link.
- **Drawings always render at their native 560 × 440, never scaled down.** Cells pair side by side only from 1280px, where each cell can hold a full-size drawing. Below that they stack. On screens narrower than a drawing, the drawing scrolls sideways (keyboard-focusable), following the existing gallery convention.
- Bordered panels inside cells (drawing frames, code blocks, prompt cards, the animation preview) have square corners, like the sheet. Only controls (buttons, tabs, the skip link) keep the coss radius.
- Captions are short, with mono codes and categories: `MEC-01 · Six blades, one aperture · Scale 1:1`.
- Type follows the existing roles: Cal Sans 500 with `GEOM` 50 for headings, `GEOM` 25 for body text, Paper Mono for labels, no added tracking. Colors stay on the coss neutral tokens. The page canvas is `bg-sidebar`, and the sheet uses `--background`.
- Shared pieces: `components/sheet.tsx` (`PageIntro`, `SheetBar`, `SheetArt`, `DrawingFigure`) and the `@layer components` sheet block in `app/globals.css`.

## Rejected

- **Library**, a docs-app shell with a sidebar, search, and a filterable card grid: it reads like any documentation site, and its cards scale drawings down to about 290px.
- **Plates**, one drawing per screen like a printed book: slow for browsing 100 drawings, and it scales drawings up instead of using their native size.
- The first Sheet draft used a four-column library grid. That scaled drawings to about half size, so it was replaced by the native-size two-up module.
- The earlier Manual, Archive, and Studio directions are recorded at `5536ffc` and `2197cf4`.

## Unboxed layouts, compared and rejected (2026-11-01)

The boxed sheet was compared on the live site against unboxed layouts. Each removed the frame, corner ticks, grey margin, and vertical rules, keeping full-width horizontal rules and a centered 1320px column. The boxed version stayed as the best option.

- **Open**: no separation between drawings. It read well on text pages, but drawings ran together in collections.
- **Marked**: registration crosses at drawing corners. Not enough separation.
- **Ruled**: a hairline under each row of drawings, with a cross at the column gap.
- **Construction**: dash-dot centerlines between drawings, across and down.
- **Plates**: each drawing on a faint tinted panel with gaps, which is close to cards.

One idea from the comparison was liked but not adopted: the homepage hero **plots itself** on load. Construction lines appear first, then each primary stroke is drawn, then the labels. It ran once, could be replayed, and was skipped under reduced motion. It reads the drawing’s own strokes, so it works with any catalogue drawing. The prototype was removed. It was a small client component that animated each stroke’s dash offset with the Web Animations API, about 100 lines.

## Review record

All pages were rebuilt on the Sheet system: home, illustrations, animations, grammar, docs, each guide, and 404. Motion previews now keep their drawings at 560 px and scroll on narrow screens instead of shrinking.

The pages were reviewed as headless Chrome screenshots against the running dev server: 1440px light on every page, 390px for home, illustrations, and a guide, and 1440px dark for grammar. The typecheck, Biome format check, and `plotter:check` pass. Lint reports three errors that already existed before this change (`illustration-gallery.tsx` and `plotter-prompts.tsx` `role="group"`, `particles-assembly-drawing.tsx` array keys). No production build was run. Interactive behavior (filters, isolation, playback) was not exercised in a browser after the restyle.
