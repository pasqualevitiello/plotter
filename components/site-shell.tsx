import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PlotterWordmark } from "@/components/plotter-wordmark";
import { Button } from "@/components/ui/button";

const links = [
  ["/illustrations", "Illustrations"],
  ["/animations", "Animations"],
  ["/grammar", "Grammar"],
  ["/docs", "Docs"],
];

export function SiteShell({ children, current }: { children: ReactNode; current?: string }) {
  return (
    <div className="site-wrap">
      <a className="site-skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="site-brand">
          <PlotterWordmark />
          <span className="site-edition">A drawing manual</span>
        </div>
        <nav aria-label="Main navigation" className="site-nav">
          {links.map(([href, label]) => (
            <Link aria-current={current === href ? "page" : undefined} href={href} key={href}>
              {label}
            </Link>
          ))}
          <Button render={<Link href="/docs/installation" />} variant="outline">
            Install <ArrowRightIcon aria-hidden="true" />
          </Button>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer-main">
          <div>
            <PlotterWordmark />
            <p>Simple forms. Fine lines. Clear ideas.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/docs/drawing">Drawing guide</Link>
            <Link href="/docs/animation">Animation guide</Link>
            <Link href="/docs/customization">Customization</Link>
            <a download href="/plotter/downloads/plotter.zip">
              Download skill <ArrowUpRightIcon aria-hidden="true" className="size-4" />
            </a>
          </nav>
        </div>
        <div className="site-footer-meta">
          <p>A project by Pasquale Vitiello.</p>
          <div>
            <a href="https://github.com/pasqualevitiello/plotter">Source</a>
            <a href="https://coss.com/ui">Made with coss ui</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">Plotter / {number}</p>
      <h1 className="font-medium">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
