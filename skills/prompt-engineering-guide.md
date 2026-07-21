---
name: prompt-engineering-guide
description: 단일 통합 AI 프롬프트 엔지니어링 스킬. 모델별 전략, 이미지/동영상, 리서치/팩트체크, 슬라이드, 전문가 도메인 프라이밍, Context Engineering을 모두 이 파일에서 관리합니다.
version: 3.1.0
updated: 2026-07-21
---

# AI 프롬프트 엔지니어링 통합 가이드

> 이 가이드는 AI 모델별로 최적화된 프롬프트를 작성하는 방법을 안내합니다.
> 전문 용어가 어렵다면 아래 "용어 해설" 섹션을 먼저 확인하세요.

---

## 단일 스킬 운영 원칙

이 파일이 프롬프트 엔지니어링 계열의 단일 권원입니다. 기존에 분리되어 있던 모델별 전략, 이미지/동영상 프롬프트, 리서치/팩트체크, 슬라이드 프롬프트, 전문가 도메인 프라이밍, Context Engineering 원칙은 모두 이 파일 안의 섹션과 통합 부록으로 관리합니다.

| 영역 | 이 파일에서 볼 위치 |
|------|-------------------|
| GPT 5.x (**5.6 Sol = 기본**) | 모델별 프롬프트 전략 → GPT-5.6 / 5.5 / 5.2 / legacy XML |
| Claude (**Opus 4.8 = 기본** · Fable 5 · Sonnet 5 / 구세대 4.x) | 모델별 프롬프트 전략 → Claude 및 통합 부록의 Claude 전략 |
| Gemini / Veo / 이미지 | Gemini, Nano Banana, 이미지/동영상 통합 부록 |
| 리서치 / 팩트체크 | 목적별 추가 블록, 글쓰기/리서치 개요, 리서치 통합 부록 |
| 슬라이드 / PPT | 중간 구조화 워크플로우, 슬라이드 통합 부록 |
| 전문가 프라이밍 | Expert Domain Priming 섹션과 전문가 DB 통합 부록 |
| Context Engineering | Context Engineering 원칙 적용, 심층 통합, CE 통합 부록 |

운영 규칙:
- `skills/`에는 이 파일 하나만 둡니다.
- GPTs/Gems 지식 파일 업로드도 이 파일 하나만 사용합니다.
- 새 모델/워크플로우가 추가되면 새 스킬 파일을 만들지 말고 이 파일의 관련 섹션에 병합합니다.
- `/prompt`와 `/prompt-sync`는 이 단일 파일을 기준으로 섹션을 라우팅합니다.

---

## 용어 해설 (Glossary)

이 가이드에서 자주 등장하는 전문 용어를 쉽게 설명합니다.

### 기본 용어

| 용어 | 쉬운 설명 | 비유 |
|------|----------|------|
| **프롬프트 (Prompt)** | AI에게 주는 지시문/질문 | 주문서 |
| **토큰 (Token)** | AI가 텍스트를 처리하는 단위 (한글 1글자 ≈ 1-2토큰) | 글자 조각 |
| **컨텍스트 (Context)** | AI가 현재 기억하고 있는 대화 내용 전체 | 대화 기억 |
| **시스템 프롬프트** | AI의 역할과 규칙을 정하는 지시문 | 직원 매뉴얼 |

### 고급 용어

| 용어 | 쉬운 설명 | 왜 중요한가? |
|------|----------|-------------|
| **Context Engineering** | AI에게 주는 정보를 효율적으로 구성하는 기술 | 같은 질문도 어떻게 물어보느냐에 따라 답이 달라짐 |
| **Progressive Disclosure** | 필요한 정보를 단계별로 제공하는 방식 | 한 번에 너무 많은 정보를 주면 AI가 혼란스러워함 |
| **Attention Budget** | AI가 한 번에 집중할 수 있는 정보량의 한계 | 사람처럼 AI도 긴 글의 중간은 잘 기억 못함 |
| **Signal-to-Noise Ratio** | 중요 정보 vs 불필요 정보의 비율 | 핵심만 전달해야 정확한 답을 받음 |
| **Lost-in-Middle** | AI가 긴 글의 중간 내용을 잘 기억하지 못하는 현상 | 중요한 건 처음이나 끝에 배치해야 함 |

### 모델별 용어

| 용어 | 해당 모델 | 쉬운 설명 |
|------|----------|----------|
| **reasoning_effort** | GPT-5.2 | AI가 생각하는 깊이 조절 (none~xhigh) |
| **Extended Thinking** | Claude 4.5 | AI가 더 깊이 생각하게 하는 기능 |
| **Adaptive Thinking** | Claude 4.6 | 모델이 자율적으로 사고 깊이를 결정하는 기능 |
| **Effort Parameter** | Claude 4.6 | 응답 상세도 제어 (low/medium/high/max) |
| **Compaction** | GPT-5.2, Claude 4.6 | 대화 내용을 요약해서 토큰을 절약하는 기능 |
| **Anti-Prompting** | GPT-5.2-Codex | 하지 말아야 할 프롬프팅 패턴 |
| **Scaffolding** | 전체 | 단계별로 구조화해서 접근하는 방법 |

### XML 태그 용어

GPT-5.2에서 자주 사용하는 XML 태그들:

| 태그 | 목적 | 언제 사용? |
|------|------|-----------|
| `<output_verbosity_spec>` | 응답 길이 제어 | **항상** (가장 중요!) |
| `<design_and_scope_constraints>` | 범위 벗어남 방지 | 코딩/디자인 |
| `<uncertainty_and_ambiguity>` | 불확실할 때 행동 규칙 | 분석/리서치 |
| `<tool_usage_rules>` | 도구 사용 규칙 | 에이전트/자동화 |
| `<default_to_action>` | 질문 대신 행동 우선 | Claude 에이전트 |
| `<investigate_before_answering>` | 환각 방지 (코드 탐색 필수) | Claude 코딩/분석 |
| `<avoid_overengineering>` | 과잉 구현 방지 | Claude 에이전트 |
| `<frontend_aesthetics>` | UI 디자인 가이드 | Claude 프론트엔드 |
| `<output_contract>` | 출력 형식/길이/구조 계약 | GPT-5.4 에이전트 |
| `<follow_through_policy>` | 도구 호출 지속성 규칙 | GPT-5.4 에이전트 |
| `<completeness_contract>` | 모든 항목 처리 보장 | GPT-5.4 에이전트 |
| `<tool_persistence>` | 도구 실패 시 재시도 규칙 | GPT-5.4 에이전트 |
| `<eagerness_control>` | 탐색 적극성 양방향 제어 | GPT-5.4 에이전트 |

> **Claude 4.5/4.6 XML 구조 상세**: `prompt-engineering-guide.md` 스킬의 Part 12 참조
> **GPT-5.4 에이전틱 패턴 상세**: `prompt-engineering-guide.md` 하단 "Legacy GPT-5.2/5.4 XML Stack" 섹션 참조

---

## Context Engineering 원칙 적용

`prompt-engineering-guide` 스킬의 핵심 원칙을 프롬프트 생성에 적용합니다.

### 1. Progressive Disclosure
- 프롬프트를 섹션별로 구조화
- 필수 정보만 포함, 부가 정보는 요청 시 제공
- 시스템 프롬프트 → 지시사항 → 예시 순서

### 2. Attention Budget 관리
- 중요 지시사항은 **시작 또는 끝**에 배치
- 중간 부분에는 맥락/배경 정보 배치
- "Lost in the middle" 현상 방지

### 3. Signal-to-Noise Ratio 최적화
- 불필요한 서술 제거
- 핵심 지시사항만 포함
- 모호한 표현 대신 구체적 지시

### 4. Context Quality > Quantity
- 최소 토큰으로 최대 효과
- 반복 제거, 핵심만 유지
- 명확한 구조로 파싱 용이성 확보

---

## Expert Domain Priming (전문가 도메인 프라이밍)

> **"act as an expert" 대신 실제 전문가를 지명하고, 그들의 전문 용어를 사용하라**

### 원칙

1. **실제 전문가 지명** → LLM 잠재 공간의 전문 영역 활성화 (MoE 라우팅 시그널)
2. **전문 용어 사용** → 문제 공간 축소 (정보의 좌표를 정확히 찍음)
3. **금지어 제거**: 알아서잘, 깔끔하게, 대충, 자세히, 완벽하게, 적당히
4. **단어의 5가지 역할 점검**: 범위(Target Scope) / 목적(Goal) / 형식(Format) / 금지(No-Go) / 행동(Behavior)

### 적용 (5단계)

```
Step 1: 도메인 식별 → Step 2: 전문가 2-3명 조회 → Step 3: 핵심 용어 추출
→ Step 4: 프롬프트에 삽입 → Step 5: 5가지 역할 체크리스트 점검
```

### 참조 스킬

| 스킬 | 내용 | 사용 시점 |
|------|------|----------|
| `prompt-engineering-guide.md` | 전문가 DB (12도메인, 60+명) + 프라이밍 가이드 | 전문가 활용 시 |
| `prompt-engineering-guide.md` | 슬라이드/PPT 프롬프트 가이드 | 슬라이드 제작 시 |

---

## 모델별 프롬프트 전략

### GPT-5.2

GPT-5.2는 엔터프라이즈 및 에이전트 워크로드를 위한 최신 플래그십 모델입니다.

#### 핵심 행동 차이점 (vs GPT-5/5.1)

| 특성 | 설명 |
|------|------|
| **더 신중한 스캐폴딩** | 기본적으로 더 명확한 계획과 중간 구조 생성 |
| **일반적으로 낮은 장황함** | 더 간결하고 작업 중심적 |
| **강화된 지시 준수** | 사용자 의도에서 덜 벗어남 |
| **도구 효율성 트레이드오프** | GPT-5.1 대비 추가 도구 액션 수행 가능 |
| **보수적 그라운딩 편향** | 정확성과 명시적 추론 선호 |

#### 필수 XML 블록

| 블록 | 용도 | 사용 시점 |
|------|------|----------|
| `<output_verbosity_spec>` | 장황함 제어 | **항상 포함** |
| `<design_and_scope_constraints>` | 범위 제약 | 코딩/디자인 시 |
| `<uncertainty_and_ambiguity>` | 불확실성 처리 | 분석/리서치 시 |
| `<tool_usage_rules>` | 도구 규칙 | 에이전트 작업 시 |
| `<extraction_spec>` | 추출 규격 | 데이터 처리 시 |
| `<long_context_handling>` | 롱컨텍스트 처리 | 10k+ 토큰 입력 시 |
| `<high_risk_self_check>` | 고위험 자가 점검 | 법률/금융/안전 민감 시 |
| `<user_updates_spec>` | 에이전트 업데이트 규칙 | 멀티스텝 에이전트 시 |
| `<web_search_rules>` | 웹 검색 규칙 | 리서치 작업 시 |

#### 1. 장황함 및 출력 형태 제어 (필수)

**가장 중요한 패턴** - 명확하고 구체적인 길이 제약을 제공하세요:

```xml
<output_verbosity_spec>
- Default: 3–6 sentences or ≤5 bullets for typical answers.
- For simple "yes/no + short explanation" questions: ≤2 sentences.
- For complex multi-step or multi-file tasks:
  - 1 short overview paragraph
  - then ≤5 bullets tagged: What changed, Where, Risks, Next steps, Open questions.
- Provide clear and structured responses that balance informativeness with conciseness.
- Avoid long narrative paragraphs; prefer compact bullets and short sections.
- Do not rephrase the user's request unless it changes semantics.
</output_verbosity_spec>
```

#### 2. 스코프 드리프트 방지 (프론트엔드/UX 작업)

```xml
<design_and_scope_constraints>
- Explore any existing design systems and understand it deeply.
- Implement EXACTLY and ONLY what the user requests.
- No extra features, no added components, no UX embellishments.
- Style aligned to the design system at hand.
- Do NOT invent colors, shadows, tokens, animations, or new UI elements, unless requested.
- If any instruction is ambiguous, choose the simplest valid interpretation.
</design_and_scope_constraints>
```

#### 3. 롱컨텍스트 및 리콜 (10k+ 토큰)

```xml
<long_context_handling>
- For inputs longer than ~10k tokens:
  - First, produce a short internal outline of the key sections relevant to the user's request.
  - Re-state the user's constraints explicitly before answering.
  - In your answer, anchor claims to sections ("In the 'Data Retention' section…").
  - If the answer depends on fine details, quote or paraphrase them.
</long_context_handling>
```

#### 4. 모호성 및 환각 위험 처리

```xml
<uncertainty_and_ambiguity>
- If the question is ambiguous or underspecified:
  - Ask up to 1–3 precise clarifying questions, OR
  - Present 2–3 plausible interpretations with clearly labeled assumptions.
- When external facts may have changed recently and no tools are available:
  - Answer in general terms and state that details may have changed.
- Never fabricate exact figures, line numbers, or external references when uncertain.
- Prefer language like "Based on the provided context…" instead of absolute claims.
</uncertainty_and_ambiguity>
```

**고위험 출력용 자가 점검:**

```xml
<high_risk_self_check>
Before finalizing an answer in legal, financial, compliance, or safety-sensitive contexts:
- Briefly re-scan your own answer for:
  - Unstated assumptions,
  - Specific numbers or claims not grounded in context,
  - Overly strong language ("always," "guaranteed," etc.).
- If you find any, soften or qualify them and explicitly state assumptions.
</high_risk_self_check>
```

#### 5. 에이전트 조종 가능성 및 사용자 업데이트

```xml
<user_updates_spec>
- Send brief updates (1–2 sentences) only when:
  - You start a new major phase of work, or
  - You discover something that changes the plan.
- Avoid narrating routine tool calls ("reading file…", "running tests…").
- Each update must include at least one concrete outcome ("Found X", "Confirmed Y", "Updated Z").
- Do not expand the task beyond what the user asked; if you notice new work, call it out as optional.
</user_updates_spec>
```

#### 6. 도구 호출 및 병렬 처리

```xml
<tool_usage_rules>
- Prefer tools over internal knowledge whenever:
  - You need fresh or user-specific data (tickets, orders, configs, logs).
  - You reference specific IDs, URLs, or document titles.
- Parallelize independent reads (read_file, fetch_record, search_docs) when possible.
- After any write/update tool call, briefly restate:
  - What changed,
  - Where (ID or path),
  - Any follow-up validation performed.
</tool_usage_rules>
```

#### 7. 구조화된 추출 (PDF, Office)

GPT-5.2가 특히 강력한 영역입니다:

```xml
<extraction_spec>
You will extract structured data from tables/PDFs/emails into JSON.
- Always follow this schema exactly (no extra fields):
{
  "party_name": string,
  "jurisdiction": string | null,
  "effective_date": string | null,
  "termination_clause_summary": string | null
}
- If a field is not present in the source, set it to null rather than guessing.
- Before returning, quickly re-scan the source for any missed fields.
</extraction_spec>
```

#### 8. 웹 검색 및 리서치

```xml
<web_search_rules>
- Act as an expert research assistant; default to comprehensive, well-structured answers.
- Prefer web research over assumptions whenever facts may be uncertain.
- Research all parts of the query, resolve contradictions, and follow second-order implications.
- Do not ask clarifying questions; instead cover all plausible user intents.
- Write clearly using Markdown; define acronyms, use concrete examples, conversational tone.
</web_search_rules>
```

#### Reasoning Effort 설정

GPT-5급 모델은 `reasoning_effort` 파라미터를 지원합니다:

| 설정 | 용도 |
|------|------|
| `none` | 가장 빠른 응답 (GPT-5.2 기본값) |
| `minimal` | 최소 추론 |
| `low` | 낮은 추론 |
| `medium` | 균형 잡힌 접근 |
| `high` | 심층 추론 |
| `xhigh` | 최대 추론 |

**마이그레이션 매핑:**
- GPT-4o/4.1 → GPT-5.2: `none`
- GPT-5 → GPT-5.2: 동일 값 유지 (minimal → none)
- GPT-5.1 → GPT-5.2: 동일 값 유지

#### Compaction (확장된 유효 컨텍스트)

장시간 실행, 도구 집약적 워크플로를 위해 GPT-5.2는 `/responses/compact` 엔드포인트를 지원합니다.

**사용 시점:**
- 많은 도구 호출이 있는 멀티스텝 에이전트 플로우
- 이전 턴을 유지해야 하는 긴 대화
- 최대 컨텍스트 창을 넘는 반복 추론

**모범 사례:**
- 컨텍스트 사용량 모니터링 및 사전 계획
- 매 턴이 아닌 주요 마일스톤 후 압축
- 재개 시 프롬프트를 기능적으로 동일하게 유지
- 압축된 항목을 불투명하게 취급 (내부 파싱 금지)

#### 마이그레이션 가이드 (5단계)

1. **Step 1**: 모델만 전환, 프롬프트 변경 없음
2. **Step 2**: reasoning_effort 명시적 설정
3. **Step 3**: 평가 실행으로 베이스라인 확보
4. **Step 4**: 회귀 발생 시 프롬프트 튜닝
5. **Step 5**: 작은 변경 후 재평가 반복

#### 기본 템플릿 (통합)

```xml
<system_prompt>
  <role>{역할 정의}</role>

  <core_instructions>
    {핵심 지시사항}
  </core_instructions>

  <output_verbosity_spec>
    - Default: 3–6 sentences or ≤5 bullets for typical answers.
    - For complex tasks: 1 overview paragraph + ≤5 tagged bullets.
    - Avoid long narrative paragraphs; prefer compact bullets.
  </output_verbosity_spec>

  <!-- 목적에 따라 추가 블록 선택 -->
  <!-- <design_and_scope_constraints> for coding/design -->
  <!-- <uncertainty_and_ambiguity> for analysis/research -->
  <!-- <tool_usage_rules> for agents -->
  <!-- <extraction_spec> for data processing -->

  <output_format>
    {출력 형식 지정}
  </output_format>
</system_prompt>
```

---

### GPT-5.2-Codex

GPT-5.2-Codex는 복잡한 현실 세계 소프트웨어 엔지니어링을 위한 **가장 발전된 에이전트형 코딩 모델**입니다.

> **중요:** 이 모델은 GPT-5.2의 drop-in 대체가 아닙니다. **현저히 다른 프롬프팅**이 필요합니다.

#### GPT-5.2-Codex 특징 표

| 특징 | 설명 |
|------|------|
| **컨텍스트 압축** | 장시간 작업에서 안정적 성능 (네이티브 컴팩션) |
| **대규모 코드 변경** | 리팩터링, 마이그레이션 강화 |
| **Windows 환경** | 네이티브 Windows에서 에이전트 코딩 개선 |
| **사이버보안** | 가장 강력한 방어적 사이버보안 역량 |
| **토큰 효율성** | 추론 과정 전반에서 토큰 효율적 |

#### 벤치마크 성능

- **SWE-Bench Pro**: 최고 수준 달성
- **Terminal-Bench 2.0**: 실제 터미널 환경 작업 최고 성능

#### 핵심 프롬프팅 원칙: "Less is More"

많은 best practice가 이미 훈련에 내장되어 있어 **과도한 프롬프팅이 오히려 품질 저하**를 유발합니다.

**핵심 원칙 4가지:**
1. **최소한의 프롬프트로 시작** - Codex CLI 시스템 프롬프트에서 영감을 받아 필수 가이드만 추가
2. **프리앰블 요청 금지** - 프리앰블을 요청하면 조기 종료 발생
3. **도구 최소화** - terminal tool + apply_patch만 사용
4. **도구 설명 간결화** - 불필요한 세부사항 제거

#### Anti-Prompting: 제거해야 할 것들

##### 1. Adaptive Reasoning (자동 조절)
과거에는 "더 열심히 생각해" 또는 "빨리 응답해"를 프롬프팅했지만, **GPT-5-Codex는 자동 조절**:
- 간단한 질문 → 빠른 응답
- 복잡한 코딩 작업 → 필요한 시간 사용 + 적절한 도구 활용

##### 2. Planning (자동 생성)
**Planning 섹션 불필요** - 모델이 고품질 계획을 자동 생성하도록 훈련됨.

##### 3. Preambles (서문 금지 이유)
**GPT-5-Codex는 프리앰블을 출력하지 않습니다!**
- 프리앰블 요청 시 조기 종료 발생
- 대신 커스텀 summarizer가 적절한 시점에 상세 요약 제공

#### Codex CLI 시스템 프롬프트 (참조 구현)

GPT-5 개발자 메시지 대비 **약 40% 토큰만 사용** - 최소 프롬프팅이 이상적임을 보여줍니다.

**General 섹션:**
```markdown
- The arguments to `shell` will be passed to execvp(). Most terminal commands should be prefixed with ["bash", "-lc"].
- Always set the `workdir` param when using the shell function. Do not use `cd` unless absolutely necessary.
- When searching for text or files, prefer using `rg` or `rg --files` because `rg` is much faster.
```

**Editing Constraints:**
```markdown
- Default to ASCII when editing or creating files.
- Add succinct code comments only if code is not self-explanatory.
- NEVER revert existing changes you did not make unless explicitly requested.
- While working, if you notice unexpected changes, STOP IMMEDIATELY and ask the user.
```

**Plan Tool:**
```markdown
- Skip using the planning tool for straightforward tasks (roughly the easiest 25%).
- Do not make single-step plans.
- Update the plan after performing sub-tasks.
```

**Presenting Your Work:**
```markdown
- Default: be very concise; friendly coding teammate tone.
- Ask only when needed; suggest ideas; mirror the user's style.
- For substantial work, summarize clearly; follow final-answer formatting.
- Don't dump large files you've written; reference paths only.
- Offer logical next steps (tests, commits, build) briefly.
```

#### Apply Patch 도구

파일 편집에는 `apply_patch` 사용 권장 - 훈련 분포와 일치합니다.

