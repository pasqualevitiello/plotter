# Plotter homepage identity exploration

Status: awaiting a direction. Nothing has been promoted into the production homepage.

The comparison covers the homepage and its navigation. The illustration collection, animation studies, grammar, and documentation remain separate destinations shared by all three directions.

| Direction | Axis | When it fits | Cost |
| --- | --- | --- | --- |
| Manual | Editorial reading order, warm paper, a large study beside a restrained introduction | Plotter should feel like a considered drawing practice with a teachable method | Visitors see fewer examples before scrolling |
| Archive | Illustration-first browsing, large typography, a dense specimen grid | The drawings themselves should establish the identity and invite exploration | The skill and its installation receive less emphasis initially |
| Studio | A working drawing board with specimen selection, construction notes, and direct SVG downloads | Plotter should feel useful immediately, with the method visible in the work | The opening view is denser and needs more vertical space on mobile |

## Preview

- `/proto?v=1` — Manual
- `/proto?v=2` — Archive
- `/proto?v=3` — Studio
- Use the floating picker, number keys 1–3, or left/right arrows. R remounts the active direction. Shortcuts ignore editable controls and modified keystrokes.

Every selection updates the URL and remounts the page. The picker follows `emil-prototype/PICKER.md` exactly; there is no replay button because these homepages have no entrance animation. Existing illustrations retain their geometry and monochrome treatment. No background grid has been added to the page.

## Real interactions

- All navigation and calls to action lead to real site routes or existing download files.
- Archive filters its six actual selected drawings by their category; the result count reflects the current selection.
- Studio switches between the original agent-registration and production-chain SVGs, updates their descriptions and construction notes, toggles notes, and downloads the selected file.
- Each direction includes responsive navigation, a skip link, visible focus states, and documentation links.

## Materials and loadout

The pages use the local Cal Sans variable font, with `GEOM` 25 for body/UI and 50 for display, automatic optical sizing, no letter-spacing, no synthesized styles, and typeset prose punctuation. Existing coss UI buttons use their `render` API for navigational links. Art comes from the extracted Plotter library and original downloadable SVGs.

- `emil-prototype` — three distinct layouts, an isolated route, and a fixed picker.
- `emil-design-foundations` — hierarchy, a limited palette, measured spacing, and specific actions.
- `emil-typography` — role-based type, bounded lines, responsive scale, and deliberate wrapping. The repository’s Cal Sans rules override the skill’s generic tracking recommendations.
- `emil-ui-polish` — stable art dimensions, consistent interaction states, and clear feedback.
- `emil-touch-and-accessibility` — focus, real buttons and links, touch targets, and reduced motion. The exact picker specification is retained as required.
- `emil-marketing-pages` — readable content, real destinations, and no automatic page animation.

## Review and next step

Dependencies were installed and the skill downloads were regenerated. All three directions were rendered as a self-contained HTML preview for visual review, using the same React components with ordinary links in place of Next.js navigation. This preview establishes the visual direction; it does not verify the Next.js application.

No Next.js build, lint, automated checks, tests, development server, or browser review of the running application was performed. The application’s navigation, responsive behavior, and preserved catalogue interactions still need runtime review.

Once a direction is selected, record the choice and rejected alternatives here, promote the chosen approach into the real homepage, and remove the throwaway route and prototype components unless the picker is explicitly retained.
