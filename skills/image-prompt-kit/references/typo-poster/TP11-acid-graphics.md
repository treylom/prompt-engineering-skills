# TP11 애시드 그래픽스 (형광이 순흑을 태운다)

- 성격: "colorful black" — 순흑 바탕 위 형광 그린·시안·핫핑크가 폭발하는 레이브 포스터. 뾰족하게 왜곡된 워드마크 하나가 중심을 잡고, 90s 레이브 모티프가 밀도를 채운다. 애시드 하우스 플라이어 계보의 인스타 리바이벌.
- 관찰 시그니처:
  - **워드마크 1개 원칙**: 트라이벌×블랙레터 하이브리드로 뾰족하게 왜곡된 메인 단어 (`the wordmark stretched into spiky tribal-blackletter hybrid letterforms, every terminal drawn out into a thin blade`)
  - 순흑 필드 + 형광 3색 하드 락 — 형광은 HEX로 박는다
  - 레이브 모티프 산포: 체커보드 스트립·와핑된 와이어 그리드·크롬 글로브·스마일 (`a warped checkerboard ribbon, a bulging wireframe grid, one chrome sphere`)
  - 밀도는 **그래픽 모티프로만** 채운다 — 위성 텍스트는 날짜·장소 1행까지만
- 드롭인: `the wordmark "{단어}" stretched into spiky tribal-blackletter hybrid letterforms in acid green, every terminal drawn out into a thin blade, floating on a pure black field crowded with a warped checkerboard ribbon, a bulging wireframe grid and one chrome sphere, hot pink and cyan accents burning at the edges`
- 팔레트 시작값: 순흑 `#050505` · 애시드 그린 `#39FF14` · 시안 `#00E5FF` · 핫핑크 `#FF2E9A`
- 주의: **정확 렌더는 메인 워드마크 1개뿐** — 미세 장식 텍스트를 흩뿌리면 전부 유령 글자가 된다(자유 작성 존도 최소). 왜곡 자형이라 원형 판독 한계 명시(`still reading as the word`). 한글은 뾰족 왜곡 대신 붓 터치 격문체로 번역, 2~3자. L프리셋과 조합 금지(팔레트가 정체성). `AR 2:3` / `9:16`
- 완성 예:
  ```
  Scene: the wordmark "RAVE" stretched into spiky tribal-blackletter hybrid letterforms in acid
  green filling the center of the tall black frame, every terminal drawn out into a thin blade
  yet still reading as the word, a warped checkerboard ribbon snaking behind it, a bulging
  wireframe grid rising from the bottom edge, one small chrome sphere floating upper left, hot
  pink and cyan accents burning along the frame edges. Camera: flat frontal flyer composition.
  Lighting: self-luminous fluorescent ink on black. Color grading: black #050505, acid green
  #39FF14, cyan #00E5FF, hot pink #FF2E9A. Texture/Medium: flat print with a faint screen-print
  halo around the fluorescents. Text-in-image: the wordmark appears once, one date line
  "12.31 midnight" in small capitals at the bottom. All text appears once, perfectly legible — no duplicate text,
  no extra words, no invented glyphs, no watermark. AR 2:3
  ```
