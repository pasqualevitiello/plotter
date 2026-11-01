"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DrawingFigure } from "@/components/sheet";
import type { IllustrationStudy } from "./study-types";

export function IllustrationGallery({
  illustrations,
  retired,
}: {
  illustrations: IllustrationStudy[];
  retired: Record<string, string>;
}) {
  const variant = useSearchParams().get("variant");
  const target = variant ? (retired[variant] ?? variant) : null;

  // Preview links locate their drawing; retired IDs land on their replacement.
  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView();
  }, [target]);

  return (
    <ul aria-label="All illustrations" className="sheet-row sheet-cols">
      {illustrations.map((item) => (
        <li className="min-w-0 scroll-mt-6" id={item.id} key={item.id}>
          <DrawingFigure
            code={item.code}
            description={item.description}
            title={item.title}
          >
            {item.illustration}
          </DrawingFigure>
        </li>
      ))}
    </ul>
  );
}
