# 타이포·레이아웃 — 영역 문법·롤 라벨·정확 문자열·Tier-1 가드 (typography-layout)

> 렌더 텍스트가 있는 컷(C3 포스터·C4 도감 라벨·C6 인포그래픽·C7 카드뉴스)에서 본다. 모든 표현은 **긍정형** — 유일한 예외는 5절 Tier-1 화이트리스트(동결 문자열, byte-for-byte 인용)뿐. 예시 문구는 Scene 또는 Text-in-image 섹션에 그대로 떨어뜨리는 드롭인용.

## 목차

1. [영역 문법](#1-영역-문법) — 3×3 그리드 · 밴드 · 세이프에어리어 · 정렬
2. [롤 라벨 블록](#2-롤-라벨-블록) — headline/subhead/callout/caption/badge/CTA 위계·영역 페어링
3. [폰트 어휘 KO+EN](#3-폰트-어휘-koen) — 서체 계열 · weight · 케이스 · 자간 · 텍스트 HEX
4. [정확 문자열 프로토콜](#4-정확-문자열-프로토콜) — 따옴표 고정 · 철자 풀어쓰기 · 언어 분리
5. [Tier-1 가독 가드](#5-tier-1-가독-가드) — 캐노니컬 결합 1줄 · 화이트리스트 · 승격 조건
6. [그리드·멀티패널](#6-그리드멀티패널) — 명시 그리드 스펙 · 패널 번호 서술 · 철칙 #6 예외
7. [밀집 텍스트 페어링](#7-밀집-텍스트-페어링) — 텍스트량 ↔ quality·size 매핑

## 1. 영역 문법

**3×3 그리드 — 위치는 이름으로 박는다** (모호한 "위쪽에" 대신):

| KO | EN 토큰 | KO | EN 토큰 | KO | EN 토큰 |
|---|---|---|---|---|---|
| 좌상 | `top-left corner` | 상중 | `top-center` | 우상 | `top-right corner` |
| 중좌 | `middle-left` | 정중앙 | `dead center` | 우중 | `middle-right` |
| 좌하 | `bottom-left corner` | 하중 | `bottom-center` | 우하 | `bottom-right corner` |

**밴드 시스템** — 가로 전폭 띠로 텍스트 층을 분리:
- 상단 1/3 타이틀 밴드: `title band occupying the top third`
- 중앙띠: `central horizontal band across the middle`
- 하단 캡션 밴드: `bottom caption band`

**세이프에어리어·여백** (`negative space`는 허용 어휘 — 검증기가 flag하지 않음):
- 가장자리 마진: `clear margin of ~5% on all edges`
- 헤드라인 호흡: `generous negative space around the headline`

**정렬 어휘:**
- 중앙 정렬 대칭: `centered symmetrical composition`
- 좌측 정렬: `left-aligned ragged-right text block`
- 저스티파이: `justified text block, even left and right edges`

**드롭인 예시** (Scene/Text-in-image에 그대로):
- `headline "겨울, 서울" centered in the title band occupying the top third, generous negative space around the headline`
- `caption "2026.01.10 - 02.28" in the bottom caption band, left-aligned ragged-right, clear margin of ~5% on all edges`
- `small badge in the top-right corner, price callout at middle-right`

> **v2 실측 (실험 C):** 영역 문법은 전 패턴에서 느슨한 서술 이상(밴드 P1 5.0 vs 4.5, 캡션밴드·3x2 그리드 동률 만점) — 특히 서브 영역 정밀 준수(테두리 마진·좌측 정렬 축자 이행)에서 우세. 확정 채택.

## 2. 롤 라벨 블록

카피 2개+면 각 블록에 **롤 이름을 먼저 붙이고 따옴표 카피를 뒤에** — OpenAI 권장 패턴이자 검증기 W-TEXT-ROLE 회피: `headline "…", subhead "…"`. 롤 없이 따옴표만 나열하면 모델이 위계를 임의 배분한다.

| 롤 | 크기 위계 언어 | 추천 영역 |
|---|---|---|
| headline | `dominant headline, roughly one-third of canvas width` | 상단 1/3 타이틀 밴드 |
| subhead | `subhead at half the headline size` | headline 바로 아래, 같은 정렬 |
| callout | `small floating label with a hairline leader line` | 중좌/우중 (제품 주변) |
| caption | `small caption text` | 하단 캡션 밴드 |
| badge | `compact pill-shaped badge` | 우상 코너 |
| CTA | `button-style CTA, high-contrast fill` | 하중 |

**드롭인 예시:**
- `headline "국물의 계절" dominant, roughly one-third of canvas width; subhead "12월 한정 메뉴" at half the headline size, directly below`
- `callout "320g" as a small floating label with a hairline leader line to the jar, middle-right`
- `CTA "지금 예약" as a button-style pill at bottom-center, white text on #B76E79`

## 3. 폰트 어휘 KO+EN

폰트명(실재 서체) 대신 **계열+성격**으로. 상표 폰트명은 철칙 #8 위반 소지.

| KO 계열 | EN 토큰 |
|---|---|
| 명조/세리프 | `bold serif`, `high-contrast didone`, `elegant thin serif` |
| 돋움/고딕/산세리프 | `clean geometric sans-serif`, `modern grotesque sans` |
| 콘덴스드 | `condensed sans-serif, tall narrow letterforms` |
| 캘리그래피/손글씨 | `Korean brush calligraphy`, `casual handwritten script` |
| 모노스페이스 | `monospace, typewriter character` |

- **Weight:** `hairline` / `light` / `medium` / `bold` / `black` — "얇게" 대신 weight 단어로.
- **케이스 지시:** 영문은 `ALL CAPS` / `Title Case` / `all lowercase` 명시.
- **자간:** 넓게 `wide letter-spacing`, 좁게 `tight kerning`. 한글 타이틀은 `wide letter-spacing` 궁합이 좋다.
- **텍스트 색은 HEX로 박는다** (철칙 #5): `headline in #0F1D30 on a #F7F4EC field`.

**드롭인 예시:** `headline "설맞이 특가" in bold high-contrast didone serif, black weight, wide letter-spacing, #1E3A5F` / `subhead in light geometric sans-serif, ALL CAPS, tight kerning, #B76E79`

## 4. 정확 문자열 프로토콜

1. **따옴표가 카피를 고정한다.** 정확한 문구는 반드시 `text reads "오늘 더 따뜻해요"` 식으로 따옴표 안에. 같은 카피 2회 쓰면 2회 렌더(E-TEXT-DUP).
2. **verbatim 요구.** 오탈자 민감 카피엔 `verbatim, no extra characters`를 붙인다 — Tier-1 화이트리스트 문자열이므로 5절 승격 조건 하에서만(렌더 텍스트 존재 + 티어 선언).
3. **한글 스펠아웃 금지 — 캔버스를 키워라.** 하이픈 풀어쓰기(`"붉-은 벽-돌"`)는 하이픈이 글자로 렌더되는 사고가 실측됨(v2 실험 A: 고스트 하이픈 7개). 한글 정확도의 1순위 레버는 **캔버스 크기** — 2048은 전 반복 만점(12/12), 실패는 전부 1024에서 발생. 어려운 철자는 따옴표 고정 + 큰 변 페어링(§7)으로 해결. 영문 로고타입/조어에 한해 `ALL CAPS` 또는 스펠아웃을 최후수단으로 허용.
4. **언어 라벨 분리.** 한 따옴표 문자열 안 KO+EN 혼합 금지(W-TEXT-MIXLANG). 스크립트가 섞이면 줄을 나눠 라벨링:
   - `Korean text: "겨울 세일"` (별도 줄)
   - `English text: "WINTER SALE"` (별도 줄)
5. **렌더 라벨엔 실제 문구만.** `[TITLE]`·`{상품명}` 같은 플레이스홀더는 그대로 렌더된다(E-SLOT-LEAK).
6. **한글은 로마자 변환 금지.** `render the Hangul characters exactly as given` — "gyeoul" 식 로마자를 주면 로마자가 그려진다.

## 5. Tier-1 가독 가드

**기본값(티어 0)은 긍정형 1줄** — 렌더 텍스트가 있는 모든 컷에 1회:

```
모든 텍스트는 한 번씩만, 완벽히 또렷하게
```

**Tier-1 승격 시** 캐노니컬 결합 1줄(동결, byte-for-byte — 유일한 권장 방출형):

```
All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.
```

**Tier-1 화이트리스트** (정확 문자열, case-insensitive — 이 7개 밖 영어 부정문은 전부 E-NEG-001):

| 문자열 | 용도 |
|---|---|
| `no extra words` | 카피 외 텍스트 발명 차단 |
| `no duplicate text` | 동일 카피 중복 렌더 차단 |
| `no invented glyphs` | 유령 글리프·가짜 한글 차단 |
| `no watermark` | 워터마크 차단 |
| `no logo` | 임의 로고 차단 |
| `no extra text` | 배경 잡텍스트 차단 |
| `verbatim, no extra characters` | 따옴표 카피 축자 렌더 |

**WHEN — 승격 조건** (해당 없으면 티어 0 긍정형 유지):

| 조건 | 예 |
|---|---|
| (a) 텍스트 블록 3개+ | headline+subhead+caption+badge |
| (b) KO/EN 혼합 카피 | 한글 타이틀 + 영문 태그라인 |
| (c) 실패 후 재시도 | 중복 렌더·유령 글리프 나온 컷 리트라이 |
| (d) 밀집 텍스트 산출물 | 카드뉴스 본문 · 인포그래픽 · 도감 라벨 |

**유효 조건:** 프롬프트에 렌더 텍스트(따옴표 카피/Text-in-image)가 실제로 있을 때만. 없는데 쓰면 E-NEG-TIER. 티어 선언 없이 화이트리스트 문구를 쓰는 것도 E-NEG-TIER — jsonl `tier: 1` 또는 `--tier 1`로 선언.

## 6. 그리드·멀티패널

**철칙 #6(1행=1컷=1호출)의 명시 예외** — 그리드가 **단일 산출물 그 자체**일 때만 캔버스 내부 그리드 허용:
- C7 카드뉴스 한 장 **내부** 그리드 (tip 3분할 등)
- C10 만화 **A전략** 멀티패널 통합 1페이지
- C4 `comparison_grid` (한 도감 컷 안 비교 매트릭스)

독립 컷 여러 개를 한 캔버스에 배치해 호출 수를 아끼는 용도는 **여전히 금지** — 그건 N개 별도 행.

**그리드 스펙은 명시 수치로:**
- `3x2 grid of six cards, equal gutters`
- `4-panel vertical strip, thin white gutters`
- `2x2 comparison grid with a hairline divider`

**패널은 번호로 서술** — 스타일·캐릭터 일관성 유지의 핵심:

```
Panel 1: establishing wide shot, 주인공이 카페 문을 연다.
Panel 2: close-up on her surprised face, 말풍선 "어?"
Panel 3: reaction shot, warm rim light, 말풍선 "왔구나"
```

패널마다 `카메라앵글 + 장면 + 감정`을 반복하고, 화풍·팔레트 문장은 그리드 전체에 1회만 (컷별 반복 시 스타일 드리프트).

## 7. 밀집 텍스트 페어링

글리프 정확도는 **캔버스 크기에 비례** — v2 실측(실험 A, 2×2×2)에서 `2048x2048`은 한글 카피 전 반복 만점(12/12), 실패는 전부 1024에서 발생. quality(medium vs high)는 유의차 없었음 — **돈을 쓸 곳은 quality보다 size**. 카피 정확도가 크리티컬하면 1~2줄이어도 2048 또는 1536 장변으로.

| 텍스트량 | quality | size |
|---|---|---|
| 텍스트 블록 3개+ 또는 작은 활자(캡션·라벨·본문) | `high` | `2048x2048` 또는 1536 장변(`1536x1024`/`1024x1536`) |
| 짧은 카피 1~2줄 (타이틀+서브 정도) | `medium` OK | AR 매핑 기본 size |
| 카드뉴스 본문·인포그래픽·도감 라벨 (밀집) | `high` 필수 | `2048x2048` 우선 |

- 텍스트 heavy 레코드가 `quality≠high`면 W-TEXT-QUALITY.
- 밀집 컷을 세로/가로로 뽑아야 하면 1536 장변 6종 안에서 해결 — 커스텀 size는 codex 경로 밖(E-SIZE-LOCK).
- 재시도 루프: 글리프 실패 → 5절 (c) Tier-1 승격 + size 한 단계 업이 기본 처방.
