import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { illustrations } from "@/components/plotter/illustrations";
import { SheetArt } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

const missing = illustrations.find((item) => item.id === "state-missing-page");

export default function NotFound() {
  return (
    <SiteShell>
      <section
        aria-labelledby="not-found-title"
        className="sheet-row sheet-cols"
      >
        <div className="sheet-cell flex flex-col justify-center gap-8">
          <div>
            <p className="mono-label">404 — Missing page</p>
            <h1
              className="mt-5 max-w-[14ch] text-[40px] leading-[1.02] sm:text-[52px]"
              id="not-found-title"
            >
              This part is still missing.
            </h1>
            <p className="mt-5 max-w-[42ch] text-lg text-muted-foreground">
              The page you followed isn’t on this sheet. Return to the
              collection or open the documentation to find your way.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button render={<Link href="/illustrations" />} size="lg">
              Explore the illustrations <ArrowRightIcon aria-hidden="true" />
            </Button>
            <Button render={<Link href="/docs" />} size="lg" variant="ghost">
              Read the docs <ArrowRightIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
        {missing ? (
          <figure className="flex flex-col justify-center">
            <SheetArt label={`${missing.code}: ${missing.title}`}>
              {missing.illustration}
            </SheetArt>
            <figcaption className="sheet-caption">
              <span className="mono-label">{missing.code}</span>
              <span>{missing.title}</span>
            </figcaption>
          </figure>
        ) : null}
      </section>
    </SiteShell>
  );
}
