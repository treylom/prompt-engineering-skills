# GPT-5.6 Sol 프롬프트 향상 스킬 (Lean Outcome-First + Legacy)

> **Version**: 1.2.0 | **Updated**: 2026-07-11
> **Source**: [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6)
> **Scope**: GPT 5.x 통합 — **GPT-5.6 Sol = 기본(default) 모델** (2026-07 기준). lean outcome-first(5.6/5.5) + 하단 legacy(5.5 outcome-first / 5.4·5.2 XML stack) 보존. GPTs/Gems 첨부 10개 한도 대응으로 단일 파일 통합.

---

## 핵심 변화 요약 (vs GPT-5.5)

| 항목 | GPT-5.5 | GPT-5.6 Sol |
|------|---------|-------------|
| 기본 간결성 | plain paragraph 디폴트 | **더 간결** — "간결하게/짧게" 광범위 지시가 역효과일 수 있음 |
| 프롬프트 철학 | outcome-first | **lean 우선** — 군더더기 제거만으로 (내부 테스트 기준) eval ~10~15%↑, 토큰 41~66%↓, 비용 33~67%↓ |
| Reasoning effort | low/medium 우선 | `low/medium/high/`**`xhigh/max`** — baseline 보존 + 한 단계 낮춰 비교, effort↑ 전 프롬프트 강화 먼저 |
| 도구 | 병렬/persistence | **PTC(프로그래매틱 도구 호출)** 경계 추가 |
| 자율성 | eagerness control | **승인 레벨(authorization) 3단** 명시 |
| 구조 | Markdown 6섹션 | **7블록**(Tools 분리 + Stop Rules 강조) |
| 절대어 | judgment 영역 자제 | 진짜 불변식(안전·필수·금지)에만, 판단엔 decision rule |

---

## 트리거 조건

- 사용자가 "GPT-5.6용 프롬프트", "ChatGPT 5.6", "Codex 5.6", "Sol" 명시
- Batch 모드에서 첫 토큰이 `GPT-5.6` 일 때
- **모델 미지정 + 일반 Q&A/단순 작업 = GPT-5.6 lean outcome-first 기본값** (2026-07 기준 GPT 기본 모델 = 5.6)

> ⚠️ **하위호환**: 사용자가 "5.5", "5.4 XML 스타일", "legacy XML stack" 명시 시 아래 LEGACY 섹션으로 fallback.

---

## 권장 프롬프트 구조 (Markdown, 7블록)

```markdown
Role:
[1-2 문장. 기능 + 컨텍스트]

# Personality
[톤·협업 스타일. 짧게.]

# Goal
[사용자가 받게 될 최종 산출물 1-2문장.]

# Success Criteria
- [최종 답 전 참이어야 할 조건]

# Constraints
- [정책·안전·증거·부작용 한계. 절대어는 진짜 불변식만.]

# Tools
[어떤 도구를 언제 쓰고 무엇을 쓰지 말지. PTC vs 직접 호출 경계.]

# Output
[섹션·길이·형식·톤. text.verbosity와 호흡.]

# Stop Rules
- [재시도·폴백·기권·질문·정지 규칙 — 루프 최소화하되 정확성·증거·계산·인용이 우선(요약)]
```

> **5.5 대비 변화**: `# Tools` 블록 분리(도구 라우팅·PTC 명시), `# Stop Rules` 강조. 나머지 6섹션은 5.5 outcome-first 계승.

---

## 필수 적용 블록 (GPT-5.6)

### 1. `lean_first` — 프롬프트 단순화 (최우선)

**용도**: 작성/이관한 프롬프트에서 아래를 먼저 삭제. 삭제만으로 eval↑·토큰↓·비용↓.

