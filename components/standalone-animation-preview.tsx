"use client";

export function StandaloneAnimationPreview() {
  return (
    <iframe
      className="h-180 w-full rounded-lg border"
      onLoad={(event) => {
        const frame = event.currentTarget;
        const document = frame.contentDocument;
        if (!document?.body) return;

        const hostStyle = getComputedStyle(frame);
        document.documentElement.style.colorScheme = hostStyle.colorScheme;
        document.documentElement.style.background = "transparent";
        document.body.style.background = "transparent";
        document.body.style.color = hostStyle.color;
      }}
      sandbox="allow-scripts allow-same-origin"
      src="/plotter/downloads/assembly-line.html"
      title="Standalone assembly-line animation"
    />
  );
}
