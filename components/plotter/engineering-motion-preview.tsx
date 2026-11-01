"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import styles from "./engineering-motion-preview.module.css";

export function EngineeringMotionPreview({
  animated,
  children,
}: {
  animated: ReactNode;
  children: ReactNode;
}) {
  const drawing = useRef<HTMLDivElement>(null);
  const animation = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!drawing.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setInView(entry.isIntersecting);
    });
    observer.observe(drawing.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = animation.current?.querySelector("svg");
    if (!svg) return;
    if (reducedMotion || !inView) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [reducedMotion, inView]);

  return (
    <div className="sheet-art">
      <div
        className={`sheet-art-inner relative select-none ${styles.drawing}`}
        data-live={!reducedMotion || undefined}
        ref={drawing}
      >
        <div className={`pointer-events-none ${styles.original}`}>
          {children}
        </div>
        <div
          className={`pointer-events-none absolute inset-0 ${styles.animation}`}
          ref={animation}
        >
          {animated}
        </div>
      </div>
    </div>
  );
}
