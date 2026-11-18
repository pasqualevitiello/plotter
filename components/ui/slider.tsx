"use client";

/**
 * Adapted from DialKit's Slider (MIT, Copyright (c) 2026 Josh Puckett).
 * https://github.com/joshpuckett/dialkit
 */

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";
import { cn } from "@/lib/utils";

const LABEL_OFFSET = 10;
const VALUE_OFFSET = 12;
const HANDLE_BUFFER = 8;
const HANDLE_INSET = 7.5;
const MIN_HANDLE_CENTER = 6.5;
const HOVER_EDIT_DELAY = 800;
const DECILE_SNAP_THRESHOLD = 0.03125;

const HANDLE_OPACITY = {
  idle: 0,
  dodge: 0.1,
  hover: 0.5,
  drag: 0.9,
} as const;

type DodgeThresholds = {
  left: number;
  right: number;
};

const DEFAULT_DODGE_THRESHOLDS: DodgeThresholds = {
  left: 30,
  right: 78,
};

type SliderProps = Omit<
  SliderPrimitive.Root.Props<number>,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "onValueCommitted"
  | "orientation"
  | "thumbAlignment"
> & {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  formatValue?: (value: number) => string;
  unit?: string;
  snapOnClick?: boolean;
  className?: string;
};

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function isEndpoint(value: number, min: number, max: number) {
  return value === min || value === max;
}

function isUsableStep(step: number) {
  return Number.isFinite(step) && step > 0;
}

/** Decimal places needed by a step or range endpoint, including scientific notation. */
function decimalsForStep(step: number, min: number, max: number) {
  return Math.min(
    100,
    Math.max(
      ...[step, min, max].map((value) => {
        const [coefficient, exponent = "0"] = String(value)
          .toLowerCase()
          .split("e");
        return Math.max(
          0,
          (coefficient.split(".")[1]?.length ?? 0) - Number(exponent),
        );
      }),
    ),
  );
}

/** Snap relative to the minimum and keep exact endpoints reachable. */
function roundValue(value: number, step: number, min: number, max: number) {
  const clamped = clampValue(value, min, max);
  if (isEndpoint(clamped, min, max) || !isUsableStep(step)) return clamped;

  const snapped = min + Math.round((clamped - min) / step) * step;
  return clampValue(Number(snapped.toPrecision(14)), min, max);
}

/** Clicking a continuous slider pulls to the nearest tenth of the range. */
function snapToDecile(value: number, min: number, max: number) {
  const range = max - min;
  if (range <= 0) return min;

  const normalized = (value - min) / range;
  const nearest = Math.round(normalized * 10) / 10;
  return Math.abs(normalized - nearest) <= DECILE_SNAP_THRESHOLD
    ? min + nearest * range
    : value;
}

function hashMarkPercents(min: number, max: number, step: number) {
  const range = max - min;
  if (range <= 0) return [];

  const stepCount = range / step;
  if (stepCount > 0 && stepCount <= 10) {
    return Array.from(
      { length: Math.max(0, Math.floor(stepCount) - 1) },
      (_, index) => ((index + 1) * step * 100) / range,
    );
  }

  return Array.from({ length: 9 }, (_, index) => (index + 1) * 10);
}

function resolveDodgeThresholds(
  width: number,
  labelWidth: number,
  valueWidth: number,
): DodgeThresholds {
  return {
    left: ((LABEL_OFFSET + labelWidth + HANDLE_BUFFER) / width) * 100,
    right: ((width - VALUE_OFFSET - valueWidth - HANDLE_BUFFER) / width) * 100,
  };
}

function thresholdsAreEqual(a: DodgeThresholds, b: DodgeThresholds) {
  return Math.abs(a.left - b.left) < 0.1 && Math.abs(a.right - b.right) < 0.1;
}

function getElementWidth(element: HTMLElement | null) {
  return element?.offsetWidth ?? 0;
}

