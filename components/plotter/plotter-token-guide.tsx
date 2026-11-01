"use client";

import { CheckIcon, ChevronDownIcon, CopyIcon } from "lucide-react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Slider, SliderValue } from "@/components/ui/slider";
import {
  highlightOpacity,
  roleCss,
} from "../../skills/plotter/assets/foundation/index.mjs";
import standard from "../../skills/plotter/assets/foundation/standard.json";

type ControlToken = keyof typeof standard.tokens;
type Values = Record<ControlToken, number>;

const controls = {
  "--plotter-stroke-primary": {
    label: "Primary stroke",
    hint: "Main outlines of the carriers and cores.",
  },
  "--plotter-stroke-secondary": {
    label: "Secondary stroke",
    hint: "Details, dimensions, arrows, and hidden edges.",
  },
  "--plotter-stroke-guide": {
    label: "Guide stroke",
    hint: "Alignment lines, axes, and grid lines.",
  },
  "--plotter-stroke-hatch": {
    label: "Hatch stroke",
    hint: "Diagonal lines inside the core faces.",
  },
  "--plotter-stroke-section": {
    label: "Section stroke",
    hint: "The separate section-cut sample below the drawing.",
  },
  "--plotter-opacity-primary": {
    label: "Primary opacity",
    hint: "Main forms and any marks grouped inside them.",
  },
  "--plotter-opacity-secondary": {
    label: "Secondary opacity",
    hint: "Rollers, dimensions, and transfer arrows.",
  },
  "--plotter-opacity-guide": {
    label: "Guide opacity",
    hint: "Alignment and extension lines.",
  },
  "--plotter-opacity-grid": {
    label: "Grid opacity",
    hint: "The repeated construction grid.",
  },
  "--plotter-opacity-hatch": {
    label: "Hatch opacity",
    hint: "Hatching within the primary forms.",
  },
  "--plotter-opacity-highlight": {
    label: "Highlight opacity",
    hint: "The selected region in the sample below the drawing.",
  },
  "--plotter-opacity-hidden": {
    label: "Hidden opacity",
    hint: "The dashed edge below the incoming core.",
  },
} satisfies Record<ControlToken, { label: string; hint: string }>;

const defaults = standard.tokens;
const tokens = Object.keys(defaults) as ControlToken[];
const groups = [
  { label: "Stroke widths", prefix: "--plotter-stroke-" },
  { label: "Opacity", prefix: "--plotter-opacity-" },
];