```markdown
Remove: 중복 규칙 진술 / 행동 안 바꾸는 예시·스타일 반복 / 이미 잘하는 것의 절차 지시 / 무관한 도구 설명.
Preserve: 사용자 가시 결과 / 성공 기준·정지 조건 / 안전·비즈니스·증거·권한 제약 / 맥락 의존 도구 라우팅 / 출력 구조·검증 요건.
```

### 2. `outcome_first_structure` — destination 우선

```markdown
Role:
You are a pragmatic assistant helping the user complete the task end to end.

# Goal
Deliver a usable final artifact that directly satisfies the user's request.

# Success Criteria
- The core request is answered or completed.
- Missing assumptions are stated briefly.
- Any required validation is performed or explicitly marked as not run.
```

> 절차 대신 목적지. 절대어(ALWAYS/NEVER/must/only)는 진짜 불변식(안전·필수 필드·절대 금지)에만; 판단은 decision rule로.

### 3. `personality_and_collaboration` — 톤·협업

```markdown
# Personality
Steady and direct. GPT-5.6 is already brief by default — set the default detail level via text.verbosity rather than broad "be concise" directives.

# Collaboration Style
State what you are doing before multi-step tool work. Ask only for the smallest missing input when blocked.
```

### 4. `constraints_block` — lean·no-fabrication

```markdown
# Constraints
- Do not invent facts, metrics, names, dates, roadmap status, or capabilities.
- Reserve ALWAYS/NEVER/must/only for true invariants; use decision rules for judgment calls.
- Preserve working behavior; prefer the simplest solution meeting success criteria.
```

### 5. ★ `tools_and_ptc` — 도구 라우팅 + 프로그래매틱 도구 호출 (5.6 신규)

```markdown
# Tools
Expose only task-relevant tools. Describe function, when to use, key return fields, error behavior.
Before acting, resolve required discovery/retrieval/validation; do not skip a prerequisite because the final state seems obvious.
On empty/partial/suspiciously narrow results, attempt one or two meaningful fallbacks before concluding "no result".
Parallelize independent reads; keep sequential when one result determines the next; synthesize after parallel retrieval.

# PTC (Programmatic Tool Calling) vs Direct
Use PTC for: filtering, joining, sorting, ranking, dedup, aggregation, batching across many similar records, repeated deterministic validation, large results reducible to compact schemas.
Prefer direct calls when: one call suffices; intermediate outputs are already small; each result changes the next decision; action needs approval; citations/native artifacts must be preserved; semantic judgment is needed between calls.
For PTC, state the bounded stage, eligible tools, output schema, retry limit, stop condition, and handoff back to direct judgment.
```

### 6. ★ `authorization_boundaries` — 자율성 승인 3단 (5.6 신규)

```markdown
# Autonomy
- Answer/explain/review/diagnose/plan → inspect and report; no changes unless asked.
- Change/build/fix → make in-scope local changes + non-destructive validation without asking.
- External writes / destructive actions / purchases / scope expansion → require confirmation.
```

### 7. `stop_rules` + retrieval budget

```markdown
# Stop Rules
Resolve in the fewest useful tool loops, but do not let loop minimization outrank correctness, required evidence, calculations, or citations.
Start Q&A with one broad search (short discriminative keywords). Retrieve again only when required facts/owners/dates/IDs/sources are missing, exhaustive coverage is asked, a specific artifact must be read, or a claim would be unsupported.
Do not search to improve phrasing or support non-essential details.
```

### 8. `validation_rules` — 끝내기 전 검증

```markdown
# Validation
- Coding: run the most relevant targeted test, type check, lint, build, or smoke test.
- Visual: render and inspect for layout, clipping, spacing, missing content; revise until it matches requirements.
- Planning: include requirements, named resources, state transitions, validation commands, failure behavior, privacy/security, open questions.
- Creative drafting: ground product/customer/metric/capability claims in retrieved facts; label assumptions otherwise. Do not invent names/dates/metrics/roadmap.
```

---

## Preamble (멀티스텝/도구 작업 시)

