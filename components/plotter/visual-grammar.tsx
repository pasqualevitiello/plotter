import { SheetBar } from "@/components/sheet";
import { GrammarComparison } from "./grammar-comparison";
import { visualGrammarEntries } from "./visual-grammar-content";
import { visualGrammarDrawings } from "./visual-grammar-drawings";

export function VisualGrammar() {
  return (
    <section
      aria-labelledby="visual-grammar-heading"
      className="scroll-mt-6"
      id="visual-grammar"
    >
      <SheetBar
        id="visual-grammar-heading"
        label="03.1 — Glossary"
        meta={`${visualGrammarEntries.length} marks`}
      />
      <div className="sheet-row sheet-cols">
        <div className="sheet-cell flex flex-col gap-3">
          <p className="max-w-[56ch] text-pretty text-muted-foreground">
            What each mark means, when it helps, and when to leave it out. Hover
            over a drawing to isolate the marks being explained, then move away
            to see the whole construction.
          </p>
          <p className="max-w-[56ch] text-pretty text-muted-foreground">
            Use these meanings in{" "}
            <a
              className="text-foreground underline underline-offset-4"
              href="/docs"
            >
              your own brief
            </a>
            , or explore{" "}
            <a
              className="text-foreground underline underline-offset-4"
              href="/docs/customization"
            >
              the shared linework tokens
            </a>
            .
          </p>
        </div>
        <nav aria-label="Visual grammar topics" className="sheet-cell">
          <ol className="grid gap-x-8 sm:grid-cols-2">
            {visualGrammarEntries.map((entry, index) => (
              <li key={entry.id}>
                <a
                  className="flex min-h-10 items-baseline gap-3 text-sm hover:underline hover:underline-offset-4"
                  href={`#grammar-${entry.id}`}
                >
                  <span className="mono-label">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {entry.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {visualGrammarEntries.map((entry, index) => (
        <article
          aria-labelledby={`grammar-${entry.id}-heading`}
          className="sheet-row sheet-cols scroll-mt-6"
          id={`grammar-${entry.id}`}
          key={entry.id}
        >
          <div className="sheet-cell flex flex-col justify-center gap-3">
            <p className="mono-label">
              Mark {String(index + 1).padStart(2, "0")}
            </p>
            <h3
              className="mt-3 text-2xl leading-tight"
              id={`grammar-${entry.id}-heading`}
            >
              {entry.title}
            </h3>
            <p className="max-w-[52ch] text-pretty text-muted-foreground">
              {entry.description}
            </p>
            <p className="max-w-[52ch] text-pretty text-muted-foreground text-sm">
              {entry.omit}
            </p>
          </div>
          <GrammarComparison caption={entry.caption} title={entry.title}>
            {visualGrammarDrawings[entry.id]}
          </GrammarComparison>
        </article>
      ))}
    </section>
  );
}
