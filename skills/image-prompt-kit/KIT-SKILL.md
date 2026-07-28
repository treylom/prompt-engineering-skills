---
name: image-prompt
version: "4.0.0"
description: 막연한 요청을 gpt-image-2(Codex `$imagegen`) 완성 프롬프트로 컴파일. 커버 — 카테고리 C1~C12·화보 Format B·홍보물 P1~P12·타이포 포스터 TP1~TP17·룩 L1~L9·컨셉 축 M/R/X/T·jsonl·검증기. 트리거 — "공냥 프롬프트", "이미지 프롬프트 써줘", "화보 프롬프트", "키아트", "타이포 포스터", "홍보물/판촉물", "표지/앨범커버/북커버", "활자 견본/워드마크", "포스터/카드뉴스/만화", "슬라이드/피피티 이미지", "글자 배치", "프롬프트 jsonl", "컨셉부터 잡아줘", "시안 여러 개". ※ 생성·양산은 [codex-imagegen].
---

# 🐾 공냥 프롬프트 킷 VOL.2 — gpt-image-2 프롬프트 컴파일러

모호한 요청을 `$imagegen`용 완성 한국어 프로덕션 프롬프트로 컴파일한다. 생성·양산은 [codex-imagegen](1장은 codex 직접).

## 워크플로우

1. 빠진 결정(카테고리·컷타입·피사체·스타일·구도·텍스트·AR)은 추론해 채운다. 묻는 건 한글 문구 원문·브랜드명·민감 소재뿐.
2. 라우팅 표에서 읽을 파일 결정, 포맷은 §포맷 A/B.
3. 철칙 9개를 지켜 작성, 끝에 `AR` 토큰.
4. 고가치 산출물은 응답 전 `node scripts/check_prompt.mjs` 검증(`ok:true`).
5. 생성 연계 시 컴파일된 프롬프트만 넘긴다(거친 원문 금지).

확장 예: 포스터→C3·화보→C1 B·키아트→C11·아이콘→C9("텍스트 없음")·제품→C4·만화→C10·피피티→C12(16:9).

출력 계약: 단일=본문+끝 `AR x:y`만(설명 없이) · 다중=엔트리당 `Title/Category(Cn)/Cut type/Prompt` · 생성 요청=조용히 컴파일 후 툴 호출.

## 라우팅 표 (유일 라우팅 지점)

| 요청 신호 | 카테고리/포맷 | 읽을 파일 |
|---|---|---|
| 단독 인물 화보·에디토리얼 | C1·Format B | `references/editorial-hwabo.md` (룩북·시퀀스·패션 21종 +`references/style-taxonomy.md`) |
| 타이포 포스터·글자가 곧 이미지 | TP1~TP17 | `references/typo-poster-router.md`→`references/typo-poster/TPn-*.md` 1개 |
| 활자 견본·글리프 세트·손절단 워드마크·인쇄 그라디언트 금속 | TP15~TP17 | `references/typo-poster-router.md`→ 해당 `TPn-*.md` 1개 |
| 홍보판촉물·브랜드 포스터·"디자인 잘된 포스터" | P1~P12 | `references/promo-router.md`→`references/promo/Pn-*.md` 1개. 카드뉴스 밀도 문법 금지(미감 사망) |
| 표지 판면(앨범커버·북커버·패키징 라벨)·색면 분할·회화 표지·간판체 콜라주 | P9~P12 | `references/promo-router.md`→ 해당 `Pn-*.md` 1개 |
| 포스터·키아트·인포그래픽·카드뉴스·만화·도감·아이콘·뷰티·캠페인·목업 | C2~C11 | `references/category-patterns.md` 해당 §. C6·C7=밀도 기본값·돌파 전술 §C6 |
| 프레젠테이션·슬라이드 덱 | C12 | `references/category-patterns.md` §C12 |
| 무드("있어보이게"·"럭셔리"·"영화처럼") | 룩 L1~L9 | `references/look-presets.md` 프리셋 1개 드롭인 |
| 시안 다변화·양산 컨셉·"차별화"·"컨셉부터" | M/R/X/T축 | `references/concept-axes.md` 축 1개 변주 |
| 글자 배치·폰트·그리드·밀집 텍스트 | — | `references/typography-layout.md` |
| 카메라·조명·색 어휘 | — | `references/photo-vocab.md` |
| jsonl 배치·모델 팩트·완성 예제·codex 골격·8섹션 변형 | — | `references/jsonl-and-examples.md` |

