"use client";

import { type ReactNode, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "./grammar-comparison.module.css";

export function GrammarComparison({
  title,
  children,
  caption,
}: {
  title: string;
  children: ReactNode;
  caption: string;
}) {
  const [isolated, setIsolated] = useState(false);
  const id = useId();
  const drawingId = `${id}-drawing`;
  const instructionId = `${id}-instruction`;

  return (
    <figure className="flex min-w-0 flex-col">
      <div
        aria-describedby={instructionId}
        aria-label={`${title}. ${caption}`}
        className={`${styles.drawing} sheet-art`}
        data-isolated={isolated ? "" : undefined}
        id={drawingId}
        role="img"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Native-size drawings need keyboard scrolling on narrow screens.
        tabIndex={0}
      >
        <div className="sheet-art-inner pointer-events-none select-none">
          {children}
        </div>
      </div>
      <figcaption className="mt-auto flex flex-col gap-3 border-t px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-pretty text-muted-foreground text-xs">{caption}</p>
        <Button
          aria-controls={drawingId}
          aria-pressed={isolated}
          className="shrink-0 self-start sm:self-auto"
          onClick={() => setIsolated((value) => !value)}
          size="sm"
          variant={isolated ? "secondary" : "ghost"}
        >
          Isolate element
        </Button>
      </figcaption>
      <p className="sr-only" id={instructionId}>
        Hover or focus to reveal the element. Use Isolate element to keep it
        isolated.
      </p>
    </figure>
  );
}
