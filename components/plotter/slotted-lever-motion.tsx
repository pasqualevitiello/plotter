import {
  geometry,
  poseAt,
  timeline,
} from "../../examples/slotted-lever/geometry.mjs";

const steps = timeline.period * 120;
const number = (value: number) => Number(value.toFixed(6));
const point = ({ x, y }: { x: number; y: number }) =>
  `${number(x)} ${number(y)}`;
const frames = Array.from({ length: steps + 1 }, (_, index) => {
  const pose = poseAt((index / steps) * timeline.period);
  return {
    crank: `${number(pose.crankAngle)} ${point(geometry.center)}`,
    lever: number(pose.leverAngle),
    linkPosition: point(pose.tip),
    linkRotation: number(pose.linkAngle),
    carriage: point(pose.carriage),
    pinX: number(pose.pin.x),
    pinY: number(pose.pin.y),
    tipX: number(pose.tip.x),
    tipY: number(pose.tip.y),
    carriageX: number(pose.carriage.x),
  };
});
type MotionProperty = keyof (typeof frames)[number];
const values = Object.fromEntries(
  Object.keys(frames[0]).map((property) => [
    property,
    frames.map((frame) => frame[property as MotionProperty]).join(";"),
  ]),
);

// Sample the standalone equations, retaining the site's native SVG clock.
// Equal intervals and linear interpolation preserve the constant-speed input.
export function SlottedLeverMotion({
  animated,
  property,
  attributeName,
  type,
}: {
  animated: boolean;
  property: MotionProperty;
  attributeName: string;
  type?: "rotate" | "translate";
}) {
  if (!animated) return null;
  const props = {
    attributeName,
    begin: "0s",
    dur: `${timeline.period}s`,
    calcMode: "linear" as const,
    repeatCount: "indefinite",
    values: values[property],
  };
  return type ? (
    <animateTransform {...props} type={type} />
  ) : (
    <animate {...props} />
  );
}
