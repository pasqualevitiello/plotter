import { useId } from "react";
import { BlueprintDrawing } from "./blueprint-drawing";

// Geometric indexing schematic: the pin advances one radial slot per input
// turn. Locking hardware is omitted; the wheel holds its exit angle in dwell.
const geneva = {
  driver: { x: 166, y: 218 },
  wheel: { x: 322, y: 218 },
  centerDistance: 156,
  inputPeriod: 4,
  cycle: 16,
  outerRadius: 116,
  scallopRadius: 84,
  slotHalfWidth: 7,
  slotBottom: 35,
  lipRadius: 4,
  cornerRadius: 4,
} as const;
const crankRadius = geneva.centerDistance / Math.SQRT2;
const number = (value: number) => Number(value.toFixed(5));

function wheelPoint(x: number, y: number, angle: number) {
  return `${number(geneva.wheel.x + x * Math.cos(angle) - y * Math.sin(angle))} ${number(geneva.wheel.y + x * Math.sin(angle) + y * Math.cos(angle))}`;
}

// Each slot mouth meets a short outer circular arc through a tangent fillet.
// A second tangent fillet joins that arc to the concave circular scallop.
function wheelOutline() {
  const {
    outerRadius: outer,
    scallopRadius: scallop,
    slotHalfWidth: halfWidth,
    slotBottom: bottom,
    lipRadius: lip,
    cornerRadius: corner,
    centerDistance,
  } = geneva;
  const lipCenter = [
    Math.sqrt((outer - lip) ** 2 - (halfWidth + lip) ** 2),
    halfWidth + lip,
  ];
  const mouth = lipCenter.map((value) => (value * outer) / (outer - lip));
  const filletOrbit = outer - corner;
  const scallopOffset = scallop + corner;
  const along =
    (filletOrbit ** 2 + centerDistance ** 2 - scallopOffset ** 2) /
    (2 * centerDistance);
  const across = Math.sqrt(filletOrbit ** 2 - along ** 2);
  const filletCenter = [
    (along + across) / Math.SQRT2,
    (along - across) / Math.SQRT2,
  ];
  const outerJoin = filletCenter.map((value) => (value * outer) / filletOrbit);
  const scallopJoin = filletCenter.map(
    (value) => crankRadius + ((value - crankRadius) * scallop) / scallopOffset,
  );

  let path = `M${wheelPoint(mouth[0], -mouth[1], 0)}`;
  for (let index = 0; index < 4; index++) {
    const angle = (index * Math.PI) / 2;
    path += `A${lip} ${lip} 0 0 1 ${wheelPoint(lipCenter[0], -halfWidth, angle)}`;
    path += `L${wheelPoint(bottom, -halfWidth, angle)}A${halfWidth} ${halfWidth} 0 0 0 ${wheelPoint(bottom, halfWidth, angle)}`;
    path += `L${wheelPoint(lipCenter[0], halfWidth, angle)}A${lip} ${lip} 0 0 1 ${wheelPoint(mouth[0], mouth[1], angle)}`;
    path += `A${outer} ${outer} 0 0 1 ${wheelPoint(outerJoin[0], outerJoin[1], angle)}`;
    path += `A${corner} ${corner} 0 0 1 ${wheelPoint(scallopJoin[0], scallopJoin[1], angle)}`;
    path += `A${scallop} ${scallop} 0 0 0 ${wheelPoint(scallopJoin[1], scallopJoin[0], angle)}`;
    path += `A${corner} ${corner} 0 0 1 ${wheelPoint(outerJoin[1], outerJoin[0], angle)}`;
    path += `A${outer} ${outer} 0 0 1 ${wheelPoint(mouth[1], mouth[0], angle)}`;
  }
  return `${path}Z`;
}

const outline = wheelOutline();
const outsideWheel = `M-1000 -1000H1000V1000H-1000Z ${outline}`;
const outputPivot = `${geneva.wheel.x} ${geneva.wheel.y}`;
const inputPivot = `${geneva.driver.x} ${geneva.driver.y}`;

