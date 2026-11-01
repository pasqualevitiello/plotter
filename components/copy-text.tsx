"use client";

import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyText({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={copy}>
        {state === "copied" ? "Copied" : label}
      </Button>
      <span aria-live="polite" className="text-xs text-muted-foreground">
        {state === "failed"
          ? "Select and copy the text manually."
          : state === "copied"
            ? "Ready to paste."
            : ""}
      </span>
    </span>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  const pre = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    if (!pre.current) return;
    try {
      await navigator.clipboard.writeText(pre.current.innerText);
      setState("copied");
    } catch {
      setState("failed");
    }
  }
  return (
    <div className="my-6 rounded-lg border">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          Copy into your workflow
        </span>
        <Button size="sm" variant="ghost" onClick={copy}>
          {state === "copied" ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre ref={pre} className="overflow-x-auto p-5 text-sm leading-relaxed">
        {children}
      </pre>
      <p aria-live="polite" className="px-5 text-xs text-muted-foreground">
        {state === "failed"
          ? "Select the code and copy it manually."
          : state === "copied"
            ? "Copied to clipboard."
            : ""}
      </p>
    </div>
  );
}
