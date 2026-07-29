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

bare_scan() { # $1=basename → bare 운영 경로 잔존 행 수
  # 🚨 verify 와 selftest 가 반드시 이 함수 하나를 공유한다 (5차 리뷰: selftest 가
  #    raw regex 만 시험하고 production 필터 체인을 안 태우면 필터 예외 구멍을 영구 은폐 —
  #    fixture 는 production 표현형과 일치해야 함).
  # 제외 계약: instructions/(지식 파일명 계약 표면) · image-prompt-kit(vendor) · CHANGELOG(역사)
  #    · scripts/fixtures/(동결 실출력) · `knowledge-bundle-name` 마커 줄(업로드 번들 문맥 —
  #    구 `grep -v '번들'` 단어 휴리스틱을 명시 계약 마커로 교체: 마커 없는 '번들' 문장의
  #    stale 경로도 이제 검출됨) · 검증기 자신(selftest 합성 문자열 보유).
  grep -rnE -e "\./$1\.md" -e "(^|[^/])$1\.md" . --include='*.md' --include='*.sh' \
    --exclude-dir=.git --exclude-dir=instructions --exclude-dir=image-prompt-kit 2>/dev/null \
    | grep -v CHANGELOG | grep -v 'scripts/fixtures/' \
    | grep -v 'knowledge-bundle-name' | grep -v 'scripts/p5-ref-verify.sh' | wc -l | tr -d ' '
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
      # (1b) bare 운영 경로 잔존 (2026-07-29 손석희 3차 리뷰로 2단 보강):
      #      v1: `./<t>.md`·`](<t>.md)` 만 → README 표·백틱 언급을 놓침(3차 FAIL 4군의 사각).
      #      v2: `/` 비선행 `<t>.md` 전부 — 백틱·표 셀·공백 뒤 언급 포함.
      #      제외: instructions/ = 지식 파일명 계약 표면(basename 이 업로드 계약 —
      #            scripts/export-knowledge.sh 가 그 basename 을 실물로 공급, (1c)가 그 계약을 검사)
      #            + CHANGELOG(역사)·fixtures(동결 실출력)·image-prompt-kit(vendor).
      #      추가 예외: `knowledge-bundle-name` 마커 줄 — 업로드 번들 문맥에서는 bare basename 이
      #      계약상 정답 표기 (6차 수리: 구 '번들' 단어 휴리스틱 → 명시 마커. 판정 = bare_scan 단일 함수)
      bare=$(bare_scan "$t")
      # (1c) 지식 업로드 계약 — exporter DIRS 배열의 실멤버십 검사
      #      (v2 — 구판은 이스케이프된 리터럴 '$t' 문자열을 grep 해 generic 루프 줄에 전 타겟 동일 매치
      #       = false PASS. 4차 리뷰 변이 시험[DIRS 삭제해도 PASS]으로 적발, 실멤버십으로 교체)
      awk '/^DIRS=\(/,/\)$/' scripts/export-knowledge.sh 2>/dev/null | grep -qw "$t" \
        || { echo "FAIL(1c): export-knowledge.sh DIRS 에 $t 누락"; fail=1; }
      # (2) 새 위치 실재
      newf="skills/$t/references/full.md"
      # (3) 참조 총계 보존 (스냅샷 대비 감소 = 치환 누락 의심, 증가만 허용)
      snapc=$(awk -F'\t' -v k="$t" '$1==k{print $2}' "$SNAP")
      nowc=$(count_refs "$t")
      st="PASS"
      [ "$old" != "0" ] && st="FAIL(옛 flat 참조 ${old}건 잔존)"
      [ "$bare" != "0" ] && st="FAIL(bare 운영 경로 ${bare}건 잔존)"
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
  selftest)
    # 검사기 양성 대조 (2026-07-29 4차 리뷰 위임 — 검출력의 영구 fixture)
    ok=0; ng=0
    # (a) (1c) 변이: DIRS 에서 타겟 1개 제거한 사본 → 누락 검출돼야 함
    TMP=$(mktemp -d); sed 's/^DIRS=(prompt-engineering-guide /DIRS=(/' scripts/export-knowledge.sh > "$TMP/mut.sh"
    if awk '/^DIRS=\(/,/\)$/' "$TMP/mut.sh" | grep -qw "prompt-engineering-guide"; then
      echo "SELFTEST FAIL: (1c) 변이 미검출"; ng=$((ng+1)); else ok=$((ok+1)); fi
    # (b) (1b) 합성 — production 체인(bare_scan) 그대로 경유해 검출 확인
    #     (6차 수리 — 5차 리뷰: raw regex 단독 시험은 필터 예외 구멍을 못 본다. fixture 는
    #      레포 스캔 범위 안에 실파일로 심고 verify 와 동일 함수로 계수 변화를 판정)
    SYNTH=".p5-selftest-synth-$$.md"; trap 'rm -f "$SYNTH"' EXIT
    base=$(bare_scan "prompt-engineering-guide")
    echo '가이드는 `prompt-engineering-guide.md` 를 읽는다' > "$SYNTH"
    after1=$(bare_scan "prompt-engineering-guide")
    # (b2) '번들' 단어가 있어도 마커가 없으면 검출돼야 함 — 5차 적발 구멍(단어 휴리스틱 통과)의 회귀 fixture
    echo '번들 아닌 실행 경로: `prompt-engineering-guide.md` 를 레포에서 직접 읽는다' >> "$SYNTH"
    after2=$(bare_scan "prompt-engineering-guide")
    rm -f "$SYNTH"
    if [ "$after1" = "$((base+1))" ]; then ok=$((ok+1)); else
      echo "SELFTEST FAIL: (1b) 합성 bare 미검출 — production 체인 (base=$base after=$after1)"; ng=$((ng+1)); fi
    if [ "$after2" = "$((base+2))" ]; then ok=$((ok+1)); else
      echo "SELFTEST FAIL: (1b) '번들'+stale 합성 미검출 — 필터 예외 과광폭 (base=$base after=$after2)"; ng=$((ng+1)); fi
    # (c) exporter 경계: 비어있지 않은 출력 폴더 → 거부돼야 함
    mkdir -p "$TMP/out"; touch "$TMP/out/obsolete-guide.md"
    if bash scripts/export-knowledge.sh "$TMP/out" >/dev/null 2>&1; then
      echo "SELFTEST FAIL: exporter 가 stale 폴더를 수락"; ng=$((ng+1)); else ok=$((ok+1)); fi
    # (d) exporter happy path: fresh 폴더 → 정확 10파일
    if bash scripts/export-knowledge.sh "$TMP/fresh" >/dev/null 2>&1 && [ "$(ls -A "$TMP/fresh" | wc -l | tr -d ' ')" = "10" ]; then
      ok=$((ok+1)); else echo "SELFTEST FAIL: exporter fresh 10파일 실패"; ng=$((ng+1)); fi
    rm -rf "$TMP"
    echo "selftest: PASS=$ok FAIL=$ng"
    [ "$ng" = "0" ] && exit 0 || exit 1
    ;;
  *) echo "usage: $0 snapshot|verify|selftest"; exit 2;;
esac
