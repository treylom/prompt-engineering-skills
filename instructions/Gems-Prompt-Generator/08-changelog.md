## Version History

**Version**: 3.3.2 | **Updated**: 2026-09-05
**Changes v3.3.1** (2026-09-05): **/searchflow 명칭 정합 + prompt-sync MCP 도구명 정정** — /deep-research→/searchflow 명칭 치환 3줄, prompt-sync(Gems·GPTs) 안내가 존재하지 않는 MCP 도구를 가리키던 문제 수정. 웹 UI 지침 내용 무변경(버전 동기화만).
**Changes v3.3.0** (2026-07-29): **P5 대형 가이드 분할** — 참조 가이드 7건을 SKILL.md 라우팅 인덱스 + references/full.md 구조로 재배치(내용 무변경·경로만 이동). 웹 UI 지침 내용 무변경(버전 동기화만).
**Changes v3.2.2** (2026-07-29): **Codex 표면 2건 수리(ChatGPT Works 실증 재현)** — ① `.codex-plugin/plugin.json` 2.12.0→현행(5회 bump 동안 방치돼 Works가 옛 판을 캐시하던 root cause, A5 검사 6표면 확장으로 재발 차단) ② `skills/prompt/SKILL.md`(Works 로드 표면) 이미지 선행 게이트에 **산출 후 5옵션 메뉴 verbatim 의무 절 + 자가검사 ④타겟 표기·⑤전문가 앵커** 신설 — 이미지 경로에서 references 보충이 스킵돼 메뉴·타겟이 누락되던 약문장 수리. 지침 내용 무변경(버전 동기화만).

