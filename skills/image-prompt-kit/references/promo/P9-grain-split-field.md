# P9 그레인 색면 분할 (경계가 점으로 부서지는 지판)

- 성격: 평평한 고채도 색면 두 장이 판면을 나누되 **그 경계선만 거친 인쇄 그레인 점묘로 부서뜨려** 두 면이 서로 물리게 만드는 표지·포스터 판면. 깊이는 원근이 아니라 색 분리와 잉크 알갱이가 만들고, 초대형 평면 대문자가 한쪽 색면 위에 누워 좌우 재단선까지 폭을 밟는다.
- 관찰 시그니처:
  - 평평한 고채도 색면 두 장이 세로 또는 가로 한 줄로 판면을 나눔 (`two flat saturated color fields dividing the plate along one boundary`)
  - **경계가 선 대신 좁은 점묘 대역으로 부서짐** — 알갱이는 그 띠 안에서만 흩어지고 두 색면 본체는 solid 유지 (`the boundary dissolving into a narrow strip of coarse printed grain stippling while both fields stay solid to their edges`)
  - 유기적 도형 하나가 경계를 밟고 앉아 화면의 유일한 스케일 기준 — 도형은 **명암 없는 평면 실루엣**으로 고정 (`a single organic shape resting across that boundary as the sole scale marker, held perfectly flat as one even ink area`)
  - 판면 전체에 균일한 망점 결이 깔려 인쇄 물성을 줌 (`uniform halftone tooth laid over the whole surface`)
  - 굵은 평면 대문자가 한쪽 색면 위에 누워 좌우 재단선까지 폭을 채우고, 위성 한 줄만 바깥 마진에 남음 (`bold flat display capitals spanning the full trim width, one small satellite line held in the outer margin`)
- 드롭인: `two flat saturated color fields dividing the plate along one boundary that dissolves into a narrow strip of coarse printed grain stippling while both fields stay solid to their edges, a single organic {피사체} shape resting across that boundary as the sole scale marker, held perfectly flat as one even ink area, uniform halftone tooth laid over the whole surface, {단어} set in bold flat display capitals lying on one field and spanning the full trim width with the outer strokes touching both trim edges, one small satellite line held in the outer margin, offset lithograph poster stock under even flat light`
- 팔레트 시작값: 주 색면 `#EE4A24` · 대비 색면 `#1D1D1A` · 그레인 경계 `#CB2212` · 활자 잉크 `#E1D0A7`
- 주의: 생명줄은 `boundary that dissolves into coarse printed grain stippling` 한 구 — 살아 있을 때만 두 색면이 인쇄물로 물리고, 매끈한 벡터 경계로 바뀌면 도형 두 장을 겹친 디지털 합성으로 읽힌다. 점묘 대역은 **판면 폭의 7% 안팎 좁은 띠**로 못 박고 나머지 색면은 solid로 유지한다 — 넓게 잡으면 두 면이 통째로 그레인에 잠겨 색 분리가 사라지고, 얇게 잡으면 알갱이가 안 남는다. 유기 도형에 명암·볼륨을 주면 3D 오브제로 읽혀 판면 평면성이 깨지므로 `held perfectly flat as one even ink area`를 함께 붙인다. **한글 2~5자 안전권** — 굵은 평면 자형이 재단선까지 폭을 밟는 구조라 자수가 늘수록 획이 얇아지고, 한글 헤드는 `spanning the full trim width, the outer strokes touching both trim edges`처럼 **글자폭이 재단선에 닿는 결과**를 명시해야 블리드 압력이 유지된다. 위성 텍스트는 바깥 마진 1행으로 묶고 활자 잉크색을 그대로 쓴다. `AR 2:3`
- 경계: 색면이 **두 장이고 경계에 그레인 대역이 있으며 초대형 활자가 주인공**이면 P9, 색면 한 장을 비우고 오브제 하나만 세운 뒤 활자를 마진 소형 위성으로 낮추면 P10.
- 완성 예:
  ```
  Scene: two flat saturated color fields dividing the plate, a deep ink field on the left meeting a warm orange field along one vertical boundary that dissolves into a narrow strip of coarse printed grain stippling while both fields stay solid to their edges, a single organic half-disc shape resting across that boundary as the sole scale marker, held perfectly flat as one even ink area.
  Camera: flat frontal projection, all planes parallel to the picture plane, the half-disc centered at two-thirds height.
  Lighting: one even flat poster light, open shadows, the color separation carrying all of the depth.
  Color grading: 주 색면 #EE4A24 · 대비 색면 #1D1D1A · 그레인 경계 #CB2212 · 활자 잉크 #E1D0A7.
  Texture/Medium: offset lithograph poster stock with uniform halftone tooth laid over the whole surface.
  Text-in-image: "SIGNAL" set in bold flat display capitals lying on the upper field and spanning the full trim width with the outer strokes touching both trim edges, one small satellite line "grain edition" held in the lower outer margin at a quarter of the cap height.
  All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark. AR 2:3
  ```