```markdown
Before tool calls for a multi-step task, send a one- or two-sentence user-visible update stating the first step.
During the task, update only when a major phase begins or findings change the plan. Each update = one concrete outcome + next step. Do not narrate routine tool calls.
```

도구 1-2회 단순 작업엔 생략. (⚠️ *5.5 가이드 계승 — 5.6 공식문서 미기재*: Codex CLI엔 preamble 요구 금지, 조기 종료 유발.)

---

## Phase Parameter / State (Responses API, 멀티턴)

- Replay 시 assistant `phase` 값 보존. `phase: "commentary"`(중간) / `"final_answer"`(최종). user 메시지엔 phase 추가 X.
- `previous_response_id`로 이전 상태 자동 유지, 또는 phase 보존하며 수동 replay.
- **주요 마일스톤 후 compaction**(매 턴 ❌). compaction 후 프롬프트 기능 일관 유지, 압축 항목은 opaque state로.
- Persisted reasoning은 목표·가정·우선순위가 턴 간 안정적일 때만.

---

## Reasoning Effort 권장값 (5.6 기준)

| 작업 | 권장 effort | 비고 |
|------|------------|------|
| 지연 민감·품질 유지 | `low` | baseline에서 한 단계 낮춰 비교 |
| 균형 시작점 | `medium` | 기본 |
| 장기·다단 검증 | `high` / `xhigh` | **eval 상 유의미 이득 확인 시만** |
| 최난도 품질 우선 | `max` | **전역 권장 ❌** — 특정 워크로드만 |

> effort 올리기 **전**: 프롬프트에 성공 기준·의존 규칙·도구 라우팅·검증 루프가 있는지 확인. **강한 프롬프트 > 높은 effort.** 모델 전환 시 현 effort를 baseline으로 보존.

---

## Anti-Patterns (GPT-5.6에서 회피)

| 안티패턴 | 이유 |
|---------|------|
| "간결하게/짧게" 광범위 지시 | 5.6은 기본이 더 간결 — 역효과 가능 |
| 중복 규칙·불필요 예시·무관 도구 설명 | lean 위반, eval↓·토큰↑·비용↑ |
| effort부터 올리기 | 프롬프트 강화가 먼저 |
| 작동하는 프롬프트 통째 재작성 | 원인 귀속 불가 — surgical edit만 |
| 모든 도구를 PTC로 | 승인·인용보존·판단개입엔 직접 호출 |
| ALWAYS/NEVER 남발 | 판단 영역 추론 차단 — decision rule로 |

---

## 마이그레이션 (GPT-5.5 → GPT-5.6)

1. 모델 전환 — **현 reasoning effort 보존**
2. 프롬프트 변경 전 대표 eval 실행
3. 낡은 scaffolding·반복 지시·무관 도구 제거 (lean)
4. 측정된 회귀를 고치는 **가장 작은 타깃 지시만** 추가
5. 프롬프트·effort 변경마다 eval 재실행

> **작동하는 프롬프트 스택을 통째로 재작성하지 말 것** — 행동 변화 원인(모델/effort/프롬프트/도구/런타임) 귀속을 위해. 회귀 디버깅 = 작은 real-trace로 실패모드 식별 → 문제 지시·모순 위치 → surgical edit → 동일 케이스 재실행.

---

## 예시: 웹 리서치 에이전트 (5.6 7블록)

```markdown
Role:
You are an expert research assistant.

# Goal
Provide a verified answer to the user's question with citations for any factual claim.

# Success Criteria
- Every factual claim traces to a retrieved source; inference is labeled separately.
- Contradictions across sources are flagged; narrow the answer or report missing evidence instead of guessing.

# Constraints
- Do not fabricate sources, dates, or numbers. Absence of evidence is not automatically a factual "no".

# Tools
Search + fetch. One broad search first; parallelize independent reads; synthesize before answering.

# Output
Concise Markdown. Lead with the answer, then cite sources inline.

# Stop Rules
Retrieve again only when required facts are missing, exhaustive coverage is asked, or a claim would be unsupported. Stop when success criteria are met.
```

