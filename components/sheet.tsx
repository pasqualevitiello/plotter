import Link from "next/link";
import type { ReactNode } from "react";

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="sheet-row sheet-intro">
      <p className="mono-label">{label}</p>
      <h1 id="page-title">{title}</h1>
      <p>{children}</p>
    </section>
  );
}

/** A ruled bar that opens a section: label, optional meta, optional action. */
export function SheetBar({
  id,
  label,
  meta,
  action,
}: {
  id?: string;
  label: string;
  meta?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="sheet-bar">
      <h2 id={id}>{label}</h2>
      {meta ? <div className="mono-label max-md:hidden">{meta}</div> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}

/** A drawing that fits its container, up to its native 560 × 440 size. */
export function SheetArt({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div aria-label={label} className="sheet-art" role="img">
      <div className="sheet-art-inner pointer-events-none select-none">
        {children}
      </div>
    </div>
  );
}

export function DrawingFigure({
  code,
  title,
  href,
  meta,
  description,
  children,
}: {
  code: string;
  title: string;
  href?: string;
  meta?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <figure className="flex h-full flex-col">
      <SheetArt label={`${code}: ${title}`}>{children}</SheetArt>
      <figcaption className="mt-auto">
        <div className="sheet-caption">
          <span className="mono-label">{code}</span>
          {href ? (
            <Link
              className="decoration-1 underline-offset-4 hover:underline"
              href={href}
            >
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
          {meta ? (
            <span className="mono-label sheet-caption-meta">{meta}</span>
          ) : null}
        </div>
        {description ? (
          <p className="sheet-caption-description">{description}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
