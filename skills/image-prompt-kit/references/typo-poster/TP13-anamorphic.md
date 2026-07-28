# TP13 아나모픽 착시 타입 (여러 표면에 흩뿌려져 한 시점에서만 합체하는 글자)

- 성격: 실사 3D 공간의 벽·바닥·기둥에 조각조각 칠해진 페인트가 **오직 이 카메라 각도에서만 평면 글자로 합체**하는 시점 착시. 조각을 흩뿌린 위치가 곧 설계이고, 정합이 어긋나면 그냥 벽 낙서로 무너진다. Felice Varini·Lex Wilson·Thomas Quinn 계보의 아나모픽 타이포그래피.
- 관찰 시그니처:
  - 단어 하나가 벽·바닥·기둥 세 표면에 조각으로 분산 도장 (`the word painted in fragments across the wall, floor and a concrete pillar`)
  - **시점 정합**: 조각들이 이 정확한 카메라 각도에서만 완벽한 평면 글자로 정렬 (`the fragments aligning into seamless flat letters only from this exact camera angle`)
  - **착시 증명 힌트**: 표면이 꺾이는 모서리에서 페인트 조각이 눈에 띄게 꺾여 시점 트릭임을 자백 (`paint edges bending visibly where the surfaces turn at the corners`)
  - 매끈한 도색 페인트와 공간 실사 재질의 대비 — 거친 콘크리트·나무 바닥 위 균일한 색면 (`flat matte paint over rough concrete and wooden floorboards`)
  - 단어는 1개, 극대형으로 공간 전체를 가로지름
- 드롭인: `the word "{단어}" painted in bright flat fragments scattered across the wall, floor and a concrete pillar of a real room, the fragments aligning into one seamless flat word only from this exact camera angle, the paint edges bending visibly where the surfaces turn at the corners`
- 팔레트 시작값: 콘크리트 그레이 `#B7B2A9` · 페인트 레드 `#E23B2E` · 우드 플로어 `#9A7B52` · 섀도 `#3A362F`
- 주의: 정합 문구(`aligning into seamless flat letters only from this exact camera angle`)와 꺾임 힌트(`paint edges bending where the surfaces turn`)가 이 패턴의 두 생명줄 — 둘 중 하나만 빠져도 "그냥 벽에 쓴 글자"로 붕괴한다. 전 패턴 중 최고 난도라 2~3회 리트라이 전제, 조각이 어중간하게 어긋난 컷은 임팩트가 죽으니 폐기하고 다시 뽑을 것. 단어 1개 4~8자 영문 권장, **한글이면 1~2자**. 위성 텍스트는 두지 않고 대형 단어 하나로 승부. `AR 2:3`
- 완성 예:
  ```
  Scene: an empty concrete room where the word "LOOK" is painted in flat vermilion fragments
  scattered across the left wall, the floorboards and a square concrete pillar, the fragments
  aligning into one seamless flat word only from this exact camera angle, the paint edges bending
  visibly where the wall meets the floor and where the pillar turns. Camera: single fixed vantage
  point, eye-level, the illusion resolving only here. Lighting: even daylight from a side window,
  soft grounded shadows under the pillar. Color grading: concrete grey #B7B2A9, paint vermilion
  #E23B2E, wooden floor #9A7B52, shadow #3A362F. Texture/Medium: flat matte paint over rough
  concrete and worn floorboards, photoreal spatial render. Text-in-image: the single anamorphic
  word LOOK spanning the whole space. All text appears once, perfectly legible —
  no duplicate text, no extra words, no invented glyphs, no watermark. AR 2:3
  ```
