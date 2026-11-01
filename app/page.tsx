import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProductionChainStudy } from "@/components/plotter/engineering-studies";
import { PrimitivesBlueprint } from "@/components/plotter/primitives-blueprint";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";

const chapters = [
  {
    number: "01",
    title: "A library to draw from",
    copy: "Geometry, interfaces, systems, and the spaces between them. Find a drawing that makes your idea tangible.",
    href: "/illustrations",
    link: "Browse illustrations",
  },
  {
    number: "02",
    title: "A grammar to build on",
    copy: "A shared language of forms, construction lines, dimensions, and hatching. Every mark has a job.",
    href: "/grammar",
    link: "Learn the grammar",
  },
  {
    number: "03",
    title: "A skill to make it yours",
    copy: "Give your agent a brief. Get an editable drawing you can inspect, adapt, and put to work.",
    href: "/docs/installation",
    link: "Install Plotter",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className={styles.manualHero}>
        <div className={styles.manualIntroduction}>
          <p className={styles.eyebrow}>An open language for illustration</p>
          <h1 className="font-medium">
            Give an idea
            <br />
            its shape.
          </h1>
          <p className={styles.lede}>
            Simple forms. Fine lines. A considered way to draw and animate ideas
            for the web.
          </p>
          <div className={styles.actions}>
            <Button render={<Link href="/docs/installation" />} size="xl">
              Start drawing <ArrowRightIcon aria-hidden="true" />
            </Button>
            <Link className={styles.textLink} href="/illustrations">
              Explore the collection{" "}
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <p className={styles.materialNote}>
            Editable SVG · Agent skill · Shared visual grammar
          </p>
        </div>
        <figure className={styles.manualFigure}>
          <div className={styles.figureTopline}>
            <span>Study P00</span>
            <span>Foundations</span>
          </div>
          <Artwork label="A circle inscribed in a square, connected by a diagonal, radius, and dimension lines.">
            <PrimitivesBlueprint />
          </Artwork>
          <figcaption>
            <strong>Circle, square, line.</strong>
            <span>One relationship, made visible.</span>
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="manual-principle"
        className={styles.manualPrinciple}
      >
        <p className={styles.eyebrow}>The principle</p>
        <h2 className="font-medium" id="manual-principle">
          The drawing should explain
          <br className={styles.desktopBreak} /> what the words can’t.
        </h2>
        <p>
          Plotter brings the care of a construction drawing to product
          illustration. Transparent forms reveal relationships. Fine lines
          establish hierarchy. A little geometry does a lot of explaining.
        </p>
      </section>

      <section aria-label="Explore Plotter" className={styles.manualChapters}>
        {chapters.map((chapter) => (
          <article key={chapter.number}>
            <span className={styles.chapterNumber}>{chapter.number}</span>
            <h3 className="font-medium">{chapter.title}</h3>
            <p>{chapter.copy}</p>
            <Link className={styles.textLink} href={chapter.href}>
              {chapter.link}{" "}
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </article>
        ))}
      </section>

      <section aria-labelledby="manual-motion" className={styles.manualMotion}>
        <figure>
          <Artwork label="A square core above a line of three equally spaced carriers, showing load and assembly positions.">
            <ProductionChainStudy />
          </Artwork>
          <figcaption className={styles.smallCaption}>
            Study W05 — A part, made in sequence
          </figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>From drawing to motion</p>
          <h2 className="font-medium" id="manual-motion">
            Make the relationship move.
          </h2>
          <p>
            A core settles into its carrier. The line advances. Motion can
            explain a sequence as carefully as a still drawing explains a
            structure.
          </p>
          <Link className={styles.textLink} href="/animations">
            See the motion studies{" "}
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

function Artwork({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div aria-label={label} className={styles.artwork} role="img">
      {children}
    </div>
  );
}