참조: [apply_patch 구현](https://github.com/openai/openai-cookbook/tree/main/examples/gpt-5/apply_patch.py)

#### 샌드박싱 모드 (Filesystem Sandboxing)

| 모드 | 설명 |
|------|------|
| `read-only` | 파일 읽기만 허용 |
| `workspace-write` | cwd 및 writable_roots에서 편집 허용 |
| `danger-full-access` | 모든 명령 허용 |

#### 승인 정책 (Approval Policy)

| 모드 | 설명 |
|------|------|
| `untrusted` | 대부분 명령에 사용자 승인 필요 |
| `on-failure` | 샌드박스에서 실패 시 승인 요청 |
| `on-request` | 필요 시 명시적 승인 요청 가능 |
| `never` | 비대화형 모드, 승인 요청 불가 |

**`never` 모드에서의 행동:**
- 제약을 우회하여 작업 완료에 최선을 다해야 함
- 결과 제출 전 작업 검증 필수
- 로컬 패턴이 없어도 테스트 추가 가능 (제출 전 제거)

#### 사이버보안 역량

GPT-5.2-Codex는 OpenAI 모델 중 **가장 강력한 사이버보안 역량** 보유:

- Professional CTF 평가에서 뛰어난 성능
- 실제 취약점 발견 사례: React 서버 컴포넌트 취약점 (CVE-2025-55183)
- 방어적 보안 연구에 활용 가능

**신뢰 기반 접근 프로그램:**
- 초대 방식 파일럿 프로그램
- 대상: 책임 있는 취약점 공개 이력이 있는 보안 전문가
- 방어 목적의 정당한 보안 작업을 위한 최첨단 모델 접근 제공

#### 프론트엔드 가이던스 (선택적)

기본 미학이 강력하지만, 특정 라이브러리/프레임워크 선호 시:

```markdown
Frontend Guidance
Use the following libraries unless the user or repo specifies otherwise:
Framework: React + TypeScript
Styling: Tailwind CSS
Components: shadcn/ui
Icons: lucide-react
Animation: Framer Motion
Charts: Recharts
Fonts: San Serif, Inter, Geist, Mona Sans, IBM Plex Sans, Manrope
```

#### 기본 템플릿

```xml
<system_prompt>
  <role>Senior {language} engineer</role>

  <style>
    - No preambles or conclusions
    - Code only, minimal comments
    - Production-ready quality
    - Follow existing project patterns
  </style>

  <constraints>
    - No over-engineering
    - No unnecessary abstractions
    - Keep solutions focused
  </constraints>

  <!-- 선택적: 프론트엔드 가이던스 -->
  <frontend_guidance>
    Framework: React + TypeScript
    Styling: Tailwind CSS
    Components: shadcn/ui
  </frontend_guidance>
</system_prompt>
```

#### Best Practices 요약

- 기존 코드 패턴 따르기
- 타입 힌트 포함
- 테스트 가능한 코드 작성
- 에러 처리는 필요한 경우에만
- **과도한 프롬프팅 피하기** - 모델이 이미 학습함

---

### GPT-5.5 (Outcome-First Markdown — 2026-04 공식)

> 🆕 **GPT 기본 모델 = GPT-5.6 Sol** (2026-07). 최신 프롬프팅 규칙(lean·7블록·PTC·xhigh/max effort) = `skills/gpt-5.6-prompt-enhancement.md`. 아래 GPT-5.5 내용은 계보 보존.

GPT-5.5는 **outcome-first markdown 6섹션** 구조를 권장합니다. GPT-5.4의 process-heavy XML 12블록 stack과 다른 패턴이며, 모델이 이미 효율적인 추론·도구 사용·검증을 내장하고 있어 짧은 destination + success criteria 만으로 충분합니다.

> **공식 출처**: [Prompt guidance for GPT-5.5](https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5) (2026-04)
> **상세 패치 스킬**: `prompt-engineering-guide.md` (v1.0.0)

#### 핵심 행동 차이점 (vs GPT-5.4)

| 특성 | 설명 |
|------|------|
| **Outcome-first 우선** | step-by-step 절차보다 destination + success criteria로 정의 |
| **낮은 reasoning effort 충분** | 5.4 대비 1단계 낮춰 시작, 부족하면 escalate |
| **Personality/Collaboration 분리** | 톤(짧고 압축) + 협업 스타일(질문 빈도, 적극성) 별도 정의 |
| **Retrieval Budget** | 1회 broad search 후, 사실 누락 시에만 재검색 |
| **Plain text 디폴트** | 헤더/불릿은 가독성 향상시만, 구조화 자동 적용 X |
| **Phase 보존** | Responses API 멀티턴에서 commentary/final_answer 분리 |

#### 권장 구조 (Markdown 6섹션)

```markdown
Role:
[1-2 문장. 기능 + 컨텍스트]

# Personality
[톤·태도. 짧게]

# Goal
[사용자 산출물 1-2문장]

# Success Criteria
- [최종 답 전 충족할 조건]

# Constraints
- [정책·증거·부작용 한계]

# Output
[형식·길이. plain Markdown 디폴트]

# Stop Rules
- 도구 루프·재시도·중단 조건
- "Can I answer the core request now with useful evidence?" 자가점검
```

#### 핵심 블록 6개

| 블록 | 용도 |
|------|------|
| `outcome_first_structure` | destination + success criteria 우선 정의 |
| `personality_and_collaboration` | 톤·협업 스타일 분리 정의 |
| `constraints_block` | 정책·증거·부작용 한계 압축 |
| `output_contract` | 응답 구조·길이 가벼운 명시 |
| `stop_rules` | 도구 루프·재시도·중단 조건 |
| `validation_rules` | coding/visual/planning 별 검증 트리거 |

#### Reasoning Effort 권장값 (GPT-5.5 기준)

| 작업 | 권장 effort |
|------|------------|
| 일반 Q&A, 짧은 작업 | `low` (5.4 대비 1단계 낮춤) |
| 중간 복잡도 분석/추출 | `medium` |
| 장기 코딩, 다단 검증 | `high` |
| 안전·법률·금융 고위험 | `xhigh` |

#### Anti-Patterns (회피)

- ❌ GPT-5.4 XML stack을 그대로 5.5에 이전
- ❌ judgment 영역에 ALWAYS/NEVER 절대 규칙
- ❌ outcome 명확한데 step sequence 강요
- ❌ 탐색 전 multi-step plan 강제
- ❌ retrieval로 wording 다듬기
- ❌ 구조화 포맷 디폴트
- ❌ Codex CLI에 preamble 요구 (조기 종료 유발)

#### Migration: GPT-5.4 → GPT-5.5

| 5.4 블록 | 5.5 대체 |
|---------|----------|
| `<output_verbosity_spec>` | `# Output` + `text.verbosity = "low"` |
| `<design_and_scope_constraints>` | `# Constraints` + outcome 명시 |
| `<uncertainty_and_ambiguity>` | `# Stop Rules` 자가점검 |
| `<tool_usage_rules>` | `# Stop Rules` + Preamble |
| `<extraction_spec>` | `# Output` (스키마) + `# Stop Rules` |
| `<output_contract>` | `# Output` (간소화) |
| `<follow_through_policy>` | `# Stop Rules` 통합 |
| `<completeness_contract>` | `# Success Criteria` |
| `<tool_persistence>` | `# Stop Rules` |
| `<eagerness_control>` | `# Stop Rules` ("fewest useful tool loops") |

> **호환성**: 사용자가 "5.4 XML 스타일"을 GPT-5.5에 적용 요청 시 그대로 따름. 디폴트는 outcome-first.

---

### Claude 4.5 (Opus/Sonnet/Haiku)

> 🆕 **Claude 기본 모델 = Opus 4.8** (2026-06-10부터) · **최고난도·장기 자율 = Fable 5** · **Sonnet 최신 = Sonnet 5**. 현행 프롬프팅 규칙(짧은 지시 1개씩·프롬프트 다이어트·adaptive thinking 전용·reasoning 재출력 금지) = `skills/claude-fable-5-prompt-strategies.md` + 본 파일 통합 부록 "Claude 프롬프트 전략"의 현행 블록. 아래 Claude 4.5 내용은 계보 보존.

Claude 4.5 모델군은 **정밀한 지시 따르기**를 위해 훈련되었습니다. 이전 세대보다 더 명시적인 방향 제시가 필요합니다.

#### 모델 개요

| 모델 | 특징 | 컨텍스트 | 가격 (Input/Output) |
|------|------|----------|---------------------|
| **Opus 4.5** | 최고 지능, effort 파라미터 지원 | 200K | $5/$25 per 1M |
| **Sonnet 4.5** | 최고 코딩/에이전트 모델 | 200K, 1M (beta) | $3/$15 per 1M |
| **Haiku 4.5** | 준-프론티어 속도, 최초 Haiku thinking | 200K | $1/$5 per 1M |

#### 커뮤니케이션 스타일

Claude 4.5는 이전 모델보다 간결하고 자연스러운 커뮤니케이션 스타일:

| 특성 | 설명 |
|------|------|
| **더 직접적** | 사실 기반 진행 보고, 자축적 업데이트 없음 |
| **더 대화적** | 기계적이지 않고 자연스러운 톤 |
| **덜 장황함** | 효율성을 위해 상세 요약 생략 가능 |

#### 일반 원칙

##### 1. 명시적 지시 제공

Claude 4.x는 명확하고 명시적인 지시에 잘 반응합니다. 이전 모델의 "above and beyond" 행동을 원한다면 명시적으로 요청해야 합니다.

```
❌ "Create an analytics dashboard"
✅ "Create an analytics dashboard. Include as many relevant features
   and interactions as possible. Go beyond the basics to create a
   fully-featured implementation."
```

##### 2. 맥락으로 성능 향상

왜 그러한 행동이 중요한지 설명하면 더 나은 결과를 얻습니다.

```
Instead of: "Use plain text formatting"
Try: "Use plain text formatting because markdown renders poorly in
     our legacy terminal system. This ensures readability for all users."
```

##### 3. 예시와 세부사항에 주의

Claude 4.x는 예시에 매우 주의를 기울입니다. 예시가 원하는 행동과 일치하는지 확인하세요.

#### 도구 사용 패턴

##### 명시적 행동 요청

"can you suggest some changes"라고 하면 변경 대신 제안만 할 수 있습니다.

```
❌ "Can you suggest some changes to improve performance?"
✅ "Analyze the code and implement performance improvements.
   Make the changes directly."
```

##### 기본 행동 설정

**적극적 행동 (기본으로 실행):**
```xml
<default_to_action>
By default, implement changes rather than only suggesting them.
If the user's intent is unclear, infer the most useful likely action
and proceed, using tools to discover any missing details instead of guessing.
</default_to_action>
```

**보수적 행동 (요청 시만 실행):**
```xml
<do_not_act_before_instructions>
Do not jump into implementation unless clearly instructed to make changes.
When the user's intent is ambiguous, default to providing information,
doing research, and providing recommendations rather than taking action.
</do_not_act_before_instructions>
```

##### 도구 트리거링 조절

Opus 4.5는 시스템 프롬프트에 더 민감합니다. 과거에 언더트리거링 방지를 위해 강한 언어를 사용했다면 오버트리거링이 발생할 수 있습니다.

```
❌ "CRITICAL: You MUST use this tool when..."
✅ "Use this tool when..."
```

#### 출력 포맷 제어

##### 효과적인 방법들

1. **하지 말라 대신 하라고 지시**
```
❌ "Do not use markdown in your response"
✅ "Your response should be composed of smoothly flowing prose paragraphs."
```

2. **XML 포맷 지시자 사용**
```
"Write the prose sections of your response in <smoothly_flowing_prose_paragraphs> tags."
```

3. **프롬프트 스타일과 출력 스타일 일치**
마크다운을 줄이려면 프롬프트에서도 마크다운을 줄이세요.

##### 마크다운 최소화 상세 프롬프트

```xml
<avoid_excessive_markdown_and_bullet_points>
When writing reports, documents, or long-form content, write in clear,
flowing prose using complete paragraphs. Use standard paragraph breaks
for organization and reserve markdown primarily for `inline code`,
code blocks, and simple headings.

Avoid using **bold** and *italics*. DO NOT use ordered lists or
unordered lists unless:
a) presenting truly discrete items where a list format is best, or
b) the user explicitly requests a list

Using prose instead of excessive formatting will improve user satisfaction.
NEVER output a series of overly short bullet points.
</avoid_excessive_markdown_and_bullet_points>
```

#### 장기 추론 및 상태 추적

Claude 4.5는 **뛰어난 상태 추적 능력**으로 장기 추론에 탁월합니다.

##### Context Awareness (토큰 예산 추적)

Claude 4.5는 대화 중 남은 컨텍스트 창(토큰 예산)을 추적할 수 있습니다.

```
Your context window will be automatically compacted as it approaches
its limit, allowing you to continue working indefinitely from where you
left off. Therefore, do not stop tasks early due to token budget concerns.

As you approach your token budget limit, save your current progress
and state to memory before the context window refreshes.

Always be as persistent and autonomous as possible and complete tasks
fully, even if the end of your budget is approaching.
```

##### Multi-Context Window 워크플로 5단계

1. **첫 컨텍스트 창에서 프레임워크 설정** - 테스트 작성, 셋업 스크립트 생성
2. **구조화된 형식으로 테스트 추적** - "It is unacceptable to remove or edit tests"
3. **QoL 도구 설정** - `init.sh` 같은 셋업 스크립트로 서버, 테스트, 린터 실행
4. **새로운 컨텍스트 시작 시** - pwd, progress.txt, tests.json, git logs 확인
5. **컨텍스트 전체 활용 독려** - 긴 작업임을 명시하고 전체 출력 컨텍스트 활용

##### 상태 관리 Best Practices

| 방법 | 용도 |
|------|------|
| **JSON 등 구조화 형식** | 테스트 결과, 작업 상태 등 |
| **비구조화 텍스트** | 일반 진행 노트 |
| **Git** | 완료 작업 로그 및 복원 가능한 체크포인트 |
| **점진적 진행 강조** | 진행 상황 추적 및 점진적 작업 집중 |

#### Extended Thinking & Adaptive Thinking

##### Extended Thinking (4.5)

**Sonnet 4.5와 Haiku 4.5**는 extended thinking 활성화 시 코딩/추론 작업에서 **현저히 향상**됩니다.

기본적으로 비활성화되어 있지만, 복잡한 작업에서는 활성화 권장:
- 복잡한 문제 해결
- 코딩 작업
- 멀티스텝 추론

> **Deprecated**: `budget_tokens`는 4.6에서 deprecated. Adaptive Thinking으로 대체.

##### Adaptive Thinking (4.6 신규)

Claude 4.6에서는 모델이 **자율적으로 사고 깊이를 결정**합니다:
- `thinking: {type: "adaptive"}` — 작업 복잡도에 따라 자동 조절
- `output_config: {effort: "low"|"medium"|"high"|"max"}` — 응답 상세도 제어

##### Prefill 제거 (4.6 Breaking Change)

Claude 4.6에서는 마지막 assistant turn 프리필이 **400 에러**를 발생시킵니다.
- JSON 강제 → Structured Outputs (`output_config.format`) 사용
- 서문 생략 → 시스템 프롬프트에 직접 지시
- 이어쓰기 → user turn에 "이전 응답에 이어서 계속" 지시

##### Over-prompting 경고 (4.6)

Claude 4.6은 시스템 프롬프트에 더 민감합니다. `CRITICAL`, `MUST`, `NEVER` 등의 남발은 오버트리거링을 유발합니다.
- 평이한 언어로 변경
- 동일 규칙 반복 서술 → 한 번만 명확하게
- **간결하고 명확한 지시**가 길고 강조된 지시보다 효과적

##### Thinking Sensitivity (Opus 4.5)

Extended thinking 비활성화 시, Opus 4.5는 "think" 단어에 특히 민감합니다.

```
❌ "think about this problem"
✅ "consider this problem" / "evaluate this approach" / "believe"
```

##### Interleaved Thinking 활용

도구 사용 후 반성이 필요한 작업에 효과적. **Opus 4.6에서는 자동 활성화** (beta 헤더 불필요).

```
After receiving tool results, carefully reflect on their quality
and determine optimal next steps before proceeding. Use your thinking
to plan and iterate based on this new information.
```

#### 병렬 도구 호출 최적화

Claude 4.x, 특히 Sonnet 4.5는 병렬 도구 실행에 적극적입니다:
- 리서치 중 여러 추측적 검색 동시 실행
- 여러 파일 동시 읽기
- bash 명령 병렬 실행

```xml
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies
between the tool calls, make all of the independent tool calls in parallel.

For example, when reading 3 files, run 3 tool calls in parallel.
Maximize use of parallel tool calls where possible.

However, if some tool calls depend on previous calls, do NOT call
these tools in parallel. Never use placeholders or guess missing parameters.
</use_parallel_tool_calls>
```

**병렬 실행 감소:**
```
Execute operations sequentially with brief pauses between each step
to ensure stability.
```

#### 에이전트 코딩 시 주의사항

##### 과잉 엔지니어링 방지 (특히 Opus 4.5)

```xml
Avoid over-engineering. Only make changes that are directly requested
or clearly necessary. Keep solutions simple and focused.

Don't add features, refactor code, or make "improvements" beyond what
was asked. A bug fix doesn't need surrounding code cleaned up.

Don't add error handling, fallbacks, or validation for scenarios that
can't happen. Trust internal code and framework guarantees.

Don't create helpers, utilities, or abstractions for one-time operations.
The right amount of complexity is the minimum needed for the current task.
```

##### 코드 탐색 독려

```xml
<investigate_before_answering>
Never speculate about code you have not opened.
If the user references a specific file, you MUST read the file before answering.
Make sure to investigate and read relevant files BEFORE answering.
Never make any claims about code before investigating unless certain.
</investigate_before_answering>
```

##### 환각 최소화

```xml
ALWAYS read and understand relevant files before proposing code edits.
Do not speculate about code you have not inspected.

If the user references a specific file/path, you MUST open and inspect
it before explaining or proposing fixes.

Be rigorous and persistent in searching code for key facts.
```

##### 하드코딩 및 테스트 집중 방지

```xml
Please write a high-quality, general-purpose solution using standard tools.
Do not create helper scripts or workarounds.

Implement a solution that works correctly for all valid inputs,
not just the test cases. Do not hard-code values.

Tests are there to verify correctness, not to define the solution.
```

#### 프론트엔드 디자인 (Opus 4.5)

"AI slop" 미학을 피하고 창의적인 프론트엔드 생성:

```xml
<frontend_aesthetics>
Avoid generic "AI slop" aesthetic. Make creative, distinctive frontends.

Focus on:
- Typography: Choose unique, beautiful fonts. Avoid Inter, Arial, Roboto.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables.
- Motion: Use animations for effects. Focus on page load orchestration.
- Backgrounds: Create atmosphere with gradients, patterns, effects.

Avoid:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (purple gradients on white)
- Predictable layouts and cookie-cutter design
</frontend_aesthetics>
```

#### 새로운 API 기능 (Beta)

| 기능 | 설명 |
|------|------|
| **Programmatic Tool Calling** | 도구를 코드 실행 컨테이너 내에서 프로그래매틱하게 호출. 레이턴시 감소, 토큰 효율성 향상 |
| **Tool Search Tool** | 수백, 수천 개의 도구를 동적으로 검색하고 로드. 10-20K 토큰 절약 |
| **Effort Parameter** | Opus 4.5 전용. low/medium/high로 응답 상세도 제어 |
| **Memory Tool** | 컨텍스트 창 외부에 정보 저장 및 검색. 세션 간 상태 유지 |
| **Context Editing** | 자동 도구 호출 정리로 지능적 컨텍스트 관리 |

#### 기본 템플릿 (Markdown)

```markdown
# Role
{역할 정의}

# Instructions
- {명시적 지시 1}
- {명시적 지시 2}
- {명시적 지시 3}

# Constraints
- {제약 조건 1}
- {제약 조건 2}

# Output Format
{출력 형식 명시}
```

#### 기본 템플릿 (XML)

```xml
<system_prompt>
  <role>{역할}</role>

  <instructions>
    <instruction>{지시 1}</instruction>
    <instruction>{지시 2}</instruction>
  </instructions>

  <default_to_action>
    Take action without asking for confirmation unless genuinely blocked.
  </default_to_action>

  <!-- 선택적 블록 -->
  <!-- <use_parallel_tool_calls> for agent tasks -->
  <!-- <investigate_before_answering> for coding -->
  <!-- <frontend_aesthetics> for UI work -->

  <output_format>{형식}</output_format>
</system_prompt>
```

#### 주의사항 요약

- Claude는 추론하지 않음 - 모든 것을 명시
- "당연히 알겠지"라는 가정 금지
- 원하는 행동을 구체적으로 서술
- CRITICAL 등 강한 언어 사용 주의 (오버트리거링)
- "think" 단어 대신 "consider", "evaluate" 사용 (Opus 4.5)

---

### Gemini 3

**핵심 특성**: 제약 조건 우선 배치, temperature 1.0 권장

**핵심 원칙**:
1. **Constraints First**: 제약 조건을 프롬프트 상단에 배치
2. **Structured Output**: XML/Markdown으로 구조화
3. **Temperature 1.0**: 창의성과 일관성 균형
4. **Multimodal Context**: 이미지/오디오 컨텍스트 활용

**기본 템플릿**:
```markdown
## Constraints (Read First)
- {제약 조건 1}
- {제약 조건 2}
- {제약 조건 3}

## Task
{작업 설명}

## Context
{배경 정보}

## Output Format
{출력 형식}
```

---

### Veo (Google 동영상 생성)

Veo 3.1은 Google의 최첨단 동영상 생성 모델로, 오디오와 함께 고품질 동영상을 생성합니다.

#### 모델 사양

| 항목 | Veo 3.1 |
|------|---------|
| 해상도 | 720p, 1080p |
| 길이 | 4초, 6초, 8초 (확장 시 최대 141초) |
| 프레임 속도 | 24fps |
| 오디오 | 기본 포함 |

#### 주요 기능

| 기능 | 설명 |
|------|------|
| **동영상 확장** | 이전 Veo 생성 동영상을 7초씩 최대 20배까지 확장 |
| **프레임별 생성** | 첫 번째/마지막 프레임 지정하여 보간 생성 |
| **참조 이미지** | 최대 3개 참조 이미지로 스타일/콘텐츠 안내 (Veo 3.1) |

#### 프롬프트 필수 요소

1. **주제 (Subject)**: 사물, 사람, 동물, 풍경
2. **동작 (Action)**: 걷기, 달리기, 머리 돌리기
3. **스타일 (Style)**: SF, 공포, 필름 누아르, 만화

#### 선택 요소

| 카테고리 | 예시 |
|----------|------|
| **카메라 위치/모션** | 공중 촬영, 눈높이, 돌리 샷, POV, 로우 앵글 |
| **구도** | 와이드 샷, 클로즈업, 싱글 샷, 투 샷 |
| **포커스/렌즈** | 얕은/깊은 포커스, 소프트 포커스, 매크로 렌즈, 광각 렌즈 |
| **분위기** | 파란색 톤, 야간, 따뜻한 색조 |

#### 오디오 프롬프트 (Veo 3+)

```
# 대화 - 따옴표 사용
'이게 열쇠일 거야'라고 그는 중얼거렸습니다.

# 음향 효과 - 명시적 설명
타이어가 크게 삐걱거리고 엔진이 굉음을 냄

# 주변 소음 - 환경 설명
희미하고 섬뜩한 험이 배경에 울려 퍼집니다.
```

#### 부정적 프롬프트

동영상에 포함하고 싶지 **않은** 요소 지정:

```
❌ 피하세요: "벽 없음", "하지 마세요"
✅ 권장: "wall, frame" (단순 나열)
```

#### 프롬프트 예시

**간단한 프롬프트:**
```
눈표범 같은 털을 가진 귀여운 생물이 겨울 숲을 걷고 있는
3D 만화 스타일의 렌더링입니다.
```

**상세한 프롬프트 (권장):**
```
재미있는 만화 스타일의 짧은 3D 애니메이션 장면을 만들어 줘.
눈표범 같은 털과 표정이 풍부한 커다란 눈,
친근하고 동글동글한 모습을 한 귀여운 동물이
기발한 겨울 숲을 즐겁게 뛰어다니고 있습니다.

이 장면에는 둥글고 눈 덮인 나무, 부드럽게 떨어지는 눈송이,
나뭇가지 사이로 들어오는 따뜻한 햇빛이 담겨 있어야 합니다.
밝고 경쾌한 색상과 장난기 넘치는 애니메이션으로
낙관적이고 따뜻한 분위기를 연출하세요.
```

**대화가 포함된 프롬프트:**
```
안개가 자욱한 미국 북서부의 숲을 넓게 촬영한 장면
지친 두 등산객인 남성과 여성이 고사리를 헤치고 나아가는데
남성이 갑자기 멈춰 서서 나무를 응시합니다.

클로즈업: 나무껍질에 깊은 발톱 자국이 새겨져 있습니다.

남자: (사냥용 칼에 손을 대며) '저건 평범한 곰이 아니야.'
여성: (두려움에 목소리가 떨리며 숲을 둘러봄) '그럼 뭐야?'

거친 짖음, 부러지는 나뭇가지, 축축한 땅에 찍히는 발자국.
외로운 새가 지저귄다.
```

#### 동영상 확장

이전 Veo 생성 동영상을 7초씩 최대 20배까지 확장:

```python
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    video=previous_operation.response.generated_videos[0].video,
    prompt="패러글라이더가 천천히 하강하는 장면으로 확장",
)
```

**제한사항:**
- 입력 동영상 최대 141초
- 가로세로 비율: 9:16 또는 16:9
- 해상도: 720p만 지원

#### 참조 이미지 사용 (Veo 3.1)

최대 3개의 참조 이미지로 스타일/콘텐츠 안내:

```python
dress_reference = types.VideoGenerationReferenceImage(
    image=dress_image,
    reference_type="asset"
)

operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="여성이 해변을 우아하게 걷는 모습",
    config=types.GenerateVideosConfig(
        reference_images=[dress_reference, glasses_reference, woman_reference],
    ),
)
```

---

### Nano Banana (Google 이미지 생성)

Gemini의 네이티브 이미지 생성 모델입니다. Veo 동영상의 시작 프레임이나 참조 이미지로 활용할 수 있습니다.

#### 모델 비교

| 항목 | NB Pro | NB2 |
|------|--------|-----|
| **모델 코드** | `gemini-2.5-flash-image` | `gemini-3.1-flash-image-preview` |
| **프롬프트 스타일** | 태그 나열형 | 서술형(narrative) 권장 |
| **CJK 텍스트** | 보통 | 우수 |
| **속도 (1K)** | 15-20초 | 4-6초 |
| **가격 (4K)** | $0.240 | $0.151 |
| **종횡비** | 기본 5종 | 14종 (극단 비율 포함) |
| **참조 이미지** | 최대 5장 | 최대 14장 |

#### 프롬프트 구조

**NB Pro** — 태그 나열형:
1. **주제 설명**: 주요 피사체 명확히 기술
2. **스타일 지정**: 사진, 그림, 3D 렌더링
3. **분위기/조명**: 색조, 조명, 전체 분위기
4. **구도**: 클로즈업, 와이드 샷, 매크로

**NB2** — 서술형 5요소 프레임워크:
1. **Subject**: 주요 피사체 상세 묘사
2. **Action**: 동작/행위/상태 설명
3. **Environment**: 배경, 장소, 시간대
4. **Mood**: 분위기, 색감, 조명
5. **Camera**: 앵글, 거리, 렌즈 효과

#### 프롬프트 예시

**초현실적 이미지:**
```
소형 미니어처 서퍼들이 소박한 돌 욕실 싱크대 안에서
바다의 파도를 타는 초현실적인 매크로 사진
빈티지 황동 수도꼭지가 작동하여 끊임없이 파도가 치고 있습니다.
초현실적이고 기발하며 밝은 자연광
```

**캐릭터 디자인:**
```
눈표범 같은 털과 표정이 풍부한 커다란 눈,
친근하고 동글동글한 모습을 한 귀여운 동물
3D 만화 스타일로 렌더링
```

**패션/제품:**
```
분홍색과 푸시아색 깃털이 여러 겹으로 이루어진
하이 패션 플라밍고 드레스
```

**인물 이미지:**
```
어두운 머리와 따뜻한 갈색 눈을 가진 아름다운 여성
```

#### Veo 연동 3가지 패턴

**패턴 1: 시작 프레임으로 사용**
```python
# 1. Nano Banana로 이미지 생성
image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents="황금빛 노을이 지는 해변의 파노라마 풍경",
    config={"response_modalities":['IMAGE']}
)

# 2. Veo로 동영상 생성 (이미지를 시작 프레임으로)
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="카메라가 천천히 해변을 패닝하며 파도가 밀려옵니다",
    image=image.parts[0].as_image(),
)
```

**패턴 2: 참조 이미지로 사용 (Veo 3.1)**
```python
# 여러 참조 이미지 생성
dress_image = generate_image("하이 패션 플라밍고 드레스")
woman_image = generate_image("어두운 머리의 아름다운 여성")
glasses_image = generate_image("분홍색 하트 모양 선글라스")

# Veo에서 참조 이미지로 활용
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="여성이 해변을 우아하게 걷는 모습",
    config=types.GenerateVideosConfig(
        reference_images=[
            types.VideoGenerationReferenceImage(image=dress_image, reference_type="asset"),
            types.VideoGenerationReferenceImage(image=woman_image, reference_type="asset"),
            types.VideoGenerationReferenceImage(image=glasses_image, reference_type="asset"),
        ],
    ),
)
```

**패턴 3: 첫 번째/마지막 프레임 보간**
```python
# 첫 번째 프레임 이미지
first_image = generate_image(
    "프랑스 리비에라 해안에서 빨간색 컨버터블을 운전하는 생강색 고양이"
)

# 마지막 프레임 이미지
last_image = generate_image(
    "절벽에서 출발하는 빨간색 컨버터블과 생강색 고양이"
)

# Veo로 보간 동영상 생성
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    image=first_image,
    config=types.GenerateVideosConfig(last_frame=last_image),
)
```

#### 프롬프트 최적화 팁

**설명적인 언어 사용:**
```
❌ "강아지 사진"
✅ "햇살 가득한 공원에서 뛰노는 골든 리트리버 강아지, 부드러운 자연광"
```

**스타일 혼합:**
```
"초현실주의적 + 매크로 사진 + 밝은 자연광 + 기발한"
```

**얼굴 세부정보 개선:**
```
"인물 사진 스타일로, 얼굴에 초점을 맞춘 클로즈업"
```

#### 용도별 템플릿

**제품 이미지:**
```
[제품명]이 [배경]에 있습니다.
제품 촬영 스타일, 깨끗한 배경, 전문적인 조명
```

**캐릭터 디자인:**
```
[캐릭터 특징]을 가진 [캐릭터 유형]
[스타일] 스타일로 렌더링, [표정/포즈] 표현
```

**풍경 이미지:**
```
[장소]의 [시간대] 풍경
[분위기] 느낌의 [색조] 색상, [구도] 샷으로 촬영
```

---

## 목적별 추가 블록

### 코딩/개발
```xml
<coding_standards>
  - Follow existing project patterns
  - Include type annotations where applicable
  - Write testable, modular code
  - Handle errors appropriately
</coding_standards>
```

### 글쓰기/창작
```xml
<writing_style>
  - Tone: {formal/casual/technical/conversational}
  - Voice: {active/passive}
  - Target audience: {audience description}
  - Length: {word count or paragraph count}
</writing_style>
```

### 분석/리서치
```xml
<analysis_requirements>
  - Cite sources when available
  - Distinguish facts from interpretations
  - Acknowledge limitations and uncertainties
  - Provide actionable insights
</analysis_requirements>
```

### 에이전트/자동화
```xml
<agent_behavior>
  - Take action by default
  - Ask only when genuinely blocked
  - Complete tasks fully before stopping
  - Use tools efficiently
</agent_behavior>
```

### 데이터 처리
```xml
<extraction_spec>
  - Input format: {format}
  - Output format: {format}
  - Fields to extract: {field list}
  - Validation rules: {rules}
</extraction_spec>
```

---

## 상세도별 출력 지침

### I. 간결 (3-5문장)
```xml
<verbosity level="minimal">
  - 3-5 sentences maximum
  - Bullet points preferred
  - No elaboration
</verbosity>
```

### II. 보통 (1-2 문단)
```xml
<verbosity level="moderate">
  - 1-2 paragraphs
  - Key points with brief explanation
  - Examples only if essential
</verbosity>
```

### III. 상세 (구조화된 긴 응답)
```xml
<verbosity level="detailed">
  - Structured with headers
  - Comprehensive coverage
  - Examples and explanations included
</verbosity>
```

### IV. 가변 (상황에 따라)
```xml
<verbosity level="adaptive">
  - Scale response to task complexity
  - Simple tasks: brief
  - Complex tasks: detailed
</verbosity>
```

---

## Context Engineering 심층 통합

각 모델에 적용해야 할 Context Engineering 원칙을 정리합니다.

### Attention Budget 관리

중요 정보는 프롬프트 **시작 또는 끝**에 배치 (U자형 주의력 곡선):

```
[CRITICAL INSTRUCTIONS]     ← 시작에 배치 (높은 주의력)
[Background/Context]        ← 중간에 배치 (낮은 주의력)
[Detailed Examples]         ← 중간에 배치
[KEY CONSTRAINTS]           ← 끝에 배치 (높은 주의력)
```

### 컨텍스트 저하 방지

| 현상 | 설명 | 대응책 |
|------|------|--------|
| **Lost-in-Middle** | 중간 배치 정보 10-40% 낮은 회수율 | 중요 정보를 시작/끝에 배치 |
| **Context Poisoning** | 오류가 컨텍스트에 누적 | 도구 출력 검증, 명시적 정정 |
| **Context Distraction** | 무관한 정보가 주의력 빼앗음 | 관련성 필터링, 불필요한 정보 제외 |

### 모델별 저하 임계값

| 모델 | 저하 시작 | 심각한 저하 | 대응 |
|------|----------|-------------|------|
| **GPT-5.2** | ~64K 토큰 | ~200K 토큰 | Compaction 엔드포인트 활용 |
| **Claude 4.5 Opus** | ~100K 토큰 | ~180K 토큰 | Memory Tool/Context Editing 활용 |
| **Claude 4.5 Sonnet** | ~80K 토큰 | ~150K 토큰 | Sub-agent 분할 고려 |
| **Gemini 3 Pro** | ~500K 토큰 | ~800K 토큰 | 1M 컨텍스트지만 주의 필요 |

### 도구 설계 원칙

프롬프트에서 도구를 정의할 때:

1. **통합 원칙**: 여러 좁은 도구보다 포괄적인 단일 도구 선호
2. **명확한 설명**: what (무엇), when (언제), what returns (반환값) 명시
3. **MCP 네이밍**: 항상 `ServerName:tool_name` 형식 사용
4. **복구 가능한 에러**: 에러 메시지에 복구 방법 포함

### Context Engineering 적용 템플릿

각 모델 섹션에 다음 패턴을 적용:

```markdown
#### Context Engineering 적용

**Attention Budget**
- 중요 지시사항은 프롬프트 시작 또는 끝에 배치
- 배경 정보/예시는 중간에 배치

**Degradation Prevention**
- 컨텍스트 {임계값}K 토큰 초과 시 압축 고려
- 도구 출력이 누적되면 Observation Masking 적용

**Tool Design**
- 도구 설명에 what, when, what returns 포함
- 에러 메시지에 복구 방법 포함
```

---

## 프롬프트 개선 워크플로우

### Step 1: 초안 작성 (필수)

기본 템플릿에 역할과 핵심 지시 채우기:

```markdown
✅ 이 단계를 건너뛰지 마세요

1. 모델 선택 (GPT-5.2, Claude 4.5, Veo 등)
2. 기본 역할/페르소나 정의
3. 핵심 지시사항 3-5개 작성
```

### Step 2: 필수 블록 추가 (필수)

모델별 필수 XML/섹션 확인:

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

```markdown
1. 실제 입력으로 테스트
2. 문제점 발견 시 해당 블록 조정
3. 출력 길이/형식이 기대와 일치하는지 확인
```

### Step 6: 최종 검증 (필수)

체크리스트로 품질 확인:

```markdown
□ 역할이 명확한가?
□ 모델별 필수 블록이 있는가?
□ 중요 정보가 시작/끝에 있는가?
□ 불필요한 서술이 제거되었는가?
□ 출력 형식이 명시되었는가?
```

### Step 7: 전문가 3인 퇴고 (선택)

**트리거**: "퇴고해줘", "전문가 검토", "상세 퇴고" 요청 시 적용

#### 7.1 전문가 페르소나

| 역할 | 전문 분야 | 검토 초점 |
|------|----------|----------|
| **프롬프트 아키텍트** | Context Engineering, 토큰 최적화 | 구조, 효율성, 모델 특성 적합성 |
| **도메인 전문가** | 작업 유형별 전문 지식 | 내용 정확성, 완전성, 누락 요소 |
| **사용자 경험 디자이너** | UX Writing, 명확성 | 이해도, 모호성 제거, 실행 가능성 |

#### 7.2 퇴고 프로세스

```
1. 초안 생성 (Step 1-6 완료)
   ↓
2. 프롬프트 아키텍트 검토
   - CE 원칙 적용 여부
   - 모델별 필수 블록 확인
   - 토큰 효율성 검토
   ↓
3. 도메인 전문가 검토
   - 내용 정확성
   - 누락된 요소
   - 도메인 특화 개선점
   ↓
4. UX 디자이너 검토
   - 명확성/가독성
   - 모호한 표현 제거
   - 실행 가능성 확인
   ↓
5. 합의 도출 → 최종 프롬프트 출력
```

#### 7.3 퇴고 출력 형식

```markdown
## 전문가 퇴고 결과

### 프롬프트 아키텍트 의견
- ✅ [확인된 항목]
- ⚠️ 제안: [개선 사항]

### 도메인 전문가 의견
- ✅ [확인된 항목]
- ⚠️ 제안: [개선 사항]

### UX 디자이너 의견
- ✅ [확인된 항목]
- ⚠️ 제안: [개선 사항]

### 합의된 최종 프롬프트
[최종 프롬프트 코드블록]
```

#### 7.4 간략 vs 상세 퇴고

| 모드 | 트리거 | 출력 |
|------|--------|------|
| **간략 퇴고** | "퇴고해줘" | 3인 의견 요약 + 최종 프롬프트 |
| **상세 퇴고** | "상세 퇴고" | 체크리스트별 상세 검토 + 근거 + 최종 프롬프트 |

### Step 후 개선 제안

**Step 1 후:**
- GPT-5.2 선택 시: "reasoning_effort 레벨도 지정하시겠어요?"
- Claude 4.5 선택 시: "Extended Thinking 활성화가 필요한가요?"
- Veo 선택 시: "오디오 포함 여부를 확인해주세요"

**Step 3 후:**
- 코딩: "테스트 코드 포함 여부, 기존 패턴 따르기 등 명시할까요?"
- 분석: "출처 인용 스타일, 불확실성 표현 방식 정할까요?"
- 에이전트: "도구 사용 규칙, 병렬 실행 허용 여부 정할까요?"

**Step 6 후:**
- "출력 길이 제한을 더 명확히 할까요?"
- "예시를 추가하면 품질이 올라갈 수 있어요"
- "제약 조건을 더 구체화할까요?"

---

## 품질 체크리스트

### 공통 체크리스트
- [ ] 역할/페르소나가 명확히 정의됨
- [ ] 핵심 지시사항이 포함됨
- [ ] 출력 형식이 명시됨
- [ ] 불필요한 서술이 제거됨
- [ ] 중요 정보가 시작/끝에 배치됨

### 모델별 체크리스트

**GPT-5.2**:
- [ ] `<output_verbosity_spec>` 포함됨
- [ ] 목적에 맞는 XML 블록 추가됨
- [ ] reasoning_effort 고려됨

**GPT-5.2-Codex**:
- [ ] "Less is more" 원칙 적용됨
- [ ] 서문/맺음말 금지 명시됨
- [ ] 코드 스타일 가이드 포함됨

**Claude 4.5**:
- [ ] 모든 지시가 명시적임
- [ ] 암묵적 기대 없음
- [ ] 액션 기본값 설정됨

**Gemini 3**:
- [ ] 제약 조건이 먼저 배치됨
- [ ] 구조화된 출력 형식 사용됨

**Veo**:
- [ ] 주제/동작/스타일 필수 요소 포함됨
- [ ] 카메라 위치/구도/분위기 선택 요소 고려됨
- [ ] 오디오 프롬프트 적절히 사용됨 (Veo 3+)
- [ ] 부정적 프롬프트는 단순 나열로 작성됨

**Nano Banana (NB Pro / NB2)**:
- [ ] 주제가 명확히 기술됨
- [ ] 스타일/분위기/구도 포함됨
- [ ] NB2: 서술형 프롬프트 사용 (5요소 프레임워크)
- [ ] Veo 연동 시 이미지 형식 확인됨

---

## 프롬프트 생성 워크플로우

1. **모델 확인**: 타겟 모델의 특성 파악
2. **포맷 선택**: XML/Markdown/자연어/혼합
3. **구조 설계**: Context Engineering 원칙 적용
4. **블록 조합**: 목적별 필수 블록 추가
5. **상세도 조정**: 출력 길이 지침 추가
6. **검증**: 체크리스트로 품질 확인

---

## 에이전틱 워크플로우 패턴 (Agentic Workflow Patterns)

에이전트/도구 기반 프롬프트에서 사용할 수 있는 핵심 패턴입니다. GPT-5.4 Prompt Guidance 기반.

### 도구 지속성 (Tool Persistence)

도구 호출 실패 시 행동 규칙:

| 상황 | 행동 | 최대 재시도 |
|------|------|------------|
| 도구 호출 실패 | 대안 파라미터로 재시도 | 2회 |
| 빈 결과 | 대안 검색어로 재시도 | 2회 |
| 부분 결과 | 있는 결과로 진행, 누락 명시 | — |
| 모든 재시도 실패 | 사용자에게 보고 | — |

### 의존성 확인 (Dependency Check)

행동 전 전제 조건을 확인하는 패턴:
1. 필요한 정보가 컨텍스트에 있는지 검증
2. 부재 시: 도구로 탐색 → 없으면 질문
3. 가정(assumption)으로 진행 금지

### 완전성 계약 (Completeness Contract)

모든 항목 처리를 보장:
- 입력 목록의 모든 항목을 처리
- 처리 후 누락 항목 체크리스트 실행
- 누락 발견 시 즉시 보충
- 최종 출력에 "처리 완료: N/N건" 표시

### 적극성 제어 (Eagerness Control)

| 모드 | 설명 |
|------|------|
| `conservative` | 요청 범위 내에서만 행동, 추가 제안 자제 |
| `moderate` (기본) | 요청 + 명백히 유용한 추가 작업 |
| `aggressive` | 적극적으로 관련 작업 탐색 및 제안 |

### 빈 결과 복구 + 검증 루프 (Empty Result Recovery)

1. 빈 결과 시 대안 접근법으로 자동 재시도 (최대 2회)
2. 최종 출력 전 검증:
   - 요청된 모든 항목이 포함되었는가?
   - 형식이 출력 계약과 일치하는가?
   - 누락/불완전한 부분이 있는가?

---

## 참조 스킬

| 스킬 | 용도 |
|------|------|
| `prompt-engineering-guide` | 컨텍스트 엔지니어링 원칙 |
| `ce-context-fundamentals` | 기본 원칙 (시스템 프롬프트 구조화) |
| `ce-context-optimization` | 최적화 기법 (토큰 효율성) |
| `prompt-engineering-guide` | GPT 5.x 통합 — lean outcome-first(**5.6 Sol = 기본**) + outcome-first(5.5) + legacy XML stack(5.4/5.2) |
| `prompt-engineering-guide` | Claude 프롬프트 전략 — 현행(**Opus 4.8 = 기본** · Fable 5 · Sonnet 5) + 구세대(Opus 4.5/4.6/4.7, Sonnet 4.5/4.6, Haiku 4.5) |
| `prompt-engineering-guide` | Gemini 3 프롬프트 전략 (NB2 포함) |
| `prompt-engineering-guide` | 이미지 생성 프롬프트 가이드 (공냥이 @specal1849 자료 기반) |
| `prompt-engineering-guide` | 팩트체크/리서치 프롬프트 가이드 (IFCN 원칙 기반) |

---

## 참고 문서 출처 (Reference Sources)

이 가이드 작성에 참고한 공식 문서 및 자료 목록입니다.

### OpenAI 공식 문서

| 문서 | URL | 주요 내용 |
|------|-----|----------|
| GPT-5.2 Prompting Guide | https://cookbook.openai.com/examples/gpt-5-2_prompting_guide | reasoning_effort, XML 구조, 장황함 제어 |
| GPT-5.4 Prompt Guidance | — | Output Contract, Agentic Patterns, Eagerness Control |
| GPT-5.2-Codex Prompting Guide | https://cookbook.openai.com/examples/gpt-5-codex_prompting_guide | 코딩 에이전트 전용 최적화, Anti-Prompting |
| Introducing GPT-5.2-Codex | https://openai.com/index/introducing-gpt-5-2-codex/ | Codex 모델 소개 및 특성 |

### Anthropic 공식 문서

| 문서 | URL | 주요 내용 |
|------|-----|----------|
| Claude 4.5 What's New | https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-5 | Claude 4.5 모델 변경사항, Extended Thinking |
| Claude 4.6 Prompt Guide | — | Adaptive Thinking, Effort Parameter, Prefill 제거, Over-prompting |
| Claude 4 Best Practices | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices | 명시적 지시, 병렬 도구 호출, 프론트엔드 가이드라인 |

### Google 공식 문서

| 문서 | URL | 주요 내용 |
|------|-----|----------|
| Veo API Documentation | https://ai.google.dev/gemini-api/docs/video?hl=ko | 동영상 생성 API, 확장, 참조 이미지 |
| Image Generation (Nano Banana) | https://ai.google.dev/gemini-api/docs/image-generation?hl=ko | 이미지 생성 API, 프롬프트 구조 |
| NanoBanana2 (NB2) Guide | — | NB2 서술형 프롬프트, 5요소 프레임워크, 14종 비율 |

### 내부 참조 자료

| 자료 | 위치 | 내용 |
|------|------|------|
| Threads 크롤링 결과 | `AI_Second_Brain/Threads/` | @choi.openai 게시물 기반 전략 |
| GPT-5.2 프롬프트 전략 | `AI_Second_Brain/Threads/GPT-5.2-프롬프트-전략.md` | 상세 프롬프트 패턴 |
| Claude 4.5 프롬프트 전략 | `AI_Second_Brain/Threads/Claude-4.5-프롬프트-전략.md` | Claude 전용 최적화 |

---

## 중간 구조화 워크플로우 (Step 1.7)

프롬프트 생성 전, 목적에 따라 **중간 구조화 단계**를 수행하여 품질을 높입니다.

> ⚠️ **CRITICAL: 동영상 생성 시 스토리보드 단계 생략 절대 금지**
> - 동영상 요청 시 **반드시** 스토리보드를 먼저 생성
> - 사용자가 스토리보드 확인 후 프롬프트 생성 진행
> - 이 단계를 건너뛰면 품질이 크게 저하됨

### 적용 조건

| 목적 | 구조화 유형 | 출력 형식 | 다음 단계 |
|------|------------|----------|----------|
| **동영상생성** | 스토리보드 | 시간순 장면 테이블 + JSON | 시간초별 프롬프트 생성 |
| **글쓰기/창작** | 개요 | 섹션별 목록 | 섹션별 프롬프트 생성 |
| **분석/리서치** | 개요 | 섹션별 목록 | 섹션별 프롬프트 생성 |

### 동영상: 스토리보드 생성 (MANDATORY)

**자동 수행 (생략 금지):**
1. 사용자 요청을 분석하여 스토리보드 생성
2. 시간순으로 장면 구성 (오프닝 → 전개 → 클라이막스)
3. 각 장면별: 설명, 캐릭터 행동, 조명/빛, 카메라 워크, 오디오 정의

**스토리보드 필수 요소 체크리스트:**

| 요소 | 설명 | 예시 |
|------|------|------|
| **sequence** | 장면 순서 | 1, 2, 3... |
| **duration** | 장면 길이 | "3s", "2.5s" |
| **description** | 장면 + 캐릭터 행동 + 조명/빛 | "Santa waves with rosy cheeks, golden glow from moon" |
| **camera** | 카메라 위치 + 모션 | "Wide establishing shot, slow pan following sleigh" |
| **audio** | 대사 + 효과음 + 배경음 | "Jingle bells, Santa's laugh: 'Ho ho ho!'" |

**스토리보드 출력 형식 (반드시 준수):**

```markdown
## 📋 스토리보드

### 장면 구성

| # | 시간 | 장면 설명 | 조명 | 카메라 | 오디오 |
|---|------|----------|------|--------|--------|
| 1 | 0-3초 | [장면 + 캐릭터 행동] | [조명/빛] | [카메라 워크] | [대사/효과음/배경음] |
| 2 | 3-6초 | [장면 + 캐릭터 행동] | [조명/빛] | [카메라 워크] | [대사/효과음/배경음] |
| 3 | 6-8초 | [장면 + 캐릭터 행동] | [조명/빛] | [카메라 워크] | [대사/효과음/배경음] |

### 프롬프트 JSON (상세)

---
✅ 이 스토리보드로 프롬프트를 생성할까요? (Y/수정 요청)
```

**스토리보드 기반 동영상 프롬프트 JSON (상세 예시):**

```json
{
  "model": "Veo 3.1",
  "shared_style": {
    "visual_style": "Cute and whimsical 2D storybook illustration, soft textures, vibrant festive colors (red, green, gold)",
    "color_grade": "Warm golden glow from the moon against a deep indigo starry night",
    "aspect_ratio": "16:9"
  },
  "scenes": [
    {
      "sequence": 1,
      "duration": "3s",
      "description": "Santa's sleigh pulled by reindeer enters from the left, flying over a cozy, snow-covered village with glowing windows. Stardust falls from the runners.",
      "camera": "Wide establishing shot, slow pan following the sleigh's path.",
      "audio": "Ambient quiet night, distant wind, and light jingle bells."
    },
    {
      "sequence": 2,
      "duration": "3s",
      "description": "Close-up on Santa Claus, rosy cheeks and a big smile. He waves his hand and tosses a brightly wrapped gift box toward a village chimney.",
      "camera": "Medium close-up on Santa, moving at the same speed as the sleigh.",
      "audio": "Santa's hearty laugh: 'Ho ho ho! Merry Christmas!'"
    },
    {
      "sequence": 3,
      "duration": "2s",
      "description": "The sleigh accelerates toward a large, bright full moon, becoming a silhouette while golden sparkles fill the screen.",
      "camera": "Zoom out showing the entire landscape as the sleigh disappears into the distance.",
      "audio": "Upbeat festive orchestral music reaching a gentle climax, then fading."
    }
  ],
  "negative": "realistic photography, 3D render, dark or scary atmosphere, distorted faces, wall, frame",
  "details": "High-quality digital illustration, clean outlines, cozy and joyful mood, magical glittering effects."
}
```

### 글쓰기/리서치: 개요 생성

**자동 수행:**
1. 사용자 요청을 분석하여 개요(아웃라인) 생성
2. 논리적 구조로 섹션 구성
3. 각 섹션별: 목표, 핵심 포인트 정의

**개요 출력 형식:**

```markdown
## 📋 개요

### 글 구조

1. **서론** - [핵심 메시지]
   - 도입부 훅
   - 배경 설명

2. **본론 1** - [첫 번째 논점]
   - 주요 내용
   - 예시/근거

3. **본론 2** - [두 번째 논점]
   - 주요 내용
   - 예시/근거

4. **결론** - [정리 및 Call-to-Action]
   - 요약
   - 다음 단계 제안

---
✅ 이 개요로 프롬프트를 생성할까요? (Y/수정 요청)
```

### 중간 구조화의 이점

1. **명확한 방향성**: 프롬프트 생성 전 구조 확정
2. **품질 향상**: 단계별 검토로 누락 방지
3. **사용자 참여**: 중간 확인으로 의도 반영
4. **일관성 유지**: 전체 흐름의 논리적 연결

---

## 통합 부록: 이전 분리 스킬 병합본

아래 부록은 기존 분리 스킬의 실무 지침을 삭제하지 않고 단일 파일 안으로 가져온 내용입니다. 새 업데이트는 각 부록 또는 본문 섹션에 직접 반영합니다.

---

### GPT-5.5 outcome-first + legacy GPT XML

### GPT-5.5 프롬프트 향상 스킬 (Outcome-First + Legacy XML)

> 🆕 **GPT 기본 모델 = GPT-5.6 Sol** (2026-07): lean outcome-first — 최신 규칙은 `skills/gpt-5.6-prompt-enhancement.md` 참조. 아래 5.5 내용은 legacy 계보 보존.
> **Version**: 1.1.0 | **Updated**: 2026-04-30
> **Source**: [OpenAI GPT-5.5 Prompt Guidance (2026-04)](https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5)
> **Scope**: GPT 5.x 구세대 통합 — outcome-first markdown(5.5) + legacy XML stack(5.4/5.2 명시 시). GPTs/Gems 첨부파일 10개 한도 대응으로 단일 파일에 통합.

---

#### 핵심 변화 요약 (vs GPT-5.4)

| 항목 | GPT-5.4 | GPT-5.5 |
|------|---------|---------|
| 기본 구조 | XML 12블록 stack | Markdown 6섹션 (outcome-first) |
| 절차 지시 | step-by-step 명시 권장 | destination + success criteria 우선 |
| 절대 규칙 | ALWAYS / NEVER 사용 | judgment 영역에선 자제 |
| Reasoning effort | 기본 medium~high | **low/medium 우선**, 부족할 때만 escalate |
| Retrieval | 적극 권장 | budget 정의 (빈도 줄임) |
| Output 형식 | 구조화 디폴트 | plain paragraph 디폴트, bullets sparingly |
| Verbosity | output_verbosity_spec 블록 | text.verbosity = "low" + 짧은 contract |

---

#### 트리거 조건

다음 상황에서 이 스킬을 활성화:
- 사용자가 "GPT-5.5용 프롬프트", "ChatGPT GPT-5.5", "Codex GPT-5.5" 명시
- Batch 모드에서 첫 토큰이 `GPT-5.5` 일 때
- 모델 미지정 + 일반 Q&A/단순 작업이면 5.5 outcome-first 권장 (legacy 5.4 XML stack은 명시 요청 시만)

> ⚠️ **GPT-5.4 호환**: 사용자가 "5.4 XML 스타일", "legacy XML stack" 등을 명시하면 GPT-5.4 enhancement로 fallback.

---

#### 권장 프롬프트 구조 (Markdown, 6섹션)

```markdown
Role:
[1-2 문장. 기능 + 컨텍스트]

### Personality
[톤·태도·격식. 짧게 유지.]

### Goal
[사용자가 받게 될 최종 산출물 1-2문장.]

### Success Criteria
- [최종 답 전 충족해야 할 조건들]
- [필요 시 검증 통과 / 누락 항목 처리 명시]

### Constraints
- [정책·안전·증거·부작용 한계]
- [사실 조작 금지 / 보존할 것 명시]

### Output
[섹션·길이·톤. 플레인 텍스트 디폴트, 헤더/불릿은 가독성 향상 시만.]

### Stop Rules
- [도구 루프·재시도·중단 조건]
- [매 결과 후 "Can I answer the core request now with useful evidence?" 자가점검]
```

---

#### 필수 적용 블록 (6개)

##### 1. `outcome_first_structure` — destination 우선 정의

**용도**: 절차보다 산출물과 성공 조건을 먼저 고정.

```markdown
Role:
You are a pragmatic assistant helping the user complete the task end to end.

### Goal
Deliver a usable final artifact that directly satisfies the user's request.

### Success Criteria
- The core request is answered or completed.
- Missing assumptions are stated briefly.
- Any required validation is performed or explicitly marked as not run.
```

##### 2. `personality_and_collaboration` — 톤·협업 스타일

**용도**: 톤(Personality)과 상호작용 방식(Collaboration Style)을 짧게 분리 정의.

```markdown
### Personality
Steady, direct, and concise. Be helpful without becoming verbose.

### Collaboration Style
State what you are doing before multi-step tool work. Ask only for the smallest missing input when blocked.
```

**Steady 예시** (공식 가이드):
> "You are a capable collaborator: approachable, steady, and direct. Assume the user is competent and acting in good faith. Stay concise without becoming curt."

**Expressive 예시** (공식 가이드):
> "Adopt a vivid conversational presence: intelligent, curious, playful when appropriate. Be warm, collaborative, and polished."

##### 3. `constraints_block` — 압축 제약

**용도**: 정책·증거·부작용 제한을 짧게.

```markdown
### Constraints
- Do not invent facts, metrics, names, dates, or capabilities.
- Preserve existing working behavior unless the user asks to change it.
- Prefer the simplest solution that satisfies the success criteria.
```

##### 4. `output_contract` — 응답 형식 계약

**용도**: 응답 구조·길이를 가볍게 명시. `text.verbosity = low` 와 호흡.

```markdown
### Output
Use concise Markdown. Prefer short paragraphs and bullets only when they improve scanability.
Include completed work, validation status, and blockers if any.
```

##### 5. `stop_rules` — 도구 루프·종결

**용도**: 불필요한 retrieval/tool loop 차단.

```markdown
### Stop Rules
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

##### 6. `validation_rules` — 검증 안내

**용도**: 작업 유형별 가벼운 검증 트리거.

```markdown
### Validation
- Coding: run the most relevant targeted test, type check, lint, build, or smoke test.
- Visual: render and inspect for layout, clipping, spacing, and missing content.
- Planning: include requirements, named resources, state transitions, validation commands, and failure behavior.
- Creative drafting: ground product/customer/metric/capability claims in retrieved facts; otherwise label assumptions clearly.
```

---

#### Preamble (멀티스텝/도구 작업 시)

```markdown
Before any tool calls for a multi-step task, send a short user-visible update that acknowledges the request and states the first step.
```

도구 1-2회만 쓰는 단순 작업엔 생략.

---

#### Phase Parameter (Responses API, 멀티턴)

장기 실행 Responses 워크플로:
- Replay 시 assistant `phase` 보존
- `phase: "commentary"` — intermediate updates
- `phase: "final_answer"` — 최종 답변
- user 메시지에는 `phase` 추가 X

---

#### Anti-Patterns (GPT-5.5에서 회피)

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

#### Reasoning Effort 권장값 (5.5 기준)

| 작업 | 권장 effort | 비고 |
|------|------------|------|
| 일반 Q&A, 짧은 작업 | `low` | 5.4 대비 1단계 낮춤 |
| 중간 복잡도 분석/추출 | `medium` | 검증 필요시 high로 escalate |
| 장기 코딩, 다단 검증 | `high` | 결과 검증 후 유지/하향 |
| 안전·법률·금융 고위험 | `xhigh` | 변동 적게 |

> 실패하거나 결과가 부족할 때만 effort를 한 단계 올리세요. Reasoning trace 폭주는 비용·지연을 키웁니다.

---

#### Creative Drafting Guardrails

슬라이드·카피·리더십 블러브 등:
- 검색된 사실로만 product/customer/metric/capability 클레임 작성
- 특정 이름·1자 데이터·메트릭·고객 결과 발명 금지
- 근거 부족 시 generic 초안 + "labeled assumptions" 명시

---

#### Editing Tasks

```markdown
Preserve the requested artifact, length, structure, and genre first.
Quietly improve clarity, flow, and correctness.
```

---

#### Migration: GPT-5.4 → GPT-5.5

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

#### Legacy GPT-5.2/5.4 XML Stack (참조용 — "5.4 XML 스타일" 명시 시 사용)

GPT-5.4 이하 모델 또는 사용자가 "legacy XML 스타일" 명시 시 다음 12 블록을 적용합니다. (이전 별도 파일 `prompt-engineering-guide.md`를 본 섹션으로 통합 — 2026-04-30 v1.1.0)

##### 1. `<output_verbosity_spec>` — 장황함 제어 (항상 포함)

```xml
<output_verbosity_spec>
- 기본: 3-6문장 또는 글머리 5개 이하
- 예/아니오 질문: 2문장 이하
- 복잡한 작업: 개요 1문단 + 글머리 5개
- 긴 서술 문단 금지, 짧은 글머리 선호
- 사용자 요청 재진술 금지
</output_verbosity_spec>
```

##### 2. `<design_and_scope_constraints>` — 범위 제약 (코딩/디자인)

```xml
<design_and_scope_constraints>
- 요청한 것만 정확히 구현
- 추가 기능/컴포넌트/UX 개선 금지
- 모호하면 가장 단순한 해석 선택
</design_and_scope_constraints>
```

##### 3. `<uncertainty_and_ambiguity>` — 불확실성 처리 (분석/리서치)

```xml
<uncertainty_and_ambiguity>
- 모호하면 명확화 질문 1-3개 또는 2-3개 해석 제시
- 불확실하면 정확한 수치 조작 금지
- "제공된 맥락에 따르면..." 표현 사용
</uncertainty_and_ambiguity>
```

##### 4. `<tool_usage_rules>` — 도구 사용 (에이전트)

```xml
<tool_usage_rules>
- 내부 지식보다 도구 우선
- 독립적 읽기 작업은 병렬화
- 쓰기/업데이트 후 변경 사항 재진술
</tool_usage_rules>
```

##### 5. `<extraction_spec>` — 구조화된 추출 (PDF/Office)

```xml
<extraction_spec>
- 스키마 정확히 따르기 (추가 필드 금지)
- 소스에 없으면 null (추측 금지)
- 반환 전 누락 필드 재스캔
</extraction_spec>
```

##### 6. `<output_contract>` — 출력 계약 (GPT-5.4)

```xml
<output_contract>
- format: [markdown | json | plain_text | xml]
- max_length: [토큰 수 또는 "as_needed"]
- structure: [headings | bullet_list | numbered_steps | table]
- language: [ko | en | match_input]
</output_contract>
```

##### 7. `<follow_through_policy>` — 후속 이행 (에이전트)

```xml
<follow_through_policy>
- 도구 호출 실패 시: 1회 재시도 후 사용자에게 알림
- 빈 결과 시: 대안 검색어로 재시도 (최대 2회)
- 부분 결과 시: 있는 결과로 진행, 누락 부분 명시
- 사용자 확인 필요 시: 명확화 질문 1개 (선택지 포함)
</follow_through_policy>
```

##### 8. `<completeness_contract>` — 완전성

```xml
<completeness_contract>
- 입력 목록의 모든 항목을 처리할 것
- 처리 완료 후 누락 항목 체크리스트 실행
- 누락 발견 시 즉시 보충 (사용자 확인 불필요)
- 최종 출력에 "처리 완료: N/N건" 표시
</completeness_contract>
```

##### 9. `<tool_persistence>` / `<dependency_check>` / `<parallel_calling_strategy>` — 에이전틱

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

##### 10. `<eagerness_control>` — 적극성 제어

```xml
<eagerness_control>
- 탐색 과잉 방지: 요청 범위 내에서만 행동
- 탐색 부족 방지: 모호한 요청도 가장 유용한 해석으로 진행
- 기본 모드: "moderate"
</eagerness_control>
```

##### 11. `<empty_result_recovery>` — 빈 결과 복구

```xml
<empty_result_recovery>
- 빈 결과 시 대안 검색어/접근법으로 자동 재시도
- 최대 2회 재시도 후 "결과 없음" 보고
- 최종 출력 전 검증 루프 실행
</empty_result_recovery>
```

##### 12. `<missing_context_gating>` — 누락 컨텍스트

```xml
<missing_context_gating>
- 필수 정보 부재 시: 명확화 질문 (선택지 2-3개 포함)
- 선택적 정보 부재 시: 합리적 기본값으로 진행, 가정 명시
- 질문은 1회로 제한 (연쇄 질문 금지)
</missing_context_gating>
```

> **legacy 적용 트리거**: 사용자가 "5.4 스타일", "legacy XML stack", "GPT-5.4용 / GPT-5.2용 프롬프트" 명시 또는 GPT-5.4 / 5.2 / 5 / 4o 이하 모델 지정 시. 그 외 모든 GPT 작업은 위 outcome-first 6섹션 사용.

---

#### 예시: 웹 리서치 에이전트 (5.5 outcome-first)

```markdown
Role:
You are an expert research assistant.

### Goal
Provide a verified answer to the user's question with citations for any factual claim.

### Success Criteria
- All factual claims trace to a retrieved source.
- Contradictions across sources are flagged and resolved.
- The user's intent is fully covered without restating their question.

### Constraints
- Do not fabricate sources, dates, or numbers.
- Prefer recent sources when facts may have changed.

### Output
Concise Markdown. Lead with the answer. Then cite sources inline.

### Stop Rules
After the first broad search, retrieve again only when required facts are missing or unsupported.
Stop when success criteria are met.
```

---

#### 예시: 코딩 에이전트 (5.5 outcome-first + validation)

```markdown
Role:
You are a senior engineer pairing with the user.

### Goal
Ship a focused change that satisfies the user's request and passes the most relevant validation.

### Success Criteria
- The change compiles, type-checks, and passes targeted tests.
- No drive-by refactors or unrelated edits.
- Edited files and the validation result are reported.

### Constraints
- Preserve existing behavior unless the request changes it.
- Prefer the simplest solution.

### Output
Plain Markdown. Show the diff or list of edited files, then the validation outcome.

### Stop Rules
Run the most relevant validation (test/type/lint/build/smoke).
Stop when success criteria are met.
Ask only for the smallest missing input if blocked.
```

---

#### 참고 자료

- [GPT-5.5 Prompt Guidance (공식)](https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5)
- `prompt-engineering-guide.md` — 모델별 통합 전략

---

---

### Claude 현행 모델 전략 (Fable 5 · Opus 4.8 · Sonnet 5) 🆕

> **Updated**: 2026-07-21 | **Source**: [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8) + [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5) — 상세: `skills/claude-fable-5-prompt-strategies.md`
> **Covers**: **Claude Fable 5** (최고난도·장기 자율), **Opus 4.8** (Claude 디폴트, 2026-06-10부터), **Sonnet 5** (Sonnet 최신)

핵심 철학: 세 모델 모두 **지시 따르기가 강해져 "열거형 장문 프롬프트"가 역효과** — 짧고 정확한 지시 1개 > 행동 나열 10개. 이전 모델용 과잉 처방의 다이어트가 마이그레이션의 본체.

**모델 선택**: 가장 어려운 미해결 문제·며칠 단위 자율 run·병렬 서브에이전트 = **Fable 5** / 검증된 파이프라인·예측 가능한 동작 = **Opus 4.8** / 속도·비용 균형(准-Opus 코딩) = **Sonnet 5**.

**Opus 4.8 핵심**:
- `effort`가 최우선 레버 — 코딩·agentic = `xhigh`, 지능 민감 최소 `high`. 얕은 추론 = 프롬프트 우회 말고 effort ↑. `max_tokens` 64K부터.
- thinking 기본 off — `thinking: {type: "adaptive"}` 명시 필요. `budget_tokens`/`temperature`/`top_p`/prefill = **400 에러**.
- verbosity 자동 조정·literal 해석("Apply this to **every** section") · 도구/서브에이전트 사용 보수적(언제/왜 명시로 보정).
- 코드리뷰 recall 함정: "high-severity만" 옛 지시를 충실히 따름 → coverage 단계와 filter 단계 분리 프롬프트.

**Fable 5 핵심**:
- adaptive thinking 전용 — `thinking` 파라미터 자체를 생략(disabled도 400). reasoning 재출력 지시 = refusal 위험.
- 더 긴 turn이 기본값(수 분~수 시간) — timeout·스트리밍·진행 표시 선조정.
- 짧은 지시 1개로 steering: "Lead with the outcome." / 진행 주장 grounding: "Before reporting progress, audit each claim against a tool result."
- 경계 명시: 문제 서술·질문이면 진단만 보고하고 정지(무단 수정 금지 스니펫).

**Sonnet 5 핵심**: 신규 tokenizer(동일 텍스트 ~30% 토큰 증가 — 버짓 보수 산정) · `budget_tokens` 완전 제거(400) · `effort` low~max 지원(기본 high) · thinking 생략 시 adaptive 기본.

---

### Claude 4.x prompt strategies (구세대 — 4.7 이하 참고 보존)

### Claude 프롬프트 전략

> **Version**: 3.2.0 | **Updated**: 2026-04-30 | ⚠️ **구세대 참고 문서** — 현행(Fable 5·Opus 4.8·Sonnet 5)은 위 "Claude 현행 모델 전략" 섹션 참조
> **Source**: Anthropic 공식 문서 ([platform.claude.com — Claude 4 best practices](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) + [Migration](https://platform.claude.com/docs/en/docs/about-claude/models/migrating-to-claude-4) + [Adaptive Thinking](https://platform.claude.com/docs/en/docs/build-with-claude/adaptive-thinking) + [Extended Thinking](https://platform.claude.com/docs/en/docs/build-with-claude/extended-thinking))
> **Covers**: **Opus 4.7**, **Opus 4.6** (first-class 유지), **Sonnet 4.6** (4.5 대비 effort 기본값 변경), Opus 4.5, Sonnet 4.5, Haiku 4.5

Claude 4.x 구세대 모델군 (Opus 4.5/4.6/4.7, Sonnet 4.5/4.6, Haiku 4.5)은 **정밀한 지시 따르기**를 위해 훈련되었습니다. **4.7은 4.6보다 더 리터럴하게 해석**하므로 범위 명시가 더 중요합니다. **Opus 4.6도 여전히 first-class**로 사용 가능 — 사용자가 명시하면 4.6 코드 패턴을 그대로 적용 (4.7 마이그레이션 강요 금지). 4.6 vs 4.7 의사결정은 Part 0.6 참조.

---

#### Part 0: Opus 4.7 Breaking Changes (2026-04-16) 🚨

| 항목 | 구 (Opus 4.6) | 신 (Opus 4.7) |
|------|--------------|--------------|
| Thinking | `thinking: {type: "enabled", budget_tokens: 16000}` | `thinking: {type: "adaptive"}` 전용 — `budget_tokens` 설정 시 **400 에러** |
| Sampling | `temperature`, `top_p`, `top_k` 지원 | 비기본값 설정 시 **400 에러** — 완전 제거 |
| Prefill | 마지막 assistant 턴 미리 채우기 | **400 에러** — Structured Outputs 또는 `output_config.format`로 이전 |
| Effort | low/medium/high/max | low/medium/high/**xhigh**(신규)/max |
| Thinking display 기본값 | `summarized` | **`omitted`** (thinking 필드 빈 문자열) — 표시 원하면 `display="summarized"` 명시 |
| Tokenizer | 기존 | **신규 토크나이저** — 동일 텍스트 ~35% 더 많은 토큰. `count_tokens` 재테스트 + `max_tokens` 여유분 추가 권장 |
| `output_format` 파라미터 | 지원 | deprecated → `output_config.format`으로 이전 |
| Knowledge cutoff | 2025-05 | 2026-01 |
| Image 최대 해상도 | 1568px | **2576px / 3.75MP** (3x), 토큰 최대 4,784/장 (이전 ~1,600) |
| Task Budget | 없음 | `task_budget` (beta header `task-budgets-2026-03-13`, 최소 20k) — soft guide(모델 인지) vs `max_tokens`=hard cap(모델 미인지) |
| Tool use 성향 | 공격적 | 보수적 (reasoning 선호) — 도구 사용 늘리려면 effort↑ 또는 명시적 지시 |
| Subagent 스폰 | 공격적 | 보수적 (steerable) — 명시적 가이드 필요 |
| 응답 길이 | 일정 | **자동 조정** — 단순→짧게, 복잡→길게. 기존 length 제어 프롬프트 재검토 |
| 어조 | 친근/validation-forward | 더 직접적 — emoji 감소, "Great question!" 류 감소 |
| LaTeX 출력 | 기본 사용 | 기본 미사용 — 필요 시 명시 ("Format math in LaTeX") |

**공식 인용**: *"We expect effort to be more important for this model than for any prior Opus."*

##### Opus 4.7 기본 코드 패턴

```python
client.messages.create(
    model="claude-opus-4-7",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "xhigh"},
    messages=[{"role": "user", "content": "..."}],
)
```

##### Opus 4.7 권장 XML 블록 (공식 템플릿)

```xml
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel. However, if some tool calls depend on previous calls, do NOT call these tools in parallel.
</use_parallel_tool_calls>

