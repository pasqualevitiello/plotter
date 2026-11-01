import { ArrowUpRightIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ModeSwitcher } from "@/components/mode-switcher";
import { illustrations } from "@/components/plotter/illustrations";
import { PlotterWordmark } from "@/components/plotter-wordmark";
import { Button } from "@/components/ui/button";

const links = [
  ["/illustrations", "Illustrations"],
  ["/animations", "Animations"],
  ["/grammar", "Grammar"],
  ["/docs", "Docs"],
];

const repository = "https://github.com/pasqualevitiello/plotter";

export function SiteShell({
  children,
  current,
}: {
  children: ReactNode;
  current?: string;
}) {
  return (
    <div className="sheet-page">
      <a className="site-skip-link" href="#main">
        Skip to content
      </a>
      <div className="sheet">
        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
          <span
            aria-hidden="true"
            className="sheet-tick"
            data-corner={corner}
            key={corner}
          />
        ))}
        <header className="sheet-head">
          <div className="sheet-head-brand">
            <PlotterWordmark />
          </div>
          <nav aria-label="Main navigation" className="sheet-nav">
            {links.map(([href, label]) => (
              <Link
                aria-current={current === href ? "page" : undefined}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="sheet-meta mono-label">
            {illustrations.length} drawings · Editable SVG
          </p>
          <div className="sheet-actions">
            <Button
              aria-label="Plotter on GitHub"
              className="size-11 sm:size-8"
              render={
                <a
                  href={repository}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="icon"
              title="Plotter on GitHub"
              variant="ghost"
            >
              <GithubIcon aria-hidden="true" className="size-4" />
            </Button>
            <ModeSwitcher />
            <Button
              className="ms-2"
              render={<Link href="/docs/installation" />}
              variant="outline"
            >
              Install
            </Button>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="sheet-foot">
          <div>
            <PlotterWordmark />
            <p>Simple forms. Fine lines. Clear ideas.</p>
          </div>
          <nav aria-label="Guides">
            <span className="mono-label">Guides</span>
            <Link href="/docs/drawing">Drawing</Link>
            <Link href="/docs/animation">Animation</Link>
            <Link href="/docs/customization">Customization</Link>
          </nav>
          <div>
            <span className="mono-label">Skill</span>
            <Link href="/docs/installation">Installation</Link>
            <a download href="/plotter/downloads/plotter.zip">
              Download plotter.zip
            </a>
          </div>
          <div>
            <span className="mono-label">Drawn by</span>
            <a
              href="https://x.com/pacovitiello"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pasquale Vitiello <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <span className="mono-label mt-2">Source</span>
            <a href={repository} rel="noopener noreferrer" target="_blank">
              GitHub <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <span className="mono-label mt-2">Built with</span>
            <a
              href="https://coss.com/ui"
              rel="noopener noreferrer"
              target="_blank"
            >
              coss ui <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