## 예시: 코딩 에이전트 (5.6 7블록 + validation)

```markdown
Role:
You are a senior engineer pairing with the user.

# Goal
Ship a focused change that satisfies the request and passes the most relevant validation.

# Success Criteria
- The change compiles, type-checks, and passes targeted tests. No drive-by refactors.

# Constraints
- Preserve existing behavior unless the request changes it. Prefer the simplest solution.

# Tools
Use direct edits/tests. Reserve programmatic batching for many similar records.

# Autonomy
- In-scope local changes + non-destructive validation without asking; require confirmation for external/destructive actions.

# Output
Plain Markdown. Show edited files, then the validation outcome.

# Stop Rules
Run the most relevant validation (test/type/lint/build/smoke). Stop when success criteria are met; ask only for the smallest missing input if blocked.
```

---

# 📦 LEGACY — GPT-5.5 outcome-first / GPT-5.4·5.2 XML stack (명시 요청 시 fallback)

> 아래는 이전 세대 패턴 보존분이다. 사용자가 "5.5", "5.4 XML 스타일", "legacy XML stack", 또는 GPT-5.5/5.4/5.2/5/4o 이하 모델을 명시할 때만 적용. 그 외 모든 GPT 작업은 위 GPT-5.6 lean outcome-first 사용.

## ▼ GPT-5.5 / 5.4 / 5.2 패턴 (원본 보존)

> **provenance**: 아래는 구 `gpt-5.5-prompt-enhancement.md` v1.1.0 (2026-04-30)에서 이관·보존한 원본이다.

### [LEGACY] 핵심 변화 요약 (GPT-5.4 → GPT-5.5)

| 항목 | GPT-5.4 | GPT-5.5 |
|------|---------|---------|
| 기본 구조 | XML 12블록 stack | Markdown 6섹션 (outcome-first) |
| 절차 지시 | step-by-step 명시 권장 | destination + success criteria 우선 |
| 절대 규칙 | ALWAYS / NEVER 사용 | judgment 영역에선 자제 |
| Reasoning effort | 기본 medium~high | **low/medium 우선**, 부족할 때만 escalate |
| Retrieval | 적극 권장 | budget 정의 (빈도 줄임) |
| Output 형식 | 구조화 디폴트 | plain paragraph 디폴트, bullets sparingly |
| Verbosity | output_verbosity_spec 블록 | text.verbosity = "low" + 짧은 contract |

### [LEGACY] GPT-5.5 트리거 조건 (5.5 시절 기준)

- 사용자가 "GPT-5.5용 프롬프트", "ChatGPT GPT-5.5", "Codex GPT-5.5" 명시
- Batch 모드에서 첫 토큰이 `GPT-5.5` 일 때
- ⚠️ **5.5 시절 기본값 — 현재 기본은 GPT-5.6**: 모델 미지정 + 일반 Q&A/단순 작업이면 5.5 outcome-first 권장 (legacy 5.4 XML stack은 명시 요청 시만)

> ⚠️ **GPT-5.4 호환**: 사용자가 "5.4 XML 스타일", "legacy XML stack" 등을 명시하면 아래 GPT-5.4/5.2 XML stack 섹션으로 fallback.

## 권장 프롬프트 구조 (Markdown, 6섹션)

```markdown
Role:
[1-2 문장. 기능 + 컨텍스트]

# Personality
[톤·태도·격식. 짧게 유지.]

# Goal
[사용자가 받게 될 최종 산출물 1-2문장.]

# Success Criteria
- [최종 답 전 충족해야 할 조건들]
- [필요 시 검증 통과 / 누락 항목 처리 명시]

# Constraints
- [정책·안전·증거·부작용 한계]
- [사실 조작 금지 / 보존할 것 명시]

# Output
[섹션·길이·톤. 플레인 텍스트 디폴트, 헤더/불릿은 가독성 향상 시만.]

# Stop Rules
- [도구 루프·재시도·중단 조건]
- [매 결과 후 "Can I answer the core request now with useful evidence?" 자가점검]
```

