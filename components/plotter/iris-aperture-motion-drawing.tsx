import { useId } from "react";
import { BlueprintDrawing } from "./blueprint-drawing";

const iris = {
  centerX: 280,
  centerY: 220,
  outerRadius: 120,
  referenceRadius: 40,
  maximumRadius: 72,
  maximumAperture: 2.8,
  duration: 7.6,
} as const;

const number = (value: number) => Number(value.toFixed(6));
const point = (x: number, y: number) => `${number(x)} ${number(y)}`;
const anchorAngle = Math.acos(iris.referenceRadius / iris.outerRadius);
const bladePivot = point(
  iris.centerX + iris.outerRadius * Math.cos(Math.PI / 3 + anchorAngle),
  iris.centerY + iris.outerRadius * Math.sin(Math.PI / 3 + anchorAngle),
);

// The six edges pivot at fixed points on the ring. Neighboring blades hide
// their overlapping portions; each visible edge is drawn only once.
function irisGeometry(radius: number) {
  const { centerX: x, centerY: y, outerRadius: outer } = iris;
  const rotation = anchorAngle - Math.acos(radius / outer);
  const halfSide = radius / Math.sqrt(3);
  const edges = Array.from({ length: 6 }, (_, index) => {
    const angle = (index * Math.PI) / 3;
    const nx = Math.cos(angle + rotation);
    const ny = Math.sin(angle + rotation);
    return {
      start: point(
        x + radius * nx + halfSide * ny,
        y + radius * ny - halfSide * nx,
      ),
      end: point(
        x + outer * Math.cos(angle + anchorAngle),
        y + outer * Math.sin(angle + anchorAngle),
      ),
      vertex: point(
        x + radius * nx - halfSide * ny,
        y + radius * ny + halfSide * nx,
      ),
    };
  });

  return {
    radius: number(radius),
    edges: edges.map((edge) => `M${edge.start}L${edge.end}`).join(""),
    blade: `M${edges[1].vertex}L${edges[1].end}A${outer} ${outer} 0 0 1 ${edges[2].end}Z`,
    hatchRotation: `${number((rotation * 180) / Math.PI)} ${bladePivot}`,
  };
}

// A fixed-focal-length illustration: f-number varies inversely with opening
// diameter. f/2.8 calibrates the widest pose; these are not lens measurements.
const radiusAt = (fNumber: number) =>
  (iris.maximumRadius * iris.maximumAperture) / fNumber;

// Adjust once, settle at f/4, then step down through two smaller settings.
// Reopen slowly and join the loop within the wide hold.
const beats = [
  { time: 0, radius: radiusAt(2.8) },
  { time: 0.6, radius: radiusAt(2.8) },
  { time: 1.3, radius: radiusAt(5.6) },
  { time: 1.62, radius: radiusAt(4) },
  { time: 2.3, radius: radiusAt(4) },
  { time: 2.46, radius: radiusAt(8) },
  { time: 3.1, radius: radiusAt(8) },
  { time: 3.26, radius: radiusAt(16) },
  { time: 4.25, radius: radiusAt(16) },
  { time: 5.35, radius: radiusAt(2.8) },
  { time: iris.duration, radius: radiusAt(2.8) },
];

const frames = beats.flatMap((beat, index) => {
  const previous = beats[index - 1];
  if (!previous || previous.radius === beat.radius) {
    return [{ time: beat.time / iris.duration, ...irisGeometry(beat.radius) }];
  }
  const duration = beat.time - previous.time;
  const steps = Math.ceil(duration * 120);
  return Array.from({ length: steps }, (_, step) => {
    const progress = (step + 1) / steps;
    const eased = progress * progress * (3 - 2 * progress);
    return {
      time: (previous.time + progress * duration) / iris.duration,
      ...irisGeometry(previous.radius + (beat.radius - previous.radius) * eased),
    };
  });
});
const keyTimes = frames.map((frame) => number(frame.time)).join(";");
const initial = frames[0];
type GeometryAttribute = keyof ReturnType<typeof irisGeometry>;
const values = (attribute: GeometryAttribute) =>
  frames.map((frame) => frame[attribute]).join(";");

