# Claude Opus 5 · Fable 5 · Opus 4.8 · Sonnet 5 프롬프트 전략

> **Version**: 1.3.0 | **Updated**: 2026-07-28 (Part 2.5 Opus 5 신설 — **Claude 디폴트 = Opus 5**. breaking 2건·검증지시 제거·서브에이전트 억제·미지원 회귀 2건. 공식 3문서 대조.) | 이전: 1.2.1 · 2026-07-17 (§5.2 정정: Sonnet 5는 `budget_tokens` 제거됨 — 400 경고 추가, 구 해결책을 [Sonnet 4.5/Haiku 4.5 이하 전용]으로 재분류, Sonnet 5+ 정답 규칙(adaptive+effort) 신설, `effort`/`thinking` 축 혼동 정정. 이전: 1.2.0 · 2026-07-05.)
> **Source**: Anthropic 공식 문서 및 실전 벤치마크
> **Covers**: **Claude Opus 5** (**현행 디폴트**, 2026-07-28~), **Fable 5 / Mythos 5**, **Opus 4.8**, **Sonnet 5**. 4.7 이하 모델군은 `claude-4.7-prompt-strategies.md` 참조 (first-class 유지 — 마이그레이션 강요 금지).

핵심 철학 전환: 두 모델 모두 **지시 따르기가 강해져서 "열거형 장문 프롬프트"가 역효과**. 짧고 정확한 지시 1개 > 행동 나열 10개. 이전 모델용 과잉 처방 스킬·프롬프트는 **다이어트가 마이그레이션의 본체**.

---

## Part 1: 모델 선택 빠른 결정

| 상황 | 선택 |
|------|------|
| **미지정·일반 작업 (디폴트)** | **Opus 5** — 에이전틱 코딩·장기 과제·1M context. thinking 기본 ON |
| 가장 어려운 미해결 문제, 며칠 단위 자율 run, 병렬 서브에이전트 오케스트레이션 | **Fable 5** |
| 검증된 파이프라인·예측 가능한 동작·코드리뷰 하네스 | **Opus 4.8** (또는 Fable 5 fallback 대상) |
| **web fetch 도구 · Priority Tier 필요** | **Opus 4.8 명시** — Opus 5 **미지원**(Part 2.5.5) |
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

## Part 2.5: Opus 5 핵심 패턴 (**현행 Claude 디폴트**, 2026-07-28~)

