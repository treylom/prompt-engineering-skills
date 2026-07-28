# TP1 포토 마스킹 포스터 (글자가 풍경의 창이 된다)

- 성격: 지명·단어를 화면 전체에 세로 스택으로 쌓고 **획 안에 하나의 연속 사진**이 마스킹된다 — 글자가 창문이 되어 그 장소를 보여준다. 여행·도시 포스터 톤, Large Letter Postcard 계보.
- 관찰 시그니처:
  - 초대형 콘덴스드 볼드 캡스가 2~4행 세로 스택, 글자가 프레임 가장자리에서 크롭됨
  - 사진은 **전 스택에 걸친 한 장** — 다리·수평선·능선 같은 연속 요소가 행을 넘어 흐른다 (`one continuous photograph masked inside all the letterforms, its horizon flowing across every row`)
  - 마스크 밖 필드는 순흑/단색 — 사진과 필드의 명도 대비가 글자를 조각한다
  - 위성 라벨 블록 1곳(국가명·소제목, 씬 캡스)
- 드롭인: `a single place-name stacked in three rows of ultra-bold condensed capitals filling the whole tall frame, one continuous photograph of {장소} masked inside all the letterforms so the image flows across every row, letters cropped at the frame edges, the surrounding field in solid black, one small satellite label block near the upper right`
- 팔레트 시작값: 필드 `#0A0A0A` + 사진 고유색 2 (예: 틸 `#1E4A5F` · 앰버 `#E8A13C`)
- 주의: "하나의 연속 사진"을 명시하지 않으면 글자마다 딴 사진으로 쪼개진다. 스택은 2~4행. **한글 마스킹은 2자 안전권**(예: "부산" 2행 스택). P1(홍보물 마스킹)과 구분 — 여긴 메타 행·바코드 없이 풀블리드. `AR 2:3`
- 완성 예:
  ```
  Scene: the word "SEOUL" stacked in three rows of ultra-bold condensed capitals filling the
  tall frame, one continuous dusk photograph of a river skyline masked inside all the letterforms,
  bridge lights flowing across every row, letters cropped at the frame edges, the surrounding
  field solid black. Camera: flat frontal poster composition, full-bleed. Lighting: dusk glow
  living only inside the letterforms against the black field. Color grading: black #0A0A0A,
  dusk teal #1E4A5F, amber city lights #E8A13C. Texture/Medium: matte poster print, fine grain.
  Text-in-image: the masked stack is the headline itself, satellite label "RIVER CITY" upper right
  in thin spaced capitals. All text appears once, perfectly legible — no duplicate text,
  no extra words, no invented glyphs, no watermark. AR 2:3
  ```
