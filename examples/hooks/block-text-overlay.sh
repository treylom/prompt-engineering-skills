#!/usr/bin/env bash
# 생성 이미지 위 글자 후처리(오버레이) 차단 — PreToolUse:Bash 훅
# 원본: kimsh-1/gongnyang-prompt-kit hooks/block-text-overlay.sh (MIT).
# adapt 2건: ① 정당한 결정적 오버레이(비미적·기술 이미지의 기계적 라벨, 픽셀 보존)는
#   명령에 ALLOW_TEXT_OVERLAY=1 명시 시 통과(무조건 deny → 선언적 escape). ② git 명령 제외(커밋
#   메시지 등에 ImageDraw/ImageFont 단어가 들어가는 오탐 차단).
# 텍스트는 프롬프트로 이미지 안에서 렌더한다. 틀리면 프롬프트를 고쳐 재생성 (image-prompt 철칙 9).
cmd=$(python3 -c 'import sys,json;print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)
case "$cmd" in
  *ALLOW_TEXT_OVERLAY=1*) exit 0 ;;
  git\ *|rtk\ git\ *|"rtk proxy git "*) exit 0 ;;
esac
pattern='\-annotate\b|(magick|convert|mogrify)[^|;&]*(caption:|label:|pango:)|\-draw +[^|;&]{0,80}text|ImageDraw|ImageFont|drawtext'
if grep -qE "$pattern" <<<"$cmd"; then
  cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"생성 이미지 위 글자 후처리 금지(PIL ImageDraw/ImageMagick annotate/ffmpeg drawtext 차단) — 프롬프트를 고쳐 이미지 안에서 재렌더할 것(image-prompt 철칙 9). 정당한 결정적 오버레이(비미적·기술 이미지의 기계적 라벨)면 명령 앞에 ALLOW_TEXT_OVERLAY=1 을 붙여 의도 선언 후 재실행."}}
JSON
fi
exit 0