> **공식 출처**: [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5) · [What's new in Opus 5](https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5) · [Migration guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide) — 접근일 2026-07-28
> 모델 ID = **`claude-opus-5`**(날짜 접미사 없음) · 1M context(기본=최대) · 128k max output · 가격 4.8 동일($5/$25) · **drop-in upgrade**(4.8 프롬프트가 그대로 잘 돎)

### 2.5.1 🔴 Breaking change 2건 (공식이 "breaking" 으로 명명)

| # | 변경 | 조치 |
|---|------|------|
| 1 | **thinking 기본 ON** — 4.8 은 `thinking` 필드 없으면 thinking 없이 돌았으나 **5 는 adaptive thinking 으로 돈다** | `max_tokens` 는 여전히 *thinking+응답 합계* 하드 리밋 → **4.8 에서 thinking 없이 돌던 워크로드는 `max_tokens` 재검토**. 구 동작 유지는 `thinking:{type:"disabled"}` (아래 제약) |
| 2 | **thinking 끄기가 effort `high` 이하로 제한** | `thinking:{type:"disabled"}` + effort `xhigh`/`max` = **400 에러**. **매 요청 독립 검증** — 앞 턴이 통과해도 그 요청에서 effort 올리면 거부 |

```python
# ❌ 4.8 에선 통과, 5 에선 400
client.messages.create(model="claude-opus-5", max_tokens=16000,
    thinking={"type": "disabled"}, output_config={"effort": "xhigh"}, messages=[...])

# ✅ (a) thinking 재활성 — 필드 제거
client.messages.create(model="claude-opus-5", max_tokens=16000,
    output_config={"effort": "xhigh"}, messages=[...])
# ✅ (b) thinking 끈 채로 — effort 하향
client.messages.create(model="claude-opus-5", max_tokens=16000,
    thinking={"type": "disabled"}, output_config={"effort": "high"}, messages=[...])
```

### 2.5.2 검증 지시 — **삭제가 아니라 「출력 형식 계약」으로 전환**

공식 원문(verbatim):

> *"If your prompt contains explicit verification instructions … remove them."*
> — Prompting Claude Opus 5

공식이 빼라는 것은 **행동 지시**(모델에게 *"검증하라"*)다. Opus 5 는 시키지 않아도 자가검증하므로 그 지시는 **과검증**만 유발한다. 그러나 우리가 그 지시로 지키던 **산출 품질 표면**(출처·한계·판정)까지 버릴 이유는 없다 — **같은 요구를 「답에 이 칸이 채워져 나와야 한다」는 출력 양식으로 옮기면** 공식 권고와 충돌하지 않으면서 표면이 유지된다.

**전환 규칙 — 행동형 → 형식형**

| 빼는 것 (행동 지시) | 대신 넣는 것 (출력 형식 계약) |
|---|---|
| "최종 검증 단계를 넣어라" · "서브에이전트로 검증하라" | 답 말미에 **`근거` 칸**(각 주장의 출처)과 **`한계` 칸**(확인 못 한 것) |
| "답을 두 번 확인하라" · "응답 전 재검증" | 답 말미에 **`판정` 칸**(결론 + 확신도) |
| "high-severity 만" · "보수적으로 보고하라" | **전부 보고**시키고 **별도 패스로 필터** — 과제약을 리터럴로 따라 *덜 보고*하므로, coverage 와 filter 를 **다른 단계로 분리**(Part 2 패턴이 5 에서 **더 중요**) |

**변환 예**

```diff
- After completing the analysis, verify your findings and double-check each claim.
+ End your response with these sections:
+   ## 근거   — each claim with its source
+   ## 한계   — what you could not confirm
+   ## 판정   — conclusion + confidence (high / medium / low)
```

⚠️ **경계**: 계약은 **답의 목차**를 정할 뿐 **행동을 지시하지 않는다.** `"verify"`·`"double-check"`·`"re-examine"` 류 동사가 계약 문구에 들어가면 그 순간 다시 행동 지시가 되어 공식 권고를 위반한다 — **칸 이름과 채울 내용만** 적는다.

📌 **계약 칸 목록은 전 모델 동일**(핵심 산출 · 근거 · 한계 · 판정 + 목적별 확장). **모델별로 다른 것은 얹는 문구·길이·위치뿐**이며, 구세대(4.8 · Fable 5 · Sonnet 5)도 **같은 칸 목록**을 쓰되 표현은 기존 방식 그대로 둔다.

### 2.5.3 **더해야 할 것**

| 축 | 지시 |
|---|---|
| **간결성 명시** | 기본 응답이 이전 Opus 보다 **길다**. effort 를 낮추면 *thinking 양*이 줄 뿐 **가시 응답 길이는 안정적으로 안 줄어든다** → 프롬프트로 직접 |
| **문서 산출 길이** | 디스크에 쓰는 파일(리포트·md)도 길어짐 → 길이 보정 지시 |
| **진행 서술(narration)** | 에이전틱 중 "이제 뭘 하겠다"를 자주 announce → **박자·형태를 서술**. 금지형보다 **긍정 예시**가 효과적 |
| **범위 고정** | 요청 안 한 단계를 덧붙이거나 과제를 재해석할 수 있음 → 좁은 과제엔 범위 명시 |
| **서브에이전트 억제** | 위임을 **더 쉽게** 함 → 위임 기준 명시 또는 **결정적 상한** |
| **자기수정 서술 억제** | 앞선 발언 정정을 자주 서술 → *사용자 결정을 바꾸는 오류만* 정정하도록 |
| **effort 재스윕** | 이전 모델 기본값 그대로 쓰지 말 것. `low`·`medium` 이 **1차 비용·지연 레버**. `xhigh`/`max` 시 `max_tokens` **64k 부터** |
| **비전 workaround 재검증** | 이전 모델용 우회가 불필요해졌을 수 있음. 도구(크롭·검증) 제공이 thinking 상향보다 비용 효율적 |

```text
Keep responses focused, brief, and concise. Keep disclaimers and caveats short, and spend
most of the response on the main answer. When asked to explain something, give a high-level
summary unless an in-depth explanation is specifically requested.
```
```text
Delegate to a subagent only for large tasks that are genuinely independent and parallelizable,
such as a wide multi-file investigation. Do not delegate work you can finish yourself in a
handful of tool calls, and do not use subagents to verify or double-check your own work.
```

### 2.5.4 thinking 을 꺼야만 하는 통합용 (공식 완화책)

thinking off 시 **① 도구 호출이 구조화 블록 대신 평문으로 새어나옴**(그 호출은 실행 안 되고, 에이전틱 루프에선 그 평문이 히스토리에 남아 **이후 턴까지 오염**) **② `<thinking>` 등 내부 XML 태그가 가시 응답에 노출**.
**1순위 대책 = thinking 을 켠 채 effort 를 낮추는 것** — 공식: *"thinking enabled at `low` effort performs better than thinking disabled at similar cost."*

> 🚨 시스템 프롬프트에 **"생각하지 마라 / 추론하지 마라"** 규칙이 있으면 **제거** — 태그 유출을 오히려 **증가**시킨다. 태그를 이름으로 지목하는 지시도 일반형보다 **덜** 효과적.

```text
When you use a tool, you may say a brief sentence first. If no tool can express what the user
asked for, say so instead of guessing. Do not include internal or system XML tags in your response.
```

### 2.5.5 ⚠️ 승격 시 따라오는 **미지원 회귀 2건**

| 기능 | Opus 4.8 | **Opus 5** | 분기 |
|---|---|---|---|
| **web fetch 도구** | 지원 | **미지원** | 웹 fetch 필요 프롬프트는 **`Opus 4.8` 명시** 라우팅 |
| **Priority Tier** | 지원 | **미지원** | Priority Tier 커밋 조직은 용량 계획 별도 |

그 외: 프롬프트 캐시 최소 길이가 **1,024 → 512 토큰**으로 완화(코드 변경 불요) · Fast mode 는 Claude API 한정.

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
