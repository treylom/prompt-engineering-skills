# TP3 타입 건축 (글자를 읽지 않고 올려다본다)

- 성격: 글자가 등축(axonometric) 3D 블록·계단·구조물로 조립된다 — 단어가 건물처럼 서 있고, 보는 사람은 그것을 **읽는 게 아니라 올려다본다**. 디자인스쿨 전시 포스터 계보.
- 관찰 시그니처:
  - 등축 투영(소실점 없는 평행 3D) — 글자 블록이 큐브 구조로 맞물려 쌓임
  - 면별 명도 분리: 윗면 밝고 옆면 어두움 (`top faces bright, side faces shaded in two flat tones`)
  - **와이어프레임 고스트**: 같은 글자의 가는 윤곽선 잔상이 뒤에 흩어져 미완성 도면 느낌 (`faint thin wireframe outlines of the same letters scattered behind as ghost structures`)
  - 변형 — **수직 낙하 원근**: 글자가 하늘에서 지면으로 내려꽂히는 극단 1점투시 (`the words plunging downward in steep one-point perspective, each word extruded deep`)
  - 위성 정보는 좌측 정렬 소형 블록(일시·장소)
- 드롭인: `the words "{워드}" built as isometric three-dimensional letter blocks interlocking like architecture, top faces bright and side faces shaded flat, faint thin wireframe outlines of the same letters scattered behind as ghost structures, small left-aligned information blocks in the lower third`
- 팔레트 시작값: 잉크 `#111111` · 페이퍼 `#F2EFE8` + 액센트 1 (`#3EC1A7` 민트)
- 주의: **한글 3D 압출은 1~2자**(3자+ 자형 변형). 와이어프레임은 "faint thin" 명도 낮게 — 주인공 블록을 침범하면 화면이 도면으로 죽는다. P2 아이소메트릭 지형(인물 서사)과 구분 — 여긴 인물 없이 글자가 건축물. `AR 2:3`
- 완성 예:
  ```
  Scene: the words "BUILD" and "WERK" built as isometric three-dimensional letter blocks
  interlocking like a two-story structure on the upper two thirds of the tall frame, top faces
  bright and side faces shaded flat, faint thin wireframe outlines of the same letters scattered
  behind and below as ghost structures. Camera: axonometric projection, parallel lines, elevated
  view. Lighting: flat graphic shading, single light logic from upper left. Color grading: ink
  #111111 field, paper #F2EFE8 letter tops, mint #3EC1A7 on two accent faces. Texture/Medium:
  flat print, hairline vector edges. Text-in-image: the two headline blocks appear once, small
  left-aligned info block reads "SEMESTER SHOW 12–19" in the lower third. All text appears once,
  perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark. AR 2:3
  ```
