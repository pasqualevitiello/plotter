"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { DrawingFigure, SheetBar } from "@/components/sheet";
import { Button } from "@/components/ui/button";
import type { IllustrationStudy } from "./study-types";

export type GallerySection = {
  id: string;
  label: string;
  title: string;
  items: IllustrationStudy[];
};

// Old category links land on the section that now holds them.
const sectionForCategory: Record<string, string> = {
  "Empty states": "empty-states",
  Agents: "agents",
};

function matches(item: IllustrationStudy, query: string) {
  const text =
    `${item.code} ${item.title} ${item.description} ${item.category}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

export function IllustrationGallery({
  sections,
  retired,
}: {
  sections: GallerySection[];
  retired: Record<string, string>;
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const deferredQuery = useDeferredValue(query.trim());
  const total = sections.reduce(
    (sum, section) => sum + section.items.length,
    0,
  );
  const visible = sections.map((section) => ({
    ...section,
    items: deferredQuery
      ? section.items.filter((item) => matches(item, deferredQuery))
      : section.items,
  }));
  const found = visible.reduce((sum, section) => sum + section.items.length, 0);

  const variant = params.get("variant");
  const target = variant
    ? (retired[variant] ?? variant)
    : sectionForCategory[params.get("category") ?? ""];

  // Existing preview and category URLs locate their drawing or section.
  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView();
  }, [target]);

  function search(value: string) {
    setQuery(value);
    const next = new URLSearchParams(window.location.search);
    next.delete("category");
    next.delete("variant");
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    const search = next.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}`,
    );
  }

  return (
    <>
      <div className="sheet-row flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3">
        <div className="relative w-full sm:w-80">
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <label className="sr-only" htmlFor="illustration-search">
            Search drawings
          </label>
          <input
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-input bg-background ps-9 pe-3 text-base outline-none placeholder:text-muted-foreground/72 focus-visible:ring-2 focus-visible:ring-ring sm:h-9 sm:text-sm"
            id="illustration-search"
            onChange={(event) => search(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") search("");
            }}
            placeholder={`Search ${total} drawings by shape or idea`}
            spellCheck={false}
            type="search"
            value={query}
          />
        </div>
        <nav
          aria-label="Collection sections"
          className="flex flex-wrap gap-x-5 text-sm"
        >
          {visible.map((section) => (
            <a
              className="inline-flex min-h-10 items-center gap-1.5 text-muted-foreground hover:text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-48"
              aria-disabled={section.items.length === 0 || undefined}
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title}
              <span className="mono-label">{section.items.length}</span>
            </a>
          ))}
        </nav>
        <p aria-live="polite" className="mono-label ms-auto">
          {deferredQuery
            ? `${found} of ${total} drawings`
            : `${total} drawings`}
          <span className="sm:hidden"> · scroll each sideways</span>
        </p>
      </div>

      {visible.map((section) =>
        section.items.length ? (
          <section
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-6"
            id={section.id}
            key={section.id}
          >
            <SheetBar
              id={`${section.id}-heading`}
              label={section.label}
              meta={`${section.items.length} ${section.items.length === 1 ? "drawing" : "drawings"}`}
            />
            <ul className="sheet-row sheet-cols">
              {section.items.map((item) => (
                <li className="min-w-0 scroll-mt-6" id={item.id} key={item.id}>
                  <DrawingFigure
                    code={item.code}
                    description={item.description}
                    title={item.title}
                  >
                    {item.illustration}
                  </DrawingFigure>
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}

      {found === 0 ? (
        <div className="sheet-row sheet-cell flex flex-col items-start gap-3">
          <p className="font-medium">No drawings match “{deferredQuery}”.</p>
          <p className="max-w-[52ch] text-muted-foreground">
            Try a shape or an idea, like “circle”, “schedule”, or “connection”.
            Or describe it to the skill and draw a new one.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button onClick={() => search("")} variant="outline">
              Clear search
            </Button>
            <Button render={<Link href="/docs/drawing" />} variant="ghost">
              Draw a new one
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
