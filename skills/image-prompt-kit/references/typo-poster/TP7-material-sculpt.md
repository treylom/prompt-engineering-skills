# TP7 재질 조각 타입 (만지고 싶은 글자)

- 성격: 단어 하나가 **단일 실물 재질의 조각**으로 렌더된다 — 유리·젤리·대리석·얼음·초콜릿. 재질의 물리 증거(굴절·기포·끌자국·녹은 물방울)가 주인공이고, 보는 사람의 손끝이 먼저 반응한다. 임팩트 대비 성공률이 가장 높은 주력 패턴.
- 관찰 시그니처:
  - **재질 1개 + 단어 1개** 원칙 — 혼합 재질 금지
  - 재질별 물리 증거를 반드시 1~2개 박는다: 유리 `light refracting through the strokes, caustic patterns on the floor` / 젤리 `translucent wobble, surface tension bulging at the edges` / 대리석 `chisel marks along the stroke sides, cold polished faces` / 얼음 `tiny air bubbles frozen inside, meltwater pooling at the base`
  - 매크로 접사 + 얕은 심도, 심리스 스튜디오 배경 단색
  - 소프트 1~2등 조명 + 바닥 소프트 섀도
- 드롭인: `the word "{단어}" sculpted as a single piece of {재질} standing on a seamless studio surface, {재질 물리 증거}, macro close framing with shallow depth of field, one soft key light and a gentle fill, soft contact shadow under every letter`
- 팔레트 시작값: 배경 뉴트럴 1 (`#E9E6E0` 웜그레이) + 재질 고유색 1~2
- 주의: 재질 2개를 섞으면 양쪽 다 죽는다 — 변주는 컷을 나눠서. **한글 1~2자 최적**("물"·"얼음" 급 재질-단어 일치가 최상). 배경은 비운다 — 소품이 들어오면 C4 도감으로 오염. TP2·TP3 표면에 재질만 입히는 재질 이식 교배는 허용(라우터 참조). `AR 4:5`(단어 가로) / `1:1`(짧은 단어)
- 완성 예:
  ```
  Scene: the word "GLASS" sculpted as a single piece of clear glass standing on a seamless
  pale studio surface, light refracting through every stroke and throwing soft caustic patterns
  onto the floor, tiny air bubbles trapped deep inside the letterforms. Camera: macro close
  framing at letter height, shallow depth of field, the far letters melting into soft focus.
  Lighting: one soft key from upper left, gentle cool fill, soft contact shadow under every
  letter. Color grading: warm grey field #E9E6E0, glass edge teal #BFDCD8, deep refraction
  #4A6B68. Texture/Medium: photoreal render finish, flawless surface with honest refraction.
  Text-in-image: the sculpted word itself is the only text, appearing once. All text appears once, perfectly legible —
  no duplicate text, no extra words, no invented glyphs, no watermark. AR 4:5
  ```
