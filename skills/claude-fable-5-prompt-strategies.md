# Claude Fable 5 · Opus 4.8 · Sonnet 5 프롬프트 전략

> **Version**: 1.2.1 | **Updated**: 2026-07-17 (§5.2 정정: Sonnet 5는 `budget_tokens` 제거됨 — 400 경고 추가, 구 해결책을 [Sonnet 4.5/Haiku 4.5 이하 전용]으로 재분류, Sonnet 5+ 정답 규칙(adaptive+effort) 신설, `effort`/`thinking` 축 혼동 정정. 이전: 1.2.0 · 2026-07-05.)
> **Source**: Anthropic 공식 문서 및 실전 벤치마크
> **Covers**: **Claude Fable 5 / Mythos 5** (최신), **Opus 4.8**, **Sonnet 5** (최신). 4.7 이하 모델군은 `claude-4.7-prompt-strategies.md` 참조 (first-class 유지 — 마이그레이션 강요 금지).

핵심 철학 전환: 두 모델 모두 **지시 따르기가 강해져서 "열거형 장문 프롬프트"가 역효과**. 짧고 정확한 지시 1개 > 행동 나열 10개. 이전 모델용 과잉 처방 스킬·프롬프트는 **다이어트가 마이그레이션의 본체**.

---

## Part 1: 모델 선택 빠른 결정

| 상황 | 선택 |
|------|------|
| 가장 어려운 미해결 문제, 며칠 단위 자율 run, 병렬 서브에이전트 오케스트레이션 | **Fable 5** |
| 검증된 파이프라인·예측 가능한 동작·코드리뷰 하네스 | **Opus 4.8** (또는 Fable 5 fallback 대상) |
| Fable 5 refusal(공격적 보안·생물과학·reasoning 추출) 대비 | Opus 4.8 server/client-side fallback 구성 |

## Part 2: Opus 4.8 핵심 패턴

- **effort가 최우선 레버** — 코딩·agentic = `xhigh` 시작, 지능 민감 최소 `high`, `max`는 overthinking 테스트 후. 얕은 추론 = 프롬프트 우회 말고 effort ↑. `max_tokens` 64k부터.
- **thinking 기본 off** — `thinking: {type: "adaptive"}` 명시 필요.
- **verbosity 자동 조정** — 고정 길이 의존 제품은 재튜닝. 부정 지시보다 긍정 예시.
- **도구 사용 보수적** (reasoning 선호) — 도구 더 쓰게 하려면 effort ↑ + 언제/왜/어떻게 명시.
- **literal 해석** — silent 일반화 없음: "Apply this formatting to **every** section, not just the first one."
- **서브에이전트 보수적** — 스폰 기준을 명시적으로 제시.
- **진행 보고 자체 개선** — "N tool call마다 요약" 강제 스캐폴딩 제거 시도.
- **디자인 기본값 고정** (크림 배경·세리프·테라코타) — 일반 금지 지시 무효. ① 구체 스펙(hex·타이포·radius) 명시 또는 ② "빌드 전 4개 시각 방향 제안 → 선택" 패턴.
- **코드리뷰 recall 하락 = 하네스 효과** — "high-severity만" 류 옛 지시를 더 충실히 따름. coverage 단계와 filter 단계 분리:

```text
Report every issue you find, including ones you are uncertain about or consider
low-severity. Do not filter for importance or confidence at this stage - a separate
verification step will do that. For each finding, include your confidence level and an
estimated severity so a downstream filter can rank them.
```

- **computer use**: 최대 2576px/3.75MP — 1080p 전송이 성능·비용 균형(공식), 비용 민감 = 720p.

## Part 3: Fable 5 핵심 패턴

### 3.1 더 긴 turn이 기본값
단일 요청 수 분~자율 run 수 시간. 클라이언트 timeout·스트리밍·진행 표시 선조정, blocking 대신 비동기 점검. 과잉 계획 방지:

```text
When you have enough information to act, act. Do not re-derive facts already established
in the conversation, re-litigate a decision the user has already made, or narrate
options you will not pursue. If you are weighing a choice, give a recommendation, not an
exhaustive survey.
```

### 3.2 effort 전 레벨 활용
`high` 기본 / `xhigh` 능력 민감 / Fable 5의 `medium·low`가 이전 모델 `xhigh`를 종종 능가. 높은 effort의 미요청 정리·리팩토링 방지:

```text
Don't add features, refactor, or introduce abstractions beyond what the task requires.
Do the simplest thing that works well. Only validate at system boundaries (user input,
external APIs).
```

