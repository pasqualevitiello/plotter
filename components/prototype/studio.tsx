"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Action, Arrow, Footer, Header, PageShell } from "./shared";
import styles from "./styles.module.css";

const drawings = [
  { code: "AG01", title: "An agent, registered", filename: "agent-registration.svg", subject: "Identity → record", description: "An identity, name, and tools align into one discoverable record.", notes: ["Loose parts retain their size when assembled.", "Projection lines connect the parts to their final positions.", "The assigned identifier belongs to the new record."] },
  { code: "W05", title: "A part, made in sequence", filename: "production-chain.svg", subject: "Part → assembly", description: "A square core joins an equally spaced line of open carriers.", notes: ["Carriers share one horizontal axis and equal pitch.", "Hatching identifies the core faces alone.", "The dashed arrow shows the conveyor’s direction."] },
];

export function Studio() {
  const [selected, setSelected] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const drawing = drawings[selected];

  return (
    <PageShell direction="studio">
      <Header edition="The drawing studio" />
      <main id="prototype-content">
        <section className={styles.studioIntroduction}>
          <div><p className={styles.eyebrow}>An illustration skill for your agent</p><h1>Ideas, under construction.</h1></div>
          <p>Choose a study. Look closely.<br />Then draw something of your own.</p>
        </section>

        <section aria-label="Drawing study viewer" className={styles.workbench}>
          <aside className={styles.studioControls}>
            <div className={styles.controlSection}>
              <h2>On the drawing board</h2>
              <div aria-label="Choose a drawing study" className={styles.drawingChoices} role="group">
                {drawings.map((item, index) => (
                  <Button aria-pressed={selected === index} className={styles.drawingChoice} key={item.code} onClick={() => setSelected(index)} variant="ghost">
                    <span className={styles.choiceCode}>{item.code}</span><span>{item.title}</span><span aria-hidden="true" className={styles.choiceIndicator} />
                  </Button>
                ))}
              </div>
            </div>
            <div className={styles.controlSection}>
              <h2>Drawing details</h2>
              <dl className={styles.drawingDetails}><div><dt>Format</dt><dd>Editable SVG</dd></div><div><dt>Artboard</dt><dd>560 × 440</dd></div><div><dt>Subject</dt><dd>{drawing.subject}</dd></div></dl>
              <label className={styles.noteToggle}><input checked={showNotes} onChange={(event) => setShowNotes(event.target.checked)} type="checkbox" /><span>Construction notes</span></label>
            </div>
            <div className={styles.studioExport}><Button className={styles.primaryAction} render={<a download href={`/plotter/downloads/${drawing.filename}`} />} size="xl">Download SVG <Arrow diagonal /></Button><p>Original geometry. Ready to edit.</p></div>
          </aside>
          <div className={styles.drawingBoard}>
            <div className={styles.drawingBoardHeader}><span>{drawing.code} / {drawing.title}</span><span>560 × 440</span></div>
            <figure className={styles.studioFigure}>
              <img alt={drawing.description} height="440" src={`/plotter/downloads/${drawing.filename}`} width="560" />
              <figcaption><strong>{drawing.title}</strong><span>{drawing.description}</span></figcaption>
            </figure>
            {showNotes && <div aria-label="Construction notes" className={styles.constructionNotes}>{drawing.notes.map((note, index) => <p key={note}><span>0{index + 1}</span>{note}</p>)}</div>}
          </div>
        </section>

        <section aria-labelledby="studio-next" className={styles.studioNext}>
          <div><p className={styles.eyebrow}>Your turn</p><h2 id="studio-next">A brief in.<br />A drawing you can build on.</h2><p>Plotter gives your agent the references, grammar, and construction rules to turn a relationship into an editable illustration.</p><Action href="/docs/installation">Set up your studio</Action></div>
          <ol className={styles.studioSteps}>
            <li><span>01</span><div><h3>Describe the relationship</h3><p>What connects, changes, fits, or goes missing? Start with the idea the drawing needs to explain.</p><Link href="/docs/drawing">Write a drawing brief <Arrow /></Link></div></li>
            <li><span>02</span><div><h3>Work from a shared language</h3><p>Choose forms, line roles, and construction marks that make the structure readable.</p><Link href="/grammar">Read the visual grammar <Arrow /></Link></div></li>
            <li><span>03</span><div><h3>Make it part of your interface</h3><p>Edit the SVG, adapt its tokens, or add motion to show how the structure changes.</p><Link href="/docs/customization">Customize a drawing <Arrow /></Link></div></li>
          </ol>
        </section>
      </main>
      <Footer />
    </PageShell>
  );
}
