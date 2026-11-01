"use client";

import { ContrastIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle theme"
      className="size-11 sm:size-8"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      size="icon"
      title="Toggle theme"
      variant="ghost"
    >
      <ContrastIcon aria-hidden="true" className="size-4 -rotate-45" />
    </Button>
  );
}
