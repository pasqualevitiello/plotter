import type { Metadata } from "next";
import { Suspense } from "react";
import { CossConcepts } from "@/components/plotter/coss-concepts";
import { IllustrationGallery } from "@/components/plotter/illustration-gallery";
import {
  illustrations,
  retiredStudies,
} from "@/components/plotter/illustrations";
import { familyPrefix } from "@/components/plotter/study-types";
import { PageIntro, SheetBar } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";

// A varied first look, then every other drawing by family and code.
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
const families = Object.keys(familyPrefix);
const ordered = [
  ...selected.flatMap((id) => illustrations.filter((item) => item.id === id)),
  ...illustrations
    .filter((item) => !selected.includes(item.id))
    .sort(
      (a, b) =>
        families.indexOf(a.category) - families.indexOf(b.category) ||
        a.code.localeCompare(b.code),
    ),
];

export const metadata: Metadata = { title: "Illustrations" };
export default function IllustrationsPage() {
  return (
    <SiteShell current="/illustrations">
      <PageIntro label="01 — Illustrations" title="Ideas, made visible.">
        Construction studies of interfaces, systems, time, agents, and the
        objects around them. Every drawing is shown at its native 560 × 440.
      </PageIntro>
      <section
        aria-labelledby="illustrations-heading"
        className="scroll-mt-6"
        id="illustrations"
      >
        <SheetBar
          id="illustrations-heading"
          label="01.1 — Collection"
          meta={`${ordered.length} drawings · Scale 1:1`}
        />
        <Suspense
          fallback={
            <p className="sheet-row sheet-cell text-muted-foreground">
              Loading the collection…
            </p>
          }
        >
          <IllustrationGallery
            illustrations={ordered}
            retired={retiredStudies}
          />
        </Suspense>
      </section>
      <CossConcepts />
    </SiteShell>
  );
}
