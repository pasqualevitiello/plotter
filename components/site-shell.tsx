import Link from "next/link";
import type { ReactNode } from "react";

const links = [["/illustrations", "Illustrations"], ["/animations", "Animations"], ["/grammar", "Grammar"], ["/docs", "Use Plotter"]];

export function SiteShell({ children, current }: { children: ReactNode; current?: string }) {
  return <div className="site-wrap">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:bg-background focus:p-3">Skip to content</a>
    <header className="site-header">
      <Link href="/" className="site-logo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor"/><path d="M12 1v22M1 12h22" stroke="currentColor" strokeWidth="0.5"/></svg>Plotter</Link>
      <nav aria-label="Main navigation" className="site-nav">{links.map(([href, label]) => <Link key={href} href={href} aria-current={current === href ? "page" : undefined}>{label}</Link>)}</nav>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer"><p>Drawn with intent.<br/>A project by Pasquale Vitiello.</p><div className="flex flex-wrap gap-x-6"><Link href="/proto">Design directions</Link><a href="https://github.com/pasqualevitiello/plotter">Source</a><a href="https://coss.com/ui">Made with coss ui</a></div></footer>
  </div>;
}

export function PageIntro({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <div className="page-intro"><p className="eyebrow">Plotter / {number}</p><h1>{title}</h1><p>{children}</p></div>;
}
