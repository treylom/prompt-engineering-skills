---
name: prompt-engineering-guide
description: Use when generating research/factcheck/image/video/slide prompts that need base templates (IFCN·StructuredResearch 등) — 단일 통합 AI 프롬프트 엔지니어링 레퍼런스의 라우팅 인덱스. 본문 전체는 references/full.md(대형 파일 — grep으로 위치 확인 후 부분 Read).
disable-model-invocation: true
version: 3.3.0
updated: 2026-07-29
---

# prompt-engineering-guide — 라우팅 인덱스

> **전체 본문 = [references/full.md](references/full.md)** (약 7,000줄 — **전체 통독 ❌**).
> 이 SKILL.md 는 내용을 복제하지 않는 얇은 인덱스다(이중 표현 stale 방지 — 2026-03 구 분할본이 flat 기준 파일과 갈라져 썩었던 회귀의 구조적 차단). 내용 수정은 항상 references/full.md 에만.

## 로드 방법 (/prompt 템플릿 로드 게이트)

```
grep -n "<앵커 문자열>" skills/prompt-engineering-guide/references/full.md
→ 해당 offset 부분 Read
```

## 섹션 맵 (grep 앵커 — 줄번호는 as-of 2026-07-29 참고값, 앵커 문자열이 기준)

| 목적 | grep 앵커 | 위치(참고) |
|---|---|---|
| 운영 원칙·용어 | `## 단일 스킬 운영 원칙` / `## 용어 해설` | L16·L38 |
| Context Engineering | `## Context Engineering 원칙 적용` / `## Context Engineering 심층 통합` | L98·L1446 |
| 전문가 프라이밍 | `## Expert Domain Priming` | L124 |
| 모델별 전략 (GPT-5.2/Codex/5.5·Claude 4.5·Gemini 3·Veo) | `## 모델별 프롬프트 전략` | L151~ |
| 목적별 블록·상세도 | `## 목적별 추가 블록` / `## 상세도별 출력 지침` | L1352·L1406 |
| 개선 워크플로우·품질 | `## 프롬프트 개선 워크플로우` / `## 품질 체크리스트` | L1509·L1656 |
| 에이전틱 패턴 | `## 에이전틱 워크플로우 패턴` | L1711 |
| 중간 구조화(스토리보드·개요) | `## 중간 구조화 워크플로우` | L1813 |
| **팩트체크 베이스 템플릿** | `LoopFactChecker` / `QuickFactCheck` | L5262·L5414 |
| **리서치 베이스 템플릿** | `StructuredResearch_v1.0` | L5445 |
| 통합 부록(이전 분리 스킬 병합본) | `## 통합 부록` | L1947~ |

## 관련 스킬

- 이미지 = [../image-prompt-guide/](../image-prompt-guide/SKILL.md) (공냥 킷 v4 원본)
- 모델별 상세 = ../claude-fable-5-prompt-strategies.md · [../gpt-5.6-prompt-enhancement/](../gpt-5.6-prompt-enhancement/SKILL.md) · [../gemini-3.1-prompt-strategies/](../gemini-3.1-prompt-strategies/SKILL.md)
- 전문가 DB = [../expert-domain-priming/](../expert-domain-priming/SKILL.md) · 리서치 = [../research-prompt-guide/](../research-prompt-guide/SKILL.md)
