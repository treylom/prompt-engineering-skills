# 컨셉 변수 축 — 시안 다변화·양산 변주 시스템

> "여러 종류로 잡아줘"·"시안 벌려줘"·"양산 컨셉"·"차별화되게"·"사조 바꿔" 요청에서 읽는다. 룩 프리셋(L1~L8)이 **마감 톤** 층이라면, 변수 축은 그 아래 **조형 언어·컨셉** 층 — 같은 피사체를 축 하나로 스윕하면 서로 다른 컨셉 시안 N개가 나온다.

## 사용 규칙

1. 프롬프트 하나에 **사조(M) 최대 1개 + 룩 프리셋(L) 최대 1개**. 팔레트가 충돌하면 사조 HEX가 이기고 프리셋 HEX는 버린다.
2. 스윕(양산 변주)은 **축 1개만 변주, 나머지 전부 고정**. 두 축을 동시에 흔들면 어느 변수가 결과를 갈랐는지 추적이 안 된다.
3. 모든 드롭인은 긍정형·결과 서술(철칙 #2·#4). HEX는 시작값.

## 죽은 단어 환원 (철칙 #3 연장)

`잘/예쁘게/고급스럽게/세련되게/감도있게`, 그리고 `어워드 수준으로/전문가처럼/최고급` 같은 **무대 지정**까지 — 전부 죽은 단어다. 기준이 프롬프트 밖(사람마다 다름)에 있으니 모델은 가장 무난한 평균값을 뱉는다. 환원 경로는 3개:

| 경로 | 방법 | 예 |
|---|---|---|
| **수치** | 여백 비율 %, 컬러 60/30/10, 텍스트 위계 단수 | "여백 60%, 메인 #F5F1E8 60 / 보조 #1C1A17 30 / 포인트 #8C7B6B 10, 위계 3단" |
| **몸 반응** | 감상자의 몸 반응으로 번역(R축) | "고급스럽게" → "목소리를 낮추고 조용히 보게 되는" |
| **구체 예시** | 원하는 결과물 장면 자체를 서술 | "어워드 수준" → 실제로 원하는 여백·타이포·마감을 그대로 씀 |

검증기 `W-FILLER`가 죽은 단어 잔존을 잡는다.

## M축 — 미학 사조 10종 (조형언어 분해 드롭인)

흔한 제품·지루한 물건일수록 효과가 크다: 형태가 익숙한 물건(빗자루·텀블러·휴지)에 "예쁘게"를 시키면 전부 비슷해지지만, **사조 하나만 섞으면 컨셉이 갈라진다**. 절차 — ① 깨뜨릴 제품/업종 확정 ② 사조 선택(또는 M축 스윕) ③ 조형언어 분해(아래 표가 분해 결과) ④ 기능에 결합할 요소만 골라 ⑤ 컨셉 한 줄로 묶기.

### M1 바우하우스
- 조형언어: 기하 원·삼각·사각 프리미티브, 기능주의 그리드, 장식 0
- 팔레트: `#E63329` 적 · `#F2B705` 황 · `#1D4E89` 청 · `#111111` 흑 · `#F2F2EF` 오프화이트
- 드롭인: `Bauhaus-inspired composition of geometric primitives — circle, triangle, square — functionalist grid, primary red #E63329, yellow #F2B705, blue #1D4E89 on off-white #F2F2EF, flat matte print finish, form strictly following function`

### M2 아르데코
- 조형언어: 방사 선셋버스트, 수직 강조, 계단형 대칭 프레임, 금속 라인
- 팔레트: `#101A2E` 딥네이비 · `#C9A24B` 골드 · `#2E6157` 딥그린 · `#F3EEE2` 크림
- 드롭인: `Art Deco geometry — radiating sunburst lines, stepped symmetric frame, vertical emphasis, gilded linework #C9A24B over deep navy #101A2E, cream detailing #F3EEE2, polished lacquer finish`

### M3 멤피스
- 조형언어: 삐뚤어진 기하 + 스퀴글·지그재그, 클래시 배색, 계획된 장난기
- 팔레트: `#F25C9B` 핑크 · `#20B2AA` 틸 · `#F2B705` 옐로 · `#111111` 흑 라인
- 드롭인: `Memphis design language — tilted playful geometry, squiggles and zigzag patterns, clashing pink #F25C9B, teal #20B2AA, yellow #F2B705 with bold black outlines, flat pop finish, deliberate mismatch that still reads as one system`

### M4 브루탈리즘
- 조형언어: 노출 구조·날것 질감, 오버사이즈 그로테스크 타이포, 장식 대신 구조
- 팔레트: `#C7C7C2` 콘크리트 그레이 · `#111111` 잉크 · 시그널 1색(`#E63329`)
- 드롭인: `brutalist composition — raw concrete texture, exposed structural blocks, oversized grotesque type as structure itself, concrete grey #C7C7C2, ink #111111, one signal accent #E63329, unpolished honest surfaces`

### M5 데 스틸
- 조형언어: 수평·수직 격자만, 두꺼운 흑선 분할, 비대칭 균형
- 팔레트: `#E63329` 적 · `#F2B705` 황 · `#1D4E89` 청 · `#FFFFFF` 백 · `#111111` 흑선
- 드롭인: `De Stijl grid — strictly horizontal and vertical black dividing lines, asymmetric balance of rectangular fields in primary red #E63329, yellow #F2B705, blue #1D4E89 on white, flat poster finish`

### M6 미드센추리 모던
- 조형언어: 유기적 부메랑·스타버스트·테이퍼드 레그 실루엣, 종이 질감 일러스트
- 팔레트: `#D9A54B` 머스터드 · `#6B7F3E` 올리브 · `#C65D34` 번트오렌지 · `#F0E7D8` 크림
- 드롭인: `mid-century modern illustration — organic boomerang and starburst motifs, tapered silhouettes, mustard #D9A54B, olive #6B7F3E, burnt orange #C65D34 on warm cream #F0E7D8, textured paper grain, flat screen-print feel`

### M7 아르누보
- 조형언어: 식물 줄기 곡선, 유기적 장식 프레임, 손그림 라인워크
- 팔레트: `#7A8C5F` 세이지 · `#C9A24B` 골드 라인 · `#F3EEE2` 아이보리 · `#4A3B2A` 딥브라운
- 드롭인: `Art Nouveau linework — flowing botanical curves framing the subject, hand-drawn organic ornament, sage #7A8C5F and deep brown #4A3B2A with gilded line accents #C9A24B on ivory #F3EEE2, lithograph texture`

### M8 구성주의
- 조형언어: 사선 다이내믹, 대각 분할, 포토몽타주 결합, 선동적 에너지
- 팔레트: `#B33A2B` 적 · `#111111` 흑 · `#E8DCC4` 바랜 크림
- 드롭인: `constructivist poster dynamics — aggressive diagonal composition, angular red #B33A2B and black #111111 planes slicing across aged cream #E8DCC4, photomontage-style subject placement, kinetic propaganda energy`

### M9 사이키델릭 70s
- 조형언어: 물결치는 유동 형태, 소용돌이 리듬, 고채도 클래시
- 팔레트: `#E85D1F` 오렌지 · `#7B4EA3` 퍼플 · `#3E8C4F` 그린 · `#F2B705` 옐로
- 드롭인: `70s psychedelic flow — melting liquid shapes and swirling rhythm, saturated clash of orange #E85D1F, purple #7B4EA3, green #3E8C4F, yellow #F2B705, wavy concentric contours, vintage offset print grain`

### M10 와비사비
- 조형언어: 불완전의 미 — 비대칭 여백, 자연 균열·얼룩, 손맛 남긴 마감
- 팔레트: `#B8AD9E` 흙빛 뉴트럴 · `#6E6558` 토프 · `#F0EBE2` 미색 · 안개빛 저채도
- 드롭인: `wabi-sabi restraint — asymmetric emptiness dominating the frame, natural imperfection kept visible (hairline cracks, uneven glaze, raw edges), earthen neutrals #B8AD9E #6E6558 on undyed field #F0EBE2, quiet handmade finish`

## R축 — 몸 반응 번역 8종

형용사·감정어 대신 **보는 사람의 몸 반응**을 서술하면, 모델이 그 반응을 만들려고 구도·여백·색온도를 거꾸로 설계한다. "그림을 설명하지 말고 반응을 설명한다."

| 죽은 단어 | 몸 반응 | 역설계되는 것 | 드롭인 |
|---|---|---|---|
| 눈에 띄는 | 눈이 여기저기 튀어다닌다 | 빠른 리듬·볼거리 밀도·강대비 | `busy rhythmic composition that keeps the eye bouncing between focal points, dense with things to discover, high-contrast accents` |
| 고급스러운 | 목소리를 낮추고 조용히 보게 된다 | 여백 확보·정돈·장식 제거 | `hushed composition the viewer lowers their voice for — generous negative space, every element aligned, nothing decorative left` |
| 귀여운·위트 | 입가가 아주 작게 올라간다 | 어긋난 요소 1개·작은 서프라이즈 | `one playfully misaligned element and a tiny unexpected object that rewards a second look, restraint everywhere else` |
| 대담한 | 뭐 주나 싶어 목이 앞으로 빠진다 | 스케일 파괴·과감한 크롭 | `oversized focal subject cropped past the frame edge, scale that physically pulls the viewer forward` |
| 신뢰 가는 | 어깨가 내려가고 호흡이 느려진다 | 대칭·안정 수평선·차분한 채도 | `calm symmetric structure on a steady horizon, low-saturation composed palette, slow-breathing stability` |
| 식욕 도는 | 침이 고인다 | 윤기·김·단면 클로즈업 | `glistening surfaces and rising steam, cross-section detail close enough to reach for` |
| 긴장감 있는 | 숨을 잠깐 참게 된다 | 불안정 사선·타이트 크롭·딥 섀도 | `breath-holding stillness — unstable diagonal, tight claustrophobic crop, deep shadow pools` |
| 청량한 | 어깨에 소름이 살짝 돋는다 | 차가운 하이라이트·물방울·크리스프 | `goosebump-cold crisp highlights, condensation droplets, air that reads several degrees cooler` |

**브랜드 보이스 변형** — 로고·브랜딩 컨셉이면 반응 대신 발화 장면으로: *"이 브랜드가 길에서 자기 이름을 외친다면 — 소리 크기·발음·자세는?"* 을 한 줄로 정하고 그 장면을 시각 토큰으로 푼다. 핵심만 남기고 다 버리는 게 뒤따라야 한다.

## X축 — 모순 쌍 레이어 분리

"감성적이면서 세련된" 식으로 두 형용사를 한 번에 주면 모델이 **평균을 내서** 무난해진다. 규칙: 모순 쌍을 정하고 **레이어별로 한쪽씩 배정** — 절대 한 레이어에서 섞지 않는다.

- 레이어: 형태/로고 · 팔레트 · 타이포 · 질감 · 조명 · 소품 (6층)
- 예 — [장난스럽지만 정교하게]: 형태=장난(비대칭 스티커 실루엣) / 타이포=정교(정밀 그리드 산세리프) / 팔레트=장난(클래시 1점) / 질감·조명=정교(클린 스튜디오, 균질광)
- 쌍 예시: 장난스럽지만 정교한 · 차갑지만 다정한 · 낡았지만 미래적인 · 시끄럽지만 미니멀한 · 묵직하지만 가벼워 보이는

프롬프트에는 쌍 이름을 쓰지 말고 **레이어별 배정 결과만** 쓴다(형용사는 죽은 단어).

## 컬러 번역 — 음악·장면 → 팔레트

떠오르는 색이 없거나 흔한 조합을 피하고 싶을 때. 절차:

1. **시간대 + 장소 + 행동 + 음악**을 한 문장으로 쓴다.
2. 그 장면을 **HEX 3~4색 + 비율(60/30/10)** 로 번역한다. 색마다 유래 한 줄.
3. 번역된 팔레트를 Color grading 섹션에 그대로 박는다(장면 문장은 프롬프트에 안 넣음).

| 장면 문장 | 번역 예 |
|---|---|
| "한낮 12시 캘리포니아 해변, 아이스크림 먹으며 듣는 신나는 팝송" | `#FFD54F` 모래빛 60 / `#4FC3F7` 한낮 바다 30 / `#FF7043` 아이스크림 10 |
| "밤 9시, 불빛 반짝이는 한강다리를 건너며 듣는 피아노곡" | `#101A2E` 밤 강물 60 / `#D9A566` 다리 조명 25 / `#5EEAD4` 수면 반사 15 |

비율 합 100, 4색 초과 금지(철칙 #5의 컷당 3~5색 안에서).

## T축 — 타이포 아트 5기법 (C3 포스터·로고·타이포 중심 컷)

> 전부 렌더 텍스트를 다루므로 **Tier-1 결합 공식 1회 필수**, 한글 카피는 캔버스 크기 레버(2048) 적용. 영역 문법은 `typography-layout.md`.

### T1 움직임 번역
대상을 그리지 않고 **움직임의 성질만** 글자에 싣는다. 절차: 대상 선정(움직임이 명확할수록 좋다) → 리듬/속도 추출 → 궤적/힘 분해 → 글자 성질로 번역.
- 대상 예: **파도**(밀려와 정점에서 부서지는 가속) · **심장박동**(수축-이완의 반복 리듬) · **빗방울**(수직 낙하 후 튀는 파문) · **고양이 착지**(정지 직전의 탄성)
- 드롭인 골격: `letterforms carrying the {rhythm and trajectory} of {motion} — the lettering as the only subject in the frame, the motion's energy living entirely in the strokes` (※ "never drawn" 같은 부정문은 철칙 #2 위반 — 검증기 실측으로 잡힘)
- **완성 예 — "파도"**:
  ```
  Text-in-image: headline "파도" — letterforms carrying the surge of an incoming wave:
  strokes swelling thicker as they rise, crests breaking into fine spray at the stroke tips,
  baseline rolling like a swell — the lettering as the only subject in the frame, all of the
  wave's energy living inside the strokes.
  Deep sea ink #1D4E89 on foam-white field #F5F8FA, all text perfectly legible.
  ```

### T2 의성어·의태어 번역
'쿵쾅쿵쾅·사르르·또로롱' 같은 소리의 결을 글자 형태로. **감정·장면을 더하면 결이 달라진다**: '또로롱'보다 '이별의 눈물이 또로롱'이 다른 글자를 만든다.
- 드롭인 골격: `letterforms shaped by the texture of the sound "{의성어}" felt through {감정/장면}, weight and edges following the sound`
- **완성 예 — "사르르"(버터가 녹는)**:
  ```
  Text-in-image: headline "사르르" — letterforms melting like butter on a warm pan:
  edges softening and gently drooping, the last syllable dissolving into a thin glossy pool
  beneath the baseline, weight thinning from first glyph to last.
  Warm butter yellow #F2B705 on cream field #FFF9F2.
  ```

### T3 의도 왜곡
힙·키치 요청에 "볼드하고 눈에 띄게"를 주면 어디서 본 두꺼운 글씨만 나온다. 대신 **왜곡 방향을 먼저 설계하고 그 방향으로만** 일그러뜨린다(로봇방지문자처럼 — 전부 망가뜨리는 게 아니라 의도된 왜곡).
- 절차: ① 왜곡 방향 후보 나열(늘림·압축·절단·겹침·용해 등) ② 1개 선택해 어디를 어떻게 왜곡할지 설계 ③ 가독 한계선 명시
- 드롭인 골격: `deliberately distorted lettering — {선택한 왜곡} applied with intent, distortion stopping just before legibility breaks`
- **완성 예 — "야시장"(절단+오프셋)**:
  ```
  Text-in-image: headline "야시장" — deliberately distorted lettering: each glyph sliced
  horizontally at its waist, the upper half shifted slightly right like a mis-registered print,
  distortion stopping just before legibility breaks.
  Hot pink #F25C9B strokes with an electric mint #5EEAD4 offset layer on near-black #0B0D12.
  ```

### T4 네거티브 스페이스
글자 속 여백(카운터스페이스)에 상징을 **살짝 숨긴다** — 대놓고 그리면 죽는다. 두 번째 봤을 때 발견되는 게 목표.
- 효과 좋은 글자: 영문 `o c q d e a h` · 한글 `ㅇ ㅎ ㅁ ㅂ ㅅ ㄷ` (구조가 뚜렷하고 여백이 넓은 문자)
- 드롭인 골격: `a {상징} subtly hidden in the counterspace of the letter {글자}, invisible at first glance, discovered on the second`
- **완성 예 — "소풍"(ㅇ 속의 연)**:
  ```
  Text-in-image: wordmark "소풍" — a tiny kite silhouette subtly hidden inside the round
  counterspace of "ㅇ", invisible at first glance, discovered on the second look;
  every other stroke kept clean and geometric.
  Single ink #111111 on warm paper field #F5F1E8.
  ```

### T5 글자 안의 세계 (거대 단어 + 획 안 미니어처 씬)
대상을 배경에 그리지 않고 **거대한 한글 단어 하나의 획 안을 그 단어 정서의 미니어처 씬으로 채운다**. 획마다 다른 장면, 몇 요소는 글자 밖 여백으로 흘려 답답함을 푼다. 하단에 손글씨/브러시 서브헤드 1줄.
- 절차: ① 단어 선정(정서가 뚜렷할수록 좋다: 청춘·새벽·낭만) → ② 그 정서의 소재 8~10개 나열(청춘→라이브클럽·레코드샵·포장마차·옥상고양이·공중전화·버스킹) → ③ 획마다 다른 장면 배정, 반복 없음 → ④ 몇 요소만 글자 밖으로.
- 드롭인 골격: `a single giant Korean word "{단어}" filling most of the frame in bold hangul, every stroke packed with tiny scenes of {정서·소재}, each stroke its own vignette, a few elements spilling past the letters into the margin`
- **완성 예 — "청춘"**:
  ```
  Scene: a single giant Korean word "청춘" filling most of the tall frame in bold brush-influenced
  hangul, every stroke packed with tiny Hongdae indie scenes — a basement live club, a used-record
  shop, a pojangmacha tent, rooftop cats, a payphone, a busker — each stroke its own vignette,
  a few kites and telephone wires spilling past the letters into the margin.
  Color grading: aged cream #E8DCC4, vermilion #B33A2B, indigo #274A78, mustard #D9A54B, ink #1C1A17.
  Text-in-image: this single hangul word is the composition itself, a brush subhead below reads
  "우리는 다 어렸다". All text appears once, perfectly legible — no duplicate text, no extra words,
  no invented glyphs, no watermark.
  ```
- 💡 기본 `4:5`(1024x1536), 획 안 장면이 밀집이면 `2048x2048`. Tier-1 결합공식은 1회만, 단어의 두 번째 언급은 따옴표 없이 쓴다(중복 렌더 방지).

## 컨셉 프리플라이트 (컴파일 전 짧은 루프)

요청이 "컨셉부터"·"차별화되게"일 때만, 컴파일 전에 두 수를 둔다. 산출은 **컨셉 한 줄** — 그다음은 평소처럼 컴파일.

1. **뻔한 규칙 스캔** — 그 업종에서 모두가 당연시하는 암묵 규칙을 3~5개 나열(럭셔리=여백+세리프, 친환경=초록/베이지, 베이커리=따뜻한 갈색/크림…). 정면으로 어겼을 때 ① 가장 신선하고 ② 설득 이유가 서고 ③ 그래도 그 업종으로 인식되는 규칙 1개를 골라 **위반 자체를 컨셉 코어**로.
2. **검색문장 역산** — 사람들은 '브랜드 컨셉'을 검색하지 않는다. "향 강하지 않은 핸드크림"·"원룸에 어울리는 작은 가전" 같은 **현실 검색문장**을 몇 개 뽑고, 그 문장이 드러내는 수요 빈틈에서 컨셉을 역산.

## 양산 스윕 패턴

같은 피사체 × 축 1개 스윕. 컨셉 발견엔 **M축 스윕이 최강**(흔한 제품일수록). jsonl에서 축 값만 바꿔 N행:

```jsonl
{"id":"broom-m1","category":"C8","ar":"1:1","size":"1024x1024","full_prompt":"…(피사체·구도·조명 고정)… + M1 바우하우스 드롭인 … AR 1:1"}
{"id":"broom-m4","category":"C8","ar":"1:1","size":"1024x1024","full_prompt":"…(동일 고정)… + M4 브루탈리즘 드롭인 … AR 1:1"}
{"id":"broom-m10","category":"C8","ar":"1:1","size":"1024x1024","full_prompt":"…(동일 고정)… + M10 와비사비 드롭인 … AR 1:1"}
```

스윕 후 살아남은 축 값 1개를 골라 R/X축으로 미세 조정하는 2단 패스가 기본형.

## 실측 메모

- M·R·X·T 전 축은 어휘 단위로는 기존 실측 범위(photo-vocab·C3·C8·C11) 안이지만 **축 단위 실측은 미완** — 첫 사용 시 2컷 변주 검증 후 확정 권장. T3 왜곡·T4 네거티브 스페이스는 렌더 편차가 클 수 있어 후보 3컷 이상 권장.
