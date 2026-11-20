import { useId } from "react";
import { BlueprintDrawing } from "./blueprint-drawing";

// Ideal planar slider-crank construction, in SVG units. Constant crank speed
// drives a horizontal slider through a rigid rod; these are not engine specs.
const mechanism = {
  centerX: 150,
  centerY: 220,
  crankRadius: 60,
  rodLength: 198,
  duration: 2.8,
} as const;

const number = (value: number) => Number(value.toFixed(6));
const point = (x: number, y: number) => `${number(x)} ${number(y)}`;

function capsule(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  radius: number,
) {
  const length = Math.hypot(bx - ax, by - ay);
  const nx = (-(by - ay) / length) * radius;
  const ny = ((bx - ax) / length) * radius;
  return `M${point(ax + nx, ay + ny)}L${point(bx + nx, by + ny)}A${radius} ${radius} 0 0 0 ${point(bx - nx, by - ny)}L${point(ax - nx, ay - ny)}A${radius} ${radius} 0 0 0 ${point(ax + nx, ay + ny)}Z`;
}

function crankGeometry(phase: number) {
  const { centerX: cx, centerY: cy, crankRadius: r, rodLength } = mechanism;
  const angle = 2 * Math.PI * phase - Math.PI / 3;
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const bx = cx + r * ux;
  const by = cy + r * uy;
  const px = cx + r * ux + Math.sqrt(rodLength ** 2 - (r * uy) ** 2);
  const nx = -uy * 5;
  const ny = ux * 5;
  const trim = Math.sqrt(10 ** 2 - 5 ** 2);

  return {
    crankPinX: number(bx),
    crankPinY: number(by),
    pistonX: number(px),
    piston: `M${number(px - 26)} 185H${number(px + 28)}V255H${number(px - 26)}`,
    rings: `M${number(px + 14)} 185V255M${number(px + 20)} 185V255`,
    crank: `M${point(cx + ux * trim + nx, cy + uy * trim + ny)}L${point(bx - ux * trim + nx, by - uy * trim + ny)}M${point(cx + ux * trim - nx, cy + uy * trim - ny)}L${point(bx - ux * trim - nx, by - uy * trim - ny)}`,
    rod: capsule(bx, by, px, cy, 10),
    // The rod owns the front silhouette. Subtract its footprint plus one unit
    // from rear linework instead of painting a background-colored patch.
    rearClip: `M0 0H560V440H0Z ${capsule(bx, by, px, cy, 11)}`,
  };
}

// Every moving attribute follows this same linear timeline. Dense exact-state
// samples keep the rigid geometry and the occlusion boundary in lockstep.
const sampleCount = 180;
const frames = Array.from({ length: sampleCount + 1 }, (_, index) =>
  crankGeometry(index === sampleCount ? 0 : index / sampleCount),
);
const keyTimes = frames
  .map((_, index) => Number((index / sampleCount).toFixed(9)))
  .join(";");
const initial = frames[0];
type GeometryAttribute = keyof ReturnType<typeof crankGeometry>;

function CrankMotion({
  attribute,
  attributeName,
}: {
  attribute: GeometryAttribute;
  attributeName: string;
}) {
  return (
    <animate
      attributeName={attributeName}
      begin="0s"
      calcMode="linear"
      dur={`${mechanism.duration}s`}
      keyTimes={keyTimes}
      repeatCount="indefinite"
      values={frames.map((frame) => frame[attribute]).join(";")}
    />
  );
}

const cylinderHatch = Array.from({ length: 16 }, (_, index) => {
  const x = 270 + index * 12;
  return `M${x} 180l10 -10M${x} 270l10 -10`;
}).join("");

function CrankPistonDrawing({ animated }: { animated: boolean }) {
  const clipId = `${useId()}-crank-rear-outside-rod`;

  return (
    <BlueprintDrawing>
      <g
        data-mechanical-study=""
        fontWeight="400"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeOpacity="1"
      >
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id={clipId}>
            <path
              clipRule="evenodd"
              d={initial.rearClip}
              fill="currentColor"
              stroke="none"
            >
              {animated && (
                <CrankMotion attribute="rearClip" attributeName="d" />
              )}
            </path>
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <path
            d="M46 220H510 M150 112V328"
            opacity="0.14"
            strokeDasharray="8 3 1 3"
          />
          <circle cx="150" cy="220" opacity="0.32" r="84" />
          <circle cx="150" cy="220" opacity="0.14" r="60" />
        </g>

        <g data-plotter-role="dimension" opacity="1">
          <path d="M288 276V348M408 276V348" opacity="0.14" />
          <path
            d="M288 340H331 M365 340H408M285.172 342.828L290.828 337.172M405.172 342.828L410.828 337.172"
            opacity="0.32"
          />
        </g>

        <path
          d="M260 180H474V260H260 M260 170H484V270H260 M474 180L484 170M474 260L484 270"
          opacity="0.32"
        />
        <path d={cylinderHatch} opacity="0.18" />

        {/* The open skirt lets the rod enter through the left of the piston. */}
        <path d={initial.piston}>
          {animated && <CrankMotion attribute="piston" attributeName="d" />}
        </path>
        <path d={initial.rings} opacity="0.32">
          {animated && <CrankMotion attribute="rings" attributeName="d" />}
        </path>

        <g clipPath={`url(#${clipId})`}>
          <path d={initial.crank}>
            {animated && <CrankMotion attribute="crank" attributeName="d" />}
          </path>
          <circle cx="150" cy="220" r="10" />
          <circle cx="150" cy="220" opacity="0.32" r="3" />
        </g>

        <path d={initial.rod}>
          {animated && <CrankMotion attribute="rod" attributeName="d" />}
        </path>
        <circle
          cx={initial.crankPinX}
          cy={initial.crankPinY}
          opacity="0.72"
          r="4"
        >
          {animated && (
            <>
              <CrankMotion attribute="crankPinX" attributeName="cx" />
              <CrankMotion attribute="crankPinY" attributeName="cy" />
            </>
          )}
        </circle>
        <circle cx={initial.pistonX} cy="220" opacity="0.72" r="4">
          {animated && <CrankMotion attribute="pistonX" attributeName="cx" />}
        </circle>

        <g data-plotter-role="leader" opacity="1">
          <path d="M184 141L204 113H244 M484 184L505 152H516" opacity="0.32" />
        </g>

        <g fill="currentColor" fontSize="11" stroke="none">
          <text opacity="0.5" textAnchor="middle" x="348" y="344">
            120
          </text>
          <text opacity="0.72" textAnchor="middle" x="348" y="366">
            Stroke = 2r
          </text>
          <text opacity="0.5" textAnchor="middle" x="150" y="348">
            Crank radius · 60
          </text>
          <text opacity="0.72" x="252" y="117">
            Crank
          </text>
          <text opacity="0.72" textAnchor="end" x="516" y="142">
            Cylinder
          </text>
          <text opacity="0.5" textAnchor="middle" x="354" y="105">
            Connecting rod · 198
          </text>
        </g>

        <path
          d="M76.461 293.539A104 104 0 0 1 46 220"
          opacity="0.32"
          strokeDasharray="4 6"
        />
        <path d="M41.757 224.243L46 220L50.243 224.243" opacity="0.32" />
      </g>
    </BlueprintDrawing>
  );
}

export function CrankPistonStudy() {
  return <CrankPistonDrawing animated={false} />;
}

export function CrankPistonMotionDrawing() {
  return <CrankPistonDrawing animated />;
}