<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Give grounded and hallucination-free answers.
</investigate_before_answering>

<explicit_scope>
Apply this formatting to EVERY section, not just the first one. Do not silently generalize — apply the instruction exactly as stated to every listed item.
</explicit_scope>
```

##### Opus 4.7 Prefill 마이그레이션

| 구 prefill 용도 | 신 대안 |
|----------------|--------|
| 포맷 강제 | Structured Outputs / `output_config.format` |
| Preamble 제거 | system: `"Respond directly without preamble."` |
| 거절 우회 | 명확한 user message (4.7 거절 판정 개선) |
| 연속 완성 | user 턴: `"Your previous response ended with [text]. Continue."` |

---

#### Part 0.3: Sonnet 4.6 운용 차이 (vs Opus 4.7)

> Sonnet 4.6은 4.7과 같은 adaptive thinking + effort 패러다임을 쓰지만, **xhigh 미지원**과 **effort 기본값 변경**으로 4.5 사용자가 마이그레이션 시 지연 증가를 겪을 수 있습니다.

| 항목 | Opus 4.7 | Sonnet 4.6 |
|------|----------|------------|
| Model ID | `claude-opus-4-7` | `claude-sonnet-4-6` |
| 가격 (Input/Output) | $5/$25 per MTok | $3/$15 per MTok |
| 컨텍스트 / Max Output | 1M / 128K | 1M / 64K |
| `budget_tokens` | **400 에러** | deprecated, 아직 작동 (adaptive 권장) |
| `xhigh` effort | 지원 | **미지원** (low/medium/high/max만) |
| `effort` 기본값 | `high` | `high` ⚠️ Sonnet 4.5엔 effort 자체가 없었음 → 마이그레이션 시 **지연 증가** |
| `thinking` display 기본값 | `omitted` | `summarized` |
| Knowledge cutoff | 2026-01 | 2025-08 |

**Sonnet 4.5 → 4.6 마이그레이션 권장:**

```python
### Sonnet 4.6 일반 앱: medium effort 명시 (기본 high는 지연 증가)
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "medium"},  # 또는 "low" — 고볼륨/지연민감
    messages=[...],
)

### Sonnet 4.5 동등 성능 — thinking 비활성
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=8192,
    thinking={"type": "disabled"},
    output_config={"effort": "low"},
    messages=[...],
)
```

---

#### Part 0.5: 회귀 체크포인트 (Opus 4.6/Sonnet 4.5 → 4.7/4.6 마이그레이션 시)

| 회귀 증상 | 원인 | 대응 |
|----------|------|------|
| 응답 길이 변화 (너무 짧거나 김) | 4.7 자동 길이 조정 | 기존 length 제어 프롬프트 제거 후 재베이스라인. 필요 시 새 length 가이드 추가 |
| 도구 미사용 / 호출 감소 | 4.7 보수적 성향 | `effort` high/xhigh로 상향 또는 시스템 프롬프트에 명시적 도구 사용 지시 |
| 과소 추론 / 표면적 답변 | `effort` 기본값 부적합 | `effort` 한 단계 상향 (low → medium → high) |
| 코드 리뷰 recall 하락 | 보수적 출력 성향 | `"report every issue including low-severity"` 명시 |
| 서브에이전트 스폰 부족 | 4.7 보수적 기본값 | 시스템 프롬프트에 명시적 서브에이전트 가이드 추가 |
| 갑자기 emoji/축하어 사라짐 | 4.7 직접적 어조 | 정상 — 필요 시 페르소나 블록에서 명시적으로 톤 지정 |
| LaTeX 안 나옴 | 4.7 기본 미사용 | `"Format math expressions in LaTeX"` 명시 |
| 사이버 보안 요청 거부 | 4.7 세이프가드 강화 | 정상 사용처라면 [Cyber Verification Program](https://platform.claude.com/) 신청 |
| 단순 요청에도 thinking 폭주 | adaptive 자율 판단 + effort 과다 | "Extended thinking adds latency and should only be used when it will meaningfully improve answer quality. When in doubt, respond directly." 시스템에 추가 |
| API 400 에러 | budget_tokens / temperature / prefill / output_format 잔존 | Part 0 표 항목별 마이그레이션 적용 |

---

#### Part 0.6: Opus 4.6 vs 4.7 — 언제 어느 쪽? (NEW v3.2.0)

> **원칙**: 4.7이 최신·최강이지만 **4.6도 first-class로 운영**. 사용자가 명시하면 4.6 코드 패턴을 그대로 사용. 4.7 마이그레이션 강요 금지.

##### 의사결정 매트릭스

| 시나리오 | 권장 모델 | 이유 |
|---------|----------|------|
| 사용자가 "Opus 4.6", "이전 Opus", "claude-opus-4-6" 명시 | **Opus 4.6** | 명시 우선 — 4.7 마이그레이션 강요 금지 |
| 신규 코딩 에이전트, 장시간 자율 실행 | **Opus 4.7** (`xhigh`) | 4.7 신규 effort + task_budget 조합 |
| 기존 4.6 프로덕션 안정성 (회귀 위험 높음) | **Opus 4.6** 유지 | 회귀 매트릭스 통과 후에만 4.7 전환 |
| `temperature` / `top_p` / `top_k` 필요 (기존 코드) | **Opus 4.6** | 4.7은 비기본값 시 400 에러 |
| Prefill (마지막 assistant 턴) 의존 코드 | **Opus 4.6** | 4.7은 400 에러 — 마이그레이션 후 4.7 |
| `budget_tokens` 명시적 제어 필요 | **Opus 4.6** | 4.7은 adaptive 전용 |
| 비용 절감 + 200K 컨텍스트로 충분 | Opus 4.6 | 4.7 가격($5/$25) 동일하나 1M context는 불필요 시 4.6 충분 |
| 이미지 입력 > 1568px (고해상도) | **Opus 4.7** | 4.7 max 2576px / 3.75MP |
| Knowledge cutoff 2025-05 이후 사실 필요 | **Opus 4.7** | 4.6 cutoff 2025-05, 4.7 cutoff 2026-01 |
| Hard Prompts / Math / Complex Reasoning | **Opus 4.7** (`xhigh`) | LMArena 1순위, effort 레버 |
| 단순 lookup, 채팅, 저비용 대량 처리 | Sonnet 4.6 또는 Haiku 4.5 | Opus 양쪽 다 과스펙 |

##### 명시 트리거 (이 스킬 내부 라우팅)

| 사용자 표현 | 적용 코드 패턴 |
|------------|---------------|
| "Opus 4.7", "최신 Opus", "claude-opus-4-7" | Part 1.1 + Part 0 (4.7 패턴) |
| "Opus 4.6", "이전 Opus", "기존 Opus", "claude-opus-4-6" | Part 1.2 + Part 4.5/4.6 (4.6 패턴) |
| "비용 절감 Opus", "안정성 우선 Opus" | Opus 4.6 (회귀 위험 낮음) |
| Opus 모델 미지정 + 일반 코딩/에이전트 | Opus 4.7 (디폴트) |
| Opus 모델 미지정 + 기존 4.6 프롬프트 마이그레이션 | Opus 4.6 유지 권장 + 4.7 회귀 매트릭스 안내 |

##### Opus 4.6 기본 코드 패턴 (참조용)

```python
client.messages.create(
    model="claude-opus-4-6",
    max_tokens=64000,
    thinking={"type": "adaptive"},  # 또는 {"type": "enabled", "budget_tokens": 16000} (4.6은 OK)
    output_config={"effort": "high"},  # xhigh 미지원
    messages=[{"role": "user", "content": "..."}],
    # temperature, top_p, top_k 사용 가능 (4.7과 달리 400 에러 없음)
)
```

**4.6 → 4.7 회귀 체크 (전환 전 필수)**: Part 0.5 회귀 매트릭스 10개 항목 모두 통과 후 전환.

---

#### Part 1: 모델 개요

##### 1.1 Opus 4.7 (최신, 2026-04-16)

| 모델 | Model ID | 특징 | 컨텍스트 | Max Output | 비고 |
|------|----------|------|----------|------------|------|
| **Opus 4.7** | `claude-opus-4-7` | 코딩 1위, adaptive thinking, `effort=xhigh` 신규, task_budget beta | 1M (no premium) | 128K | Knowledge cutoff 2026-01, 이미지 2576px |

##### 1.2 Claude 4.6

| 모델 | Model ID | 특징 | 컨텍스트 | Max Output | 가격 (Input/Output) |
|------|----------|------|----------|------------|---------------------|
| Opus 4.6 | `claude-opus-4-6` | 최고 지능, Adaptive Thinking 자동, 128K output | 200K | 128K | $5/$25 per 1M |
| Sonnet 4.6 | `claude-sonnet-4-6` | 최고 코딩/에이전트, Fast Mode (2.5x) | 200K, 1M (beta) | 128K | $3/$15 per 1M |

**4.6 핵심 변경사항:**
- **Adaptive Thinking**: `thinking: {type: "adaptive"}` — 모델이 자율적으로 사고 깊이 결정
- **128K Max Output**: 기존 대비 대폭 증가 (beta: `anthropic-beta: output-128k-2025-02-19`)
- **1M Context (beta)**: Sonnet 4.6에서 100만 토큰 컨텍스트 지원
- **Prefill 제거**: 마지막 assistant turn 프리필 → 400 에러 (Breaking Change)
- **Effort Parameter**: `output_config: {effort: "low"|"medium"|"high"|"max"}`
- **Interleaved Thinking**: Opus 4.6에서 자동 활성화 (beta 헤더 불필요)
- **Fast Mode**: 동일 모델, 2.5배 속도

##### 1.2 Claude 4.5

| 모델 | Model ID | 특징 | 컨텍스트 | 가격 (Input/Output) |
|------|----------|------|----------|---------------------|
| **Opus 4.5** | `claude-opus-4-5-20250929` | effort 파라미터 지원 | 200K | $15/$75 per 1M |
| **Sonnet 4.5** | `claude-sonnet-4-5-20250929` | 코딩/에이전트 강점 | 200K, 1M (beta) | $3/$15 per 1M |
| **Haiku 4.5** | `claude-haiku-4-5-20251001` | 준-프론티어 속도, 최초 Haiku thinking | 200K | $1/$5 per 1M |

---

#### Part 2: 일반 원칙

##### 2.1 명시적 지시 제공

Claude 4.x는 명확하고 명시적인 지시에 잘 반응합니다. 이전 모델의 "above and beyond" 행동을 원한다면 명시적으로 요청해야 합니다.

**구체적 예시:**
```
❌ "Create an analytics dashboard"
✅ "Create an analytics dashboard. Include as many relevant features
   and interactions as possible. Go beyond the basics to create a
   fully-featured implementation."
