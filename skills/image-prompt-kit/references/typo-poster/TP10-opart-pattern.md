# TP10 옵아트 패턴 타입 (화면이 진동한다)

- 성격: 글자에 윤곽선이 없다 — **패턴의 밀도·방향 차이만으로 자형이 떠오르고**, 글자 패턴과 배경 패턴이 간섭해 화면이 물리적으로 진동한다. 인쇄물에서 움직임을 느끼게 하는 유일한 계열, Hansje van Halem 계보.
- 관찰 시그니처:
  - 글자 내부: 균일 간격의 가는 선·해칭·동심원 충전 (`the letter interiors filled with evenly spaced thin horizontal lines`)
  - 배경: 같은 패턴을 각도만 틀어 깔아 간섭 진동 생성 (`the background filled with the same line pattern rotated fifteen degrees, the two patterns interfering into a vibrating moiré`)
  - 윤곽선 부재 명시 — 경계는 패턴 방향 전환뿐
  - 보색 진동쌍(레드/블루)이 떨림을 증폭
- 드롭인: `the word "{단어}" defined purely by pattern — letter interiors filled with evenly spaced thin horizontal lines, the background filled with the same line pattern rotated fifteen degrees, the two fields interfering into a vibrating moiré, the letterforms emerging with clean edges where the line directions change`
- 팔레트 시작값: 페이퍼 `#F2EFE6` · 레드 `#D93A2B` · 블루 `#2440B0` (진동쌍은 2색만)
- 주의: 패턴 주기를 수치 감각으로 고정("evenly spaced thin lines") — 모델은 선이 중간에 합쳐지거나 끊기기 쉬우니 **중거리 뷰 구도**로 근접 검수를 피한다(근접 크롭 금지). 짧은 단어(3~7자), 한글 2~3자 가능(획 많은 글자는 패턴 해상도 부족). `AR 2:3`
- 완성 예:
  ```
  Scene: the word "PULSE" filling the tall frame, defined purely by pattern — letter interiors
  filled with evenly spaced thin horizontal lines in red, the background filled with the same
  line pattern rotated fifteen degrees in blue, the two fields interfering into a vibrating
  moiré, the letterforms emerging with clean edges only where the line directions change.
  Camera: flat frontal print view at mid distance, the full word comfortably inside the frame.
  Lighting: flat graphic ink, evenly lit print surface. Color grading: paper #F2EFE6, vibration red #D93A2B,
  vibration blue #2440B0. Texture/Medium: precise mechanical line work, flat silkscreen ink.
  Text-in-image: the pattern word appears once, tiny caption "optic series 03" at the lower edge.
  All text appears once, perfectly legible — no duplicate text, no extra words,
  no invented glyphs, no watermark. AR 2:3
  ```
