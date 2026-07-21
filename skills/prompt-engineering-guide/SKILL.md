---
name: prompt-engineering-guide
description: Use when needing AI 모델별 프롬프트 엔지니어링 가이드. /prompt 커맨드와 연동하여 최적화된 프롬프트 생성.
disable-model-invocation: true
---

# AI 프롬프트 엔지니어링 가이드

> 이 가이드는 AI 모델별로 최적화된 프롬프트를 작성하는 방법을 안내합니다.

> See `references/techniques.md` for model-specific XML blocks and detailed patterns
> See `references/frameworks.md` for Context Engineering principles and workflow details
> See `references/examples.md` for Veo and Nano Banana media generation guides

---

## Context Engineering 핵심 원칙

1. **Progressive Disclosure**: 필수 정보만 포함, 부가 정보는 요청 시 제공. 시스템 프롬프트 → 지시사항 → 예시 순서
2. **Attention Budget**: 중요 지시사항은 **시작 또는 끝**에 배치. "Lost in the middle" 현상 방지
3. **Signal-to-Noise Ratio**: 불필요한 서술 제거, 핵심만 유지. 모호한 표현 대신 구체적 지시
4. **Context Quality > Quantity**: 최소 토큰으로 최대 효과. 반복 제거, 핵심만 유지

> See `references/frameworks.md` for 심층 Context Engineering 적용 원칙

---

## 모델별 핵심 전략 요약

| 모델 | 핵심 패턴 | 필수 블록 |
|------|---------|---------|
| **GPT-5.5** (2026-04 공식) | Outcome-first, Markdown 6섹션 | Role / # Personality / # Goal / # Success Criteria / # Constraints / # Output / # Stop Rules |
| **GPT-5.2 / 5.4** (legacy XML) | 간결, 보수적, XML 구조화 | `<output_verbosity_spec>` (항상) |
| **GPT-5.2-Codex** | "Less is more", 최소 프롬프트 | 서문 금지 명시 |
| **Claude 4.5** | 명시적 지시, 맥락 풍부 | `<default_to_action>` |
| **Claude 4.6** | Adaptive Thinking, 간결한 지시 | 과도한 강조 금지 |
| **Gemini 3** | 제약 조건 우선 배치 | Constraints First |
| **Veo 3.1** | 주제+동작+스타일 필수 | 스토리보드 우선 |
| **Nano Banana** | NB Pro: 태그형 / NB2: 서술형 | 5요소 프레임워크 |

> See `references/techniques.md` for detailed per-model patterns and XML blocks

---

## 프롬프트 개선 워크플로우

### Step 1: 초안 작성 (필수)

```
✅ 이 단계를 건너뛰지 마세요

1. 모델 선택 (GPT-5.2, Claude 4.5, Veo 등)
2. 기본 역할/페르소나 정의
3. 핵심 지시사항 3-5개 작성
```

### Step 2: 필수 블록 추가 (필수)

| 모델 | 필수 블록 |
|------|----------|
| **GPT-5.2** | `<output_verbosity_spec>` 항상 포함 |
| **GPT-5.2-Codex** | 최소 프롬프트, 서문 금지 명시 |
| **Claude 4.5** | 명시적 지시, `<default_to_action>` |
| **Veo** | 주제/동작/스타일 필수 |
| **Nano Banana** | 주제 설명/스타일/분위기 |

### Step 3: 목적별 블록 추가 (필수)

| 목적 | 추가할 블록 |
|------|------------|
| **코딩** | `<coding_standards>`, 테스트 규칙 |
| **분석** | `<uncertainty_and_ambiguity>`, 출처 인용 |
| **에이전트** | `<tool_usage_rules>`, 병렬 실행 규칙 |
| **추출** | `<extraction_spec>`, JSON 스키마 |
| **이미지** | 스타일/분위기/구도 명시 |
| **동영상** | 카메라/오디오/부정적 프롬프트 |
| **팩트체크** | IFCN 원칙, 4단계 워크플로우, 판정 등급 |
| **리서치** | 출처 투명성, 최신성 원칙, 구조화된 출력 |

### Step 4: Context Engineering 적용 (필수)

1. **중요 정보 배치 확인**: 시작 또는 끝에 있는가?
2. **불필요한 정보 제거**: 신호 대 잡음 비율 최적화
3. **토큰 효율성 검토**: 반복 제거, 핵심만 유지

### Step 5: 테스트 및 반복 (필수)

```
1. 실제 입력으로 테스트
2. 문제점 발견 시 해당 블록 조정
3. 출력 길이/형식이 기대와 일치하는지 확인
```

### Step 6: 최종 검증 (필수)

```
□ 역할이 명확한가?
□ 모델별 필수 블록이 있는가?
□ 중요 정보가 시작/끝에 있는가?
□ 불필요한 서술이 제거되었는가?
□ 출력 형식이 명시되었는가?
```

### Step 7: 전문가 3인 퇴고 (선택)

**트리거**: "퇴고해줘", "전문가 검토", "상세 퇴고" 요청 시 적용

> See `references/frameworks.md` for 전문가 3인 퇴고 프로세스 상세

---

## 품질 체크리스트 (모델별)

| 모델 | 핵심 체크포인트 |
|------|-----------|
| **GPT-5.2** | `<output_verbosity_spec>` 포함, reasoning_effort 고려 |
| **GPT-5.2-Codex** | "Less is more" 적용, 서문 금지 |
| **Claude 4.5** | 모든 지시 명시적, 암묵적 기대 없음, 액션 기본값 |
| **Gemini 3** | 제약 조건 먼저 배치, 구조화된 출력 |
| **Veo** | 주제/동작/스타일 포함, 스토리보드 먼저 생성 |
| **Nano Banana** | NB2: 서술형 프롬프트 (5요소 프레임워크) |

> See `references/frameworks.md` for 전체 모델별 상세 체크리스트

---

## 프롬프트 생성 워크플로우 (요약)

1. **모델 확인**: 타겟 모델의 특성 파악
2. **포맷 선택**: XML/Markdown/자연어/혼합
3. **구조 설계**: Context Engineering 원칙 적용
4. **블록 조합**: 목적별 필수 블록 추가
5. **상세도 조정**: 출력 길이 지침 추가
6. **검증**: 체크리스트로 품질 확인

---

## 참조 스킬

| 스킬 | 용도 |
|------|------|
| `context-engineering-collection` | 컨텍스트 엔지니어링 원칙 |
| `ce-context-fundamentals` | 기본 원칙 (시스템 프롬프트 구조화) |
| `ce-context-optimization` | 최적화 기법 (토큰 효율성) |
| `gpt-5.5-prompt-enhancement` | GPT 5.x 통합 — outcome-first markdown(5.5) + legacy XML stack(5.4/5.2) |
| `claude-fable-5-prompt-strategies` | Claude 현행 전략 (Fable 5·Opus 4.8·Sonnet 5 — 구세대는 `claude-4.7-prompt-strategies`) |
| `gemini-3.1-prompt-strategies` | Gemini 3 프롬프트 전략 (NB2 포함) |
| `image-prompt-guide` | 이미지 생성 프롬프트 가이드 |
| `research-prompt-guide` | 팩트체크/리서치 프롬프트 가이드 (IFCN 원칙 기반) |
| `expert-domain-priming` | 전문가 DB (12도메인, 60+명) + 프라이밍 가이드 |
| `slide-prompt-guide` | 슬라이드/PPT 프롬프트 가이드 |

---

## Skill Metadata

**Created**: 2025-12-27
**Last Updated**: 2026-03-08
**Author**: Claude Code
**Version**: 2.0.0 (directory split)