라우터(P/TP)는 패턴 1개 선택 후 해당 파일 **하나만** 로드.
복수 행이 동시에 매칭되면 **위쪽 행 우선**(표 순서 = 우선순위) — 경계 케이스는 각 라우터의 경계·교차 참조 절이 우선한다.

## 철칙

1. **앞머리 `[AR x:y SIZE wxh]` 브래킷 금지.** size는 API 파라미터(jsonl `size`)로만, 프롬프트엔 끝 `AR x:y` 하나만. 슬롯 토큰(`[PERSONA_LOCK]` 류)은 작성 전용 — 잔존=실격(`E-SLOT-LEAK`).
2. **장면 배제는 전부 긍정형** — gpt-image-2는 장면 네거티브를 오히려 렌더한다(군중→"인물 한 명, 단독", 배경→"깨끗한 단색 배경"). 예외는 두 레인뿐, 우회가 아닌 컴플라이언스 스티어링.

   | 티어 | 조건 | 허용 문구 |
   |---|---|---|
   | Tier-0 기본 | 항상 | all-positive, 부정문 0개 |
   | Tier-1 텍스트 가드 | 렌더 텍스트 있을 때만 | 화이트리스트 7종: `no extra words` · `no duplicate text` · `no invented glyphs` · `no watermark` · `no logo` · `no extra text` · `verbatim, no extra characters` |
   | Tier-2 화보 레인 | 명시 선언 시만(휴리스틱 승격 금지) | SAFETY_ASSERT(긍정형, 피사체절)+NEGATIVE_TAIL(AR 직전 1회) **페어** 구조 |

   Tier-1 결합 공식(유일 방출형): `All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark.`
   Tier-2 고정 문자열·페어 규칙(순서 보존 부분집합·tail 단독 금지) 정본 = `references/editorial-hwabo.md` §3(여기 안 싣음). `Negative:` 라벨은 전 티어 금지(`E-NEG-SECTION`).

   | 빼려는 것 | 레인 |
   |---|---|
   | 장면 요소(사람·사물·배경·소품) | 긍정형 재서술(Tier-0) |
   | 텍스트 렌더 결함(중복·유령·워터마크) | Tier-1 화이트리스트 |
   | 정책 안전 단언(화보) | Tier-2 페어 |

3. **SD-era 폐기 어휘 금지.** `masterpiece/best quality/8k/4k/uhd/trending on artstation/ultra-detailed/highly detailed/sharp focus`, 가중치 `(word:1.3)`, `--ar/--v`, 본문 `§`, 빈 형용사(멋지게/감성적으로/고급스럽게/세련되게/beautiful/stunning).
   무대 지정("어워드 수준/전문가처럼/최고급")도 동급, 기준이 프롬프트 밖. 수치(여백 %·60/30/10·위계 단수)·몸 반응·구체 예시로 환원(concept-axes.md §죽은 단어 환원).
4. **장비 스펙→결과로 환원.** EXIF·장비명 대신 "shallow DoF, background falls off softly"·"warm key + cool rim". (패션 `Lens character:`·`Director signature:`는 결과+앵커라 예외.)
5. **수치는 박는다.** HEX 팔레트(컷당 3~5색), 켈빈, `key:fill 1:2` 비율.
6. **1행 = 1컷 = 1 호출.** 한 캔버스 그리드/매트릭스 금지, 여러 컷은 N행.
7. **이상적 피부 금지** → "natural skin texture, visible pores, subtle film grain".
8. **실재 상표·인물 참조 금지**, 가상 브랜드/페르소나로.
9. **생성 후 글자 후처리 절대 금지.** 텍스트는 프롬프트로 이미지 안에서 렌더(따옴표 카피+롤라벨+자유 작성 존). PNG 위 코드 합성(PIL·ImageMagick·SVG/HTML·캔버스) 일절 금지, 폰트·커닝·톤이 겉돈다.
   글자 오류는 프롬프트 수정 후 재생성(타이포 구체화→`2048x2048`+quality high→카피 축소 순).

