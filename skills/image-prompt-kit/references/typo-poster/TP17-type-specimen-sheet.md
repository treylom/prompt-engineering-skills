# TP17 활자 견본 시트 (글리프 세트가 주인공인 진열 판면)

- 성격: 글리프 세트 진열과 축 래더가 한 지면에서 서로를 설명하는 조판 패턴. **등간격 매트릭스**가 자형의 어휘 전량을 펼치고, 바로 옆 **수직 래더**가 같은 문자열의 굵기·폭 축을 단계별로 갈라 세워 자형 규칙을 눈에 박는다. 반복 텍스트 자체가 콘텐츠이므로 위성 카피는 룰선에 붙은 축 라벨 한 행으로 최소화한다.
- 관찰 시그니처:
  - 전체 문자·숫자·기호 세트를 등간격 다행 매트릭스로 진열 (`the complete glyph set as an even multi-row matrix`)
  - 같은 문자열을 축값만 바꿔 수직으로 반복해 굵기·폭 단계를 쌓음 (`one string repeated down a vertical weight-and-width ladder`)
  - **카운터를 표식으로 드러냄** — 획 안쪽에 헤어라인 슬릿과 노치를 파고 원형 렌즈로 부위를 확대 (`counters marked by inline hairline slits and circular lens cut-outs`)
  - 헤어라인 룰선이 지면을 라벨 밴드로 끊고 소자 모노스페이스 축 캡션이 밴드마다 붙음 (`hairline rules cutting the page into labelled bands with small monospaced axis captions`)
  - 필드 1색과 잉크 1색으로 잠근 2도 판면, 대형 글자는 재단선 밖으로 블리드 (`a two-ink lock of one flat field colour plus one ink colour, oversized display glyphs bleeding past the trim edge`)
- 드롭인: `a full type specimen sheet for {단어}: the complete glyph set as an even multi-row matrix, one string repeated down a vertical weight-and-width ladder, hairline rules cutting the page into labelled bands with small monospaced axis captions, a two-ink lock of one flat field colour plus one ink colour, oversized display glyphs bleeding past the trim edge, counters marked by inline hairline slits and circular lens cut-outs, flat print-plate rendering under even frontal light`
- 팔레트 시작값: 지면 필드 `#181818` · 글리프 잉크 `#F4F4F4` · 축 라벨 액센트 `#DAFB6E` · 대조 밴드 `#D2D2D2`
- 주의: **생명줄은 매트릭스와 래더의 동시 존재** — 둘이 함께 있을 때만 견본 시트로 읽히고, 하나만 남은 판면은 워드마크 한 컷으로 주저앉아 TP6 영역으로 흡수된다. 실패 모드는 행수·단수 선언 생략이므로 매트릭스는 `an even six-row matrix`, 래더는 `five weight steps`처럼 **수치로 못 박아** 문자열이 판독선 위에 남게 한다. **재단선 블리드도 '가장자리 배치'로 약하게 해석되기 쉽다** — `bleeding past the trim edge` 단독은 판면 안에 얌전히 들어앉으므로 `letterforms running past the trim edge and cut through by the frame edge so the word reads as continuing beyond the sheet`처럼 관통과 절단을 함께 못 박는다. **한글 2~4자 안전권**: 대문자 영문을 우선 올리고 한글은 굵은 2자 단문만 매트릭스와 디스플레이 행에 세우며 축 캡션도 한글이면 2자로 끊는다. 위성 텍스트는 소캡 모노스페이스 축 라벨 1행으로 묶어 룰선에 붙이고 롤 라벨(밴드 위치·캡션)을 함께 적는다. **Tier-1 서브셋 특례**: 미세 반복 진열이 컨셉이므로 결합 공식은 `no invented glyphs, no watermark` 서브셋만 쓴다(TP2·TP14와 동일) — 이 두 구는 트레일링 `AR x:y` 직전 한 절에 붙여 쓰고 개행이 필요하면 구 경계에서만 끊는다. 기본 `AR 4:3`, 세로 견본지는 `3:4`, 와이드 진열은 `16:9`, 정사각은 `1:1`
- 경계: **TP2 텍스트 터널**의 반복은 소실점·나선으로 3D 공간을 만드는 원근 장치, TP17의 반복은 등간격 매트릭스와 수직 축 래더로 자형 어휘와 굵기·폭 단계를 진열하는 목록 장치다 — "빨려드는·터널·소용돌이"면 TP2, "활자 견본·글리프 세트"면 TP17. **TP6 스위스 키네틱**은 헤드라인 하나가 주인공이고 그리드는 배경, TP17은 글리프 세트 자체가 콘텐츠이고 룰선·축 캡션이 그것을 라벨링한다. **C4 제품 도감**의 리더선·번호 콜아웃은 제품 부품을 지시하고, TP17의 인라인 헤어라인 슬릿·원형 렌즈 컷아웃은 글리프 카운터를 지시한다.
- 완성 예:
  ```
  Scene: a full type specimen sheet for the wordmark ORBIT, the complete glyph set laid out as an even six-row matrix of capitals, numerals and punctuation across the upper half, the same string repeated down a vertical weight-and-width ladder of five steps in the right column, hairline rules cutting the page into labelled bands.
  Camera: flat frontal projection, the sheet filling the frame with the display line running past the trim edge and cut through by the frame edge.
  Lighting: one even frontal source, uniform edge to edge across the page.
  Color grading: field #181818 · glyph ink #F4F4F4 · axis-label accent #DAFB6E · contrast band #D2D2D2.
  Texture/Medium: flat print-plate surface, matte ink, hairline rules held at a single weight.
  Text-in-image: "ORBIT" set oversized across the middle band with counters marked by inline hairline slits and circular lens cut-outs, small monospaced axis captions reading "WEIGHT 100 TO 900" running along the rules.
  Every glyph stays legible — no invented glyphs, no watermark. AR 4:3
  ```
