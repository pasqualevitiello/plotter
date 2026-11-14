#!/bin/bash
# Run every brief in a fresh agent session that sees only the downloadable skill.
# Usage: evals/run.sh claude [model] [brief-prefix]   |   evals/run.sh codex '' [brief-prefix]
set -euo pipefail
agent=${1:?claude or codex}
model=${2:-sonnet}
[ -n "$model" ] || model=sonnet
only=${3:-}
root=$(cd "$(dirname "$0")/.." && pwd)
# Outside the checkout: a session started inside it would read this repository's
# AGENTS.md and stop being a clean install.
out="${PLOTTER_EVAL_OUT:-${TMPDIR:-/tmp}/plotter-evals}/$(date +%Y%m%d-%H%M%S)-$agent"
skill=$(mktemp -d)
unzip -q "$root/public/plotter/downloads/plotter.zip" -d "$skill"

if [ "$agent" = codex ] && ! diff -rq "$skill/plotter" "$HOME/.codex/skills/plotter" >/dev/null; then
  echo "Codex loads ~/.codex/skills/plotter, which differs from the download." >&2
  echo "Install the build under test there first, then run this again." >&2
  exit 1
fi

run_brief() {
  local id=$1 dir="$out/$1"
  mkdir -p "$dir"
  case $id in
    11-*) cp "$root/evals/attachments/parts.svg" "$dir/" ;;
    12-*) cp "$root/evals/attachments/upload-card.svg" "$dir/" ;;
  esac
  local brief
  brief=$(cat "$root/evals/briefs/$id.txt")
  if [ "$agent" = claude ]; then
    # A project-level copy with user settings off is the clean install:
    # no personal skills, plugins, or instructions reach the session.
    mkdir -p "$dir/.claude/skills"
    cp -R "$skill/plotter" "$dir/.claude/skills/plotter"
    (cd "$dir" && claude -p "/plotter $brief" \
      --setting-sources project --model "$model" --permission-mode acceptEdits \
      --output-format stream-json --verbose \
      --allowedTools Read Write Edit Glob Grep Skill Bash \
      --disallowedTools "Bash(brew:*)" "Bash(npm:*)" "Bash(npx:*)" "Bash(pnpm:*)" \
        "Bash(yarn:*)" "Bash(bun:*)" "Bash(pip:*)" "Bash(pip3:*)" "Bash(sudo:*)" \
        "Bash(curl:*)" "Bash(wget:*)" "Bash(git:*)" WebFetch WebSearch \
      >"$dir/transcript.jsonl" 2>"$dir/stderr.txt") || true
  else
    # Codex's default sandbox blocks every renderer on macOS, so these runs
    # show what an unattended session produces without a visual check.
    codex exec -C "$dir" --skip-git-repo-check -s workspace-write --json \
      -o "$dir/final.txt" "\$plotter $brief" \
      </dev/null >"$dir/transcript.jsonl" 2>"$dir/stderr.txt" || true
  fi
  echo "$id done"
}

for file in "$root"/evals/briefs/"$only"*.txt; do
  run_brief "$(basename "$file" .txt)" &
  while [ "$(jobs -rp | wc -l)" -ge 4 ]; do sleep 2; done
done
wait
echo "Outputs: $out"