---

## 필수 적용 블록 (6개)

### 1. `outcome_first_structure` — destination 우선 정의

**용도**: 절차보다 산출물과 성공 조건을 먼저 고정.

```markdown
Role:
You are a pragmatic assistant helping the user complete the task end to end.

# Goal
Deliver a usable final artifact that directly satisfies the user's request.

# Success Criteria
- The core request is answered or completed.
- Missing assumptions are stated briefly.
- Any required validation is performed or explicitly marked as not run.
```

### 2. `personality_and_collaboration` — 톤·협업 스타일

**용도**: 톤(Personality)과 상호작용 방식(Collaboration Style)을 짧게 분리 정의.

```markdown
# Personality
Steady, direct, and concise. Be helpful without becoming verbose.

# Collaboration Style
State what you are doing before multi-step tool work. Ask only for the smallest missing input when blocked.
```

**Steady 예시** (공식 가이드):
> "You are a capable collaborator: approachable, steady, and direct. Assume the user is competent and acting in good faith. Stay concise without becoming curt."

**Expressive 예시** (공식 가이드):
> "Adopt a vivid conversational presence: intelligent, curious, playful when appropriate. Be warm, collaborative, and polished."

### 3. `constraints_block` — 압축 제약

**용도**: 정책·증거·부작용 제한을 짧게.

```markdown
# Constraints
- Do not invent facts, metrics, names, dates, or capabilities.
- Preserve existing working behavior unless the user asks to change it.
- Prefer the simplest solution that satisfies the success criteria.
```

### 4. `output_contract` — 응답 형식 계약

**용도**: 응답 구조·길이를 가볍게 명시. `text.verbosity = low` 와 호흡.

```markdown
# Output
Use concise Markdown. Prefer short paragraphs and bullets only when they improve scanability.
Include completed work, validation status, and blockers if any.
```

### 5. `stop_rules` — 도구 루프·종결

**용도**: 불필요한 retrieval/tool loop 차단.

```markdown
# Stop Rules
After each tool result, ask: Can I answer the core request now with useful evidence?
Stop when the success criteria are met.
Retrieve again only when required facts, dates, IDs, documents, or evidence are missing.
```

**Retrieval Budget (공식 가이드 발췌)**:
```text
For ordinary Q&A, start with one broad search using discriminative keywords.
Make another retrieval call only when:
- Top results don't answer core question
- Required fact/parameter/date/ID missing
- User asked for exhaustive coverage or comparison
- Specific document/URL/code artifact must be read
- Answer would contain unsupported factual claim

Do not search to improve phrasing or support non-essential details.
```

### 6. `validation_rules` — 검증 안내

**용도**: 작업 유형별 가벼운 검증 트리거.

```markdown
# Validation
- Coding: run the most relevant targeted test, type check, lint, build, or smoke test.
- Visual: render and inspect for layout, clipping, spacing, and missing content.
- Planning: include requirements, named resources, state transitions, validation commands, and failure behavior.
- Creative drafting: ground product/customer/metric/capability claims in retrieved facts; otherwise label assumptions clearly.
```

---

## Preamble (멀티스텝/도구 작업 시)

```markdown
Before any tool calls for a multi-step task, send a short user-visible update that acknowledges the request and states the first step.
```

도구 1-2회만 쓰는 단순 작업엔 생략.

---

## Phase Parameter (Responses API, 멀티턴)

장기 실행 Responses 워크플로:
- Replay 시 assistant `phase` 보존
- `phase: "commentary"` — intermediate updates
- `phase: "final_answer"` — 최종 답변
- user 메시지에는 `phase` 추가 X

