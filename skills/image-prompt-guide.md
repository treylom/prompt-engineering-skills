---
name: image-prompt-guide
description: AI 이미지 생성 프롬프트 가이드. 정본 = 공냥 프롬프트 킷 v4(gpt-image-2 텍스트 프롬프트 계약 — 포맷 A/B·철칙·jsonl·검증기, skills/image-prompt-kit/ vendor 원문). 웹 UI(ChatGPT/Gemini) JSON 간이 경로는 legacy 부록.
references:
  - prompt-engineering-guide
  - context-engineering-collection
  - image-prompt-kit (vendor)
version: 2.0.0
created: 2025-12-28
author: Claude Code (공냥이(@specal1849)님 자료 기반)
source_credits:
  - name: 공냥이(@specal1849)
    url_kit: https://github.com/gongnyang/gongnyang-prompt-kit
    url_slides: https://docs.google.com/presentation/d/1rPQVnbu1INJyUAqCvMA7dkO2WzJpD4Q9q_UXq9RH2GU/edit
    url_notion: https://fascinated-alley-b43.notion.site/PRO-2b1861d1faaf80b8bf7ef4093827f59b
---

# AI 이미지 프롬프트 마스터 가이드

> **자료 출처**: 정본 계약은 공냥이(@specal1849)님의 [공냥 프롬프트 킷 v4](https://github.com/gongnyang/gongnyang-prompt-kit)(MIT — 원문 사본 `skills/image-prompt-kit/`)를 따릅니다. 후반부 일반 이론·웹 UI 경로는 같은 저자의 "이미지 프롬프트 101" 슬라이드와 "PRO 이미지 프롬프트" Notion 문서 기반입니다.

---

## 0. Codex `/prompt` 적용 계약 (v2.0.0 — 공냥 킷 v4 정본)

Codex의 `prompt` 스킬이 이미지 목적을 감지하면 이 파일을 **직접 전체 로드**한 뒤 아래 계약을 우선 적용합니다.

- 플러그인 외부의 `image-prompt`·`gongnyang-photo` 스킬로 우회하지 않습니다. (킷 원문은 플러그인 **내부** `skills/image-prompt-kit/`에 동봉 — 이걸 읽는 것은 우회가 아닙니다.)
- **gpt-image-2 / Codex `$imagegen` 대상 최종 산출 = 킷 포맷의 한국어 텍스트 프롬프트**입니다(§K 참조): 단발 = 포맷 A(라벨 6섹션) 또는 포맷 B(화보 플랫 콤마형) 본문 + 끝 `AR x:y` 토큰만. **JSON 골격 산출이 아닙니다.**
- **배치·라이브러리 산출 = jsonl 레코드**(1줄 = 1프롬프트, §K6 스키마) — `full_prompt` 필드에 위 텍스트 프롬프트를 담습니다.
- 고가치 산출물은 응답 전 `node skills/image-prompt-kit/scripts/check_prompt.mjs`(stdin 가능, jsonl은 `--jsonl`) 검증 — `ok:true`가 산출 조건입니다.
- 출력 직전 자가검사: ① 포맷 A/B 구조인가(§K3) ② 철칙 9 위반 없나(§K2 — 특히 네거티브 전면 긍정형·SD어휘 0·끝 AR) ③ 렌더 텍스트가 있으면 Tier-1 결합 공식 1회인가. 누락 시 이 계약으로 한 번 재생성합니다.
- 웹 UI(ChatGPT gpt-image·Gemini) 간이 경로의 JSON 골격은 **legacy 부록**(§L)으로만 사용합니다.
- **적용 범위(모델별 라우팅 — 대원칙)**: 본 킷 계약 전체는 **gpt-image-2 계열**(`$imagegen`·gpt-image API·ChatGPT) 전용입니다. **Gemini-Image(NB2/3 Pro Image)·Seedream** 타겟은 킷의 **보편 원칙만 공유**(구체 시각어·전면 긍정형·수치 박기·전문가 시각 언어 앵커)하고, gpt-image-2 전용 규격(사이즈락 6종·Tier-1 고정 문자열·`$imagegen` 규약·검증기 강제)은 적용하지 않습니다 — 해당 모델 최적 자연어 서술로 컴파일. 타겟 모델 미지정 = 현재 환경 자동 탐지(생성 연계 = gpt-image-2 기본), 산출에 "타겟: <모델>" 1줄 명시.
- **전문가 프롬프팅(대원칙)**: 모든 이미지 프롬프트에 실존 전문가의 **시각 언어 앵커**를 반영합니다 — 화보(포맷 B) = `Director signature:`·`Lens character:` 슬롯(철칙4 예외의 공식 경로), 포맷 A = Camera·Lighting·Color grading 섹션에 해당 실존 포토그래퍼/아트디렉터 스타일을 결과 서술로 번역. "전문가처럼/최고급" 빈 수사는 철칙3대로 금지 — 전문가는 *지명*, 수사는 *구체 어휘로 환원*.

---

## K. 공냥 프롬프트 킷 v4 — 정본 계약 (vendor: `skills/image-prompt-kit/`)

> 원문 전체 = `skills/image-prompt-kit/KIT-SKILL.md` + `references/` (MIT, © 공냥이 @specal1849, rev `fb5f75f`). 아래는 그 핵심의 충실 전사 — 충돌 시 vendor 원문이 우선.

### K1. 워크플로우

1. 빠진 결정(카테고리·컷타입·피사체·스타일·구도·텍스트·AR)은 추론해 채운다. 묻는 건 한글 문구 원문·브랜드명·민감 소재뿐.
2. 라우팅 표(§K5)에서 읽을 파일 결정, 포맷은 §K3.
3. 철칙 9개(§K2)를 지켜 작성, 끝에 `AR` 토큰.
4. 고가치 산출물은 응답 전 `check_prompt.mjs` 검증(`ok:true`).
5. 생성 연계 시 컴파일된 프롬프트만 넘긴다(거친 원문 금지).

출력 계약: 단일 = 본문 + 끝 `AR x:y`만(설명 없이) · 다중 = 엔트리당 `Title/Category(Cn)/Cut type/Prompt` · 생성 요청 = 조용히 컴파일 후 툴 호출.

### K2. 철칙 9

1. **앞머리 `[AR x:y SIZE wxh]` 브래킷 금지.** size는 API 파라미터(jsonl `size`)로만, 프롬프트엔 끝 `AR x:y` 하나만. 슬롯 토큰(`[PERSONA_LOCK]` 류)은 작성 전용 — 잔존 = 실격(`E-SLOT-LEAK`).
2. **장면 배제는 전부 긍정형** — gpt-image-2는 장면 네거티브를 오히려 렌더한다(군중→"인물 한 명, 단독", 배경→"깨끗한 단색 배경"). 예외는 두 레인뿐:

   | 티어 | 조건 | 허용 문구 |
   |---|---|---|
   | Tier-0 기본 | 항상 | all-positive, 부정문 0개 |
   | Tier-1 텍스트 가드 | 렌더 텍스트 있을 때만 | 화이트리스트 7종: `no extra words` · `no duplicate text` · `no invented glyphs` · `no watermark` · `no logo` · `no extra text` · `verbatim, no extra characters` |
   | Tier-2 화보 레인 | 명시 선언 시만(휴리스틱 승격 금지) | SAFETY_ASSERT(긍정형, 피사체절)+NEGATIVE_TAIL(AR 직전 1회) **페어** — 정본 `references/editorial-hwabo.md` §3 |

   Tier-1 결합 공식(유일 방출형): `All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.` `Negative:` 라벨은 전 티어 금지(`E-NEG-SECTION`).
3. **SD-era 폐기 어휘 금지.** `masterpiece/best quality/8k/4k/uhd/trending on artstation/ultra-detailed/highly detailed/sharp focus`, 가중치 `(word:1.3)`, `--ar/--v`, 본문 `§`, 빈 형용사(멋지게/감성적으로/고급스럽게/세련되게/beautiful/stunning). 무대 지정("어워드 수준/전문가처럼/최고급")도 동급 — 수치(여백 %·60/30/10·위계 단수)·몸 반응·구체 예시로 환원(`references/concept-axes.md` §죽은 단어 환원).
4. **장비 스펙 → 결과로 환원.** EXIF·장비명 대신 "shallow DoF, background falls off softly"·"warm key + cool rim". (패션 `Lens character:`·`Director signature:`는 결과+앵커라 예외.)
5. **수치는 박는다.** HEX 팔레트(컷당 3~5색), 켈빈, `key:fill 1:2` 비율.
6. **1행 = 1컷 = 1 호출.** 한 캔버스 그리드/매트릭스 금지, 여러 컷은 N행.
7. **이상적 피부 금지** → "natural skin texture, visible pores, subtle film grain".
8. **실제 상표·인물 참조 금지**, 가상 브랜드/페르소나로.
9. **생성 후 글자 후처리 절대 금지.** 텍스트는 프롬프트로 이미지 안에서 렌더(따옴표 카피+롤 라벨+자유 작성 존). PNG 위 코드 합성(PIL·ImageMagick·SVG/HTML·캔버스) 일절 금지 — 폰트·커닝·톤이 겉돈다. 글자 오류는 프롬프트 수정 후 재생성(타이포 구체화 → `2048x2048`+quality high → 카피 축소 순).

### K3. 포맷 A / 포맷 B

- **포맷 A — 라벨 6섹션**(구조물 전반: 포스터·키아트·인포그래픽·도감·카드뉴스·만화 등). 순수 서술+HEX, 핵심 시각정보 최상단:

  | # | 섹션 | 무엇을 / 분량 |
  |---|---|---|
  | 1 | **Scene** | 누가·무엇이·어디서·무엇을. 핵심 먼저. 60~120어 |
  | 2 | **Camera** | 시점·거리·렌즈 character(결과 서술). 15~30어 |
  | 3 | **Lighting** | 방향·soft/hard·그림자·림라이트(장비명 금지). 10~25어 |
  | 4 | **Color grading** | 팔레트 + 색온도 + **HEX 3~5개**. 10~20어 |
  | 5 | **Texture/Medium** | 매체·질감·표면 반응·후처리. 10~20어 |
  | 6 | **Text-in-image** (선택) | `"따옴표 카피"` + 폰트·크기·위치 + legibility 1회. 0~25어 |
  | — | 트레일링 | 끝에 `AR x:y` 토큰만 |

- **포맷 B — 화보 플랫 콤마형 단문**: 라벨 없이 콤마 한 문단, 350~450자, 기본 AR `2:3`. 슬롯 12종 순서·Tier-2 → `references/editorial-hwabo.md`.
- 라우팅: 단독 인물 화보/글래머 에디토리얼 → B, 그 외 전부 → A.

### K4. 사이즈 락 + 텍스트 렌더 요점

Codex(`$imagegen`) 경로는 6종만 안전, `auto` 금지, 챕터 내 통일: `1:1=1024x1024` · `16:9=1792x1024` · `2:3(·3:4·4:5 근사)=1024x1536` · `9:16=1024x1792` · `3:2(·4:3)=1536x1024` · 밀집/다컷=`2048x2048`. (하드 제약 4종: 최대변 3840·각 변 16배수·비율 ≤3:1·총픽셀 655,360~8,294,400 — 6종은 안전 부분집합(6종 안에서는 위반 불가). 투명 배경은 gpt-image-2 미지원 → 1.5 폴백. `$imagegen`은 플래그 없음 — size/quality는 산문+jsonl 필드로. 배치 ≤10장/호출.)

텍스트 렌더: 카피는 따옴표 고정+폰트·크기·위치·HEX, 한 줄 한 언어(한글+영문 혼합 금지). 카피 2개↑는 롤 라벨(headline/subhead/callout) 분리. 같은 카피 2회 표기 = 2회 렌더라서 금지. 한글 스펠아웃 금지(하이픈이 글자로 렌더). 정확도 레버 = 캔버스 크기(2048). 밀집 텍스트는 `quality: high`+큰 변.

### K5. 라우팅 표 (읽을 파일 = `skills/image-prompt-kit/` 기준)

| 요청 신호 | 카테고리/포맷 | 읽을 파일 |
|---|---|---|
| 단독 인물 화보·에디토리얼 | C1·포맷 B | `references/editorial-hwabo.md` (+`references/style-taxonomy.md`) |
| 타이포 포스터·글자가 곧 이미지·활자 견본·워드마크 | TP1~TP17 | `references/typo-poster-router.md` → `references/typo-poster/TPn-*.md` 1개 |
| 홍보판촉물·브랜드 포스터·표지 판면(앨범/북커버·패키징) | P1~P12 | `references/promo-router.md` → `references/promo/Pn-*.md` 1개. 카드뉴스 밀도 문법 금지(미감 사망) |
| 포스터·키아트·인포그래픽·카드뉴스·만화·도감·아이콘·뷰티·목업 | C2~C11 | `references/category-patterns.md` 해당 §. C6·C7=밀도 기본값·돌파 전술 §C6 |
| 프레젠테이션·슬라이드 덱 | C12 | `references/category-patterns.md` §C12 |
| 무드("있어보이게"·"럭셔리"·"영화처럼") | 룩 L1~L9 | `references/look-presets.md` 프리셋 1개 드롭인 |
| 시안 다변화·양산 컨셉·"컨셉부터" | M/R/X/T축 | `references/concept-axes.md` 축 1개 변주 |
| 글자 배치·폰트·그리드 | — | `references/typography-layout.md` |
| 카메라·조명·색 어휘 | — | `references/photo-vocab.md` |
| jsonl 배치·모델 팩트·완성 예제 | — | `references/jsonl-and-examples.md` |

라우터(P/TP)는 패턴 1개 선택 후 해당 파일 **하나만** 로드. 복수 매칭 시 위쪽 행 우선 — 경계 케이스는 각 라우터의 경계·교차 참조 절이 우선.

### K6. jsonl 레코드 스키마 (배치 = 1줄 1프롬프트)

```jsonc
{
  "id": "C1-LEVITATION-001",
  "category": "C1", "cut_type": "levitation_catalog", "title": "...",
  "format": "A",                       // "A"|"B"
  "tier": 0,                           // 0|1|2
  "lane": "standard",                  // "standard"|"editorial"
  "palette": ["#F7F4EC", "#B76E79"],
  "ar": "3:4", "size": "1024x1536",   // size=API 파라미터, ar=프롬프트 끝 토큰
  "quality": "medium",                 // auto 금지
  "full_prompt": "<순수 서술 ... 끝에 AR 3:4>",
  "labels": ["TRENCH COAT"], "korean_copy": "오늘 더 따뜻해요",
  "status": "draft"
}
```

`full_prompt`는 러너가 그대로 소비 — 끝에 AR만, 앞 브래킷·`Negative:` 섹션 없음. 전체 필드·QA 규약 = `references/jsonl-and-examples.md` §2.

### K7. 검증기

`node skills/image-prompt-kit/scripts/check_prompt.mjs <file>` (stdin 가능) · `--jsonl` 레코드 · `--tier <0|1|2>` 강제 · `--api`(사이즈락 → warning) · `--test` 셀프테스트. 티어 판정 우선순위: `--tier` > jsonl `tier` > `lane`("editorial"→2) > 휴리스틱(렌더 텍스트→1, 없으면 0) — Tier-2는 휴리스틱 승격 불가. 출력 `{ok, format, tier, errors, warnings}` — errors 0 = exit 0. 주요 에러: `E-NEG-TIER`(미선언 상위 티어)·`E-SLOT-LEAK`·`E-SIZE-LOCK`·`E-TIER2-PAIR`(tail 단독)·`E-TIER2-POS`(tail이 AR 직전 아님)·네거티브/앞브래킷/SD어휘/가중치/슬래시플래그/끝AR누락.

### K8. 완성 예시 (포맷 A — `examples/poster.txt` 원문, 검증 ok:true)

```
한국어 이벤트 포스터, 상업 인쇄 완성도.
Scene: 화면 상단 1/3에 굵은 세리프 메인 타이틀, 중앙에 달과 야시장 일러스트, 하단은 카피용 여백. 정돈된 매거진 레이아웃.
Camera: 정면 평면 구성, 중앙 대칭 정렬, 풀블리드.
Lighting: 부드러운 소프트박스 균등광, 옅은 콘택트 섀도로 깊이.
Color grading: 딥네이비 #0F1D30 배경, 크림 #F7F4EC 타이틀, 로즈골드 #B76E79 액센트는 달 테두리에만.
Texture/Medium: 매트 아트지 질감, 미세 그레인, 인쇄 톤.
Text-in-image: "봄밤 야시장" 상단 중앙(굵은 세리프), "4.20 SAT 6PM" 하단(콘덴스드 산세리프). 모든 텍스트는 한 번씩만, 완벽히 또렷하게.
AR 4:5
```

추가 예시 = `examples/`(hwabo_formatB·keyart_16x9·typography_card·bad_* 반례) + `examples/prompts.sample.jsonl`.

---

## L. Legacy 부록 — 일반 이론 · 웹 UI JSON 간이 경로 (§1~§14)

> ⚠️ **이하 §1~§14 = 일반 이론·참고 자료** (공냥이 구자료 기반 — Recaption·시그널 이론, 형식 비교, 치트시트). **gpt-image-2/`$imagegen` 산출 계약으로는 위 §0·§K가 우선**하며, 아래의 JSON 산출 예시들은 웹 UI(ChatGPT/Gemini) 간이 경로(§L = §3 JSON 구조)에서만 씁니다. §15(동영상)·§17(슬라이드)는 별도 도메인으로 유효.

## 1. 이미지 생성 프로세스 이해

### 1.1 기본 프로세스 흐름

```
사용자 입력 → LLM (프롬프트 해석/재구성) → Image Gen 모델 → 이미지 출력
```

**핵심 이해사항:**
- 이미지 생성 과정에서 **LLM과 Image Gen 두 모델**을 거침
- 프롬프트는 여러 모델들(LLM/VLM 등)을 거쳐 **재해석(Recaption)**됨
- ChatGPT의 경우: 사용자 입력 → GPT가 재구성 → gpt-image 모델에 전달

### 1.2 프롬프트 리라이트 (Recaption)

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

## 2. 핵심 개념

### 2.1 신뢰도 (Faithful)

**정의**: 생성된 이미지가 입력 프롬프트와 일치하는 정도

| 신뢰도 | 결과 |
|--------|------|
| 높음 | 프롬프트에 충실한 이미지 생성 |
| 낮음 | 모델이 멋대로 해석/재해석, **환각(Hallucination)** 발생 가능 |

**Tip**: Recaption이 적게 되면 신뢰도가 높아짐

### 2.2 시그널 (Signal)

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

## 3. 프롬프트 형식별 특징

### 3.1 5가지 주요 형식

| 형식 | 특징 | 적합한 용도 |
|------|------|------------|
| **자연어** | 직관적, 자유로움 | 일반적인 이미지 생성, 연결된 느낌 |
| **Markdown** | 계층 구조, 구분 명확 | 구획이 나뉜 인포그래픽 |
| **JSON** | 파라미터화, 재현성 | 배치 생성, A/B 테스팅, 일관성 필요 시 |
| **XML** | 엄격한 구조, 명확한 구분 | 엔터프라이즈, 구획 인포그래픽 |
| **YAML** | 가독성, 설정 | 시스템 프롬프트, 설정 파일 |

### 3.2 형식별 결과 차이

**타임라인/인포그래픽 생성 시:**
- **자연어/JSON/YAML**: 연결된 느낌, 매끄러운 흐름
- **Markdown/XML**: 명백한 구분, 각 섹션이 확실하게 나뉨

**핵심 인사이트:**
> "구분된 섹션을 나눠서 만들 때는 **XML이나 마크다운**을 선호합니다."
> "인포그래픽 디자인의 경우 **계층구조 설계가 필수**고 이를 표현하는 가장 쉬운 방법이 **마크다운**"

### 3.3 (§L) JSON 프롬프트 예시 — 웹 UI 간이 경로/legacy

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

### 3.4 다중 이미지 JSON 구조

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

### 3.5 Markdown 프롬프트 예시

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

## 4. 일상적 Tips

### 4.1 키워드 반복으로 시그널 강화

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

### 4.2 띄어쓰기로 토큰 구분

**문제**: 한글의 동음이의어
- "눈을" → 눈(eye)? 눈(snow)?

**해결 방법:**
```
❌ "큰 눈동자를 가진 소녀"
✅ "큰 눈 동자를 가진 소녀" (띄어쓰기로 구분)
✅ "큰 눈(eye)을 가진 소녀" (영어 병기)
```

### 4.3 영어 키워드 혼합 사용

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

### 4.4 짧은 vs 긴 프롬프트

| 프롬프트 길이 | 특징 | 용도 |
|--------------|------|------|
| **짧음** | 모델에게 자유도 부여, 창의적 결과 | 아이디어 탐색 단계 |
| **김** | 더 구체적, 제어된 결과 | 구체적인 결과물 필요 시 |

### 4.5 네거티브 프롬프트

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

## 5. 고급 Tips

### 5.1 구조화된 프롬프트

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

### 5.2 스타일 레퍼런스

**유명 화가/아티스트/스타일 언급:**
```
"in the style of Studio Ghibli"
"Van Gogh style painting"
"watercolor illustration"
```

**주의**: 저작권 이슈 가능, 일부 플랫폼에서 특정 아티스트 이름 차단 (⚠️ ChatGPT는 생존 아티스트명 하드 블록)

### 5.3 카메라/렌즈 용어 활용

| 카테고리 | 키워드 예시 |
|----------|------------|
| **카메라 앵글** | bird's eye view, low angle, close-up, wide shot |
| **렌즈** | 85mm portrait lens, fisheye lens, macro lens |
| **조명** | golden hour, studio lighting, backlighting |
| **사진 스타일** | film photography, polaroid, DSLR quality |

### 5.4 아스펙트 비율

| 비율 | 용도 |
|------|------|
| **1:1** | 정사각형, 인스타그램 |
| **16:9** | 와이드, 유튜브 썸네일, 배너 |
| **9:16** | 세로형, 스토리, 릴스 |
| **4:3** | 전통적 사진 비율 |
| **3:2** | 35mm 필름 비율 |

### 5.5 시드(Seed) 값 활용

**용도:**
- 동일한 프롬프트로 재현 가능한 결과물 생성
- 캐릭터 일관성 유지
- 시리즈물 제작
- A/B 테스트

---

## 6. 시네마틱 조명 & 색상 테크닉

### 6.1 조명 종류

| 조명 | 설명 | 프롬프트 |
|------|------|----------|
| **Rembrandt Lighting** | 얼굴 한쪽에 삼각형 빛 패치 | `Rembrandt lighting, dramatic shadow, triangular light patch` |
| **Chiaroscuro** | 극단적 명암 대비 | `Chiaroscuro lighting, extreme contrast, baroque style` |
| **Golden Hour** | 황금빛 일출/일몰 조명 | `Golden hour lighting, warm orange-yellow tones` |
| **Blue Hour** | 해 진 직후 파란빛 | `Blue hour lighting, cool blue tones, twilight atmosphere` |
| **Noir Lighting** | 필름 누아르 스타일 | `Film noir lighting, high contrast, harsh shadows` |
| **Neon Lighting** | 사이버펑크 네온 | `Neon lighting, cyberpunk, pink and blue glow` |

### 6.2 색상 기법

| 기법 | 설명 | 프롬프트 |
|------|------|----------|
| **보색 대비** | 오렌지-블루 등 | `Complementary color scheme, orange and blue contrast` |
| **유사색 조화** | 비슷한 톤 | `Analogous color harmony, warm earth tones` |
| **모노크로매틱** | 단색 계열 | `Monochromatic blue palette, various shades` |

---

## 7. 스타일별 프롬프트 템플릿

### 7.1 제품 사진

```
Clean product photography, [제품 이름] centered,
white seamless background, soft box lighting,
professional studio setup, commercial quality,
sharp focus, no reflections
```

### 7.2 푸드 포토그래피

```
Editorial food photography, [음식 이름],
dark moody background, dramatic side lighting,
fresh ingredients scattered around,
professional food styling, appetizing presentation
```

### 7.3 패션 포토그래피

```
High fashion editorial photography, Vogue magazine style,
[모델 설명], avant-garde [의상/액세서리],
dramatic studio lighting, full body shot,
professional fashion photography
```

### 7.4 3D 스타일라이즈드 캐릭터

```
3D stylized character, [캐릭터 설명],
Pixar/Disney style, expressive features,
soft subsurface scattering, character design
```

### 7.5 아이소메트릭 디자인

```
Isometric room design, [공간 설명],
30-degree angle, detailed interior,
cute miniature style, vibrant colors
```

### 7.6 스티커 디자인

```
Die-cut sticker design, [주제/캐릭터],
white border outline, vibrant colors,
kawaii cute style, vector illustration
```

### 7.7 만화/코믹 스타일 (Manga/Comic)

> **출처**: @specal1849의 나노바나나2 만화 제작 프롬프트

#### 3단계 프롬프트 구조

```
[장면 설명] + [스타일 정의] + [기술적 사양]
```

| 단계 | 설명 | 예시 |
|------|------|------|
| **장면 설명** | 원하는 이미지의 구체적 묘사 | "A samurai cat standing on a rooftop" |
| **스타일 정의** | 아트 스타일, 분위기 | "Style: Dark Fantasy, dramatic lighting" |
| **기술적 사양** | 해상도, 비율, 렌더링 | "hyperrealistic, cinematic, 16:9" |

#### 만화 제작 태그 (Panel Layout Tags)

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

#### 스타일 태그

```
Style: Dark Fantasy     → 어둡고 신비로운 판타지
Style: Cyberpunk        → 네온, 미래 도시, 사이버네틱
Style: Romance Fantasy  → 로맨틱하고 부드러운 판타지
Style: Anime           → 일본 애니메이션 스타일
Style: Watercolor      → 수채화 느낌
Style: Oil Painting    → 유화 스타일
```

#### 4컷 만화 프롬프트 예시

```
A 4-panel manga comic, monochrome style with screentone,
Panel 1: A cat waking up sleepily
Panel 2: Cat sees empty food bowl, shocked expression
Panel 3: Cat meowing loudly at owner
Panel 4: Happy cat eating, speech bubble "Finally!"
manga style, clean linework, expressive characters
```

#### 액션 장면 프롬프트 예시

```
Dynamic manga action scene, monochrome,
samurai cat slashing with katana,
action lines, dramatic angle,
multiple speed lines, intense expression
```

---

## 8. 인포그래픽 제작 가이드

### 8.1 Chain 프롬프팅 활용

**단계별 접근:**
1. **조사**: AI 뉴스나 콘텐츠 조사
2. **구조화**: Markdown으로 계층 구조 설계
3. **생성**: 이미지 생성 툴에 입력

### 8.2 인포그래픽 프롬프트 구조

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

### 8.3 편향성 제어

**문제점:**
- 한국어 텍스트를 잘못 처리
- 기본적으로 인포그래픽 형태로만 생성하려 함

**해결책:**
- 세부 프롬프트로 명확하게 지시
- "카드뉴스" 형태로 직접 명시
- 특정 부분을 길게 쓰도록 강제

---

## 9. 분위기/무드 키워드 치트시트

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

## 10. 조명 키워드 치트시트

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

## 11. 렌즈/카메라 키워드 치트시트

| 효과 | 영어 키워드 |
|------|-------------|
| 아웃포커스 | shallow depth of field, bokeh, f/1.4 |
| 와이드 | wide angle, 24mm, fisheye |
| 망원 | telephoto, 200mm, compressed |
| 매크로 | macro, close-up, extreme detail |
| 틸트시프트 | tilt-shift, miniature effect |
| 필름 | film grain, 35mm film, analog |

---

## 12. 구도 & 카메라 샷 테크닉

### 12.1 카메라 앵글

| 앵글 | 설명 | 프롬프트 |
|------|------|----------|
| Eye Level | 자연스러운 시점 | `Eye level shot, natural perspective` |
| Low Angle | 강력한 존재감 | `Low angle shot, dramatic, powerful` |
| High Angle | 취약한 느낌 | `High angle shot, diminishing effect` |
| Dutch Angle | 긴장감 | `Dutch angle, tilted, tension` |
| Bird's Eye | 직접 위에서 | `Bird's eye view, overhead, pattern` |
| Worm's Eye | 극단적 로우앵글 | `Worm's eye view, extreme low angle` |

### 12.2 프레이밍 기법

| 기법 | 설명 | 프롬프트 |
|------|------|----------|
| Rule of Thirds | 3분할 법칙 | `Rule of thirds composition, balanced` |
| Leading Lines | 유도선 | `Leading lines composition, depth` |
| Frame within Frame | 프레임 속 프레임 | `Frame within frame, layered depth` |
| Symmetry | 대칭 | `Symmetrical composition, mirror-like` |

### 12.3 샷 거리

| 샷 타입 | 설명 | 프롬프트 키워드 |
|---------|------|-----------------|
| Extreme Close-up | 얼굴 일부 | ECU, extreme detail shot |
| Close-up | 얼굴 전체 | close-up portrait |
| Medium Shot | 허리 위 | medium shot, waist up |
| Long Shot | 전신 | full body shot |
| Extreme Long Shot | 풍경 속 인물 | wide establishing shot |

---

## 13. 자주 하는 실수들

### 13.1 너무 모호한 프롬프트

```
❌ "예쁜 여자"
✅ "검은 긴 머리, 큰 눈, 하얀 드레스를 입은 20대 여성, 정면을 바라보는"
```

### 13.2 상충되는 지시

```
❌ "밝고 어두운 분위기"
✅ 하나의 명확한 분위기 선택
```

### 13.3 너무 많은 요소

- 프롬프트가 길어질수록 일부 요소가 무시될 수 있음
- **핵심 요소에 집중**

### 13.4 추상적 개념만 나열

```
❌ "행복한 느낌"
✅ "웃고 있는 아이의 클로즈업"
```

### 13.5 부정형 지시 과다

- "no watermark" 보다 **원하는 것을 직접 묘사**하는 게 효과적

---

## 14. 핵심 정리

### 14.1 기본 원칙 5가지

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

### 14.2 형식 선택 가이드

| 상황 | 권장 형식 |
|------|----------|
| **gpt-image-2 / Codex `$imagegen` (정본)** | **킷 텍스트 프롬프트** — 포맷 A 라벨 6섹션 / 포맷 B 콤마형 + 끝 `AR` (§K) · 배치 = jsonl |
| 기본 이미지 생성 (웹 UI 간이 경로) | JSON (구조화된 속성 + 유연한 자연어 details) |
| 구분된 섹션/인포그래픽 | **XML** 또는 **Markdown** |
| 연결된 느낌/타임라인 | **JSON** 또는 **YAML** |
| 배치 생성/일관성 필요 | **JSON** |
| 간단한 단일 이미지 | **자연어** (짧은 설명 시) |

### 14.3 핵심 인사이트

> **"구조화 안되면 아무것도 못만든다"**
>
> **"시스템화하는게 훨씬 좋다"**
>
> - 공냥이(@specal1849)

---

## 15. 동영상 프롬프트 JSON 구조 (Veo/Kling 등)

> **핵심 원칙**: 이미지와 동일하게 JSON으로 구조를 잡고, 유연한 설명이 필요한 부분만 자연어로 작성합니다.

### 15.1 단일 동영상 구조

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

### 15.2 다중 장면 구조

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

### 15.3 오디오 프롬프트 표기법

| 유형 | 표기 방법 | 예시 |
|------|----------|------|
| **대화** | '따옴표' 사용 | 'Hello, how are you?' |
| **음향효과** | 명시적 설명 | door creaking, footsteps on gravel |
| **배경음** | 환경 설명 | ambient city noise, gentle rain |

### 15.4 카메라 워크 키워드

| 카메라 워크 | 영어 키워드 |
|------------|------------|
| 패닝 | pan left, pan right, slow pan |
| 줌 | zoom in, zoom out, dolly zoom |
| 트래킹 | tracking shot, follow shot |
| 고정 | static shot, locked off |
| 드론 | aerial shot, drone sweep |
| 핸드헬드 | handheld, shaky cam |

### 15.5 동영상 전용 체크리스트

- [ ] 주제/피사체가 명확한가?
- [ ] 동작/움직임이 구체적으로 설명되었는가?
- [ ] 카메라 워크가 지정되었는가?
- [ ] 오디오 요소가 포함되었는가? (대화/효과음/배경음)
- [ ] 길이(duration)가 명시되었는가?
- [ ] 제외할 요소(negative)가 정리되었는가?
- [ ] 비영어 대사 시 영어 감정/말투 메타 지시가 함께 들어갔는가? (15.6 참조)

### 15.6 비영어 대사 자연스럽게 만들기 (Veo / Sora / Seedance / Kling 공통)

> **핵심 원칙**: 비영어 대사를 그대로만 넣으면 표정·억양이 어색해진다. 괄호 안에 **언어 표시 + 영어로 작성한 감정/말투 묘사**를 함께 적으면 자연스러워진다.
>
> 출처: [@itsyun_ai](https://www.threads.com/@itsyun_ai/post/DXyxUwXghcR) (Seedance 한국어 대사 검증, 2026-05-01). 시나리오 작법(stage direction) 컨벤션이라 동영상 모델 전반에 일반화 가능.

#### 패턴

```
Dialogue - {Character}: ({English emotion/manner descriptor} in {Target Language}{, additional nuance}) "{대사 — 모국어 그대로}"
```

- **언어 표시**: `in Korean`, `in Japanese`, `in Spanish` 등 (필수)
- **감정/말투 묘사**: 영어 형용사·부사 (Whispering, angrily, dripping with rage, gleefully …)
- **추가 nuance**: 상세 컨텍스트 (with intense focus, voice cracking, barely audible)

#### 예시

| 시나리오 | 프롬프트 |
|----------|---------|
| 한국어 / 진지한 속삭임 | `Dialogue - Man: (Whispering in Korean with intense focus) "알파... 작전 개시."` |
| 한국어 / 분노 | `Dialogue - Wife: (Speaking angrily in Korean, voice dripping with rage) "뭐해?!!!"` |
| 일본어 / 부드러움 | `Dialogue - Woman: (Speaking softly in Japanese with a gentle smile) "ありがとう。"` |
| 스페인어 / 흥분 | `Dialogue - Boy: (Shouting excitedly in Spanish) "¡Vamos!"` |
| 중국어 / 슬픔 | `Dialogue - Mother: (Speaking sorrowfully in Mandarin, voice cracking) "回家吧。"` |

#### 감정 키워드 사전 (영어로 작성 권장)

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

#### 적용 가능 모델

| 모델 | 검증 상태 | 비고 |
|------|----------|------|
| **Seedance** | ✅ 검증됨 | itsyun_ai (2026-05-01, 한국어) |
| **Veo 3.1** | ⚠️ 일반화 적용 | 네이티브 다국어 음성 지원, 동일 패턴 호환 예상 |
| **Sora 2** | ⚠️ 일반화 적용 | 대화 프롬프트 stage direction 컨벤션 학습 |
| **Kling 3.0** | ⚠️ 일반화 적용 | 영어 메타 지시 인식 |

> ⚠️ 표시는 패턴 자체가 모델 비종속(시나리오 작법 컨벤션)이라 **이론적으로 적용 가능**하다는 의미. 모델별 미세 차이(억양·감정 깊이·발음)는 실제 생성으로 확인 필요.

#### JSON 통합 예시 (15.1 단일 동영상 구조에 적용)

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

#### 안티패턴

| ❌ 비효율 | ✅ 권장 |
|---------|---------|
| `"뭐해?!" (분노)` (한국어 메타) | `(Speaking angrily in Korean) "뭐해?!"` |
| `Korean dialogue: "알파... 작전 개시."` (메타 분리) | 괄호 한 묶음 + in Korean 명시 |
| `"안녕하세요" 라고 화내며 말한다` (서술문 혼합) | Dialogue 필드 + 괄호 메타로 분리 |
| 감정만 쓰고 언어 누락: `(angrily) "뭐해?!"` | 항상 `in {Language}` 명시 (모델이 영어로 발화하는 사고) |

---

## 16. 프롬프트 생성 체크리스트

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

## 참조 자료

### 원본 자료 (공냥이 @specal1849)

- **이미지 프롬프트 101 슬라이드**: https://docs.google.com/presentation/d/1rPQVnbu1INJyUAqCvMA7dkO2WzJpD4Q9q_UXq9RH2GU/edit
- **PRO 이미지 프롬프트 Notion**: https://fascinated-alley-b43.notion.site/PRO-2b1861d1faaf80b8bf7ef4093827f59b
- **나노바나나pro 마스터하기**: https://www.threads.com/@specal1849/post/DRYW09dEtUi
- **이미지 프롬프트 심화이론 - JSON vs YAML**: https://www.threads.com/@specal1849/post/DRp8XdFE2VH

### Obsidian Vault 연결 노트

- `Threads/3-이미지-프롬프트-JSON-2025-01-11.md` - JSON/YAML/XML/Markdown 형식 비교
- `Threads/5-제미나이-나노바나나-활용-2025-01-11.md` - 나노바나나 활용법
- `Threads/1-프롬프트-심화이론-화용론-2025-01-11.md` - 프롬프트 이론 심화

---

## 17. 슬라이드 이미지 생성

프레젠테이션 슬라이드를 AI 이미지로 생성할 때의 가이드.

> **상세 가이드**: `slide-prompt-guide.md` 스킬 파일 참조

### 17.1 슬라이드 이미지 필수 규칙

| 규칙 | 설명 |
|------|------|
| **16:9 비율 필수** | 모든 슬라이드는 와이드스크린 비율 |
| **shared_style** | 전체 덱에 일관된 스타일 적용 (색상, 타이포, 배경) |
| **session_id** | 같은 세션 ID로 일관성 유지 |
| **폰트명 금지** | 시각적 외형으로 설명 ("둥근 산세리프", "굵은 기하학적") |
| **텍스트 최소화** | 슬라이드당 1 메시지 원칙 |
| **자체 설명** | 구두 설명 없이 이해 가능하게 |

### 17.2 슬라이드 전용 JSON 구조

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

### 17.3 슬라이드 유형별 이미지 구성

| 유형 | 비주얼 비중 | 텍스트 비중 | 구성 요소 |
|------|-----------|-----------|----------|
| Cover | 80% | 20% | 강렬한 비주얼 + 큰 타이틀 |
| Context | 70% | 30% | 배경 일러스트 + 핵심 질문 |
| Content | 60% | 40% | 도표/아이콘 + 핵심 포인트 |
| Data | 50% | 50% | 차트/그래프 + 강조 숫자 |
| Closing | 75% | 25% | 기억될 이미지 + CTA |

### 17.4 STYLE_INSTRUCTIONS 블록

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

> **27개 비주얼 스타일과 7개 내러티브 모드 상세**: `slide-prompt-guide.md` 참조

---

## Skill Metadata

**Created**: 2025-12-28
**Version**: 2.0.0
**Author**: Claude Code (공냥이(@specal1849)님 자료 기반)
**Last Updated**: 2026-07-29
**Changes v2.0.0** (2026-07-29):
- **[MAJOR] 정본 계약 교체 — 공냥 프롬프트 킷 v4 이식**: gpt-image-2/`$imagegen` 산출 = 킷 텍스트 프롬프트(포맷 A 라벨 6섹션 / 포맷 B 화보 콤마형 + 끝 `AR`), 배치 = jsonl 레코드. 구 JSON 골격(6키 purpose/hero/… 및 subject/style JSON)은 웹 UI 간이 경로 legacy로 강등(§0·§K 배너)
- **[MAJOR] §K 신설**: 킷 핵심 충실 전사 — 워크플로우·철칙 9(티어드 네거티브: 기본 전면 긍정형+Tier-1 화이트리스트 7종+Tier-2 페어)·포맷 A/B·사이즈 락 6종·텍스트 렌더 요점·라우팅 표(C1~C12/P1~P12/TP1~TP17/L1~L9/M·R·X·T축)·jsonl 스키마·검증기(check_prompt.mjs)·완성 예시
- **[MAJOR] 킷 원문 vendor**: `skills/image-prompt-kit/`(KIT-SKILL.md·references 전체·검증기+fixtures·examples txt/jsonl·LICENSE, rev fb5f75f, MIT) — 외부 스킬 우회 금지 원칙 유지하며 내부 동봉으로 해소
- 계기: 이미지 생성 막힘 — 구 JSON 계약·네거티브 스택이 킷 규칙(전면 긍정형·SD어휘 금지)과 상충 (재경님 2026-07-28 지시 "킷을 최대한 가져오기")
**Changes v1.10.0** (2026-05-02):
- **[NEW] 비영어 대사 자연스럽게 만들기 섹션 추가** (15.6): 언어 표시 + 영어 감정/말투 메타 지시 패턴. Seedance·Veo·Sora·Kling 공통 적용
- **5개 시나리오 예시 추가**: 한/일/스페인/중국어 + 감정 키워드 사전(8 감정)
- **JSON 통합 예시 추가**: 15.1 단일 동영상 구조에 적용 (audio.dialogue 필드)
- **안티패턴 4건 추가**: 한국어 메타·메타 분리·서술문 혼합·언어 누락
- **체크리스트 항목 추가**: "비영어 대사 시 영어 감정/말투 메타 지시 포함"
- **출처**: [@itsyun_ai](https://www.threads.com/@itsyun_ai/post/DXyxUwXghcR) Threads 포스트 (Seedance 한국어 대사 검증, 2026-05-01)
**Changes v1.9.0**:
- **[NEW] NanoBanana2 (Gemini 3.1 Flash Image) 섹션 추가** (섹션 18): NB Pro vs NB2 비교, 서술형 프롬프트 전략, 5요소 프레임워크
- **NB2 CJK 텍스트 렌더링 팁 추가**: 한국어 텍스트 200-300자 제한
- **14종 종횡비 테이블 추가**: 극단 비율 포함
- **Web Search Grounding 활용법 추가**: Google Search 연동 이미지 생성
**Changes v1.8.0**:
- **[NEW] 슬라이드 이미지 생성 섹션 추가** (섹션 17): 16:9 필수, shared_style, session_id, STYLE_INSTRUCTIONS 블록
- **슬라이드 전용 JSON 구조 추가**: cover/context/content/data/closing 유형별 구성
- **slide-prompt-guide.md 참조 연결**: 27개 스타일, 7개 내러티브 모드
**Changes v1.7.2**:
- **[FIX] generation_instruction 명확화**: "ONLY ONE image per call", "Do NOT combine multiple images" 명시로 다중 이미지 합성 방지
**Changes v1.7.1**:
- **[FIX] generation_instruction 영어로 변환**: 나노바나나 프로 다중 이미지 순차 생성 문제 해결 - "ONE AT A TIME", "in sequence" 명시
**Changes v1.7.0**:
- **[NEW] 다중 이미지 JSON 구조 추가** (섹션 3.4): `generation_instruction` 필드로 순차 생성 지시 포함, `description`→`prompt` 변경
**Changes v1.6.0**:
- **[NEW] 만화/코믹 스타일 섹션 추가** (섹션 7.7): @specal1849 나노바나나2 만화 제작 가이드 통합
- **만화 제작 태그 추가**: monochrome, screentone, multiple panels, speech bubble, action lines 등
- **3단계 프롬프트 구조 추가**: [장면 설명] + [스타일 정의] + [기술적 사양]
- **스타일 태그 추가**: Dark Fantasy, Cyberpunk, Romance Fantasy, Anime, Watercolor, Oil Painting
- **4컷 만화/액션 장면 예시 프롬프트 추가**
**Changes v1.5.0**:
- **[MAJOR] 동영상 프롬프트 JSON 구조 추가** (섹션 15): Veo/Sora 등 동영상 생성 모델용 JSON 템플릿 추가
- **오디오 프롬프트 표기법 추가**: 대화/음향효과/배경음 표기 가이드
- **카메라 워크 키워드 추가**: 패닝, 줌, 트래킹, 드론샷 등
- **동영상 전용 체크리스트 추가**
**Changes v1.0.1**: DALL-E를 gpt-image 모델로 수정 (정확한 모델명 반영)