function getPercentage(value: number, min: number, max: number) {
  const range = max - min;
  return range > 0 ? ((value - min) / range) * 100 : 0;
}

function isDodged(percentage: number, thresholds: DodgeThresholds) {
  return percentage < thresholds.left || percentage > thresholds.right;
}

/** DialKit pulls the handle slightly ahead of the fill edge. */
function resolveHandleShift(fillEdge: number, trackWidth: number) {
  if (trackWidth <= 0) return 0;

  const maxCenter = Math.max(MIN_HANDLE_CENTER, trackWidth - HANDLE_INSET);
  const desiredCenter = Math.min(
    Math.max(fillEdge - HANDLE_INSET, MIN_HANDLE_CENTER),
    maxCenter,
  );
  return desiredCenter - fillEdge;
}

function resolveHandleOpacity(
  active: boolean,
  dodge: boolean,
  dragging: boolean,
) {
  if (!active) return HANDLE_OPACITY.idle;
  if (dodge) return HANDLE_OPACITY.dodge;
  return dragging ? HANDLE_OPACITY.drag : HANDLE_OPACITY.hover;
}

function isSliderActive(state: {
  hovered: boolean;
  dragging: boolean;
  focused: boolean;
  editing: boolean;
}) {
  return state.hovered || state.dragging || state.focused || state.editing;
}

function formatSliderValue(
  value: number,
  decimals: number,
  formatValue?: (value: number) => string,
) {
  return formatValue ? formatValue(value) : value.toFixed(decimals);
}

function resolveStep(step: number) {
  return step > 0 ? step : 1;
}

function resolveLargeStep(largeStep: number | undefined, step: number) {
  return largeStep ?? step * 10;
}

function resolveCurrentValue(
  isControlled: boolean,
  value: number | undefined,
  uncontrolledValue: number,
  min: number,
  max: number,
) {
  const nextValue =
    isControlled && value !== undefined ? value : uncontrolledValue;
  return clampValue(nextValue, min, max);
}

function getFillTone(active: boolean, focused: boolean) {
  return active || focused ? "bg-foreground/15" : "bg-foreground/[0.11]";
}

function getHandleTone(active: boolean, dodge: boolean) {
  return cn(
    "h-5 w-[3px] rounded-full bg-foreground transition-[opacity,scale] duration-200",
    active ? "scale-x-100" : "scale-x-[0.25]",
    dodge && "scale-y-75",
  );
}

function getValueTone(
  active: boolean,
  focused: boolean,
  valueEditable: boolean,
) {
  return cn(
    "absolute top-1/2 right-3 z-20 -translate-y-1/2 border-b border-transparent pb-px font-mono text-[13px] leading-none font-medium tabular-nums transition-colors duration-150",
    active || focused ? "text-foreground" : "text-foreground/70",
    valueEditable && "cursor-text border-foreground/70",
  );
}

function resolveSnappedValue(
  value: number,
  reason: string,
  options: {
    min: number;
    max: number;
    step: number;
    snapOnClick: boolean;
  },
) {
  if (reason !== "track-press" || !options.snapOnClick) return value;

  const discreteSteps = (options.max - options.min) / options.step;
  const snapped =
    discreteSteps <= 10
      ? roundValue(value, options.step, options.min, options.max)
      : snapToDecile(value, options.min, options.max);

  return roundValue(snapped, options.step, options.min, options.max);
}

function commitDraft(
  draft: string,
  step: number,
  min: number,
  max: number,
  onCommit: (value: number) => void,
) {
  const parsed = Number.parseFloat(draft);
  if (!Number.isFinite(parsed)) return;
  onCommit(roundValue(parsed, step, min, max));
}

function hasCommandModifier(event: React.KeyboardEvent<HTMLInputElement>) {
  return event.altKey || event.ctrlKey || event.metaKey;
}

function isPlainEnter(event: React.KeyboardEvent<HTMLInputElement>) {
  return event.key === "Enter" && !hasCommandModifier(event);
}

