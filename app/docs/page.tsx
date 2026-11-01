import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PlotterUsage } from "@/components/plotter/plotter-usage";
import { PageIntro, SheetBar } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";
import { documents } from "@/lib/docs";

export const metadata: Metadata = { title: "Use Plotter" };
export default function DocsPage() {
  return (
    <SiteShell current="/docs">
      <PageIntro label="04 — Docs" title="Give your agent a drawing practice.">
        One skill, two workflows, and a shared visual grammar. Start with a
        clear relationship and finish with vectors you can edit.
      </PageIntro>
      <nav aria-labelledby="docs-guides">
        <SheetBar
          id="docs-guides"
          label="Guides"
          meta={`${documents.length} guides`}
        />
        <ul className="sheet-row sheet-cols">
          {documents.map((document, index) => (
            <li key={document.slug}>
              <Link
                className="group flex h-full flex-col items-start gap-3 p-5 sm:p-10"
                href={`/docs/${document.slug}`}
              >
                <span className="mono-label">04.{index + 1}</span>
                <span className="mt-2 font-heading text-2xl leading-tight font-medium [font-variation-settings:'GEOM'_50]">
                  {document.title}
                </span>
                <span className="max-w-[44ch] text-muted-foreground">
                  {document.description}
                </span>
                <span className="text-link mt-auto group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                  Read the guide <ArrowRightIcon aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <PlotterUsage />
    </SiteShell>
  );
}
