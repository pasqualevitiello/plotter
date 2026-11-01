"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MissingDestinationBlueprint } from "./missing-destination";
import styles from "./not-found-motion.module.css";

export function NotFoundMotion() {
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
          <MissingDestinationBlueprint />
        </div>
        <div
          className={`pointer-events-none absolute inset-0 ${styles.animation}`}
          ref={animation}
        >
          <MissingDestinationBlueprint animated />
        </div>
      </div>
    </div>
  );
}
