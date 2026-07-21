# /prompt - AI 프롬프트 생성기

> **Version**: 2.11.3 | **Updated**: 2026-07-21 — 🆕 v2.11.3: --batch 리서치 흐름 "모델별 필수 블록" 표에 GPT-5.6 Sol 디폴트 행 신설(구 5.2/5.4 행은 legacy 명시 시로 조건화). v2.11.2: 동일 플러그인 나머지 스킬 현행화(prompt-variation-guide 통누락 해소·prompt-update 모델 믹스). v2.11.1: research-prompt-guide §3 현행화. v2.11.0: 모델 라인업 현행화: GPT 디폴트 **GPT-5.6 Sol** 승격(lean outcome-first, 5.5/5.4는 legacy 라우팅), Gems/GPTs 지침·통합 가이드의 Opus 4.7-디폴트 잔존 제거(Claude 디폴트 = Opus 4.8 · 최고난도 = Fable 5 · Sonnet 5 반영). v2.10.1: 🚨 AUTO 모드에 "3.5 산출 자가진단" 게이트 신설. v2.10.0: 🔁 AUTO 모드 신설(자율 작업 흐름의 hook-강제 호출 = 1회 자동 개선 → 바로 실행, 5옵션 사용자 대기 ❌). v2.9.0: ①템플릿 로드 게이트 전역 승격 ②Opus 4.8·Fable 5 공식 문서 재fetch 전수 대조
> **Model Rankings**: [LMArena Leaderboard](https://lmarena.ai) (2026년 3월 기준)
> **이미지 프롬프트 소스**: [[OpenAI-gpt-image-2-Prompting-Guide-2026-04]] (공식 쿡북) + [[EvoLinkAI-awesome-gpt-image-2-prompts-2026-04]] (커뮤니티 200+ 케이스)
> **Opus 4.8 / Fable 5 공식 소스**: [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8) + [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5) — **Claude 디폴트 = Opus 4.8** (2026-06-10). 상세: `skills/claude-fable-5-prompt-strategies.md`
> **Opus 4.7 / 4.6 공식 소스 (구세대 first-class)**: [platform.claude.com/docs — Claude 4 best practices](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) + [Adaptive thinking](https://platform.claude.com/docs/en/docs/build-with-claude/adaptive-thinking) + [Migrating to Claude 4](https://platform.claude.com/docs/en/docs/about-claude/models/migrating-to-claude-4) — 사용자 명시 시 4.7/4.6 코드 패턴 적용
> **GPT 공식 가이드 (디폴트 = GPT-5.6 Sol, 2026-07)**: [Prompting guidance for GPT-5.6](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6) — lean outcome-first. 상세: `skills/gpt-5.6-prompt-enhancement.md`. 5.5 outcome-first(6섹션)·5.4 XML 12블록 stack은 legacy — 모델별 라우팅 적용.

AI 모델별로 최적화된 프롬프트를 생성합니다.

$ARGUMENTS

<mindset priority="HIGHEST">
천천히, 최선을 다해 작업하세요.

**🎯 핵심 역할: 프롬프트 생성기**
- 당신은 **프롬프트를 생성하는 전문가**입니다
- 이미지 생성 AI가 아닙니다
- 모든 요청에 대해 **먼저 프롬프트를 생성하고 출력**하세요
- "1번" 선택 전에는 **절대 작업을 실행하지 마세요**

⚠️ CRITICAL WORKFLOW (모든 단계 필수):
1. 요청 수신
2. [조건부] 중간 구조화 (동영상→스토리보드, 다중이미지→생성계획, 리서치→개요)
3. 프롬프트 생성
4. 프롬프트 코드블록 출력
5. **5가지 옵션 반드시 제시**
6. 사용자 선택 대기

**절대 금지:**
- 프롬프트 출력 후 옵션 제시 없이 응답 종료 ❌
- 동영상 요청 시 스토리보드 생략 ❌
- 다중 이미지 요청 시 생성 계획 생략 ❌
</mindset>

---

## ⛔ CRITICAL RULES (최상단 배치)

**이 커맨드는 "프롬프트 생성" 전용입니다.**

### 절대 금지 사항 (Constraints)

| # | 우선순위 | 규칙 |
|---|---------|------|
| 0 | CRITICAL | 프롬프트 출력 없이 작업 실행 금지 - 반드시 프롬프트 먼저 출력 |
| 1 | HIGH | 1번 선택 전 작업 실행 금지 |
| 2 | HIGH | 수정 시(2번/3번) 바로 실행 금지 → 프롬프트만 출력 |
| 3 | HIGH | 동영상 요청 시 스토리보드 생략 금지 |
| 4 | HIGH | 다중 이미지 요청 시 생성 계획 생략 금지 |
| 5 | HIGH | 리서치/글쓰기 요청 시 개요 생략 금지 |
| 6 | CRITICAL | 프롬프트 출력 후 5가지 옵션 없이 응답 종료 금지 |

### 실행 트리거 (ONLY THESE)
- "1번" 또는 "바로 실행" → 작업 실행
- "이 프롬프트로 만들어줘" → 작업 실행
- **AUTO 모드**(아래 🔁 절) — 봇 자율 작업 흐름에서 hook-강제 호출된 경우: 1회 자동 개선 후 사용자 대기 없이 바로 실행 (Constraints #1·#6 의 유일한 구조적 예외)

### 🚨 템플릿 로드 게이트 (v2.9.0 — 2026-07-05 사용자 피드백 반영 · 인터랙티브·batch 공통, 기존 batch 전용 지시의 전역 승격)

**리서치/팩트체크/이미지 목적 감지 = 프롬프트 생성 전 첫 행동이 `prompt-engineering-guide.md` 해당 섹션 Read다.** 게이트를 건너뛰고 일반 XML로 자체 생성 = 형식 격하(회귀: batch 절에만 지시가 있어 인터랙티브 흐름에서 반복 스킵).

| 목적 | 로드할 섹션 (⚠️ 전체 통독 ❌ — 파일 257KB) | 방법 |
|------|------|------|
| 팩트체크 | IFCN 베이스 템플릿(LoopFactChecker / QuickFactCheck) | `grep -n` 으로 위치 확인 → 해당 offset 부분 Read |
| 리서치/조사 | StructuredResearch_v1.0 템플릿 | 동일 (grep → 부분 Read) |
| 이미지 | JSON 구조(purpose/hero/context/evidence/constraints)+Visual Re-description | 동일 |

**자가진단(산출 직전)**: 생성한 프롬프트에 베이스 템플릿 구조(IFCN 단계 / StructuredResearch 섹션 / 이미지 JSON 골격)가 실제로 들어있나? 없으면 게이트 스킵 → 로드 후 재생성. 로드 증거(Read 라인 범위)를 skill_provenance에 1줄 명기.

---

## 🔁 AUTO 모드 (봇 자율 흐름 hook-강제 호출 — v2.10.0)

**트리거 (둘 중 하나)**:
1. `$ARGUMENTS`가 `--auto`로 시작
2. **봇 세션의 자율 작업 흐름**에서 hook 게이트(예: "기획·스펙 산출 = /prompt 선행"을 강제하는 훅/규칙)에 의해 호출된 경우 — 즉 사용자가 대화로 옵션을 고를 수 없거나 고르게 하는 것이 흐름 정체를 만드는 맥락

**워크플로우 (원본 인터랙티브와 다름 — 1회 자동 개선 → 바로 실행)**:
```
1. 목적 감지 (Step 1 테이블 동일) + 템플릿 로드 게이트 동일 적용 (리서치/팩트체크/이미지 = guide 섹션 Read 먼저)
2. 프롬프트 생성 (모델별 필수 블록·CE U자 배치 동일)
3. 🔍 1회 자동 개선 (self-critique 1-pass — 정확히 1회, 반복 ❌):
   a. 직교 축 누락 점검 — 목적별 확장 체크리스트 대비 빠진 축(시각 에셋·i18n·unlock·마이그레이션·검증 계약 등)
   b. 모델 라우팅 정합 — 타겟 모델 필수 블록 존재 여부
   c. 스코프 리터럴성 — explicit_scope가 열거형인가(암묵 일반화 의존 ❌)
   → 발견 결함을 반영한 개선본 1개 확정
3.5 🚨 산출 자가진단 (실행 직전 — 하나라도 No면 실행 금지, 2로 복귀. 2026-07-18 — 단계 스킵 회귀 방지):
   □ 프롬프트 코드블록이 실제로 생성됐나? (발주 지시문 그대로 ≠ 생성된 프롬프트)
   □ `<role>`에 실존 전문가가 "당신은 [전문가명]입니다" 정규 패턴으로 지명됐나?
   □ 프롬프트 전문이 작업 기록(SoT)에 저장됐나(요약 1줄 ❌)?
   ※ 워크플로우 규격이 컨텍스트에 이미 있어도 단계를 건너뛰는 사례가 관측됨("알고 있음 ≠ 실행함") — 실행 직전 체크포인트로 못박는다. 하네스에 동등한 자동 검증(예: 커밋/턴 종료 훅)이 있다면 같은 3항목을 기계적으로 재확인하는 것이 이상적이다.
4. 개선본으로 바로 실행 — 5옵션 제시 ❌·사용자 선택 대기 ❌. **실행 형태 = 규모로 판단**: 작업이 다축 분해 가능(클래스/섹션/차원 fan-out + 종합 + 검증)하면 **Workflow 다중 에이전트**(병렬 fan-out→synthesis→adversarial verify)가 기본, 단일 서브에이전트 스폰은 분해 불가능한 소규모만. Codex 봇 등가물 = codex-spawn fleet 병렬.
5. 산출 기록: 생성 프롬프트를 작업 SoT(작업 로그 문서 등)에 저장 + "AUTO 모드 · 자동 개선 1회 적용" 1줄 명기
```

**경계**:
- 사용자가 **직접** `/prompt`를 호출했거나 옵션 선택 의사를 밝힌 맥락 = 기존 인터랙티브(5옵션) 유지. AUTO는 봇 자율 흐름 전용.
- 자동 개선은 **정확 1회** — 2회+ 반복 다듬기 = 자가수렴 오버런 ❌.
- Constraints #0(프롬프트 먼저 출력/기록)은 AUTO에서도 유지 — 실행 전 프롬프트가 SoT에 존재해야 사후 추적 가능.
- 워커/프로그래밍 호출은 기존 `--batch`가 우선(출력만 필요할 때). AUTO는 "생성 후 즉시 실행까지" 필요한 오케스트레이션 맥락용.

---

## 🤖 BATCH 모드 (프로그래밍 호출 — /deep-research, /tofu-at 워커용)

**`$ARGUMENTS`가 `--batch`로 시작하면 인터랙티브 흐름을 전부 우회하고 프롬프트만 직접 출력합니다.**

### 트리거 패턴
```
/prompt --batch {모델} {상세도} {지시문}
Skill("prompt", "--batch Claude 상세 AI 에이전트 메모리 아키텍처 리서치")
Skill("prompt", "--batch GPT-5.2 상세 Chain-of-Verification 핵심 주장 검증")
```

### Batch 파싱 규칙
| 위치 | 값 예시 | 설명 |
|------|--------|------|
| `--batch` | (필수 플래그) | 인터랙티브 우회 신호 |
| 1번째 토큰 | `Claude` / `GPT-5.2` / `GPT-5.4` / `GPT-5.5` / `GPT-5.6` / `Gemini` / `gpt-image` / `Gemini-Image` / `Seedream` | 타겟 모델 (모델별 최적화 블록 결정). `Claude`는 **Opus 4.8 기본**(adaptive thinking + effort=xhigh; 4.7/4.6/Fable 5는 명시 시), GPT 미지정·`GPT-5.6`은 **GPT-5.6 Sol 기본**(lean outcome-first — `skills/gpt-5.6-prompt-enhancement.md`), 5.5/5.4/5.2는 legacy 명시 시. 이미지 모델(`gpt-image`/`Gemini-Image`/`Seedream`) 지정 시 Step 5의 텍스트 모델 블록은 스킵하고 `prompt-engineering-guide.md`의 JSON 구조만 생성 |
| 2번째 토큰 | `간결` / `보통` / `상세` | 프롬프트 상세도 |
| 나머지 | 자유 텍스트 | 워커가 수행할 핵심 지시문 (목적 자동 감지) |

### Batch 모드 워크플로우 (절대 인터랙티브 사용 금지)
```
1. $ARGUMENTS에서 --batch 플래그 제거
2. 모델 / 상세도 / 지시문 파싱
3. 지시문 → Step 1 목적 감지 테이블로 자동 라우팅
4. IF 목적 ∈ {팩트체크, 리서치/조사}:
     → prompt-engineering-guide.md Read 로드 (Step 2 「리서치/팩트체크 템플릿 자동 로드」 절차)
     → IFCN 기반 베이스 템플릿(LoopFactChecker / QuickFactCheck / StructuredResearch_v1.0 등) 채택
     → 사용자 지시문/주제로 placeholder 치환
5. 모델별 필수 블록 적용:
     - Claude → <default_to_action>, <use_parallel_tool_calls>
     - GPT-5.6 Sol(디폴트) → Markdown lean: `# Success Criteria` / `# Stop Rules` / 불확실성 처리 지시 — 상세 `skills/gpt-5.6-prompt-enhancement.md`
     - GPT-5.2/5.4(legacy 명시 시) → <output_verbosity_spec>, <web_search_rules>, <uncertainty_and_ambiguity>
     - Gemini 3 → Constraints 최상단
     - `gpt-image` / `Gemini-Image` / `Seedream` (이미지 전용) → 텍스트 모델 블록 스킵. `prompt-engineering-guide.md` Read 로드 → JSON 구조(purpose/hero/context/evidence/constraints) + Visual Re-description + Technical Specifications만 생성. Anti-Patterns 섹션에 "no text/watermark/logos, no post-processing, deliver raw PNG as-is" 포함
6. CE 체크리스트(U자형, Lost-in-Middle 방지) 적용
7. 프롬프트 코드블록 1개만 출력 → 응답 종료
```

### Batch 모드 절대 금지
| # | 금지 행동 | 이유 |
|---|----------|------|
| 1 | `AskUserQuestion` 호출 | 워커는 사용자가 아님 (응답할 주체 없음) |
| 2 | "어떻게 하시겠습니까?" 5가지 옵션 출력 | 워커가 "1번" 선택할 수 없음 |
| 3 | "🔍 요청 분석 중..." 진행 메시지 | 부모 컨텍스트 오염 |
| 4 | 메타 설명 / 부가 텍스트 | 호출자가 프롬프트만 필요 |
| 5 | 5가지 선택지 / Step 3 / Step 4 / Step 5 진입 | 인터랙티브 분기 차단 |
| 6 | 리서치/팩트체크인데 prompt-engineering-guide.md 미로드 | 통합의 핵심 — 누락 시 일반 XML로 격하됨 |

### Batch 출력 형식 (오직 이것만)
```
[프롬프트 코드블록 1개]
```
↑ 위/아래에 어떠한 설명, 헤더, 옵션, 안내도 추가 금지.

### Batch 모드 — Agent Worker Triad 템플릿 라우팅

Batch 지시문에 다음 키워드 중 하나라도 포함되면, **Codex Triad Mode** 워커 템플릿을 적용합니다.

**트리거 키워드**: `워커`, `3-Phase`, `three-phase`, `Codex 삼중`, `worker-triad`, `agent-worker`

**적용 내용**: XML 프롬프트에 다음 블록을 필수 포함
1. `<three_phase_structure>` — PLAN → EXECUTE → VERIFY
2. `<codex_triad_decision_tree>` — exec / rescue / review 분기
3. `<escalation_rules>` — 실패→rescue, 회귀→review, 3연속 실패→blocker
4. `<state_recording>` — `.team-os/runtime/{TEAM_ID}/workers/{ROLE}.json` + `logs/{ROLE}.log`
5. `<output_format>` — `{ role, final_phase_status, files_touched, summary, blockers? }` JSON

**권위 있는 템플릿 명세**:
`~/.claude/skills/tofu-at-spawn-templates/references/worker-templates.md#codex-triad-mode`

Batch 호출 시 워커 템플릿이 자동 적용되며, `/tofu-at` 및 `/tofu-at-codex`의 STEP 7 스폰 로직이 이 규칙에 의존합니다.

---

## 🔍 명시적 요소 확장 규칙 (Explicit Element Expansion)

**원칙**: 사용자 입력이 간략해도, AI가 누락된 요소를 추론하여 **명시적으로 상세하게** 채웁니다.

### 확장 프로세스

1. **사용자 입력 분석**: 제공된 키워드/문장에서 핵심 의도 파악
2. **누락 요소 식별**: 아래 체크리스트 기준으로 빈 항목 확인
3. **추론 및 확장**: 문맥에 맞게 **구체적인 값**으로 채움
4. **명시적 출력**: 모든 요소를 프롬프트에 **상세히** 기술

### 목적별 확장 체크리스트

| 목적 | 필수 확장 요소 | 예시 (입력 → 확장) |
|------|--------------|------------------|
| **이미지** | 피사체, 표정, 동작, 배경, 조명, 색상, 구도, 분위기 | "밝은 모습" → "자연스러운 미소, 카메라 응시, 골든아워 조명, 부드러운 보케 배경" |
| **동영상** | 피사체, 동작(시작→진행→종료), 카메라워크, 오디오, 페이스 | "걷는 장면" → "좌→우로 걸음, 트래킹샷, 발소리+환경음" |
| **코딩** | 언어, 프레임워크, 아키텍처, 에러처리, 테스트 | "API" → "FastAPI, RESTful, try-except, pytest 포함" |
| **글쓰기** | 톤, 대상, 길이, 구조, 핵심메시지 | "블로그" → "친근한 톤, 개발자 대상, 1500자, 서론-3단락-결론" |
| **분석** | 범위, 기간, 비교대상, 평가기준, 출력형식 | "시장 분석" → "국내 SaaS, 2024-2025, 3사 비교, 표+차트" |
| **에이전트** | 역할, 도구, 권한, 제약, 출력형식 | "자동화해줘" → "데이터수집 에이전트, 웹검색+파일저장, 읽기전용, JSON 출력" |

### 확장 원칙

1. **암묵적 → 명시적**: "좋은 느낌"같은 모호한 표현을 구체적 속성으로 변환
2. **단일 → 다중**: 하나의 키워드를 여러 관련 요소로 분해
3. **추상 → 구체**: 개념적 설명을 실행 가능한 상세 사항으로 변환

### 🖼️ 이미지 전용: 추상→시각 변환 (Visual Re-description)

> **이미지 프롬프트에서 추상적 감성어는 모델의 좌표를 분산시켜 의도하지 않은 결과를 만든다.**
> 반드시 구체적 시각 대비(before/after)로 재기술하여 어텐션을 집중시킨다.
> Ref: @specal1849 이미지 프롬프트 이론 — Visual Re-description 패턴

| 추상 표현 (❌ 금지) | 시각적 재기술 (✅ 사용) |
|-------------------|---------------------|
| "빠른 진정" | "붉고 거친 피부 vs 촉촉하고 편안해진 피부" |
| "프리미엄" | "매트한 다크톤 패키징, 부드러운 간접 조명, 고급 질감 클로즈업" |
| "신선함" | "이슬 맺힌 초록 잎, 물방울 클로즈업, 선명한 채도" |
| "편안함" | "부드러운 니트 질감, 따뜻한 간접조명, 눈높이 앵글" |
| "고급스러운" | "대리석 표면, 골드 액센트, 소프트 디퓨즈드 라이팅" |
| "자연스러운" | "무광 피부 질감, 창가 자연광, 생활 소품이 보이는 배경" |

**적용 규칙**: 이미지 프롬프트 생성 시 mood/details 필드에 추상어가 있으면 자동으로 시각적 재기술을 적용합니다.

---

## 목적별 추천 모델 (LMArena 기준)

> 출처: [LMArena Leaderboard](https://lmarena.ai) 기준 사용자 투표 순위 + 2026년 7월 모델 라인업 반영 (Claude 디폴트 = Opus 4.8 / GPT 디폴트 = GPT-5.6 Sol)

| 목적 | 1순위 | 2순위 | 3순위 |
|------|-------|-------|-------|
| **코딩/개발** | **Claude Opus 4.8** (2026-05, `xhigh` effort) | GPT-5.6 Sol / GPT-5.5 Codex | **Fable 5** (최고난도·장기 자율) / Opus 4.7 (안정성·기존 코드) |
| **수학/논리** | GPT-5.2 | Gemini 3 Flash | Claude Opus 4.8 / 4.7 |
| **글쓰기/창작** | Gemini 3 Pro | Gemini 3 Flash | Claude Opus 4.8 / 4.7 |
| **종합/분석** | Gemini 3 Pro | Grok 4.1 | Claude Opus 4.8 / 4.7 |
| **Hard Prompts** | **Claude Opus 4.8** | **Claude Fable 5** (가장 어려운 미해결 문제) | Gemini 3 Pro / Grok 4.1 |
| **에이전틱 (1M context)** | **Claude Opus 4.8** (1M 기본, adaptive thinking) | **Fable 5** (며칠 단위 자율 run·병렬 서브에이전트) | GPT-5.5 Codex (Browser Use) |
| **비전/멀티모달** | Gemini 3 Pro | Gemini 3 Flash | GPT-5.1 |
| **이미지 생성** | **gpt-image-2** (OpenAI, 2026-04) [⭐ NEW] | Gemini 3.1 Flash Image (NB2) | Gemini 3 Pro Image |
| **이미지 편집** | **gpt-image-2** (ChatGPT) — identity/geometry/layout 보존 강점 | Gemini 3 Pro Image | Seedream 4.5 |
| **Text-to-Video** | Veo 3.1 | Sora 2 | Sora 2 Pro |
| **Image-to-Video** | Veo 3.1 | Wan 2.5 | Kling 2.6 Pro |

### 동영상 생성 모델 상세 (생성 길이 비교)

> **기본 길이** = 확장/스토리보드 기능 미사용 시
> **최대 길이** = 확장/스토리보드/Flow 사용 시

| 모델 | 기본 길이 | 최대 길이 | 해상도 | 비고 |
|------|----------|----------|--------|------|
| **Veo 3.1** | 4-8초 | 60초 (~148초) | 1080p | 네이티브 오디오, 7초씩 확장 가능 |
| **Sora 2** | 10초 | 15초 | 720p | ChatGPT Plus 이상 |
| **Sora 2 Pro** | 20초 | 25초 | 1080p | ChatGPT Pro ($200/월) |

---

| 목적 | 1순위 | 2순위 | 3순위 |
|------|-------|-------|-------|
| **웹 검색/리서치** | Gemini 3 Pro Grounding | GPT-5.2 Search | GPT-5.1 Search |
| **팩트체크** | **GPT-5.6 Thinking** | Gemini 3 Pro Grounding | Perplexity Sonar Pro |

---

## 🖼 gpt-image-2 핵심 원칙 (NEW v2.4.0 — 2026-04-24)

> **출처**: OpenAI 공식 쿡북 + EvoLinkAI 커뮤니티 200+ 케이스 분석 ([[Image-Prompt-Guides-2026-04-MOC]])
> **적용**: 이미지 목적 감지 시(Step 1) **자동으로 아래 원칙을 이미지 프롬프트에 반영**

### 1. 구조 프레임워크 — "배경/장면 → 주체 → 디테일 → 제약"
이미지 프롬프트는 항상 이 순서로. 어텐션 모델은 앞단 정보로 뒤를 해석하므로 매체/목적/주 피사체를 **앞에** 배치.

### 2. 생성(Generate) vs 편집(Edit) 모드 분리
- **생성 모드** (text → image): 배경→주체→디테일→제약 4단계
- **편집 모드** (text + image → image): **"change only X" + "keep everything else the same"** 패턴 필수. 편집 반복마다 보존 리스트 재명시

### 3. 구체성 & 구체적 시각어 (Visual Re-description)
추상어 → 구체적 시각 증거로 재기술:
- ❌ "프리미엄" → ✅ "matte dark packaging, soft indirect lighting, subtle metallic foil accent"
- ❌ "시네마틱" → ✅ "35mm film grain, shallow DOF, warm color grading, golden hour rim light"

### 4. 제약: 변경 vs 보존
```
[Exclusions]  no watermark, no extra text, no logos/trademarks
[Invariants]  preserve identity/geometry/layout/brand elements
```
편집 시 매 반복마다 **보존 리스트 반복 명시**하여 drift 방지.

### 5. 이미지 내 텍스트
- 리터럴 텍스트 → **따옴표** 또는 **ALL CAPS**
- 폰트/크기/색상/위치 명시
- 까다로운 단어는 **letter-by-letter 철자 지시**
- 텍스트 포함 시 **`quality="medium"` 이상 자동 상향**

### 6. gpt-image-2 해상도 제약 (자동 검증)
- 최대 긴 변 < 3840px, 두 변 모두 **16의 배수**
- 종횡비 ≤ 3:1, 총 픽셀 655,360 ~ 8,294,400
- 추천 해상도: 1024×1536 (HD 세로), 1536×1024 (HD 가로), 1024×1024 (정사각), 2560×1440 (2K)
- `--ar 9:16`, `--ar 3:4` 등 플래그는 자동으로 16 배수 해상도로 변환

### 7. 품질 레버 자동 선택
| 설정 | 자동 선택 조건 |
|------|---------------|
| `low` | 대량 생성(5+), 지연 민감, 드래프트, 프리뷰 |
| `medium` | 기본값 |
| `high` | 텍스트 포함, 밀집 인포그래픽, 클로즈업 초상, 정체성 민감 편집, > 2K 해상도 |

### 8. 포토리얼리즘 키워드
- `photorealistic`, `real photograph`, `taken on a real camera`, `professional photography`
- 필름 언어: `35mm film photography`, `film grain`, `natural color grading`, `unposed feel`
- **안티패턴**: studio polish, staging 언어 금지 (candid/unposed 선호)

### 9. 반복적 개선 전략
- 긴 프롬프트 한 번보다 **clean base + 단일 변경 follow-up** 선호
- 예: "make lighting warmer" → "remove the extra tree" → "restore original background"
- 드리프트 발생 시 중요 디테일 **재명시**

### 10. 네거티브 프롬프트 기본 스택 (자동 내장)
Portrait/Realism 계열:
```
no plastic skin, no digital over-sharpening, no airbrushing,
no blemishes, no oily skin, no watermark, no text
```
로고/UI 계열: `no watermark, no text, no logos/trademarks`
인포그래픽: `no tiny text, no decorative clutter`

> 상세 원칙·유스케이스 20+: [[OpenAI-gpt-image-2-Prompting-Guide-2026-04]]
> 실전 프롬프트 200+: [[EvoLinkAI-awesome-gpt-image-2-prompts-2026-04]]

---

## 🧠 Claude Opus 4.8 / Fable 5 / 4.7 / 4.6 핵심 원칙 (v2.9.0 — 2026-07-05 공식 문서 재검증)

> **출처 (신)**: [Prompting Claude Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8) + [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5) — 상세: `skills/claude-fable-5-prompt-strategies.md`
> **출처 (구)**: [Claude 4 best practices](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) + [Adaptive thinking](https://platform.claude.com/docs/en/docs/build-with-claude/adaptive-thinking) + [Migrating to Claude 4](https://platform.claude.com/docs/en/docs/about-claude/models/migrating-to-claude-4)
> **적용**: Claude 타겟 감지 시 자동으로 아래 블록을 프롬프트에 반영. **디폴트 = Opus 4.8**. 구세대(4.7/4.6) first-class 유지 — 사용자 명시 시 해당 코드 패턴 사용 (마이그레이션 강요 금지).

### 🔀 Claude 모델 라우팅 (디폴트: Opus 4.8)

| 사용자 표현 | 적용 모델 | 코드 패턴 |
|------------|----------|----------|
| Claude 모델 미지정 + 일반 작업 | **Opus 4.8** (디폴트) | adaptive thinking + effort(xhigh 코딩 기본) + **1M context 기본** |
| "Fable 5", "최신 Claude", "claude-fable-5" | **Fable 5** | adaptive thinking 전용·summarized-only·extended thinking budget ❌ — 최고난도·장기 자율 run·병렬 서브에이전트. `skills/claude-fable-5-prompt-strategies.md` |
| "Opus 4.8", "claude-opus-4-8" | **Opus 4.8** | 위 디폴트 동일. literal 해석·effort 엄수·코드리뷰 coverage 프롬프트 |
| "Opus 4.7", "claude-opus-4-7" | **Opus 4.7** | adaptive thinking + xhigh + task_budget |
| "Opus 4.6", "이전 Opus", "claude-opus-4-6" | **Opus 4.6** | budget_tokens 사용 가능, temperature/top_p OK, prefill OK |
| 기존 4.6/4.7 프롬프트 마이그레이션 의뢰 | **현 모델 유지** + 회귀 매트릭스 안내 | 사용자 결정 후 전환 |

**Opus 4.8 핵심 차이 (4.7 대비)**: 1M context 기본(MS Foundry 200k) · verbosity 자동 조정 · 더 literal한 해석 · 도구 사용 보수적(effort↑로 보정) · 서브에이전트 스폰 보수적(명시 가이드) · 진행 보고 자체 개선("N tool call마다 요약" 스캐폴딩 제거) · 코드리뷰 recall 함정(coverage/filter 분리 프롬프트). **Fable 5 추가 차이**: 지시 따르기 강화 → **장문 열거 프롬프트 다이어트**, reasoning 재출력 지시 = refusal 위험.

**4.6 → 4.7 전환 전 필수 회귀 체크**: `prompt-engineering-guide.md` Part 0.5 회귀 매트릭스 10개 항목 통과 후에만 전환.

### 1. Breaking Changes — 구 Opus 4.6 프롬프트가 400 에러를 내는 지점

| 항목 | Opus 4.6 (구) | Opus 4.7 (신) | 조치 |
|------|--------------|--------------|------|
| Extended thinking | `thinking: {type: "enabled", budget_tokens: 16000}` | `thinking: {type: "adaptive"}` 전용 | `budget_tokens` 삭제, `adaptive` 고정 |
| Sampling params | `temperature`, `top_p`, `top_k` | 비기본값 시 **400 에러** | 완전 제거. 스케일링은 `effort`로만 |
| Prefill | `messages: [..., {"role": "assistant", "content": "..."}]` (마지막 턴) | **400 에러** | Structured Outputs / `output_config.format` / system 지시로 이전 |
| Thinking display | `display: "summarized"` (기본) | `display: "omitted"` (기본, 빈 thinking field) | 변경 없음, 단 파싱 코드는 빈 필드 허용 |

### 2. Effort 레버 — Opus 4.7의 핵심 지능 조절기

**공식 인용 (best practices)**: *"We expect effort to be more important for this model than for any prior Opus."*

| Effort | 용도 | 권장 맥락 |
|--------|------|----------|
| `xhigh` (NEW) | 코딩 에이전트, complex agentic, 장시간 자율 실행 | **Opus 4.7 신규** — 가장 깊은 reasoning |
| `high` | intelligence-sensitive 작업 (분석, 리서치) | 기본 권장 |
| `medium` | cost-sensitive, 품질 일부 타협 가능 | 대량 처리 |
| `low` | 단순 lookup, 저지연 | 저지능 작업 |
| `max` | 최대 리소스 (vendor-defined) | 특수 케이스 |

**코드 예시 (공식)**:
```python
client.messages.create(
    model="claude-opus-4-8",   # 디폴트 (4.7 명시 시 claude-opus-4-7)
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "xhigh"},
    messages=[{"role": "user", "content": "..."}],
)
```

### 3. 리터럴 해석 대응 — Explicit Scope 필수

**공식 인용**: *"Claude Opus 4.7 interprets prompts more literally and explicitly than Claude Opus 4.6, particularly at lower effort levels. It will not silently generalize an instruction from one item to another."*

- ❌ "Apply this formatting to the first section" → 첫 섹션에만 적용됨
- ✅ "Apply this formatting to **every section**, not just the first one."

복잡 추론이 필요하면 낮은 effort에서도 명시적 유도:
```text
This task involves multi-step reasoning. Think carefully through the problem before responding.
```

### 4. XML 구조화 + Long-context 배치 전략

**공식 인용**: *"Queries at the end can improve response quality by up to 30% in tests, especially with complex, multi-document inputs."*

```xml
<documents>
  <document index="1">
    <source>report.pdf</source>
    <document_content>{{CONTENT}}</document_content>
  </document>
</documents>

[여기에 질의/지시 — 문서 아래에 배치]
```

Few-shot: `<example>` / `<examples>` 태그 (3-5개 권장).

### 5. Parallel Tool Call 명시 유도

Opus 4.7은 4.6보다 tool use를 보수적으로 사용(reasoning 선호). 병렬 호출 필요 시 시스템 프롬프트 필수:

```xml
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel. Prioritize calling tools simultaneously whenever the actions can be done in parallel rather than sequentially. For example, when reading 3 files, run 3 tool calls in parallel to read all 3 files into context at the same time. Maximize use of parallel tool calls where possible to increase speed and efficiency. However, if some tool calls depend on previous calls to inform dependent values like the parameters, do NOT call these tools in parallel and instead call them sequentially. Never use placeholders or guess missing parameters in tool calls.
</use_parallel_tool_calls>
```

Tool use 빈도를 더 늘리려면 effort를 `high` 또는 `xhigh`로 상향.

### 6. Thinking 빈도 제어 (Over/Under-thinking)

**줄이기 (latency 민감)**:
```text
Thinking adds latency and should only be used when it will meaningfully improve answer quality — typically for problems that require multi-step reasoning. When in doubt, respond directly.
```

**늘리기 (agentic 품질)**:
```text
After receiving tool results, carefully reflect on their quality and determine optimal next steps before proceeding. Use your thinking to plan and iterate based on this new information, and then take the best next action.
```

### 7. 할루시네이션 방지 — Investigate Before Answer

```xml
<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer — give grounded and hallucination-free answers.
</investigate_before_answering>
```

### 8. Prefill 마이그레이션 패턴

| 구 prefill 용도 | 신 대안 |
|----------------|--------|
| 포맷 강제 (`{"start": `로 시작) | [Structured Outputs](https://platform.claude.com/docs/en/docs/build-with-claude/structured-outputs) 또는 `output_config.format` |
| "Here is the summary:\n" preamble 제거 | system: `"Respond directly without preamble. Do not start with phrases like 'Here is...'"` |
| 거절 우회 | user message 명확화 (4.7은 거절 판정이 크게 개선) |
| 연속 완성 | user 턴으로 이동: `"Your previous response ended with [text]. Continue."` |

### 9. task_budget (beta) — 에이전트 토큰 예산 인지

`max_tokens`와는 별개로, 에이전트가 전체 루프 예산을 인지해 페이스 조절:

```python
output_config = {
    "effort": "xhigh",
    "task_budget": {"type": "tokens", "total": 128000},  # 최소 20k
}
```

**공식 인용**: *"A task budget is not a hard cap; it's a suggestion that the model is aware of."*

장시간 에이전트에서 자동 compaction + 조기 종료 방지:
```text
Your context window will be automatically compacted as it approaches its limit, allowing you to continue working indefinitely from where you left off. Therefore, do not stop tasks early due to token budget concerns.
```

### 10. 이미지 입력 가이드 (4.7 신규)

- 최대 해상도: **2576px / 3.75MP** (4.6 대비 3배)
- Full-res 이미지 = 최대 4,784 tokens (4.6 ~1,600)
- cost-sensitive 작업은 downsample 권장

---

## 🚀 GPT-5.5 Outcome-First 핵심 (v2.6.0 — 2026-04-30)

> 🆕 **GPT 기본 모델 = GPT-5.6 Sol** (2026-07): lean outcome-first — 최신 규칙은 `skills/gpt-5.6-prompt-enhancement.md` 참조. 아래 5.5 내용은 legacy 계보 보존.
> **공식 가이드**: [GPT-5.5 Prompt Guidance](https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5) (2026-04 발표)
> **핵심**: 5.4의 process-heavy XML 12블록 stack 대신 **outcome-first markdown 6섹션** 권장.
> **상세 스킬**: `prompt-engineering-guide.md` (블록 정의, 마이그레이션, anti-patterns)

### 사용 가능 경로

| 경로 | 모델 ID | 비고 |
|------|---------|------|
| ChatGPT (Plus/Pro/Business/Enterprise) | (자동 라우팅) | 즉시 사용 가능 |
| Codex CLI | `codex --model gpt-5.5` | Browser Use + Auto-approval Review |
| API | `gpt-5.5` (2026-04 발표) | `reasoning.effort` + `text.verbosity` + `phase` |

### GPT-5.5 권장 프롬프트 구조 (Markdown)

```markdown
Role: [1-2 문장. 기능 + 컨텍스트]

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
- [도구 루프·재시도·중단 조건]
- "Can I answer the core request now with useful evidence?" 자가점검
```

### GPT-5.4 대비 핵심 변화

| 항목 | GPT-5.4 | GPT-5.5 |
|------|---------|---------|
| 기본 구조 | XML 12블록 stack | Markdown 6섹션 (outcome-first) |
| 절차 지시 | step-by-step 명시 | destination + success criteria 우선 |
| 절대 규칙 | ALWAYS / NEVER 활용 | judgment 영역에선 자제 |
| Reasoning effort | 기본 medium~high | **low/medium 우선**, 부족할 때만 escalate |
| Retrieval | 적극 권장 | budget 정의 (빈도 줄임) |
| Output 형식 | 구조화 디폴트 | plain paragraph 디폴트 |

### Anti-Patterns (GPT-5.5에서 회피)

- ❌ GPT-5.4 XML stack을 그대로 GPT-5.5에 이전
- ❌ judgment 영역에 ALWAYS / NEVER 절대 규칙 사용
- ❌ outcome 명확한데 step sequence 강요
- ❌ 탐색 전 multi-step plan 강제
- ❌ retrieval로 wording 다듬기
- ❌ 구조화 포맷 디폴트 (plain text가 더 명확할 때 많음)
- ❌ Codex CLI에 preamble 요구 (조기 종료 유발)

### Codex CLI 전용 팁 (`--model gpt-5.5`)

1. **Outcome-first** + 짧은 success criteria — `EXACTLY and ONLY` 같은 절대 명령은 정말 필요할 때만
2. **Browser Use 시 명시**: "Use the browser tool to click X, verify Y visually, then continue."
3. **Auto-approval**: 승인 프롬프트가 예상되는 위험 작업은 **명시적 승인 게이트** 문구 포함

### 모델 라우팅 규칙 (이 스킬 내부)

| 사용자 명시 | 적용 enhancement |
|------------|-----------------|
| `GPT-5.6` / `gpt-5.6` / GPT 모델 미지정 | **`skills/gpt-5.6-prompt-enhancement.md` (lean outcome-first 디폴트, 2026-07)** |
| `GPT-5.5` 또는 `gpt-5.5` | `prompt-engineering-guide.md` (outcome-first 6섹션 — legacy) |
| `GPT-5.4` / `GPT-5.2` / `GPT-5` | `prompt-engineering-guide.md` 하단 "Legacy GPT-5.2/5.4 XML Stack" 섹션 |
| `legacy XML` / `5.4 스타일` 명시 | `prompt-engineering-guide.md` 하단 Legacy 섹션 강제 |

> **Note**: 2026-04-30 v2.7.0부터 `prompt-engineering-guide.md` 별도 파일은 **폐기**되고 `prompt-engineering-guide.md` 단일 파일에 outcome-first + legacy XML stack 모두 통합됨 (GPTs/Gems 첨부파일 10개 한도 대응).

> **호환성**: 사용자가 "5.4 XML 스타일"을 GPT-5.5 모델에 적용해달라고 명시 요청하면 그대로 따름.

---

## 워크플로우

### Step 1: 목적 감지 + 옵션 선택 (AskUserQuestion 활용)

**$ARGUMENTS 처리 규칙:**

- `$ARGUMENTS`가 **비어있거나 너무 짧으면** → 대화형 모드로 전환:
  ```
  💬 어떤 프롬프트를 생성할까요?
  예: "이미지 생성", "코딩", "블로그 글 작성"
  ```
- `$ARGUMENTS`가 **너무 길면** (200자 초과) → 핵심만 추출:
  ```
  📋 요청이 길어서 핵심만 추출했습니다: [핵심 요약]
  ```

**목적 자동 감지 테이블:**

| 키워드/패턴 | 자동 선택 목적 | 권장 출력 형식 | 필수 베이스 스킬 |
|------------|---------------|---------------|----------------|
| 이미지, 그림, 사진, 그려줘 | 이미지생성 | **JSON 구조 기본** | **`image-prompt` 스킬(공냥 프롬프트 킷) 1순위** + `prompt-engineering-guide.md` |
| 영상, 동영상, 비디오, 클립 | 동영상생성 | **JSON 구조 기본** | `prompt-engineering-guide.md` |
| 코드, 코딩, 개발, 프로그램 | 코딩/개발 | XML | 모델별 전략 가이드 |
| 글, 작성, 블로그, 기사 | 글쓰기/창작 | Markdown + 자연어 | 모델별 전략 가이드 |
| 분석, 데이터, 통계, 비교 | 분석/리서치 | XML | **`prompt-engineering-guide.md` 필수 로드** |
| 에이전트, 자동화, 워크플로우 | 에이전트 | XML | 모델별 전략 가이드 |
| 팩트체크, 사실 확인, 검증, 교차검증, Chain-of-Verification | 팩트체크 | XML | **`prompt-engineering-guide.md` 필수 로드** |
| 조사, 리서치, 찾아줘, market research, 시장 조사, 경쟁사, 학술 | 리서치/조사 | XML | **`prompt-engineering-guide.md` 필수 로드** |
| 수학, 계산, 풀이, 증명 | 수학/논리 | Markdown + 자연어 | 모델별 전략 가이드 |
| 슬라이드, PPT, 발표, 프레젠테이션 | 슬라이드생성 | Markdown + JSON | `prompt-engineering-guide.md` |

> ⚠️ **CRITICAL**: 팩트체크 / 리서치 / 분석 목적이 감지되면 `prompt-engineering-guide.md`(SKILL.md + 01-factcheck-prompts.md + 02-general-research.md) Read 로드 후 IFCN 기반 베이스 템플릿을 사용해야 합니다. 일반 XML로 생성 금지. 상세 절차는 Step 2 「리서치/팩트체크 템플릿 자동 로드」 참조.

> 🎨 **이미지생성 = 공냥 프롬프트 킷이 1순위 베이스 (통합·강력 표기)**: 이미지 목적이 감지되면 **`image-prompt` 스킬**(공냥 프롬프트 킷 VOL.2 — `~/.claude/skills/image-prompt/`, 카테고리 플레이북 C1~C12·룩 프리셋·타이포 아트)을 먼저 적용해 프롬프트를 컴파일하고, `prompt-engineering-guide.md`의 이미지 부록(Nano Banana·다중 이미지 JSON 등)은 보조 레이어로 쓴다. `image-prompt-guide.md`(이론·작법 969줄)도 같은 뿌리다. **출처: 이 이미지 계열의 기반은 공냥이(@specal1849)님의 「공냥 프롬프트 킷」 — https://github.com/kimsh-1/gongnyang-prompt-kit — 산출물에 킷 기반임을 표기할 것.**

---

### Step 1.5: 🎯 AskUserQuestion으로 옵션 수집 (Claude Code 전용)

**CRITICAL: Claude Code *터미널* 세션에서는 `AskUserQuestion` 도구를 사용하여 사용자에게 옵션을 물어봅니다.**

**🚨 Discord/외부 채널 세션 분기 (v2.9.0 — 외부 채널 UI 제약 대응)**: 봇이 Discord 등 외부 채널에서 본 스킬을 실행 중이면 `AskUserQuestion` ❌(외부 채널에는 터미널 UI가 도달하지 않음) → **같은 옵션 구성을 reply 도구의 평문 텍스트 선택지**(①②③… 번호)로 제시하고 사용자 회신으로 진행한다. 옵션 수집 자체를 생략하는 것은 ❌ — 도구만 바뀐다.

목적이 감지되면, 해당 목적에 맞는 옵션을 `AskUserQuestion` 도구로 질문합니다.

#### 🖼️ 이미지 생성 시 질문 (5가지)

```
AskUserQuestion 호출 (questions 배열에 5개 질문 — 용도를 맨 앞에):
[
  {
    "question": "이미지의 용도/매체를 선택해주세요",
    "header": "용도",
    "multiSelect": false,
    "options": [
      {"label": "SNS/일반 (Recommended)", "description": "프로필, 피드, 일반 이미지 — 기본 JSON 구조"},
      {"label": "광고/상품", "description": "메타 광고, 상세페이지, 배너 — 5-stage Framework 적용"},
      {"label": "프레젠테이션", "description": "발표 자료, 슬라이드 삽입"},
      {"label": "콘텐츠/블로그", "description": "블로그, 뉴스레터 삽입"}
    ]
  },
  {
    "question": "이미지 스타일을 선택해주세요",
    "header": "스타일",
    "multiSelect": false,
    "options": [
      {"label": "사진풍 (Recommended)", "description": "실제 사진처럼 사실적인 이미지"},
      {"label": "일러스트", "description": "만화/애니메이션 스타일"},
      {"label": "3D 렌더링", "description": "3D 그래픽 스타일"},
      {"label": "수채화/유화", "description": "전통 회화 스타일"}
    ]
  },
  {
    "question": "이미지 비율을 선택해주세요",
    "header": "비율",
    "multiSelect": false,
    "options": [
      {"label": "1:1 (Recommended)", "description": "정사각형 - SNS, 프로필"},
      {"label": "16:9", "description": "와이드 - 유튜브, 배너"},
      {"label": "9:16", "description": "세로 - 스토리, 릴스"},
      {"label": "4:3", "description": "표준 - PPT, 사진"}
    ]
  },
  {
    "question": "조명 스타일을 선택해주세요",
    "header": "조명",
    "multiSelect": false,
    "options": [
      {"label": "자연광 (Recommended)", "description": "자연스러운 햇빛/실내광"},
      {"label": "스튜디오", "description": "전문 촬영 조명"},
      {"label": "골든아워", "description": "황금빛 일출/일몰"},
      {"label": "네온/드라마틱", "description": "강렬한 색상 조명"}
    ]
  },
  {
    "question": "분위기를 선택해주세요",
    "header": "분위기",
    "multiSelect": false,
    "options": [
      {"label": "밝은/활기찬 (Recommended)", "description": "따뜻하고 긍정적인 느낌"},
      {"label": "어두운/신비로운", "description": "미스터리하고 분위기 있는"},
      {"label": "몽환적/판타지", "description": "꿈결같은 초현실적 분위기"},
      {"label": "역동적/강렬한", "description": "에너지 넘치는 액션 느낌"}
    ]
  }
]
```

> **참고**: 구도(클로즈업/와이드샷 등)는 "기타" 옵션에서 추가 지정 가능

#### 🎬 동영상 생성 시 질문 (5가지)

```
AskUserQuestion 호출 (questions 배열에 최대 4개씩, 2번에 나눠 호출):

[첫 번째 호출 - 모델/스타일]
[
  {
    "question": "동영상 생성 모델을 선택해주세요",
    "header": "모델",
    "multiSelect": false,
    "options": [
      {"label": "Veo 3.1 (Recommended)", "description": "기본 8초 (최대 60초), 네이티브 오디오, 1080p"},
      {"label": "Sora 2", "description": "기본 10초 (최대 15초), 720p"},
      {"label": "Sora 2 Pro", "description": "기본 20초 (최대 25초), 1080p, ChatGPT Pro 필요"}
    ]
  },
  {
    "question": "동영상 스타일을 선택해주세요",
    "header": "스타일",
    "multiSelect": false,
    "options": [
      {"label": "시네마틱 (Recommended)", "description": "영화같은 고퀄리티 영상"},
      {"label": "다큐멘터리", "description": "현실적인 다큐 스타일"},
      {"label": "애니메이션", "description": "만화/애니 스타일"},
      {"label": "뮤직비디오", "description": "빠른 컷, 역동적"}
    ]
  },
  {
    "question": "동영상 길이를 선택해주세요 (모델별 기본 옵션)",
    "header": "길이",
    "multiSelect": false,
    "options": [
      {"label": "기본 (Recommended)", "description": "Veo: 8초 / Sora 2: 10초 / Sora 2 Pro: 20초"},
      {"label": "짧게", "description": "Veo: 4초 / Sora 2: 5초 / Sora 2 Pro: 10초"},
      {"label": "길게 (확장 필요)", "description": "Veo: 30-60초 / Sora 2: 15초 / Sora 2 Pro: 25초"}
    ]
  },
  {
    "question": "카메라 워크를 선택해주세요",
    "header": "카메라",
    "multiSelect": false,
    "options": [
      {"label": "고정샷 (Recommended)", "description": "안정적인 고정 촬영"},
      {"label": "패닝", "description": "좌우로 천천히 이동"},
      {"label": "줌인/줌아웃", "description": "확대/축소 효과"},
      {"label": "트래킹샷", "description": "피사체 따라 이동"}
    ]
  }
]

[두 번째 호출 - 오디오 (Veo 선택 시에만)]
[
  {
    "question": "오디오 구성을 선택해주세요",
    "header": "오디오",
    "multiSelect": false,
    "options": [
      {"label": "환경음만 (Recommended)", "description": "자연스러운 배경 사운드"},
      {"label": "대화 포함", "description": "캐릭터 대사 있음"},
      {"label": "배경음악", "description": "BGM 추가"},
      {"label": "무음", "description": "소리 없이 영상만"}
    ]
  }
]
```

> **참고**: 분위기(평화로운/긴장감 등)는 "기타" 옵션에서 추가 지정 가능
> **참고**: 확장/스토리보드 요청 시 해당 모델의 최대 길이까지 유동적으로 대응

#### 💻 코딩/개발 시 질문 (4가지)

```
AskUserQuestion 호출 (questions 배열에 4개 질문):
[
  {
    "question": "타겟 AI 모델을 선택해주세요",
    "header": "AI 모델",
    "multiSelect": false,
    "options": [
      {"label": "Claude Opus 4.8 (Recommended)", "description": "디폴트 (2026-06-10~), Adaptive Thinking + effort=xhigh, 1M context 기본"},
      {"label": "Claude Fable 5", "description": "최고난도·장기 자율 run·병렬 서브에이전트 — 프롬프트 다이어트 원칙"},
      {"label": "GPT-5.6 Sol", "description": "2026-07 GPT 기본 모델, lean outcome-first (5.5/5.4는 legacy 명시 시)"},
      {"label": "Gemini 3 Pro", "description": "멀티모달 + Grounding Search 강점"}
    ]
  },
  {
    "question": "프롬프트 상세도를 선택해주세요",
    "header": "상세도",
    "multiSelect": false,
    "options": [
      {"label": "상세 (Recommended)", "description": "구조화된 XML 프롬프트"},
      {"label": "보통", "description": "1-2문단 수준"},
      {"label": "간결", "description": "3-5문장 핵심만"}
    ]
  },
  {
    "question": "코드 아키텍처 수준을 선택해주세요",
    "header": "아키텍처",
    "multiSelect": false,
    "options": [
      {"label": "함수/모듈 단위 (Recommended)", "description": "재사용 가능한 함수로 구성"},
      {"label": "클래스 기반", "description": "OOP 패턴 적용"},
      {"label": "전체 시스템", "description": "디렉토리 구조 포함"},
      {"label": "단일 스크립트", "description": "간단한 1파일 코드"}
    ]
  },
  {
    "question": "에러 처리 수준을 선택해주세요",
    "header": "에러처리",
    "multiSelect": false,
    "options": [
      {"label": "기본 try-except (Recommended)", "description": "핵심 에러만 처리"},
      {"label": "상세 에러 처리", "description": "모든 예외 상황 처리"},
      {"label": "로깅 포함", "description": "에러 + 로그 시스템"},
      {"label": "없음", "description": "에러 처리 생략"}
    ]
  }
]
```

> **참고**: 테스트 옵션(유닛테스트/TDD 등)은 "기타" 옵션에서 추가 지정 가능

#### ✍️ 글쓰기/창작 시 질문 (5가지)

```
AskUserQuestion 호출:
- question: "글쓰기 스타일을 선택해주세요"
  header: "스타일"
  options:
    - label: "전문적/공식적 (Recommended)"
      description: "비즈니스, 리포트용"
    - label: "친근한/대화체"
      description: "블로그, SNS용"
    - label: "창의적/문학적"
      description: "스토리, 에세이용"
    - label: "설명적/교육적"
      description: "튜토리얼, 가이드용"

- question: "글 분량을 선택해주세요"
  header: "분량"
  options:
    - label: "중간 (Recommended)"
      description: "1-2문단, 500자 내외"
    - label: "짧은"
      description: "3-5문장"
    - label: "긴"
      description: "여러 문단, 1000자+"
    - label: "시리즈"
      description: "여러 파트로 나눔"

- question: "대상 독자를 선택해주세요"
  header: "대상"
  options:
    - label: "일반 대중 (Recommended)"
      description: "전문 지식 없는 독자"
    - label: "전문가/업계 종사자"
      description: "해당 분야 전문가"
    - label: "초보자/입문자"
      description: "처음 접하는 독자"
    - label: "내부 팀/동료"
      description: "회사/조직 내부용"

- question: "글의 구조를 선택해주세요"
  header: "구조"
  options:
    - label: "서론-본론-결론 (Recommended)"
      description: "전통적인 3단 구성"
    - label: "문제-해결"
      description: "문제 제시 후 해결책"
    - label: "리스트형"
      description: "번호/글머리 나열"
    - label: "스토리텔링"
      description: "내러티브 흐름"

- question: "핵심 메시지/목적을 선택해주세요"
  header: "목적"
  options:
    - label: "정보 전달 (Recommended)"
      description: "객관적 정보 제공"
    - label: "설득/행동 유도"
      description: "독자의 행동 변화 유도"
    - label: "엔터테인먼트"
      description: "재미와 흥미 제공"
    - label: "감정 전달"
      description: "감동, 공감 유발"
```

#### 🔍 분석/리서치 시 질문 (5가지)

```
AskUserQuestion 호출:
- question: "분석 깊이를 선택해주세요"
  header: "깊이"
  options:
    - label: "심층 분석 (Recommended)"
      description: "상세한 데이터 분석"
    - label: "요약 분석"
      description: "핵심만 빠르게"
    - label: "비교 분석"
      description: "여러 항목 비교"
    - label: "트렌드 분석"
      description: "시간에 따른 변화"

- question: "출력 형식을 선택해주세요"
  header: "형식"
  options:
    - label: "표/테이블 (Recommended)"
      description: "데이터 정리에 최적"
    - label: "글머리 목록"
      description: "항목별 나열"
    - label: "서술형"
      description: "문장으로 설명"
    - label: "차트/그래프 제안"
      description: "시각화 방향 포함"

- question: "분석 범위를 선택해주세요"
  header: "범위"
  options:
    - label: "특정 주제 집중 (Recommended)"
      description: "좁고 깊게 분석"
    - label: "넓은 개요"
      description: "여러 주제 넓게"
    - label: "경쟁사/시장 비교"
      description: "외부 비교 포함"
    - label: "내부 데이터 분석"
      description: "자체 데이터 중심"

- question: "분석 기간을 선택해주세요"
  header: "기간"
  options:
    - label: "최근 1년 (Recommended)"
      description: "최신 데이터 기준"
    - label: "전체 기간"
      description: "역사적 관점"
    - label: "최근 분기"
      description: "단기 트렌드"
    - label: "미래 전망"
      description: "예측 포함"

- question: "평가 기준을 선택해주세요"
  header: "기준"
  options:
    - label: "정량적 지표 (Recommended)"
      description: "수치, 통계 중심"
    - label: "정성적 평가"
      description: "품질, 의견 중심"
    - label: "혼합 평가"
      description: "정량+정성 모두"
    - label: "벤치마크 비교"
      description: "업계 표준 대비"
```

#### 🤖 에이전트/자동화 시 질문 (5가지)

```
AskUserQuestion 호출:
- question: "에이전트 복잡도를 선택해주세요"
  header: "복잡도"
  options:
    - label: "단일 에이전트 (Recommended)"
      description: "하나의 작업에 집중"
    - label: "멀티 에이전트"
      description: "여러 에이전트 협업"
    - label: "파이프라인"
      description: "순차적 작업 흐름"
    - label: "계층적"
      description: "오케스트레이터 + 워커"

- question: "도구 사용 범위를 선택해주세요"
  header: "도구"
  options:
    - label: "기본 도구 (Recommended)"
      description: "파일, 검색, 코드 실행"
    - label: "확장 도구"
      description: "MCP, API 연동"
    - label: "최소 도구"
      description: "텍스트 처리만"
    - label: "커스텀 도구"
      description: "맞춤 도구 정의"

- question: "에이전트 권한 수준을 선택해주세요"
  header: "권한"
  options:
    - label: "읽기 전용 (Recommended)"
      description: "조회만 가능, 안전"
    - label: "읽기+쓰기"
      description: "파일 생성/수정 가능"
    - label: "전체 권한"
      description: "시스템 명령 포함"
    - label: "샌드박스"
      description: "격리된 환경에서만"

- question: "자동화 범위를 선택해주세요"
  header: "범위"
  options:
    - label: "단일 작업 (Recommended)"
      description: "한 가지 목표만 수행"
    - label: "반복 작업"
      description: "루프/배치 처리"
    - label: "조건부 분기"
      description: "상황별 다른 처리"
    - label: "전체 워크플로우"
      description: "시작-끝 자동화"

- question: "출력 형식을 선택해주세요"
  header: "출력"
  options:
    - label: "구조화 JSON (Recommended)"
      description: "파싱 용이한 형식"
    - label: "Markdown 리포트"
      description: "사람이 읽기 좋은 형식"
    - label: "로그/스트림"
      description: "실시간 진행 상황"
    - label: "파일 저장"
      description: "결과를 파일로 출력"
```

#### 📊 슬라이드/PPT 생성 시 질문 (4가지)

```
AskUserQuestion 호출 (questions 배열에 4개 질문):
[
  {
    "question": "슬라이드 비주얼 스타일을 선택해주세요",
    "header": "스타일",
    "multiSelect": false,
    "options": [
      {"label": "sketch-notes (Recommended)", "description": "손그림 스타일, 교육/튜토리얼에 최적"},
      {"label": "corporate", "description": "네이비/골드, 투자자 덱/제안서"},
      {"label": "bold-editorial", "description": "매거진 커버풍, 제품 런칭/키노트"},
      {"label": "minimal", "description": "울트라 클린, 경영진 브리핑/프리미엄"}
    ]
  },
  {
    "question": "내러티브 모드를 선택해주세요",
    "header": "내러티브",
    "multiSelect": false,
    "options": [
      {"label": "없음 (Recommended)", "description": "기본 구조, 대부분의 발표에 적합"},
      {"label": "one-more-thing", "description": "스티브 잡스 스타일 - 슬라이드당 1메시지"},
      {"label": "logic-tree", "description": "맥킨지 MECE 구조 - B2B/투자자 덱"},
      {"label": "toss-direct", "description": "토스 스타일 - 3불릿 이하, 즉각 행동 유도"}
    ]
  },
  {
    "question": "슬라이드 수를 선택해주세요",
    "header": "슬라이드 수",
    "multiSelect": false,
    "options": [
      {"label": "8-12장 (Recommended)", "description": "표준 발표, 15-20분 분량"},
      {"label": "5-8장", "description": "짧은 발표, 엘리베이터 피치"},
      {"label": "12-20장", "description": "상세 발표, 30분+ 분량"},
      {"label": "자동 결정", "description": "콘텐츠 분량에 맞게 AI가 결정"}
    ]
  },
  {
    "question": "대상 청중을 선택해주세요",
    "header": "청중",
    "multiSelect": false,
    "options": [
      {"label": "일반 대중 (Recommended)", "description": "비전문가, 넓은 청중"},
      {"label": "경영진/투자자", "description": "C-Level, 의사결정권자"},
      {"label": "기술팀/개발자", "description": "엔지니어, 기술 전문가"},
      {"label": "교육/학생", "description": "학습자, 입문자"}
    ]
  }
]
```

> **참고**: 27개 스타일 전체 목록은 `prompt-engineering-guide.md` 참조. "기타"에서 blueprint, chalkboard, dark-tech 등 추가 스타일 지정 가능

---

### Step 1.7: 중간 구조화 (필수 - 생략 금지)

> ⚠️ **CRITICAL: 동영상/다중이미지/리서치 시 중간 구조화 단계 생략 절대 금지**
> - 동영상 요청 시 **반드시** 스토리보드를 먼저 생성
> - 다중 이미지 요청 시 **반드시** 생성 계획(PRD 스타일)을 먼저 생성
> - 리서치/글쓰기 요청 시 **반드시** 개요를 먼저 생성
> - 이 단계를 건너뛰면 품질이 크게 저하됨

**조건부 실행 테이블:**

| 목적 | 구조화 유형 | 생략 시 | 출력 형식 |
|------|------------|--------|----------|
| **동영상** | 스토리보드 | ❌ 금지 | 시간순 장면 테이블 + JSON |
| **다중 이미지** | 생성 계획 (PRD 스타일) | ❌ 금지 | 이미지별 구성 테이블 |
| **글쓰기/리서치** | 개요 | ❌ 금지 | 섹션별 목록 |
| **슬라이드/PPT** | 아웃라인 + 이미지 프롬프트 | ❌ 금지 | 슬라이드 테이블 + JSON |
| **단일 이미지** | (해당 없음) | ✅ 바로 진행 | - |
| **코딩** | (해당 없음) | ✅ 바로 진행 | - |

목적에 따라 프롬프트 생성 전 **중간 구조화 단계**를 수행합니다.

#### 🎬 동영상: 스토리보드 생성 (필수)

**트리거**: 목적 = 동영상생성 → **반드시 실행**

**자동 수행 (생략 금지):**
1. 사용자 요청을 분석하여 스토리보드 생성
2. 시간순으로 장면 구성 (오프닝 → 전개 → 클라이막스)
3. 각 장면별: 설명, 카메라 워크, 오디오 정의

**스토리보드 출력 형식:**

```markdown
## 📋 스토리보드

| 시간 | 장면 | 설명 | 카메라 | 오디오 |
|------|------|------|--------|--------|
| 0-3초 | 오프닝 | [장면 설명] | [카메라 워크] | [오디오] |
| 3-6초 | 전개 | [장면 설명] | [카메라 워크] | [오디오] |
| 6-10초 | 클라이막스 | [장면 설명] | [카메라 워크] | [오디오] |

---

✅ 이 스토리보드로 프롬프트를 생성할까요? (Y/수정 요청)
```

**사용자 확인 후 → Step 2: 시간초별 프롬프트 생성**

#### 🖼️ 다중 이미지: 생성 계획 (필수)

**트리거**: 목적 = 이미지생성 AND 이미지 수 ≥ 2 → **반드시 실행**

**자동 수행 (생략 금지):**
1. 사용자 요청을 분석하여 생성 계획 작성
2. 공통 스타일/색상 정의
3. 각 이미지별 주제, 핵심 요소, 레이아웃 정의

**생성 계획 출력 형식 (PRD 스타일):**

```markdown
## 📋 생성 계획

### 개요
- **총 이미지 수**: N장
- **공통 스타일**: [스타일]
- **공통 색상**: [색상 팔레트]
- **목적**: [용도]

### 이미지별 구성

| # | 주제 | 핵심 요소 | 레이아웃 |
|---|------|----------|---------|
| 1 | [주제] | [피사체, 배경, 조명] | [구도] |
| 2 | [주제] | [피사체, 배경, 조명] | [구도] |
| ... | ... | ... | ... |

---
✅ 이 계획으로 프롬프트를 생성할까요? (Y/수정)
```

**사용자 확인 후 → Step 2: 이미지별 프롬프트 생성**

#### 📊 슬라이드/PPT: 아웃라인 + 이미지 프롬프트 생성 (MANDATORY)

**트리거**: 목적 = 슬라이드생성 → **반드시 실행**

> baoyu-slide-deck 워크프로세스 기반 + 기존 prompt skills 강점 결합
> 상세 스타일/내러티브 정보: `prompt-engineering-guide.md` 참조

> ⚠️ **출력 방식: md 파일 생성 → 파일 경로 제공**
> 슬라이드 프롬프트는 분량이 많으므로 채팅에 직접 출력하지 않고,
> **Write 도구로 md 파일을 생성**하여 사용자에게 파일 경로를 제공합니다.

**자동 수행 (생략 금지):**

**Phase A: 콘텐츠 분석** (baoyu analysis-framework 기반)
1. 핵심 메시지 1문장 도출 (15자 이내)
2. 지지 포인트 3-5개 우선순위화
3. CTA 정의 (청중이 해야 할 것)
4. 청중 결정 매트릭스 (AskUserQuestion 결과 반영)
5. 콘텐츠-시각화 매핑 (어떤 내용이 도표/일러스트/아이콘에 적합한지)

**Phase B: 아웃라인 생성** (baoyu outline-template 기반)
- 커버: 훅 + 부제
- 컨텍스트: 왜 중요한가 (배경/문제 제기)
- 본론 1-N: 각각 NARRATIVE GOAL + KEY CONTENT + VISUAL + LAYOUT
- 클로징: CTA + 기억될 메시지

**Phase C: 스타일 지시 생성** (STYLE_INSTRUCTIONS 패턴)
- 선택된 스타일의 Design Aesthetic, Color Palette, Typography 외형 설명
- 내러티브 모드 적용 (선택 시)

**Phase D: 슬라이드별 이미지 프롬프트 JSON 생성**
- `shared_style` + 개별 slide prompt
- 16:9 비율 필수, `session_id`로 스타일 일관성 유지
- 폰트명 사용 금지 → 시각적 외형으로 설명

**기존 prompt skills 강점 적용:**
- 전문가 3인 토론: 프레젠테이션 전문가 관점으로 아웃라인 검토 (prompt-engineering-guide.md 참조)
- CE 체크리스트: U자형 배치 (커버/클로징에 핵심 메시지), 핵심 반복
- 5가지 선택지: 아웃라인 확인 후 실행/수정/에이전트 모드 선택

**📁 파일 생성 워크플로우 (채팅 출력 대신 파일 저장):**

1. **Phase A~D 완료 후**, 아래 구조의 md 파일을 Write 도구로 생성
2. **파일 경로**: `slide-prompt-{주제슬러그}-{YYYYMMDD}.md` (현재 작업 디렉토리)
3. **채팅에는 요약만 표시** + 파일 경로 안내

> ⛔ **필수**: 섹션 3 STYLE_INSTRUCTIONS (Hex 색상, 타이포그래피 외형, 비주얼 요소 포함) + 섹션 4 이미지 프롬프트 JSON (슬라이드별 완전한 프롬프트)이 **반드시 포함**되어야 함.
> 아웃라인만 있고 디자인 가이드/이미지 프롬프트가 없는 파일은 **불완전**.

**Write 도구로 생성할 md 파일 구조:**

```markdown
# 📊 슬라이드 프롬프트: {주제}

> 생성일: {YYYY-MM-DD} | 스타일: {스타일} | 내러티브: {모드}

> ⚡ **이 가이드의 STYLE_INSTRUCTIONS(섹션 3)와 이미지 프롬프트 JSON(섹션 4)을 이미지 생성 AI에 전달하여 슬라이드를 생성하세요.**

---

## 1. 콘텐츠 분석

- **핵심 메시지**: [1문장]
- **지지 포인트**: [3-5개]
- **CTA**: [청중 행동]
- **청중**: [대상]

---

## 2. 슬라이드 아웃라인

| # | 유형 | 헤드라인 | 핵심 내용 | 시각 요소 | 레이아웃 |
|---|------|---------|----------|----------|---------|
| 1 | Cover | [훅] | [부제] | [비주얼] | [구도] |
| 2 | Context | [왜 중요한가] | [배경] | [아이콘/차트] | [구도] |
| ... | Content | [메시지N] | [포인트 3개] | [도표/일러스트] | [구도] |
| N | Closing | [CTA] | [요약] | [기억될 이미지] | [구도] |

---

## 3. STYLE_INSTRUCTIONS

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

---

## 4. 이미지 프롬프트 JSON

```json
{
  "session_id": "slides-{topic-slug}-{timestamp}",
  "shared_style": {
    "art_style": "[스타일명] - [Design Aesthetic 설명]",
    "color_palette": "[Color Palette]",
    "typography_appearance": "[글자 외형 설명 - 폰트명 사용 금지]",
    "aspect_ratio": "16:9"
  },
  "slides": [
    {
      "sequence": 1,
      "type": "cover",
      "headline": "[훅]",
      "visual": "[비주얼 설명]",
      "layout": "[구도]",
      "prompt": "[완전한 이미지 생성 프롬프트]"
    }
  ]
}
```

---

## 5. 사용 방법

1. **아웃라인 확인** → 섹션 2 테이블 검토
2. **이미지 생성** → 섹션 4 JSON을 ChatGPT/Gemini에 붙여넣기
3. **baoyu-slide-deck 사용 시** → 섹션 3 + 4를 함께 전달

---

> ⚡ **위 가이드대로 슬라이드를 생성하세요.** 섹션 3 STYLE_INSTRUCTIONS + 섹션 4 JSON을 이미지 생성 AI(ChatGPT, Gemini 등)에 전달하면 됩니다.
```

**채팅 출력 형식 (요약 + 활용 안내):**

```
📊 슬라이드 프롬프트가 파일로 생성되었습니다.

📁 **파일**: `slide-prompt-{주제슬러그}-{날짜}.md`

### 요약
- **핵심 메시지**: [1문장]
- **슬라이드 수**: [N]장 ({스타일} 스타일)
- **구성**: 커버 → 컨텍스트 → 본론 {N}장 → 클로징

### 📋 파일 활용 방법
1. **아웃라인 확인** → 파일의 "2. 슬라이드 아웃라인" 섹션에서 전체 구성 검토
2. **이미지 생성** → "4. 이미지 프롬프트 JSON" 섹션을 복사하여:
   - **ChatGPT**: 대화창에 붙여넣기 → gpt-image로 자동 생성
   - **Gemini**: 대화창에 붙여넣기 → "한 장씩 순차 생성, 끝까지 다 생성해주세요" 추가
3. **baoyu-slide-deck 사용 시** → "3. STYLE_INSTRUCTIONS" + "4. JSON"을 함께 전달
4. **수정 필요 시** → "아웃라인 수정해줘", "스타일 변경해줘" 등 요청

✅ 아웃라인 수정이 필요하면 말씀해주세요.
```

**사용자가 수정 요청 시**: 파일을 Edit 도구로 수정 후 다시 요약 표시

#### ✍️ 글쓰기/리서치: 개요 생성

**트리거**: 목적 = 글쓰기/창작 OR 분석/리서치 OR 팩트체크

> 🔴 **CRITICAL**: 분석/리서치/팩트체크 목적이면 일반 개요로 생성하지 말고 **`prompt-engineering-guide.md`의 IFCN 기반 워크플로우**를 베이스로 사용하세요.
>
> | 목적 세부 | 베이스 워크플로우 | 출처 파일 |
> |----------|----------------|----------|
> | 종합 리서치 / 일반 조사 | `StructuredResearch_v1.0` 4-stage (ScopeDefinition → DataCollection → Analysis → Synthesis) | `prompt-engineering-guide.md` |
> | 시장 조사 | `MarketResearchPrompt` (시장 개요 → 경쟁 → 고객 → 기회/위협) | `02-general-research.md` |
> | 경쟁사 분석 | `CompetitiveAnalysisPrompt` (제품 → 시장 위치 → 전략 → 역량) | `02-general-research.md` |
> | 학술/기술 리서치 | `AcademicResearchPrompt` (문헌 검토 → 방법론 → 핵심 발견) | `02-general-research.md` |
> | 팩트체크 (단계별/대화형) | `LoopFactChecker_UI_v1.2` 4-stage (Baseline → Evidence → CounterClaims → Synthesis) | `01-factcheck-prompts.md` |
> | 팩트체크 (빠른 검증 / Chain-of-Verification) | `QuickFactCheck` | `01-factcheck-prompts.md` |
>
> 모든 리서치/팩트체크 워크플로우는 IFCN 5대 원칙(초당파성·정보투명성·재원투명성·방법론투명성·정직한수정) + 최신성 정책(오늘 → 전날 → 1주일 → 1개월) + 국가/지역 소스 우선 원칙을 포함해야 합니다.

**자동 수행 (글쓰기/창작):**
1. 사용자 요청을 분석하여 개요(아웃라인) 생성
2. 논리적 구조로 섹션 구성
3. 각 섹션별: 목표, 핵심 포인트 정의

**자동 수행 (분석/리서치/팩트체크):**
1. Read 도구로 `prompt-engineering-guide.md` + 매칭되는 서브파일 로드
2. 매칭 베이스 템플릿(위 표) 채택
3. 사용자 주제/지시문을 `<Topic>` / `<Source>` / `<Target>` 등 placeholder에 주입
4. IFCN 원칙 + 최신성 정책 블록 보존
5. Step 2에서 모델별 최적화 블록 + CE 체크리스트 적용

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

**사용자 확인 후 → Step 2: 섹션별 프롬프트 생성**

---

### Step 2: 프롬프트 생성 (진행 상황 표시)

**🔄 진행 상황 표시 (필수)**

프롬프트 생성 중 **반드시 아래 상태 메시지를 순서대로 출력**합니다:

```
🔍 요청 분석 중... → ✅ 목적: [감지된 목적], 형식: [출력 형식]
🧠 전문가 토론 진행 중... (약 5-10초)
✅ 프롬프트 생성 완료!
```

**CE 체크리스트 (자동 적용)**

| 원칙 | 적용 방법 |
|------|----------|
| **U자형 배치** | 시작: Critical Rules / 끝: Final Reminder |
| **Lost-in-Middle 방지** | 핵심 규칙 시작+끝 반복 |
| **Signal-to-Noise** | 장황한 설명 → 표/글머리 |

**모델별 필수 블록**

| 모델 | 필수 블록 / 구조 |
|------|-----------------|
| **GPT-5.6 Sol (디폴트)** | Markdown lean outcome-first — 열거 최소화, 짧고 정확한 지시 (요약 — 전체 블록 구조는 `skills/gpt-5.6-prompt-enhancement.md` 참조) |
| GPT-5.5 (legacy outcome-first) | Markdown 6섹션: `Role` / `# Personality` / `# Goal` / `# Success Criteria` / `# Constraints` / `# Output` / `# Stop Rules`. 도구 워크플로면 Preamble 1줄 추가. **상세**: `prompt-engineering-guide.md` |
| GPT-5.2/5.4 (legacy XML) | `<output_verbosity_spec>`, `<output_contract>`, `<completeness_contract>`, `<tool_persistence>`. **상세**: `prompt-engineering-guide.md` 하단 Legacy 섹션 |
| **Claude Opus 4.8 (디폴트)** | 4.7 블록 동일 + literal 해석 범위 명시("every section") + 코드리뷰는 coverage/filter 분리 프롬프트 + 디자인은 구체 스펙 또는 "4방향 제안" 패턴. `thinking: {type: "adaptive"}` + `effort: "xhigh"`(코딩) |
| **Claude Fable 5** | **장문 열거 ❌ — 짧은 지시 1개씩** (brevity·체크포인트·grounding·경계 스니펫은 `skills/claude-fable-5-prompt-strategies.md`). reasoning 재출력 지시 금지(refusal). adaptive thinking 전용 |
| Claude Opus 4.7 | `<use_parallel_tool_calls>`, `<investigate_before_answering>`, `<default_to_action>`, `<explicit_scope>` (리터럴 해석 대응), `thinking: {type: "adaptive"}` + `output_config: {effort: "xhigh"}` |
| Claude Opus 4.6 (레거시) | `<default_to_action>` (Adaptive Thinking 자동) |
| Gemini 3 | Constraints 최상단 |
| 이미지/동영상 | 주제/스타일/분위기 |

> **GPT 모델 라우팅**: 미지정 GPT → **GPT-5.6 Sol lean outcome-first 디폴트**. `GPT-5.5` 명시 → 5.5 outcome-first(legacy). `GPT-5.4 / 5.2 / legacy XML` 명시 시에만 XML stack 적용.

**📚 리서치/팩트체크 템플릿 자동 로드 (CRITICAL — /deep-research 통합 핵심)**

> 목적이 `팩트체크`, `리서치/조사`, `분석/리서치`로 감지되면 **반드시 다음 절차**를 따릅니다.
> 일반 XML 프롬프트로 대체 생성 금지. 누락 시 `/deep-research` 워커 품질이 격하됩니다.

**Step 2-A: 단일 스킬 로드** (프로젝트 루트 기준 상대 경로)

1. `Read(".claude/skills/prompt-engineering-guide.md")`
2. 목적에 따라 이 파일 안의 리서치/팩트체크, 이미지/동영상, 슬라이드, 모델별 전략 섹션을 사용
3. 팩트체크/리서치 시 IFCN 원칙, 최신성 정책, 국가/지역 소스 우선 원칙을 보존
4. 모델별 시스템 프롬프트가 필요하면 같은 파일의 GPT/Claude/Gemini 섹션을 함께 적용

> 경로는 단일 파일만 사용합니다. 분리된 서브 스킬 경로를 만들거나 로드하지 않습니다.

**Step 2-B: 베이스 템플릿 선택**

| 지시문 패턴 | 선택할 베이스 템플릿 |
|------------|-------------------|
| "팩트체크", "사실 확인", "검증해줘", "단계별로 검증" | `<FactCheckPrompt name="LoopFactChecker_UI_v1.2">` (4-stage IFCN) |
| "빠른 팩트체크", "Chain-of-Verification", "핵심 주장 검증" | `<QuickFactCheck>` |
| "종합 리서치", "조사해줘", "찾아줘", "리서치 보고서" | `<ResearchPrompt name="StructuredResearch_v1.0">` |
| "시장 조사", "market research", "시장 규모", "시장 트렌드" | `<MarketResearchPrompt>` |
| "경쟁사 분석", "경쟁 분석", "competitor analysis" | `<CompetitiveAnalysisPrompt>` |
| "학술", "논문", "academic research", "기술 리서치" | `<AcademicResearchPrompt>` |
| "교차검증", "소스 모순", "독립 소스 확인" | `<FactCheckPrompt name="LoopFactChecker_UI_v1.2">` Stage 3 (CounterClaimsSearch) 강조 |

**Step 2-C: 베이스 템플릿 커스터마이징**
1. 베이스 XML 템플릿을 그대로 복사
2. Placeholder 치환:
   - `<Topic>[리서치 주제]</Topic>` → 사용자 지시문/주제
   - `<Source>[검증할 URL/문서/텍스트]</Source>` → 사용자가 제공한 검증 대상
   - `<Target>[조사 대상]</Target>` → 사용자 지시문
3. **IFCN 5대 원칙 + RecencyPolicy + CountrySourcePolicy 블록은 절대 삭제 금지**
4. 모델별 최적화 블록을 베이스 템플릿 안에 병합:
   ```xml
   <ResearchPrompt name="StructuredResearch_v1.0">
     <ModelOptimization model="Claude">
       <default_to_action>...</default_to_action>
       <use_parallel_tool_calls>...</use_parallel_tool_calls>
     </ModelOptimization>
     <!-- 또는 -->
     <ModelOptimization model="GPT-5.2">
       <output_verbosity_spec>...</output_verbosity_spec>
       <web_search_rules>...</web_search_rules>
       <uncertainty_and_ambiguity>...</uncertainty_and_ambiguity>
     </ModelOptimization>
     <!-- ... 베이스 템플릿의 나머지 ... -->
   </ResearchPrompt>
   ```
5. CE 체크리스트(U자형 배치, Lost-in-Middle 방지) 적용

**Step 2-D: 검증 (필수)**
출력 직전 다음을 확인:
- [ ] 베이스 템플릿(LoopFactChecker / StructuredResearch / 등)이 XML 루트에 존재
- [ ] IFCN 5대 원칙 블록 포함
- [ ] RecencyPolicy(오늘 → 전날 → 1주일 → 1개월) 포함
- [ ] 사용자 주제/지시문이 placeholder에 정확히 주입됨
- [ ] 모델별 최적화 블록(Claude/GPT/Gemini) 병합됨
- [ ] 출력 형식(인라인 인용, 신뢰도 등급, References) 명시됨

**금지 사항:**
- ❌ `prompt-engineering-guide.md`를 로드하지 않고 일반 `<ResearchPrompt>` 직접 작성
- ❌ IFCN 원칙·RecencyPolicy·CountrySourcePolicy 블록 누락
- ❌ 베이스 템플릿의 4-stage Workflow를 임의로 압축/생략
- ❌ 인라인 인용 / References 섹션 누락

**🖼️ 이미지/동영상 프롬프트 출력 형식 (CRITICAL)**

이미지 또는 동영상 프롬프트 생성 시:
1. **반드시 JSON 구조로 출력** (자연어 출력 금지)
2. 본 파일의 "이미지 프롬프트 JSON 구조" 또는 "동영상 프롬프트 JSON 구조" 섹션 템플릿 사용
3. `details` 필드만 자연어로 유연하게 작성

**🎯 역할(Role) 직접 전문가 지명 (CRITICAL)**

> 프롬프트의 `<role>` 블록에 반드시 실존 전문가를 직접 지명한다.
> `prompt-engineering-guide.md` DB에서 해당 도메인 전문가를 찾아 적용.
> DB에 없으면 **되도록 웹 검색하여** 해당 분야 실존 전문가를 찾아 적용 (일부 일상적 작업은 전문가 특정이 어려울 수 있음, 그래도 시도할 것).

```
정규 패턴: <role>당신은 [전문가명]입니다. [프레임워크]에 입각하여 [행동]합니다.</role>
⛔ 금지: "~철학을 체화한", "~원칙을 체화하여", "~을 체화한 전문가" 등 간접 표현
```

**전문가 3인 토론 (간략 진행)**

> `prompt-engineering-guide.md` 참조하여 **실존 전문가 관점**으로 검토
> 내부 토론 후 **핵심 결정만 1줄로 표시**: "💡 [적용된 주요 개선점]"

| 역할 | 검토 초점 |
|------|----------|
| Expert 1 | CE 원칙, 토큰 효율, **이미지 시 토큰 순서 검증** (구체 명사 앞 배치? 추상어 시각 재기술?) |
| Expert 2 | 해당 도메인 실존 전문가 관점으로 내용 정확성, 전문 용어 검증 |
| Expert 3 | 최종 결정, 조율 |

---

### Step 3: 프롬프트 출력 + 개선 옵션 제시 (필수)

> ⚠️ **CRITICAL: 프롬프트 출력 후 5가지 옵션 반드시 제시**
> - 프롬프트만 출력하고 응답 종료 = **절대 금지**
> - "어떻게 하시겠습니까?" 섹션 = **필수 포함**
> - 이 단계를 생략하면 사용자가 다음 행동을 알 수 없음

**출력 형식 (프롬프트는 반드시 코드블록으로 출력):**

```markdown
## ✅ 프롬프트 생성 완료

```
[생성된 프롬프트 - 반드시 코드블록 안에 출력]
```

---

📋 **전문가 검토 완료** | CE 체크리스트 ✅ | 모델 최적화 ✅

---

## 어떻게 하시겠습니까?

1️⃣ **바로 실행** - 해당 프롬프트로 작업 바로 실행
2️⃣ **자동 개선** - AI가 자동으로 프롬프트 강화 → 수정된 프롬프트 출력 (실행 ❌)
3️⃣ **직접 개선** - 제시되는 옵션 중 선택하여 수정 → 수정된 프롬프트 출력 (실행 ❌)
4️⃣ **기타** - 다른 요청 또는 질문
5️⃣ **에이전트 모드** - AI와 대화하며 프롬프트를 단계별로 완성 (최적의 결과물 도출)

💬 **선택하세요** (예: "1", "2", "3", "4", "5")

---

> **💡 이미지/동영상 프롬프트인 경우에만 아래 안내 표시:**
>
> 🖼️ **이미지 생성**: 플랫폼별 도구 사용 (ChatGPT: gpt-image 자동 / Gemini: 좌측 하단 도구 → 이미지 생성하기)
>
> 📸 **다중 이미지 생성 시 추가 안내**: gemini에서 여러 장의 이미지를 생성할 경우, **'한 장씩 순차적으로 생성, 반드시 끝까지 다 생성해주세요'**도 함께 입력해주세요
>
> 🎬 **동영상 생성**: 위 코드를 복사하여 아래 링크에서 사용하세요.
> - **Veo 3.1 (Flow)**: https://labs.google/fx/tools/flow
> - **Sora 2**: https://sora.com
```

**🎨 개선 옵션 (3번 선택 시에만 아래 옵션 표시)**

```markdown
### 🎨 개선 옵션

**공통:**
- 상세도 조절: 간결(3-5문장) / 보통(1-2문단) / 상세(구조화)
- 예시 추가 (입출력 샘플)
- 제약조건 추가 (하지 말아야 할 것)
- 출력형식 변경 (JSON, 표, 글머리 등)
- 역할 강화 (전문가 페르소나)
- 단계별 사고 추가 (Chain of Thought)

**🖼️ 이미지 전용:**
- 비율: 1:1 / 16:9 / 9:16 / 4:3
- 스타일: 사진풍 / 일러스트 / 3D / 수채화 / 사이버펑크
- 조명: 자연광 / 스튜디오 / 골든아워 / 네온
- 앵글: 클로즈업 / 와이드샷 / 버드아이뷰 / 로우앵글

**🎬 동영상 전용:**
- **모델별 기본 길이 (확장 미사용)**:
  - Veo 3.1: 4초 / 6초 / 8초 (기본)
  - Sora 2: 5초 / 10초 (기본)
  - Sora 2 Pro: 10초 / 15초 / 20초 (기본)
- **확장/스토리보드 시**: 모델별 최대 길이까지 유동 대응
- 오디오: 대화 / 배경음악 / 효과음 (Veo만 네이티브 지원)
- 카메라: 패닝 / 줌인 / 트래킹샷
- 부정 프롬프트: 제외할 요소

💬 **선택하세요** (예: "비율 16:9, 스타일 사이버펑크")
```

---

### Step 4: 프롬프트 수정 워크플로우 (2번/3번 선택 시)

**CRITICAL: 수정 시에는 프롬프트만 출력, 바로 실행 금지**

```
수정 요청 (2번 또는 3번)
   ↓
수정된 프롬프트 생성 (전문가 토론 백그라운드 실행)
   ↓
수정된 프롬프트 출력
   ↓
다시 5가지 선택지 제시 (Step 3으로 복귀)
```

**수정 후 출력 형식:**

```markdown
## ✅ 프롬프트 수정 완료

**수정 사항:** [적용된 변경 내용]

[수정된 프롬프트 코드블록]

---

📋 **전문가 검토 완료** | CE 체크리스트 ✅ | 모델 최적화 ✅

---

## 어떻게 하시겠습니까?

1️⃣ **바로 실행** - 해당 프롬프트로 작업 바로 실행
2️⃣ **자동 개선** - AI가 자동으로 프롬프트 강화
3️⃣ **직접 개선** - 옵션 선택하여 추가 수정
4️⃣ **기타** - 다른 요청 또는 질문
5️⃣ **에이전트 모드** - AI와 대화하며 프롬프트를 단계별로 완성
```

---

### Step 5: 에이전트 모드 (5번 선택 시)

AI와 대화하며 프롬프트를 단계별로 최적화합니다.

**에이전트 모드 시작 출력:**

```markdown
🤖 **에이전트 모드 진입**

현재 프롬프트를 분석했습니다. 다음 영역을 개선할 수 있습니다:

1. **[영역1]**: [현재 상태] → [개선 가능한 방향]
2. **[영역2]**: [현재 상태] → [개선 가능한 방향]
3. **[영역3]**: [현재 상태] → [개선 가능한 방향]

💬 어느 영역을 먼저 개선할까요? (번호 또는 질문을 입력하세요)
```

**에이전트 모드 워크플로우:**

```
사용자: 5번 선택
   ↓
AI: 현재 프롬프트 분석 + 개선 가능 영역 3-5개 제시
   ↓
사용자: 영역 선택 또는 질문
   ↓
AI: 해당 영역에 대한 세부 옵션 제시 또는 질문 응답
   ↓
(반복 - 사용자가 만족할 때까지)
   ↓
사용자: "완료" 또는 "이걸로 실행"
   ↓
AI: 최종 프롬프트 출력 + 5가지 선택지 (Step 3으로 복귀)
```

**에이전트 모드 개선 영역 예시:**

| 목적 | 제안 영역 |
|------|----------|
| **이미지** | 피사체 디테일, 스타일 일관성, 조명/분위기, 구도 최적화, 네거티브 프롬프트 |
| **동영상** | 동작 시퀀스, 카메라 워크, 오디오 레이어, 장면 전환, 타이밍 조절 |
| **코딩** | 에러 핸들링, 성능 최적화, 테스트 케이스, 문서화, 확장성 |
| **글쓰기** | 톤 조절, 구조 강화, 예시 추가, 청중 맞춤, 핵심 메시지 |
| **분석** | 데이터 범위, 비교 기준, 시각화, 인사이트 깊이, 액션 아이템 |
| **에이전트** | 도구 구성, 권한 설정, 에러 복구, 출력 형식, 체크포인트 |

---

## 이미지 프롬프트 JSON 구조 (기본 형식)

> **토큰 순서 = JSON 필드 순서 = 어텐션 가중치 순서.**
> Cross-Attention 이론상 앞쪽 필드가 더 강한 가중치를 받으므로, 핵심(목적/피사체)을 앞에, 제약/분위기를 뒤에 배치합니다.
> Ref: @specal1849 이미지 프롬프트 이론 (Prompt-to-Prompt, Cross-Attention Control)

**단일 이미지 — 기본 (SNS/일반):**
```json
{
  "subject": "주제 - 핵심 피사체 (구체 명사 + 시각적 속성을 앞에)",
  "style": "스타일 - 사진풍/일러스트/3D/수채화 등",
  "mood": "분위기 - 추상어 금지, 시각적으로 재기술 (Visual Re-description)",
  "composition": "구도 - 앵글, 프레이밍",
  "lighting": "조명 - 자연광/스튜디오/골든아워 등",
  "details": "세부사항 - 추가 디테일 (자연어로 유연하게)",
  "aspect_ratio": "16:9"
}
```

**단일 이미지 — 광고/상품용 (5-stage Framework):**

> 사용자가 "광고/상품" 용도를 선택했을 때 이 구조를 사용합니다.
> 필드 순서가 Cross-Attention 레이어별 처리 순서와 일치합니다.

```json
{
  "purpose": "Stage 1 — 비즈니스 목적 + 매체/포맷 (메타 광고 4:5, 상세페이지 히어로 등)",
  "hero": "Stage 2 — 주 피사체 (구체 명사 + 시각적 속성. '프리미엄 무선 헤어스타일러' 처럼 수식어가 톤 제어)",
  "context": "Stage 3 — 사용자 맥락 / 문제 상황 (타깃의 실제 사용 장면)",
  "evidence": "Stage 4 — 시각적 증거 (전후 대비, 제형, 재질, UI 상태, 사용 흔적)",
  "style": "스타일",
  "mood": "분위기 (추상→시각 재기술: '빠른 진정' → '붉고 거친 피부 vs 촉촉하고 편안해진 피부')",
  "lighting": "조명",
  "composition": "구도",
  "constraints": "Stage 5 — 디자인 제약 (여백, 배지 영역, CTA 영역, 금지 요소, 모바일 가독성)",
  "aspect_ratio": "4:5"
}
```

**다중 이미지:**
```json
{
  "shared_style": {
    "art_style": "공통 스타일",
    "color_palette": "공통 색상",
    "aspect_ratio": "16:9"
  },
  "images": [
    { "sequence": 1, "description": "첫 번째 이미지 설명" },
    { "sequence": 2, "description": "두 번째 이미지 설명" }
  ]
}
```

---

## 동영상 프롬프트 JSON 구조

> **모든 동영상에 스토리보드 형식 적용** (단일 클립도 scenes 배열 사용)

```json
{
  "model": "Veo 3.1",
  "shared_style": {
    "visual_style": "스타일 (cinematic, animation, realistic 등)",
    "color_grade": "색보정 톤",
    "aspect_ratio": "16:9"
  },
  "scenes": [
    {
      "sequence": 1,
      "duration": "8s",
      "description": "장면 + 캐릭터 행동 + 조명/빛",
      "camera": "카메라 위치 + 모션 (dolly, pan, tracking 등)",
      "audio": "대사 + 효과음 + 배경음"
    }
  ],
  "negative": "제외 요소 (단순 나열)",
  "details": "품질 지시사항"
}
```

**필수 요소 (공식 가이드 기준):**
- **Subject**: 피사체 (사람, 동물, 사물, 풍경)
- **Action**: 동작 (걷기, 달리기, 회전 등)
- **Style**: 영상 스타일 (SF, 필름누아르, 애니메이션 등)
- **Camera**: 위치 + 모션 (aerial, eye-level, dolly, POV)
- **Audio**: 대사(따옴표), 효과음, 환경음

**오디오 표기법:**
- 대화: '따옴표' 사용 (예: 'Hello, how are you?')
- 음향효과: 명시적 설명 (예: door creaking, footsteps on gravel)
- 배경음: 환경 설명 (예: ambient city noise, gentle rain)

---

## 이미지 비율 가이드

| 비율 | 용도 | 권장 상황 |
|------|------|----------|
| **1:1** (기본값) | 정사각형 | SNS 프로필, 아이콘, 일반 이미지 |
| **16:9** | 와이드 | 유튜브 썸네일, 프레젠테이션, 배너 |
| **9:16** | 세로 | 스마트폰 배경, 스토리, 릴스 |
| **4:3** | 표준 | 프레젠테이션, 사진 |
| **3:4** | 세로 표준 | 포트레이트, 인물 사진 |

---

## 참조 스킬

| # | 파일명 | 용도 | 필수 여부 |
|---|--------|------|----------|
| 1 | `prompt-engineering-guide.md` | 모델별 전략, 이미지/동영상, 리서치/팩트체크, 슬라이드, 전문가 프라이밍, Context Engineering을 모두 포함한 단일 권원 | ✅ 필수 |

---

## 💡 동영상 생성 방법 안내

프롬프트를 복사하여 아래 플랫폼에서 생성:

| 플랫폼 | 링크 |
|--------|------|
| **Sora 2** | https://sora.com |
| **Veo 3.1 (Flow)** | https://labs.google/fx/tools/flow |

---

<final_reminder priority="CRITICAL">
**🎯 당신은 프롬프트 생성기입니다. 이미지/동영상 생성기가 아닙니다.**

**올바른 워크플로우:**
1. [조건부] 중간 구조화 (동영상→스토리보드, 다중이미지→생성계획, 리서치→개요)
2. 프롬프트 생성 (JSON/XML)
3. 프롬프트 코드블록 출력
4. **5가지 옵션 반드시 제시** ← 절대 생략 금지!
5. 사용자 "1번" 선택 대기
6. (1번 선택 시) 해당 작업 실행

**⚠️ 절대 금지:**
- 프롬프트 출력 없이 바로 작업 실행 ❌
- "1번" 선택 전 작업 실행 ❌
- **프롬프트만 출력하고 옵션 제시 없이 끝내기** ❌
- 동영상 요청 시 스토리보드 생략 ❌
- 다중 이미지 요청 시 생성 계획 생략 ❌
- 리서치/글쓰기 요청 시 개요 생략 ❌

<output_required>
  프롬프트 출력 후 반드시 다음을 포함:
  - "어떻게 하시겠습니까?" 질문
  - 5가지 선택지 (1️⃣~5️⃣)
  - "💬 선택하세요" 안내
</output_required>
</final_reminder>

---

## 사용 예시

```
/prompt
→ $ARGUMENTS 분석 후 즉시 프롬프트 생성 + 개선 옵션 제시

/prompt Claude로 블로그 글 작성용 프롬프트 만들어줘
→ Claude Opus 4.8 (디폴트) + 글쓰기 목적으로 즉시 생성 + 개선 옵션 제시

/prompt 코딩용 프롬프트 만들어줘
→ LMArena 순위 기반 최적 모델로 즉시 생성 + 개선 옵션 제시
```

---

## Metadata

- **Version**: 2.11.3
- **Updated**: 2026-07-21
- **Changes v2.11.3** (2026-07-21):
  - **[LOW] --batch 리서치 흐름 "모델별 필수 블록" 표 GPT-5.6 행 신설**: 독립 검토 지적 — 1번째 토큰 표는 GPT-5.6이 1급인데 후속 필수 블록 표가 5.2/5.4 XML만 나열하던 내부모순 해소. GPT-5.6 Sol 디폴트 = Markdown lean(`# Success Criteria`/`# Stop Rules`), 구 XML 행은 legacy 명시 시로 조건화 (deep-research v2.1.1 라우팅 정합)
- **Changes v2.11.2** (2026-07-21):
  - **[MEDIUM] prompt-variation-guide 스킬 현행화 (재경님 지적 — 동일 플러그인 나머지 스킬 통누락 해소)**: SKILL.md v1.1.0 — Part 3.3 성격 표 GPT-5.2/Claude 4.5/Gemini 3 → **GPT-5.6 Sol**(Markdown lean outcome-first)·**Claude Opus 4.8·Fable 5**·**Gemini 3.1**, anti-pattern #6 을 5.6 기준(Success Criteria/Stop Rules)으로, techniques/examples 라벨 재정비(GPT XML 예시 = 구 5.2 세대 스타일 명시, Claude XML = 현행 유효)
  - **[LOW] prompt-update.md 모델 믹스 현행화**: Workers/DA Sonnet 4.6 → Sonnet 5
- **Changes v2.11.1** (2026-07-21):
  - **[LOW] research-prompt-guide §3 모델별 최적화 현행화**: GPT-5.2/Gemini 3/Claude 4.5 라벨 → 현행 포인터(§3 헤더에 GPT-5.6 Thinking 팩트체크 고정·Opus 4.8 Search 명시, GPT XML 템플릿은 구 5.2 참고 보존, Claude XML 템플릿은 Opus 4.8·Fable 5 유효 명시, Gemini 3→3.1), frontmatter 참조 gpt-5.5→5.6
- **Changes v2.11.0** (2026-07-21):
  - **[MAJOR] GPT 디폴트 = GPT-5.6 Sol 승격**: 모델 라우팅 표에 5.6 행 신설(미지정 GPT → `skills/gpt-5.6-prompt-enhancement.md` lean outcome-first), 5.5/5.4/5.2는 legacy 명시 시. --batch 1번째 토큰에 `GPT-5.6` 추가, AskUserQuestion 옵션·추천 모델 표·팩트체크 순위 갱신
  - **[MAJOR] 구세대 잔존 표기 일소**: Gems 지침 v2.6.0(디폴트 4.7→4.8·Fable 5 신설·분할 파일 02 rankings의 4.6-era 정리 + dead 파일 참조 `claude-4.6-prompt-strategies.md` 수정), GPTs 지침 v2.6.0(동일), 통합 가이드 v3.1.0(Claude 현행 전략 섹션 신설 — Fable 5·Opus 4.8·Sonnet 5, 기존 4.x 섹션 구세대 참고로 재분류)
  - **[MEDIUM] 플러그인 재패키징**: tofukyung-portlab `prompt-generator` 포트 v2.9.0 → v2.11.0 (설치 캐시 최신화)
- **Changes v2.10.1** (2026-07-18):
  - **[MEDIUM] AUTO 모드 "3.5 산출 자가진단" 게이트 신설**: 실행 직전 ①프롬프트 코드블록 실제 생성 여부 ②`<role>` 실존 전문가 직접 지명 여부 ③프롬프트 전문의 SoT 저장 여부 3항목 체크 — 하나라도 미충족이면 실행 대신 생성 단계(2)로 복귀. 워크플로우 규격이 컨텍스트에 있어도 단계를 건너뛰는 사례에 대한 방지책
- **Changes v2.10.0** (2026-07-15):
  - **[MAJOR] 🔁 AUTO 모드 신설**: 자율 작업 흐름의 hook-강제 호출 시 1회 자동 개선 → 바로 실행 (5옵션 사용자 대기 우회 — 유일한 구조적 예외)
- **Changes v2.8.0** (2026-06-10):
  - **[MAJOR] Claude 디폴트 = Opus 4.8 격상**: 라우팅 디폴트 4.7 → **4.8** (1M context 기본). Fable 5 명시 라우팅 신설. 공식 가이드 2종([Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8)·[Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5)) 반영
  - **[MAJOR] `skills/claude-fable-5-prompt-strategies.md` 신규**: Fable 5·Opus 4.8 전략 (프롬프트 다이어트 원칙·grounding 스니펫·reasoning 재출력 금지·코드리뷰 coverage/filter 분리)
  - **[MEDIUM] 추천 모델 표·AskUserQuestion 옵션·모델별 필수 블록에 4.8/Fable 5 반영** (4.7/4.6 first-class 유지)
- **Changes v2.6.0** (2026-04-30):
  - **[MAJOR] GPT-5.5 공식 outcome-first 가이드 반영**: [GPT-5.5 Prompt Guidance](https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5) 2026-04 발표. XML 12블록 stack → Markdown 6섹션 (Role / Personality / Goal / Success Criteria / Constraints / Output / Stop Rules) 전환
  - **[MAJOR] prompt-engineering-guide.md 신규 스킬 추가** (v1.0.0): 6개 핵심 블록 정의(outcome_first_structure, personality_and_collaboration, constraints_block, output_contract, stop_rules, validation_rules) + Migration 매핑 + Anti-patterns
  - **[MAJOR] 모델 라우팅 추가**: 사용자 명시(GPT-5.5 / GPT-5.4 / legacy XML) 또는 일반 GPT 작업 시 자동 분기. 5.5 디폴트 + 5.4는 명시 시 fallback
  - **[MEDIUM] prompt-engineering-guide.md → v1.1.1 (legacy 명시)**: 제목·헤더에 "Legacy XML Stack" 추가, GPT-5.5 분리 안내
  - **[MEDIUM] 모델별 필수 블록 테이블 재구성**: GPT-5.5 outcome-first 6섹션 / GPT-5.2-5.4 legacy XML stack 분리
  - **[MEDIUM] GPT-5.5 현황 섹션 전면 갱신** (v2.5.0의 "API 미공개" → 공식 가이드 발표 반영)
  - **[LOW] Anti-Patterns 추가**: judgment 영역 ALWAYS/NEVER 회피, step sequence 강요 회피, retrieval 남용 회피, plain paragraph 디폴트
- **Changes v2.5.0** (2026-04-24):
  - **[MAJOR] Claude Opus 4.7 공식 프롬프팅 가이드 반영**: [platform.claude.com](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) + [Adaptive thinking](https://platform.claude.com/docs/en/docs/build-with-claude/adaptive-thinking) + [Migrating to Claude 4](https://platform.claude.com/docs/en/docs/about-claude/models/migrating-to-claude-4) 3종 공식 문서 기반. 10개 핵심 원칙 블록 신설(Breaking Changes, Effort 레버, Literal Interpretation, XML 구조화, Parallel Tool Call, Thinking Steering, Investigate Before Answer, Prefill 마이그레이션, task_budget beta, 이미지 입력)
  - **[MAJOR] 모델 순위 전면 업데이트**: Claude Opus 4.6 → **Claude Opus 4.7** (2026-04-16 공식 출시). 코딩/Hard Prompts 1순위 유지. "에이전틱 (1M context)" 신규 행 추가 (Opus 4.7 adaptive thinking + task_budget vs GPT-5.5 Codex Browser Use)
  - **[MAJOR] Opus 4.7 Breaking Changes 경고**: `budget_tokens` 제거 → `adaptive` 전용, `temperature/top_p/top_k` 400 에러, prefill 400 에러. 구 프롬프트 호환성 브레이킹 포인트 명시
  - **[MEDIUM] GPT-5.5 (2026-04-23) 표기**: ChatGPT/Codex 전용, API 미공개. Browser Use + Auto-approval Review + 40% 토큰 효율. 공식 프롬프팅 가이드 미발표 → GPT-5.4 가이드 계승
  - **[MEDIUM] Step 1.5 AskUserQuestion 모델 옵션 확장**: 3개 → 4개 (Opus 4.7 / GPT-5.5 Codex / GPT-5.4 / Gemini 3 Pro). 각 모델 사용 경로 명시
  - **[MEDIUM] 모델별 필수 블록 테이블 재구성**: Opus 4.7용 `<use_parallel_tool_calls>`, `<investigate_before_answering>`, `<explicit_scope>` 명시 + `thinking: adaptive` + `effort=xhigh` 기본값
  - **[MEDIUM] Batch 모드 GPT-5.5 토큰 추가**: `GPT-5.5`를 1번째 토큰으로 허용 (GPT-5.4 파라미터 계승)
  - **[LOW] prompt-engineering-guide.md 설명 확장**: 4.5/4.6/4.7 통합 전략으로 표기 (파일명 유지, 내용 별도 업데이트 예정)
- **Changes v2.4.0** (2026-04-24):
  - **[MAJOR] gpt-image-2 핵심 원칙 블록 신설**: OpenAI 공식 쿡북 + EvoLinkAI 커뮤니티 200+ 케이스 분석 반영. "배경→주체→디테일→제약" 4단계 프레임워크 + 10개 원칙(생성/편집 분리, Visual Re-description, 제약 명시, 텍스트 처리, 해상도 검증, 품질 레버, 포토리얼 키워드, 반복 개선, 네거티브 스택) 추가
  - **[MEDIUM] 모델 순위 업데이트**: 이미지 생성 1순위 "gpt-image (GPT Image 1.5)" → **"gpt-image-2"** (OpenAI 2026-04 출시), 편집 컬럼에 "identity/geometry/layout 보존 강점" 명시
  - **[MEDIUM] 이미지 프롬프트 소스 확장**: v2.3.0의 specal1849 이론 노트에 더해 [[OpenAI-gpt-image-2-Prompting-Guide-2026-04]](공식) + [[EvoLinkAI-awesome-gpt-image-2-prompts-2026-04]](커뮤니티) 두 가이드 참조 추가
  - **[LOW] 해상도 자동 검증**: 16 배수·3:1 비율·픽셀 범위 체크 규칙 명시. `--ar` 플래그 자동 변환
  - **[LOW] 품질 자동 상향**: 텍스트 포함/밀집 인포그래픽/클로즈업 시 `quality="medium"` 이상 자동 선택
- **Changes v2.3.0** (2026-04-16):
  - **[MAJOR] 이미지 5-stage Framework 도입**: @specal1849 이미지 프롬프트 이론 기반. 광고/상품용 JSON 구조에 purpose→hero→context→evidence→constraints 5단계 적용. Cross-Attention 레이어별 처리 순서와 일치
  - **[MAJOR] Visual Re-description 규칙 추가**: 추상적 감성어를 구체적 시각 대비로 변환하는 규칙. mood/details 필드에 추상어 자동 재기술 적용
  - **[MEDIUM] 이미지 AskUserQuestion "용도/매체" 질문 추가**: 4가지→5가지. "광고/상품" 선택 시 5-stage Framework 활성화, 기존 "SNS/일반"은 하위 호환
  - **[MEDIUM] prompt-engineering-guide.md v1.7.0**: Cross-Attention 이론, 수식어 전략, 5-stage 프레임워크, 참고 문헌 5편 추가
  - **[LOW] Expert 1 토큰 순서 검증 추가**: 이미지 프롬프트 시 구체 명사 앞 배치, 추상어 시각 재기술 여부 검증
- **Changes v2.2.0** (2026-04-11):
  - **[CRITICAL FIX] /deep-research 통합 완성**: 2026-04-06에 /deep-research v2.1.0이 `Skill("prompt", "--batch ...")` 호출로 변경되었으나, /prompt 측에 `--batch` 모드 핸들러와 prompt-engineering-guide.md 로드 로직이 누락되어 워커가 IFCN 기반 템플릿 대신 일반 XML을 생성하던 문제 해결
  - **[MAJOR] BATCH 모드 신설**: `--batch {모델} {상세도} {지시문}` 패턴으로 호출 시 인터랙티브 흐름(AskUserQuestion, 5가지 옵션, Step 3-5) 전체 우회 → 프롬프트 코드블록만 출력 → 응답 종료. /deep-research, /tofu-at, /tofu-at-codex 등 워커 호출 컨텍스트 전용
  - **[MAJOR] prompt-engineering-guide.md 자동 로드 의무화**: 목적이 `팩트체크` / `리서치/조사` / `분석/리서치`로 감지되면 Step 2에서 `prompt-engineering-guide.md` + `01-factcheck-prompts.md` + `02-general-research.md`를 Read로 로드하여 IFCN 기반 베이스 템플릿(LoopFactChecker_UI_v1.2 / QuickFactCheck / StructuredResearch_v1.0 / MarketResearchPrompt / CompetitiveAnalysisPrompt / AcademicResearchPrompt) 채택 후 사용자 주제로 placeholder 치환하는 절차 필수화
  - **Step 1 목적 감지 테이블 확장**: "필수 베이스 스킬" 컬럼 추가, 리서치/팩트체크 키워드 확장(market research, 시장 조사, 경쟁사, 학술, Chain-of-Verification, 교차검증)
  - **Step 1.7 글쓰기/리서치 개요 생성 강화**: 분석/리서치/팩트체크 시 일반 개요 대신 prompt-engineering-guide.md의 4-stage 워크플로우를 베이스로 사용하도록 명시
  - **Step 2 「리서치/팩트체크 템플릿 자동 로드」 신설**: Step 2-A(서브파일 로드) → Step 2-B(베이스 템플릿 선택) → Step 2-C(커스터마이징) → Step 2-D(검증) 4단계 절차 추가, IFCN 5대 원칙·RecencyPolicy·CountrySourcePolicy 보존 의무화
  - **참조 스킬 테이블 #7 재정의**: prompt-engineering-guide.md를 "팩트체크/리서치/분석 시 ✅ 필수 로드"로 격상, 6개 베이스 템플릿 명시
- **Changes v2.1.0**:
  - **[HIGH] 이미지 생성 모델 순위 업데이트**: NB2 (Gemini 3.1 Flash Image) 2위 추가
  - **[MEDIUM] 참조 스킬 테이블 업데이트**: Claude 4.5/4.6 설명 반영
- **Changes v2.0.0**:
  - **직접 전문가 역할 패턴 도입**: `<role>` 블록에 실존 전문가 직접 지명 규칙 추가
  - **폴백 규칙**: DB에 없는 도메인도 AI가 전문가를 탐색하여 역할에 적용
  - **[MAJOR] 전문가 도메인 프라이밍 통합**: prompt-engineering-guide.md 참조, 실존 전문가 관점으로 프롬프트 검토
  - **[MAJOR] 슬라이드/PPT 생성 워크플로우 추가**: baoyu-slide-deck 패턴 기반 아웃라인 먼저 → 이미지 프롬프트 JSON 생성
  - **슬라이드 AskUserQuestion 추가**: 비주얼 스타일, 내러티브 모드, 슬라이드 수, 대상 청중 4가지 질문
  - **Step 1.7 슬라이드 섹션 추가**: 콘텐츠 분석 → 아웃라인 → STYLE_INSTRUCTIONS → 이미지 프롬프트 JSON (4단계)
  - **참조 스킬 추가**: prompt-engineering-guide.md (#8), prompt-engineering-guide.md (#9)
  - **전문가 토론 강화**: Expert 2가 실존 전문가 관점으로 도메인 전문 용어 검증
- **Changes v1.9.6**:
  - **[FIX] Step 3 출력 템플릿에 이미지/동영상 안내 통합**: "💬 선택하세요" 바로 아래에 안내 표시
  - **플랫폼별 안내 명확화**: ChatGPT(gpt-image 자동) / Gemini(좌측 하단 도구)
- **Changes v1.9.5**:
  - **동영상 플랫폼 안내 섹션 추가**: Sora 2 (sora.com), Veo 3.1 Flow 링크 추가
- **Changes v1.9.4**:
  - **[CRITICAL] 중간 구조화 단계 복원**: v1.9.3에서 스토리보드/생성계획 단계가 생략되던 문제 수정
  - **[CRITICAL] 5가지 옵션 제시 필수화**: 프롬프트 출력 후 옵션 없이 끝나던 문제 수정
  - **`<mindset>` 블록 확장**: CRITICAL WORKFLOW에 6단계 명시 (중간 구조화 + 옵션 제시 포함)
  - **Step 1.7 강화**: 조건부 실행 테이블에 "생략 시" 컬럼 추가, 다중 이미지 생성 계획 템플릿 추가
  - **Step 3 강화**: "5가지 옵션 반드시 제시" CRITICAL 규칙 추가
  - **Constraints 테이블 확장**: 0번, 6번 규칙 추가 (프롬프트 출력 없이 실행 금지, 옵션 없이 종료 금지)
  - **`<final_reminder>` 블록 추가**: 중간 구조화 생략 금지, 옵션 제시 생략 금지, 워크플로우 6단계 명시
  - **`<output_required>` 블록 추가**: 프롬프트 출력 후 필수 포함 요소 명시
- **Changes v1.9.2**:
  - **`<mindset>` 블록 추가**: "천천히, 최선을 다해 작업하세요" 마음가짐 규칙 최상단 배치
  - **GPTs/Gems와 버전 통일**: 모든 프롬프트 생성기 v1.9.2로 동기화
- **Changes v1.8.1**:
  - **스킬 파일 업데이트 반영**: prompt-engineering-guide.md v1.1.0 (Gemini 실제 사용 예시 @specal1849), prompt-engineering-guide.md v1.6.0 (만화/코믹 스타일 추가)
- **Changes v1.8.0**:
  - **[MAJOR] 동영상 모델 선택 기능 추가**: Veo 3.1, Sora 2, Sora 2 Pro 중 선택 (AskQuestion 첫 번째 질문)
  - **동영상 모델별 생성 길이 비교 테이블 추가**: 기본 길이(확장 미사용), 최대 길이(확장 사용), 해상도 정보
  - **동영상 길이 옵션 이원화**: 기본 옵션(확장 미사용) + 확장/스토리보드 사용 시 유동적 대응
  - **동영상 JSON 구조에 model 필드 추가**: 선택한 모델 정보 포함
- **Changes v1.7.0**:
  - **[MAJOR] 동영상 스토리보드 워크플로우 추가**: 동영상 생성 시 시간순 스토리보드 먼저 생성 후 프롬프트 생성
  - **[MAJOR] 글쓰기/리서치 개요 워크플로우 추가**: 글쓰기/리서치 시 개요(아웃라인) 먼저 생성 후 섹션별 프롬프트 생성
  - **Step 1.7 "중간 구조화" 단계 신설**: 목적별 구조화 단계 조건부 실행
  - **동영상 JSON에 time_range, camera 필드 추가**: 시간초별 장면 관리
- **Changes v1.6.0**:
  - **[MAJOR] 명시적 요소 확장 규칙 추가**: 사용자 입력이 간략해도 AI가 누락된 요소를 상세하게 채움
  - **[MAJOR] 에이전트 모드 옵션 추가**: 5번 옵션으로 AI와 대화하며 프롬프트를 단계별로 최적화
  - **[MAJOR] AskUserQuestion 5가지 확대**: 모든 목적에서 최소 5가지 질문으로 확장
  - **5가지 옵션 UI**: 기존 4가지에서 에이전트 모드 추가
  - **에이전트 모드 워크플로우 섹션 추가**: Step 5로 에이전트 모드 상세 가이드
- **Changes v1.5.2**:
  - **[MAJOR] AskUserQuestion 옵션 수집 복원**: 모든 프롬프트 생성 시 사용자에게 옵션을 클릭해서 선택하도록 Step 1.5 추가
  - **목적별 맞춤 질문**: 이미지, 동영상, 코딩, 글쓰기, 분석, 에이전트 각각에 최적화된 질문 세트 정의
- **Changes v1.5.1**:
  - **이미지/동영상 JSON 구조 템플릿 추가**: command 파일에 JSON 구조 예시 직접 포함 (동영상 JSON 출력 누락 버그 수정)
- **Changes v1.5.0**:
  - **[MAJOR] 동영상 프롬프트 JSON 구조화**: 이미지와 동일하게 JSON+자연어 형식 통일
  - **gpt-image 모델명 통일**: GPT Image 1.5/ChatGPT Image → gpt-image로 명칭 통일
  - **출력 형식 테이블 간소화**: 이미지/동영상 모두 JSON 구조 기본으로 통합
  - **버전 체계 리셋**: 모든 채널 1.5.0으로 통일
- **Changes v4.2.0**:
  - **prompt-engineering-guide.md 크레딧 추가**: 두부 @tofukyung 크레딧 추가
  - **prompt-engineering-guide.md 크레딧 추가**: 공냥이 @specal1849 크레딧 추가
- **Changes v4.1.0**:
  - **금지사항 강화**: 이미지/동영상 바로 생성 방지 규칙 최상단 배치
  - **개선 옵션 UI**: 3번 선택 시에만 세부 옵션 표시
  - **프롬프트 코드블록 출력**: 모든 프롬프트를 코드블록으로 출력
  - **이미지 JSON 구조 기본화**: 자연어 대신 JSON 구조 기본, 유연한 부분만 자연어
- **Changes v4.0.0**:
  - **[MAJOR] 워크플로우 전면 개편**: 입력 폼 제거 → 즉시 프롬프트 생성
  - **개선 옵션 4가지 UI**: 프롬프트 출력 후 선택지 제시
  - **출력 형식 자동 라우팅**: 목적별 최적 형식 자동 선택 (이미지=JSON, 보고서=XML)
  - **전문가 토론 백그라운드 필수화**: skip 불가, 출력 간소화
  - **수정 워크플로우 추가**: 2번/3번 선택 시 프롬프트만 출력 (실행 금지)
  - **이미지/동영상 옵션**: 개선 단계(3번)로 이동
- **Changes v3.3.0**:
  - **자동/필수 입력 분리**: 목적별 필수 입력 필드 구분
- **Changes v3.0.0**:
  - **[MAJOR] 전문가 3인 토론 필수화**: 모든 프롬프트 생성에 자동 적용

---

## Auto-Learned Patterns

- [2026-04-11] v2.2.0에서 `--batch` 모드 추가 — 프로그래밍 호출(deep-research/tofu-at 워커)에서 AskUserQuestion·5가지 옵션·메타텍스트 전부 우회, 프롬프트 코드블록 1개만 출력. 이전 버전은 워커가 "1번 선택"을 기다리며 멈추는 버그 있었음 (source: 2026-04-11-2307)
- [2026-04-11] 배치 호출 시 리서치/팩트체크 지시문에 prompt-engineering-guide.md 미로드가 가장 자주 발생하는 오류 — "리서치" 키워드가 지시문에 있으면 prompt-engineering-guide.md Read 로드 필수. 누락 시 IFCN 베이스 템플릿 대신 일반 XML로 격하됨 (source: 2026-04-11-2335)
