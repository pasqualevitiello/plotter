import { ChevronDownIcon, DownloadIcon, FolderIcon } from "lucide-react";
import { SheetBar } from "@/components/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EngineeringMotionPreview } from "./engineering-motion-preview";
import { ProductionChainStudy } from "./engineering-studies";
import { expandedStudies } from "./expanded-studies";
import { PlotterPrompts } from "./plotter-prompts";
import { plotterDownload } from "./plotter-usage-content";
import { ProductionChainMotionDrawing } from "./production-chain-motion-drawing";

export function PlotterUsage() {
  const registration = expandedStudies.find(
    (study) => study.id === "agent-registration",
  );
  if (!registration)
    throw new Error("Plotter’s registration example is missing.");

  return (
    <section
      aria-labelledby="use-plotter-heading"
      className="scroll-mt-6"
      id="use-plotter"
    >
      <SheetBar
        id="use-plotter-heading"
        label="04.5 — Use Plotter"
        meta="One skill for still drawings and animation"
      />
      <div className="sheet-row sheet-cols">
        <div className="sheet-cell flex flex-col items-start gap-4">
          <h3 className="text-2xl leading-tight">
            Install the complete skill.
          </h3>
          <p className="max-w-[52ch] text-pretty text-muted-foreground">
            Download and unzip the package. Put the entire{" "}
            <code className="text-foreground">plotter</code> folder in your
            agent’s skills directory, keeping its files together. Start a task
            with <code className="text-foreground">/plotter</code> in Claude
            Code or <code className="text-foreground">$plotter</code> in Codex.
          </p>
          <Button
            render={
              <a download="plotter.zip" href={plotterDownload("plotter.zip")} />
            }
          >
            <DownloadIcon aria-hidden="true" />
            Download Plotter <span className="text-xs opacity-64">.zip</span>
          </Button>
          <p className="text-xs text-muted-foreground">
            Includes both workflows, seven visual references, the grammar,
            shared tokens, helpers, and examples. No coss checkout required.
          </p>
        </div>
        <div className="sheet-cell flex flex-col gap-4">
          <p className="flex items-center gap-2 text-sm font-medium">
            <FolderIcon
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
            Keep the folder intact
          </p>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-muted-foreground">{`plotter/
  SKILL.md       ← your agent starts here
  references/    ← workflows and visual grammar
  assets/        ← shared tokens and examples
  scripts/       ← generation and static export
  agents/        ← skill discovery metadata`}</pre>
          <p className="text-xs text-pretty text-muted-foreground">
            For Claude Code, use{" "}
            <code className="break-all text-foreground">
              ~/.claude/skills/plotter/
            </code>
            .
          </p>
          <p className="text-xs text-pretty text-muted-foreground">
            For Codex, the default destination is{" "}
            <code className="break-all text-foreground">
              ~/.codex/skills/plotter/
            </code>
            . If you use a custom <code>CODEX_HOME</code>, place it under that
            directory’s <code>skills/</code> folder.
          </p>
          <Collapsible className="border-t pt-2 text-sm">
            <CollapsibleTrigger className="inline-flex min-h-10 items-center gap-2 text-sm font-medium [&_svg]:transition-transform data-panel-open:[&_svg]:rotate-180">
              Use it without installing
              <ChevronDownIcon aria-hidden="true" className="size-4" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <p className="pb-1 text-pretty text-muted-foreground">
                Open the extracted folder in your coding agent. Ask it to read{" "}
                <code className="text-foreground">plotter/SKILL.md</code> from
                the parent folder, then give it your brief. Keep the linked
                references and assets accessible.
              </p>
            </CollapsiblePanel>
          </Collapsible>
        </div>
      </div>
      <PlotterPrompts
        animation={
          <EngineeringMotionPreview animated={<ProductionChainMotionDrawing />}>
            <ProductionChainStudy />
          </EngineeringMotionPreview>
        }
        drawing={registration.illustration}
      />
    </section>
  );
}
