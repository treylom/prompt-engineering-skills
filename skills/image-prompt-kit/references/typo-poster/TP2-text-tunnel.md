# TP2 텍스트 터널 (단어 반복이 3D 곡면을 만든다)

- 성격: 같은 단어가 튜브·터널·소용돌이 표면에 반복되며 **글자만으로 3D 공간**을 만든다 — 정지 화면인데 빨려드는 운동감이 보이는 still-frame kinetic 계보.
- 관찰 시그니처 3변형:
  - **튜브 랩**: 단어가 굵은 원통 표면을 감아 도는 S자 관 (`the word wrapped around thick tubular forms curving through the frame, letters compressing on the far side of each curve`)
  - **원근 터널**: 사각/원형 링이 소실점으로 반복 축소, 터널 입구에 실루엣 1명 옵션 (`repeated as concentric rings receding to a bright vanishing point, each ring smaller and dimmer, a lone silhouetted figure at the tunnel mouth`)
  - **소용돌이**: 회전하며 중심으로 감겨 들어가는 나선 (`spiraling inward, each revolution tighter, the innermost turns dissolving into texture`)
- 드롭인(터널): `the single word "{단어}" repeated as eight concentric rectangular rings receding to a glowing vanishing point, letters bending around the ring corners, the outer two rings large and fully legible, inner rings shrinking into rhythmic texture`
- 팔레트 시작값: 순흑 `#0A0A0A` · 화이트 `#F2EFE8` · 레드 `#C4302B`
- 주의: 반복 단어는 짧게(영문 4~10자, 한글 2~4자). 반복 수를 수치로("eight rings"). **판독 위계 명시** — 바깥 2~3링만 또렷하면 성립, 안쪽은 텍스처로 뭉개지는 게 정상. **Tier-1 결합 공식 금지**(`no duplicate text`가 반복 컨셉과 모순) — `no invented glyphs, no watermark`만. `AR 2:3`(터널·나선) / `9:16`(튜브 세로)
- 완성 예:
  ```
  Scene: the single word "GRAVITY" repeated as eight concentric rectangular rings receding to
  a glowing vanishing point at the center of the tall frame, letters bending around the ring
  corners, the outer two rings large and fully legible, inner rings shrinking into rhythmic
  texture, a lone silhouetted figure standing at the tunnel mouth. Camera: dead-center one-point
  perspective, symmetrical. Lighting: light source at the vanishing point, rings darkening
  toward the viewer. Color grading: black #0A0A0A, warm white #F2EFE8, signal red #C4302B on
  alternate rings. Texture/Medium: flat poster print, subtle film grain. Text-in-image: the
  repeated word is the composition itself, each visible repetition legible — no invented glyphs,
  no watermark. AR 2:3
  ```
