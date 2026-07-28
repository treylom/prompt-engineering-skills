# 카테고리 패턴 — C1–C12 (컷타입 · 기본 AR · 필수 디테일)

> 사용자가 카테고리·컷타입을 지정하거나 "라이브러리 스타일 변형"을 요청할 때 본다. 표현은 **긍정형 기본 + 티어 화이트리스트**(SKILL.md 철칙 #2) — 장면 배제는 "텍스트 없음"·"여백" 식 긍정 상태로, `no ~`는 Tier-1(텍스트 렌더 가드)/Tier-2(화보 컴플라이언스 페어)에서만.

**공통 시각 DNA (라이브러리 시스템 톤):** 플로팅 라벨+헤어라인 리더선 / HEX 정밀 팔레트 / 재질 매크로 / 소프트박스+림라이트 / 매거진 여백. 무드 3종 — 웜 아이보리(`#F7F4EC·#B76E79`) / 월해 다크(`#0F1D30·#1E3A5F·#B76E79`) / 테크 뉴트럴(`#F2F3F5·#11151A·#3B82F6`). 패션 에디토리얼 상세(persona DNA·Lens character·Director signature·Film 3파트)는 `style-taxonomy.md`, 결과 기반 어휘는 `photo-vocab.md`.

## C1 패션
- 컷타입: `levitation_catalog` `ghost_mannequin` `flatlay_spec` `lookbook_model` `runway_motion` `editorial_poster`
- 기본 AR: 룩북/제품 전신 `3:4`, 플랫레이 `1:1`, 포스터 `4:5`
- 필수: 의상 순서·핏·원단·액세서리 배치·바디/마네킹 노출, 필요 시 카탈로그 라벨
- 패턴: `Scene / Camera / Lighting / Color grading / Texture/Medium / Text-in-image / AR`
- **단독 인물 화보(글래머 에디토리얼)는 Format B** — 플랫 콤마형 단문, 슬롯 12종·Tier-2 문구는 `references/editorial-hwabo.md`

## C2 뷰티
- 컷타입: `texture_swatch` `water_droplet` `splash_flow` `powder_burst` `cream_smear` `hero_glow` `ingredient_macro`
- 기본 AR: `1:1` 또는 `3:4`
- 필수: 제형 질감·물방울/스플래시 물리·패키지 표면·피부/제품 접점·매크로 재질 반응
- 클린 스튜디오광·반사·성분 매크로. 하이라이트(#FFFFFF)는 "하얗게 날아가지 않게"

## C3 한국어 포스터
- 컷타입: `film_poster` `typographic_minimal` `event_promo` `cafe_menu` `exhibition` `retro_korean` `drama_poster` `editorial_quote`
- 기본 AR: `4:5` 또는 `2:3`, 모바일 포스터 `9:16`
- 필수: 정확한 한글 타이틀·부제·필요 시 장소/시간 메타·여백 시스템·타입 위계·또렷한 텍스트
- 항상 추가: "모든 텍스트는 한 번씩만, 완벽히 또렷하게."
- **타이포그래피가 곧 이미지인 포스터**(글자 안에 사진·터널 반복·재질 조각·그림자 글자·착시 등)는 `typo-poster-router.md`에서 TP 패턴 1개를 고르고 `typo-poster/TPn-*.md` 하나만 로드

## C4 제품 도감
- 컷타입: `exploded_view` `hero_callout` `cutaway` `comparison_grid` `blueprint` `lineup_family`
- 기본 AR: `3:4`, 가로 비교 `16:9`
- 필수: 제품 중앙·콜아웃 라벨·헤어라인 리더선·부품명·단면 재질·스케일 관계
- 도감 언어: 헤어라인 리더선, 플로팅 라벨 박스, 블루프린트 그리드, 분해 레이어

## C5 캠페인 포스터
- 컷타입: `fashion_campaign` `beauty_campaign` `cosmetic_launch` `perfume_campaign` `lookbook_cover`
- 기본 AR: `4:5`, 에디토리얼 포스터 `2:3`
- 필수: 히어로 제품/모델·캠페인 타이틀·서포팅 라인·브랜드형 비주얼 방향·여백 통제
- 히어로 하나 + 타이포 시스템 하나로 깔끔하게(과밀 피함)
- **디자이너 포스터 문법은 `promo-router.md`**(패턴 선택 후 `promo/Pn-*.md` 하나만) — 단독 히어로는 P3(오클루전)·P8(모노크롬 스테이징), 시리즈/9그리드는 P4(DNA 문장 공식), 컨셉 티저는 P2(타이포-환경)

## C6 인포그래픽
- 컷타입: `poster_dense`(기본) `flow_process` `cutaway` `diagram_vertical` `layered_stack` `cycle_loop` `diagram_horizontal` `comparison`
- 기본 AR: 세로 `2:3`, 가로 `16:9`
- **밀도 2모드 — 밀도가 기본값.** 미니멀 플로우로 도망치면 맨입력보다 못해진다(실측: 4카드 플로우는 나이브 고밀도 컷에 짐).
  - **포스터형(`poster_dense`, 기본)**:
    - 섹션 밴드 4–6개 + 섹션마다 번호·헤더, 셀마다 아이콘/미니 일러스트.
    - **히어로 요소 1개**(실사급 렌더 — 김 나는 컵, 단면 등)를 상단 또는 중앙에, 장식 막대·게이지·미니 지도·비교표를 보조로 깔아 밀도를 채운다.
    - 배경은 종이·크라프트·빈티지 등 질감 있는 톤.
    - **quality high 강제 + 밀집 락 `2048x2048` 권장**(한글 정확도 레버 — 세로 비율이 우선이면 `1024x1536`, 사이즈락 6종 밖 금지).
  - **플로우형**: 단계 설명 전용(3–5스텝). 라운드 카드 + 화살표. 요청이 "단계/순서"를 명시할 때만.
- 필수: 섹션 수·읽기 순서·라벨·아이콘/다이어그램·데이터 위계. 위계는 **핵심 메시지 1개를 압도적으로 크게**, 나머지는 계단식 축소 — 시선이 큰 것→작은 것 순으로 흐르게.
- 명시 레이아웃: 번호 섹션 밴드, 화살표, 컬럼, 적층 레이어, 중앙 다이어그램, 측면 콜아웃
- **복잡 도표 돌파 전술(제약이 아니라 공략법)**: 교차 화살표·다대다 연결·정밀 수치·다층 도해 같은 어려운 도표도 **단순화로 도망치지 말고 정면 시도**한다 — 요청이 복잡하면 프롬프트도 그 복잡도를 다 담는다. 성공률을 올리는 수단:
  - **연결을 문장으로 그린다**: 노드마다 위치를 좌표처럼 박고(상단 중앙·좌측 컬럼 둘째 등), 화살표는 출발→도착·스타일·라벨까지 명시(`labeled arrow from the X node curving down to the Y node`). 연결이 많을수록 더 구체적으로.
  - **수치는 이중 앵커**: 숫자를 큰 타이포로 따옴표 고정 + 막대·게이지·파이는 그 수치의 비율감이 눈에 보이게 지시(`bar filled to roughly 38 percent`). 타이포가 정확도를, 도형이 직관을 맡는다.
  - **핵심 라벨은 따옴표 고정**, 셀 디테일은 `every cell filled with genuine short Korean caption sentences, fully written in real hangul` 로 자유 작성 — 밀도를 깎지 않고 정확도만 배분.
  - **재시도는 단순화가 아니라 축 변경**: 안 나오면 ① 레이아웃 지시를 더 구체화 ② `2048x2048` + quality high ③ 그래도 안 되면 클러스터별 컷 분할(복잡도 유지, 캔버스만 분할). 도표를 포기하는 선택지는 없다.
- **유형별 돌파 레시피 7종**(분기 플로우·네트워크·계층·사이클·단면·비교표·데이터 차트) — 어려운 도표일수록 아래 문법으로 프롬프트를 짠다:
  - **분기 플로우차트**: 그리드를 먼저 선언하고 노드를 좌표로 배치 — `three-column flowchart grid, decision diamond at center column second row`. 분기 화살표는 라벨 포함(`"YES" labeled arrow branching right, "NO" labeled arrow continuing down`).
  - **다대다/네트워크**: 허브-스포크로 뭉개지 말고 연결 수를 세어 박는다 — `seven distinct labeled connection lines`, 교차 지점은 `crossing lines drawn with small bridge gaps at intersections`. 노드 배치는 원형/격자 중 하나를 명시.
  - **계층도/조직도/적층**: 층 수와 층별 노드 수를 전부 선언 — `three-tier hierarchy: one box on top tier, three on middle, five on bottom, connecting lines between tiers`. 적층은 `exploded layered stack, each layer floating with side label`.
  - **사이클**: 방향·스텝 수·화살표 곡률 — `five-step circular cycle running clockwise, curved arrows between adjacent steps, step numbers inside each node`.
  - **단면/해부(cutaway)**: 리더선 + 번호 콜아웃 — `numbered leader lines from each internal part to callout labels on the side margin`. 내부 부위 수를 명시해 라벨 개수를 고정.
  - **비교표**: 열 수·행 수·헤더를 선언하고 셀은 자유 작성 존 — `two-column comparison table with four rows, bold header band, every cell filled with genuine short Korean caption sentences`.
  - **정밀 데이터 차트**: 축·눈금·시리즈를 문장으로 그린다 — `vertical bar chart, y-axis gridlines labeled 0/25/50/75/100, four bars of visibly different heights` + 각 값은 막대 위 숫자 라벨로 따옴표 고정. 눈금 숫자까지 정확해야 하면 그 숫자들도 따옴표 카피에 포함.
- **고밀도 텍스트 슬라이드(실측 2026-07, 40컷 검증)**: 슬라이드당 렌더 한글 **400–800자도 정면 가능** — "gpt-image-2는 도해를 못 그린다"는 반증됨. 관건은 모델 능력이 아니라 아래 3레버:
  - **캔버스 세로 높이가 텍스트 정확도의 1차 레버**: 초와이드(21:9, codex 실측 세로 약 810px)는 400자에서 글자가 작아져 뭉개진다. **텍스트가 빽빽하면 16:9(세로 약 950px)·2:3·1:1**로 세로를 확보 → 700–800자도 또렷. codex 경로는 큰 캔버스 요청을 무시하고 21:9를 약 1900×810으로 정규화하므로, 정확도는 비율 선택으로 벌어야 한다.
  - **자유 작성 존이 밀도의 핵심 무기**: 크리티컬 라벨(제목·섹션 헤더)만 따옴표 고정.
    - 나머지 본문은 `each card contains a bold Korean title plus two to three sentences of genuine Korean explanatory text, densely filled, fully written in real hangul, every caption is a real sentence carrying real meaning`.
    - 모델이 개념적으로 **맞는** 설명을 스스로 채운다(B-트리 키값 분배·Raft 로그 인덱스·캐시 트레이드오프까지 논리 정합).
    - placeholder 금지는 부정문 대신 긍정형(`all text lines fully written out as complete hangul words`)으로.
  - **완벽주의 버리기 = 밀도 해방**: 소규모 오탈자·간헐적 뭉개짐을 허용하면 슬라이드당 20–30개 텍스트 블록을 채울 수 있다. **중간중간 뭉개진 컷·소규모 오탈자는 이 밀도에서 정상 산출** — 치명 카피만 따옴표로 지키고 나머지는 자유 존에 맡긴 뒤, 걸리는 컷만 재생성(후처리 합성 금지, 철칙 9).

## C7 카드뉴스
- 컷타입: `sns_cover`(기본) `sns_content` `promo_poster` `tip_card` `viral_hook` `qna_card` `list_card` `editorial_cover` `editorial_content`
- 기본 AR: `1:1`, 세로 에디토리얼 카드 `2:3`, 홍보 포스터 `4:5`
- **미감 라우팅 2모드** — 요청 성격으로 먼저 가른다:
  - **정보성 후킹**(뉴스·꿀팁·리스트): 아래 `sns_cover` 밀도 문법.
  - **홍보판촉물**("홍보물/판촉물/브랜드 느낌/디자인 잘된/제품 홍보"): 컷타입 `promo_poster` → **`promo-router.md`에서 패턴 선택**(기본 P3 오버사이즈 크롭+오클루전·P4 컬러 블로킹 캠페인), 해당 `promo/Pn-*.md` 하나만 로드. 밀도·3D 클레이·배지 남발 금지 — 타이포 구조 + 2–3색 하드 락 + 마감 디바이스가 문법.
- **SNS 썸네일 문법(`sns_cover` 기본) — 밀도가 기본값.** 피드에서 멈추게 하는 건 여백이 아니라 밀도다(실측: 매거진 여백형은 나이브 고밀도 컷에 짐). 단 이 밀도 문법은 정보성 전용 — 홍보판촉물에 쓰면 미감이 죽는다.
  - 초대형 헤드라인이 **상단 40% 이상**, 핵심 키워드는 색 교체·형광 하이라이트·박스 반전으로 분리
  - 배경은 **2톤 색 블로킹**(밝은 필드 + 딥 톤 바닥) 또는 두꺼운 프레임 밴드, 브랜드 팔레트 3색 고정
  - **3D 입체 히어로 오브젝트 1개**(soft clay/plastic 렌더) + 주제 소품 3–5개(동전·계산기·영수증 류)를 하단 존에 — R축 "눈이 여기저기 튀어다니는" 드롭인과 결합해 볼거리 밀도 확보
  - **강조 장치 어휘**: 리본 밴드 · 스티커 칩 · 넘버 뱃지 · 체크리스트 미니카드 · 말풍선 배지 · 스파클 — 2–3개 골라 배치
  - 하단 페이지 인디케이터 점 3개 또는 "→" 캐러셀 신호
- `sns_content`(본문 카드): 커버보다 밀도 한 단계 낮춤 — 타이틀→불릿 2–3개→미니 일러스트의 읽기 위계, 텍스트 존/그래픽 존 분리
- 정확 카피는 헤드라인+서브 2–3개까지 따옴표 고정, 배지·칩 속 짧은 단어는 오탈자 허용 존
- 에디토리얼형(여백·매거진 톤)은 요청이 그 톤을 명시할 때만

## C8 브랜딩 목업
- 컷타입: `food_pkg` `cosmetic_pkg` `stationery_set` `signage` `app_icon_mockup` `shopping_bag` `brand_flatlay` `label_tag`
- 기본 AR: `1:1` `2:3` `16:9`
- 필수: 브랜드명·로고/라벨 배치·기재 재질·인쇄 마감·목업 표면·상업 사진
- 종이·포일·유리·플라스틱·패브릭·엠보싱·무광/유광 마감 명시

## C9 3D 아이콘
- 컷타입: `ui_component` `clay_object` `icon_set` `app_icon` `isometric_scene` `glass_icon` `emoji_3d` `logo_mark`
- 기본 AR: `1:1`, 아이콘 프레젠테이션 시트 `2:3`
- 필수: 단일 오브젝트 또는 세트 개수·재질·베벨·그림자·배경 그라데이션, 텍스트 없음(필요할 때만)
- 강한 마무리: "단일 앱 아이콘, 텍스트 없음. AR 1:1"

## C10 만화
- 컷타입: `dynamic_irregular` `page_grid` `page_4koma` `strip_vertical` `splash_page` `splash_inset` `action_spread` `page_12cut`
- 기본 AR: 페이지 `2:3`, 세로 웹툰 `9:16`, 4컷/그리드 `1:1`, 액션 스프레드 `16:9`
- 필수: 장르·퍼블리케이션 퀄리티·패널 수·거터·읽기 방향·컷별 비트·말풍선/SFX·잉킹/컬러 스타일
- 패턴: 오프닝 미디엄 문장 → 레이아웃 문장 → 컷 시퀀스 → 화풍 문장 → 팔레트 문장 → 텍스트 가독 문장 → `AR`
- 한글 대사 4–10자, 컷당 말풍선 1–2개, 다컷은 quality high·2048
- **두 전략**: (A) **멀티패널 통합 1페이지** — 캐릭터 일관성 강점, quality high·2048, 컷당 `카메라앵글+장면+감정`, establishing→close-up→reaction, 감정 피크 1회·마지막 회수, 다이나믹 레이아웃(사선거터·broken-border·cross-panel·비정형컷) 40%+. (B) **컷 단위 생성 후 조판** — 정밀 통제, 1컷=1호출, persona 블록 반복, "프레임 안엔 인물 한 명, 단독 포트레이트" 긍정 단언. 한국 웹툰(S07): soft cel shading·glossy K-beauty lips·dewy blush·vertical-scroll·3:4/4:5.

## C11 시네마틱 키아트
- 컷타입: `teaser_keyart` `character_one_sheet` `ensemble_montage` `vista_wide` `poster_2x3` `shadow_narrative`
- 기본 AR: `16:9`(1792x1024) 또는 `3:2`(1536x1024), 포스터는 `2:3`(1024x1536)
- **영문 Format A 사용** — 라벨 6섹션 그대로, 본문은 영어(시네마틱 어휘 밀도가 영어에서 높음)
- 필수: **타이틀 트리트먼트용 negative space 확보**(상단 밴드 또는 중앙 여백을 Scene에 명시) · **장르별 광 레시피** — 네온 사이버펑크(practical neon glow, teal&orange, wet reflective street) / 스릴러 저조도(low key, hard rim, deep shadow pools) / 판타지 골든(golden hour volumetric light, warm haze) · **billing-block 대비 하단 여백**(하단 1/8 클린 밴드)
- 타이틀을 실제로 렌더할 땐 `typography-layout.md`의 롤 블록(headline/billing) 적용, Tier-1 결합 공식 1회
- 캐릭터 원시트는 단독 인물+콘트라포스토+림 분리, 앙상블 몽타주는 크기 위계(주연 대형·조연 중형·배경 비스타)를 명시
- **그림자 서사(`shadow_narrative`)** — 컨셉 훅형 제품 포스터. 가상 제품을 sharp·premium·중앙 지배적으로 두고, **하드 레이킹 키로 만든 긴 캐스트 그림자가 시네마틱 장면으로 변형**된다(제품의 숨은 이야기 — 필름카메라→연인이 걷는 밤거리, 카세트→춤추는 군중, 향수병→피어나는 꽃). 제품은 또렷·중앙, **그림자가 서사 전담**. Scene에 "제품이 지배적 + 그림자가 무엇으로 변하는지"를 명시, Lighting에 `single hard raking key carving one long clean shadow`. 3어절 한글 슬로건 1개 따옴표 고정(Tier-1 결합공식 1회). 훅이 가장 강한 계열이고 3어절 한글 슬로건까지 정확하게 렌더된다. `AR 1:1`(1024x1024) 또는 포스터 `2:3`.

## C12 프레젠테이션 / 슬라이드 덱
- 컷타입: `cover_slide` `agenda_slide` `section_divider` `content_slide` `data_slide` `quote_slide` `closing_slide`
- 기본 AR: `16:9`(1792x1024) **덱 전체 고정**, 밀집 콘텐츠 슬라이드는 quality high
- 필수: **덱 DNA 블록** — 배경·팔레트 HEX·타이포 계열·장식 모티프를 한 문장으로 묶어 **전 슬라이드에 동일 문구로 반복**(시리즈 일관성의 핵심, C10 A전략의 화풍 문장과 같은 원리). 슬라이드마다 바꾸는 건 레이아웃·카피·비주얼만.
- 텍스트 예산: 슬라이드당 텍스트 블록 **4개 이하**(타이틀 + 불릿 2–3), 본문은 문장 대신 **짧은 구 단위** — 문장형 본문은 오탈자율이 뛴다(소규모 오탈자 허용 전제로 운용, 크리티컬 카피만 따옴표 고정).
- 레이아웃 패턴: `cover`(타이틀 밴드 + 풀블리드 비주얼) / `content`(좌 텍스트 컬럼 + 우 비주얼, 또는 상하 분할) / `data`(큰 숫자 타이포 중심 + 비율감 도형 — C6 돌파 전술 준용) / `divider`(섹션 번호 + 한 줄 타이틀, 여백 위주)
- 1행 = 1슬라이드 = 1호출. 덱은 jsonl 챕터로 관리(챕터 스키마·8섹션 변형 → `jsonl-and-examples.md` §5). 렌더 텍스트가 항상 있으므로 기본 Tier-1 승격 후보(텍스트 블록 3개+ 조건).
- 룩은 `look-presets.md`에서 1개 골라 덱 DNA 블록에 인라인한다.
