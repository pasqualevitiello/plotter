import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteShell } from "@/components/site-shell";
import { StandaloneAnimationPreview } from "@/components/standalone-animation-preview";
import { CodeBlock, CopyText } from "@/components/copy-text";
import { PlotterTokenGuide } from "@/components/plotter/plotter-token-guide";
import { ProductionChainStudy } from "@/components/plotter/engineering-studies";
import { documents, readDocument } from "@/lib/docs";

export function generateStaticParams() { return documents.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: documents.find((document) => document.slug === slug)?.title ?? "Documentation" };
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await readDocument(slug);
  if (!content) notFound();
  return <SiteShell current="/docs"><div className="flex flex-wrap items-center justify-between gap-4 py-10"><Link href="/docs" className="text-sm underline underline-offset-4">← All documentation</Link><div className="flex flex-wrap items-center gap-4"><CopyText text={content} label="Copy Markdown"/><a href={`/docs/${slug}.md`} download className="text-sm underline underline-offset-4">Download .md</a></div></div><article className="doc-content"><Markdown remarkPlugins={[remarkGfm]} components={{ pre: ({ children }) => <CodeBlock>{children}</CodeBlock> }}>{content}</Markdown></article>{slug === "customization" && <PlotterTokenGuide><ProductionChainStudy/></PlotterTokenGuide>}{slug === "drawing" && <figure className="max-w-140"><img src="/plotter/downloads/agent-registration.svg" alt="An identity, name, and tools become one registered agent." width="560" height="440"/><figcaption className="text-sm text-muted-foreground">AG01 · An agent, registered. Editable SVG.</figcaption></figure>}{slug === "animation" && <div className="max-w-2xl"><StandaloneAnimationPreview /><a href="/plotter/downloads/assembly-line.html" download className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Download editable HTML</a></div>}<nav aria-label="More documentation" className="flex flex-wrap gap-6 border-t py-8">{documents.filter((document) => document.slug !== slug).map((document) => <Link href={`/docs/${document.slug}`} key={document.slug} className="text-sm underline underline-offset-4">{document.title}</Link>)}</nav></SiteShell>;
}