```

##### 2.2 맥락으로 성능 향상

왜 그러한 행동이 중요한지 설명하면 더 나은 결과를 얻습니다.

```
Instead of: "Use plain text formatting"
Try: "Use plain text formatting because markdown renders poorly in
     our legacy terminal system. This ensures readability for all users."
```

##### 2.3 예시와 세부사항에 주의

Claude 4.x는 예시에 매우 주의를 기울입니다. 예시가 원하는 행동과 일치하는지 확인하세요.

---

#### Part 3: 커뮤니케이션 스타일

Claude 4.5는 이전 모델보다 간결하고 자연스러운 커뮤니케이션 스타일:

| 특성 | 설명 |
|------|------|
| **더 직접적** | 사실 기반 진행 보고, 자축적 업데이트 없음 |
| **더 대화적** | 기계적이지 않고 자연스러운 톤 |
| **덜 장황함** | 효율성을 위해 상세 요약 생략 가능 |

##### 장황함 조절

도구 호출 후 업데이트를 원한다면:
```
After completing a task that involves tool use, provide a quick
summary of the work you've done.
```

---

#### Part 4: 도구 사용 패턴

##### 4.1 명시적 행동 요청

"can you suggest some changes"라고 하면 변경 대신 제안만 할 수 있습니다.

```
❌ "Can you suggest some changes to improve performance?"
✅ "Analyze the code and implement performance improvements.
   Make the changes directly."
```

##### 4.2 기본 행동 설정

**적극적 행동 (기본으로 실행):**
```xml
<default_to_action>
By default, implement changes rather than only suggesting them.
If the user's intent is unclear, infer the most useful likely action
and proceed, using tools to discover any missing details instead of guessing.
</default_to_action>
```

**보수적 행동 (요청 시만 실행):**
```xml
<do_not_act_before_instructions>
Do not jump into implementation unless clearly instructed to make changes.
When the user's intent is ambiguous, default to providing information,
doing research, and providing recommendations rather than taking action.
</do_not_act_before_instructions>
```

##### 4.3 도구 트리거링 조절

Opus 4.5는 시스템 프롬프트에 더 민감합니다. 과거에 언더트리거링 방지를 위해 강한 언어를 사용했다면 오버트리거링이 발생할 수 있습니다.

```
❌ "CRITICAL: You MUST use this tool when..."
✅ "Use this tool when..."
```

---

#### Part 4.5: 프리필 제거 (4.6 Breaking Change)

> **CRITICAL**: Claude 4.6에서는 마지막 assistant turn에 프리필(prefill)을 넣으면 **400 에러**가 발생합니다.

##### 프리필 마이그레이션 가이드

| 기존 용도 (4.5 프리필) | 4.6 대체 방법 |
|----------------------|--------------|
| JSON 출력 강제 (`{`) | `output_config.format`으로 JSON 스키마 지정 (Structured Outputs) |
| 서문/인사말 건너뛰기 | 시스템 프롬프트에 직접 지시: "인사말 없이 바로 본론" |
| 이어쓰기/계속 생성 | user turn에 "이전 응답에 이어서 계속" 지시 |
| 특정 형식 시작 | 시스템 프롬프트에 출력 형식 명시 |

```python
### 4.5 (프리필 사용 — 4.6에서 에러)
messages = [
    {"role": "user", "content": "분석해줘"},
    {"role": "assistant", "content": "{"}  # ❌ 4.6에서 400 에러
]

### 4.6 (Structured Outputs 사용)
response = client.messages.create(
    model="claude-opus-4-6",
    messages=[{"role": "user", "content": "분석해줘"}],
    output_config={
        "format": {
            "type": "json_schema",
            "json_schema": { ... }
        }
    }
)
```

---

#### Part 4.6: Over-prompting 경고 (4.6 신규)

> **주의**: Claude 4.6은 시스템 프롬프트에 **더 민감**합니다. 과도한 프롬프트(over-prompting)는 역효과를 낳습니다.

##### 문제 패턴

| 패턴 | 증상 | 해결 |
|------|------|------|
| 과도한 강조 (`CRITICAL`, `MUST`, `NEVER` 남발) | 오버트리거링, 불필요한 도구 호출 | 평이한 언어로 변경 |
| 동일 규칙 반복 서술 | 혼란, 상충 해석 | 한 번만 명확하게 |
| 세부사항 과다 | 핵심 지시 매몰 | 핵심만 남기고 정리 |

```
❌ "CRITICAL: You MUST ALWAYS use this tool when ANY user mentions..."
✅ "Use this tool when the user asks about..."

❌ "NEVER EVER under ANY circumstances forget to..."
✅ "Always include..."
```

**핵심 원칙**: 4.6에서는 **간결하고 명확한 지시**가 길고 강조된 지시보다 더 효과적입니다.

##### 4.6.1 추가 안티패턴 (4.7에서 더욱 중요)

| 안티패턴 | 이유 / 대안 |
|---------|------------|
| `"MUST use this tool when..."` 강제 표현 | overtriggering 유발. → `"Use this tool when..."` |
| `"default to using [tool]"` 같은 blanket 기본값 | 모든 상황에 도구 강요. → `"Use when it would enhance understanding"` 식의 targeted 지시 |
| 수동 progress update 강제 스캐폴딩 (`"Print 'Step 1: ...' before each step"`) | 4.7은 자체 고품질 업데이트 제공. 제거 권장 |
| 하드코딩 유도 (테스트 통과만 목표) | 일반 해법 미달. → `"implement actual logic that solves the problem generally"` 명시 |
| 부정 지시 (`"Don't use markdown"`, `"Never use bullet points"`) | 모델 혼란. → 긍정 지시로: `"Use plain prose paragraphs"`, `"Use complete sentences"` |
| LaTeX 자동 출력 기대 (구 4.6 기본 동작) | 4.7부터 기본 미사용. → `"Format math expressions in LaTeX"` 명시 |
| extended thinking + low effort 혼용 시 thinking 폭주 | adaptive 자율 판단으로 thinking 폭주 가능 | `"Extended thinking should only be used when it will meaningfully improve answer quality. When in doubt, respond directly."` 시스템에 추가 |

---

#### Part 5: 출력 포맷 제어

##### 5.1 효과적인 방법들

1. **하지 말라 대신 하라고 지시**
```
❌ "Do not use markdown in your response"
✅ "Your response should be composed of smoothly flowing prose paragraphs."
```

2. **XML 포맷 지시자 사용**
```
"Write the prose sections of your response in <smoothly_flowing_prose_paragraphs> tags."
```

3. **프롬프트 스타일과 출력 스타일 일치**
마크다운을 줄이려면 프롬프트에서도 마크다운을 줄이세요.

4. **마크다운 최소화 상세 프롬프트**

```xml
<avoid_excessive_markdown_and_bullet_points>
When writing reports, documents, or long-form content, write in clear,
flowing prose using complete paragraphs. Use standard paragraph breaks
for organization and reserve markdown primarily for `inline code`,
code blocks, and simple headings.

Avoid using **bold** and *italics*. DO NOT use ordered lists or
unordered lists unless:
a) presenting truly discrete items where a list format is best, or
b) the user explicitly requests a list

Using prose instead of excessive formatting will improve user satisfaction.
NEVER output a series of overly short bullet points.
</avoid_excessive_markdown_and_bullet_points>
```

---

#### Part 6: 장기 추론 및 상태 추적

Claude 4.5는 **뛰어난 상태 추적 능력**으로 장기 추론에 탁월합니다.

##### 6.1 Context Awareness

Claude 4.5는 대화 중 남은 컨텍스트 창(토큰 예산)을 추적할 수 있습니다.

**컨텍스트 제한 관리:**
```
Your context window will be automatically compacted as it approaches
its limit, allowing you to continue working indefinitely from where you
left off. Therefore, do not stop tasks early due to token budget concerns.

As you approach your token budget limit, save your current progress
and state to memory before the context window refreshes.

Always be as persistent and autonomous as possible and complete tasks
fully, even if the end of your budget is approaching.
```

##### 6.2 Multi-Context Window 워크플로

1. **첫 컨텍스트 창에서 프레임워크 설정**
   - 테스트 작성, 셋업 스크립트 생성
   - 이후 컨텍스트 창에서 todo-list 반복

2. **구조화된 형식으로 테스트 추적**
   ```
   It is unacceptable to remove or edit tests because this could
   lead to missing or buggy functionality.
   ```

3. **QoL 도구 설정**
   - `init.sh` 같은 셋업 스크립트로 서버, 테스트, 린터 실행

4. **새로운 컨텍스트 시작 시**
   ```
   - Call pwd; you can only read and write files in this directory.
   - Review progress.txt, tests.json, and the git logs.
   - Manually run through a fundamental integration test before implementing.
   ```

5. **컨텍스트 전체 활용 독려**
   ```
   This is a very long task, so plan your work clearly. It's encouraged
   to spend your entire output context working on the task - just make
   sure you don't run out of context with significant uncommitted work.
   ```

##### 6.3 상태 관리 Best Practices

| 방법 | 용도 |
|------|------|
| **JSON 등 구조화 형식** | 테스트 결과, 작업 상태 등 |
| **비구조화 텍스트** | 일반 진행 노트 |
| **Git** | 완료 작업 로그 및 복원 가능한 체크포인트 |
| **점진적 진행 강조** | 진행 상황 추적 및 점진적 작업 집중 |

---

#### Part 7: Extended Thinking & Adaptive Thinking

##### 7.1 Extended Thinking (4.5)

**Sonnet 4.5와 Haiku 4.5**는 extended thinking 활성화 시 코딩/추론 작업에서 **현저히 향상**됩니다.

기본적으로 비활성화되어 있지만, 복잡한 작업에서는 활성화 권장:
- 복잡한 문제 해결
- 코딩 작업
- 멀티스텝 추론

```json
// 4.5 Extended Thinking (기존 방식)
{
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000
  }
}
```

> **Deprecated**: `budget_tokens`는 4.6에서 deprecated됨. 4.6에서는 Adaptive Thinking 사용 권장.

##### 7.2 Adaptive Thinking (4.6 신규)

**Claude 4.6**에서는 모델이 **자율적으로 사고 깊이를 결정**하는 Adaptive Thinking이 도입되었습니다.

```json
// 4.6 Adaptive Thinking (권장)
{
  "thinking": {
    "type": "adaptive"
  }
}
```

| 방식 | 모델 | 설명 |
|------|------|------|
| `type: "enabled"` + `budget_tokens` | 4.5 | 수동으로 사고 토큰 예산 설정 |
| `type: "adaptive"` | 4.6 | 모델이 작업 복잡도에 따라 자동 결정 |

**Adaptive Thinking 장점:**
- 간단한 질문 → 짧은 사고 (토큰 절약)
- 복잡한 작업 → 깊은 사고 (정확도 향상)
- `budget_tokens` 수동 튜닝 불필요

##### 7.3 Effort Parameter (4.6 신규)

Adaptive Thinking과 함께 사용하여 **응답 상세도**를 제어합니다.

```json
{
  "thinking": { "type": "adaptive" },
  "output_config": {
    "effort": "high"
  }
}
```

| Effort | 용도 | 토큰 효율 |
|--------|------|----------|
| `low` | 간단한 분류, 예/아니오 | 최고 |
| `medium` | 일반적인 대화 | 균형 |
| `high` | 상세 분석, 코딩 | 높은 품질 |
| `max` | 최고 난이도 추론 (Opus 4.6 전용) | 최대 품질 |

##### 7.4 Thinking Sensitivity (Opus 4.5)

Extended thinking 비활성화 시, Opus 4.5는 "think" 단어에 특히 민감합니다.

```
❌ "think about this problem"
✅ "consider this problem" / "evaluate this approach" / "believe"
```

##### 7.5 Thinking Display 옵션 (4.7 신규)

`thinking.display`로 thinking 필드 표시 방식을 제어합니다. **Opus 4.7 기본값이 `omitted`로 변경**되어, 이전처럼 thinking을 보려면 명시 필요합니다.

| 값 | 동작 | Opus 4.7 | Sonnet 4.6 / Opus 4.6 |
|----|------|----------|----------------------|
| `summarized` | thinking 요약 표시 | 명시 시만 | **기본값** |
| `omitted` | thinking 필드 빈 문자열 (지연 감소, 비용 동일) | **기본값** | 명시 시만 |
| `disabled` | thinking 자체 비활성 | 가능 | 가능 |

```python
### Opus 4.7에서 thinking 보고 싶다면 명시
thinking = {"type": "adaptive", "display": "summarized"}

### 지연 감소 + thinking 보지 않음
thinking = {"type": "adaptive", "display": "omitted"}
```

> **참고**: `omitted` 모드도 **비용은 동일** (thinking 토큰 과금 발생). 단지 응답에 표시 안 함.

##### 7.6 Interleaved Thinking 활용

도구 사용 후 반성이 필요한 작업에 효과적:

```
After receiving tool results, carefully reflect on their quality
and determine optimal next steps before proceeding. Use your thinking
to plan and iterate based on this new information.
```

**4.6 변경사항:**
- **Opus 4.6**: Interleaved thinking 자동 활성화 (beta 헤더 `interleaved-thinking-2025-05-14` 불필요)
- **Sonnet 4.6**: 기존과 동일하게 beta 헤더로 활성화 가능

---

#### Part 8: 병렬 도구 호출 최적화

Claude 4.x, 특히 Sonnet 4.5는 병렬 도구 실행에 적극적입니다:
- 리서치 중 여러 추측적 검색 동시 실행
- 여러 파일 동시 읽기
- bash 명령 병렬 실행

##### 8.1 최대 병렬 효율성

```xml
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies
between the tool calls, make all of the independent tool calls in parallel.

For example, when reading 3 files, run 3 tool calls in parallel.
Maximize use of parallel tool calls where possible.

However, if some tool calls depend on previous calls, do NOT call
these tools in parallel. Never use placeholders or guess missing parameters.
</use_parallel_tool_calls>
```

##### 8.2 병렬 실행 감소

```
Execute operations sequentially with brief pauses between each step
to ensure stability.
```

---

#### Part 9: 에이전트 코딩 시 주의사항

##### 9.1 과잉 엔지니어링 방지 (특히 Opus 4.5)

```xml
Avoid over-engineering. Only make changes that are directly requested
or clearly necessary. Keep solutions simple and focused.

Don't add features, refactor code, or make "improvements" beyond what
was asked. A bug fix doesn't need surrounding code cleaned up.

Don't add error handling, fallbacks, or validation for scenarios that
can't happen. Trust internal code and framework guarantees.

Don't create helpers, utilities, or abstractions for one-time operations.
The right amount of complexity is the minimum needed for the current task.
```

##### 9.2 코드 탐색 독려

```xml
ALWAYS read and understand relevant files before proposing code edits.
Do not speculate about code you have not inspected.

If the user references a specific file/path, you MUST open and inspect
it before explaining or proposing fixes.

Be rigorous and persistent in searching code for key facts.
Thoroughly review the style, conventions, and abstractions of the
codebase before implementing new features.
```

##### 9.3 환각 최소화

```xml
<investigate_before_answering>
Never speculate about code you have not opened.
If the user references a specific file, you MUST read the file before answering.
Make sure to investigate and read relevant files BEFORE answering.
Never make any claims about code before investigating unless certain.
</investigate_before_answering>
```

##### 9.4 하드코딩 및 테스트 집중 방지

```xml
Please write a high-quality, general-purpose solution using standard tools.
Do not create helper scripts or workarounds.

Implement a solution that works correctly for all valid inputs,
not just the test cases. Do not hard-code values.

Tests are there to verify correctness, not to define the solution.
If tests are incorrect, inform me rather than working around them.
```

---

#### Part 10: 프론트엔드 디자인 (Opus 4.5)

"AI slop" 미학을 피하고 창의적인 프론트엔드 생성:

```xml
<frontend_aesthetics>
Avoid generic "AI slop" aesthetic. Make creative, distinctive frontends.

Focus on:
- Typography: Choose unique, beautiful fonts. Avoid Inter, Arial, Roboto.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables.
- Motion: Use animations for effects. Focus on page load orchestration.
- Backgrounds: Create atmosphere with gradients, patterns, effects.

Avoid:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (purple gradients on white)
- Predictable layouts and cookie-cutter design

Think outside the box! Vary between light/dark themes, different fonts.
</frontend_aesthetics>
```

---

#### Part 11: API 기능

##### 11.1 128K Max Output (4.6)
기존 대비 대폭 증가한 출력 한도.
- Beta 헤더 필요: `anthropic-beta: output-128k-2025-02-19`
- 장문 코드 생성, 대용량 데이터 처리에 적합

##### 11.2 1M Context Window (4.6 Beta)
Sonnet 4.6에서 100만 토큰 컨텍스트 지원.
- 대규모 코드베이스 전체 분석
- 장편 문서 처리

##### 11.3 Compaction API (4.6)
긴 대화를 자동으로 압축하여 컨텍스트 효율성 향상.
- 무한 대화 지속 가능
- 핵심 정보 보존하며 토큰 절약

##### 11.4 Effort Parameter (4.5 Opus → 4.6 전체)
응답 상세도와 토큰 효율성 사이의 트레이드오프 제어.
- `low`: 토큰 효율적 (간단한 분류)
- `medium`: 균형 (일반 대화)
- `high`: 상세 분석, 코딩
- `max`: 최대 품질 (Opus 4.6 전용)

##### 11.5 Programmatic Tool Calling
도구를 코드 실행 컨테이너 내에서 프로그래매틱하게 호출 가능.
- 레이턴시 감소
- 토큰 효율성 향상

##### 11.6 Tool Search Tool
수백, 수천 개의 도구를 동적으로 검색하고 로드.
- Regex 또는 BM25 검색 지원
- 10-20K 토큰 절약

##### 11.7 Memory Tool
컨텍스트 창 외부에 정보 저장 및 검색.

##### 11.8 Fast Mode (4.6)
동일 모델에서 2.5배 빠른 출력 속도.
- 모델 전환 없음 (같은 Opus 4.6)
- 빠른 반복 작업에 적합

---

#### Part 12: XML 프롬프트 구조 가이드 (프롬프트 생성용)

> **용도**: 코딩, 에이전트, 분석, 팩트체크 프롬프트 생성 시 참조

##### 12.1 기본 XML 구조

```xml
<system_prompt>
  <role>역할/페르소나 정의</role>

  <core_instructions>
    핵심 작업 지시사항
  </core_instructions>

  <behavior_rules>
    행동 규칙 및 제약사항
  </behavior_rules>

  <output_format>
    출력 형식 지정
  </output_format>
</system_prompt>
```

##### 12.2 권장 XML 블록 패턴

| 태그 | 용도 | 사용 상황 |
|------|------|----------|
| `<default_to_action>` | 기본 실행 모드 | 에이전트가 적극적으로 행동해야 할 때 |
| `<do_not_act_before_instructions>` | 보수적 모드 | 정보 수집 후 확인 필요 시 |
| `<investigate_before_answering>` | 환각 방지 | 코드 분석, 파일 검토 필수 시 |
| `<use_parallel_tool_calls>` | 병렬 실행 | 독립적 도구 호출 최적화 |
| `<avoid_excessive_markdown>` | 포맷 제어 | 산문 형태 출력 필요 시 |
| `<frontend_aesthetics>` | UI 디자인 | 프론트엔드 코드 생성 시 |
| `<avoid_overengineering>` | 간결함 유지 | 과잉 구현 방지 필요 시 |

##### 12.3 코딩/에이전트 XML 예시

```xml
<system_prompt>
  <role>전문 소프트웨어 개발자</role>

  <core_instructions>
    사용자 요청에 따라 코드를 작성하고 개선합니다.
  </core_instructions>

  <investigate_before_answering>
    코드를 수정하기 전 반드시 관련 파일을 읽고 이해합니다.
    확인하지 않은 코드에 대해 추측하지 않습니다.
  </investigate_before_answering>

  <default_to_action>
    변경 제안보다 직접 구현을 기본으로 합니다.
    사용자 의도가 불명확하면 가장 유용한 행동을 추론하여 진행합니다.
  </default_to_action>

  <output_format>
    수정된 코드를 코드블록으로 출력합니다.
    변경 사항을 간략히 요약합니다.
  </output_format>
</system_prompt>
```

---

#### 부록: 핵심 XML 블록 전체 목록

##### 적극적 행동 설정
```xml
<default_to_action>
By default, implement changes rather than only suggesting them.
If the user's intent is unclear, infer the most useful likely action
and proceed, using tools to discover any missing details instead of guessing.
</default_to_action>
```

##### 보수적 행동 설정
```xml
<do_not_act_before_instructions>
Do not jump into implementation unless clearly instructed to make changes.
When the user's intent is ambiguous, default to providing information,
doing research, and providing recommendations rather than taking action.
</do_not_act_before_instructions>
```

##### 병렬 도구 호출
```xml
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies
between the tool calls, make all of the independent tool calls in parallel.
Maximize use of parallel tool calls where possible.
However, if some tool calls depend on previous calls, do NOT call
these tools in parallel. Never use placeholders or guess missing parameters.
</use_parallel_tool_calls>
```

##### 코드 탐색 필수
```xml
<investigate_before_answering>
Never speculate about code you have not opened.
If the user references a specific file, you MUST read the file before answering.
Make sure to investigate and read relevant files BEFORE answering.
Never make any claims about code before investigating unless certain.
</investigate_before_answering>
```

##### 과잉 엔지니어링 방지
```xml
<avoid_overengineering>
Avoid over-engineering. Only make changes that are directly requested
or clearly necessary. Keep solutions simple and focused.
Don't add features, refactor code, or make "improvements" beyond what was asked.
The right amount of complexity is the minimum needed for the current task.
</avoid_overengineering>
```

##### 마크다운 제어
```xml
<avoid_excessive_markdown>
When writing reports or long-form content, write in clear, flowing prose.
Use paragraph breaks for organization. Reserve markdown for inline code,
code blocks, and simple headings. Avoid **bold**, *italics*, and excessive lists.
</avoid_excessive_markdown>
```

##### 프론트엔드 미학
```xml
<frontend_aesthetics>
Avoid generic "AI slop" aesthetic. Make creative, distinctive frontends.
Focus on: Typography, Color & Theme, Motion, Backgrounds.
Avoid: Overused fonts (Inter, Roboto), clichéd color schemes, predictable layouts.
</frontend_aesthetics>
```

---

---

### Gemini 3.1, Veo, Nano Banana strategies

### Gemini 프롬프트 전략 통합 가이드

> **Version**: 2.0.0 | **Created**: 2025-12-28 | **Updated**: 2026-03-08
> **Source**: Google AI 공식 문서 + @specal1849 Threads 꿀팁
> **Covers**: Gemini 3, Gemini Flash, Veo 3.1, Nano Banana (Pro), NanoBanana2 (Gemini 3.1 Flash Image), 동적뷰, 노트북LM, 믹스보드

---

#### Part 1: Gemini 3 프롬프트 전략

> Gemini 3 모델은 고급 추론 및 요청 사항 처리를 위해 설계되었습니다. 직접적이고 구조화되어 있으며 작업과 제약 조건을 명확하게 정의하는 프롬프트에 가장 잘 반응합니다.

##### 1.1 핵심 프롬프팅 원칙

###### 원칙 1: 정확하고 직접적으로 표현
- 목표를 명확하고 간결하게 설명
- 불필요하거나 지나치게 설득적인 표현 제거

```
❌ 피해야 할 표현:
"제발 잘 부탁드립니다, 정말 중요한 작업이니..."

✅ 권장하는 표현:
"다음 텍스트를 3문장으로 요약하세요."
```

###### 원칙 2: 일관된 구조 사용
명확한 구분자를 사용하여 프롬프트의 여러 부분을 구분합니다.

**XML 스타일 태그 예시:**
```xml
<context>
사용자 배경 정보
</context>

<task>
수행할 작업 설명
</task>
```

**마크다운 제목 예시:**
```markdown
### Identity
You are a senior solution architect.

### Constraints
- No external libraries allowed.
- Python 3.11+ syntax only.

### Output format
Return a single code block.
```

###### 원칙 3: 매개변수 정의
모호한 용어나 매개변수를 명시적으로 설명합니다.

```
❌ "간단하게 설명해주세요"
✅ "3문장 이내로, 기술 용어 없이 설명해주세요"
```

###### 원칙 4: 출력 장황도 제어
기본적으로 Gemini 3는 직접적이고 효율적인 답변을 제공합니다.
- **더 자세한 응답 필요시**: 명시적으로 요청
- **대화형 응답 필요시**: 시스템 안내에 명시

###### 원칙 5: 중요한 안내에 우선순위 지정
다음 항목을 시스템 안내 또는 프롬프트 **맨 처음**에 배치:
- 필수 행동 제약 조건
- 역할 정의 (페르소나)
- 출력 형식 요구사항

###### 원칙 6: 긴 컨텍스트의 구조
많은 양의 컨텍스트(문서, 코드)를 제공할 때:
1. 먼저 모든 컨텍스트를 제공
2. 프롬프트의 **맨 끝**에 구체적인 지침이나 질문 배치

###### 원칙 7: 앵커 컨텍스트
대량의 데이터 블록 후 명확한 전환 문구 사용:
```
"위의 정보를 바탕으로..."
"위 문서를 참고하여..."
```

##### 1.2 구조화된 프롬프트 템플릿

###### XML 형식 템플릿
```xml
<role>
You are a helpful assistant.
</role>

<constraints>
1. Be objective.
2. Cite sources.
</constraints>

<context>
[Insert User Input Here - The model knows this is data, not instructions]
</context>

<task>
[Insert the specific user request here]
</task>
```

###### 마크다운 형식 템플릿
```markdown
### Identity
You are a senior solution architect.

### Constraints
- No external libraries allowed.
- Python 3.11+ syntax only.

### Output format
Return a single code block.
```

##### 1.3 추론 및 계획 개선

Gemini 3의 고급 사고 기능을 활용하여 복잡한 작업의 답변 품질을 개선할 수 있습니다.

###### 명시적 계획 프롬프트
```
Before providing the final answer, please:
1. Parse the stated goal into distinct sub-tasks.
2. Check if the input information is complete.
3. Create a structured outline to achieve the goal.
```

###### 자체 비판 프롬프트
```
Before returning your final response, review your generated output against the user's original constraints.
1. Did I answer the user's *intent*, not just their literal words?
2. Is the tone authentic to the requested persona?
```

##### 1.4 권장사항 통합 템플릿

###### 시스템 안내 (System Instruction)
```xml
<role>
You are Gemini 3, a specialized assistant for [Insert Domain, e.g., Data Science].
You are precise, analytical, and persistent.
</role>

<instructions>
1. **Plan**: Analyze the task and create a step-by-step plan.
2. **Execute**: Carry out the plan.
3. **Validate**: Review your output against the user's task.
4. **Format**: Present the final answer in the requested structure.
</instructions>

<constraints>
- Verbosity: [Specify Low/Medium/High]
- Tone: [Specify Formal/Casual/Technical]
</constraints>

<output_format>
Structure your response as follows:
1. **Executive Summary**: [Short overview]
2. **Detailed Response**: [The main content]
</output_format>
```

###### 사용자 프롬프트 (User Prompt)
```xml
<context>
[Insert relevant documents, code snippets, or background info here]
</context>

<task>
[Insert specific user request here]
</task>

<final_instruction>
Remember to think step-by-step before answering.
</final_instruction>
```

##### 1.5 온도 설정 주의사항

> **중요**: Gemini 3 모델 사용 시 `temperature`를 기본값 **1.0으로 유지**하는 것이 좋습니다.

온도를 1.0 미만으로 설정하면 복잡한 수학적 또는 추론 작업에서:
- 루핑 발생 가능
- 성능 저하 발생 가능

---

#### Part 2: Gemini Flash 전략

> Gemini 3 Flash 모델에 특화된 프롬프트 전략으로, 날짜 정확성, 지식 컷오프 인식, 그라운딩 성능 개선을 다룹니다.

##### 2.1 핵심 전략 3가지

###### 전략 1: 현재 날짜 정확성

모델이 2025년의 현재 날짜에 주의하도록 개발자 지침에 다음 절을 추가합니다:

```
For time-sensitive user queries that require up-to-date information, you MUST follow the provided current time (date and year) when formulating search queries in tool calls. Remember it is 2025 this year.
```

**적용 상황:**
- 최신 뉴스 검색
- 시간에 민감한 정보 요청
- 도구 호출 시 검색 쿼리 생성

###### 전략 2: 지식 컷오프 정확성

모델이 지식 컷오프를 인식하도록 개발자 지침에 다음 절을 추가합니다:

```
Your knowledge cutoff date is January 2025.
```

**효과:**
- 모델이 자신의 지식 한계를 인식
- 컷오프 이후 정보에 대해 적절히 안내
- 환각(hallucination) 감소

###### 전략 3: 그라운딩 성능 개선

제공된 컨텍스트에서 대답을 그라운딩하는 모델의 능력을 개선하려면 다음 조항을 추가하세요:

```
You are a strictly grounded assistant limited to the information provided in the User Context.

In your answers, rely **only** on the facts that are directly mentioned in that context. You must **not** access or utilize your own knowledge or common sense to answer.

Do not assume or infer from the provided facts; simply report them exactly as they appear.

Your answer must be factual and fully truthful to the provided text, leaving absolutely no room for speculation or interpretation.

Treat the provided context as the absolute limit of truth; any facts or details that are not directly mentioned in the context must be considered **completely untruthful** and **completely unsupported**.

If the exact answer is not explicitly written in the context, you must state that the information is not available.
```

##### 2.2 실용적 적용 예시

###### RAG 시스템에서의 활용

```xml
<system_instruction>
Your knowledge cutoff date is January 2025.

For time-sensitive user queries that require up-to-date information, you MUST follow the provided current time (date and year) when formulating search queries in tool calls.

You are a strictly grounded assistant limited to the information provided in the User Context.
</system_instruction>

<user_context>
[검색된 문서 내용]
</user_context>

<user_query>
[사용자 질문]
</user_query>
```

###### 고객 서비스 봇에서의 활용

```xml
<system_instruction>
현재 날짜: 2025년 12월 27일
지식 컷오프: 2025년 1월

고객 서비스 담당자로서, 제공된 FAQ 문서에 있는 정보만을 기반으로 답변하세요.
문서에 없는 정보는 "해당 정보를 확인할 수 없습니다"라고 안내하세요.
</system_instruction>
```

##### 2.3 그라운딩 강화 체크리스트

- [ ] 시스템 안내에 지식 컷오프 날짜 명시
- [ ] 현재 날짜 정보 포함 (시간 민감 작업 시)
- [ ] 컨텍스트 전용 그라운딩 지침 추가
- [ ] "정보 없음" 시 대응 방법 명시
- [ ] 추론/가정 금지 지침 포함

##### 2.4 Before & After 비교

###### Before (일반 프롬프트)
```
당신은 도움이 되는 어시스턴트입니다.
사용자의 질문에 답변해주세요.
```

**문제점:**
- 모델이 자체 지식 사용
- 날짜 혼동 가능
- 환각 발생 위험

###### After (Flash 전략 적용)
```xml
<system>
Your knowledge cutoff date is January 2025.
Current date: 2025-12-27.

