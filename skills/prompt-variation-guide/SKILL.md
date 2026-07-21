---
name: prompt-variation-guide
description: Use when needing AI 프롬프트 변주 가이드. 다양한 프롬프팅 테크닉과 변형 전략 레퍼런스.
disable-model-invocation: true
---

# 프롬프트 생성 다양성 가이드

> **Version**: 1.1.0
> **Created**: 2026-01-08 | **Updated**: 2026-07-21 — 모델 라인업 현행화 (GPT-5.6 Sol · Claude Opus 4.8/Fable 5 · Gemini 3.1)
> **Purpose**: /auto-prompt 에이전트의 프롬프트 생성 다양성 향상
>
> 🆕 **세대 안내**: 본 가이드의 GPT XML 블록 표기(`output_verbosity_spec` 등)는 구 5.2/5.4 세대 스타일 — 사용자가 XML 스타일을 명시할 때만 적용. **현행 GPT-5.6 Sol 디폴트는 Markdown lean outcome-first**(`skills/gpt-5.6-prompt-enhancement.md`). Claude XML 블록은 현행(Opus 4.8·Fable 5)에도 유효.

**이 가이드의 목표**: 동일한 작업이라도 모델별/작업유형별/난이도별로 구조와 표현이 명확히 다른 프롬프트를 생성하는 방법 제공

> See `references/techniques.md` for Variation Decision Matrix, Advanced Patterns, Job Adaptability Guide, /auto-prompt Integration (Part 5)
> See `references/examples.md` for complete before/after examples (교사/변호사/자영업자 3직업 × 4모델 × 3난이도)

---

## Part 1: Universal Framework

### 1.1 4-Layer Prompt Architecture

모든 프롬프트는 다음 4단계 구조를 따릅니다:

```
Layer 1: Role (역할)
   ↓
Layer 2: Context (맥락)
   ↓
Layer 3: Task (작업)
   ↓
Layer 4: Output Format (출력 형식)
```

**난이도별 적용**:
- **Difficulty 1-2**: Layer 1 + Layer 3만 (역할 + 작업)
- **Difficulty 3-5**: 4 layers 모두 포함
- **Difficulty 6-7**: 4 layers + 모델별 특화 XML 블록

### 1.2 Progressive Complexity by Difficulty

| 난이도 | 형식 | 길이 | 구조 | XML 블록 |
|-------|------|------|------|---------|
| **1-2** | 자연어 | 1-3줄 | Role + Task | 없음 |
| **3-5** | Markdown | 5-15줄 | 4 layers + 섹션 구분 | 필수 1개 |
| **6-7** | XML | 20줄+ | 완전한 XML 템플릿 | 필수 2-3개 |

---

## Part 3.3: Model Personality Mapping (핵심 선택 기준)

| 모델 | 성격 | 표현 스타일 | 강조점 |
|------|------|------------|--------|
| **GPT-5.6 Sol** | 결과 중심, lean | Markdown lean outcome-first, 열거 최소화 | 성공 기준 (Success Criteria) + Stop Rules |
| **Claude (Opus 4.8 · Fable 5)** | 명시적, 이유 중심 | 상세, 맥락 풍부 | 맥락 (Context) + 행동 (Action) |
| **Gemini 3.1** | 구조 중심, 단계적 | 계층적, 순서 명확 | 제약 우선 (Constraints First) |
| **Perplexity** | 연구 중심, 출처 기반 | 검색 → 종합 | 워크플로우 (Workflow) + 출처 |

---

## Part 4: Quality Validation

### 4.1 Differentiation Metrics

**모델 간 차별화 검증**:
```
✅ 동일 작업, 동일 난이도에서:
   - 구조가 다른가? (섹션 순서, 블록 종류)
   - 표현 스타일이 다른가? (간결 vs 상세)
   - 강조점이 다른가? (제약 vs 맥락 vs 워크플로우)
   - 특화 XML 블록이 포함되었는가?
```

**작업 유형 반영 검증**:
```
✅ 코딩 작업 → 범위 제약 블록?
✅ 글쓰기 작업 → 문서 구조/톤 명시?
✅ 분석 작업 → 판단 기준/불확실성 처리?
✅ 데이터 처리 → JSON 스키마/필드 설명?
```

### 4.2 Common Anti-Patterns to Avoid

**❌ 실패 패턴**:
```
1. 모든 프롬프트가 동일한 섹션 순서
   → GPT/Claude/Gemini/Perplexity 모두 "역할-작업-형식" 순서

2. 모델별 차이가 문구만 바뀌고 구조 동일
   → "당신은 교사입니다" vs "당신은 변호사입니다"만 다름

3. Gemini인데 Constraints가 중간이나 끝에
   → Gemini는 **반드시** Constraints First

4. Perplexity인데 검색/출처 요청 없음
   → 워크플로우 또는 "검색해주세요" 문구 필수

5. Claude인데 맥락 설명 없음
   → Claude는 "왜 중요한지" 설명 필요

6. GPT인데 Success Criteria/Stop Rules 없음 (난이도 3+)
   → 5.6 Sol Markdown 기준 필수. 구 XML 스타일 명시 요청 시엔 output_verbosity_spec
```

---

## 요약

**핵심 원칙 3가지**:
1. **모델별 차별화**: GPT/Claude/Gemini/Perplexity 각자의 구조적 특성 반영
2. **작업 유형 기반**: 직업과 무관하게 4가지 유형(코딩/글쓰기/분석/데이터)으로 분류
3. **직업 적응성**: 교사/변호사/자영업자 예시를 모든 직업군으로 변환 가능

**이 가이드를 활용하면**:
- ✅ 동일 주제라도 모델마다 구조가 달라짐
- ✅ 작업 유형에 맞는 XML 블록 자동 선택
- ✅ 새로운 직업군도 기존 패턴으로 즉시 대응 가능