function SliderHashMarks({
  percentages,
  active,
}: {
  percentages: number[];
  active: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      data-slot="slider-hashmarks"
      className="pointer-events-none absolute inset-0"
    >
      {percentages.map((percentage) => (
        <span
          key={percentage}
          data-slot="slider-hashmark"
          className={cn(
            "absolute top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/15 transition-opacity duration-200",
            active ? "opacity-100" : "opacity-0",
          )}
          style={{ left: `${percentage}%` }}
        />
      ))}
    </div>
  );
}

/** Measures the track and the text overlays, then keeps both in sync. */
function useTrackMeasurements({
  rootRef,
  labelRef,
  valueRef,
  editing,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  labelRef: React.RefObject<HTMLDivElement | null>;
  valueRef: React.RefObject<HTMLButtonElement | null>;
  editing: boolean;
}) {
  const [trackWidth, setTrackWidth] = React.useState(0);
  const [dodgeThresholds, setDodgeThresholds] = React.useState<DodgeThresholds>(
    DEFAULT_DODGE_THRESHOLDS,
  );

  // The value element is swapped while editing, so the observer must reattach.
  // biome-ignore lint/correctness/useExhaustiveDependencies: editing controls which element the observer watches.
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const width = root.offsetWidth;
      if (!width) return;

      const nextThresholds = resolveDodgeThresholds(
        width,
        getElementWidth(labelRef.current),
        getElementWidth(valueRef.current),
      );

      setTrackWidth((previous) =>
        Math.abs(previous - width) < 0.1 ? previous : width,
      );
      setDodgeThresholds((previous) =>
        thresholdsAreEqual(previous, nextThresholds)
          ? previous
          : nextThresholds,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);

    for (const element of [labelRef.current, valueRef.current]) {
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [rootRef, labelRef, valueRef, editing]);

  return { trackWidth, dodgeThresholds };
}

/** Handles the hover-to-edit value, its text input, and the Enter shortcut. */
function useValueEditing({
  value,
  decimals,
  min,
  max,
  step,
  disabled,
  onCommit,
  thumbInputRef,
}: {
  value: number;
  decimals: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean | undefined;
  onCommit: (value: number) => void;
  thumbInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [valueHovered, setValueHovered] = React.useState(false);
  const [valueEditable, setValueEditable] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const editorRef = React.useRef<HTMLInputElement>(null);
  const editingRef = React.useRef(false);

  React.useEffect(() => {
    if (!valueHovered || editing) return;
    const timeout = window.setTimeout(
      () => setValueEditable(true),
      HOVER_EDIT_DELAY,
    );
    return () => window.clearTimeout(timeout);
  }, [valueHovered, editing]);

  React.useEffect(() => {
    if (!editing) return;
    editorRef.current?.focus();
    editorRef.current?.select();
  }, [editing]);

  const beginEditing = () => {
    if (disabled) return;
    editingRef.current = true;
    setDraft(value.toFixed(decimals));
    setEditing(true);
  };

  const finishEditing = (commit: boolean, restoreFocus = false) => {
    if (!editingRef.current) return;
    editingRef.current = false;

    if (commit) commitDraft(draft, step, min, max, onCommit);

    setEditing(false);
    setValueHovered(false);
    setValueEditable(false);

    if (restoreFocus) {
      queueMicrotask(() =>
        thumbInputRef.current?.focus({ preventScroll: true }),
      );
    }
  };

  const handleValueClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!valueEditable) return;
    event.preventDefault();
    event.stopPropagation();
    beginEditing();
  };

  const handleValuePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (valueEditable) event.stopPropagation();
  };

  const handleValuePointerEnter = () => setValueHovered(true);

  const handleValuePointerLeave = () => {
    setValueHovered(false);
    setValueEditable(false);
  };

  const handleThumbKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPlainEnter(event)) return;
    event.preventDefault();
    event.stopPropagation();
    beginEditing();
  };

  const handleDraftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value);
  };

  const handleEditorKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      finishEditing(true, true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      finishEditing(false, true);
    }
  };

  const handleEditorBlur = () => finishEditing(true);

  return {
    editing,
    draft,
    editorRef,
    valueEditable,
    handleValueClick,
    handleValuePointerDown,
    handleValuePointerEnter,
    handleValuePointerLeave,
    handleThumbKeyDown,
    handleDraftChange,
    handleEditorKeyDown,
    handleEditorBlur,
  };
}

