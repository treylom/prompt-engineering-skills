---
name: gems-prompt-generator
description: Use when needing Google Gems 프롬프트 생성기. Gems 페르소나용 시스템 프롬프트 자동 생성.
disable-model-invocation: false
---

# AI 프롬프트 생성 전문가 (Gems용 - Gemini 최적화)

> **Version**: 3.2.1 | **Updated**: 2026-07-29
> **Credits**: 이미지 프롬프트 가이드 - 공냥이(@specal1849)
> **Model Rankings**: [LMArena Leaderboard](https://lmarena.ai) (2026년 3월 기준)
> **Optimized for**: Gemini 3, Veo 3.1, Gemini Image

## Overview

Google Gems 페르소나를 위한 AI 프롬프트 자동 생성 시스템. 이미지, 동영상, 코딩, 글쓰기, 분석 등 다양한 목적에 맞는 최적화된 프롬프트를 생성합니다. 전문가 3인 토론 시스템과 Context Engineering 원칙을 적용하여 고품질 프롬프트를 보장합니다.

## Sub-files

| File | Description |
|------|-------------|
| [01-mindset-constraints.md](01-mindset-constraints.md) | 핵심 마인드셋, 금지 사항, 실행 트리거, 핵심 원칙 |
| [02-role-model-rankings.md](02-role-model-rankings.md) | 역할 정의, 스킬 파일 참조, 목적별 추천 모델 (텍스트/이미지/동영상/검색) |
| [03-element-expansion-expert-priming.md](03-element-expansion-expert-priming.md) | 명시적 요소 확장 규칙, 전문가 도메인 프라이밍 |
| [04-workflow-detection-structuring.md](04-workflow-detection-structuring.md) | Step 1 목적 자동 감지, Step 1.7 중간 구조화 (스토리보드, 생성 계획, 아웃라인) |
| [05-workflow-generation-output.md](05-workflow-generation-output.md) | Step 2 전문가 토론, Step 3 출력 + 옵션, Step 4 수정, 에이전트 모드 |
| [06-gemini-guide-json-structures.md](06-gemini-guide-json-structures.md) | Gemini Image/Veo 3.1 특화 가이드, 이미지/동영상 JSON 구조 템플릿 |
| [07-references-final-reminder.md](07-references-final-reminder.md) | XML 프롬프트 참조, 스킬 파일 목록, UI 안내, Final Reminder |
| [08-changelog.md](08-changelog.md) | 버전 히스토리 (v1.5.0 ~ v3.1.0) |

## Quick Navigation

- **처음 사용자**: 01 (마인드셋) -> 04 (워크플로우) -> 05 (출력)
- **이미지/동영상 프롬프트**: 06 (Gemini 가이드) + 04 (중간 구조화)
- **모델 선택**: 02 (모델 순위)
- **프롬프트 품질 향상**: 03 (요소 확장 + 전문가 프라이밍)
- **변경 이력**: 08 (changelog)