You are a strictly grounded assistant. Only use information from the provided context. If information is not available, say so.
</system>

<context>
[제공된 문서/데이터]
</context>
```

**개선점:**
- 명확한 지식 범위 인식
- 컨텍스트 기반 정확한 답변
- 정보 부재 시 적절한 안내

---

#### Part 3: Veo 3.1 프롬프트 전략

> Veo 3.1은 Google의 최첨단 동영상 생성 모델로, 8초 길이의 720p 또는 1080p 동영상을 오디오와 함께 생성합니다.

##### 3.1 Veo 모델 개요

###### 주요 기능
- **동영상 확장**: 이전 Veo 생성 동영상을 확장 (최대 141초)
- **프레임별 생성**: 첫 번째/마지막 프레임 지정하여 생성
- **이미지 기반 방향**: 최대 3개 참조 이미지로 콘텐츠 안내

###### 사양
| 항목 | Veo 3.1 |
|------|---------|
| 해상도 | 720p, 1080p |
| 길이 | 4초, 6초, 8초 |
| 프레임 속도 | 24fps |
| 오디오 | 기본 포함 |

##### 3.2 프롬프트 작성 기본사항

###### 필수 요소

1. **주제 (Subject)**
   - 동영상에 담고 싶은 사물, 사람, 동물 또는 풍경
   - 예: *도시 경관*, *자연*, *차량*, *강아지*

2. **동작 (Action)**
   - 피사체가 하는 행동
   - 예: *걷기*, *달리기*, *머리 돌리기*

3. **스타일 (Style)**
   - 특정 영화 스타일 키워드
   - 예: *SF*, *공포 영화*, *필름 누아르*, *만화*

###### 선택 요소

4. **카메라 위치 및 모션**
   - *공중 촬영*, *눈높이*, *위에서 아래로 촬영*
   - *돌리 샷*, *로우 앵글*, *POV 샷*

5. **구도 (Composition)**
   - *와이드 샷*, *클로즈업*, *싱글 샷*, *투 샷*

6. **포커스 및 렌즈 효과**
   - *얕은 포커스*, *깊은 포커스*, *소프트 포커스*
   - *매크로 렌즈*, *광각 렌즈*

7. **분위기 (Mood)**
   - *파란색 톤*, *야간*, *따뜻한 색조*

##### 3.3 오디오 프롬프트 (Veo 3+)

###### 대화 프롬프팅
특정 대화에는 따옴표 사용:
```
'이게 열쇠일 거야'라고 그는 중얼거렸습니다.
```

###### 음향 효과 (SFX)
소리를 명시적으로 설명:
```
타이어가 크게 삐걱거리고 엔진이 굉음을 냄
```

###### 주변 소음
환경의 사운드스케이프 설명:
```
희미하고 섬뜩한 험이 배경에 울려 퍼집니다.
```

##### 3.4 이미지 활용 기법

###### 패턴 1: 시작 프레임으로 이미지 사용
Nano Banana로 이미지를 생성한 후, 해당 이미지를 동영상의 첫 프레임으로 사용:

```python
### 1. Nano Banana로 이미지 생성
image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=prompt,
    config={"response_modalities":['IMAGE']}
)

### 2. Veo로 동영상 생성
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    image=image.parts[0].as_image(),
)
```

###### 패턴 2: 참조 이미지 사용 (Veo 3.1)
최대 3개의 참조 이미지로 스타일/콘텐츠 안내:

```python
dress_reference = types.VideoGenerationReferenceImage(
    image=dress_image,
    reference_type="asset"
)

operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    config=types.GenerateVideosConfig(
        reference_images=[dress_reference, glasses_reference, woman_reference],
    ),
)
```

###### 패턴 3: 첫 번째 & 마지막 프레임 (보간)
시작과 끝 프레임을 지정하여 동영상 생성:

```python
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    image=first_image,
    config=types.GenerateVideosConfig(
        last_frame=last_image
    ),
)
```

##### 3.5 동영상 확장

이전 Veo 생성 동영상을 7초씩 최대 20배까지 확장:

```python
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    video=previous_operation.response.generated_videos[0].video,
    prompt="패러글라이더가 천천히 하강하는 장면으로 확장",
)
```

**제한사항:**
- 입력 동영상 최대 141초
- 가로세로 비율: 9:16 또는 16:9
- 해상도: 720p만 지원

##### 3.6 프롬프트 예시 모음

###### 간단한 프롬프트
```
눈표범 같은 털을 가진 귀여운 생물이 겨울 숲을 걷고 있는
3D 만화 스타일의 렌더링입니다.
```

###### 상세한 프롬프트
```
재미있는 만화 스타일의 짧은 3D 애니메이션 장면을 만들어 줘.
눈표범 같은 털과 표정이 풍부한 커다란 눈,
친근하고 동글동글한 모습을 한 귀여운 동물이
기발한 겨울 숲을 즐겁게 뛰어다니고 있습니다.

이 장면에는 둥글고 눈 덮인 나무, 부드럽게 떨어지는 눈송이,
나뭇가지 사이로 들어오는 따뜻한 햇빛이 담겨 있어야 합니다.
생물의 통통 튀는 움직임과 환한 미소는 순수한 기쁨을 전달해야 합니다.

밝고 경쾌한 색상과 장난기 넘치는 애니메이션으로
낙관적이고 따뜻한 분위기를 연출하세요.
```

###### 대화가 포함된 프롬프트
```
안개가 자욱한 미국 북서부의 숲을 넓게 촬영한 장면
지친 두 등산객인 남성과 여성이 고사리를 헤치고 나아가는데
남성이 갑자기 멈춰 서서 나무를 응시합니다.

클로즈업: 나무껍질에 깊은 발톱 자국이 새겨져 있습니다.

남자: (사냥용 칼에 손을 대며) '저건 평범한 곰이 아니야.'
여성: (두려움에 목소리가 떨리며 숲을 둘러봄) '그럼 뭐야?'

거친 짖음, 부러지는 나뭇가지, 축축한 땅에 찍히는 발자국.
외로운 새가 지저귄다.
```

##### 3.7 부정적 프롬프트 사용법

동영상에 포함하고 싶지 **않은** 요소 지정:

```
❌ 피하세요: "벽 없음", "하지 마세요"
✅ 권장: "wall, frame" (단순 나열)
```

**예시:**
```
부정적 프롬프트: 도시 배경, 인공 구조물,
어둡거나 폭풍이 몰아치거나 위협적인 분위기
```

---

#### Part 4: Nano Banana 프롬프트 전략

> Nano Banana (Gemini 2.5 Flash Image)는 Gemini의 네이티브 이미지 생성 모델입니다. 텍스트에서 이미지를 생성하며, Veo 동영상의 시작 프레임이나 참조 이미지로 활용할 수 있습니다.

##### 4.1 Nano Banana 개요

###### 모델 정보
- **정식 명칭**: Gemini 2.5 Flash Image (일명 Nano Banana)
- **모델 코드**: `gemini-2.5-flash-image`
- **주요 용도**: 이미지 생성, Veo 동영상의 입력 이미지 생성

###### 기본 사용법
```python
from google import genai

client = genai.Client()

image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents="소형 미니어처 서퍼들이 소박한 돌 욕실 싱크대 안에서 바다의 파도를 타는 초현실적인 매크로 사진",
    config={"response_modalities":['IMAGE']}
)
```

##### 4.2 프롬프트 작성 가이드

###### 효과적인 프롬프트 구조

1. **주제 설명**
   - 이미지의 주요 피사체를 명확하게 기술

2. **스타일 지정**
   - 사진, 그림, 3D 렌더링 등 원하는 스타일 명시

3. **분위기/조명**
   - 색조, 조명 조건, 전체적인 분위기

4. **구도**
   - 클로즈업, 와이드 샷, 매크로 등

##### 4.3 프롬프트 예시 모음

###### 초현실적인 이미지
```
소형 미니어처 서퍼들이 소박한 돌 욕실 싱크대 안에서
바다의 파도를 타는 초현실적인 매크로 사진
빈티지 황동 수도꼭지가 작동하여 끊임없이 파도가 치고 있습니다.
초현실적이고 기발하며 밝은 자연광
```

###### 패션/제품 이미지
```
분홍색과 푸시아색 깃털이 여러 겹으로 이루어진
하이 패션 플라밍고 드레스
```

###### 인물 이미지
```
어두운 머리와 따뜻한 갈색 눈을 가진 아름다운 여성
```

###### 액세서리/소품
```
기발한 분홍색 하트 모양 선글라스
```

###### 캐릭터 디자인
```
심해 아귀가 어둡고 깊은 물속에 숨어
이빨을 드러내고 미끼를 빛내고 있습니다.
```

###### 애니메이션 캐릭터
```
눈표범 같은 털과 표정이 풍부한 커다란 눈,
친근하고 동글동글한 모습을 한 귀여운 동물
3D 만화 스타일로 렌더링
```

##### 4.4 Veo와의 연동 활용

###### 연동 패턴 1: 동영상 시작 프레임으로 사용
```python
### Step 1: Nano Banana로 이미지 생성
prompt = "황금빛 노을이 지는 해변의 파노라마 풍경"
image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=prompt,
    config={"response_modalities":['IMAGE']}
)

### Step 2: Veo로 동영상 생성 (이미지를 시작 프레임으로)
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="카메라가 천천히 해변을 패닝하며 파도가 밀려옵니다",
    image=image.parts[0].as_image(),
)
```

###### 연동 패턴 2: 참조 이미지로 사용 (Veo 3.1)
```python
### 여러 참조 이미지 생성
dress_image = generate_image("하이 패션 플라밍고 드레스")
woman_image = generate_image("어두운 머리의 아름다운 여성")
glasses_image = generate_image("분홍색 하트 모양 선글라스")

### Veo에서 참조 이미지로 활용
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="여성이 해변을 우아하게 걷는 모습",
    config=types.GenerateVideosConfig(
        reference_images=[
            types.VideoGenerationReferenceImage(image=dress_image, reference_type="asset"),
            types.VideoGenerationReferenceImage(image=woman_image, reference_type="asset"),
            types.VideoGenerationReferenceImage(image=glasses_image, reference_type="asset"),
        ],
    ),
)
```

###### 연동 패턴 3: 첫 번째/마지막 프레임 보간
```python
### 첫 번째 프레임 이미지
first_image = generate_image(
    "프랑스 리비에라 해안에서 빨간색 컨버터블 레이싱 자동차를 운전하는 생강색 고양이"
)

### 마지막 프레임 이미지
last_image = generate_image(
    "절벽에서 출발하는 빨간색 컨버터블과 생강색 고양이"
)

### Veo로 보간 동영상 생성
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    image=first_image,
    config=types.GenerateVideosConfig(last_frame=last_image),
)
```

##### 4.5 프롬프트 최적화 팁

###### 설명적인 언어 사용
형용사와 부사를 활용하여 명확한 그림을 그립니다:
```
❌ "강아지 사진"
✅ "햇살 가득한 공원에서 뛰노는 골든 리트리버 강아지, 부드러운 자연광"
```

###### 얼굴 세부정보 개선
얼굴을 초점으로 지정:
```
"인물 사진 스타일로, 얼굴에 초점을 맞춘 클로즈업"
```

###### 스타일 혼합
여러 스타일 키워드 조합:
```
"초현실주의적 + 매크로 사진 + 밝은 자연광 + 기발한"
```

##### 4.6 용도별 프롬프트 템플릿

###### 제품 이미지
```
[제품명]이 [배경]에 있습니다.
제품 촬영 스타일, 깨끗한 배경, 전문적인 조명
```

###### 캐릭터 디자인
```
[캐릭터 특징]을 가진 [캐릭터 유형]
[스타일] 스타일로 렌더링
[표정/포즈] 표현
```

###### 풍경 이미지
```
[장소]의 [시간대] 풍경
[분위기] 느낌의 [색조] 색상
[구도] 샷으로 촬영
```

---

#### Part 5: 실전 활용 예시 (@specal1849)

> **출처**: @specal1849 (패스트캠퍼스 제미나이 강의자)의 Threads 꿀팁 모음
> **추가일**: 2026-01-03

##### 5.1 동적뷰 (Dynamic View)

> Gemini 3 출시와 함께 공식 지원되는 동적뷰 기능. 간단한 입력만으로 인터랙티브한 결과물 생성.

###### 사용 방법
```
제미나이 접속 → 도구 → 동적뷰 선택 → 프롬프트 입력
```

###### 바로 사용 가능한 프롬프트 3선

**프롬프트 1: 여행 계획 (표 형식)**
```
후쿠오카 2박 3일 효도 여행 코스를 짜줘.
부모님 체력을 고려해서 여유로운 일정으로 잡고,
맛집과 관광지를 포함해서 시간대별로 표로 정리해줘
```

**프롬프트 2: 파이썬 데이터 시각화**
```
파이썬을 사용하여 2025년 가상의 월별 매출 데이터를 생성하고,
이를 막대 그래프와 꺾은선 그래프로 시각화하는 대시보드 코드를 작성해줘.
```

**프롬프트 3: 블로그 글쓰기**
```
요즘 유행하는 '두바이 초콜릿' 먹어본 후기 블로그 글 써줘.
서론-본론-결론으로 나누고, 사람들이 검색할 만한 해시태그도 달아줘.
말투는 친근하고 재밌게.
```

> 💡 **Tip**: 1분이면 따라할 수 있어요! 파이썬 한글 폰트도 자동 처리됨

##### 5.2 노트북LM PPT 생성

> NotebookLM에 공식적으로 **프레젠테이션과 인포그래픽** 기능 추가됨. 나노바나나2 기반으로 디자인과 가시성이 뛰어남.

###### 슬라이드 맞춤설정 2가지

| 유형 | 특징 | 용도 |
|------|------|------|
| **자세한 자료** (Detailed) | 전체 텍스트와 세부 정보 포함 | 이메일 공유, 단독 읽기용 |
| **발표자 슬라이드** (Presenter) | 핵심 내용만 깔끔하게 | 임원 발표, IR 프레젠테이션 |

###### 스타일 프롬프트 예시

**강의용 슬라이드:**
```
단계별 안내에 중점을 둔 대담하고 재미있는 스타일의 초보자용 자료 만들어줘
```

**IR 발표용:**
```
임원발표용 IR 블루 스타일로 전문적이고 깔끔한 프레젠테이션 만들어줘
```

###### ⚠️ 한국어 깨짐 해결

| 문제 | 원인 | 해결책 |
|------|------|--------|
| 한글 깨짐 | 나노바나나2 글자수 제한 | **200~300자 이하**로 유지 |
| 장문 텍스트 오류 | 300자 초과 시 깨짐 | 짧은 문장으로 분리 |

##### 5.3 믹스보드 (Mixboard)

> 구글 믹스보드가 한국에 상륙! 나노바나나 기반의 이미지 합성 및 스타일 변경 도구.

###### 핵심 기능

| 기능 | 설명 |
|------|------|
| **스타일 변경** | 다양한 아트 스타일 적용 |
| **이미지 합성** | 나노바나나 기반 합성 |
| **양산 가능** | PPT, 포스터 등 대량 제작 |

> 💡 **Tip**: PPT 제작에 특히 유용. 고점이 높은 서비스 (숙련도에 따라 결과 차이)

##### 5.4 만화 제작 프롬프트

> 나노바나나2로 AI 만화 제작 가능. 상세 내용은 **prompt-engineering-guide** 스킬 참조.

###### 핵심 태그 요약

```
monochrome           → 흑백 톤
manga style          → 일본 만화 스타일
screentone           → 스크린톤 효과
multiple panels      → 여러 패널 구성
speech bubble        → 말풍선 포함
action lines         → 액션 효과선
```

###### 4컷 만화 예시
```
A 4-panel manga comic, monochrome style with screentone,
Panel 1: A cat waking up sleepily
Panel 2: Cat sees empty food bowl, shocked expression
Panel 3: Cat meowing loudly at owner
Panel 4: Happy cat eating, speech bubble "Finally!"
manga style, clean linework, expressive characters
```

##### 5.5 AI 함수 (Google Sheets)

> Gemini 3 출시와 함께 구글 Sheet에 AI 함수 공식 지원 (기존 워크스페이스 전용 → 일반 사용자)

###### 활용 사례
- **CS 답변 자동 생성**: 함수로 고객 문의 자동 응답
- **데이터 기반 대시보드형 PPT**: 더미 데이터로 즉시 제작

---

#### Part 6: NanoBanana2 (Gemini 3.1 Flash Image) 프롬프트 전략

> NanoBanana2(NB2)는 Gemini 3.1 Flash 기반의 차세대 이미지 생성 모델로, NB Pro 대비 3-5배 빠르고 37% 저렴합니다. **서술형(narrative) 프롬프트**에 최적화되어 있습니다.

##### 6.1 NB2 모델 개요

###### 모델 정보
- **정식 명칭**: Gemini 3.1 Flash Image (일명 NanoBanana2)
- **모델 코드**: `gemini-3.1-flash-image-preview`
- **아키텍처**: Gemini 3.1 Flash 기반 네이티브 이미지 생성

###### NB Pro vs NB2 비교

| 항목 | NB Pro (Gemini 2.5 Flash Image) | NB2 (Gemini 3.1 Flash Image) |
|------|------|------|
| **모델 ID** | `gemini-2.5-flash-image` | `gemini-3.1-flash-image-preview` |
| **속도 (1K)** | 15-20초 | **4-6초** (3-5배 빠름) |
| **가격 (4K)** | $0.240 | **$0.151** (37% 저렴) |
| **CJK 텍스트** | 기본 지원 | **우수** (Pro 대비 향상) |
| **Thinking Mode** | 미지원 | **3단계 조절** |
| **Web Grounding** | 미지원 | **Google Search 연동** |
| **종횡비** | 기본 비율 | **14종** (극단 비율 포함) |
| **참조 이미지** | 제한적 | **최대 14장** |
| **워터마크** | 기본 | **SynthID + C2PA** |

##### 6.2 서술형 프롬프트 전략 (NB2 핵심)

> **NB2의 핵심 차이**: 태그 나열형 프롬프트보다 **서술형(narrative) 프롬프트**가 더 효과적입니다.

```
❌ NB Pro 스타일 (태그 나열):
"cat, black, fluffy, sitting, yellow sofa, natural light, bokeh"

✅ NB2 스타일 (서술형):
"A fluffy black cat sits gracefully on a bright yellow sofa,
gazing directly at the camera with curious green eyes.
Soft natural light streams through a nearby window,
creating a warm, cozy atmosphere with gentle bokeh
in the background."
```

##### 6.3 5요소 프레임워크 (5-Element Framework)

NB2 프롬프트 작성 시 다음 5요소를 서술형으로 구성:

| 요소 | 설명 | 예시 |
|------|------|------|
| **Subject** | 주요 피사체 | "검은 고양이가" |
| **Action** | 행동/동작 | "노란 소파에 앉아" |
| **Environment** | 환경/배경 | "창가 옆 거실에서" |
| **Mood** | 분위기/감정 | "따뜻하고 아늑한 분위기" |
| **Camera** | 촬영 기법 | "부드러운 자연광, 얕은 심도" |

```
5요소 조합 예시:
"A golden retriever puppy (Subject) leaps joyfully through
a field of wildflowers (Action + Environment), bathed in
warm golden hour light that creates a dreamy, nostalgic mood (Mood),
captured with a 85mm portrait lens at f/1.8 creating
beautiful bokeh (Camera)."
```

##### 6.4 Thinking Mode (3단계)

NB2의 사고 모드를 조절하여 이미지 품질/속도 트레이드오프 제어:

| 모드 | 설명 | 용도 |
|------|------|------|
| **Off** | 사고 없이 즉시 생성 | 빠른 반복, 프로토타이핑 |
| **Balanced** | 기본 사고 | 일반적 사용 (기본값) |
| **Deep** | 깊은 사고 | 복잡한 구도, 정밀한 텍스트 |

##### 6.5 Web Search Grounding

Google Search와 연동하여 최신 정보 기반 이미지 생성:

```
"2026년 현재 서울 강남역 거리 풍경을 사실적으로 그려줘"
→ NB2가 Google Search로 최신 정보 조회 후 이미지 생성
```

##### 6.6 CJK 텍스트 렌더링

NB2는 한국어/중국어/일본어 텍스트 렌더링이 Pro 대비 크게 향상:

```
### 한국어 텍스트 포함 이미지
"카페 메뉴판. 상단에 '오늘의 커피' 텍스트, 아래에 3가지 음료 목록.
깔끔한 손글씨 스타일, 크래프트 종이 배경"
```

**팁**: 텍스트는 200-300자 이하로 유지 (300자 초과 시 깨짐 가능)

##### 6.7 14종 종횡비

NB2는 극단적 비율을 포함한 14종 종횡비 지원:

| 비율 | 용도 | 비율 | 용도 |
|------|------|------|------|
| 1:1 | 정사각형, SNS | 9:16 | 세로 스토리 |
| 16:9 | 와이드, 유튜브 | 3:4 | 세로 사진 |
| 4:3 | 표준 사진 | 2:3 | 포트레이트 |
| 3:2 | 35mm 필름 | 21:9 | 시네마 와이드 |
| 4:5 | 인스타그램 | 1:2 | 극세로 |
| 5:4 | 중형 카메라 | 2:1 | 극와이드 |
| 9:21 | 극세로 배너 | 1:3 | 북마크 |

##### 6.8 참조 이미지 활용 (최대 14장)

NB2는 최대 14장의 참조 이미지를 사용하여 스타일/콘텐츠 안내 가능:

```python
from google import genai

client = genai.Client()

### NB2로 참조 이미지 기반 생성
response = client.models.generate_content(
    model="gemini-3.1-flash-image-preview",
    contents=[
        "이 참조 이미지의 스타일로 새로운 풍경 그려줘",
        reference_image_1,
        reference_image_2,
    ],
    config={"response_modalities": ["IMAGE"]}
)
```

##### 6.9 NB2 API 통합

```python
from google import genai

client = genai.Client()

### NB2 기본 사용
image = client.models.generate_content(
    model="gemini-3.1-flash-image-preview",
    contents="서울 남산타워가 보이는 야경, 시네마틱 분위기의 와이드 샷",
    config={"response_modalities": ["IMAGE"]}
)
```

##### 6.10 NB2 프롬프트 체크리스트

- [ ] 서술형(narrative)으로 작성했는가? (태그 나열 ❌)
- [ ] 5요소(Subject/Action/Environment/Mood/Camera)가 포함되었는가?
- [ ] 한국어 텍스트는 200-300자 이하인가?
- [ ] 적절한 종횡비가 지정되었는가?
- [ ] Thinking Mode가 작업에 맞게 설정되었는가?

---

#### 부록: 키워드 치트시트

##### 분위기 (Mood)
| 한국어 | 영어 키워드 |
|--------|-------------|
| 드라마틱 | dramatic, cinematic, moody |
| 평화로운 | peaceful, serene, calm |
| 에너지틱 | energetic, dynamic, vibrant |
| 신비로운 | mystical, ethereal, dreamlike |
| 미래적 | futuristic, sci-fi, cyberpunk |
| 귀여운 | cute, kawaii, adorable |

##### 조명 (Lighting)
| 타입 | 영어 키워드 |
|------|-------------|
| 자연광 | natural light, daylight |
| 황금시간 | golden hour, magic hour |
| 역광 | backlit, silhouette, rim light |
| 네온 | neon lights, RGB lighting |
| 스튜디오 | studio lighting, professional |
| Rembrandt | Rembrandt lighting, triangular light patch |
| Chiaroscuro | extreme contrast, baroque style |

##### 카메라 (Camera)
| 효과 | 영어 키워드 |
|------|-------------|
| 아웃포커스 | shallow depth of field, bokeh, f/1.4 |
| 와이드 | wide angle, 24mm, fisheye |
| 매크로 | macro, close-up, extreme detail |
| 필름 | film grain, 35mm film, analog |

##### 카메라 모션 (Video)
| 효과 | 영어 키워드 |
|------|-------------|
| 패닝 | pan shot, panning |
| 돌리 | dolly shot, tracking |
| 크레인 | crane shot, aerial |
| POV | POV shot, first person |

---

---

### Image and video prompt guide

### AI 이미지 프롬프트 마스터 가이드

> **자료 출처**: 이 가이드는 공냥이(@specal1849)님의 "이미지 프롬프트 101" 슬라이드와 "PRO 이미지 프롬프트" Notion 문서를 기반으로 작성되었습니다.

---

#### 1. 이미지 생성 프로세스 이해

##### 1.1 기본 프로세스 흐름

```
사용자 입력 → LLM (프롬프트 해석/재구성) → Image Gen 모델 → 이미지 출력
```

**핵심 이해사항:**
- 이미지 생성 과정에서 **LLM과 Image Gen 두 모델**을 거침
- 프롬프트는 여러 모델들(LLM/VLM 등)을 거쳐 **재해석(Recaption)**됨
- ChatGPT의 경우: 사용자 입력 → GPT가 재구성 → gpt-image 모델에 전달

##### 1.2 프롬프트 리라이트 (Recaption)

**ChatGPT 예시:**
```
사용자: "검은 아기고양이 그려줘"
      ↓ (LLM 재해석)
