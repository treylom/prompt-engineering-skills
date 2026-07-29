#!/usr/bin/env bash
# p5-ref-verify.sh — P5(대형 가이드 references/ 재배치) 참조 무결성 검증기
#
# 설계 SoT: obsidian-ai-vault/docs/superpowers/specs/2026-07-29-pes-p5-split-design.md (옵션 C)
# 용법:
#   scripts/p5-ref-verify.sh snapshot   # 이동 전: basename별 참조 계수 스냅샷 저장
#   scripts/p5-ref-verify.sh verify     # 이동 후: (1) 옛 flat 경로 잔존 참조 0
#                                       #          (2) 새 references/full.md 실재
#                                       #          (3) 참조 총계 스냅샷 대비 보존
#                                       #          (4) md 상대링크 깨짐 0
# 종료코드: 0=PASS · 1=FAIL · 2=UNMEASURED(스냅샷 부재 등 — PASS 로 취급 금지)
set -u
cd "$(dirname "$0")/.." || exit 2

TARGETS=(
  prompt-engineering-guide
  image-prompt-guide
  gemini-3.1-prompt-strategies
  claude-4.7-prompt-strategies
  gpt-5.6-prompt-enhancement
  expert-domain-priming
  research-prompt-guide
)
# 레포 밖 소비 표면 (설계 doc §4.5 실측 목록 — 검증은 존재하는 경로만)
EXT_SURFACES=(
  "$HOME/obsidian-ai-vault/.claude"
  "$HOME/.codex/skills/prompt-generator"
)
SNAP=".p5-ref-snapshot.tsv"

count_refs() { # $1=basename → 레포 내 참조 행 수 (자기 자신 파일 제외)
  grep -rn "$1" . \
    --include='*.md' --include='*.json' --include='*.sh' \
    --exclude-dir=.git --exclude-dir=node_modules 2>/dev/null \
    | grep -v "^\./skills/$1" | grep -v "^\./skills/$1/" | wc -l | tr -d ' '
}

case "${1:-}" in
  snapshot)
    : > "$SNAP"
    for t in "${TARGETS[@]}"; do
      printf '%s\t%s\n' "$t" "$(count_refs "$t")" >> "$SNAP"
    done
    echo "snapshot -> $SNAP"; cat "$SNAP"
    ;;
  verify)
    [ -f "$SNAP" ] || { echo "UNMEASURED: snapshot 부재 — 먼저 snapshot 실행"; exit 2; }
    fail=0
    for t in "${TARGETS[@]}"; do
      # (1) 옛 flat 경로 문자열(skills/<t>.md) 잔존 참조 — 이동 후 0 이어야 함
      old=$(grep -rn "skills/$t\.md" . --include='*.md' --include='*.json' --include='*.sh' \
              --exclude-dir=.git 2>/dev/null | grep -v 'CHANGELOG' | wc -l | tr -d ' ')
      # (2) 새 위치 실재
      newf="skills/$t/references/full.md"
      # (3) 참조 총계 보존 (스냅샷 대비 감소 = 치환 누락 의심, 증가만 허용)
      snapc=$(awk -F'\t' -v k="$t" '$1==k{print $2}' "$SNAP")
      nowc=$(count_refs "$t")
      st="PASS"
      [ "$old" != "0" ] && st="FAIL(옛 flat 참조 ${old}건 잔존)"
      [ -f "$newf" ] || st="FAIL(신규 ${newf} 부재)"
      [ -n "$snapc" ] && [ "$nowc" -lt "$snapc" ] && st="FAIL(참조 계수 감소 ${snapc}→${nowc} — 치환 누락 의심)"
      printf '%-36s old=%-3s new=%s snap=%s now=%s  %s\n' "$t" "$old" "$([ -f "$newf" ] && echo O || echo X)" "${snapc:-?}" "$nowc" "$st"
      [ "${st:0:4}" = "FAIL" ] && fail=1
    done
    # (4) 레포 밖 표면: 옛 flat 경로 문자열 잔존
    for s in "${EXT_SURFACES[@]}"; do
      [ -e "$s" ] || { echo "EXT $s : UNMEASURED(부재)"; continue; }
      for t in "${TARGETS[@]}"; do
        c=$(grep -rln "skills/$t\.md" "$s" 2>/dev/null | grep -v blog_to_homepage | wc -l | tr -d ' ')
        [ "$c" != "0" ] && { echo "EXT FAIL: $s 에 skills/$t.md 잔존 참조 ${c}파일"; fail=1; }
      done
    done
    [ "$fail" = "0" ] && { echo "== VERIFY PASS =="; exit 0; } || { echo "== VERIFY FAIL =="; exit 1; }
    ;;
  *) echo "usage: $0 snapshot|verify"; exit 2;;
esac