function SliderValue({
  label,
  displayValue,
  valueRef,
  active,
  focused,
  editing,
  draft,
  editorRef,
  valueEditable,
  onValueClick,
  onValuePointerDown,
  onValuePointerEnter,
  onValuePointerLeave,
  onDraftChange,
  onEditorKeyDown,
  onEditorBlur,
}: {
  label: string;
  displayValue: string;
  valueRef: React.RefObject<HTMLButtonElement | null>;
  active: boolean;
  focused: boolean;
  editing: boolean;
  draft: string;
  editorRef: React.RefObject<HTMLInputElement | null>;
  valueEditable: boolean;
  onValueClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onValuePointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onValuePointerEnter: () => void;
  onValuePointerLeave: () => void;
  onDraftChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditorKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditorBlur: () => void;
}) {
  if (editing) {
    return (
      <input
        ref={editorRef}
        type="text"
        inputMode="decimal"
        aria-label={`${label} value`}
        data-slot="slider-input"
        value={draft}
        onChange={onDraftChange}
        onKeyDown={onEditorKeyDown}
        onBlur={onEditorBlur}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        className="absolute top-1/2 right-3 z-20 w-[5ch] min-w-[3ch] -translate-y-1/2 border-b border-foreground/70 bg-transparent pb-px text-right font-mono text-[13px] font-medium text-foreground tabular-nums outline-none"
      />
    );
  }

  return (
    <button
      ref={valueRef}
      data-slot="slider-value"
      onPointerEnter={onValuePointerEnter}
      onPointerLeave={onValuePointerLeave}
      onClick={onValueClick}
      onPointerDown={onValuePointerDown}
      tabIndex={-1}
      type="button"
      className={getValueTone(active, focused, valueEditable)}
    >
      {displayValue}
    </button>
  );
}

