import type { Metadata } from "next";
import { PrototypeHarness } from "@/components/prototype/harness";

export const metadata: Metadata = {
  title: "Plotter — identity directions",
  description: "Three directions for the Plotter homepage: Manual, Archive, and Studio.",
  robots: { index: false, follow: false },
};

export default async function PrototypePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string | string[] }>;
}) {
  const query = await searchParams;
  const value = Number(Array.isArray(query.v) ? query.v[0] : query.v);
  const initialVariant = Number.isInteger(value) && value >= 1 && value <= 3 ? value - 1 : 0;

  return <PrototypeHarness initialVariant={initialVariant} />;
}
