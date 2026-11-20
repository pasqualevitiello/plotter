export const geometry = Object.freeze({
  center: { x: 250, y: 254 },
  pivot: { x: 250, y: 358 },
  crankRadius: 70,
  wheelRadius: 78,
  leverLength: 272,
  linkLength: 80,
  carriageY: 86,
  carriageWidth: 64,
  carriageHeight: 36,
});

export const timeline = Object.freeze({
  period: 6,
  stillTime: 0,
  startAngle: 38,
});

// A constant-speed crank locates the pin. The lever passes through that pin;
// the short link intersects the carriage's horizontal constraint on its right.
export function poseAt(seconds) {
  const g = geometry;
  const theta =
    (timeline.startAngle * Math.PI) / 180 -
    (seconds / timeline.period) * 2 * Math.PI;
  const pin = {
    x: g.center.x + g.crankRadius * Math.cos(theta),
    y: g.center.y + g.crankRadius * Math.sin(theta),
  };
  const dx = pin.x - g.pivot.x;
  const dy = pin.y - g.pivot.y;
  const distance = Math.hypot(dx, dy);
  const tip = {
    x: g.pivot.x + (g.leverLength * dx) / distance,
    y: g.pivot.y + (g.leverLength * dy) / distance,
  };
  const rise = g.carriageY - tip.y;
  const carriage = {
    x: tip.x + Math.sqrt(g.linkLength ** 2 - rise ** 2),
    y: g.carriageY,
  };
  return {
    pin,
    tip,
    carriage,
    distance,
    crankAngle: (theta * 180) / Math.PI,
    leverAngle: (Math.atan2(dx, -dy) * 180) / Math.PI,
    linkAngle: (Math.atan2(rise, carriage.x - tip.x) * 180) / Math.PI,
  };
}
