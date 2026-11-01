"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type CopyState = "idle" | "copied" | "failed";

// Feedback swaps an icon and speaks to screen readers; nothing on the page
// changes size, so copying never shifts the layout.
function useCopy() {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy(text: string, fallback?: Node | null) {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 1500);
    } catch {
      // Without clipboard access, select the text so it can be copied by hand.
      if (fallback) window.getSelection()?.selectAllChildren(fallback);
      setState("failed");
    }
  }

  return { state, copy };
}

function Status({ state, failed }: { state: CopyState; failed: string }) {
  return (
    <span aria-live="polite" className="sr-only">
      {state === "copied" ? "Copied." : state === "failed" ? failed : ""}
    </span>
  );
}

export function CopyText({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const { state, copy } = useCopy();
  return (
    <>
      <Button onClick={() => copy(text)} size="sm" variant="outline">
        {state === "copied" ? (
          <CheckIcon aria-hidden="true" />
        ) : (
          <CopyIcon aria-hidden="true" />
        )}
        {label}
      </Button>
      <Status failed="Copy failed. Download the file instead." state={state} />
    </>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  const pre = useRef<HTMLPreElement>(null);
  const { state, copy } = useCopy();
  return (
    <div className="my-6 border">
      <div className="flex items-center justify-between border-b py-1 ps-4 pe-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          Copy into your workflow
        </span>
        <Button
          aria-label={state === "copied" ? "Copied" : "Copy code"}
          onClick={() => copy(pre.current?.innerText ?? "", pre.current)}
          size="icon-sm"
          title="Copy code"
          variant="ghost"
        >
          {state === "copied" ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed" ref={pre}>
        {children}
      </pre>
      <Status
        failed="Code selected. Copy it with your keyboard."
        state={state}
      />
    </div>
  );
}
