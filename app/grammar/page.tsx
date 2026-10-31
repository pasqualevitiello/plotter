import type { Metadata } from "next";
import { SiteShell, PageIntro } from "@/components/site-shell";
import { VisualGrammar } from "@/components/plotter/visual-grammar";

export const metadata: Metadata = { title: "Visual grammar" };
export default function GrammarPage() { return <SiteShell current="/grammar"><PageIntro number="03 / Visual grammar" title="Every mark means something.">A line can describe a boundary, a movement, or something that is not there yet. Learn the difference by seeing each mark on its own.</PageIntro><VisualGrammar/></SiteShell>; }
