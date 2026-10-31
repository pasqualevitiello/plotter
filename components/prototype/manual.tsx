import Link from "next/link";
import { ProductionChainStudy } from "@/components/plotter/engineering-studies";
import { PrimitivesBlueprint } from "@/components/plotter/primitives-blueprint";
import { Action, Arrow, Artwork, Footer, Header, PageShell } from "./shared";
import styles from "./styles.module.css";

const chapters = [
  { number: "01", title: "A library to draw from", copy: "Geometry, interfaces, systems, and the spaces between them. Find a drawing that makes your idea tangible.", href: "/illustrations", link: "Browse illustrations" },
  { number: "02", title: "A grammar to build on", copy: "A shared language of forms, construction lines, dimensions, and hatching. Every mark has a job.", href: "/grammar", link: "Learn the grammar" },
  { number: "03", title: "A skill to make it yours", copy: "Give your agent a brief. Get an editable drawing you can inspect, adapt, and put to work.", href: "/docs/installation", link: "Install Plotter" },
];

export function Manual() {
  return (
    <PageShell direction="manual">
      <Header edition="A drawing manual" />
      <main id="prototype-content">
        <section className={styles.manualHero}>
          <div className={styles.manualIntroduction}>
            <p className={styles.eyebrow}>An open language for illustration</p>
            <h1>Give an idea<br />its shape.</h1>
            <p className={styles.lede}>Simple forms. Fine lines. A considered way to draw and animate ideas for the web.</p>
            <div className={styles.actions}><Action href="/docs/installation">Start drawing</Action><Link className={styles.textLink} href="/illustrations">Explore the collection <Arrow /></Link></div>
            <p className={styles.materialNote}>Editable SVG · Agent skill · Shared visual grammar</p>
          </div>
          <figure className={styles.manualFigure}>
            <div className={styles.figureTopline}><span>Study P00</span><span>Foundations</span></div>
            <Artwork label="A circle inscribed in a square, connected by a diagonal, radius, and dimension lines."><PrimitivesBlueprint /></Artwork>
            <figcaption><strong>Circle, square, line.</strong><span>One relationship, made visible.</span></figcaption>
          </figure>
        </section>

        <section aria-labelledby="manual-principle" className={styles.manualPrinciple}>
          <p className={styles.eyebrow}>The principle</p>
          <h2 id="manual-principle">The drawing should explain<br className={styles.desktopBreak} /> what the words can’t.</h2>
          <p>Plotter brings the care of a construction drawing to product illustration. Transparent forms reveal relationships. Fine lines establish hierarchy. A little geometry does a lot of explaining.</p>
        </section>

        <section aria-label="Explore Plotter" className={styles.manualChapters}>
          {chapters.map((chapter) => (
            <article key={chapter.number}>
              <span className={styles.chapterNumber}>{chapter.number}</span>
              <h3>{chapter.title}</h3><p>{chapter.copy}</p>
              <Link className={styles.textLink} href={chapter.href}>{chapter.link} <Arrow /></Link>
            </article>
          ))}
        </section>

        <section aria-labelledby="manual-motion" className={styles.manualMotion}>
          <figure>
            <Artwork label="A square core above a line of three equally spaced carriers, showing load and assembly positions."><ProductionChainStudy /></Artwork>
            <figcaption className={styles.smallCaption}>Study W05 — A part, made in sequence</figcaption>
          </figure>
          <div>
            <p className={styles.eyebrow}>From drawing to motion</p>
            <h2 id="manual-motion">Make the relationship move.</h2>
            <p>A core settles into its carrier. The line advances. Motion can explain a sequence as carefully as a still drawing explains a structure.</p>
            <Link className={styles.textLink} href="/animations">See the motion studies <Arrow /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
