"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Archive } from "./archive";
import { Manual } from "./manual";
import { Studio } from "./studio";
import "./picker.css";

const variants = [
  { name: "Manual", component: Manual },
  { name: "Archive", component: Archive },
  { name: "Studio", component: Studio },
];

export function PrototypeHarness({ initialVariant }: { initialVariant: number }) {
  const [current, setCurrent] = useState(initialVariant);
  const [mountKey, setMountKey] = useState(0);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = useCallback((index: number) => {
    if (index < 0 || index >= variants.length) return;
    setCurrent(index);
    setMountKey((key) => key + 1);
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      const url = new URL(window.location.href);
      url.searchParams.set("v", String(index + 1));
      window.history.replaceState(null, "", url);
    }
  }, []);

  useLayoutEffect(() => {
    function moveHighlight() {
      const item = itemRefs.current[current];
      const highlight = highlightRef.current;
      if (!item || !highlight) return;
      highlight.style.width = `${item.offsetWidth}px`;
      highlight.style.transform = `translateX(${item.offsetLeft}px)`;
    }
    moveHighlight();
    window.addEventListener("resize", moveHighlight);
    return () => window.removeEventListener("resize", moveHighlight);
  }, [current]);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", ""));
    });
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame); };
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches("input, textarea, select") || target.isContentEditable)) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const number = Number(event.key);
      if (number >= 1 && number <= variants.length) { event.preventDefault(); select(number - 1); }
      else if (event.key === "ArrowRight") { event.preventDefault(); select((current + 1) % variants.length); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); select((current - 1 + variants.length) % variants.length); }
      else if (event.key.toLowerCase() === "r") { event.preventDefault(); setMountKey((key) => key + 1); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [current, select]);

  useEffect(() => {
    function restoreSelection() {
      const value = Number(new URLSearchParams(window.location.search).get("v"));
      setCurrent(Number.isInteger(value) && value >= 1 && value <= variants.length ? value - 1 : 0);
      setMountKey((key) => key + 1);
    }
    window.addEventListener("popstate", restoreSelection);
    return () => window.removeEventListener("popstate", restoreSelection);
  }, []);

  const Variant = variants[current].component;

  return (
    <>
      <Variant key={`${current}-${mountKey}`} />
      <nav aria-label="Prototype variants" className="proto-picker" ref={pickerRef}>
        <span aria-hidden="true" className="proto-picker-highlight" ref={highlightRef} />
        {variants.map((variant, index) => (
          <button aria-current={current === index ? "true" : undefined} className="proto-picker-item" data-active={current === index ? "" : undefined} key={variant.name} onClick={() => select(index)} ref={(element) => { itemRefs.current[index] = element; }} type="button">{variant.name}</button>
        ))}
      </nav>
    </>
  );
}