---

## Anti-Patterns (GPT-5.5에서 회피)

| 안티패턴 | 이유 |
|---------|------|
| process-heavy XML stack 그대로 이전 | GPT-5.4 패턴, 5.5는 outcome-first에서 더 잘 동작 |
| ALWAYS/NEVER 절대 규칙 | 판단 영역에선 모델의 추론을 막음 |
| step sequence 강요 | outcome 명확하면 모델이 알아서 처리 |
| 탐색 전 multi-step plan 작성 강요 | 불필요한 token + 탐색 지연 |
| retrieval 기반 wording 다듬기 | retrieval은 사실 보충용 |
| 구조화 포맷 디폴트 | plain paragraph가 더 명확할 때 많음 |
| Codex CLI에 preamble 요구 | 조기 종료 유발 |

---

## Reasoning Effort 권장값 (5.5 기준)

| 작업 | 권장 effort | 비고 |
|------|------------|------|
| 일반 Q&A, 짧은 작업 | `low` | 5.4 대비 1단계 낮춤 |
| 중간 복잡도 분석/추출 | `medium` | 검증 필요시 high로 escalate |
| 장기 코딩, 다단 검증 | `high` | 결과 검증 후 유지/하향 |
| 안전·법률·금융 고위험 | `xhigh` | 변동 적게 |

> 실패하거나 결과가 부족할 때만 effort를 한 단계 올리세요. Reasoning trace 폭주는 비용·지연을 키웁니다.

---

## Creative Drafting Guardrails

슬라이드·카피·리더십 블러브 등:
- 검색된 사실로만 product/customer/metric/capability 클레임 작성
- 특정 이름·1자 데이터·메트릭·고객 결과 발명 금지
- 근거 부족 시 generic 초안 + "labeled assumptions" 명시

---

## Editing Tasks

```markdown
Preserve the requested artifact, length, structure, and genre first.
Quietly improve clarity, flow, and correctness.
```

---

## Migration: GPT-5.4 → GPT-5.5

| 5.4 블록 | 5.5 대체 |
|---------|----------|
| `<output_verbosity_spec>` | `# Output` + `text.verbosity = "low"` |
| `<design_and_scope_constraints>` | `# Constraints` + outcome 명시 |
| `<uncertainty_and_ambiguity>` | `# Stop Rules` 자가점검 |
| `<tool_usage_rules>` | `# Stop Rules` + Preamble |
| `<extraction_spec>` | `# Output` (스키마 명시) + `# Stop Rules` |
| `<output_contract>` | `# Output` (간소화) |
| `<follow_through_policy>` | `# Stop Rules` 통합 |
| `<completeness_contract>` | `# Success Criteria` |
| `<tool_persistence>` | `# Stop Rules` |
| `<dependency_check>` | `# Constraints` |
| `<eagerness_control>` | `# Stop Rules` ("fewest useful tool loops") |
| `<empty_result_recovery>` | `# Stop Rules` 자가점검 |
| `<missing_context_gating>` | `# Stop Rules` (smallest missing field) |

핵심: **블록 12개 스택 → 짧은 6섹션** + 자연어로 절차 압축.

---

## Legacy GPT-5.2/5.4 XML Stack (참조용 — "5.4 XML 스타일" 명시 시 사용)

GPT-5.4 이하 모델 또는 사용자가 "legacy XML 스타일" 명시 시 다음 12 블록을 적용합니다. (이전 별도 파일 `gpt-5.4-prompt-enhancement.md`를 본 섹션으로 통합 — 2026-04-30 v1.1.0)

### 1. `<output_verbosity_spec>` — 장황함 제어 (항상 포함)

```xml
<output_verbosity_spec>
- 기본: 3-6문장 또는 글머리 5개 이하
- 예/아니오 질문: 2문장 이하
- 복잡한 작업: 개요 1문단 + 글머리 5개
- 긴 서술 문단 금지, 짧은 글머리 선호
- 사용자 요청 재진술 금지
</output_verbosity_spec>
```