### 3.3 짧은 지시 1개로 steering
간결성·체크포인트 모두 행동 열거 불필요:

```text
Lead with the outcome. Your first sentence after finishing should answer "what happened"
or "what did you find". Being readable and being concise are different things, and
readability matters more.
```

```text
Pause for the user only when the work genuinely requires them: a destructive or
irreversible action, a real scope change, or input that only they can provide.
```

### 3.4 장기 run 진행 주장 grounding (fabrication 거의 제거 — 공식 테스트)

```text
Before reporting progress, audit each claim against a tool result from this session.
Only report work you can point to evidence for; if something is not yet verified, say so
explicitly. Report outcomes faithfully: if tests fail, say so with the output.
```

### 3.5 경계 명시 (미요청 행동 차단)

```text
When the user is describing a problem, asking a question, or thinking out loud rather
than requesting a change, the deliverable is your assessment. Report your findings and
stop. Don't apply a fix until they ask for one.
```

### 3.6 병렬 서브에이전트 + 메모리
- 서브에이전트: 적극 dispatch 됨. orchestrator↔서브에이전트 비동기 통신, 장수명 서브에이전트(컨텍스트 유지) 선호.
- 메모리: md 파일이면 충분 — "Store one lesson per file with a one-line summary at the top… update an existing note rather than creating a duplicate."

### 3.7 autonomous 파이프라인 system reminder (드문 조기 종료 대응)

```text
You are operating autonomously. The user is not watching in real time and cannot answer
questions mid-task. For reversible actions that follow from the original request,
proceed without asking. Before ending your turn, check your last paragraph. If it is a
plan, an analysis, a question, or a promise about work you have not done, do that work
now with tool calls. End your turn only when the task is complete or you are blocked on
input only the user can provide.
```

### 3.8 컨텍스트 카운트다운 노출 금지
잔여 토큰 표시가 새 세션 제안·자기 작업 축소 유발. 숨기거나:

```text
You have ample context remaining. Do not stop, summarize, or suggest a new session on
account of context limits. Continue the work.
```

### 3.9 이유를 함께 제공

```text
I'm working on [the larger task] for [who it's for]. They need [what the output
enables]. With that in mind: [request].
```

### 3.10 send-to-user 도구 (장기 비동기 에이전트)
turn 종료 없이 verbatim 메시지 전달용 클라이언트 도구 — tool input은 요약되지 않음:

```json
{
  "name": "send_to_user",
  "description": "Display a message directly to the user. Use this for progress updates, partial results, or content the user must see exactly as written before the task finishes.",
  "input_schema": {
    "type": "object",
    "properties": {
      "message": {"type": "string", "description": "The content to display to the user."}
    },
    "required": ["message"]
  }
}
```

### 3.11 장기 세션 최종 요약 = 가독성 애든덤 (공식 신규 확인 2026-07-05)
도구 호출 사이 축약은 OK(사고 중), **최종 요약은 별개 독자용** — 작업 중 만든 은어·화살표 체인·자작 라벨 버리고 완전한 문장으로:

```text
When you write the summary at the end, drop the working shorthand. Write complete
sentences. Spell out terms. Don't use arrow chains, hyphen-stacked compounds, or labels
you made up earlier. Open with the outcome: one sentence on what happened or what you
found. If you have to choose between short and clear, choose clear.
```

### 3.12 인터랙티브 코딩 = 첫 턴 완전 명세 (Opus 4.8 문서 신규 확인 2026-07-05)
인터랙티브(다중 user turn) 코딩은 user turn마다 재추론해 토큰↑. **과업·의도·제약을 첫 턴에 완전 명세** + auto 모드 등으로 개입 최소화가 성능·토큰 모두 최적 — 모호한 지시를 여러 턴에 걸쳐 흘리면 효율·성능 동반 하락. (우리 orchestration §5 "dispatch 첫 메시지 HOW 완전명시"와 동일 원리 — 공식 확증.)

## Part 4: Fable 5 마이그레이션 체크리스트

1. **난이도 상단부터 테스트** — 쉬운 작업만 돌리면 능력 범위를 과소평가
2. **fresh-context verifier 서브에이전트** > self-critique — "Establish a method for checking your own work at an interval of [X]"
3. **기존 스킬·프롬프트 다이어트** — 이전 모델용 과잉 처방이 품질 저하. 기본 성능 더 좋으면 옛 지시 제거
4. **🚨 reasoning 재출력 지시 제거** — "추론을 응답에 옮겨라" 류 = `reasoning_extraction` refusal → adaptive thinking의 `thinking` 블록으로 대체
5. **API**: adaptive thinking 전용·thinking 출력 summarized-only·extended thinking budget 없음·`refusal` stop reason 핸들링

