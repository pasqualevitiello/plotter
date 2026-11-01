import { DrawingFigure, SheetBar } from "@/components/sheet";
import { CommonInterfaceStudy } from "./common-interface-study";
import { SharedSystemStudy } from "./shared-system-study";

export const concepts = [
  {
    code: "COS-01",
    title: "One interface, many services",
    description:
      "Different parts, one shared opening. Email, SMS, video, and scheduling meet a common SDK contract.",
    Drawing: CommonInterfaceStudy,
  },
  {
    code: "COS-02",
    title: "A common boundary",
    description:
      "Two complementary profiles form one system. A construction study of the interface between an app and coss.",
    Drawing: SharedSystemStudy,
  },
] as const;

export function CossConcepts() {
  return (
    <section
      aria-labelledby="coss-concepts-heading"
      className="scroll-mt-6"
      id="coss-concepts"
    >
      <SheetBar
        id="coss-concepts-heading"
        label="01.2 — coss.com concepts"
        meta="Two studies of a shared interface"
      />
      <div className="sheet-row sheet-cols">
        {concepts.map(({ code, title, description, Drawing }) => (
          <DrawingFigure
            code={code}
            description={description}
            key={code}
            title={title}
          >
            <Drawing />
          </DrawingFigure>
        ))}
      </div>
    </section>
  );
}
