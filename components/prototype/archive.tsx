"use client";

import Link from "next/link";
import { useState } from "react";
import { NewtonsCradleStudy, ProductionChainStudy } from "@/components/plotter/engineering-studies";
import { OriginalNotFoundBlueprint } from "@/components/plotter/original-not-found-blueprint";
import { OriginalParticlesBlueprint } from "@/components/plotter/original-particles-blueprint";
import { PrimitivesBlueprint } from "@/components/plotter/primitives-blueprint";
import { Action, Arrow, Artwork, Footer, Header, PageShell } from "./shared";
import styles from "./styles.module.css";

const specimens = [
  { code: "P00", title: "Circle, square, line", category: "Foundations", description: "Radius, tangency, and a common construction.", art: <PrimitivesBlueprint /> },
  { code: "AG01", title: "An agent, registered", category: "Systems", description: "Identity, name, and tools become one record.", art: <img alt="" height="440" src="/plotter/downloads/agent-registration.svg" width="560" /> },
  { code: "C00", title: "The exploded interface", category: "Interfaces", description: "Separate elements following a common frame.", art: <OriginalParticlesBlueprint /> },
  { code: "W05", title: "A part, made in sequence", category: "Systems", description: "One line, with equal carrier pitch.", art: <ProductionChainStudy /> },
  { code: "E00", title: "The missing corner", category: "Interfaces", description: "Absence, described by the edges around it.", art: <OriginalNotFoundBlueprint /> },
  { code: "O07", title: "Newton’s cradle, at release", category: "Systems", description: "A suspended sphere, held before contact.", art: <NewtonsCradleStudy /> },
];
const categories = ["All studies", "Foundations", "Interfaces", "Systems"];

export function Archive() {
  const [category, setCategory] = useState("All studies");
  const visible = category === "All studies" ? specimens : specimens.filter((specimen) => specimen.category === category);

  return (
    <PageShell direction="archive">
      <Header edition="The illustration archive" />
      <main id="prototype-content">
        <section className={styles.archiveIntroduction}>
          <div><p className={styles.eyebrow}>Plotter / Selected studies</p><h1>A little geometry.<br />A lot to say.</h1></div>
          <div className={styles.archiveIntroSide}><p>Illustrations that reveal how things fit, move, and work together. Explore the collection, then make it your own.</p><Action href="/illustrations">Open the full collection</Action></div>
        </section>

        <section aria-label="Selected illustration studies">
          <div className={styles.archiveToolbar}>
            <div aria-label="Filter selected studies" className={styles.archiveFilters} role="group">
              {categories.map((item) => <button aria-pressed={category === item} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}
            </div>
            <p aria-live="polite" className={styles.archiveCount}>{visible.length} selected {visible.length === 1 ? "study" : "studies"}</p>
          </div>
          <div className={styles.archiveGrid}>
            {visible.map((specimen) => (
              <article className={styles.specimen} key={specimen.code}>
                <div className={styles.specimenArt}><span className={styles.specimenCode}>{specimen.code}</span><Artwork label={`${specimen.title}. ${specimen.description}`}>{specimen.art}</Artwork></div>
                <div className={styles.specimenCaption}><div><span className={styles.eyebrow}>{specimen.category}</span><h2>{specimen.title}</h2><p>{specimen.description}</p></div><Link aria-label={`Explore ${specimen.title} in the collection`} className={styles.specimenLink} href="/illustrations"><Arrow diagonal /></Link></div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="archive-language" className={styles.archiveLanguage}>
          <div><p className={styles.eyebrow}>More than a collection</p><h2 id="archive-language">A language you<br />can keep speaking.</h2></div>
          <div><p>Start with an existing study or give your agent a new brief. Plotter carries the same line hierarchy, construction logic, and quiet character into the next drawing.</p><div className={styles.actions}><Action href="/docs/installation">Get the drawing skill</Action><Link className={styles.textLink} href="/grammar">Explore the grammar <Arrow /></Link></div></div>
        </section>
        <div className={styles.archiveResources}><Link href="/animations"><span>See ideas in motion</span><span>Animation studies <Arrow /></span></Link><Link href="/docs"><span>Make your first drawing</span><span>Read the documentation <Arrow /></span></Link></div>
      </main>
      <Footer />
    </PageShell>
  );
}
