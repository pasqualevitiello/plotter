import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock, CopyText } from "@/components/copy-text";
import { ProductionChainStudy } from "@/components/plotter/engineering-studies";
import { PlotterTokenGuide } from "@/components/plotter/plotter-token-guide";
import { SheetArt } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";
import { StandaloneAnimationPreview } from "@/components/standalone-animation-preview";
import { documents, readDocument } from "@/lib/docs";

export function generateStaticParams() {
  return documents.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title:
      documents.find((document) => document.slug === slug)?.title ??
      "Documentation",
  };
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await readDocument(slug);
  if (!content) notFound();
  const index = documents.findIndex((document) => document.slug === slug);
  return (
    <SiteShell current="/docs">
      <div className="sheet-bar">
        <div>
          <Link className="text-link" href="/docs">
            <ArrowLeftIcon aria-hidden="true" />
            <span className="sm:hidden">Docs</span>
            <span className="max-sm:hidden">All documentation</span>
          </Link>
        </div>
        <div>
          <CopyText text={content} label="Copy Markdown" />
        </div>
        <div className="max-sm:hidden">
          <a className="text-link" download href={`/docs/${slug}.md`}>
            Download .md
          </a>
        </div>
      </div>
      <div className="sheet-row grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav
          aria-label="Documentation"
          className="border-b px-5 py-4 lg:sticky lg:top-0 lg:self-start lg:border-b-0 lg:px-6 lg:py-8"
        >
          <p className="mono-label mb-2">Guides</p>
          <ul>
            {documents.map((document, position) => (
              <li key={document.slug}>
                <Link
                  aria-current={document.slug === slug ? "page" : undefined}
                  className="flex min-h-10 items-baseline gap-3 text-sm text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground"
                  href={`/docs/${document.slug}`}
                >
                  <span className="mono-label">04.{position + 1}</span>
                  {document.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sheet-cell lg:border-s">
          <p className="mono-label mb-5">04.{index + 1} — Docs</p>
          <article className="doc-content">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
              }}
            >
              {content}
            </Markdown>
          </article>
        </div>
      </div>
      {slug === "customization" && (
        <PlotterTokenGuide>
          <ProductionChainStudy />
        </PlotterTokenGuide>
      )}
      {slug === "drawing" && (
        <figure className="sheet-row">
          <SheetArt label="An identity, name, and tools become one registered agent.">
            {/* biome-ignore lint/performance/noImgElement: The downloadable SVG file is the example. */}
            <img
              alt=""
              className="block w-[560px] dark:invert"
              height="440"
              src="/plotter/downloads/agent-registration.svg"
              width="560"
            />
          </SheetArt>
          <figcaption className="sheet-caption border-t pt-3">
            <span className="mono-label">AGT-01</span>
            <span>An agent, registered</span>
            <a
              className="mono-label sheet-caption-meta underline underline-offset-4"
              download
              href="/plotter/downloads/agent-registration.svg"
            >
              Editable SVG
            </a>
          </figcaption>
        </figure>
      )}
      {slug === "animation" && (
        <div className="sheet-row sheet-cell">
          <div className="max-w-2xl">
            <StandaloneAnimationPreview />
            <a
              className="text-link"
              download
              href="/plotter/downloads/assembly-line.html"
            >
              Download editable HTML
            </a>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
