const svg = document.querySelector("svg");
const play = document.querySelector("#play");
const replay = document.querySelector("#replay");
const still = document.querySelector("#still");
const scrub = document.querySelector("#scrub");
const timeLabel = document.querySelector("#time");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const parts = Object.fromEntries(
  [
    "wheel",
    "lever",
    "link",
    "carriage",
    "pin",
    "tip",
    "pin-clear",
    "tip-clear",
    "carriage-clear",
  ].map((name) => [name, document.getElementById(`sl-${name}`)]),
);
let elapsed = timeline.stillTime;
let userPaused = false;
let showingStill = false;
let visible = true;
let frame = null;
let last = null;

function setPoint(element, point) {
  element.setAttribute("cx", point.x);
  element.setAttribute("cy", point.y);
}

function paint(seconds) {
  const pose = poseAt(seconds);
  parts.wheel.setAttribute(
    "transform",
    `rotate(${pose.crankAngle} ${geometry.center.x} ${geometry.center.y})`,
  );
  parts.lever.setAttribute("transform", `rotate(${pose.leverAngle})`);
  parts.link.setAttribute(
    "transform",
    `translate(${pose.tip.x} ${pose.tip.y}) rotate(${pose.linkAngle})`,
  );
  parts.carriage.setAttribute(
    "transform",
    `translate(${pose.carriage.x} ${pose.carriage.y})`,
  );
  for (const name of ["pin", "tip"]) {
    setPoint(parts[name], pose[name]);
    setPoint(parts[`${name}-clear`], pose[name]);
  }
  setPoint(parts["carriage-clear"], pose.carriage);
  scrub.value = seconds;
  scrub.setAttribute(
    "aria-valuetext",
    `${seconds.toFixed(1)} of ${timeline.period} seconds`,
  );
  timeLabel.value = `${seconds.toFixed(1)} / ${timeline.period.toFixed(1)} s`;
}

function tick(now) {
  if (last !== null)
    elapsed = (elapsed + (now - last) / 1000) % timeline.period;
  last = now;
  paint(elapsed);
  frame = requestAnimationFrame(tick);
}

function synchronize() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  last = null;
  const isStatic = showingStill || reducedMotion.matches;
  play.textContent = userPaused || showingStill ? "Play" : "Pause";
  still.setAttribute("aria-pressed", String(showingStill));
  for (const control of [play, replay, still, scrub])
    control.disabled = reducedMotion.matches;
  document.querySelector("#motion-note").hidden = !reducedMotion.matches;
  paint(isStatic ? timeline.stillTime : elapsed);
  if (!isStatic && !userPaused && visible && !document.hidden) {
    frame = requestAnimationFrame(tick);
  }
}

play.addEventListener("click", () => {
  if (showingStill) {
    showingStill = false;
    userPaused = false;
  } else userPaused = !userPaused;
  synchronize();
});
replay.addEventListener("click", () => {
  elapsed = 0;
  userPaused = false;
  showingStill = false;
  synchronize();
});
still.addEventListener("click", () => {
  showingStill = !showingStill;
  synchronize();
});
scrub.addEventListener("input", () => {
  elapsed = Number(scrub.value);
  userPaused = true;
  showingStill = false;
  synchronize();
});
document.addEventListener("visibilitychange", synchronize);
reducedMotion.addEventListener("change", synchronize);
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  synchronize();
}).observe(svg);
synchronize();