export function PlotterTokenGuide({ children }: { children: ReactNode }) {
  const id = useId();
  const cssRef = useRef<HTMLTextAreaElement>(null);
  const [values, setValues] = useState<Values>(defaults);
  const [inkInput, setInkInput] = useState("currentColor");
  const [ink, setInk] = useState("currentColor");
  const [inkError, setInkError] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">(
    "idle",
  );
  const css = `.illustration {\n  --plotter-ink: ${ink};\n${tokens
    .map((token) => `  ${token}: ${values[token]};`)
    .join("\n")}\n}`;
  const previewStyle: CSSProperties & Values & { "--plotter-ink": string } = {
    ...values,
    "--plotter-ink": ink,
  };

  function updateInk(value: string) {
    setInkInput(value);
    const valid = CSS.supports("color", value.trim());
    if (valid) setInk(value.trim());
    if (valid || inkError) setInkError(!valid);
    setCopyState("idle");
  }

  useEffect(() => {
    if (copyState !== "copied") return;
    const timeout = window.setTimeout(() => setCopyState("idle"), 1600);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  async function copyCss() {
    try {
      await navigator.clipboard.writeText(css);
      setCopyState("copied");
    } catch {
      cssRef.current?.focus();
      cssRef.current?.select();
      setCopyState("manual");
    }
  }

  return (
    <section
      aria-labelledby="plotter-tokens-heading"
      className="sheet-row sheet-cell scroll-mt-6"
      id="plotter-tokens"
    >
      <div className="mb-8 flex max-w-2xl flex-col gap-3">
        <h2
          className="font-heading text-2xl font-medium [font-variation-settings:'GEOM'_50]"
          id="plotter-tokens-heading"
        >
          Make it fit your page
        </h2>
        <p className="text-sm text-pretty text-muted-foreground">
          Adjust ink, stroke widths, and opacity without changing the drawing.
          Try every token on MEC-05 and the samples below it, then copy the CSS
          to a wrapper around your inline SVG.
        </p>
      </div>

      <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] xl:items-start xl:gap-12">
        <div className="flex min-w-0 flex-col gap-8">
          <Field invalid={inkError}>
            <FieldLabel>Ink</FieldLabel>
            <Input
              autoComplete="off"
              className="font-mono max-sm:text-base"
              data-1p-ignore="true"
              onBlur={() =>
                setInkError(!CSS.supports("color", inkInput.trim()))
              }
              onValueChange={updateInk}
              spellCheck={false}
              type="text"
              value={inkInput}
            />
            <FieldDescription>
              Use currentColor to follow your theme, or a CSS color such as
              #2563eb or var(--foreground).
            </FieldDescription>
            <FieldError match={inkError}>
              Enter a valid CSS color. The preview keeps the last valid value.
            </FieldError>
          </Field>

          {groups.map(({ label: groupLabel, prefix }) => (
            <fieldset className="min-w-0" key={prefix}>
              <legend className="mb-5 text-sm font-medium">{groupLabel}</legend>
              <div className="grid min-w-0 gap-x-8 gap-y-6 sm:grid-cols-2">
                {tokens
                  .filter((token) => token.startsWith(prefix))
                  .map((token) => {
                    const { label, hint } = controls[token];
                    const max = token.startsWith("--plotter-opacity-")
                      ? 1
                      : defaults[token] * 2;
                    return (
                      <Field className="min-w-0" key={token}>
                        <Slider
                          format={{
                            minimumFractionDigits: 2,
                            maximumFractionDigits:
                              token === "--plotter-opacity-highlight" ? 3 : 2,
                          }}
                          largeStep={0.1}
                          max={max}
                          min={0}
                          onValueChange={(value) => {
                            setValues((current) => ({
                              ...current,
                              [token]:
                                typeof value === "number" ? value : value[0],
                            }));
                            setCopyState("idle");
                          }}
                          step={
                            token === "--plotter-opacity-highlight"
                              ? 0.005
                              : 0.01
                          }
                          value={values[token]}
                        >
                          <div className="mb-3 flex items-baseline justify-between gap-4">
                            <FieldLabel>{label}</FieldLabel>
                            <SliderValue className="font-mono text-xs text-muted-foreground tabular-nums" />
                          </div>
                        </Slider>
                        <FieldDescription className="mt-1">
                          {hint}
                        </FieldDescription>
                      </Field>
                    );
                  })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <figure className="min-w-0">
            <div
              aria-label="Assembly line, section cut, and region highlight with adjustable drawing tokens"
              className="overflow-x-auto border p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              role="img"
              style={previewStyle}
              // biome-ignore lint/a11y/noNoninteractiveTabindex: Native-size drawings need keyboard scrolling on narrow screens.
              tabIndex={0}
            >
              <div className="pointer-events-none mx-auto w-[560px] select-none">
                {children}
                <svg
                  aria-hidden="true"
                  className="block h-28 w-[560px] text-foreground"
                  data-plotter=""
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 560 112"
                >
                  <style data-plotter-styles="true">{roleCss}</style>
                  <text
                    x="16"
                    y="28"
                    fill="currentColor"
                    stroke="none"
                    fontSize="11"
                  >
                    Section cut
                  </text>
                  <path d="M120 24H544" data-plotter-role="section" />
                  <text
                    x="16"
                    y="84"
                    fill="currentColor"
                    stroke="none"
                    fontSize="11"
                  >
                    Region highlight
                  </text>
                  <path
                    d="M280 64H360V96H280Z"
                    fill="currentColor"
                    fillOpacity={highlightOpacity}
                    stroke="none"
                    data-plotter-fill="highlight"
                  />
                  <path d="M120 64H544V96H120Z" data-plotter-role="primary" />
                  <path
                    d="M280 64V96M360 64V96"
                    data-plotter-role="secondary"
                  />
                </svg>
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              MEC-05 · Same geometry, adjustable linework. Section width and
              highlight opacity have separate samples below the drawing. Scroll
              sideways on narrow screens.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                className="text-xs text-muted-foreground"
                htmlFor={`${id}-css`}
              >
                CSS for your inline drawing
              </label>
              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    setValues(defaults);
                    setInkInput("currentColor");
                    setInk("currentColor");
                    setInkError(false);
                    setCopyState("idle");
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Reset
                </Button>
                <Button onClick={copyCss} size="sm" variant="outline">
                  {copyState === "copied" ? (
                    <CheckIcon aria-hidden="true" />
                  ) : (
                    <CopyIcon aria-hidden="true" />
                  )}
                  Copy CSS
                </Button>
              </div>
            </div>
            <textarea
              className="w-full resize-none border bg-transparent p-4 font-mono text-base leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xs"
              id={`${id}-css`}
              readOnly
              ref={cssRef}
              rows={tokens.length + 3}
              spellCheck={false}
              value={css}
            />
            <p className="text-xs text-muted-foreground">
              Reset restores every token to Plotter’s shared standard.
            </p>
            <span aria-live="polite" className="sr-only">
              {copyState === "manual"
                ? "Clipboard unavailable. The CSS is selected; copy it with your keyboard."
                : copyState === "copied"
                  ? "CSS copied."
                  : ""}
            </span>
          </div>
        </div>
      </div>

      <Collapsible className="mt-8 border px-4 py-1 sm:px-5">
        <CollapsibleTrigger className="inline-flex min-h-10 items-center gap-2 text-sm font-medium [&_svg]:transition-transform data-panel-open:[&_svg]:rotate-180">
          All supported tokens and how to use them
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <div className="mt-3 mb-4 grid min-w-0 gap-6 xl:grid-cols-2 xl:gap-10">
            <div className="min-w-0 overflow-x-auto">
              <table className="w-full text-start text-xs">
                <caption className="sr-only">Plotter token defaults</caption>
                <thead className="border-b text-muted-foreground">
                  <tr>
                    <th className="pb-3 text-start font-medium" scope="col">
                      Token
                    </th>
                    <th className="pb-3 text-end font-medium" scope="col">
                      Default
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2.5 pe-4 font-mono">--plotter-ink</td>
                    <td className="py-2.5 text-end font-mono">currentColor</td>
                  </tr>
                  {Object.entries(standard.tokens).map(([token, value]) => (
                    <tr key={token}>
                      <td className="py-2.5 pe-4 font-mono">{token}</td>
                      <td className="py-2.5 text-end font-mono tabular-nums">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex min-w-0 flex-col gap-4 text-sm text-pretty text-muted-foreground">
              <p>
                Ink accepts a CSS color. Stroke widths are non-negative,
                unitless SVG values; opacity ranges from 0 to 1. Preserve the
                relative emphasis of forms, guides, and hatching.
              </p>
              <p>
                These variables apply to inline SVG with the packaged role
                stylesheet, a <code>data-plotter</code> root, and named{" "}
                <code>data-plotter-role</code> marks. In this catalogue, AGT-01,
                MEC-05, GEO-11, SYS-06, and CRF-06 use that foundation. Other
                drawings keep their existing styles. CSS on a page cannot reach
                into an SVG loaded as an image.
              </p>
              <p>
                Start with{" "}
                <code className="break-all">
                  assets/examples/registration.svg
                </code>{" "}
                in the skill ZIP. It already embeds the role stylesheet. Paste
                its SVG markup inside your <code>.illustration</code> wrapper.
                To inherit your page’s ink, remove that source SVG’s fixed{" "}
                <code>color</code> style, or set <code>--plotter-ink</code> to
                an explicit theme color such as <code>var(--foreground)</code>.
              </p>
              <p>
                Dash patterns, hatch spacing, and arrow geometry express
                meaning. They belong to the shared standard and helpers, rather
                than CSS customization. See the{" "}
                <a
                  className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
                  href="/grammar"
                >
                  visual grammar
                </a>{" "}
                to choose the right mark.
              </p>
              <p>
                For a resolved SVG export, pass your choices to the packaged
                exporter with <code>--ink</code> and{" "}
                <code className="break-all">{`--token=--plotter-opacity-guide=${standard.tokens["--plotter-opacity-guide"]}`}</code>
                . It cannot read a detached page’s CSS. The{" "}
                <a
                  className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
                  href="/docs#plotter-outputs"
                >
                  downloadable SVGs
                </a>{" "}
                already contain resolved appearance values.
              </p>
            </div>
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </section>
  );
}