**Version**: 3.2.1 | **Updated**: 2026-07-29
**Changes v3.2.1** (2026-07-29): **게이트 A4 오탐 수리** — 실전 1호 판정(GD 실출력, 인간 판정 3축 전건 PASS)이 A4 FAIL로 갈린 오탐의 원인 2개 수리: ①검사 범위 = 문서 tail → `extractPromptBlock()`(```text 우선 → 마지막 펜스 → 문서 tail fallback) ②`AR_TAIL_RE` 줄시작 앵커 제거(킷 포맷 B 콤마형은 문단 끝에 이어 붙음 — 절반 수리가 여전히 FAIL임을 회귀 3단으로 실측). A4 출력에 검사 범위 표기 추가. fixture에 GD 실출력을 `pass/interactive-image.md`로 승격(관측된 양성도 fixture 밖에 있으면 통과가 정보를 안 줌) — 셀프테스트 8/8, 기존 음성 검출력 보존. 지침 내용 무변경(버전 표기 동기화만).

**Version**: 3.2.0 | **Updated**: 2026-07-29
**Changes v3.2.0** (2026-07-29): **산출 코드 게이트 신설** — `scripts/prompt-output-gate.mjs`(리포 측 도구·의존성 0). /prompt 산출 텍스트를 기계 판정: A1 5옵션 전부(라벨 기준) · A2 전문가 앵커(text=`<role>` 정규 패턴 / image=Director signature·Lens character 또는 Camera·Lighting·Color grading 슬롯 — 구조만 판정, 실존 인물 여부 등 의미 축은 UNMEASURED 고지) · A3 `타겟:` 모델 표기 · A4 image+gpt-image 시 끝 `AR` · A5 `--check-versions` 버전 표기 5표면 정합. exit 0=PASS/1=FAIL/2=UNMEASURED(통과 취급 금지). fixture 7종(축 격리) 셀프테스트 = `--test`. 첫 실행에서 Gems 단일판 헤더 버전 잔존(2.6.0)을 실적발·수리. Gems 지침 내용 변경 없음(버전 표기 동기화만).

**Version**: 3.1.0 | **Updated**: 2026-07-29
**Changes v3.1.0** (2026-07-29): **기준 파일(`commands/prompt.md` v3.1.0) 미전파 수리 — 이 디렉터리판이 v2.2.0(2026-03-08) 시점에 멈춰 있던 sibling 갭 해소.** 단일 파일판(`instructions/Gems-Prompt-Generator.md`)과 동일 내용을 분할 배치했습니다.
- **[CRITICAL] 🏛️ 대원칙 불변 조항 신설** → `01-mindset-constraints.md` Constraints 최상단 직하. 전문가 프롬프팅 + 모델별 라우팅·자동 탐지를 전 목적·전 모델 상위 조항으로 명문화
- **[MAJOR] 이미지 절 = 타겟 경로 분기** → `06-gemini-guide-json-structures.md`. 기본 타겟 = Gemini Image(JSON) ↔ gpt-image-2 API·Codex `$imagegen` = 공냥 킷 v4 포맷 A/B + 끝 `AR`. **킷 규격을 Gemini Image·Seedream에 강제 금지** 명시
- **[MAJOR] JSON 필드 신설** → 이미지 `target_model`·`expert_anchor` / 동영상 `cinematographer`(실존 1인 지명)
- **[MEDIUM] FINAL REMINDER 대원칙 2줄 추가** → `07-references-final-reminder.md` (Lost-in-Middle 방지 반복)
- **[PATCH] 버전 표기 통일**: 2.2.0 → 3.1.0. 원본 지침 버전에 맞춰 단일 파일판·디렉터리판 번호를 일치시켜, 앞으로 "이 판이 원본 지침 몇 버전을 반영했는지"가 번호만으로 보이게 했습니다(과거엔 단일판 2.6.0 / 디렉터리판 2.2.0 으로 어긋나 있었습니다).
- **5가지 옵션 워크플로는 무수정 유지** — 기존 절 삭제·축소 ❌

**Version**: 2.2.0 | **Updated**: 2026-03-08
**Changes v2.2.0**:
- **[벤치마크] 전체 순위 갱신**: LMArena (2026-03-06) + Artificial Analysis (2026-03) 기준
- **텍스트/코드**: GPT-5.4 반영, Gemini 3.1 Pro 승격, Claude Opus 4.6 종합 1위
- **이미지**: NanoBanana2 1위 승격, GPT Image 1.5 신규
- **동영상**: Kling 3.0 1위 (대규모 변동), Grok Imagine Video 2위
- **검색**: Claude Opus 4.6 Search 1위 신규, Grok 4.20 반영

**Version**: 2.1.0 | **Updated**: 2026-03-08
**Changes v2.1.0**:
- **[HIGH] 이미지 생성 모델 순위 업데이트**: NB2 (Gemini 3.1 Flash Image) 2위 추가
- **[HIGH] Gemini Image 섹션에 NB2 모델 선택 테이블 추가**: NB Pro vs NB2 비교, 5요소 서술형
- **[MEDIUM] Claude Opus 4.6 모델 반영 완료**: 모델 순위, 참조 스킬 업데이트
**Changes v1.9.6**:
- **[FIX] Step 3 출력 템플릿에 이미지/동영상 안내 통합**: "선택하세요" 바로 아래에 안내 표시
- **좌측 하단 도구** 위치 명확화: "우측 하단 Pro 모드 → **좌측 하단 도구** → 이미지 생성하기"
**Changes v1.9.5**:
- **[MAJOR] Tool call 지시 전체 제거**: `nanobanana pro`, `<tool_call>` XML 블록 등 복잡한 도구 호출 지시 삭제
- **이미지/동영상 UI 안내 섹션 추가**: Pro 모드 활성화, 도구 → 이미지 생성하기, 동영상 플랫폼 링크
- **generation_instruction 간소화**: "이미지를 순차적으로 생성하세요" 단순 지시로 변경
- **이유**: 복잡한 tool call 지시보다 단순한 명령이 Gemini에서 더 효과적으로 작동
**Changes v1.9.4**:
- **[CRITICAL] 중간 구조화 단계 복원**: v1.9.3에서 스토리보드/생성계획 단계가 생략되던 문제 수정
- **[CRITICAL] 5가지 옵션 제시 필수화**: 프롬프트 출력 후 옵션 없이 끝나던 문제 수정
- **`<mindset>` 블록 확장**: CRITICAL WORKFLOW에 6단계 명시 (중간 구조화 + 옵션 제시 포함)
- **Step 1.7 강화**: 다중 이미지용 "생성 계획 (PRD 스타일)" 템플릿 추가, 생략 시 금지 테이블 추가
- **`<output_required>` 블록 추가**: 프롬프트 출력 후 필수 포함 요소 명시
- **FINAL REMINDER 강화**: 중간 구조화 생략 금지, 옵션 제시 생략 금지 추가
**Changes v1.9.3**:
- **[CRITICAL] 프롬프트 생성기 역할 재정립**: v1.9.2에서 프롬프트 없이 바로 이미지 생성되던 문제 수정
- **`<mindset>` 블록 강화**: "프롬프트 생성기" 역할 명시, CRITICAL WORKFLOW 추가
- **`<image_generation_rules>` 조건부로 변경**: `priority="HIGHEST"` 제거 → `applies_when="user_selects_1번"`
- **`<prerequisite>` 섹션 추가**: 프롬프트 출력 + 옵션 제시 선행 조건 명시
- **Constraints 0번 규칙 추가**: "프롬프트 출력 없이 바로 작업 실행" = HIGHEST 금지
- **FINAL REMINDER 강화**: "당신은 프롬프트 생성기입니다" 최상단, 올바른 워크플로우 5단계 명시
**Changes v1.9.2**:
- **[CRITICAL] XML 이미지 생성 규칙 추가**: 문서 최상단에 `<image_generation_rules>` XML 블록으로 최우선 규칙 명시
- **`<tool_call action="make_image">` 태그 추가**: nanobanana pro 도구 호출 명시적 지시
- **`<mindset>` 블록 추가**: "천천히, 최선을 다해 작업하세요" 마음가짐 규칙
- **"나노바나나2" → "nanobanana pro" 통일**: 모든 이미지 생성 도구 참조를 영문 도구명으로 변경
- **다중 이미지 다양한 디자인 규칙 추가**: 각 장에 맞는 다양한 디자인 적용 (레이아웃, 색상, 구도 등 변화)
- **FINAL REMINDER XML 형식 변경**: `<final_reminder>` 블록으로 Lost-in-Middle 방지 강화
**Changes v1.9.1**:
- **[CRITICAL] "다중 이미지 1장만 생성 후 멈춤" 문제 해결**: "단일 응답 내 N장 모두 완료" 원칙 추가
- **"다중 이미지 자동 연속 실행" 섹션 신설**: 실행 흐름도로 자동 연속 실행 시각화
- **금지 사항 6번 추가**: "다중 이미지 중간 중단" - N장 모두 완료 후에만 응답 종료
- **잘못된 실행 예시 추가**: "1장만 생성 후 응답 종료", "계속 생성할까요? 질문" 금지
- **FINAL REMINDER 테이블 업데이트**: 다중 이미지 실행 실패 패턴 3가지 명시
**Changes v1.9.0**:
- **[CRITICAL] "1번 선택 시 실제 이미지 생성" 규칙 강화**: 텍스트/JSON 출력 = 실행 실패 명시
- **실행 트리거에 "구체적 행동" 컬럼 추가**: "이미지 생성 기능을 호출하여 화면에 이미지 표시"
- **다중 이미지 순차 실행에 "결과" 컬럼 추가**: 각 단계에서 이미지가 화면에 표시되어야 함
- **잘못된 실행 vs 올바른 실행 예시 추가**: "[1/6] 텍스트만" vs "[1/6] + 실제 이미지"
- **FINAL REMINDER에 "가장 중요한 규칙" 테이블 추가**
**Changes v1.8.5**: generation_instruction 명확화 - "ONLY ONE image per call", "Do NOT combine" 명시로 다중 이미지 합성 방지
**Changes v1.8.3**: 다중 이미지 순차 생성 프로세스 강화 - FINAL REMINDER에 nanobanana pro N회 순차 호출 필수 규칙 추가
**Changes v1.8.2**: 다중 이미지 JSON 구조 개선 - generation_instruction 필드 추가, description→prompt 변경
**Changes v1.8.1**: 스킬 파일 업데이트 반영 - gemini-3.1-prompt-strategies.md v1.1.0 (Gemini 실제 사용 예시 @specal1849), image-prompt-guide.md v1.6.0 (만화/코믹 스타일 추가)
**Changes v1.8.0**:
- **[MAJOR] 동영상 모델 선택 기능 추가**: Veo 3.1 (기본), Sora 2, Sora 2 Pro 선택 가능
- **동영상 모델별 생성 길이 비교 테이블 추가**: 기본 길이(확장 미사용), 최대 길이(확장 사용), 해상도 정보
- **동영상 길이 옵션 이원화**: 기본 4초/6초/8초 + 확장/스토리보드 시 15초/30초/60초
- **동영상 JSON 구조에 model 필드 추가**
**Changes v1.7.0**:
- **[MAJOR] 동영상 스토리보드 워크플로우 추가**: 동영상 생성 시 시간순 스토리보드 먼저 생성 후 프롬프트 생성
- **[MAJOR] 글쓰기/리서치 개요 워크플로우 추가**: 글쓰기/리서치 시 개요(아웃라인) 먼저 생성 후 섹션별 프롬프트 생성
- **Step 1.7 "중간 구조화" 단계 신설**: 목적별 구조화 단계 조건부 실행
**Changes v1.6.0**:
- **[MAJOR] 명시적 요소 확장 규칙 추가**: 사용자 입력이 간략해도 AI가 누락된 요소를 상세하게 채움
- **[MAJOR] 에이전트 모드 옵션 추가**: 5번 옵션으로 AI와 대화하며 프롬프트를 단계별로 최적화
- **5가지 옵션 UI**: 기존 4가지에서 에이전트 모드 추가

**Changes v1.5.0**:
- **[MAJOR] 동영상 프롬프트 JSON 구조 추가**: 이미지와 동일하게 JSON+자연어 형식 통일
- **gpt-image 모델명 통일**: GPT Image 1.5/ChatGPT Image → gpt-image로 명칭 통일
- **출력 형식 테이블 간소화**: 이미지/동영상 모두 JSON 구조 기본으로 통합
- **버전 체계 리셋**: 모든 채널 1.5.0으로 통일

**Changes v4.4.0**:
- **research-prompt-guide.md 추가**: 리서치/팩트체크 가이드 스킬 파일 참조 추가 (두부 @tofukyung)
**Changes v4.3.0**:
- **네이티브 이미지 생성 호출 명시**: "바로 실행" 시 JSON action 객체 출력 대신 네이티브 기능 직접 호출 강제
- **이미지/동영상 실행 방법 섹션 추가**: Constraints에 실행 방법 명확화
- **Final Reminder 강화**: 도구 호출 텍스트 출력 금지 규칙 추가
**Changes v4.2.0**:
- **금지사항 모든 작업에 적용**: "이미지/동영상"에서 "모든 작업"으로 확장 (코드, 글쓰기 등 포함)
**Changes v4.1.0**:
- **금지사항 강화**: 바로 생성 방지 규칙 명확화, 테이블 형식 금지 목록
- **개선 옵션 UI**: 3번 선택 시에만 세부 옵션 표시
- **프롬프트 코드블록 출력**: 모든 프롬프트를 코드블록으로 출력
- **이미지 JSON 구조 기본화**: 자연어 대신 JSON 구조 기본, 유연한 부분만 자연어
- **Final Reminder 추가**: Lost-in-Middle 방지 위한 최하단 규칙 반복
**Changes v4.0.0**:
- **[MAJOR] 워크플로우 전면 개편**: 입력 폼 제거 → 즉시 프롬프트 생성
- **개선 옵션 4가지 UI**: 프롬프트 출력 후 선택지 제시
- **출력 형식 자동 라우팅**: 목적별 최적 형식 자동 선택 (이미지=JSON, 보고서=XML)
- **전문가 토론 백그라운드 필수화**: skip 불가, 출력 간소화
- **수정 워크플로우 추가**: 2번/3번 선택 시 프롬프트만 출력 (실행 금지)
- **이미지/동영상 옵션**: 개선 단계(3번)로 이동
**Changes v3.4.0**:
- **자동/필수 입력 분리**: 목적+분량(기본III) 자동, 출력형식 AI 자동 결정
**Changes v3.0.0**:
- **[MAJOR] 전문가 3인 토론 필수화**: 모든 프롬프트 생성에 자동 적용
