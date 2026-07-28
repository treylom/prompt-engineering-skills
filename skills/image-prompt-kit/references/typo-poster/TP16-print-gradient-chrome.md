# TP16 인쇄 그라디언트 페이크 크롬 (평면 인쇄가 흉내낸 금속)

- 성격: 초볼드 올캡 덩어리 위로 **세로 그라디언트 한 줄기가 여러 행을 통째로 통과**해, 3D 반사 대신 평면 인쇄의 색 이행만으로 금속을 흉내낸다. 어깨와 카운터가 물리는 타입온타입 레이어링이 그 색면에 조각적 두께를 얹고, 교차부가 종이 흰색으로 파여 층이 갈린다. 판면은 렌더가 아니라 **촬영된 낱장 인쇄물**이다.
- 관찰 시그니처:
  - 초볼드 올캡이 판면을 좌우 마진까지 채우고 이웃 글자의 어깨·카운터가 서로 물림 (`ultra-bold all-caps display type filling the sheet edge to edge, neighbouring letters interlocking at the shoulders and counters`)
  - **세로 그라디언트 한 줄기 관통** — 색이 행 경계를 건너 이어져 여러 줄이 한 금속면으로 읽힘 (`a single vertical gradient ramp sweeping through every line of type at once so the hue continues across the line breaks`)
  - 겹친 글자는 종이 흰색으로 파여 형태만으로 분리됨 (`letters knocked out to paper white where they cross`)
  - 바깥 글자가 재단선 밖으로 잘림 (`the outer letters cropped by the trim edge`)
  - 위성 소형 텍스트가 글자 단위로 오르내리는 계단 베이스라인을 타고 대형 자형의 카운터 사이로 흘러듦 (`small satellite captions on a per-glyph stepping baseline threading through the counters`)
  - 실물 낱장 촬영 — 잉크 입상과 은분 반사, 상단 확산광 1개에 얕은 접지 그림자 (`a real printed sheet with visible ink grain and metallic-ink sparkle under one soft overhead light with a shallow contact shadow`)
- 드롭인: `the word "{단어}" set in ultra-bold all-caps display type filling the sheet edge to edge, neighbouring letters interlocking at the shoulders and counters, a single vertical gradient ramp sweeping through every line of type at once so the hue continues across the line breaks, letters knocked out to paper white where they cross and the outer letters cropped by the trim edge, small satellite captions on a per-glyph stepping baseline threading through the counters, printed on a real sheet with visible ink grain and metallic-ink sparkle under one soft overhead light`
- 팔레트 시작값(4색 하드 락): 필드 `#7E80A9` · 그라디언트 상단 `#D978EE` · 그라디언트 하단 `#F19369` · 넉아웃 여백 `#FCFCFF` (대체 조합: 딥틸 `#1E4C4A`+`#7DF2C3`→`#E9F26B` / 코퍼 `#2B1A14`+`#F2B872`→`#C6452F`)
- 주의: **관통 문구가 생명줄** — `the hue continues across the line breaks`를 빼면 행마다 색이 끊겨 그냥 색색의 글자 나열로 내려앉는다. 그라디언트는 **한 줄기 세로 1개**로 고정하고 행마다 다른 색을 주는 서술은 쓰지 않는다. 실패 모드는 위성 캡션이 대형 글자와 비슷한 크기로 커져 두 층이 한 덩어리로 뭉개지는 것 — 위성은 **얇은 흰 산세리프 소형**으로 크기·색·굵기 셋 다 대비를 준다. 그라디언트 상·하단 색은 **명도차를 벌린 2색**으로 잡는다(명도가 붙으면 관통이 보이지 않아 금속감이 사라진다). **한글 2~4자 안전권** — 한글 대형 자형은 `ultra-bold Korean display lettering`으로 서술하고 올캡 어휘를 쓰지 않으며, 한글 스트레스 컷은 `render the Korean text exactly as written, character by character`를 명시하고 `quality: high` + `1024x1536` 이상으로 간다. 한글 위성 캡션도 4자 내외. Tier-1 결합 공식 1회로 마감한다. 기본 `AR 2:3`, 정사각 히어로는 `1:1`(2048x2048), 배너형은 `16:9`
- 경계: **TP8 리퀴드 크롬**은 거울 반사면에 하늘 그라데이션이 비치고 획 아래가 흘러내리는 3D 액체 금속, TP16은 반사·드립·스펙큘러 없이 평면 인쇄의 세로 그라디언트 한 줄기만으로 금속을 흉내낸다 — "Y2K·녹아내리는 크롬"이면 TP8, "인쇄된 그라디언트·가짜 금속"이면 TP16. **TP3 타입 건축**의 물림은 등축 투영 3D 블록의 입체이고 TP16의 물림은 한 평면에서 겹치며 교차부가 흰색으로 파이는 2D 레이어링. **TP6 스위스 키네틱**은 액센트 1색이 단어 안의 단어를 집어내는 절제 문법이라 색의 역할이 정반대다.
- 완성 예:
  ```
  타이포그래피 포스터, 인쇄 완성도. Scene: the word "ALLOY" set in ultra-bold all-caps display
  type across three stacked lines filling the printed sheet edge to edge, neighbouring letters
  interlocking at the shoulders and counters, a single vertical gradient ramp sweeping through
  every line at once so the hue continues across the line breaks, crossing letters knocked out to
  paper white and the outer letters cropped by the trim edge.
  Camera: frontal full-sheet framing, the paper tilted three degrees, centered layout.
  Lighting: one soft overhead diffuse source, a shallow contact shadow along the lower edge.
  Color grading: field #7E80A9, gradient top #D978EE, gradient bottom #F19369, knockout white #FCFCFF.
  Texture/Medium: a real printed sheet with visible ink grain and metallic-ink sparkle.
  Text-in-image: the display word ALLOY leads once at the top, small satellite captions
  "flat print, false metal" in thin white capitals on a per-glyph stepping baseline threading
  through the counters.
  All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark. AR 2:3
  ```
