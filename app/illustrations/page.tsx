import type { Metadata } from "next";
import { Suspense } from "react";
import { CossConcepts } from "@/components/plotter/coss-concepts";
import { IllustrationGallery } from "@/components/plotter/illustration-gallery";
import { illustrations } from "@/components/plotter/illustrations";
import { PageIntro, SiteShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "Illustrations" };
export default function IllustrationsPage() {
  return (
    <SiteShell current="/illustrations">
      <PageIntro
        number="01 / Collection"
        title="A hundred ways to explain an idea."
      >
        Browse the construction studies by subject. Every illustration keeps its
        original geometry and its place in the collection.
      </PageIntro>
      <section id="illustrations">
        <Suspense fallback={<p>Loading the collection…</p>}>
          <IllustrationGallery illustrations={illustrations} />
        </Suspense>
      </section>
      <CossConcepts />
    </SiteShell>
  );
}
