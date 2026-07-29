#!/usr/bin/env bash
# export-knowledge.sh — GPTs/Gems Knowledge 업로드 번들 생성
#
# Why: 웹 UI 지식 파일은 **basename 이 참조 계약**이다 — Instructions(GPTs/Gems)가
#      번들 파일명(`prompt-engineering-guide.md` 등)으로 참조하고, 기존 배포된 GPTs/Gems 의
#      지식 파일명과도 호환돼야 한다. 저장소 정본은 P5 분할(2026-07-29) 이후
#      `skills/<이름>/references/full.md` 이므로, 업로드 직전 이 스크립트로
#      업로드 계약 basename(`<이름>.md`)으로 복사해 번들을 만든다.
# 용법: bash scripts/export-knowledge.sh [출력디렉터리]   (기본 /tmp/pes-knowledge)
set -eu
cd "$(dirname "$0")/.."
OUT="${1:-/tmp/pes-knowledge}"
# 순수 번들 보장 (2026-07-29 4차 리뷰 결함 3): 재사용 폴더의 stale 파일이 번들에 섞이는 것 차단 —
# 비어있지 않은 출력 폴더는 거부 (기본 경로가 고정이라 반복 실행 시 실제로 닿는 경계)
if [ -d "$OUT" ] && [ -n "$(ls -A "$OUT" 2>/dev/null)" ]; then
  echo "FAIL: 출력 폴더가 비어있지 않음 ($OUT) — 순수 번들 보장을 위해 빈/신규 폴더만 허용."
  echo "      지우고 재실행: rm -rf '$OUT' && bash scripts/export-knowledge.sh '$OUT'"
  exit 1
fi
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

# exact manifest 검증: 정확히 10파일 + 각 산출물 = 원본과 byte-equal
n=$(ls -A "$OUT" | wc -l | tr -d ' ')
[ "$n" = "10" ] || { echo "FAIL: 번들 파일 수 $n ≠ 10 (stale 혼입 또는 복사 누락)"; exit 1; }
for t in "${DIRS[@]}"; do cmp -s "skills/$t/references/full.md" "$OUT/$t.md" || { echo "FAIL: $t.md byte 불일치"; exit 1; }; done
for f in claude-fable-5-prompt-strategies slide-prompt-guide context-engineering-collection; do
  cmp -s "skills/$f.md" "$OUT/$f.md" || { echo "FAIL: $f.md byte 불일치"; exit 1; }
done

ls -l "$OUT"
echo "upload bundle -> $OUT  (10파일 manifest·byte-equal 검증 통과 — 파일명 = GPTs/Gems Instructions 참조 계약)"