function Slider({
  label,
  value,
  defaultValue,
  onValueChange,
  formatValue,
  unit,
  snapOnClick = true,
  min = 0,
  max = 100,
  step = 1,
  largeStep,
  disabled,
  className,
  ...props
}: SliderProps) {
  const safeStep = resolveStep(step);
  const decimals = decimalsForStep(safeStep, min, max);

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    clampValue(defaultValue ?? min, min, max),
  );
  const currentValue = resolveCurrentValue(
    isControlled,
    value,
    uncontrolledValue,
    min,
    max,
  );

  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const valueRef = React.useRef<HTMLButtonElement>(null);
  const thumbInputRef = React.useRef<HTMLInputElement>(null);

  const setCurrentValue = (nextValue: number) => {
    if (!isControlled) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  const {
    editing,
    draft,
    editorRef,
    valueEditable,
    handleValueClick,
    handleValuePointerDown,
    handleValuePointerEnter,
    handleValuePointerLeave,
    handleThumbKeyDown,
    handleDraftChange,
    handleEditorKeyDown,
    handleEditorBlur,
  } = useValueEditing({
    value: currentValue,
    decimals,
    min,
    max,
    step: safeStep,
    disabled,
    onCommit: setCurrentValue,
    thumbInputRef,
  });
  const { trackWidth, dodgeThresholds } = useTrackMeasurements({
    rootRef,
    labelRef,
    valueRef,
    editing,
  });

  const active = isSliderActive({
    hovered,
    dragging,
    focused,
    editing,
  });
  const displayValue = formatSliderValue(currentValue, decimals, formatValue);
  const percentage = getPercentage(currentValue, min, max);
  const fillEdge = (percentage / 100) * trackWidth;
  const handleShift = resolveHandleShift(fillEdge, trackWidth);
  const dodge = isDodged(percentage, dodgeThresholds);
  const handleOpacity = resolveHandleOpacity(active, dodge, dragging);
  const marks = hashMarkPercents(min, max, safeStep);

  const handleValueChange = (
    nextValue: number,
    details: SliderPrimitive.Root.ChangeEventDetails,
  ) => {
    if (details.reason === "drag") setDragging(true);
    setCurrentValue(nextValue);
  };

  const handleValueCommitted = (
    nextValue: number,
    details: SliderPrimitive.Root.CommitEventDetails,
  ) => {
    setDragging(false);
    const snappedValue = resolveSnappedValue(nextValue, details.reason, {
      min,
      max,
      step: safeStep,
      snapOnClick,
    });
    if (snappedValue !== nextValue) setCurrentValue(snappedValue);
  };

  return (
    <SliderPrimitive.Root
      {...props}
      ref={rootRef}
      value={currentValue}
      min={min}
      max={max}
      step={safeStep}
      largeStep={resolveLargeStep(largeStep, safeStep)}
      disabled={disabled}
      data-slot="slider"
      className={cn(
        "group relative w-full text-foreground select-none",
        className,
      )}
      onValueChange={handleValueChange}
      onValueCommitted={handleValueCommitted}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <SliderPrimitive.Control className="relative flex h-9 w-full touch-none items-center select-none">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative h-9 w-full overflow-hidden rounded-lg bg-foreground/5",
            "group-has-[input:focus-visible]:ring-2 group-has-[input:focus-visible]:ring-foreground/60 group-has-[input:focus-visible]:ring-inset",
          )}
        >
          <SliderHashMarks percentages={marks} active={active} />

          <SliderPrimitive.Indicator
            data-slot="slider-fill"
            className={cn(
              "h-full transition-[width,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[dragging]:transition-none",
              getFillTone(active, focused),
            )}
          />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb
          index={0}
          inputRef={thumbInputRef}
          data-slot="slider-thumb"
          getAriaLabel={() => label}
          getAriaValueText={() =>
            unit ? `${displayValue} ${unit}` : displayValue
          }
          onFocus={(event) =>
            setFocused(event.currentTarget.matches(":focus-visible"))
          }
          onBlur={() => setFocused(false)}
          onKeyDown={handleThumbKeyDown}
          className="absolute flex h-5 w-5 items-center justify-center transition-[inset-inline-start] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none group-data-[dragging]:transition-none"
        >
          <span
            aria-hidden="true"
            data-slot="slider-handle"
            className={getHandleTone(active, dodge)}
            style={{ opacity: handleOpacity, translate: `${handleShift}px 0` }}
          />
        </SliderPrimitive.Thumb>

        <SliderPrimitive.Label
          ref={labelRef}
          data-slot="slider-label"
          className="pointer-events-none absolute top-1/2 left-2.5 z-20 -translate-y-1/2 text-[13px] leading-none font-medium text-foreground/70"
        >
          {label}
        </SliderPrimitive.Label>

        <SliderValue
          label={label}
          displayValue={displayValue}
          valueRef={valueRef}
          active={active}
          focused={focused}
          editing={editing}
          draft={draft}
          editorRef={editorRef}
          valueEditable={valueEditable}
          onValueClick={handleValueClick}
          onValuePointerDown={handleValuePointerDown}
          onValuePointerEnter={handleValuePointerEnter}
          onValuePointerLeave={handleValuePointerLeave}
          onDraftChange={handleDraftChange}
          onEditorKeyDown={handleEditorKeyDown}
          onEditorBlur={handleEditorBlur}
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export type { SliderProps };
export { Slider };
