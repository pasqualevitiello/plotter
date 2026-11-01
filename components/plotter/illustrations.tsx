import { calStudies } from "./cal-studies";
import { contentStateStudies } from "./content-state-studies";
import { engineeringStudies } from "./engineering-studies";
import { expandedStudies } from "./expanded-studies";
import { flatCalStudies } from "./flat-cal-studies";
import { flatObjectStudies } from "./flat-object-studies";
import { flatSystemStudies } from "./flat-system-studies";
import { interfaceDetailStudies } from "./interface-detail-studies";
import { networkStudies } from "./network-studies";
import { notFoundArchitectureStudies } from "./not-found-architecture-studies";
import { notFoundGeometryStudies } from "./not-found-geometry-studies";
import { objectStudies } from "./object-studies";
import { OriginalNotFoundBlueprint } from "./original-not-found-blueprint";
import { OriginalParticlesBlueprint } from "./original-particles-blueprint";
import { popularServiceStudies } from "./popular-service-studies";
import { PrimitivesBlueprint } from "./primitives-blueprint";
import { serviceStudies } from "./service-studies";
import { stateStudies } from "./state-studies";
import type { IllustrationStudy } from "./study-types";
import { systemStateStudies } from "./system-state-studies";
import { systemStudies } from "./system-studies";

const collection: IllustrationStudy[] = [
  {
    id: "primitives-reference",
    code: "GEO-01",
    title: "Circle, square, line",
    description:
      "Fundamental geometry, connected by radius, tangency, and a shared construction grid.",
    category: "Geometry",
    illustration: <PrimitivesBlueprint />,
  },
  {
    id: "particles-reference",
    code: "INT-01",
    title: "The exploded interface",
    description:
      "A pill, row, and toggle projected onto a shared frame. Separate elements follow a common set of rules.",
    category: "Interfaces",
    illustration: <OriginalParticlesBlueprint />,
  },
  ...systemStudies,
  ...flatCalStudies,
  ...interfaceDetailStudies,
  ...flatSystemStudies,
  ...flatObjectStudies,
  ...serviceStudies,
  ...popularServiceStudies,
  ...calStudies,
  ...networkStudies,
  ...objectStudies,
  ...stateStudies,
  ...contentStateStudies,
  ...systemStateStudies,
  ...engineeringStudies,
  ...notFoundArchitectureStudies,
  ...notFoundGeometryStudies,
  ...expandedStudies,
  {
    id: "404-reference",
    code: "EMP-01",
    title: "The missing corner",
    description:
      "A vacant module in an otherwise complete construction. Absence, described by the edges around it.",
    category: "Empty states",
    illustration: <OriginalNotFoundBlueprint />,
  },
];

// Near-duplicates retired from the catalogue on 2026-11-01, each mapped to the
// drawing that now covers its idea. Sources and codes stay reserved, and old
// deep links resolve to the replacement.
export const retiredStudies: Record<string, string> = {
  "time-appointment-buffers": "cal-appointment-buffers", // TM02 → TIM-06
  "state-no-matching-results": "state-search", // S15 → EMP-06
  "software-branch-history": "service-github-merge", // SW03 → SRV-06
  "software-cache-route": "service-cloudflare-edge", // SW02 → SRV-01
  "arch-missing-keystone": "404-unbuilt-arch", // AR03 → EMP-04
};

const active = collection.filter((item) => !(item.id in retiredStudies));

// Open the collection with a cross-section of its subjects. Codes and deep links
// stay stable as the drawings evolve.
const opening = ["GEO-01", "INT-04", "SRV-04", "TIM-03", "INT-09", "EMP-03"];

export const illustrations = [
  ...opening.flatMap((code) => active.filter((item) => item.code === code)),
  ...active.filter((item) => !opening.includes(item.code)),
];
