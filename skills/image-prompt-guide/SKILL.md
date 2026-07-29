---
name: image-prompt-guide
description: Use when generating AI image prompts — 정본 = 공냥 프롬프트 킷 v4(gpt-image-2 텍스트 프롬프트 계약 — 포맷 A/B·철칙·jsonl·검증기, skills/image-prompt-kit/ vendor 원문). 웹 UI(ChatGPT/Gemini) JSON 간이 경로는 legacy 부록. /prompt 커맨드가 이미지 타겟 감지 시 references/full.md 전체 로드.
disable-model-invocation: true
references:
  - prompt-engineering-guide
  - context-engineering-collection
  - image-prompt-kit
version: 3.3.0
updated: 2026-07-29
---

# image-prompt-guide — 라우팅 인덱스

> **정본 본문 = [references/full.md](references/full.md)** (약 1,100줄).
> ⚠️ **이미지 목적 감지 시 = full.md 전체 Read 가 계약**(부분 Read ❌ — /prompt 템플릿 로드 게이트·Codex SKILL.md 선행 게이트 동일). 이 인덱스는 위치 안내용이며 내용을 복제하지 않는다. 내용 수정은 references/full.md 에만.

## 구조 맵 (grep 앵커 — 줄번호는 as-of 2026-07-29 참고값)

| 구역 | grep 앵커 | 위치(참고) |
|---|---|---|
| **§0 적용 계약 (정본)** | `## 0. Codex` | L25 |
| **§K 공냥 킷 v4 계약** (포맷 A/B·철칙·jsonl·검증기·라우팅 표) | `## K. 공냥 프롬프트 킷 v4` | L40 |
| §L Legacy 부록 선언 | `## L. Legacy 부록` | L155 |
| Legacy 이론 §1~14 (프로세스·개념·팁·조명·스타일·인포그래픽·치트시트) | `## 1. 이미지 생성 프로세스` ~ `## 14. 핵심 정리` | L159~L810 |
| §15 동영상 JSON (Veo/Kling) | `## 15. 동영상 프롬프트 JSON` | L811 |
| §16 체크리스트 · §17 슬라이드 | `## 16. 프롬프트 생성 체크리스트` / `## 17. 슬라이드` | L960·L998 |

## 원문 vendor

공냥 킷 원문 = [../image-prompt-kit/](../image-prompt-kit/) (무수정 vendor — §K5 라우팅 표가 지시하는 파일을 직접 읽는 것은 우회가 아니다). 검증기 = `../image-prompt-kit/scripts/check_prompt.mjs`.