## Part 5: Sonnet 5 특화 대응 및 API 400 에러 방지

### 5.1 Tokenizer 변경으로 인한 토큰 소모 관리
- **토큰 카운트 +30% 증가**: 신규 tokenizer 도입으로 동일 한글/코드 텍스트 대비 토큰 수 약 30% 증가.
- **맥락 범위(state space) 관리**: sliding window 또는 system prompt 설계 시 기존 대비 30% 더 보수적으로 토큰 버짓을 산정할 것. rate limit(TPM) 도달 속도가 빨라지므로 불필요한 장문 템플릿의 다이어트가 필수적임.

### 5.2 effort 설정 및 budget_tokens 400 Bad Request 방지
- **`effort` 파라미터**: 기본값 `high`(미설정 시). `low`/`medium`/`high`/`xhigh`/`max` 지원 — 얕은 추론은 `low`/`medium`, 복잡 코드·agentic 작업은 `xhigh` 권장. ⚠️ `effort`(사고 깊이·출력량 제어)와 `thinking: {type: "adaptive"}`(사고 모드 on/off)는 **별개 축**이다 — "기본값이 adaptive"는 두 축을 혼동한 표현. Sonnet 5는 `thinking`을 생략하면 adaptive가 기본으로 켜지고, `effort` 기본값은 별개로 항상 `high`.
> **🚨 경고 — Sonnet 5는 `budget_tokens`를 완전히 제거했다.**
> `thinking: {type: "enabled", budget_tokens: N}`는 Sonnet 5 / Opus 4.7·4.8 / Fable 5에서 **그 자체로 400을 반환**한다.
> 아래 "budget_tokens 400 에러 조건"과 그 해결책(budget < max_tokens, 최소 1024 등)은 **Sonnet 4.5 / Haiku 4.5 이하 전용** 규칙이며, Sonnet 5에 적용하면 회피는커녕 400을 유발한다.
> Sonnet 5에서의 올바른 "400 방지"는 값 조정이 아니라 **`budget_tokens`를 아예 보내지 않는 것**이다.
> (근거: Anthropic `claude-api` migration「Migrating to Claude Sonnet 5」— Sonnet 4.6 transitional escape hatch 제거됨.)

- **✅ Sonnet 5+ 정답 규칙 (Sonnet 5 / Opus 4.7·4.8 / Fable 5)**: `budget_tokens` **금지**. 사고 깊이는 `thinking: {type: "adaptive"}` + `output_config: {effort: "low|medium|high|xhigh|max"}`로 제어. thinking을 끄려면 `{type: "disabled"}` — **단 Fable 5는 disabled도 400**이므로 `thinking` 파라미터 자체를 생략한다.

- **[Sonnet 4.5 / Haiku 4.5 이하 전용] `budget_tokens` 400 에러 조건**:
  - `thinking` 모드가 `enabled`인데 `budget_tokens`가 너무 작게 설정된 경우(Anthropic 스펙상 최소 1024 토큰 권장).
  - `budget_tokens`가 전체 `max_tokens`보다 크거나 같게 설정된 경우 (반드시 `budget_tokens < max_tokens` 유지).
  - API 호출 시 `thinking` 파라미터가 비활성화 상태인데 `budget_tokens` 필드만 단독으로 넘어간 경우.
  - 해결책 (4.5/Haiku 이하 한정): API 호출 단에서 `budget_tokens`는 반드시 `max_tokens - 1024` 이하로 여유 공간을 두고 설정하며, thinking 타입이 `enabled`일 때만 budget을 실어서 보낼 것.

### 5.3 이미지 및 멀티모달(Multi-modal Native) 규율
- 텍스트·이미지·PDF를 단일 representation space로 처리하므로 과도한 OCR 지시나 시각 가이드는 지양하고, 다이어그램 시각화(Mermaid 등) 시 괄호/특수문자에 반드시 쌍따옴표를 적용하고 HTML 태그를 배제하여 파싱 에러를 예방할 것.

## Part 6: 공통 XML 블록 (4.7 가이드 계승, 세 모델 유효)

```xml
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel.
</use_parallel_tool_calls>

<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering.
</investigate_before_answering>
```
