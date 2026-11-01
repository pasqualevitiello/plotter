"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ParticlesAssemblyDrawing } from "./particles-assembly-drawing";
import styles from "./particles-motion.module.css";

export function ParticlesMotion({ children }: { children: ReactNode }) {
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
    // Native size; narrow screens scroll sideways instead of scaling.
    <div className="overflow-x-auto px-5 pt-8 pb-6">
      <div
        className={`relative mx-auto w-[560px] select-none ${styles.drawing}`}
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
          <ParticlesAssemblyDrawing />
        </div>
      </div>
    </div>
  );
}
