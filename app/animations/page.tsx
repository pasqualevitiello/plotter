import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EngineeringMotionPreview } from "@/components/plotter/engineering-motion-preview";
import {
  NewtonsCradleStudy,
  ProductionChainStudy,
} from "@/components/plotter/engineering-studies";
import { illustrations } from "@/components/plotter/illustrations";
import { IrisApertureMotionDrawing } from "@/components/plotter/iris-aperture-motion-drawing";
import { NewtonsCradleMotionDrawing } from "@/components/plotter/newtons-cradle-motion-drawing";
import { NotFoundMotion } from "@/components/plotter/not-found-motion";
import {
  OrbitsMotionDrawing,
  OrbitsStudy,
} from "@/components/plotter/orbits-motion-drawing";
import { ParticlesBlueprint } from "@/components/plotter/particles-blueprint";
import { ParticlesMotion } from "@/components/plotter/particles-motion";
import { PrimitivesBlueprint } from "@/components/plotter/primitives-blueprint";
import { PrimitivesMotionPreview } from "@/components/plotter/primitives-motion-preview";
import { ProductionChainMotionDrawing } from "@/components/plotter/production-chain-motion-drawing";
import { PageIntro, SheetBar } from "@/components/sheet";
import { SiteShell } from "@/components/site-shell";

const iris = illustrations.find(
  (illustration) => illustration.code === "MEC-01",
);
if (!iris) throw new Error("Missing animation fallback illustration: MEC-01");

const studies: {
  id: string;
  label: string;
  title: string;
  description: string;
  preview: ReactNode;
}[] = [
  {
    id: "primitives-animation",
    label: "GEO-01",
    title: "Changing geometry",
    description:
      "Avatar, pill, switch, button, card, slider. Six familiar UI elements, one continuous loop, with measurements that follow the geometry.",
    preview: (
      <PrimitivesMotionPreview>
        <PrimitivesBlueprint />
      </PrimitivesMotionPreview>
    ),
  },
  {
    id: "particles-animation",
    label: "INT-04",
    title: "Three assemblies",
    description:
      "Workspace, booking, activity. Three sets of independent elements assemble into three different interfaces in a repeating sequence.",
    preview: (
      <ParticlesMotion>
        <ParticlesBlueprint />
      </ParticlesMotion>
    ),
  },
  {
    id: "not-found-animation",
    label: "EMP-05",
    title: "An unreachable destination",
    description:
      "A request follows a curved route, reaches the closed end, and returns. The destination stays absent, one unit beyond its reach.",
    preview: <NotFoundMotion />,
  },
  {
    id: "iris-aperture-animation",
    label: "MEC-01",
    title: "Three apertures, one sequence",
    description:
      "The iris adjusts, settles, and steps through f/4, f/8, and f/16 before slowly reopening. The aperture readout follows the opening.",
    preview: (
      <EngineeringMotionPreview animated={<IrisApertureMotionDrawing />}>
        {iris.illustration}
      </EngineeringMotionPreview>
    ),
  },
  {
    id: "production-chain-animation",
    label: "MEC-05",
    title: "An assembly line in motion",
    description:
      "A core lowers into its carrier. The line advances, the completed part moves on, and the next assembly begins.",
    preview: (
      <EngineeringMotionPreview animated={<ProductionChainMotionDrawing />}>
        <ProductionChainStudy />
      </EngineeringMotionPreview>
    ),
  },
  {
    id: "newtons-cradle-animation",
    label: "OBJ-05",
    title: "One swing, passed along",
    description:
      "One end swings in and the other swings out. Equal lengths and fixed pivots carry the motion through a continuous rhythm.",
    preview: (
      <EngineeringMotionPreview animated={<NewtonsCradleMotionDrawing />}>
        <NewtonsCradleStudy />
      </EngineeringMotionPreview>
    ),
  },
  {
    id: "orbits-animation",
    label: "Motion only",
    title: "Three orbits, three speeds",
    description:
      "Three planets leave one line together. The inner one circles four times for every turn of the outer one, and all three meet again at the start.",
    preview: (
      <EngineeringMotionPreview animated={<OrbitsMotionDrawing />}>
        <OrbitsStudy />
      </EngineeringMotionPreview>
    ),
  },
];

export const metadata: Metadata = { title: "Animations" };
export default function AnimationsPage() {
  return (
    <SiteShell current="/animations">
      <PageIntro label="02 — Animations" title="An idea, in motion.">
        Watch the relationships unfold. {studies.length} animated studies keep
        their original geometry, and each becomes a still drawing when reduced
        motion is on.
      </PageIntro>
      <section
        aria-labelledby="animations-heading"
        className="scroll-mt-6"
        id="animations"
      >
        <SheetBar
          id="animations-heading"
          label="02.1 — Motion studies"
          meta={`${studies.length} studies · Respects reduced motion`}
        />
        {studies.map((study) => (
          <article
            aria-labelledby={`${study.id}-title`}
            className="sheet-row sheet-cols scroll-mt-6"
            id={study.id}
            key={study.id}
          >
            <div className="sheet-cell flex flex-col items-start justify-center gap-3">
              <p className="mono-label">{study.label}</p>
              <h3
                className="mt-3 text-2xl leading-tight"
                id={`${study.id}-title`}
              >
                {study.title}
              </h3>
              <p className="max-w-[44ch] text-pretty text-muted-foreground">
                {study.description}
              </p>
            </div>
            <div className="flex min-w-0 flex-col justify-end">
              {study.preview}
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
