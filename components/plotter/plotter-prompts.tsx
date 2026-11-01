"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { SheetArt } from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import {
  animationPrompt,
  drawingPrompt,
  plotterDownload,
} from "./plotter-usage-content";

function Prompt({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");
  const body = useRef<HTMLParagraphElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 1500);
    } catch {
      // Without clipboard access, select the text so it can be copied by hand.
      if (body.current) window.getSelection()?.selectAllChildren(body.current);
      setStatus("selected");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label">Brief</span>
        <Button
          aria-label={status === "copied" ? "Copied" : "Copy brief"}
          onClick={copy}
          size="icon-sm"
          title="Copy brief"
          variant="ghost"
        >
          {status === "copied" ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </div>
      <p
        className="border-s-2 ps-4 leading-relaxed text-pretty whitespace-pre-wrap"
        ref={body}
      >
        {text}
      </p>
      <span aria-live="polite" className="sr-only">
        {status === "copied"
          ? "Brief copied."
          : status === "selected"
            ? "Brief selected. Copy it with your keyboard."
            : ""}
      </span>
    </div>
  );
}

function Example({
  code,
  title,
  note,
  label,
  children,
}: {
  code: string;
  title: string;
  note: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <figure className="flex h-full min-w-0 flex-col">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          {label ? <SheetArt label={label}>{children}</SheetArt> : children}
        </div>
      </div>
      <figcaption>
        <div className="sheet-caption">
          <span className="mono-label">{code}</span>
          <span>{title}</span>
        </div>
        <p className="sheet-caption-description">{note}</p>
      </figcaption>
    </figure>
  );
}

function Brief({
  title,
  intro,
  prompt,
  footer,
}: {
  title: string;
  intro: ReactNode;
  prompt: string;
  footer: ReactNode;
}) {
  return (
    <div className="sheet-cell flex flex-col gap-4">
      <h3 className="text-2xl leading-tight">{title}</h3>
      <p className="max-w-[52ch] text-pretty text-muted-foreground">{intro}</p>
      <div className="mt-2">
        <Prompt text={prompt} />
      </div>
      <p className="mt-auto pt-4 text-sm text-muted-foreground">{footer}</p>
    </div>
  );
}

export function PlotterPrompts({
  drawing,
  animation,
}: {
  drawing: ReactNode;
  animation: ReactNode;
}) {
  return (
    <Tabs
      className="scroll-mt-6 gap-0"
      defaultValue="drawing"
      id="plotter-outputs"
    >
      <div className="sheet-bar">
        <h3 className="mono-label text-foreground">
          Then choose a workflow and copy a brief
        </h3>
        <div className="items-end py-0!">
          <TabsList aria-label="Choose a Plotter workflow" variant="underline">
            <TabsTab value="drawing">Draw an illustration</TabsTab>
            <TabsTab value="animation">Animate a drawing</TabsTab>
          </TabsList>
        </div>
      </div>
      <TabsPanel className="sheet-row sheet-cols" value="drawing">
        <Brief
          footer={
            <>
              Looking for a direction? Browse the{" "}
              <a className="underline underline-offset-4" href="/illustrations">
                illustrations
              </a>
              , then use the{" "}
              <a className="underline underline-offset-4" href="/grammar">
                visual grammar
              </a>{" "}
              to choose supporting marks.
            </>
          }
          intro={
            <>
              Give your agent a subject, a placement, and an output format.
              Plotter supplies the construction references and drawing workflow.
              In Codex, start the brief with{" "}
              <code className="text-foreground">$plotter</code> instead.
            </>
          }
          prompt={drawingPrompt}
          title="Start with one relationship."
        />
        <Example
          code="AGT-01"
          label="AGT-01: Agent registration, editable SVG example"
          note="The kind of editable SVG this brief returns: paths and labels you can change."
          title="Agent registration"
        >
          {drawing}
        </Example>
      </TabsPanel>
      <TabsPanel className="sheet-row sheet-cols" value="animation">
        <Brief
          footer={
            <>
              One skill, a separate motion workflow. See more{" "}
              <a className="underline underline-offset-4" href="/animations">
                animations
              </a>
              .
            </>
          }
          intro={
            <>
              Start from an editable still.{" "}
              <a
                className="text-foreground underline underline-offset-4"
                download="production-chain.svg"
                href={plotterDownload("production-chain.svg")}
              >
                Download the assembly-line SVG
              </a>{" "}
              and attach it with this brief. In Codex, start with{" "}
              <code className="text-foreground">$plotter</code> instead.
            </>
          }
          prompt={animationPrompt}
          title="Give the drawing a reason to move."
        />
        <Example
          code="MEC-05"
          note="The kind of result this brief returns: editable SVG with its own player."
          title="An assembly line"
        >
          {animation}
        </Example>
      </TabsPanel>
    </Tabs>
  );
}
