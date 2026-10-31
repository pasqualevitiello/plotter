import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { PlotterUsage } from "@/components/plotter/plotter-usage";
import { documents } from "@/lib/docs";

export const metadata: Metadata = { title: "Use Plotter" };
export default function DocsPage() {
  return <SiteShell current="/docs"><PageIntro number="04 / Use Plotter" title="Give your agent a drawing practice.">One skill, two workflows, and a shared visual grammar. Start with a clear relationship and finish with vectors you can edit.</PageIntro><nav aria-label="Documentation" className="grid gap-6 border-t py-8 sm:grid-cols-2">{documents.map((document) => <Link key={document.slug} href={`/docs/${document.slug}`} className="block space-y-2 py-3"><h2 className="text-xl font-medium">{document.title} ↗</h2><p className="text-sm text-muted-foreground">{document.description}</p></Link>)}</nav><PlotterUsage/><div id="plotter-tokens" className="border-t py-8"><Link href="/docs/customization" className="text-xl underline underline-offset-4">Explore tokens and standalone exports ↗</Link></div></SiteShell>;
}
