# 패션 에디토리얼 — 21종 스타일 + 마스터 템플릿 + Gold DNA

> women-editorial-lookbook에서 정립한 패션 화보 프롬프트 체계. 제약은 **긍정형 기본 + 티어 화이트리스트**(SKILL.md 철칙 #2) — 워터마크 등 장면 배제는 여전히 "clean unbranded finish" 식 긍정형, `no ~`는 Tier-1/Tier-2 캐노니컬 문구로만.

## 1. 21종 스타일 택소노미 (STY-01~21)

01 minimal_clean · 02 old_money · 03 y2k_revival · 04 streetwear · 05 avant_garde · 06 vintage_film_90s · 07 cyberpunk_neon · 08 cottagecore · 09 dark_academia · 10 kpop_idol
11 japanese_mode · 12 parisian_chic · 13 athleisure_sporty · 14 workwear_utility · 15 boudoir_editorial · 16 bridal_modern · 17 resort_beach · 18 corporate_power · 19 couture_runway · 20 film_noir · 21 kpop_editorial_minimal

- 명명: 폴더 `NN_<snake>`, 스타일 ID `STY-NN`, 룩 ID `STY-NN-LMM`.
- 카탈로그 필드: ID / 슬러그 / 한글명 / 무드 한 줄 / 레퍼런스 인덱스.
- **Tier-2 레인 필수**: STY-15(boudoir_editorial) · STY-17(resort_beach)는 명시 선언된 Tier-2 컴플라이언스 레인에서만 작성 — SAFETY_ASSERT + NEGATIVE_TAIL 페어(SKILL.md 철칙 #2, 상세 `references/editorial-hwabo.md`).

## 2. style_card 한 장 구조 (minimal_clean 기준)
정의 한 줄 · 무드보드 키워드(톤·조명·컬러·소재·헤어메이크업) · 컬렉션(메인+보조 가상 브랜드) · 추천 페르소나(P-NN 1·2순위) · 카메라 디폴트(바디+렌즈+세팅) · 조명 디폴트(L-NN) · 컬러 그레이딩(필름 시뮬) · 룩 리스트(L01~L05) · 셀렉트 기준 · 꼭 들어갈 디테일.

## 3. MASTER_TEMPLATE_V4 (10섹션 페이스트 블록)

> **단독 인물 화보는 Format B(`references/editorial-hwabo.md`) 우선** — V4 10섹션은 룩북/챕터 시퀀스용. (레거시 주의: V4 메타 필드·폴더 규칙은 외부 룩북 프로젝트 기준이며 이 레포 예제·fixtures는 전부 6섹션/Format B 체계.)

- §0 Creative Direction — 사진가 voice 한 단락
- §1 목적/용도 — 컬렉션명 + publication tier
- §2 핵심 브리프·페르소나·장면 — 나이+캐스팅 + 미감 어휘 A/B/C에서 5~8개
- §3 필수 요소/Material — 의상 HEX·소재·핏, 배경 HEX+거리
- §4 환경 호흡 — 피부톤↔배경 HEX 색온도/밝기 통합 단락(필수)
- §5 빛의 모먼트 — L1~L6 여섯 줄, 장비 스펙은 결과로 환원
- §6 구도/공간 — C-NN + `Lens character:` + `Director signature:`
- §7 재질/매체 — Texture + Film 3파트
- §8 제약 — **긍정형 스타일링 가이드로**(예: 정숙·절제된 광고 프레이밍이 필요하면 "modest styling, tasteful editorial framing"으로 긍정 서술)
- §9 narrative link · §10 출력(`{ar} · {size}`)
- 메타: look_id / style / look_title / ar / size / persona / collection / composition / chapter / status / output_path.

작성 원칙:
- 8룩 = 5챕터 시퀀스(1-ARRIVAL / 2-STILLNESS / 3-MATERIAL / 4-GESTURE / 5-ESCAPE).
- Composition C-NN은 8룩 unique. AR 7종(2:3·4:5·1:1·3:2·9:16·16:9·4:3).
- §2 페르소나는 8룩 char-by-char 동일(얼굴 일관성).
- §5 L1~L6 전부 한 줄씩, 장비명 대신 결과. §6 Lens character + Director signature 필수.
- 미감 어휘 사용, 해부학/클리니컬 어휘는 안 씀. 이미지 `-i` 첨부 없이 텍스트만.

## 4. Gold DNA (367 골드 샘플 공통 규칙)
- **카메라**: 중형·필름 바디 선호. 렌즈 빈도 35>50>85>24mm. `Lens character:` 블록(초점거리·평면성·왜곡 적음·배경 분리) = 골드 100/100 필수.
- **필름/컬러**: Portra·desaturated·teal&orange·CineStill 800T 빈출. Film 3파트 = `[필름] emulation — [스킨], [섀도], [하이라이트]. [매거진] roll-off`.
- **조명**: 결과 어휘로. `key:fill 1:X` 비율 항상 명시. neon/practical/golden hour/창광.
- **구도**: 카메라 거리 미터 명시, rule of thirds, 포즈는 영문 표기(contrapposto 등), `Director signature:` 라인 = 골드 100/100 필수.
- **무드**: light+color+expression 트리플(예: "melancholic — desaturated cool, low key, downcast").
- **페르소나**: ethnicity+age → hair → eye(쌍꺼풀·홍채색) → beauty mark(점 보통 1개) → lip finish → outfit(브랜드+소재+HEX) → 배경 HEX → 카메라 거리(m). 4~7줄.
- **퀄리티 앵커(전부 긍정형)**: "symmetrical facial features", "eye-focus AF", "natural skin texture", 클로징 `The look must be unmistakable to a non-photographer viewer.`, 마감은 "clean, brand-free, copy-free finish"(워터마크/로고 빼는 것을 긍정형으로).
- **배경**: 솔리드 컬러는 HEX, 소품은 미터 거리 명시.

> v1→v2 업그레이드 7종: Lens character 블록 / Director signature 라인 / 클로징 명령문 / 페르소나 세분화(홍채·점·립피니시·쌍꺼풀) / Film 3파트 / 배경 HEX+소품 거리 / §1 publication tier.
