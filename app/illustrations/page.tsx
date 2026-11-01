import type { Metadata } from "next";
import { Suspense } from "react";
import { CossConcepts } from "@/components/plotter/coss-concepts";
import {
  type GallerySection,
  IllustrationGallery,
} from "@/components/plotter/illustration-gallery";
import {
  illustrations,
  retiredStudies,
} from "@/components/plotter/illustrations";
import { PageIntro } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";

// A varied first look. Empty states and agents get their own sections, since
// they match a job someone arrives with; everything else follows.
const selected = [
  "primitives-reference",
  "particles-recombination",
  "service-linear-cycle",
  "cal-week-grid",
  "interface-chat-plan",
  "mech-iris-aperture",
  "craft-dovetail",
  "type-letter-strokes",
];
const emptyStates = illustrations.filter(
  (item) => item.category === "Empty states",
);
const agents = illustrations.filter((item) => item.category === "Agents");
const sections: GallerySection[] = [
  {
    id: "selected",
    label: "01.1 — Selected",
    title: "Selected",
    items: selected.flatMap((id) =>
      illustrations.filter((item) => item.id === id),
    ),
  },
  {
    id: "empty-states",
    label: "01.2 — Empty states",
    title: "Empty states",
    items: emptyStates,
  },
  { id: "agents", label: "01.3 — Agents", title: "Agents", items: agents },
  {
    id: "more",
    label: "01.4 — More drawings",
    title: "More",
    items: illustrations.filter(
      (item) =>
        !selected.includes(item.id) &&
        !emptyStates.includes(item) &&
        !agents.includes(item),
    ),
  },
];

export const metadata: Metadata = { title: "Illustrations" };
export default function IllustrationsPage() {
  return (
    <SiteShell current="/illustrations">
      <PageIntro label="01 — Illustrations" title="Ideas, made visible.">
        Start with a selection, jump to empty states or agents, or search by
        shape or idea. Every drawing is shown at its native 560 × 440.
      </PageIntro>
      <section
        aria-label="Collection"
        className="scroll-mt-6"
        id="illustrations"
      >
        <Suspense
          fallback={
            <p className="sheet-row sheet-cell text-muted-foreground">
              Loading the collection…
            </p>
          }
        >
          <IllustrationGallery retired={retiredStudies} sections={sections} />
        </Suspense>
      </section>
      <CossConcepts />
    </SiteShell>
  );
}
