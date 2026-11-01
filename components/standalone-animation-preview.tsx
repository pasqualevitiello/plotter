"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

function syncFrameTheme(frame: HTMLIFrameElement) {
  const document = frame.contentDocument;
  if (!document?.body) return;

  const hostStyle = getComputedStyle(frame);
  document.documentElement.style.colorScheme = hostStyle.colorScheme;
  document.documentElement.style.background = "transparent";
  document.body.style.background = "transparent";
  document.body.style.color = hostStyle.color;
}

export function StandaloneAnimationPreview() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const animationFrame = requestAnimationFrame(() => {
      if (frameRef.current) syncFrameTheme(frameRef.current);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, [resolvedTheme]);

  return (
    <iframe
      className="h-180 w-full rounded-lg border"
      onLoad={(event) => syncFrameTheme(event.currentTarget)}
      ref={frameRef}
      sandbox="allow-scripts allow-same-origin"
      src="/plotter/downloads/assembly-line.html"
      title="Standalone assembly-line animation"
    />
  );
}
