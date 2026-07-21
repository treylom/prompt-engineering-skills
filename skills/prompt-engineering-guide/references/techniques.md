# 프롬프팅 기법 상세 레퍼런스

모델별 XML 블록, 패턴, 에이전틱 워크플로우 패턴 상세 가이드.

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

> **Claude 4.5/4.6 XML 구조 상세**: `claude-4.7-prompt-strategies.md` 스킬의 Part 12 참조 (현행 모델 전략은 `claude-fable-5-prompt-strategies.md`)
> **GPT-5.4 에이전틱 패턴 상세**: `gpt-5.5-prompt-enhancement.md` 스킬 참조

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
| `expert-domain-priming.md` | 전문가 DB (12도메인, 60+명) + 프라이밍 가이드 | 전문가 활용 시 |
| `slide-prompt-guide.md` | 슬라이드/PPT 프롬프트 가이드 | 슬라이드 제작 시 |

---

## GPT-5.2 프롬프팅 가이드

GPT-5.2는 엔터프라이즈 및 에이전트 워크로드를 위한 최신 플래그십 모델입니다.

### 핵심 행동 차이점 (vs GPT-5/5.1)

| 특성 | 설명 |
|------|------|
| **더 신중한 스캐폴딩** | 기본적으로 더 명확한 계획과 중간 구조 생성 |
| **일반적으로 낮은 장황함** | 더 간결하고 작업 중심적 |
| **강화된 지시 준수** | 사용자 의도에서 덜 벗어남 |
| **도구 효율성 트레이드오프** | GPT-5.1 대비 추가 도구 액션 수행 가능 |
| **보수적 그라운딩 편향** | 정확성과 명시적 추론 선호 |

### 필수 XML 블록

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

### 1. 장황함 및 출력 형태 제어 (필수)

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

### 2. 스코프 드리프트 방지 (프론트엔드/UX 작업)

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

### 3. 롱컨텍스트 및 리콜 (10k+ 토큰)

```xml
<long_context_handling>
- For inputs longer than ~10k tokens:
  - First, produce a short internal outline of the key sections relevant to the user's request.
  - Re-state the user's constraints explicitly before answering.
  - In your answer, anchor claims to sections ("In the 'Data Retention' section…").
  - If the answer depends on fine details, quote or paraphrase them.
</long_context_handling>
```

### 4. 모호성 및 환각 위험 처리

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

### 5. 에이전트 조종 가능성 및 사용자 업데이트

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

### 6. 도구 호출 및 병렬 처리

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

### 7. 구조화된 추출 (PDF, Office)

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

### 8. 웹 검색 및 리서치

```xml
<web_search_rules>
- Act as an expert research assistant; default to comprehensive, well-structured answers.
- Prefer web research over assumptions whenever facts may be uncertain.
- Research all parts of the query, resolve contradictions, and follow second-order implications.
- Do not ask clarifying questions; instead cover all plausible user intents.
- Write clearly using Markdown; define acronyms, use concrete examples, conversational tone.
</web_search_rules>
```

### Reasoning Effort 설정

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

### Compaction (확장된 유효 컨텍스트)

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

### 마이그레이션 가이드 (5단계)

1. **Step 1**: 모델만 전환, 프롬프트 변경 없음
2. **Step 2**: reasoning_effort 명시적 설정
3. **Step 3**: 평가 실행으로 베이스라인 확보
4. **Step 4**: 회귀 발생 시 프롬프트 튜닝
5. **Step 5**: 작은 변경 후 재평가 반복

### 기본 템플릿 (통합)

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

## GPT-5.2-Codex 프롬프팅 가이드

GPT-5.2-Codex는 복잡한 현실 세계 소프트웨어 엔지니어링을 위한 **가장 발전된 에이전트형 코딩 모델**입니다.

> **중요:** 이 모델은 GPT-5.2의 drop-in 대체가 아닙니다. **현저히 다른 프롬프팅**이 필요합니다.

### GPT-5.2-Codex 특징 표

