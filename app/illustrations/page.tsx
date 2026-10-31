import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell, PageIntro } from "@/components/site-shell";
import { IllustrationGallery } from "@/components/plotter/illustration-gallery";
import { illustrations } from "@/components/plotter/illustrations";
import { CossConcepts } from "@/components/plotter/coss-concepts";

export const metadata: Metadata = { title: "Illustrations" };
export default function IllustrationsPage() {
  return <SiteShell current="/illustrations"><PageIntro number="01 / Collection" title="A hundred ways to explain an idea.">Browse the construction studies by subject. Every illustration keeps its original geometry and its place in the collection.</PageIntro><section id="illustrations"><Suspense fallback={<p>Loading the collection…</p>}><IllustrationGallery illustrations={illustrations}/></Suspense></section><CossConcepts/></SiteShell>;
}
