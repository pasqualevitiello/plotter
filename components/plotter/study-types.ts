import type { ReactNode } from "react";

// One family per code prefix: GEO, TYP, INT, TIM, SYS, SRV, AGT, EMP, OBJ, MEC,
// CRF, NAT. Codes are numbered without gaps within each family.
export type StudyCategory =
  | "Geometry"
  | "Typography"
  | "Interfaces"
  | "Time"
  | "Systems"
  | "Services"
  | "Agents"
  | "Empty states"
  | "Objects"
  | "Mechanisms"
  | "Craft"
  | "Nature";

export const familyPrefix: Record<StudyCategory, string> = {
  Geometry: "GEO",
  Typography: "TYP",
  Interfaces: "INT",
  Time: "TIM",
  Systems: "SYS",
  Services: "SRV",
  Agents: "AGT",
  "Empty states": "EMP",
  Objects: "OBJ",
  Mechanisms: "MEC",
  Craft: "CRF",
  Nature: "NAT",
};

export type IllustrationStudy = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: StudyCategory;
  illustration: ReactNode;
  emptyState?: {
    title: string;
    description: string;
    illustration: ReactNode;
  };
};