| 특징 | 설명 |
|------|------|
| **컨텍스트 압축** | 장시간 작업에서 안정적 성능 (네이티브 컴팩션) |
| **대규모 코드 변경** | 리팩터링, 마이그레이션 강화 |
| **Windows 환경** | 네이티브 Windows에서 에이전트 코딩 개선 |
| **사이버보안** | 가장 강력한 방어적 사이버보안 역량 |
| **토큰 효율성** | 추론 과정 전반에서 토큰 효율적 |

### 벤치마크 성능

- **SWE-Bench Pro**: 최고 수준 달성
- **Terminal-Bench 2.0**: 실제 터미널 환경 작업 최고 성능

### 핵심 프롬프팅 원칙: "Less is More"

많은 best practice가 이미 훈련에 내장되어 있어 **과도한 프롬프팅이 오히려 품질 저하**를 유발합니다.

**핵심 원칙 4가지:**
1. **최소한의 프롬프트로 시작** - Codex CLI 시스템 프롬프트에서 영감을 받아 필수 가이드만 추가
2. **프리앰블 요청 금지** - 프리앰블을 요청하면 조기 종료 발생
3. **도구 최소화** - terminal tool + apply_patch만 사용
4. **도구 설명 간결화** - 불필요한 세부사항 제거

### Anti-Prompting: 제거해야 할 것들

#### 1. Adaptive Reasoning (자동 조절)
과거에는 "더 열심히 생각해" 또는 "빨리 응답해"를 프롬프팅했지만, **GPT-5-Codex는 자동 조절**:
- 간단한 질문 → 빠른 응답
- 복잡한 코딩 작업 → 필요한 시간 사용 + 적절한 도구 활용

#### 2. Planning (자동 생성)
**Planning 섹션 불필요** - 모델이 고품질 계획을 자동 생성하도록 훈련됨.

#### 3. Preambles (서문 금지 이유)
**GPT-5-Codex는 프리앰블을 출력하지 않습니다!**
- 프리앰블 요청 시 조기 종료 발생
- 대신 커스텀 summarizer가 적절한 시점에 상세 요약 제공

### Codex CLI 시스템 프롬프트 (참조 구현)

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

### Apply Patch 도구

파일 편집에는 `apply_patch` 사용 권장 - 훈련 분포와 일치합니다.