const fStops = [
  2.8, 3.2, 3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16,
];
const readouts = frames
  .map((frame) => {
    const fNumber = (iris.maximumRadius * iris.maximumAperture) / frame.radius;
    const stop = fStops.reduce((nearest, candidate) =>
      Math.abs(Math.log(candidate / fNumber)) <
      Math.abs(Math.log(nearest / fNumber))
        ? candidate
        : nearest,
    );
    return { time: frame.time, stop };
  })
  .filter(
    (frame, index, all) =>
      index === 0 ||
      index === all.length - 1 ||
      frame.stop !== all[index - 1].stop,
  );
const readoutTimes = readouts.map((frame) => number(frame.time)).join(";");

// Preserve H1's original phase and pitch. The lattice rotates with blade 01,
// while the parent clip follows the region left visible by its neighbor.
const hatch = Array.from({ length: 75 }, (_, index) => {
  const y = -124 + index * 12;
  return `M40 ${y}L520 ${y - 480}`;
}).join("");

function IrisMotion({
  attributeName,
  attribute,
}: {
  attributeName: string;
  attribute: GeometryAttribute;
}) {
  return (
    <animate
      attributeName={attributeName}
      calcMode="linear"
      dur={`${iris.duration}s`}
      keyTimes={keyTimes}
      repeatCount="indefinite"
      values={values(attribute)}
    />
  );
}

export function IrisApertureMotionDrawing() {
  const clipId = `${useId()}-iris-blade-region`;

  return (
    <BlueprintDrawing>
      <g
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeOpacity="0.95"
        strokeWidth="1"
      >
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id={clipId}>
            <path d={initial.blade} fill="black" stroke="none">
              <IrisMotion attribute="blade" attributeName="d" />
            </path>
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <path
            d={hatch}
            opacity="0.27"
            strokeOpacity="0.65"
            transform={`rotate(${initial.hatchRotation})`}
          >
            <animateTransform
              attributeName="transform"
              calcMode="linear"
              dur={`${iris.duration}s`}
              keyTimes={keyTimes}
              repeatCount="indefinite"
              type="rotate"
              values={values("hatchRotation")}
            />
          </path>
        </g>

        <g opacity="0.24" strokeDasharray="8 3 1 3" strokeOpacity="0.6">
          <circle cx={iris.centerX} cy={iris.centerY} r={initial.radius}>
            <IrisMotion attribute="radius" attributeName="r" />
          </circle>
          <path d="M136 220H277M283 220H424M280 84V217M280 223V356" />
        </g>

        <g strokeOpacity="0.95">
          <circle cx={iris.centerX} cy={iris.centerY} r={iris.outerRadius} />
          <path d={initial.edges}>
            <IrisMotion attribute="edges" attributeName="d" />
          </path>
        </g>

        <g opacity="0.5" strokeOpacity="0.65">
          <circle cx={iris.centerX} cy={iris.centerY} r="3" />
          <path d="M282.661 218.614L376 170H392" />
          <path d="M202 270L146 314H112" />
          <path d="M160 92V56M400 92V56M160 64H264M296 64H400M156 68L164 60M396 68L404 60" />
        </g>

        <g fill="currentColor" fontSize="10" opacity="0.5" stroke="none">
          <text textAnchor="middle" x="280" y="67">
            6u
          </text>
        </g>
        <g fill="currentColor" fontSize="11" opacity="0.72" stroke="none">
          <text x="400" y="174">
            Aperture
          </text>
          {fStops.map((stop) => (
            <text
              key={stop}
              visibility={stop === readouts[0].stop ? "visible" : "hidden"}
              x="400"
              y="192"
            >
              <animate
                attributeName="visibility"
                calcMode="discrete"
                dur={`${iris.duration}s`}
                keyTimes={readoutTimes}
                repeatCount="indefinite"
                values={readouts
                  .map((frame) => (frame.stop === stop ? "visible" : "hidden"))
                  .join(";")}
              />
              f/{stop}
            </text>
          ))}
          <text textAnchor="end" x="104" y="318">
            Blade 01
          </text>
        </g>
      </g>
    </BlueprintDrawing>
  );
}
