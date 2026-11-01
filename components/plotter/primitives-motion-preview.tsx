"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PrimitivesMorph } from "./primitives-morph";
import styles from "./primitives-motion.module.css";

export function PrimitivesMotionPreview({ children }: { children: ReactNode }) {
  const drawing = useRef<HTMLDivElement>(null);
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
        {!reducedMotion && (
          <div className="pointer-events-none">
            <PrimitivesMorph paused={!inView} />
          </div>
        )}
      </div>
    </div>
  );
}
