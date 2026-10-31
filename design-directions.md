# Plotter identity: Manual

Selected on 2026-10-31. The user chose v1, Manual, with native coss UI styling, a precise geometric logo, and medium-weight headings.

## Implemented direction

- The Manual composition now lives at `/`, with shared navigation and branding across the content pages.
- Buttons use the copied coss UI component without the prototype’s visual overrides. Colors use the default coss UI `colors-neutral` preset, with matching semantic token mappings and sidebar defaults from its `style` preset. Borders, shadows, and focus treatment remain native to the components.
- The page canvas uses Tailwind’s `bg-neutral-50` utility without changing the coss `--background` token. Section and drawing containers are transparent, with borders defining their structure. The embedded HTML preview adapts to this canvas without altering the downloadable file.
- The mark uses one exact square and one centered circle with matching 1.25-unit strokes. Its tightly cropped visible bounds use an explicit 18px size and baseline alignment alongside the capital P. The wordmark is 24px semibold; the favicon uses the same geometry.
- Page headings use Cal Sans at weight 500; the wordmark stays at 600. Both use `GEOM` 50. Body text and illustration labels retain their own roles, with automatic optical sizing and no synthesized styles or added tracking.
- The default local URL is `http://localhost:3000`.

## Alternatives

Archive put browsing first, and Studio opened with an interactive drawing board. The original three directions remain in Git history at `5536ffc`; their throwaway components and picker have been removed. Existing `/proto?v=1`, `?v=2`, and `?v=3` links redirect to the selected homepage.

## Review record

The original directions received standalone HTML visual review before selection. This revision was reviewed in source and the development server was restarted for the user. No automated checks, tests, or production build were run. The updated application still needs visual review in the browser.