// The exact pin constraint is sampled at 120 Hz during the one-second index.
// Explicit dwell endpoints preserve the three-second hold without extra frames.
// Four quarter turns return the orientation mark to the same pose at the seam.
const frames = Array.from({ length: 4 }, (_, turn) => {
  const samples = 120;
  const active = Array.from({ length: samples + 1 }, (_, sample) => {
    const progress = sample / samples;
    const inputAngle = -Math.PI / 4 + (progress * Math.PI) / 2;
    const outputAngle = -Math.atan2(
      crankRadius * Math.sin(inputAngle),
      geneva.centerDistance - crankRadius * Math.cos(inputAngle),
    );
    return {
      time: turn * geneva.inputPeriod + progress,
      rotation: (outputAngle * 180) / Math.PI - turn * 90,
    };
  });
  return [
    ...active.slice(turn === 0 ? 0 : 1),
    { time: (turn + 1) * geneva.inputPeriod, rotation: -45 - turn * 90 },
  ];
}).flat();
const keyTimes = frames
  .map((frame) => Number((frame.time / geneva.cycle).toFixed(9)))
  .join(";");
const outputValues = frames
  .map((frame) => `${number(frame.rotation)} ${outputPivot}`)
  .join(";");

function OutputMotion() {
  return (
    <animateTransform
      attributeName="transform"
      begin="0s"
      calcMode="linear"
      dur={`${geneva.cycle}s`}
      keyTimes={keyTimes}
      repeatCount="indefinite"
      type="rotate"
      values={outputValues}
    />
  );
}

function GenevaDrawing({ animated }: { animated: boolean }) {
  const clipId = `${useId()}-geneva-orbit-outside-wheel`;

  return (
    <BlueprintDrawing>
      <g
        data-mechanical-study=""
        fontWeight="400"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeOpacity="1"
        strokeWidth="1"
      >
        <defs>
          <clipPath clipPathUnits="userSpaceOnUse" id={clipId}>
            <path
              clipRule="evenodd"
              d={outsideWheel}
              fill="currentColor"
              stroke="none"
              transform={`rotate(45 ${outputPivot})`}
            >
              {animated && <OutputMotion />}
            </path>
          </clipPath>
        </defs>

        <g
          clipPath={`url(#${clipId})`}
          data-plotter-role="guide"
          opacity="0.14"
        >
          <circle
            cx={geneva.driver.x}
            cy={geneva.driver.y}
            r={number(crankRadius)}
          />
        </g>
        <g data-plotter-role="dimension" opacity="0.32">
          <path d="M166 350V382M322 358V382M166 374H226M262 374H322M163.172 376.828L168.828 371.172M319.172 376.828L324.828 371.172" />
        </g>
        <g data-plotter-role="leader" opacity="0.32">
          <path d="M103 137L83 112H55M390 119L413 94H451" />
        </g>

        <g transform={`rotate(45 ${outputPivot})`}>
          {animated && <OutputMotion />}
          <path d={outline} />
          <circle cx={geneva.wheel.x} cy={geneva.wheel.y} r="12" />
          <circle
            cx={geneva.wheel.x + 32}
            cy={geneva.wheel.y + 22}
            opacity="0.32"
            r="3"
          />
        </g>
        <g transform={`rotate(-45 ${inputPivot})`}>
          {animated && (
            <animateTransform
              attributeName="transform"
              begin="0s"
              calcMode="linear"
              dur={`${geneva.inputPeriod}s`}
              from={`-45 ${inputPivot}`}
              repeatCount="indefinite"
              to={`315 ${inputPivot}`}
              type="rotate"
            />
          )}
          <circle
            cx={geneva.driver.x + number(crankRadius)}
            cy={geneva.driver.y}
            r="5"
          />
          <circle cx={geneva.driver.x} cy={geneva.driver.y} r="12" />
        </g>
        <g opacity="0.32">
          <path d="M160 218H172M166 212V224M316 218H328M322 212V224" />
        </g>

        <g fill="currentColor" fontSize="11" stroke="none">
          <text opacity="0.5" textAnchor="middle" x="244" y="378">
            {geneva.centerDistance}
          </text>
          <text opacity="0.72" x="55" y="103">
            Driver
          </text>
          <text opacity="0.72" textAnchor="end" x="451" y="86">
            Four slots
          </text>
          <text opacity="0.5" textAnchor="middle" x="280" y="408">
            360° input · 90° output
          </text>
        </g>
      </g>
    </BlueprintDrawing>
  );
}

export function GenevaMechanismStudy() {
  return <GenevaDrawing animated={false} />;
}

export function GenevaMechanismMotionDrawing() {
  return <GenevaDrawing animated />;
}
