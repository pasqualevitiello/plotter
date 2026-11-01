import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { EngineeringMotionPreview } from "@/components/plotter/engineering-motion-preview";
import { illustrations } from "@/components/plotter/illustrations";
import { NewtonsCradleMotionDrawing } from "@/components/plotter/newtons-cradle-motion-drawing";
import { DrawingFigure, SheetBar } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

const hero = study("OBJ-05");
const library = [
  "MEC-01",
  "INT-04",
  "SRV-06",
  "OBJ-01",
  "NAT-01",
  "EMP-02",
].map(study);

const chapters = [
  {
    label: "03 — Grammar",
    title: "Every mark has a job.",
    copy: "Primary forms, construction lines, dimensions, and hatching each carry one meaning, so a drawing reads the same everywhere.",
    href: "/grammar",
    link: "Read the grammar",
  },
  {
    label: "04 — Motion",
    title: "Relationships that move.",
    copy: "Animate a sequence with the same restraint as a still: one change at a time, at a pace you can follow.",
    href: "/animations",
    link: "See the motion studies",
  },
  {
    label: "05 — Skill",
    title: "Give your agent a brief.",
    copy: "Install the skill in Claude Code or Codex. Describe an idea and get an editable drawing you can inspect and adapt.",
    href: "/docs/installation",
    link: "Install Plotter",
  },
];

function study(code: string) {
  const item = illustrations.find((illustration) => illustration.code === code);
  if (!item) throw new Error(`Missing homepage illustration: ${code}`);
  return item;
}

export default function Home() {
  return (
    <SiteShell>
      <section aria-labelledby="home-title" className="sheet-row sheet-cols">
        <div className="sheet-cell flex flex-col justify-center gap-8">
          <div>
            <p className="mono-label">01 — Introduction</p>
            <h1
              className="mt-5 max-w-[12ch] text-[40px] leading-[1.02] sm:text-[52px]"
              id="home-title"
            >
              Construction drawings for product ideas.
            </h1>
            <p className="mt-5 max-w-[42ch] text-lg text-muted-foreground">
              A visual grammar, a library of editable SVG drawings, and an agent
              skill that draws new ones by the same rules.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button render={<Link href="/docs/installation" />} size="lg">
              Install the skill <ArrowRightIcon aria-hidden="true" />
            </Button>
            <Button
              render={<Link href="/illustrations" />}
              size="lg"
              variant="ghost"
            >
              Browse the library <ArrowRightIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
        <figure className="flex flex-col">
          <div className="flex flex-1 items-center">
            <div
              aria-label={`${hero.code}: Newton’s cradle in motion`}
              className="w-full"
              role="img"
            >
              <EngineeringMotionPreview
                animated={<NewtonsCradleMotionDrawing />}
              >
                {hero.illustration}
              </EngineeringMotionPreview>
            </div>
          </div>
          <figcaption className="grid grid-cols-[auto_minmax(0,1fr)_auto] border-t text-sm">
            <span className="mono-label px-5 py-3 text-foreground">
              {hero.code}
            </span>
            <Link
              className="border-s px-5 py-3 underline-offset-4 hover:underline"
              href="/animations#newtons-cradle-animation"
            >
              Newton’s cradle
            </Link>
            <span className="mono-label border-s px-5 py-3 max-sm:hidden">
              Animated SVG
            </span>
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="home-library">
        <SheetBar
          action={
            <Link className="text-link" href="/illustrations">
              View all {illustrations.length}{" "}
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          }
          id="home-library"
          label="02 — Library"
          meta="Geometry, interfaces, empty states, agents, and more"
        />
        <div className="sheet-row sheet-cols">
          {library.map((item) => (
            <DrawingFigure
              code={item.code}
              href={`/illustrations?variant=${item.id}`}
              key={item.id}
              title={item.title}
            >
              {item.illustration}
            </DrawingFigure>
          ))}
        </div>
      </section>

      <section aria-label="Explore Plotter" className="sheet-row sheet-cols-3">
        {chapters.map((chapter) => (
          <article
            className="flex flex-col items-start gap-3 px-5 py-8 sm:px-6"
            key={chapter.label}
          >
            <p className="mono-label">{chapter.label}</p>
            <h2 className="mt-3 text-2xl leading-tight">{chapter.title}</h2>
            <p className="max-w-[38ch] text-muted-foreground">{chapter.copy}</p>
            <Link className="text-link mt-auto" href={chapter.href}>
              {chapter.link} <ArrowRightIcon aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
