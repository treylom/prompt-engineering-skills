# TP15 손절단 비정렬 워드마크 (자를 던져버린 레터링)

- 성격: 기성 폰트 자리를 손으로 오려낸 각진 자형과 붓으로 그은 획이 통째로 대신하고, **글자 하나하나가 자기 베이스라인·크기·기울기를 따로 가져가** 단어 한 줄이 조판 대신 배치로 완성되는 패턴. 자형의 불완전함 자체가 조형 주체라 손의 흔적이 클수록 룩이 산다.
- 관찰 시그니처:
  - 손으로 오려낸 각진 외곽선과 두꺼운 붓 획이 워드마크 전체를 담당 (`hand-cut angular letterforms with thick brush-drawn outlines carrying the whole wordmark`)
  - **글자마다 자기 베이스라인·크기·기울기** — 단어 중간에서 행이 계단처럼 흘러내림 (`every glyph riding its own baseline at its own size and tilt`)
  - 워드마크가 프레임 폭을 압도해 재단선까지 밀고 나감 (`oversized wordmark filling the frame width out to the trim`)
  - 평탄한 단색 필드가 화면을 받치고 원색 스팟 잉크 두셋만 그 위에 얹힘 (`flat single-hue field carrying two or three saturated spot inks`)
  - 위성 텍스트 한 줄은 가늘고 정연하게 낮춰 굵기 위계를 벌림 (`one thin orderly satellite caption set small and level`)
  - 종이 결과 획 안쪽에 고인 잉크가 표면에 남고 균일 정면광이 전면을 고르게 덮음 (`letterpress paper grain with ink bloom pooling inside the strokes under even frontal light with open shadows`)
- 드롭인: `{단어} rendered in hand-cut angular letterforms with thick brush-drawn outlines carrying the whole wordmark, every glyph riding its own baseline at its own size and tilt, the oversized wordmark filling the frame width out to the trim over a flat single-hue field carrying two or three saturated spot inks, one thin orderly satellite caption set small and level, letterpress paper grain with ink bloom pooling inside the strokes under even frontal light with open shadows`
- 팔레트 시작값: 지면 필드 `#E1DECF` · 레터폼 잉크 `#2E2E2E` · 하드락 스팟 `#EE4128` · 위성 하이라이트 `#E9CB78`
- 주의: 생명줄은 `every glyph riding its own baseline at its own size and tilt` 한 구다 — 빠지면 모델이 곧바로 정렬된 벡터 산세리프로 되돌아가 평범한 로고 조판이 된다. 실패 모드는 **어긋남 과잉**: 기울기가 커지면 단어가 낱글자로 흩어지므로 글자당 3~8도, 베이스라인 이동은 글자높이의 1/6 안쪽으로 묶는다. **한글 2~4자 안전권**(획을 오려내는 자형이라 5자 이상이면 자모가 뭉갠다) — 스트레스 컷은 2자로 잡고 위성 한글도 3자 안쪽 1행으로 유지한다. 위성 텍스트는 가는 손글씨 1행으로 짧게. `AR 2:3` 기본, 가로 판면은 `AR 3:2`로 재단선까지 밀어붙인다.
- 경계: **TP6 스위스 키네틱**은 정연한 그리드에 규칙 위반 1종을 몇 밀리미터만 허용하는 절제 문법, TP15는 자형 자체를 손으로 오려내고 글자마다 베이스라인·크기·기울기를 따로 준다 — "스위스·미니멀·사선 절단"이면 TP6, "손글씨 자형·삐뚤빼뚤한 워드마크"면 TP15. **TP5 물성 파괴**는 종이가 찢기는 물리 사고가 메시지이고 자형은 온전히 유지되지만 TP15는 종이가 멀쩡하고 자형이 손절단 결과물이다. **P12 간판체 콜라주**와는 어긋남의 단위가 글자 대 판면으로 다르다 — "워드마크 한 컷"이면 TP15, "시리즈·그리드"면 P12.
- 완성 예:
  ```
  Scene: "REMAKE" rendered in hand-cut angular letterforms
  with thick brush-drawn outlines carrying the whole wordmark,
  every glyph riding its own baseline at its own size and tilt
  so the line steps downward across a flat cream field.
  Camera: straight-on flat plate framing,
  the oversized wordmark filling the frame width out to the trim
  across the upper two thirds.
  Lighting: one broad frontal source, even across the sheet with open shadows.
  Color grading: page field #E1DECF, letter ink #2E2E2E,
  hard-lock spot #EE4128, satellite highlight #E9CB78.
  Texture/Medium: letterpress paper grain with ink bloom pooling inside the strokes,
  printed matter photographed square on.
  Text-in-image: 타이틀 the wordmark dominant in cut ink
  with one letter tipped into the spot colour,
  캡션 "a paper cut annual" thin and level beneath.
  All text appears once, perfectly legible — no duplicate text, no extra words,
  no invented glyphs, no watermark. AR 2:3
  ```