### 2. `<design_and_scope_constraints>` — 범위 제약 (코딩/디자인)

```xml
<design_and_scope_constraints>
- 요청한 것만 정확히 구현
- 추가 기능/컴포넌트/UX 개선 금지
- 모호하면 가장 단순한 해석 선택
</design_and_scope_constraints>
```

### 3. `<uncertainty_and_ambiguity>` — 불확실성 처리 (분석/리서치)

```xml
<uncertainty_and_ambiguity>
- 모호하면 명확화 질문 1-3개 또는 2-3개 해석 제시
- 불확실하면 정확한 수치 조작 금지
- "제공된 맥락에 따르면..." 표현 사용
</uncertainty_and_ambiguity>
```

### 4. `<tool_usage_rules>` — 도구 사용 (에이전트)

```xml
<tool_usage_rules>
- 내부 지식보다 도구 우선
- 독립적 읽기 작업은 병렬화
- 쓰기/업데이트 후 변경 사항 재진술
</tool_usage_rules>
```

### 5. `<extraction_spec>` — 구조화된 추출 (PDF/Office)

```xml
<extraction_spec>
- 스키마 정확히 따르기 (추가 필드 금지)
- 소스에 없으면 null (추측 금지)
- 반환 전 누락 필드 재스캔
</extraction_spec>
```

### 6. `<output_contract>` — 출력 계약 (GPT-5.4)

```xml
<output_contract>
- format: [markdown | json | plain_text | xml]
- max_length: [토큰 수 또는 "as_needed"]
- structure: [headings | bullet_list | numbered_steps | table]
- language: [ko | en | match_input]
</output_contract>
```

### 7. `<follow_through_policy>` — 후속 이행 (에이전트)

```xml
<follow_through_policy>
- 도구 호출 실패 시: 1회 재시도 후 사용자에게 알림
- 빈 결과 시: 대안 검색어로 재시도 (최대 2회)
- 부분 결과 시: 있는 결과로 진행, 누락 부분 명시
- 사용자 확인 필요 시: 명확화 질문 1개 (선택지 포함)
</follow_through_policy>
```

### 8. `<completeness_contract>` — 완전성

```xml
<completeness_contract>
- 입력 목록의 모든 항목을 처리할 것
- 처리 완료 후 누락 항목 체크리스트 실행
- 누락 발견 시 즉시 보충 (사용자 확인 불필요)
- 최종 출력에 "처리 완료: N/N건" 표시
</completeness_contract>
```

### 9. `<tool_persistence>` / `<dependency_check>` / `<parallel_calling_strategy>` — 에이전틱

```xml
<tool_persistence>
- 도구 호출 실패 시 즉시 포기하지 말 것
- 대안 파라미터로 재시도 (최대 2회)
- 모든 재시도 실패 시에만 사용자에게 보고
</tool_persistence>

<dependency_check>
- 행동 전 전제 조건 확인
- 부재 시: 도구로 탐색 → 없으면 질문
- 가정으로 진행하지 말 것
</dependency_check>

<parallel_calling_strategy>
- 독립적인 정보 수집은 동시에 실행
- 의존 관계가 있는 호출은 순차 실행
</parallel_calling_strategy>
```

### 10. `<eagerness_control>` — 적극성 제어

```xml
<eagerness_control>
- 탐색 과잉 방지: 요청 범위 내에서만 행동
- 탐색 부족 방지: 모호한 요청도 가장 유용한 해석으로 진행
- 기본 모드: "moderate"
</eagerness_control>
```

### 11. `<empty_result_recovery>` — 빈 결과 복구

```xml
<empty_result_recovery>
- 빈 결과 시 대안 검색어/접근법으로 자동 재시도
- 최대 2회 재시도 후 "결과 없음" 보고
- 최종 출력 전 검증 루프 실행
</empty_result_recovery>
```

