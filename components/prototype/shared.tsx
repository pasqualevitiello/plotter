import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import styles from "./styles.module.css";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export function Wordmark() {
  return (
    <Link aria-label="Plotter home" className={styles.wordmark} href="/">
      <svg aria-hidden="true" fill="none" height="25" viewBox="0 0 28 28" width="25">
        <path d="M5 4V24M4 23H24M6 6H22V22" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      Plotter
    </Link>
  );
}

export function Header({ edition }: { edition: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Wordmark />
        <span className={styles.edition}>{edition}</span>
      </div>
      <nav aria-label="Main navigation" className={styles.navigation}>
        <Link href="/illustrations">Illustrations</Link>
        <Link href="/animations">Animations</Link>
        <Link href="/grammar">Grammar</Link>
        <Link href="/docs">Docs</Link>
        <Link className={styles.navInstall} href="/docs/installation">Install <Arrow /></Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div><Wordmark /><p>Simple forms. Fine lines. Clear ideas.</p></div>
      <nav aria-label="Footer navigation">
        <Link href="/docs/drawing">Drawing guide</Link>
        <Link href="/docs/animation">Animation guide</Link>
        <Link href="/docs/customization">Customization</Link>
        <a download href="/plotter/downloads/plotter.zip">Download skill <Arrow diagonal /></a>
      </nav>
    </footer>
  );
}

export function Action({ children, href, secondary = false }: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return (
    <Button className={secondary ? styles.secondaryAction : styles.primaryAction} render={<Link href={href} />} size="xl" variant={secondary ? "outline" : "default"}>
      {children} <Arrow />
    </Button>
  );
}

export function Artwork({ children, label, className = "" }: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return <div aria-label={label} className={`${styles.artwork} ${className}`} role="img">{children}</div>;
}

export function PageShell({ children, direction }: {
  children: ReactNode;
  direction: "manual" | "archive" | "studio";
}) {
  return (
    <div className={`${styles.page} ${styles[direction]}`}>
      <a className={styles.skipLink} href="#prototype-content">Skip to content</a>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
