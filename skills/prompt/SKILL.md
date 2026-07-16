---
name: prompt
description: "AI 프롬프트 생성기 — 사용자의 아이디어를 모델별(Claude/GPT/Gemini/이미지) 최적화 프롬프트로 변환. \"프롬프트 만들어/생성해/다듬어\" 요청 시 사용. Codex 포트: Claude Code의 /prompt 명령과 동일 절차."
---

# /prompt — AI 프롬프트 생성기 (Codex port wrapper)

이 스킬 디렉터리의 `references/prompt-command.md` 를 읽고, 그 문서 전체를 프롬프트 생성 절차로 삼아 사용자의 요청($ARGUMENTS)을 처리한다.

- 모델별 전략 문서는 플러그인 루트 `skills/` 아래에 있다 (claude-fable-5-prompt-strategies.md, gpt-5.6-prompt-enhancement.md, gemini-3.1-prompt-strategies.md, image-prompt-guide.md 등). `references/prompt-command.md` 가 지시하는 상대경로 `skills/...` 는 이 플러그인 루트 기준으로 해석한다.
- `--batch` 인자가 있으면 질문 없이 바로 결과를 출력한다.