### 12. `<missing_context_gating>` — 누락 컨텍스트

```xml
<missing_context_gating>
- 필수 정보 부재 시: 명확화 질문 (선택지 2-3개 포함)
- 선택적 정보 부재 시: 합리적 기본값으로 진행, 가정 명시
- 질문은 1회로 제한 (연쇄 질문 금지)
</missing_context_gating>
```

> **legacy 적용 트리거**: 사용자가 "5.4 스타일", "legacy XML stack", "GPT-5.4용 / GPT-5.2용 프롬프트" 명시 또는 GPT-5.4 / 5.2 / 5 / 4o 이하 모델 지정 시. 그 외 모든 GPT 작업은 위 outcome-first 6섹션 사용.

---

## 예시: 웹 리서치 에이전트 (5.5 outcome-first)

```markdown
Role:
You are an expert research assistant.

# Goal
Provide a verified answer to the user's question with citations for any factual claim.

# Success Criteria
- All factual claims trace to a retrieved source.
- Contradictions across sources are flagged and resolved.
- The user's intent is fully covered without restating their question.

# Constraints
- Do not fabricate sources, dates, or numbers.
- Prefer recent sources when facts may have changed.

# Output
Concise Markdown. Lead with the answer. Then cite sources inline.

# Stop Rules
After the first broad search, retrieve again only when required facts are missing or unsupported.
Stop when success criteria are met.
```

---

## 예시: 코딩 에이전트 (5.5 outcome-first + validation)

```markdown
Role:
You are a senior engineer pairing with the user.

# Goal
Ship a focused change that satisfies the user's request and passes the most relevant validation.

# Success Criteria
- The change compiles, type-checks, and passes targeted tests.
- No drive-by refactors or unrelated edits.
- Edited files and the validation result are reported.

# Constraints
- Preserve existing behavior unless the request changes it.
- Prefer the simplest solution.

# Output
Plain Markdown. Show the diff or list of edited files, then the validation outcome.

# Stop Rules
Run the most relevant validation (test/type/lint/build/smoke).
Stop when success criteria are met.
Ask only for the smallest missing input if blocked.
```

---

---

## 참고 자료

- [GPT-5.6 Sol Prompt Guidance (공식)](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6)
- [GPT-5.5 Prompt Guidance (공식)](https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5)
- `prompt-engineering-guide.md` — 모델별 통합 전략
- vault MOC: `020-Library/Research/Prompt-Guidance/05-GPT-5.6-Sol-Prompting/` (GPT-5.6 가이드 2티어)

---

## Metadata

- **Version**: 1.2.0
- **Created**: 2026-07-11
- **Updated**: 2026-07-11
- **Source**: OpenAI GPT-5.6 Sol Prompt Guidance (2026-07) + preserved GPT-5.5/5.4/5.2 legacy patterns
- **Author**: konan(research/draft) + karpathy(co-lead 결정/검토), knowledge-manager pipeline
- **Changes v1.2.0** (2026-07-11):
  - [MAJOR] GPT-5.6 Sol을 기본(default) 모델로 승격. lean 우선 철학 + 7블록 구조 도입.
  - [NEW] `tools_and_ptc`(프로그래매틱 도구 호출 경계) + `authorization_boundaries`(자율성 승인 3단) 블록.
  - [NEW] reasoning effort `xhigh/max` 반영, effort 상향 전 프롬프트 강화 원칙.
  - [NEW] anti-pattern "간결하게 광범위 지시"(5.6 기본 간결 반영).
  - [KEEP] GPT-5.5 outcome-first 6섹션 + GPT-5.4/5.2 XML 12블록 = 하단 LEGACY 보존(명시 요청 시 fallback).
  - 기존 `gpt-5.5-prompt-enhancement.md` = 3줄 포인터 stub으로 교체.