## 마스터 템플릿 (포맷 A 6섹션)

순수 서술+HEX. 핵심 시각정보 최상단(첫 섹션=attention 최강). 헤더 `# 1. Scene` OK, 본문 `§` 금지.

| # | 섹션 | 무엇을 / 분량 |
|---|---|---|
| 1 | **Scene** | 누가·무엇이·어디서·무엇을. 핵심 먼저. 60~120어 |
| 2 | **Camera** | 시점·거리·렌즈 character(결과 서술). 15~30어 |
| 3 | **Lighting** | 방향·soft/hard·그림자·림라이트(장비명 금지). 10~25어 |
| 4 | **Color grading** | 팔레트 + 색온도 + **HEX 3~5개**. 10~20어 |
| 5 | **Texture/Medium** | 매체·질감·표면 반응·후처리. 10~20어 |
| 6 | **Text-in-image** (선택) | `"따옴표 카피"` + 폰트·크기·위치 + legibility 1회. 0~25어 |
| — | 트레일링 | 끝에 `AR x:y` 토큰만 |

## 포맷 A / 포맷 B

- **포맷 A — 라벨 6섹션**(위 표): 구조물 전반(포스터·키아트·인포그래픽·도감·카드뉴스·만화 등).
- **포맷 B — 화보 플랫 콤마형 단문**: 라벨 없이 콤마 한 문단, 350~450자, 기본 AR `2:3`(1024x1536). 슬롯 12종 순서·Tier-2 → editorial-hwabo.md.
- 라우팅: 단독 인물 화보/글래머 에디토리얼→B, 그 외 전부→A.

## 사이즈 락 (codex 러너 6종)

API는 커스텀, codex(`$imagegen`) 경로는 6종만 안전. `auto` 금지, 챕터 내 통일.

| ar | size | ar | size |
|---|---|---|---|
| 1:1 | `1024x1024` | 16:9 | `1792x1024` |
| 2:3 / 3:4 / 4:5 | `1024x1536` | 9:16 | `1024x1792` |
| 3:2 / 4:3 | `1536x1024` | 밀집/다컷 | `2048x2048` |

`2:3`만 정확비, `3:4`·`4:5`는 세로 근사. 비지원 값(`1024x1280` 등)도 가까운 6종으로.
> API 하드 제약·투명 배경(1.5 폴백): jsonl-and-examples.md §1.

## 텍스트 렌더 요점

- 카피는 따옴표 고정+폰트·크기·위치·HEX, 한 줄 한 언어(한글+영문 혼합 금지). 카피 2개↑는 롤 라벨(headline/subhead/callout) 분리, 롤별 위치·크기·폰트 지정.
- 렌더 텍스트엔 Tier-1 결합 공식 1회(철칙 #2), 같은 카피 2회 표기=2회 렌더라 금지.
- 한글 스펠아웃 금지(하이픈이 글자로 렌더). 정확도 레버=캔버스 크기(2048 실측 12/12). 영문 조어만 ALL CAPS 최후수단. 라벨엔 실제 문구만.
- 밀집 텍스트(카피 3블록+/소형 글자)는 `quality: high`+큰 변 페어링(1536/1792·`2048x2048`).
- 국문/영문 혼용: 한국어=서사·무드·문화 명사·한글 카피, 영어=기법 토큰·티어 문구, 하이브리드=한국어 골격+영어 토큰. 상세 photo-vocab.md §8.

## 검증기

응답·생성 전 `node scripts/check_prompt.mjs <file>`(stdin 가능).

- `--tier <0|1|2>` 강제 / `--jsonl` 레코드 / `--api` E-SIZE-LOCK→warning(하드 제약 유지) / `--test` 셀프테스트.
- 티어 우선순위: `--tier` > jsonl `tier` > `lane`("editorial"→2) > 휴리스틱(렌더 텍스트→1, 없으면 0). Tier-2는 휴리스틱 승격 불가.
- 출력 `{ok, format, tier, errors[{code,msg,hint?}], warnings[{code,msg}]}`, errors 0=exit 0.
- 에러: `E-NEG-TIER`(미선언 상위 티어)·`E-SLOT-LEAK`·`E-SIZE-LOCK`, 네거티브·앞브래킷·SD어휘·가중치·슬래시플래그·끝AR누락.