참조: [apply_patch 구현](https://github.com/openai/openai-cookbook/tree/main/examples/gpt-5/apply_patch.py)

### 샌드박싱 모드 (Filesystem Sandboxing)

| 모드 | 설명 |
|------|------|
| `read-only` | 파일 읽기만 허용 |
| `workspace-write` | cwd 및 writable_roots에서 편집 허용 |
| `danger-full-access` | 모든 명령 허용 |

### 승인 정책 (Approval Policy)

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

### 사이버보안 역량

GPT-5.2-Codex는 OpenAI 모델 중 **가장 강력한 사이버보안 역량** 보유:

- Professional CTF 평가에서 뛰어난 성능
- 실제 취약점 발견 사례: React 서버 컴포넌트 취약점 (CVE-2025-55183)
- 방어적 보안 연구에 활용 가능

**신뢰 기반 접근 프로그램:**
- 초대 방식 파일럿 프로그램
- 대상: 책임 있는 취약점 공개 이력이 있는 보안 전문가
- 방어 목적의 정당한 보안 작업을 위한 최첨단 모델 접근 제공

### 프론트엔드 가이던스 (선택적)

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

### 기본 템플릿

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

### Best Practices 요약

- 기존 코드 패턴 따르기
- 타입 힌트 포함
- 테스트 가능한 코드 작성
- 에러 처리는 필요한 경우에만
- **과도한 프롬프팅 피하기** - 모델이 이미 학습함

---

## Claude 4.5 (Opus/Sonnet/Haiku) 프롬프팅 가이드

Claude 4.5 모델군은 **정밀한 지시 따르기**를 위해 훈련되었습니다. 이전 세대보다 더 명시적인 방향 제시가 필요합니다.

### 모델 개요

| 모델 | 특징 | 컨텍스트 | 가격 (Input/Output) |
|------|------|----------|---------------------|
| **Opus 4.5** | 최고 지능, effort 파라미터 지원 | 200K | $5/$25 per 1M |
| **Sonnet 4.5** | 최고 코딩/에이전트 모델 | 200K, 1M (beta) | $3/$15 per 1M |
| **Haiku 4.5** | 준-프론티어 속도, 최초 Haiku thinking | 200K | $1/$5 per 1M |

### 커뮤니케이션 스타일

Claude 4.5는 이전 모델보다 간결하고 자연스러운 커뮤니케이션 스타일:

| 특성 | 설명 |
|------|------|
| **더 직접적** | 사실 기반 진행 보고, 자축적 업데이트 없음 |
| **더 대화적** | 기계적이지 않고 자연스러운 톤 |
| **덜 장황함** | 효율성을 위해 상세 요약 생략 가능 |

### 일반 원칙

#### 1. 명시적 지시 제공

Claude 4.x는 명확하고 명시적인 지시에 잘 반응합니다. 이전 모델의 "above and beyond" 행동을 원한다면 명시적으로 요청해야 합니다.

```
❌ "Create an analytics dashboard"
✅ "Create an analytics dashboard. Include as many relevant features
   and interactions as possible. Go beyond the basics to create a
   fully-featured implementation."
```

#### 2. 맥락으로 성능 향상

왜 그러한 행동이 중요한지 설명하면 더 나은 결과를 얻습니다.

```
Instead of: "Use plain text formatting"
Try: "Use plain text formatting because markdown renders poorly in
     our legacy terminal system. This ensures readability for all users."
```

#### 3. 예시와 세부사항에 주의

Claude 4.x는 예시에 매우 주의를 기울입니다. 예시가 원하는 행동과 일치하는지 확인하세요.

### 도구 사용 패턴

#### 명시적 행동 요청

"can you suggest some changes"라고 하면 변경 대신 제안만 할 수 있습니다.

```
❌ "Can you suggest some changes to improve performance?"
✅ "Analyze the code and implement performance improvements.
   Make the changes directly."
```

#### 기본 행동 설정

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

#### 도구 트리거링 조절

Opus 4.5는 시스템 프롬프트에 더 민감합니다. 과거에 언더트리거링 방지를 위해 강한 언어를 사용했다면 오버트리거링이 발생할 수 있습니다.

```
❌ "CRITICAL: You MUST use this tool when..."
✅ "Use this tool when..."
```

### 출력 포맷 제어

#### 효과적인 방법들

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

#### 마크다운 최소화 상세 프롬프트

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

### 장기 추론 및 상태 추적

Claude 4.5는 **뛰어난 상태 추적 능력**으로 장기 추론에 탁월합니다.

#### Context Awareness (토큰 예산 추적)

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

#### Multi-Context Window 워크플로 5단계

1. **첫 컨텍스트 창에서 프레임워크 설정** - 테스트 작성, 셋업 스크립트 생성
2. **구조화된 형식으로 테스트 추적** - "It is unacceptable to remove or edit tests"
3. **QoL 도구 설정** - `init.sh` 같은 셋업 스크립트로 서버, 테스트, 린터 실행
4. **새로운 컨텍스트 시작 시** - pwd, progress.txt, tests.json, git logs 확인
5. **컨텍스트 전체 활용 독려** - 긴 작업임을 명시하고 전체 출력 컨텍스트 활용

#### 상태 관리 Best Practices

| 방법 | 용도 |
|------|------|
| **JSON 등 구조화 형식** | 테스트 결과, 작업 상태 등 |
| **비구조화 텍스트** | 일반 진행 노트 |
| **Git** | 완료 작업 로그 및 복원 가능한 체크포인트 |
| **점진적 진행 강조** | 진행 상황 추적 및 점진적 작업 집중 |

### Extended Thinking & Adaptive Thinking

#### Extended Thinking (4.5)

**Sonnet 4.5와 Haiku 4.5**는 extended thinking 활성화 시 코딩/추론 작업에서 **현저히 향상**됩니다.

기본적으로 비활성화되어 있지만, 복잡한 작업에서는 활성화 권장:
- 복잡한 문제 해결
- 코딩 작업
- 멀티스텝 추론

> **Deprecated**: `budget_tokens`는 4.6에서 deprecated. Adaptive Thinking으로 대체.

#### Adaptive Thinking (4.6 신규)

Claude 4.6에서는 모델이 **자율적으로 사고 깊이를 결정**합니다:
- `thinking: {type: "adaptive"}` — 작업 복잡도에 따라 자동 조절
- `output_config: {effort: "low"|"medium"|"high"|"max"}` — 응답 상세도 제어

#### Prefill 제거 (4.6 Breaking Change)

Claude 4.6에서는 마지막 assistant turn 프리필이 **400 에러**를 발생시킵니다.
- JSON 강제 → Structured Outputs (`output_config.format`) 사용
- 서문 생략 → 시스템 프롬프트에 직접 지시
- 이어쓰기 → user turn에 "이전 응답에 이어서 계속" 지시

#### Over-prompting 경고 (4.6)

Claude 4.6은 시스템 프롬프트에 더 민감합니다. `CRITICAL`, `MUST`, `NEVER` 등의 남발은 오버트리거링을 유발합니다.
- 평이한 언어로 변경
- 동일 규칙 반복 서술 → 한 번만 명확하게
- **간결하고 명확한 지시**가 길고 강조된 지시보다 효과적

#### Thinking Sensitivity (Opus 4.5)

Extended thinking 비활성화 시, Opus 4.5는 "think" 단어에 특히 민감합니다.

```
❌ "think about this problem"
✅ "consider this problem" / "evaluate this approach" / "believe"
```

#### Interleaved Thinking 활용

도구 사용 후 반성이 필요한 작업에 효과적. **Opus 4.6에서는 자동 활성화** (beta 헤더 불필요).

```
After receiving tool results, carefully reflect on their quality
and determine optimal next steps before proceeding. Use your thinking
to plan and iterate based on this new information.
```

### 병렬 도구 호출 최적화

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

### 에이전트 코딩 시 주의사항

#### 과잉 엔지니어링 방지 (특히 Opus 4.5)

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

#### 코드 탐색 독려

```xml
<investigate_before_answering>
Never speculate about code you have not opened.
If the user references a specific file, you MUST read the file before answering.
Make sure to investigate and read relevant files BEFORE answering.
Never make any claims about code before investigating unless certain.
</investigate_before_answering>
```

#### 환각 최소화

```xml
ALWAYS read and understand relevant files before proposing code edits.
Do not speculate about code you have not inspected.

If the user references a specific file/path, you MUST open and inspect
it before explaining or proposing fixes.

Be rigorous and persistent in searching code for key facts.
```

#### 하드코딩 및 테스트 집중 방지

```xml
Please write a high-quality, general-purpose solution using standard tools.
Do not create helper scripts or workarounds.

Implement a solution that works correctly for all valid inputs,
not just the test cases. Do not hard-code values.

Tests are there to verify correctness, not to define the solution.
```

### 프론트엔드 디자인 (Opus 4.5)

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

### 새로운 API 기능 (Beta)

| 기능 | 설명 |
|------|------|
| **Programmatic Tool Calling** | 도구를 코드 실행 컨테이너 내에서 프로그래매틱하게 호출. 레이턴시 감소, 토큰 효율성 향상 |
| **Tool Search Tool** | 수백, 수천 개의 도구를 동적으로 검색하고 로드. 10-20K 토큰 절약 |
| **Effort Parameter** | Opus 4.5 전용. low/medium/high로 응답 상세도 제어 |
| **Memory Tool** | 컨텍스트 창 외부에 정보 저장 및 검색. 세션 간 상태 유지 |
| **Context Editing** | 자동 도구 호출 정리로 지능적 컨텍스트 관리 |

### 기본 템플릿 (Markdown)

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

### 기본 템플릿 (XML)

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

### 주의사항 요약

- Claude는 추론하지 않음 - 모든 것을 명시
- "당연히 알겠지"라는 가정 금지
- 원하는 행동을 구체적으로 서술
- CRITICAL 등 강한 언어 사용 주의 (오버트리거링)
- "think" 단어 대신 "consider", "evaluate" 사용 (Opus 4.5)

---

## Gemini 3 프롬프팅 가이드

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
