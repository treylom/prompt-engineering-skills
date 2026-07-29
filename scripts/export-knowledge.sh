#!/usr/bin/env bash
# export-knowledge.sh — GPTs/Gems Knowledge 업로드 번들 생성
#
# Why: 웹 UI 지식 파일은 **basename 이 참조 계약**이다 — Instructions(GPTs/Gems)가
#      `pes-knowledge/prompt-engineering-guide.md` 같은 번들 파일명으로 참조하고, 기존 배포된 GPTs/Gems 의
#      지식 파일명과도 호환돼야 한다. 저장소 정본은 P5 분할(2026-07-29) 이후
#      `skills/<이름>/references/full.md` 이므로, 업로드 직전 이 스크립트로
#      업로드 계약 basename(`<이름>.md`)으로 복사해 번들을 만든다.
# 용법: bash scripts/export-knowledge.sh [출력디렉터리]   (기본 /tmp/pes-knowledge)
set -eu
cd "$(dirname "$0")/.."
OUT="${1:-/tmp/pes-knowledge}"
mkdir -p "$OUT"

# 대형 가이드 (디렉터리형) → 업로드 basename 으로 복사
DIRS=(prompt-engineering-guide image-prompt-guide gemini-3.1-prompt-strategies
      claude-4.7-prompt-strategies gpt-5.6-prompt-enhancement expert-domain-priming
      research-prompt-guide)
for t in "${DIRS[@]}"; do
  cp "skills/$t/references/full.md" "$OUT/$t.md"
done

# flat 유지 가이드 → 그대로 복사
for f in claude-fable-5-prompt-strategies slide-prompt-guide context-engineering-collection; do
  cp "skills/$f.md" "$OUT/$f.md"
done

ls -l "$OUT"
echo "upload bundle -> $OUT  (파일명 = GPTs/Gems Instructions 가 참조하는 지식 파일명 계약)"