gpt-image에 전달: "A cute black kitten sitting upright, looking directly
at the viewer with large, curious yellow-green eyes..."
```

**Gemini Native Image Gen:**
- LLM: Gemini 2.0 Flash → Prompt → Image Gen: Imagen 3
- **중요**: "이미지 생성" 의도 시그널이 있어야 Imagen이 작동함

---

#### 2. 핵심 개념

##### 2.1 신뢰도 (Faithful)

**정의**: 생성된 이미지가 입력 프롬프트와 일치하는 정도

| 신뢰도 | 결과 |
|--------|------|
| 높음 | 프롬프트에 충실한 이미지 생성 |
| 낮음 | 모델이 멋대로 해석/재해석, **환각(Hallucination)** 발생 가능 |

**Tip**: Recaption이 적게 되면 신뢰도가 높아짐

##### 2.2 시그널 (Signal)

**정의**: 오브젝트를 생성할 때 모델이 확신을 가질 수 있게 해주는 정보

**시그널 강도 스펙트럼:**
```
약함 ←――――――――――――――――――――――――――→ 강함
"A Cat"  →  "Black Cat"  →  "Black, fluffy cat sitting on a yellow sofa, looking at the camera"
```

| 시그널 강도 | 모델 행동 |
|-------------|----------|
| 약함 | 모델이 자유롭게 해석, 다양한 결과 |
| 강함 | 모델이 명확하게 이해, 일관된 결과 |

---

#### 3. 프롬프트 형식별 특징

##### 3.1 5가지 주요 형식

| 형식 | 특징 | 적합한 용도 |
|------|------|------------|
| **자연어** | 직관적, 자유로움 | 일반적인 이미지 생성, 연결된 느낌 |
| **Markdown** | 계층 구조, 구분 명확 | 구획이 나뉜 인포그래픽 |
| **JSON** | 파라미터화, 재현성 | 배치 생성, A/B 테스팅, 일관성 필요 시 |
| **XML** | 엄격한 구조, 명확한 구분 | 엔터프라이즈, 구획 인포그래픽 |
| **YAML** | 가독성, 설정 | 시스템 프롬프트, 설정 파일 |

##### 3.2 형식별 결과 차이

**타임라인/인포그래픽 생성 시:**
- **자연어/JSON/YAML**: 연결된 느낌, 매끄러운 흐름
- **Markdown/XML**: 명백한 구분, 각 섹션이 확실하게 나뉨

**핵심 인사이트:**
> "구분된 섹션을 나눠서 만들 때는 **XML이나 마크다운**을 선호합니다."
> "인포그래픽 디자인의 경우 **계층구조 설계가 필수**고 이를 표현하는 가장 쉬운 방법이 **마크다운**"

##### 3.3 JSON 프롬프트 예시 (권장 기본 형식)

> **권장**: 이미지 생성 시 JSON 구조를 기본으로 사용하고, 유연한 설명이 필요한 부분만 자연어로 작성합니다.

**기본 JSON 구조:**
```json
{
  "subject": "주제 - 핵심 피사체 설명",
  "style": "스타일 - 사진풍/일러스트/3D/수채화 등",
  "mood": "분위기 - 색조, 감정, 톤",
  "composition": "구도 - 앵글, 프레이밍",
  "lighting": "조명 - 자연광/스튜디오/골든아워 등",
  "details": "세부사항 - 추가 디테일 (자연어로 유연하게)",
  "text_language": "Korean",
  "aspect_ratio": "16:9"
}
```

**상세 예시:**
```json
{
  "subject": "premium minimalist coffee machine",
  "materials": ["brushed steel"],
  "features": ["geometric lines", "curved spout", "illuminated touch control panel"],
  "environment": {
    "surface": "white marble countertop"
  },
  "presentation": "floating",
  "technical": {
    "lighting": "studio lighting from top-left",
    "quality": "8K"
  },
  "style": "commercial product photography"
}
```

**JSON의 장점:**
- 키-값 구조로 파라미터화
- 자동화에 최적
- 스키마 검증으로 **재현성 강화**
- 배치 생성과 A/B 파라미터 튜닝에 유리

**유연한 자연어 부분:**
- `details` 필드: 복잡한 설명, 스토리, 감정 표현에 자연어 사용
- `prompt` 필드: 각 이미지별 완전한 생성 프롬프트

##### 3.4 다중 이미지 JSON 구조

> **필수**: `generation_instruction` 필드로 순차 생성 지시 포함

```json
{
  "generation_instruction": "Generate ONLY ONE image per call. Do NOT combine multiple images into one frame. Call the image generator separately for each image: [1/N] → generate single image → [2/N] → generate single image → ...",
  "shared_style": {
    "art_style": "공통 스타일",
    "color_palette": "공통 색상",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "images": [
    { "sequence": 1, "prompt": "완전한 이미지 생성 프롬프트" },
    { "sequence": 2, "prompt": "완전한 이미지 생성 프롬프트" }
  ]
}
```

**다중 이미지 생성 규칙:**
- `generation_instruction`: 최상단에 순차 생성 지시 포함 (필수)
- `shared_style`: 모든 이미지에 적용될 공통 스타일
- `images[].prompt`: 각 이미지별 완전한 생성 프롬프트 (영어 권장)
- 순서 표기: [1/4], [2/4], ... 형식으로 진행상황 표시

> 📸 **Gemini 다중 이미지 생성 시 추가 안내**: gemini에서 여러 장의 이미지를 생성할 경우, **'한 장씩 순차적으로 생성, 반드시 끝까지 다 생성해주세요'**도 함께 입력해주세요

##### 3.5 Markdown 프롬프트 예시

```markdown
Create high-quality, vertical layout infographic

**Text Instructions:**
- clean, isometric 3D
- glowing robotic hand taking computer mouse from human

**Header (Top):**
- **Text (Big Bold):** "이제 야근은 AI가 합니다"

**Section 1 (Top):**
- **Visual:** airline ticket and calendar being organized
- **Text:** "1. OpenAI 오퍼레이터"
- **Sub-text:** "예약부터 결제까지"

**Section 2 (Middle):**
- **Visual:** browser window (Chrome style) with blue shopping cart
- **Text:** "2. Google 자비스"
- **Sub-text:** "브라우저 속 비서"

**Style Parameters:**
- Soft blue, purple, and mint pastel gradients
- Professional, futuristic, clean, readable
```

---

#### 4. 일상적 Tips

##### 4.1 키워드 반복으로 시그널 강화

**원리**: 같은 키워드를 의도적으로 반복하면 시그널이 강해짐

**예시:**
```
❌ "A beautiful sunset"
✅ "A beautiful sunset, golden sunset colors, sunset glow on clouds, warm sunset atmosphere"
```

**주의사항:**
- 프롬프트가 지저분해질 수 있음
- 모든 모델에서 효과가 있는 것은 아님
- **직접 실험하여 해당 모델에 맞는 키워드 확인 필요**

##### 4.2 띄어쓰기로 토큰 구분

**문제**: 한글의 동음이의어
- "눈을" → 눈(eye)? 눈(snow)?

**해결 방법:**
```
❌ "큰 눈동자를 가진 소녀"
✅ "큰 눈 동자를 가진 소녀" (띄어쓰기로 구분)
✅ "큰 눈(eye)을 가진 소녀" (영어 병기)
```

##### 4.3 영어 키워드 혼합 사용

**원리**: 이미지 생성 모델은 영어 데이터로 더 많이 학습됨

**예시:**
```
"빛나는 별이 가득한 밤하늘 배경의 fairy tale 스타일 그림"
"dreamy, ethereal 느낌의 풍경화"
```

**코드 스위칭 효과:**
```
❌ "너는 전문 카피라이터야" (저성능)
✅ "You are a professional Korean copywriter" (고성능)
```

##### 4.4 짧은 vs 긴 프롬프트

| 프롬프트 길이 | 특징 | 용도 |
|--------------|------|------|
| **짧음** | 모델에게 자유도 부여, 창의적 결과 | 아이디어 탐색 단계 |
| **김** | 더 구체적, 제어된 결과 | 구체적인 결과물 필요 시 |

##### 4.5 네거티브 프롬프트

**형태**: "~하지 마" 지시

**예시:**
```
"손가락 6개 그리지 마"
"텍스트 넣지 마"
```

**주의:**
- 효과가 있을 수도, 없을 수도 있음 (모델마다 다름)
- **네거티브 프롬프트에 의존하기보다 원하는 것을 명확히 설명하는 게 더 효과적**

---

#### 5. 고급 Tips

##### 5.1 구조화된 프롬프트

**구조 예시:**
```
[주제]: 고양이
[스타일]: 수채화
[배경]: 꽃밭
[분위기]: 몽환적, 따뜻한
[세부사항]: 큰 눈, 하얀 털
```

**장점:**
- 명확한 의도 전달
- 수정이 쉬움
- 재사용 가능

##### 5.2 스타일 레퍼런스

**유명 화가/아티스트/스타일 언급:**
```
"in the style of Studio Ghibli"
"Van Gogh style painting"
"watercolor illustration"
```

**주의**: 저작권 이슈 가능, 일부 플랫폼에서 특정 아티스트 이름 차단 (⚠️ ChatGPT는 생존 아티스트명 하드 블록)

##### 5.3 카메라/렌즈 용어 활용

| 카테고리 | 키워드 예시 |
|----------|------------|
| **카메라 앵글** | bird's eye view, low angle, close-up, wide shot |
| **렌즈** | 85mm portrait lens, fisheye lens, macro lens |
| **조명** | golden hour, studio lighting, backlighting |
| **사진 스타일** | film photography, polaroid, DSLR quality |

##### 5.4 아스펙트 비율

| 비율 | 용도 |
|------|------|
| **1:1** | 정사각형, 인스타그램 |
| **16:9** | 와이드, 유튜브 썸네일, 배너 |
| **9:16** | 세로형, 스토리, 릴스 |
| **4:3** | 전통적 사진 비율 |
| **3:2** | 35mm 필름 비율 |

##### 5.5 시드(Seed) 값 활용

**용도:**
- 동일한 프롬프트로 재현 가능한 결과물 생성
- 캐릭터 일관성 유지
- 시리즈물 제작
- A/B 테스트

---

#### 6. 시네마틱 조명 & 색상 테크닉

##### 6.1 조명 종류

| 조명 | 설명 | 프롬프트 |
|------|------|----------|
| **Rembrandt Lighting** | 얼굴 한쪽에 삼각형 빛 패치 | `Rembrandt lighting, dramatic shadow, triangular light patch` |
| **Chiaroscuro** | 극단적 명암 대비 | `Chiaroscuro lighting, extreme contrast, baroque style` |
| **Golden Hour** | 황금빛 일출/일몰 조명 | `Golden hour lighting, warm orange-yellow tones` |
| **Blue Hour** | 해 진 직후 파란빛 | `Blue hour lighting, cool blue tones, twilight atmosphere` |
| **Noir Lighting** | 필름 누아르 스타일 | `Film noir lighting, high contrast, harsh shadows` |
| **Neon Lighting** | 사이버펑크 네온 | `Neon lighting, cyberpunk, pink and blue glow` |

##### 6.2 색상 기법

| 기법 | 설명 | 프롬프트 |
|------|------|----------|
| **보색 대비** | 오렌지-블루 등 | `Complementary color scheme, orange and blue contrast` |
| **유사색 조화** | 비슷한 톤 | `Analogous color harmony, warm earth tones` |
| **모노크로매틱** | 단색 계열 | `Monochromatic blue palette, various shades` |

---

#### 7. 스타일별 프롬프트 템플릿

##### 7.1 제품 사진

```
Clean product photography, [제품 이름] centered,
white seamless background, soft box lighting,
professional studio setup, commercial quality,
sharp focus, no reflections
```

##### 7.2 푸드 포토그래피

```
Editorial food photography, [음식 이름],
dark moody background, dramatic side lighting,
fresh ingredients scattered around,
professional food styling, appetizing presentation
```

##### 7.3 패션 포토그래피

```
High fashion editorial photography, Vogue magazine style,
[모델 설명], avant-garde [의상/액세서리],
dramatic studio lighting, full body shot,
professional fashion photography
```

##### 7.4 3D 스타일라이즈드 캐릭터

```
3D stylized character, [캐릭터 설명],
Pixar/Disney style, expressive features,
soft subsurface scattering, character design
```

##### 7.5 아이소메트릭 디자인

```
Isometric room design, [공간 설명],
30-degree angle, detailed interior,
cute miniature style, vibrant colors
```

##### 7.6 스티커 디자인

```
Die-cut sticker design, [주제/캐릭터],
white border outline, vibrant colors,
kawaii cute style, vector illustration
```

##### 7.7 만화/코믹 스타일 (Manga/Comic)

> **출처**: @specal1849의 나노바나나2 만화 제작 프롬프트

###### 3단계 프롬프트 구조

```
[장면 설명] + [스타일 정의] + [기술적 사양]
```

| 단계 | 설명 | 예시 |
|------|------|------|
| **장면 설명** | 원하는 이미지의 구체적 묘사 | "A samurai cat standing on a rooftop" |
| **스타일 정의** | 아트 스타일, 분위기 | "Style: Dark Fantasy, dramatic lighting" |
| **기술적 사양** | 해상도, 비율, 렌더링 | "hyperrealistic, cinematic, 16:9" |

###### 만화 제작 태그 (Panel Layout Tags)

```
monochrome           → 흑백 톤
manga style          → 일본 만화 스타일
screentone           → 스크린톤 효과
multiple panels      → 여러 패널 구성
speech bubble        → 말풍선 포함
comic panel          → 만화 칸
action lines         → 액션 효과선
clean linework       → 깔끔한 선화
expressive characters → 풍부한 표정
```

###### 스타일 태그

```
Style: Dark Fantasy     → 어둡고 신비로운 판타지
Style: Cyberpunk        → 네온, 미래 도시, 사이버네틱
Style: Romance Fantasy  → 로맨틱하고 부드러운 판타지
Style: Anime           → 일본 애니메이션 스타일
Style: Watercolor      → 수채화 느낌
Style: Oil Painting    → 유화 스타일
```

###### 4컷 만화 프롬프트 예시

```
A 4-panel manga comic, monochrome style with screentone,
Panel 1: A cat waking up sleepily
Panel 2: Cat sees empty food bowl, shocked expression
Panel 3: Cat meowing loudly at owner
Panel 4: Happy cat eating, speech bubble "Finally!"
manga style, clean linework, expressive characters
```

###### 액션 장면 프롬프트 예시

```
Dynamic manga action scene, monochrome,
samurai cat slashing with katana,
action lines, dramatic angle,
multiple speed lines, intense expression
```

---

#### 8. 인포그래픽 제작 가이드

##### 8.1 Chain 프롬프팅 활용

**단계별 접근:**
1. **조사**: AI 뉴스나 콘텐츠 조사
2. **구조화**: Markdown으로 계층 구조 설계
3. **생성**: 이미지 생성 툴에 입력

##### 8.2 인포그래픽 프롬프트 구조

```markdown
Create high-quality, vertical layout infographic

**Header (Top):**
- **Text (Big Bold):** "[제목]"

**Section (Middle - Divided into distinct sections vertically):**

**Section 1:**
- **Visual:** [시각적 요소 설명]
- **Text:** "[텍스트]"
- **Sub-text:** "[부제]"

**Section 2:**
- **Visual:** [시각적 요소 설명]
- **Text:** "[텍스트]"
- **Sub-text:** "[부제]"

**Style Parameters:**
- [색상 팔레트]
- [스타일 키워드]
- the Korean text spelled correctly as requested
```

##### 8.3 편향성 제어

**문제점:**
- 한국어 텍스트를 잘못 처리
- 기본적으로 인포그래픽 형태로만 생성하려 함

**해결책:**
- 세부 프롬프트로 명확하게 지시
- "카드뉴스" 형태로 직접 명시
- 특정 부분을 길게 쓰도록 강제

---

#### 9. 분위기/무드 키워드 치트시트

| 한국어 | 영어 키워드 |
|--------|-------------|
| 드라마틱 | dramatic, cinematic, moody |
| 평화로운 | peaceful, serene, calm, tranquil |
| 에너지틱 | energetic, dynamic, vibrant |
| 우울한 | melancholic, somber, gloomy |
| 신비로운 | mystical, ethereal, dreamlike |
| 레트로 | vintage, retro, nostalgic |
| 미래적 | futuristic, sci-fi, cyberpunk |
| 고급스러운 | luxurious, elegant, sophisticated |
| 귀여운 | cute, kawaii, adorable |
| 무서운 | creepy, eerie, unsettling |

---

#### 10. 조명 키워드 치트시트

| 타입 | 영어 키워드 |
|------|-------------|
| 자연광 | natural light, daylight, sunlight |
| 황금시간 | golden hour, magic hour |
| 블루아워 | blue hour, twilight |
| 역광 | backlit, silhouette, rim light |
| 소프트 | soft light, diffused, gentle |
| 하드 | hard light, harsh shadows, dramatic |
| 네온 | neon lights, RGB lighting |
| 스튜디오 | studio lighting, professional |

---

#### 11. 렌즈/카메라 키워드 치트시트

| 효과 | 영어 키워드 |
|------|-------------|
| 아웃포커스 | shallow depth of field, bokeh, f/1.4 |
| 와이드 | wide angle, 24mm, fisheye |
| 망원 | telephoto, 200mm, compressed |
| 매크로 | macro, close-up, extreme detail |
| 틸트시프트 | tilt-shift, miniature effect |
| 필름 | film grain, 35mm film, analog |

---

#### 12. 구도 & 카메라 샷 테크닉

##### 12.1 카메라 앵글

| 앵글 | 설명 | 프롬프트 |
|------|------|----------|
| Eye Level | 자연스러운 시점 | `Eye level shot, natural perspective` |
| Low Angle | 강력한 존재감 | `Low angle shot, dramatic, powerful` |
| High Angle | 취약한 느낌 | `High angle shot, diminishing effect` |
| Dutch Angle | 긴장감 | `Dutch angle, tilted, tension` |
| Bird's Eye | 직접 위에서 | `Bird's eye view, overhead, pattern` |
| Worm's Eye | 극단적 로우앵글 | `Worm's eye view, extreme low angle` |

##### 12.2 프레이밍 기법

| 기법 | 설명 | 프롬프트 |
|------|------|----------|
| Rule of Thirds | 3분할 법칙 | `Rule of thirds composition, balanced` |
| Leading Lines | 유도선 | `Leading lines composition, depth` |
| Frame within Frame | 프레임 속 프레임 | `Frame within frame, layered depth` |
| Symmetry | 대칭 | `Symmetrical composition, mirror-like` |

##### 12.3 샷 거리

| 샷 타입 | 설명 | 프롬프트 키워드 |
|---------|------|-----------------|
| Extreme Close-up | 얼굴 일부 | ECU, extreme detail shot |
| Close-up | 얼굴 전체 | close-up portrait |
| Medium Shot | 허리 위 | medium shot, waist up |
| Long Shot | 전신 | full body shot |
| Extreme Long Shot | 풍경 속 인물 | wide establishing shot |

---

#### 13. 자주 하는 실수들

##### 13.1 너무 모호한 프롬프트

```
❌ "예쁜 여자"
✅ "검은 긴 머리, 큰 눈, 하얀 드레스를 입은 20대 여성, 정면을 바라보는"
```

##### 13.2 상충되는 지시

```
❌ "밝고 어두운 분위기"
✅ 하나의 명확한 분위기 선택
```

##### 13.3 너무 많은 요소

- 프롬프트가 길어질수록 일부 요소가 무시될 수 있음
- **핵심 요소에 집중**

##### 13.4 추상적 개념만 나열

```
❌ "행복한 느낌"
✅ "웃고 있는 아이의 클로즈업"
```

##### 13.5 부정형 지시 과다

- "no watermark" 보다 **원하는 것을 직접 묘사**하는 게 효과적

---

#### 14. 핵심 정리

##### 14.1 기본 원칙 5가지

1. **명확하고 구체적으로 설명하기**
   - 추상적 표현 피하기
   - 시각적으로 묘사

2. **핵심 키워드 반복으로 시그널 강화**
   - 중요한 요소는 여러 번 언급

3. **영어 키워드 적절히 활용**
   - 한글 설명 + 핵심 영어 키워드 혼합

4. **구조화된 프롬프트 사용**
   - 목적에 맞는 형식 선택 (JSON/XML/Markdown)

5. **실험하고 반복하기!**
   - 완벽한 프롬프트는 없음
   - 모델마다 특성이 다름

##### 14.2 형식 선택 가이드

| 상황 | 권장 형식 |
|------|----------|
| **기본 이미지 생성** | **JSON** (구조화된 속성 + 유연한 자연어 details) |
| 구분된 섹션/인포그래픽 | **XML** 또는 **Markdown** |
| 연결된 느낌/타임라인 | **JSON** 또는 **YAML** |
| 배치 생성/일관성 필요 | **JSON** |
| 간단한 단일 이미지 | **자연어** (짧은 설명 시) |

##### 14.3 핵심 인사이트

> **"구조화 안되면 아무것도 못만든다"**
>
> **"시스템화하는게 훨씬 좋다"**
>
> - 공냥이(@specal1849)

---

#### 15. 동영상 프롬프트 JSON 구조 (Veo/Kling 등)

> **핵심 원칙**: 이미지와 동일하게 JSON으로 구조를 잡고, 유연한 설명이 필요한 부분만 자연어로 작성합니다.

##### 15.1 단일 동영상 구조

```json
{
  "subject": "주제 - 핵심 피사체/장면 설명",
  "action": "동작 - 움직임, 행동, 변화",
  "style": "스타일 - 시네마틱/다큐멘터리/애니메이션 등",
  "camera": "카메라 워크 - 패닝/줌인/트래킹샷 등",
  "audio": {
    "dialogue": "대화 (따옴표로 표기)",
    "sfx": "음향효과",
    "music": "배경음악/환경음"
  },
  "duration": "5초/10초/30초",
  "details": "세부사항 - 추가 디테일 (자연어로 유연하게)",
  "negative": "제외할 요소 (wall, frame 등)"
}
```

##### 15.2 다중 장면 구조

```json
{
  "shared_style": {
    "visual_style": "공통 비주얼 스타일",
    "color_grade": "색보정 톤",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "scenes": [
    { "sequence": 1, "duration": "5초", "description": "첫 번째 장면 설명", "audio": "..." },
    { "sequence": 2, "duration": "5초", "description": "두 번째 장면 설명", "audio": "..." }
  ]
}
```

##### 15.3 오디오 프롬프트 표기법

| 유형 | 표기 방법 | 예시 |
|------|----------|------|
| **대화** | '따옴표' 사용 | 'Hello, how are you?' |
| **음향효과** | 명시적 설명 | door creaking, footsteps on gravel |
| **배경음** | 환경 설명 | ambient city noise, gentle rain |

##### 15.4 카메라 워크 키워드

| 카메라 워크 | 영어 키워드 |
|------------|------------|
| 패닝 | pan left, pan right, slow pan |
| 줌 | zoom in, zoom out, dolly zoom |
| 트래킹 | tracking shot, follow shot |
| 고정 | static shot, locked off |
| 드론 | aerial shot, drone sweep |
| 핸드헬드 | handheld, shaky cam |

##### 15.5 동영상 전용 체크리스트

- [ ] 주제/피사체가 명확한가?
- [ ] 동작/움직임이 구체적으로 설명되었는가?
- [ ] 카메라 워크가 지정되었는가?
- [ ] 오디오 요소가 포함되었는가? (대화/효과음/배경음)
- [ ] 길이(duration)가 명시되었는가?
- [ ] 제외할 요소(negative)가 정리되었는가?
- [ ] 비영어 대사 시 영어 감정/말투 메타 지시가 함께 들어갔는가? (15.6 참조)

##### 15.6 비영어 대사 자연스럽게 만들기 (Veo / Sora / Seedance / Kling 공통)

> **핵심 원칙**: 비영어 대사를 그대로만 넣으면 표정·억양이 어색해진다. 괄호 안에 **언어 표시 + 영어로 작성한 감정/말투 묘사**를 함께 적으면 자연스러워진다.
>
> 출처: [@itsyun_ai](https://www.threads.com/@itsyun_ai/post/DXyxUwXghcR) (Seedance 한국어 대사 검증, 2026-05-01). 시나리오 작법(stage direction) 컨벤션이라 동영상 모델 전반에 일반화 가능.

###### 패턴

```
Dialogue - {Character}: ({English emotion/manner descriptor} in {Target Language}{, additional nuance}) "{대사 — 모국어 그대로}"
```

- **언어 표시**: `in Korean`, `in Japanese`, `in Spanish` 등 (필수)
- **감정/말투 묘사**: 영어 형용사·부사 (Whispering, angrily, dripping with rage, gleefully …)
- **추가 nuance**: 상세 컨텍스트 (with intense focus, voice cracking, barely audible)

###### 예시

| 시나리오 | 프롬프트 |
|----------|---------|
| 한국어 / 진지한 속삭임 | `Dialogue - Man: (Whispering in Korean with intense focus) "알파... 작전 개시."` |
| 한국어 / 분노 | `Dialogue - Wife: (Speaking angrily in Korean, voice dripping with rage) "뭐해?!!!"` |
| 일본어 / 부드러움 | `Dialogue - Woman: (Speaking softly in Japanese with a gentle smile) "ありがとう。"` |
| 스페인어 / 흥분 | `Dialogue - Boy: (Shouting excitedly in Spanish) "¡Vamos!"` |
| 중국어 / 슬픔 | `Dialogue - Mother: (Speaking sorrowfully in Mandarin, voice cracking) "回家吧。"` |

###### 감정 키워드 사전 (영어로 작성 권장)

| 감정 | 영어 키워드 |
|------|------------|
| 속삭임 | Whispering, in a low voice, barely audible |
| 분노 | angrily, dripping with rage, seething, fuming |
| 슬픔 | sorrowfully, voice cracking, with a trembling voice |
| 진지함 | with intense focus, gravely, solemnly |
| 즐거움 | cheerfully, gleefully, with a bright smile |
| 놀람 | gasping, wide-eyed, in shock |
| 두려움 | trembling, voice shaking, in a hushed tone |
| 다정함 | warmly, tenderly, softly |

###### 적용 가능 모델

| 모델 | 검증 상태 | 비고 |
|------|----------|------|
| **Seedance** | ✅ 검증됨 | itsyun_ai (2026-05-01, 한국어) |
| **Veo 3.1** | ⚠️ 일반화 적용 | 네이티브 다국어 음성 지원, 동일 패턴 호환 예상 |
| **Sora 2** | ⚠️ 일반화 적용 | 대화 프롬프트 stage direction 컨벤션 학습 |
| **Kling 3.0** | ⚠️ 일반화 적용 | 영어 메타 지시 인식 |

> ⚠️ 표시는 패턴 자체가 모델 비종속(시나리오 작법 컨벤션)이라 **이론적으로 적용 가능**하다는 의미. 모델별 미세 차이(억양·감정 깊이·발음)는 실제 생성으로 확인 필요.

###### JSON 통합 예시 (15.1 단일 동영상 구조에 적용)

```json
{
  "subject": "중년 남성, 어두운 부엌에서 라면을 끓이는 장면",
  "action": "냄비를 들여다보며 가족이 깰까 조심스럽게 움직임",
  "style": "시네마틱, 따뜻한 톤",
  "camera": "slow dolly in, low angle",
  "audio": {
    "dialogue": "Dialogue - Man: (Whispering in Korean with guilt) \"오늘만이야...\"",
    "sfx": "boiling water, gas stove ignition",
    "music": "ambient, late-night soft piano"
  },
  "duration": "8초",
  "details": "배경 시계 02:00 AM",
  "negative": "bright light, multiple people"
}
```

###### 안티패턴

| ❌ 비효율 | ✅ 권장 |
|---------|---------|
| `"뭐해?!" (분노)` (한국어 메타) | `(Speaking angrily in Korean) "뭐해?!"` |
| `Korean dialogue: "알파... 작전 개시."` (메타 분리) | 괄호 한 묶음 + in Korean 명시 |
| `"안녕하세요" 라고 화내며 말한다` (서술문 혼합) | Dialogue 필드 + 괄호 메타로 분리 |
| 감정만 쓰고 언어 누락: `(angrily) "뭐해?!"` | 항상 `in {Language}` 명시 (모델이 영어로 발화하는 사고) |

---

#### 16. 프롬프트 생성 체크리스트

**생성 전 확인:**
- [ ] 주제/피사체가 명확한가?
- [ ] 스타일/매체가 지정되었는가?
- [ ] 조명 조건이 설정되었는가?
- [ ] 색상 팔레트가 정의되었는가?
- [ ] 구도/카메라 앵글이 명시되었는가?
- [ ] 분위기/무드가 설정되었는가?

**형식 선택:**
- [ ] 목적에 맞는 프롬프트 형식인가? (JSON/XML/Markdown/자연어)
- [ ] 구조화가 필요한 경우 적절히 구조화되었는가?

**시그널 강화:**
- [ ] 핵심 키워드가 충분히 강조되었는가?
- [ ] 영어 키워드가 적절히 활용되었는가?
- [ ] 모호한 표현이 제거되었는가?

---

#### 참조 자료

##### 원본 자료 (공냥이 @specal1849)

- **이미지 프롬프트 101 슬라이드**: https://docs.google.com/presentation/d/1rPQVnbu1INJyUAqCvMA7dkO2WzJpD4Q9q_UXq9RH2GU/edit
- **PRO 이미지 프롬프트 Notion**: https://fascinated-alley-b43.notion.site/PRO-2b1861d1faaf80b8bf7ef4093827f59b
- **나노바나나pro 마스터하기**: https://www.threads.com/@specal1849/post/DRYW09dEtUi
- **이미지 프롬프트 심화이론 - JSON vs YAML**: https://www.threads.com/@specal1849/post/DRp8XdFE2VH

##### Obsidian Vault 연결 노트

- `Threads/3-이미지-프롬프트-JSON-2025-01-11.md` - JSON/YAML/XML/Markdown 형식 비교
- `Threads/5-제미나이-나노바나나-활용-2025-01-11.md` - 나노바나나 활용법
- `Threads/1-프롬프트-심화이론-화용론-2025-01-11.md` - 프롬프트 이론 심화

---

#### 17. 슬라이드 이미지 생성

프레젠테이션 슬라이드를 AI 이미지로 생성할 때의 가이드.

> **상세 가이드**: `prompt-engineering-guide.md` 스킬 파일 참조

##### 17.1 슬라이드 이미지 필수 규칙

| 규칙 | 설명 |
|------|------|
| **16:9 비율 필수** | 모든 슬라이드는 와이드스크린 비율 |
| **shared_style** | 전체 덱에 일관된 스타일 적용 (색상, 타이포, 배경) |
| **session_id** | 같은 세션 ID로 일관성 유지 |
| **폰트명 금지** | 시각적 외형으로 설명 ("둥근 산세리프", "굵은 기하학적") |
| **텍스트 최소화** | 슬라이드당 1 메시지 원칙 |
| **자체 설명** | 구두 설명 없이 이해 가능하게 |

##### 17.2 슬라이드 전용 JSON 구조

```json
{
  "generation_instruction": "Generate slide images [1/N], [2/N] in sequence. ONLY ONE image per call.",
  "shared_style": {
    "art_style": "[전체 스타일]",
    "color_palette": "[색상 팔레트 - Hex 코드 포함]",
    "typography": "[시각적 폰트 설명]",
    "background": "[배경 텍스처/색상]",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "slides": [
    {
      "sequence": 1,
      "type": "cover",
      "headline": "[타이틀]",
      "prompt": "[완전한 이미지 프롬프트 - 배경, 레이아웃, 텍스트 배치, 분위기]"
    }
  ]
}
```

##### 17.3 슬라이드 유형별 이미지 구성

| 유형 | 비주얼 비중 | 텍스트 비중 | 구성 요소 |
|------|-----------|-----------|----------|
| Cover | 80% | 20% | 강렬한 비주얼 + 큰 타이틀 |
| Context | 70% | 30% | 배경 일러스트 + 핵심 질문 |
| Content | 60% | 40% | 도표/아이콘 + 핵심 포인트 |
| Data | 50% | 50% | 차트/그래프 + 강조 숫자 |
| Closing | 75% | 25% | 기억될 이미지 + CTA |

##### 17.4 STYLE_INSTRUCTIONS 블록

슬라이드 덱의 비주얼 일관성을 위한 스타일 정의 블록:

```markdown
<STYLE_INSTRUCTIONS>
Design Aesthetic: [2-3문장 전체 비주얼 방향]
Background: [색상 + 텍스처]
Typography: [시각적 외형 - 폰트명 사용 금지]
Color Palette: [Primary, Accent 1, Accent 2 - Hex 포함]
Visual Elements: [그래픽 요소 + 렌더링 가이드]
Style Rules: Do [가이드라인] / Don't [안티패턴]
</STYLE_INSTRUCTIONS>
```

> **27개 비주얼 스타일과 7개 내러티브 모드 상세**: `prompt-engineering-guide.md` 참조

---

---

### Research and fact-check prompt guide

### 리서치 & 팩트체크 프롬프트 가이드

> 이 가이드는 팩트체크와 리서치 작업을 위한 프롬프트 작성 방법을 안내합니다.
> IFCN(국제팩트체킹네트워크) 5대 원칙을 기반으로 구조화되어 있습니다.

---

#### 1. 팩트체크 프롬프트

##### 1.1 LoopFactChecker (완전한 XML 템플릿)

아래는 단계별 대화형 팩트체크를 위한 완전한 프롬프트입니다.

```xml
<FactCheckPrompt name="LoopFactChecker_UI_v1.2">
  <!-- 사용자가 입력한 검증 대상 -->
  <Source>
    <Link>[검증할 URL]</Link>
    <Document>[검증할 문서]</Document>
    <RawText>[검증할 텍스트]</RawText>
  </Source>

  <Objective>
    AI가 제공된 링크·문서·텍스트를 바탕으로
    **다양한 주제(사회, 정치, 과학, 시장 조사 등)**에 대해
    **중립적인 시각**에서 **최적·최선**의 분석을 통해 팩트체크합니다.

    - 여러 가지 해석이 가능한 경우, 명시된 ClaimStatement(검증 대상 문장)에 초점을 맞추되
      **추가적·대안적 해석** 가능성도 고려하여 결론을 내립니다.
    - '베끼기' 등 의도나 동기에 대한 단정적 추측 대신,
      **객관적 증거(시점·내용·출처 등)**를 중심으로 검증합니다.
  </Objective>

  <Principles>
    <IFCN>
      <Item>초당파성과 공정성</Item>
      <Item>정보(원)의 투명성</Item>
      <Item>재원 및 조직의 투명성</Item>
      <Item>방법론의 투명성</Item>
      <Item>개방성과 정직한 수정</Item>
    </IFCN>
    <Ethics>
      <Item>모든 사실을 의심하고 스스로도 검증한다</Item>
      <Item>검증 근거를 투명하게 공개한다</Item>
      <Item>오류 발견 시 즉시 수정‧공개한다</Item>
      <Item>검증 대상의 의도·추측보다, 객관적·검증 가능 항목에 집중한다</Item>
    </Ethics>
    <RecencyPolicy>
      <Rule>오늘(UTC) 자료 → 전날 → 1주일 → 1개월 → 과거 순 검토</Rule>
    </RecencyPolicy>
    <CountrySourcePolicy>
      <Rule>특정 국가·지역 관련 사안이면 해당 국가·지역의 공식·주요 소스 우선 활용</Rule>
      <Rule>그 뒤 국제·제3자 자료로 교차검증</Rule>
    </CountrySourcePolicy>
  </Principles>

  <Workflow>
    <Stage number="1" name="BaselineAnalysis">
      <Goal>기초 지식 기반 분석</Goal>
      <Task>사전 지식으로 주요 사실·쟁점 파악</Task>
      <Task>일반 상식·논리적 일관성과 비교</Task>
      <Task>주제(사회, 정치, 과학, 시장 조사 등)에 따라
            객관적 데이터·연구 결과·공식 발표문을 우선 검토 권장</Task>
      <UserPrompt>2단계(근거 수집)로 진행할까요?</UserPrompt>
    </Stage>

    <Stage number="2" name="EvidenceGathering">
      <Goal>공신력 있는 최신 자료 우선 수집</Goal>
      <Task>오늘 → 전날 → 1주일 → 1개월 → 과거 순 검색·검토</Task>
      <Task>특정 국가·분야(과학, 의료, 경제 등) 사안이면
            해당 분야의 공식·학술·전문기관(학회, 연구기관, 통계청 등) 자료를 우선 참고</Task>
      <Task>신뢰 소스로 사실 가능성 추정</Task>
      <Task>의도나 동기의 추정(예: '베끼기', '사기 목적' 등)은
            충분한 증거·맥락이 없으면 단정하지 않고 보류</Task>
      <UserPrompt>3단계(반론‧상반 주장 검토)로 넘어갈까요?</UserPrompt>
    </Stage>

    <Stage number="3" name="CounterClaimsSearch">
      <Goal>'사실 주장'에 대한 반론·상반 근거 검토</Goal>
      <TaskGroup title="3-A. 주장 초점 재확인">
        <Task>2단계에서 정의한 '검증 대상 문장·팩트'(ClaimStatement)를 재확인</Task>
        <Task>가능하다면 ClaimStatement에 대한 **맥락(배경, 시간적 흐름, 이해관계 등)** 명시</Task>
      </TaskGroup>

      <TaskGroup title="3-B. 상반 주장 수집">
        <Task>ClaimStatement와 **직접적으로 상충**하거나 **지원**하는 근거만 검색</Task>
        <Task>① 발표·연구 시점 반증 ② 측정·분석 방법 차이 ③ 실제 통계치·결과 수치 비교 등
              '객관적 팩트' 중심 근거 확인</Task>
        <Task>정책·가치판단·찬반 논쟁은 제외 (단, 주장 진위 입증에 직접 기여 시 포함)</Task>
      </TaskGroup>

      <TaskGroup title="3-C. 대조·분류">
        <Task>SupportsClaim : ClaimStatement를 뒷받침</Task>
        <Task>RefutesClaim : ClaimStatement를 반박</Task>
        <Task>Inconclusive : 판정하기에 자료·맥락 불충분</Task>
        <Task>각 근거를 Supports vs Refutes vs Inconclusive 표로 정리</Task>
      </TaskGroup>

      <UserPrompt>4단계(최종 판정)로 넘어갈까요?</UserPrompt>
    </Stage>

    <Stage number="4" name="SynthesisAndRating">
      <Goal>최종 판정 및 신뢰도 등급화</Goal>
      <Task>
        <RatingScale>
          <Level>사실</Level>
          <Level>대체로 사실</Level>
          <Level>절반의 사실</Level>
          <Level>대체로 거짓</Level>
          <Level>거짓</Level>
        </RatingScale>
      </Task>
      <Task>결론·핵심 논거·출처 요약</Task>
      <Task>의도적 행위(예: 표절, 부정행위 등)는 **분명한 근거**가 없는 경우
            '단정 불가' 또는 '추가 검증 필요'로 기재</Task>
      <UserPrompt>판단에 대한 피드백, 혹은 재검토가 필요하신가요?</UserPrompt>
    </Stage>
  </Workflow>

  <InteractionRules>
    <LoopControl>각 단계 종료 후 사용자 확인 → 다음 단계/종료 결정</LoopControl>
    <ExitClause>
      "Fact Checker AI의 결과는 참고용입니다. 정확한 판단을 위해 독립적 전문 기관의 추가 검증을 권장드립니다."
    </ExitClause>
  </InteractionRules>

  <QualityControl>
    <ExpertPanel members="3">
      <Process>
        <Step>초안 작성</Step>
        <Step>상호 비판·수정</Step>
        <Step>합의 도출까지 반복</Step>
      </Process>
    </ExpertPanel>
    <RefinementLoop trigger="사용자 피드백·새 증거·오류">
      <Action>해당 단계 회귀‧재검토</Action>
    </RefinementLoop>
  </QualityControl>

  <OutputFormat>
    <Language>한국어</Language>
    <Citations>문단 뒤 번호 → References에 상세 기재</Citations>
    <SummaryFormat>
      <Include>쟁점·최신 근거·반론·결론·등급·참고자료</Include>
    </SummaryFormat>
  </OutputFormat>

  <References>
    <Reference id="IFCN_Principles">IFCN 팩트체크 5대 원칙</Reference>
    <Reference id="Seven_Steps">PolitiFact 7단계 팁</Reference>
  </References>
</FactCheckPrompt>
```

##### 1.2 팩트체크 간소화 버전

빠른 팩트체크가 필요할 때 사용합니다:

```xml
<QuickFactCheck>
  <Claim>[검증할 주장]</Claim>

  <Instructions>
    1. 주장의 핵심 사실 식별
    2. 신뢰할 수 있는 출처 3개 이상 확인
    3. 최신성 검토 (오늘 → 1주일 → 1개월 순)
    4. 교차 검증 수행
    5. 판정 등급 결정:
       - 사실 / 대체로 사실 / 절반의 사실 / 대체로 거짓 / 거짓
  </Instructions>

  <OutputFormat>
    ## 팩트체크 결과
    **주장**: [검증 대상]
    **판정**: [등급]
    **근거**: [핵심 증거 요약]
    **출처**: [참고 자료]
  </OutputFormat>
</QuickFactCheck>
```

---

#### 2. 일반 리서치 프롬프트

팩트체크 원칙을 일반 리서치에 응용한 템플릿입니다.

##### 2.1 종합 리서치 프롬프트

```xml
<ResearchPrompt name="StructuredResearch_v1.0">
  <Topic>[리서치 주제]</Topic>

  <Objective>
    제공된 주제에 대해 체계적이고 균형 잡힌 리서치를 수행합니다.
    객관적 증거와 다양한 시각을 바탕으로 종합적인 분석을 제공합니다.
  </Objective>

  <Principles>
    <Objectivity>
      <Rule>다양한 관점 균형있게 검토</Rule>
      <Rule>주관적 해석과 객관적 사실 구분</Rule>
      <Rule>출처의 신뢰도 평가</Rule>
    </Objectivity>
    <Recency>
      <Rule>최신 자료 우선 (오늘 → 1주일 → 1개월 → 1년)</Rule>
      <Rule>시간에 민감한 정보는 날짜 명시</Rule>
    </Recency>
    <Transparency>
      <Rule>모든 주요 주장에 출처 명시</Rule>
      <Rule>불확실한 정보는 명확히 표시</Rule>
    </Transparency>
  </Principles>

  <Workflow>
    <Stage number="1" name="ScopeDefinition">
      <Goal>리서치 범위 및 핵심 질문 정의</Goal>
      <Task>주제의 핵심 요소 파악</Task>
      <Task>답해야 할 핵심 질문 3-5개 도출</Task>
      <Task>리서치 범위 한계 설정</Task>
      <UserPrompt>범위와 질문이 적절한가요? 수정이 필요하면 알려주세요.</UserPrompt>
    </Stage>

    <Stage number="2" name="DataCollection">
      <Goal>관련 정보 체계적 수집</Goal>
      <Task>1차 자료 (공식 발표, 원본 데이터, 직접 관찰)</Task>
      <Task>2차 자료 (분석 보고서, 학술 연구, 전문가 의견)</Task>
      <Task>3차 자료 (백과사전, 요약 자료) - 개요 파악용</Task>
      <Task>출처별 신뢰도 평가 및 기록</Task>
      <UserPrompt>추가로 조사할 영역이 있나요?</UserPrompt>
    </Stage>

    <Stage number="3" name="Analysis">
      <Goal>수집된 정보 분석 및 종합</Goal>
      <Task>핵심 발견 사항 정리</Task>
      <Task>상충되는 정보 식별 및 평가</Task>
      <Task>패턴 및 트렌드 파악</Task>
      <Task>핵심 질문에 대한 답변 도출</Task>
      <UserPrompt>분석 결과에 대해 질문이 있나요?</UserPrompt>
    </Stage>

    <Stage number="4" name="Synthesis">
      <Goal>최종 종합 및 결론</Goal>
      <Task>핵심 인사이트 요약</Task>
      <Task>한계점 및 추가 연구 필요 영역 명시</Task>
      <Task>실행 가능한 권고사항 (해당 시)</Task>
      <UserPrompt>추가 검토나 수정이 필요하신가요?</UserPrompt>
    </Stage>
  </Workflow>

  <OutputFormat>
    <Structure>
      1. 요약 (Executive Summary)
      2. 배경 (Background)
      3. 핵심 발견 (Key Findings)
      4. 분석 (Analysis)
      5. 결론 및 권고 (Conclusions & Recommendations)
      6. 참고자료 (References)
    </Structure>
    <Citations>인라인 번호 표기 → 참고자료에 상세 기재</Citations>
  </OutputFormat>
</ResearchPrompt>
```

##### 2.2 리서치 유형별 템플릿

###### 시장 조사 (Market Research)

```xml
<MarketResearchPrompt>
  <Target>[조사 대상 시장/제품/서비스]</Target>

  <Framework>
    <Section name="시장 개요">
      <Item>시장 규모 및 성장률</Item>
      <Item>주요 트렌드</Item>
      <Item>시장 동인 및 장벽</Item>
    </Section>

    <Section name="경쟁 분석">
      <Item>주요 경쟁사 현황</Item>
      <Item>시장 점유율</Item>
      <Item>차별화 포인트</Item>
    </Section>

    <Section name="고객 분석">
      <Item>타겟 고객 세그먼트</Item>
      <Item>고객 니즈 및 페인포인트</Item>
      <Item>구매 결정 요인</Item>
    </Section>

    <Section name="기회 및 위협">
      <Item>시장 진입 기회</Item>
      <Item>잠재적 위험 요소</Item>
      <Item>권고 전략</Item>
    </Section>
  </Framework>

  <Sources>
    <Priority>업계 보고서, 통계청, 기업 IR 자료, 전문 미디어</Priority>
  </Sources>
</MarketResearchPrompt>
```

###### 경쟁사 분석 (Competitive Analysis)

```xml
<CompetitiveAnalysisPrompt>
  <Subject>[분석 대상 기업/제품]</Subject>
  <Competitors>[비교 대상 경쟁사 목록]</Competitors>

  <Framework>
    <Dimension name="제품/서비스">
      <Criteria>기능, 품질, 가격, 차별점</Criteria>
    </Dimension>

    <Dimension name="시장 위치">
      <Criteria>시장 점유율, 브랜드 인지도, 고객 충성도</Criteria>
    </Dimension>

    <Dimension name="전략">
      <Criteria>가격 전략, 마케팅, 유통 채널</Criteria>
    </Dimension>

    <Dimension name="역량">
      <Criteria>기술력, 인적 자원, 재무 상태</Criteria>
    </Dimension>
  </Framework>

  <Output>
    <Format>비교 테이블 + SWOT 분석 + 전략적 시사점</Format>
  </Output>
</CompetitiveAnalysisPrompt>
```

###### 학술/기술 리서치 (Academic/Technical Research)

```xml
<AcademicResearchPrompt>
  <Topic>[연구 주제]</Topic>
  <Scope>[연구 범위 및 한계]</Scope>

  <Framework>
    <Section name="문헌 검토">
      <Task>기존 연구 동향 파악</Task>
      <Task>주요 이론 및 모델 정리</Task>
      <Task>연구 갭 식별</Task>
    </Section>

    <Section name="방법론 분석">
      <Task>주요 연구 방법론 비교</Task>
      <Task>각 방법론의 장단점</Task>
      <Task>적용 가능성 평가</Task>
    </Section>

    <Section name="핵심 발견">
      <Task>주요 연구 결과 종합</Task>
      <Task>합의된 사항 vs 논쟁 중인 사항</Task>
      <Task>최신 연구 동향</Task>
    </Section>
  </Framework>

  <Sources>
    <Priority>학술 저널, 학회 논문, 연구 기관 보고서</Priority>
    <Databases>Google Scholar, arXiv, PubMed, IEEE</Databases>
  </Sources>

  <Citation>
    <Style>APA 또는 지정된 스타일</Style>
  </Citation>
</AcademicResearchPrompt>
```

---

#### 3. 모델별 최적화

##### 3.1 GPT-5.2 최적화

```xml
<system_prompt>
  <role>전문 리서치 분석가</role>

  <web_search_rules>
    - Act as an expert research assistant; default to comprehensive, well-structured answers.
    - Prefer web research over assumptions whenever facts may be uncertain.
    - Research all parts of the query, resolve contradictions, and follow second-order implications.
    - Do not ask clarifying questions; instead cover all plausible user intents.
    - Write clearly using Markdown; define acronyms, use concrete examples, conversational tone.
  </web_search_rules>

  <uncertainty_and_ambiguity>
    - If the question is ambiguous or underspecified:
      - Present 2-3 plausible interpretations with clearly labeled assumptions.
    - When external facts may have changed recently:
      - Answer in general terms and state that details may have changed.
    - Never fabricate exact figures or external references when uncertain.
    - Prefer language like "Based on the provided context…" instead of absolute claims.
  </uncertainty_and_ambiguity>

  <output_verbosity_spec>
    - Default: Structured report with clear sections
    - Simple queries: 1 paragraph summary + key points
    - Complex research: Full structured report with citations
    - Always include confidence level for key claims
  </output_verbosity_spec>
</system_prompt>
```

##### 3.2 Gemini 3 최적화

```markdown
#### Constraints (Read First)
- 모든 주장에 출처 명시 필수
- 최신 정보 우선 (날짜 명시)
- 불확실한 정보는 "~로 알려져 있으나 확인 필요" 형식
- 상반된 정보 발견 시 양측 모두 제시

#### Task
[리서치 주제 및 범위]

#### Output Format
1. 요약 (3-5문장)
2. 핵심 발견 (글머리 기호)
3. 상세 분석 (섹션별)
4. 출처 목록

#### Quality Check
- 출처 신뢰도 평가 포함
- 시간에 민감한 정보 날짜 표시
- 한계점 명시
```

##### 3.3 Claude 4.5 최적화

```xml
<system_prompt>
  <role>객관적 리서치 분석가</role>

  <instructions>
    <instruction>모든 주요 주장에 검증 가능한 출처를 명시하세요</instruction>
    <instruction>상반된 정보가 있으면 양측 모두 제시하고 평가하세요</instruction>
    <instruction>불확실한 정보는 명확히 "확인 필요"로 표시하세요</instruction>
    <instruction>최신 정보 우선, 날짜 민감 정보는 시점 명시하세요</instruction>
  </instructions>

  <default_to_action>
    리서치 요청 시 즉시 조사를 시작하세요.
    추가 질문이 필요하면 조사 결과와 함께 제시하세요.
  </default_to_action>

  <use_parallel_tool_calls>
    여러 출처를 동시에 검색할 수 있으면 병렬로 실행하세요.
    독립적인 검색 쿼리는 동시에 수행하여 효율성을 높이세요.
  </use_parallel_tool_calls>

  <output_format>
    ## 리서치 결과: [주제]

    ### 요약
    [핵심 내용 3-5문장]

    ### 핵심 발견
    - [발견 1] [출처]
    - [발견 2] [출처]

    ### 상세 분석
    [섹션별 분석]

    ### 한계점 및 추가 조사 필요 사항
    [명시]

    ### 참고 자료
    [출처 목록]
  </output_format>
</system_prompt>
```

---

#### 4. 품질 관리: 전문가 3인 퇴고

리서치/팩트체크 프롬프트 생성 시, 최종 출력 전 3인 전문가 검토를 거칩니다.

##### 4.1 전문가 페르소나

| 역할 | 전문 분야 | 검토 초점 |
|------|----------|----------|
| **리서치 방법론 전문가** | 연구 설계, 출처 평가 | 방법론 적절성, 출처 신뢰도, 편향 검토 |
| **도메인 전문가** | 해당 주제 분야 | 내용 정확성, 누락 요소, 최신성 |
| **커뮤니케이션 전문가** | 정보 전달, 가독성 | 명확성, 구조, 실행 가능성 |

##### 4.2 퇴고 프로세스

```
1. 초안 생성
   ↓
2. 리서치 방법론 전문가 검토
   - 출처 신뢰도 평가
   - 방법론 적절성
   - 잠재적 편향 확인
   ↓
3. 도메인 전문가 검토
   - 내용 정확성
   - 누락된 핵심 정보
   - 최신 동향 반영 여부
   ↓
4. 커뮤니케이션 전문가 검토
   - 구조 명확성
   - 용어 이해도
   - 실행 가능한 인사이트
   ↓
5. 합의 및 최종 출력
```

##### 4.3 퇴고 출력 형식

```markdown
#### 전문가 퇴고 결과

##### 방법론 전문가 의견
- ✅ 출처 다양성 확보
- ⚠️ 제안: [개선 사항]

##### 도메인 전문가 의견
- ✅ 핵심 내용 포함
- ⚠️ 제안: [개선 사항]

##### 커뮤니케이션 전문가 의견
- ✅ 구조 명확
- ⚠️ 제안: [개선 사항]

##### 합의된 최종 프롬프트
[최종 프롬프트]
```

---

#### 5. 출력 형식 가이드

##### 5.1 팩트체크 결과 형식

```markdown
#### 팩트체크 결과

**검증 대상**: [주장 원문]

**판정**: ⭐ [사실/대체로 사실/절반의 사실/대체로 거짓/거짓]

##### 핵심 근거
1. [지지 근거] - 출처
2. [반박 근거] - 출처

##### 상세 분석
[분석 내용]

##### 맥락
[추가 맥락 정보]

##### 결론
[최종 판단 및 근거 요약]

##### 참고 자료
1. [출처 1]
2. [출처 2]

---
*이 팩트체크 결과는 참고용입니다. 정확한 판단을 위해 추가 검증을 권장합니다.*
```

##### 5.2 리서치 보고서 형식

```markdown
#### [주제] 리서치 보고서

**작성일**: [날짜]
**범위**: [리서치 범위]

##### Executive Summary
[3-5문장 요약]

##### 배경
[주제 배경 및 맥락]

##### 핵심 발견
1. **[발견 1 제목]**: [내용] [출처]
2. **[발견 2 제목]**: [내용] [출처]
3. **[발견 3 제목]**: [내용] [출처]

##### 상세 분석
###### [섹션 1]
[분석 내용]

###### [섹션 2]
[분석 내용]

##### 결론 및 권고
- [결론 1]
- [권고 사항]

##### 한계점
- [한계점 명시]

##### 참고 자료
1. [출처 1]
2. [출처 2]
```

---

#### 6. 참조

##### IFCN 5대 원칙
1. **초당파성과 공정성** - 특정 정파에 치우치지 않음
2. **정보(원)의 투명성** - 출처를 명확히 밝힘
3. **재원 및 조직의 투명성** - 조직 운영 투명성
4. **방법론의 투명성** - 검증 방법 공개
5. **개방성과 정직한 수정** - 오류 발견 시 즉시 수정

##### 신뢰도 평가 기준
| 등급 | 설명 | 예시 출처 |
|------|------|----------|
| **높음** | 공식 기관, 학술 저널, 검증된 통계 | 정부 발표, Nature, 통계청 |
| **중간** | 전문 미디어, 업계 보고서 | Reuters, 가트너, IDC |
| **낮음** | 일반 미디어, 개인 의견 | 블로그, SNS, 위키피디아 |

---

---

### Expert domain priming database

### 전문가 도메인 프라이밍 가이드

> **"act as an expert" 대신 실제 전문가를 지명하고, 그들의 전문 용어를 사용하라"**
>
> 프롬프트 안의 단어는 AI가 탐색하는 잠재 공간(Latent Space)의 좌표다.
> 전문 용어는 그 좌표를 정확히 찍어, 모델 내부의 전문가 영역을 활성화한다.

---

#### 1. 핵심 원칙

##### 1.1 왜 전문가 지명이 효과적인가

LLM은 Mixture of Experts(MoE) 아키텍처를 사용한다. 수많은 '전문가 모듈' 중 요청에 맞는 일부만 활성화된다.

```
일반 프롬프트: "마케팅에 대해 알려줘"
  → 넓은 들판에서 평균적인 답변 (일반 상식 영역)

전문가 프롬프트: "Philip Kotler의 STP 프레임워크에 입각한 B2B SaaS 포지셔닝 전략"
  → 좁은 문제 공간에서 정확한 답변 (전문가 잠재 공간 활성화)
```

**메커니즘:**
- **적확한 토큰(Appropriate Tokens)** = 전문가 이름 + 전문 용어 + 프레임워크명
- 이 토큰들이 **라우팅 시그널(Routing Signal)** 역할을 수행
- 모델 내부의 해당 전문 영역 모듈이 활성화됨
- 결과: 문제 공간(Problem Space)이 축소 → 정확도 상승

##### 1.2 프롬프트 단어의 5가지 역할

모든 프롬프트의 단어는 다음 5가지 중 하나의 역할을 수행한다:

| # | 역할 | 영문 | 핵심 질문 | 효과 |
|---|------|------|-----------|------|
| 1 | **범위 지정** | Target Scope | 어디서 찾을까? | 문제 공간 축소 |
| 2 | **목적 고정** | Goal | 무엇을 달성할까? | 방향성 확보 |
| 3 | **형식 강제** | Format | 어떻게 출력할까? | 구조화된 결과 |
| 4 | **오류 금지** | No-Go | 무엇을 피할까? | 품질 하한선 |
| 5 | **행동 지정** | Behavior | 어떻게 작업할까? | 과정 품질 |

##### 1.3 금지어 6개 (Style Faux Pas)

다음 표현은 AI의 문제 공간을 넓혀 품질을 저하시킨다:

| 금지어 | 문제점 | 대안 |
|--------|--------|------|
| **알아서 잘** | 목표 부재 → AI가 임의로 채움 | 구체적 성공 조건 명시 |
| **깔끔하게** | 기준 모호 → 평균적 톤 | 형식과 구조 지정 (표, 리스트, 3단 구조 등) |
| **대충** | 품질 하한선 붕괴 → 토큰 절약 | 최소 품질 기준 명시 |
| **자세히** | 범위 불명확 → 장황한 출력 | 대상 독자와 깊이 수준 지정 |
| **완벽하게** | 기준 없음 → 과잉 생성 | 체크리스트 형태로 기준 제시 |
| **적당히** | 양적 기준 없음 → 임의 분량 | 수량, 길이, 항목 수 명시 |

> **핵심**: 미사여구를 고치지 말고, **조건을 추가**해야 한다.

---

#### 2. 도메인 프라이밍 5단계 적용법

##### Step 1: 도메인 식별

사용자의 요청에서 해당 분야를 식별한다.

```
예시: "마케팅 전략 보고서를 써줘"
  → 도메인: 마케팅/브랜딩
  → 세부 분야: 전략 수립, 포지셔닝
```

##### Step 2: 실제 전문가 2-3명 조회

아래 전문가 데이터베이스에서 해당 도메인의 전문가를 찾는다.

```
마케팅 도메인 → Philip Kotler, Seth Godin, David Aaker
  → 선택: Kotler (전략 중심), Godin (혁신 마케팅)
```

##### Step 3: 핵심 용어/프레임워크 추출

선택한 전문가의 대표 용어와 프레임워크를 프롬프트에 삽입한다.

```
Kotler → STP(Segmentation-Targeting-Positioning), Marketing Mix(4P→7P), CLV
Godin → Purple Cow, Permission Marketing, Tribe
```

##### Step 4: 역할(Role)에 전문가 직접 지명 (CRITICAL)

> **핵심 원칙**: 프롬프트의 `<role>` 블록에 실존 전문가를 직접 지명한다.
> 간접 표현(예: "~에 정통한 전문가") 대신, 전문가 본인으로 역할을 설정한다.

**정규 패턴:**

```
<role>
  당신은 [실존 전문가명]입니다.
  [핵심 프레임워크/저서]에 입각하여 [구체적 행동]합니다.
</role>
```

**적용 예시:**

| 도메인 | 역할 예시 |
|--------|----------|
| 코딩 | `당신은 Robert C. Martin입니다. SOLID 원칙과 Clean Architecture에 입각하여 코드를 리뷰합니다.` |
| 마케팅 | `당신은 Philip Kotler입니다. STP 프레임워크와 Marketing Mix에 입각하여 시장 전략을 수립합니다.` |
| UX | `당신은 Don Norman입니다. Human-Centered Design과 Affordance 이론에 입각하여 사용성을 평가합니다.` |
| 데이터 | `당신은 Edward Tufte입니다. Data-Ink Ratio와 Analytical Design 원칙에 입각하여 시각화를 설계합니다.` |
| 글쓰기 | `당신은 William Zinsser입니다. On Writing Well의 원칙에 입각하여 간결하고 명료한 글을 작성합니다.` |

**왜 직접 지명이 효과적인가:**
- 간접 참조보다 **더 강한 잠재 공간 활성화** (MoE 라우팅 시그널이 직접적)
- **토큰 효율 향상** ("~에 정통한 15년 경력의..." vs "당신은 X입니다")
- 업계에서 널리 사용되는 검증된 기법

**복수 전문가 조합 (선택):**

```
<role>
  당신은 Martin Fowler와 Robert C. Martin의 관점을 결합한 소프트웨어 아키텍트입니다.
  Refactoring과 Clean Architecture 원칙에 입각하여 시스템을 설계합니다.
</role>
```

**본문에 전문 용어 삽입 (Step 4 보완):**

```markdown
❌ Before: "마케팅 전략 보고서를 잘 써줘"

✅ After:
"Philip Kotler의 STP 프레임워크와 David Aaker의 Brand Equity 모델에 입각하여
B2B SaaS 시장의 포지셔닝 전략 보고서를 작성하라.

- 세그멘테이션: TAM/SAM/SOM 기준
- 타겟팅: ICP(Ideal Customer Profile) 정의
- 포지셔닝: 경쟁사 대비 차별화 맵
- 출력: 요약(200자)-본문(3섹션)-결론-액션아이템"
```

##### Step 5: 5가지 역할 체크리스트 점검

작성한 프롬프트를 5가지 역할로 점검한다:

```
□ 범위 지정: "B2B SaaS 시장" ✅
□ 목적 고정: "포지셔닝 전략 보고서" ✅
□ 형식 강제: "요약-본문-결론-액션아이템" ✅
□ 오류 금지: (필요시 추가) "추측성 정보 사용 금지" 등
□ 행동 지정: "STP 프레임워크에 입각하여" ✅
```

---

#### 3. 품질 수렴 루프

한 번에 완성하려는 태도가 가장 비싼 습관이다. 프롬프트는 반복적으로 수렴시킨다.

```
(1) 프롬프트 작성 후 생성
        ↓
(2) 기준 미달이면 새 세션에서 수정 후 재생성
        ↓
(3) 결과를 비교해 부족한 조건을 추가
        ↓
(4) 검토 지시로 결함을 찾음
        ↓
(5) 수정 지시로 재생성
        ↓
    (반복 → 수렴)
```

**루프 안에서 해야 할 것:**
1. **단어의 효과 관찰**: 어떤 키워드가 결과를 바꾸는지 파악
2. **적정선 판단**: 품질이 충분한 지점에서 사용
3. **결과물 미리 구상**: 어떤 출력을 원하는지 먼저 생각

---

#### 4. 전문가 데이터베이스 (12개 도메인)

##### 4.1 기술/AI/소프트웨어

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Martin Fowler** | 소프트웨어 아키텍처 | Refactoring, Microservices, Domain-Driven Design, Event Sourcing |
| **Robert C. Martin** | 클린 코드 | SOLID Principles, Clean Architecture, TDD, Dependency Inversion |
| **Kent Beck** | 소프트웨어 설계 | Extreme Programming, Test-Driven Development, Design Patterns |
| **Geoffrey Hinton** | 딥러닝/신경망 | Backpropagation, Representation Learning, Capsule Networks |
| **Andrej Karpathy** | AI/신경망 교육 | Neural Network training, Tokenization, nanoGPT, Software 2.0 |
| **Chris Olah / Catherine Olsson** | 해석가능 AI | Transformer Circuits, Feature Visualization, Mechanistic Interpretability |

##### 4.2 비즈니스/경영/전략

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Michael Porter** | 경쟁 전략 | Five Forces, Value Chain, Competitive Advantage, Generic Strategies |
| **Clayton Christensen** | 혁신 전략 | Disruptive Innovation, Jobs-to-be-Done, Innovator's Dilemma |
| **Peter Drucker** | 경영 일반 | Management by Objectives, Knowledge Worker, Effectiveness |
| **Jim Collins** | 기업 성과 | Good to Great, BHAG, Hedgehog Concept, Level 5 Leadership |
| **Herbert Simon** | 의사결정 | Bounded Rationality, Satisficing, Administrative Behavior |

##### 4.3 마케팅/브랜딩

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Philip Kotler** | 마케팅 전략 | STP, Marketing Mix(4P→7P), CLV, Holistic Marketing |
| **Seth Godin** | 혁신 마케팅 | Purple Cow, Permission Marketing, Tribes, The Dip |
| **David Aaker** | 브랜드 전략 | Brand Equity Model, Brand Architecture, Brand Identity |
| **Al Ries / Jack Trout** | 포지셔닝 | Positioning, 22 Laws of Marketing, Mind Share |
| **Byron Sharp** | 마케팅 사이언스 | How Brands Grow, Mental Availability, Physical Availability |

##### 4.4 UX/디자인

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Don Norman** | 인지 디자인 | Affordance, Gulf of Execution/Evaluation, Human-Centered Design |
| **Jakob Nielsen** | 사용성 공학 | 10 Heuristics, Usability Testing, Nielsen's Law |
| **Jef Raskin** | 인터페이스 디자인 | The Humane Interface, Cognitive Load, Modeless UI |
| **Edward Tufte** | 정보 시각화 | Data-Ink Ratio, Sparklines, Small Multiples, Chartjunk |
| **Steve Krug** | 웹 사용성 | Don't Make Me Think, Trunk Test, Usability Walk-through |

##### 4.5 데이터/분석

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Nate Silver** | 통계적 예측 | Signal vs Noise, Bayesian Thinking, Probabilistic Forecasting |
| **Edward Tufte** | 데이터 시각화 | Data-Ink Ratio, Sparklines, Analytical Design Principles |
| **Hans Rosling** | 데이터 커뮤니케이션 | Factfulness, Gap Instinct, Dollar Street, Animated Charts |
| **Hadley Wickham** | 데이터 과학/R | Tidy Data, Grammar of Graphics (ggplot2), Tidyverse |
| **DJ Patil** | 데이터 전략 | Data Products, Data-Driven Decision Making |

##### 4.6 교육/학습과학

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Seymour Papert** | 구성주의 학습 | Constructionism, Mindstorms, Objects to Think With, Logo |
| **Lev Vygotsky** | 사회적 학습 | ZPD(Zone of Proximal Development), Scaffolding, Mediation |
| **Benjamin Bloom** | 교육 평가 | Bloom's Taxonomy, Mastery Learning |
| **K. Anders Ericsson** | 전문성 연구 | Deliberate Practice, 10000 Hour Rule, Expert Performance |
| **John Hattie** | 메타분석 | Visible Learning, Effect Size, Feedback |

##### 4.7 심리학/행동과학

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Daniel Kahneman** | 행동경제학 | System 1/2, Heuristics & Biases, Prospect Theory, Anchoring |
| **Gary Klein** | 자연적 의사결정 | RPD(Recognition-Primed Decision), Premortem, NDM |
| **Mihaly Csikszentmihalyi** | 몰입 | Flow State, Optimal Experience, Autotelic Personality |
| **Robert Cialdini** | 설득 심리학 | 6 Principles of Influence, Pre-suasion, Social Proof |
| **Angela Duckworth** | 그릿/끈기 | Grit, Deliberate Practice, Passion + Perseverance |

##### 4.8 의학/건강과학

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Atul Gawande** | 의료 품질/체크리스트 | Checklist Manifesto, Positive Deviance, Coaching in Medicine |
| **Siddhartha Mukherjee** | 종양학/유전학 | Emperor of All Maladies, Gene, Cancer Biology |
| **John Ioannidis** | 메타연구/근거중심의학 | "Why Most Published Research Findings Are False", Meta-analysis |
| **Ben Goldacre** | 근거중심의학 비판 | Bad Science, Bad Pharma, Systematic Review, P-hacking |
| **Eric Topol** | 디지털 의료 | Deep Medicine, AI in Healthcare, Patient Empowerment |

##### 4.9 법률/규제

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Lawrence Lessig** | 사이버법 | Code is Law, Creative Commons, Four Regulators |
| **Cass Sunstein** | 행동 규제 | Nudge, Cost-Benefit Analysis, Libertarian Paternalism |
| **Tim Wu** | 기술/독점 규제 | The Master Switch, Net Neutrality, Attention Merchants |
| **Ryan Calo** | AI 법학 | Algorithmic Accountability, Robot Law, Digital Intermediaries |

##### 4.10 금융/투자

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Benjamin Graham** | 가치 투자 | Margin of Safety, Mr. Market, Intrinsic Value |
| **Warren Buffett** | 투자 철학 | Moat, Circle of Competence, Owner's Earnings |
| **Ray Dalio** | 매크로/원칙 | Principles, All Weather Portfolio, Machine Economy |
| **Aswath Damodaran** | 기업 가치평가 | DCF, Narrative + Numbers, Valuation |
| **Nassim Taleb** | 리스크/불확실성 | Black Swan, Antifragile, Skin in the Game, Fat Tails |

##### 4.11 글쓰기/저널리즘/콘텐츠

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **William Zinsser** | 논픽션 글쓰기 | On Writing Well, Clarity, Simplicity, Clutter-Free |
| **Stephen King** | 창작 글쓰기 | On Writing, Show Don't Tell, Kill Your Darlings |
| **Ann Handley** | 콘텐츠 마케팅 | Everybody Writes, Content Rules, Brand Journalism |
| **Joseph Campbell** | 내러티브 구조 | Hero's Journey, Monomyth, Archetypes |
| **Robert McKee** | 스토리 구조 | Story, Inciting Incident, Climax, Arc |

##### 4.12 인지과학/확장된 마음 (Deep-Cut)

> 아래는 연구자 레벨의 전문가로, 깊은 분석이 필요할 때 활용한다.

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Andy Clark** | 확장된 마음 | Extended Mind, Cognitive Extension, Predictive Processing |
| **Edwin Hutchins** | 분산 인지 | Distributed Cognition, Cognition in the Wild |
| **Lucy Suchman** | 상황적 행동 | Plans and Situated Actions, Human-Machine Interaction |
| **Karl Weick** | 센스메이킹 | Sensemaking, Enactment, Organizational Resilience |
| **Donald Schön** | 반성적 실천 | Reflective Practitioner, Reflection-in-Action |
| **Alison Gopnik** | 아동 탐색/가설생성 | Theory Theory, Bayesian Children, Exploration vs Exploitation |
| **Peter Gärdenfors** | 개념 공간 | Conceptual Spaces, Geometric Cognition |
| **Francisco Varela** | 체화 인지 | Enactivism, Autopoiesis, Embodied Mind |
| **Virginia Satir** | 시스템 치료 | Self-Other-Context, Communication Stances, Congruence |
| **W. Timothy Gallwey** | 이너 게임 | Self 1/Self 2, Non-judgmental Awareness, Performance Coaching |

##### 4.13 공학/엔지니어링

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Rodney Brooks** | 로봇공학 | Behavior-Based Robotics, Subsumption Architecture, iRobot, Rethink Robotics |
| **Sebastian Thrun** | 자율주행/AI 로봇 | Probabilistic Robotics, Google Self-Driving Car, Udacity, SLAM |
| **Henry Petroski** | 공학 설계/실패 분석 | To Engineer Is Human, Design Paradigm, Success Through Failure |
| **Frances Arnold** | 유도 진화/화학공학 | Directed Evolution, Nobel Prize Chemistry 2018, Enzyme Engineering |
| **Burt Rutan** | 항공우주 설계 | SpaceShipOne, Composite Aircraft, Voyager, Private Spaceflight |
| **Donella Meadows** | 시스템 공학/환경 | Limits to Growth, Systems Thinking, Leverage Points, System Dynamics |

##### 4.14 음악/공연예술

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Leonard Bernstein** | 지휘/작곡/음악교육 | West Side Story, Young People's Concerts, Musical Pedagogy |
| **Quincy Jones** | 음악 프로듀싱 | Thriller, Off The Wall, Jazz-Pop Crossover, Film Scoring |
| **Hans Zimmer** | 영화 음악 작곡 | The Dark Knight, Inception, Interstellar, Orchestral-Electronic Fusion |
| **Rick Rubin** | 음반 프로듀싱 | Def Jam, Stripped-Down Production, Genre-Crossing, The Creative Act |
| **Nadia Boulanger** | 음악 교육/작곡 | Pedagogy of Composition, Fontainebleau, Copland/Glass/Jones 멘토 |

##### 4.15 시각예술/사진

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Annie Leibovitz** | 초상 사진 | Celebrity Portrait, Rolling Stone, Vanity Fair, Theatrical Staging |
| **Ansel Adams** | 풍경 사진 | Zone System, Large Format, National Parks, Environmental Photography |
| **David Hockney** | 현대 미술 | Hockney–Falco Thesis, iPad Art, Photomontage, Swimming Pool Series |
| **Hans Ulrich Obrist** | 현대 미술 큐레이팅 | Serpentine Galleries, Marathon Interviews, Curatorial Practice |
| **John Berger** | 미술 비평 | Ways of Seeing, Visual Culture Theory, Gaze Critique |

##### 4.16 영화/방송/미디어

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Walter Murch** | 영화 편집/사운드 디자인 | In the Blink of an Eye, Rule of Six, Sound Design, Apocalypse Now |
| **Roger Deakins** | 촬영 감독 | Blade Runner 2049, 1917, Digital Color Correction, Natural Lighting |
| **Syd Field** | 시나리오 작법 | Screenplay, Three-Act Structure, Plot Points, Paradigm |
| **Sidney Lumet** | 영화 연출 | Making Movies, 12 Angry Men, Character-Driven Direction |
| **Casey Neistat** | 디지털 콘텐츠 크리에이터 | Vlogging, YouTube Creator, Visual Storytelling, Creator Economy |

##### 4.17 요리/식음료

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Auguste Escoffier** | 클래식 프랑스 요리 | Le Guide Culinaire, Brigade System, Five Mother Sauces |
| **Ferran Adrià** | 분자 요리 | El Bulli, Spherification, Culinary Foam, Deconstructivism |
| **Jiro Ono** | 스시/장인 정신 | Shokunin, Jiro Dreams of Sushi, Perfection Through Repetition |
| **James Hoffmann** | 커피/바리스타 | World Barista Champion, The World Atlas of Coffee, Specialty Coffee |
| **Jancis Robinson** | 와인/소믈리에 | The Oxford Companion to Wine, Master of Wine, Wine Education |

##### 4.18 스포츠/피트니스

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Phil Jackson** | 농구 코칭/리더십 | Triangle Offense, Zen Master, Eleven Rings, Mindful Leadership |
| **Tim Grover** | 엘리트 트레이닝 | Relentless, Attack Athletics, Mental Toughness, Jordan/Kobe Trainer |
| **Pep Guardiola** | 축구 전술 | Tiki-Taka, Positional Play, Total Football, Tactical Innovation |
| **Mark Rippetoe** | 근력 트레이닝 | Starting Strength, Barbell Training, Linear Progression, Compound Lifts |
| **Tudor Bompa** | 주기화 이론 | Periodization, Macrocycle/Mesocycle/Microcycle, Training Science |

##### 4.19 패션/뷰티

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Coco Chanel** | 패션 디자인 | Little Black Dress, Chanel No.5, Modernist Fashion, Women's Liberation |
| **Karl Lagerfeld** | 패션 디자인/브랜딩 | Chanel Creative Director, Fendi, Brand Reinvention, Fashion Sketch |
| **Bobbi Brown** | 메이크업/뷰티 | Natural Beauty, Bobbi Brown Cosmetics, Jones Road, Beauty Philosophy |
| **Tim Gunn** | 패션 멘토링/교육 | Project Runway, Make It Work, Fashion Therapy, Parsons |
| **Diana Vreeland** | 패션 저널리즘/큐레이팅 | Vogue, Harper's Bazaar, "The Eye Has to Travel", Fashion Exhibition |

##### 4.20 항공/운송/여행

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Chesley Sullenberger** | 항공 안전 | Hudson River Landing, Crew Resource Management, Safety Reliability |
| **Patrick Smith** | 항공 커뮤니케이션 | Ask the Pilot, Aviation Myth-Busting, Commercial Aviation |
| **James Reason** | 인적 오류/안전 | Swiss Cheese Model, Human Error, Just Culture, Organizational Accidents |
| **Rick Steves** | 여행/관광 | Europe Through the Back Door, Cultural Travel, Budget Travel |
| **Tony Wheeler** | 여행 가이드 | Lonely Planet, Independent Travel, Backpacking Culture |

##### 4.21 공공행정/치안/군사

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Carl von Clausewitz** | 전쟁 이론 | On War, Fog of War, Friction, Center of Gravity |
| **Sun Tzu** | 군사 전략 | Art of War, Know Your Enemy, Strategic Advantage, Deception |
| **David Kilcullen** | 현대 대반란전 | Counterinsurgency, Twenty-Eight Articles, Accidental Guerrilla |
| **James Mattis** | 군사 리더십 | Call Sign Chaos, Strategic Leadership, Civil-Military Relations |
| **Robert Peel** | 근대 경찰학 | Peelian Principles, Modern Policing, Policing by Consent |

##### 4.22 사회복지/상담/돌봄

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Carl Rogers** | 인간중심 상담 | Person-Centered Therapy, Unconditional Positive Regard, Empathy |
| **Irvin Yalom** | 실존주의 심리치료 | Existential Psychotherapy, Group Therapy, Staring at the Sun |
| **Jane Addams** | 사회복지/지역사회 | Hull House, Settlement Movement, Nobel Peace Prize, Social Reform |
| **Brené Brown** | 취약성/회복탄력성 | Daring Greatly, Vulnerability, Shame Resilience, Wholehearted Living |
| **Marshall Rosenberg** | 비폭력 대화 | Nonviolent Communication (NVC), Compassionate Communication, Needs-Based |

##### 4.23 농업/축산/환경

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Temple Grandin** | 동물 행동/축산 | Animal Welfare, Livestock Handling, Visual Thinking, Humane Design |
| **Wes Jackson** | 지속가능 농업 | Land Institute, Perennial Polyculture, New Roots for Agriculture |
| **Masanobu Fukuoka** | 자연 농법 | One-Straw Revolution, Natural Farming, No-Till, Do-Nothing Farming |
| **Allan Savory** | 총체적 관리 | Holistic Management, Planned Grazing, Desertification Reversal |
| **Rachel Carson** | 환경과학 | Silent Spring, Environmental Movement, Pesticide Critique, Ecology |

##### 4.24 건축/인테리어/부동산

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Frank Lloyd Wright** | 유기적 건축 | Organic Architecture, Fallingwater, Usonian Houses, Prairie Style |
| **Tadao Ando** | 미니멀리즘 건축 | Church of Light, Concrete, Critical Regionalism, Natural Light |
| **Christopher Alexander** | 패턴 언어 | A Pattern Language, Timeless Way of Building, Human-Centered Design |
| **Zaha Hadid** | 해체주의 건축 | Parametric Design, Fluid Forms, Deconstructivism, MAXXI |
| **Kelly Wearstler** | 인테리어 디자인 | Maximalist Design, Material Honesty, Hotel Design, Texture Layering |

##### 4.25 언어/통번역

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Noam Chomsky** | 언어학 이론 | Generative Grammar, Universal Grammar, Deep/Surface Structure |
| **Eugene Nida** | 번역 이론 | Dynamic Equivalence, Functional Equivalence, Bible Translation |
| **Lawrence Venuti** | 번역학/문화 | Foreignization, Domestication, Translator's Invisibility |
| **David Crystal** | 영어학/언어 | Cambridge Encyclopedia of Language, Language Death, Internet Linguistics |
| **Mona Baker** | 번역학 | In Other Words, Translation Universals, Narrative Theory in Translation |

##### 4.26 인사/조직관리

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Dave Ulrich** | HR 전략 | HR Business Partner, HR Competencies, Victory Through Organization |
| **Patty McCord** | 조직문화 | Netflix Culture Deck, Freedom & Responsibility, Powerful |
| **Laszlo Bock** | 데이터 기반 HR | Work Rules!, People Analytics, Google People Operations |
| **Edgar Schein** | 조직문화 이론 | Three Levels of Culture, Psychological Safety, Humble Inquiry |
| **Marcus Buckingham** | 강점 기반 관리 | StrengthsFinder, First Break All the Rules, Strength-Based Management |

##### 4.27 물류/무역/관세

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **Yossi Sheffi** | 공급망 회복력 | MIT CTL, Resilient Enterprise, Logistics Clusters, Supply Chain Risk |
| **Hau Lee** | 공급망 관리 | Bullwhip Effect, Triple-A Supply Chain, Stanford Global SCM Forum |
| **Martin Christopher** | 물류학 | Logistics & Supply Chain Management, Agile Supply Chain, Cranfield |
| **David Simchi-Levi** | 공급망 최적화 | Operations Rules, Supply Chain Design, MIT Operations Research |
| **Eli Goldratt** | 제약 이론/생산 | Theory of Constraints, The Goal, Critical Chain, Throughput Accounting |

##### 4.28 테크 디자인/크리에이터 리더십

| 전문가 | 전문 분야 | 핵심 용어/프레임워크 |
|--------|----------|---------------------|
| **John Maeda** | 디자인+테크놀로지 | The Laws of Simplicity, Design in Tech Report, Computational Design, MIT Media Lab |
| **Bret Victor** | 인터랙티브 컴퓨팅 | Inventing on Principle, Explorable Explanations, Learnable Programming, Dynamic Media |
| **Julie Zhuo** | 프로덕트 디자인 리더십 | The Making of a Manager, Design Management, Product Thinking, Sundial |
| **Guillermo Rauch** | 개발자 경험/인프라 | Vercel, Next.js, Edge Computing, AI-Native Development, Developer Experience |
| **Maggie Appleton** | 디지털 지식 디자인 | Digital Gardens, Embodied Cognition in AI, Visual Explanations, Language Model Folklore |
| **Jony Ive** | 산업/제품 디자인 | Apple Design Language, LoveFrom, Material Honesty, Simplicity in Hardware, Unibody |
| **Tobi Lütke** | AI 퍼스트 경영 | Shopify, AI-First Organization, Founder Mode, Developer-Led Growth |
| **Pieter Levels** | 인디 해킹/1인 빌더 | Nomad List, Photo AI, MAKE Book, Ship Fast, Solo Entrepreneurship, $3M ARR |

---

#### 5. 전문가 없을 때 폴백 메커니즘

> **CRITICAL**: DB에 해당 분야 전문가가 없더라도, **되도록 웹 검색하여** 실존 전문가를 찾아
> `<role>` 블록에 직접 지명해야 한다. "일반 전문가" 역할로 대체하지 않는다.
> (일부 일상적 작업은 전문가 특정이 어려울 수 있으나, 그래도 시도할 것)

데이터베이스에 해당 분야 전문가가 없을 경우:

##### 방법 1: 되도록 검색하여 전문가를 찾아 역할에 적용

1. 사용자의 작업/입력 프롬프트에서 도메인 식별
2. **되도록 웹 검색하여** 해당 분야의 가장 영향력 있는 전문가 1-2명 탐색
3. 핵심 프레임워크/저서 확인
4. `<role>당신은 [찾은 전문가]입니다. [프레임워크]에 입각하여 [행동]합니다.</role>` 형식으로 적용

```
예시: 사용자가 "음향 엔지니어링" 관련 프롬프트 요청
→ DB에 음향 전문가 없음
→ AI 탐색: Bob Katz (Mastering Audio), Bobby Owsinski (Mix Engineer's Handbook)
→ role: "당신은 Bob Katz입니다. Mastering Audio의 원칙에 입각하여..."
```

**탐색 프롬프트 (내부용):**

```markdown
"[특정 분야]의 가장 영향력 있는 연구자/실무가 3명을 추천하라.
각각의 대표 저서, 핵심 프레임워크, 주요 용어 3-5개를 포함할 것."
```

##### 방법 2: 웹 검색 활용

```
1. 해당 분야 + "influential researchers" 또는 "seminal works" 검색
2. Top 3 전문가 식별
3. 그들의 핵심 프레임워크/용어 추출
4. 프롬프트에 삽입
```

##### 방법 3: 메타프롬프팅

> AI에게 해당 분야 프롬프트를 먼저 작성하게 하면, 업계 개념/정의/관행/평가 기준이 자동 포함된다.

```markdown
"당신은 [분야] 전문가입니다. 이 분야에서 [작업]을 수행하는 최적의 프롬프트를 작성하라.
업계에서 사용하는 전문 용어, 관행적인 산출물 구조, 좋은 결과를 가르는 평가 기준을 반드시 포함할 것."
```

---

#### 6. 도메인 프라이밍 적용 예시 (Before/After)

##### 예시 1: 소프트웨어 아키텍트

```markdown
❌ Before:
"API 설계를 리뷰해줘. 잘 되어있는지 확인해줘."

✅ After:
"Martin Fowler의 Richardson Maturity Model과 Robert C. Martin의 SOLID 원칙에 입각하여
아래 REST API 설계를 리뷰하라.

평가 기준:
1. Richardson Level 3 (HATEOAS) 준수 여부
2. Single Responsibility Principle 적용 여부
3. API Versioning 전략 (URI vs Header)
4. 에러 응답 표준화 (RFC 7807 준수)

출력: 항목별 점수(1-5) + 개선 제안 + 리팩토링 우선순위"
```

##### 예시 2: 마케팅 전략가

```markdown
❌ Before:
"브랜드 포지셔닝 전략을 세워줘. 좋은 전략으로."

✅ After:
"David Aaker의 Brand Equity Model과 Al Ries의 Positioning 법칙에 입각하여
[브랜드명]의 B2C 시장 포지셔닝 전략을 수립하라.

분석 프레임:
1. Aaker의 Brand Identity Prism: 물리적 특성, 개성, 문화, 관계, 반영, 자기이미지
2. Ries의 Law of Focus: 하나의 단어/개념 선점 전략
3. Byron Sharp의 Mental Availability: 브랜드 연상 구축 전략

출력: 포지셔닝 맵 + 타겟 세그먼트 프로필 + 차별화 메시지 3가지 + 실행 로드맵"
```

##### 예시 3: 데이터 분석가

```markdown
❌ Before:
"데이터 시각화를 자세히 해줘."

✅ After:
"Edward Tufte의 Analytical Design 원칙과 Stephen Few의 Dashboard Design에 입각하여
아래 매출 데이터의 시각화 전략을 제안하라.

적용 원칙:
1. Tufte의 Data-Ink Ratio 최대화
2. Few의 Information Dashboard Design: 핵심 지표 우선 배치
3. Nate Silver의 Signal vs Noise 접근: 의미 있는 트렌드만 부각

금지사항:
- 3D 차트, 불필요한 장식(Chartjunk) 사용 금지
- 이중 축(Dual Axis) 차트 지양
- 색상 7개 초과 사용 금지

출력: 차트 유형 선택 근거 + 대시보드 레이아웃 + Sparkline 적용 구간"
```

---

#### 7. 프롬프트 작성 최종 체크리스트

프롬프트 작성 전 자문:

```
□ 역할 직접 지명: <role> 블록에 실존 전문가를 직접 지명했는가? (간접 참조 금지)
□ 전문 용어: 전문가의 프레임워크/이론/용어를 사용했는가?
□ 범위 지정: 탐색 범위가 명확한가? (도메인, 세부 분야)
□ 목적 고정: 성공 조건이 정의되어 있는가?
□ 형식 강제: 출력 구조가 지정되어 있는가?
□ 오류 금지: 하지 말아야 할 것이 명시되어 있는가?
□ 행동 지정: 작업 방식이 지시되어 있는가?
□ 금지어 제거: 알아서잘/깔끔하게/대충/자세히/완벽하게/적당히 제거했는가?
□ 결과물 구상: 원하는 출력의 모습을 미리 구상했는가?
```

---

#### 8. 참조 원칙 요약

##### 프롬프트 쿠튀르 핵심

> "같은 AI를 쓰는데 왜 전문가가 더 잘 쓸까?"

| 일반 사용자 | 전문가 |
|------------|--------|
| "자세히 설명해줘" | 업계 용어로 범위 지정 |
| 넓은 들판에서 평균적 답변 | 좁은 문제 공간에서 정확한 답변 |
| 완연한 문장 + 부사 | 명확한 키워드 조합 |
| 한 번에 완성하려 함 | 생성→검토→수정 루프 |

##### Master Class 핵심

> "프롬프트 엔지니어링은 LLM의 잠재 공간을 정확한 토큰으로 타격하여 원하는 지능을 꺼내 쓰는 아키텍처링 행위"

**3대 원칙:**
1. **Skill Architecture**: 프롬프트를 재사용 가능한 스킬 단위로 모듈화
2. **Domain Priming**: 적확한 토큰으로 전문가 영역 활성화
3. **Human-AI Loop**: 인간이 방향을 설정하고, AI가 지식을 펼치고, 인간이 평가하는 반복

---

---

### Slide and PPT prompt guide

### 슬라이드 프롬프트 가이드

> **"아웃라인 먼저, 이미지는 나중에"**
>
> 좋은 슬라이드는 좋은 아웃라인에서 시작한다. 메시지 계층화 → 아웃라인 → 프롬프트 순서를 지킨다.

---

#### 1. 슬라이드 생성 접근 방식 비교

| 방식 | 도구 | 장점 | 단점 | 추천 상황 |
|------|------|------|------|----------|
| **AI 이미지 슬라이드** | baoyu-slide-deck | 비주얼 극대화, 27 스타일 | 슬라이드당 10-30초 | 고퀄리티 공유용 |
| **NotebookLM PPT** | Gemini | 빠른 생성, 소스 기반 | 커스텀 제한 | 빠른 교육용 |
| **텍스트 프롬프트** | GPT/Claude/Gemini | 유연함, 구조 제어 | 시각 요소 제한 | 초안/기획용 |

---

#### 2. 핵심 원칙: "아웃라인 먼저" (Outline-First)

##### 2.1 콘텐츠 분석 프레임워크

슬라이드 제작 전 반드시 콘텐츠를 분석한다:

**a) 핵심 메시지 1문장 (15자 이내)**
- 청중이 하나만 기억한다면?
- 예: "AI는 좌표가 필요하다"

**b) 지지 포인트 3-5개 (우선순위별)**
- 핵심 메시지를 뒷받침하는 근거
- 소스 순서가 아닌 청중 관련성 순서로 정렬

**c) CTA (Call-to-Action)**
- 청중이 슬라이드를 본 후 무엇을 해야 하는가?
- 명확하고 구체적이며 실행 가능한 행동

**d) 청중 결정 매트릭스**

| 질문 | 분석 |
|------|------|
| 주요 청중은? | 역할, 전문 수준, 주제 관계 |
| 현재 무엇을 믿는가? | 기존 지식, 가정, 편견 |
| 어떤 결정을 원하는가? | 구체적 행동 또는 결론 |
| 장벽은? | 반대 의견, 우려, 부족한 정보 |
| 설득할 증거는? | 데이터 유형, 신뢰 출처, 감성 훅 |

**e) 콘텐츠-시각화 매핑**

| 콘텐츠 유형 | 시각화 방식 | 예시 |
|------------|-----------|------|
| 비교 | 나란히 배치, Before/After | 기능 비교표 |
| 프로세스 | 플로우 다이어그램, 번호 단계 | 워크플로우 |
| 계층 | 피라미드, 트리 구조 | 조직도 |
| 타임라인 | 수평/수직 타임라인 | 프로젝트 마일스톤 |
| 통계 | 차트, 강조 숫자 | 핵심 지표 |
| 개념 | 아이콘, 은유, 일러스트 | 추상 아이디어 |

##### 2.2 아웃라인 생성 구조

```
| # | 유형 | 헤드라인 | 핵심 내용 | 시각 요소 | 레이아웃 |
|---|------|---------|----------|----------|---------|
| 1 | Cover | [훅 + 부제] | [핵심 메시지] | [강렬한 비주얼] | [중앙 배치] |
| 2 | Context | [왜 중요한가] | [배경/문제] | [아이콘/차트] | [좌우 분할] |
| 3-N | Content | [포인트별 메시지] | [핵심 3개] | [도표/일러스트] | [제목+내용] |
| N+1 | Closing | [CTA] | [요약] | [기억될 이미지] | [깔끔한 마무리] |
```

##### 2.3 발표 흐름 패턴

| 패턴 | 사용 상황 |
|------|----------|
| 문제 → 해결 | 새 제품/아이디어 소개 |
| 상황 → 복잡화 → 해결 | 복잡한 비즈니스 케이스 |
| What → Why → How | 교육 콘텐츠 |
| 과거 → 현재 → 미래 | 변혁 스토리 |
| 주장 → 근거 → 시사점 | 데이터 기반 발표 |

---

#### 3. 비주얼 스타일 가이드 (27개 스타일 요약)

##### 3.1 콘텐츠 신호별 자동 스타일 선택

| 콘텐츠 신호 | 자동 선택 스타일 |
|------------|----------------|
| tutorial, learn, education, guide | `sketch-notes` |
| architecture, system, data, technical | `blueprint` |
| investor, quarterly, business, corporate | `corporate` |
| launch, marketing, keynote, bold | `bold-editorial` |
| executive, minimal, clean, simple | `minimal` |
| saas, product, dashboard, metrics | `notion` |
| ai, ml, neural, cyber, futuristic | `dark-tech` |
| fintech, korean, toss, payment | `toss` |
| startup, disruptive, hip, edgy | `neo-brutalism` |
| premium, apple, luxury, refined | `clean-minimal` |
| Default | `blueprint` |

##### 3.2 주요 스타일 5개 상세

| 스타일 | 설명 | 색상 | 최적 상황 |
|--------|------|------|----------|
| **blueprint** | 기술 도면/그리드 | 네이비+화이트+시안 | 아키텍처, 시스템 설계 |
| **sketch-notes** | 손그림/따뜻한 느낌 | 크래프트+파스텔 | 교육, 튜토리얼 |
| **corporate** | 정제된 네이비/골드 | 네이비+골드+화이트 | 투자자 덱, 제안서 |
| **bold-editorial** | 매거진/강렬한 타이포 | 블랙+화이트+레드 | 제품 런칭, 키노트 |
| **minimal** | 울트라 클린/여백 | 화이트+블랙+1액센트 | 경영진 브리핑, 프리미엄 |

##### 3.3 7개 내러티브 모드

| 모드 | 설명 | 최적 상황 |
|------|------|----------|
| **one-more-thing** | Steve Jobs 스타일, 슬라이드당 1메시지 | 제품 런칭, 키노트 |
| **toss-direct** | 3 bullets 이내, 즉시 실행 가능 | 튜토리얼, 온보딩 |
| **kinfolk-serif** | 묵상적 스토리텔링, 감정 깊이 | 라이프스타일, 브랜드 |
| **bento-structure** | 4칸 모듈 (개념/데이터/아이디어/다음) | 리서치, 분석 |
| **brutalist-edge** | 도발적 직설, Bullshit-free | 스타트업 피치 |
| **magazine-cover** | 보그 커버 스타일, 글래머러스 | 럭셔리 브랜드 |
| **logic-tree** | McKinsey MECE 구조, 근거 기반 | B2B 제안서, 투자 덱 |

---

#### 4. 슬라이드 테마 프롬프팅 (6개 테마)

> 출처: Week-5 강의자료 (두부 @tofukyung)

같은 내용도 **어떤 세계관으로 포장하느냐**에 따라 전혀 다른 인상을 준다.

##### 4.1 6개 테마 공통 구조

| 구조 요소 | 공통 패턴 |
|----------|----------|
| **역할 부여** | 특정 전문가/페르소나 지정 (CD, 작가, 기획자, 에디터, 분석관) |
| **톤앤매너** | 각 테마에 맞는 고유한 분위기 설정 |
| **용어 변환** | 일반 비즈니스 용어 → 테마 세계관 용어로 치환 |
| **비주얼 묘사** | 텍스트와 함께 배치될 이미지 분위기를 콘티 형식으로 제시 |
| **텍스트 스타일** | 설명문 지양, 테마에 맞는 고유 문체 사용 |

##### 4.2 테마별 비교표

| 테마 | 핵심 키워드 | 말투/문체 | 구조 전개 | 감성 포인트 |
|------|-----------|----------|----------|-----------|
| **미니멀 인포그래픽** | 화이트, 3D 아이소메트릭 | 없음 (시각 중심) | 컬러/서체/배치 규칙 | 논리적, 정교함 |
| **칸 광고제 필름** | 애플+나이키+현대카드 | 시적 광고 카피 | 헤드라인→서브카피→미장센 | 영감, 소유욕 |
| **넷플릭스 다큐** | 미스터리, 긴박감 | 증언/내레이션 대사 | 일상→사건→진실→클라이맥스 | 충격, 소름 |
| **RPG 게임** | 퀘스트, 스킬, 보상 | NPC 대사체 | 위기→무기획득→레벨업 | 도전, 성취감 |
| **보그 매거진** | 럭셔리, 시크, 트렌디 | 에디터스 노트 | 커버 표제→짧은 감성 요약 | 세련됨, 핫함 |
| **정보국 분석관** | TOP SECRET, 검열됨 | 보고서 체계 | 작전명→타겟식별→실행프로토콜 | 기밀, 호기심 |

##### 4.3 테마 선택 가이드

| 목적 | 추천 테마 |
|------|----------|
| 데이터/기술 설명 | 미니멀 인포그래픽 |
| 브랜딩/감성 마케팅 | 칸 광고제 필름, 보그 에디터 |
| 문제→해결 스토리텔링 | 넷플릭스 다큐, 정보국 분석관 |
| 게이미피케이션/교육 | RPG 게임 |
| 긴장감/호기심 유발 | 넷플릭스 다큐, 정보국 분석관 |

---

#### 5. 원샷 슬라이드 프롬프트 구조

##### 5.1 텍스트 슬라이드 프롬프트

baoyu-slide-deck의 아웃라인-먼저 패턴을 원샷 프롬프트로 압축:

```markdown
당신은 프레젠테이션 디자이너이자 콘텐츠 전략가입니다.

#### 1단계: 콘텐츠 분석
아래 내용을 분석하여:
1. 핵심 메시지 1문장 도출 (15자 이내)
2. 지지 포인트 3-5개 우선순위화
3. CTA 정의 (청중이 해야 할 구체적 행동)

#### 2단계: 아웃라인 생성
다음 구조로 [N]장 슬라이드 아웃라인 작성:
- **커버**: 훅(주의 끌기) + 부제(핵심 약속)
- **컨텍스트**: 왜 지금 이것이 중요한가
- **본론 1-N**: 각 슬라이드에 아래 포함
  - 헤드라인: 내러티브 메시지 (라벨 아님)
  - 핵심 포인트 3개
  - 시각 요소 제안
  - 레이아웃 구성
- **클로징**: CTA + 기억될 메시지

#### 3단계: 스타일 지시
스타일: [선택된 스타일]
내러티브 모드: [선택된 모드]
청중: [대상 청중]

#### 출력 형식
| # | 유형 | 헤드라인 | 핵심 내용 | 시각 요소 | 레이아웃 |
테이블 형식으로 아웃라인 출력

---

[콘텐츠 입력]
```

##### 5.2 이미지 슬라이드 프롬프트 (JSON)

아웃라인 확정 후, 각 슬라이드별 이미지 생성 프롬프트:

```json
{
  "generation_instruction": "아래 slides 배열의 이미지들을 [1/N], [2/N] 형식으로 순차 생성해주세요.",
  "shared_style": {
    "art_style": "[스타일 설명]",
    "color_palette": "[색상 팔레트]",
    "typography": "[시각적 폰트 설명 - 폰트명 사용 금지]",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "slides": [
    {
      "sequence": 1,
      "type": "cover",
      "headline": "[메인 타이틀]",
      "prompt": "[완전한 이미지 생성 프롬프트 - 배경, 레이아웃, 텍스트 배치, 분위기 포함]"
    },
    {
      "sequence": 2,
      "type": "content",
      "headline": "[슬라이드 헤드라인]",
      "prompt": "[완전한 이미지 생성 프롬프트]"
    }
  ]
}
```

##### 5.3 STYLE_INSTRUCTIONS 블록 구조

```markdown
<STYLE_INSTRUCTIONS>
Design Aesthetic: [2-3문장 전체 비주얼 방향]

Background:
  Color: [이름] ([Hex])
  Texture: [설명]

Typography:
  Primary: [시각적 외형 설명 - 폰트명 사용 금지]
  Secondary: [시각적 외형 설명]

Color Palette:
  Primary Text: [이름] ([Hex]) - [용도]
  Background: [이름] ([Hex]) - [용도]
  Accent 1: [이름] ([Hex]) - [용도]
  Accent 2: [이름] ([Hex]) - [용도]

Visual Elements:
  - [요소 1 + 렌더링 가이드]
  - [요소 2 + 렌더링 가이드]

Style Rules:
  Do: [가이드라인]
  Don't: [안티패턴]
</STYLE_INSTRUCTIONS>
```

---

#### 6. 슬라이드 이미지 생성 규칙

##### 6.1 필수 규칙

| 규칙 | 설명 |
|------|------|
| **16:9 비율** | 슬라이드는 반드시 와이드스크린 |
| **shared_style** | 전체 덱에 일관된 스타일 적용 |
| **session_id** | 같은 세션 ID로 스타일 일관성 유지 |
| **폰트명 금지** | 시각적 외형으로 설명 ("둥근 산세리프", "굵은 기하학적 서체") |
| **텍스트 최소화** | 슬라이드당 1 메시지, 텍스트보다 비주얼 우선 |
| **자체 설명** | 각 슬라이드는 구두 설명 없이 이해 가능해야 함 |

##### 6.2 슬라이드 유형별 이미지 구성

| 유형 | 구성 | 텍스트 비중 |
|------|------|-----------|
| **Cover** | 강렬한 비주얼 + 큰 타이틀 | 20% |
| **Context** | 배경 일러스트 + 핵심 질문 | 30% |
| **Content** | 도표/차트/아이콘 + 핵심 포인트 | 40% |
| **Data** | 차트/그래프 + 강조 숫자 | 50% |
| **Closing** | 기억될 이미지 + CTA 텍스트 | 25% |

---

#### 7. NotebookLM PPT 생성 워크플로우

NotebookLM으로 빠르게 PPT를 생성할 경우:

##### 7.1 소스 업로드

1. NotebookLM에 소스 추가 (텍스트, PDF, 웹페이지)
2. 핵심 콘텐츠가 포함된 소스 선택
3. "발표자 슬라이드" 기능 활성화

##### 7.2 프롬프트 전략

```markdown
아래 소스를 기반으로 [N]장 슬라이드를 생성하세요.

- 청중: [대상]
- 목적: [목표]
- 톤: [분위기]
- 슬라이드당 핵심 포인트 3개 이내
- 커버 + 컨텍스트 + 본론 + 클로징 구조
```

##### 7.3 제한사항

- 비주얼 커스터마이징 제한적
- 스타일 선택 불가 (기본 디자인만)
- 복잡한 레이아웃 불가
- 이미지 생성 불가 (텍스트 기반만)

---

#### 8. 슬라이드 체크리스트

프레젠테이션 완성 전 점검:

```
□ 핵심 메시지: 1문장으로 요약 가능한가?
□ 슬라이드당 1메시지: 각 슬라이드가 하나의 포인트만 전달하는가?
□ 텍스트 최소화: 읽기가 아닌 보기에 최적화되었는가?
□ 일관된 스타일: shared_style이 전체 덱에 적용되었는가?
□ CTA 포함: 청중이 무엇을 해야 하는지 명확한가?
□ 자체 설명: 구두 설명 없이 이해 가능한가? (공유/읽기용)
□ 흐름: 슬라이드 간 논리적 연결이 있는가?
□ 비주얼 우선순위: Must Visualize 항목이 시각화되었는가?
```

---

#### 9. 설계 철학

이 가이드의 슬라이드 덱은 **"읽기와 공유"**를 위해 설계된다:

- 각 슬라이드는 **구두 설명 없이 자체 완결**되어야 한다
- 콘텐츠는 **스크롤 시 논리적 흐름**을 위해 구성한다
- 각 슬라이드에 **필요한 모든 맥락**을 포함한다
- **SNS 공유와 오프라인 읽기**에 최적화한다

---

---

### Context engineering principles

### Agent Skills for Context Engineering

This collection provides structured guidance for building production-grade AI agent systems through effective context engineering.

#### When to Activate

Activate these skills when:
- Building new agent systems from scratch
- Optimizing existing agent performance
- Debugging context-related failures
- Designing multi-agent architectures
- Creating or evaluating tools for agents
- Implementing memory and persistence layers

#### Skill Map

##### Foundational Context Engineering

**Understanding Context Fundamentals**
Context is not just prompt text—it is the complete state available to the language model at inference time, including system instructions, tool definitions, retrieved documents, message history, and tool outputs. Effective context engineering means understanding what information truly matters for the task at hand and curating that information for maximum signal-to-noise ratio.

**Recognizing Context Degradation**
Language models exhibit predictable degradation patterns as context grows: the "lost-in-middle" phenomenon where information in the center of context receives less attention; U-shaped attention curves that prioritize beginning and end; context poisoning when errors compound; and context distraction when irrelevant information overwhelms relevant content.

##### Architectural Patterns

**Multi-Agent Coordination**
Production multi-agent systems converge on three dominant patterns: supervisor/orchestrator architectures with centralized control, peer-to-peer swarm architectures for flexible handoffs, and hierarchical structures for complex task decomposition. The critical insight is that sub-agents exist primarily to isolate context rather than to simulate organizational roles.

**Memory System Design**
Memory architectures range from simple scratchpads to sophisticated temporal knowledge graphs. Vector RAG provides semantic retrieval but loses relationship information. Knowledge graphs preserve structure but require more engineering investment. The file-system-as-memory pattern enables just-in-time context loading without stuffing context windows.

**Tool Design Principles**
Tools are contracts between deterministic systems and non-deterministic agents. Effective tool design follows the consolidation principle (prefer single comprehensive tools over multiple narrow ones), returns contextual information in errors, supports response format options for token efficiency, and uses clear namespacing.

##### Operational Excellence

**Context Compression**
When agent sessions exhaust memory, compression becomes mandatory. The correct optimization target is tokens-per-task, not tokens-per-request. Structured summarization with explicit sections for files, decisions, and next steps preserves more useful information than aggressive compression. Artifact trail integrity remains the weakest dimension across all compression methods.

**Context Optimization**
Techniques include compaction (summarizing context near limits), observation masking (replacing verbose tool outputs with references), prefix caching (reusing KV blocks across requests), and strategic context partitioning (splitting work across sub-agents with isolated contexts).

**Evaluation Frameworks**
Production agent evaluation requires multi-dimensional rubrics covering factual accuracy, completeness, tool efficiency, and process quality. Effective patterns include LLM-as-judge for scalability, human evaluation for edge cases, and end-state evaluation for agents that mutate persistent state.

##### Development Methodology

**Project Development**
Effective LLM project development begins with task-model fit analysis: validating through manual prototyping that a task is well-suited for LLM processing before building automation. Production pipelines follow staged, idempotent architectures (acquire, prepare, process, parse, render) with file system state management for debugging and caching. Structured output design with explicit format specifications enables reliable parsing. Start with minimal architecture and add complexity only when proven necessary.

#### Core Concepts

The collection is organized around three core themes. First, context fundamentals establish what context is, how attention mechanisms work, and why context quality matters more than quantity. Second, architectural patterns cover the structures and coordination mechanisms that enable effective agent systems. Third, operational excellence addresses the ongoing work of optimizing and evaluating production systems.

#### Practical Guidance

Each skill can be used independently or in combination. Start with fundamentals to establish context management mental models. Branch into architectural patterns based on your system requirements. Reference operational skills when optimizing production systems.

The skills are platform-agnostic and work with Claude Code, Cursor, or any agent framework that supports custom instructions or skill-like constructs.

#### Integration

This collection integrates with itself—skills reference each other and build on shared concepts. The fundamentals skill provides context for all other skills. Architectural skills (multi-agent, memory, tools) can be combined for complex systems. Operational skills (optimization, evaluation) apply to any system built using the foundational and architectural skills.

#### References

Internal skills in this collection:
- [context-fundamentals](skills/context-fundamentals/SKILL.md)
- [context-degradation](skills/context-degradation/SKILL.md)
- [context-compression](skills/context-compression/SKILL.md)
- [multi-agent-patterns](skills/multi-agent-patterns/SKILL.md)
- [memory-systems](skills/memory-systems/SKILL.md)
- [tool-design](skills/tool-design/SKILL.md)
- [context-optimization](skills/context-optimization/SKILL.md)
- [evaluation](skills/evaluation/SKILL.md)
- [project-development](skills/project-development/SKILL.md)

External resources on context engineering:
- Research on attention mechanisms and context window limitations
- Production experience from leading AI labs on agent system design
- Framework documentation for LangGraph, AutoGen, and CrewAI

---

---

## Skill Metadata

**Created**: 2025-12-27  
**Last Updated**: 2026-05-12  
**Author**: Claude Code / Codex  
**Version**: 3.0.0  
**Status**: Single canonical prompt engineering skill

**Changes v3.0.0** (2026-05-12):
- **[MAJOR] 단일 스킬화**: 프롬프트 엔지니어링 계열 분리 스킬 8개를 이 파일의 통합 부록으로 병합하고, `skills/`에는 이 파일 하나만 남김.
- **[MAJOR] GPTs/Gems 업로드 단순화**: 지식 파일 업로드 대상을 9개에서 1개로 축소.
- **[MAJOR] 명령/지침 참조 정리**: `/prompt`, `/prompt-sync`, GPTs/Gems instructions의 스킬 참조를 단일 파일 기준으로 업데이트.
- **[MEDIUM] 운영 규칙 추가**: 새 모델이나 워크플로우는 새 스킬 파일 생성 대신 이 파일의 섹션으로 병합.
