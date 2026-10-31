import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell, PageIntro } from "@/components/site-shell";
import { PrimitivesBlueprint } from "@/components/plotter/primitives-blueprint";

export default function Home() {
  return <SiteShell>
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div><PageIntro number="A language for drawing" title="Ideas, drawn precisely.">Editable illustrations built from relationships: a shared edge, a measured interval, a part finding its place.</PageIntro><Button render={<Link href="/proto" />}>Explore the three design directions <ArrowUpRightIcon aria-hidden="true"/></Button><p className="mt-4 text-sm text-muted-foreground">Manual, Archive, and Studio — three ways to introduce Plotter.</p></div>
      <div className="pointer-events-none overflow-x-auto"><div className="min-w-100"><PrimitivesBlueprint/></div></div>
    </div>
    <div className="mt-16 grid border-t md:grid-cols-2">{[
      ["/illustrations", "01", "The collection", "100 construction studies, from geometric primitives to agentic systems."],
      ["/animations", "02", "Ideas in motion", "Six moving studies. The same forms, with behavior you can follow."],
      ["/grammar", "03", "The visual grammar", "Nine kinds of mark. Isolate each one to see what it contributes."],
      ["/docs", "04", "Make something", "Install Plotter, choose a workflow, and keep the result editable."],
    ].map(([href, code, title, copy]) => <Link href={href} key={href} className="flex flex-col gap-3 border-b py-8 pr-8"><span className="eyebrow">{code}</span><h2 className="text-2xl font-medium">{title} ↗</h2><p className="max-w-md text-sm leading-relaxed text-muted-foreground">{copy}</p></Link>)}</div>
  </SiteShell>;
}
