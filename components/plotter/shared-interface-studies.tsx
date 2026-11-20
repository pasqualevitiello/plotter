import { CommonInterfaceStudy } from "./common-interface-study";
import { SharedSystemStudy } from "./shared-system-study";
import type { IllustrationStudy } from "./study-types";

export const sharedInterfaceStudies: IllustrationStudy[] = [
  {
    id: "service-common-interface",
    code: "COS-01",
    title: "One interface, many services",
    description:
      "Different parts, one shared opening. Email, SMS, video, and scheduling meet a common SDK contract.",
    category: "Services",
    illustration: <CommonInterfaceStudy />,
  },
  {
    id: "system-common-boundary",
    code: "COS-02",
    title: "A common boundary",
    description:
      "Two complementary profiles form one system. A construction study of the interface between an app and coss.",
    category: "Systems",
    illustration: <SharedSystemStudy />,
  },
];
