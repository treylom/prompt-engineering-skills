# P12 간판체 콜라주 + 앵커 타입 (자형은 난립, 앵커는 하나)

- 성격: 한 판면 안에 서로 다른 계열의 디스플레이 자형을 칸마다 갈아끼워 늘어놓고, 그 난립을 **초압축 슬랩 앵커 한 종**이 고정 위치에서 눌러 잡아 시리즈로 묶는 2층 타이포 시스템. 자형이 변수를 맡고 앵커·씰·여백 골격이 상수를 맡는 역할 분리가 작동 원리다. 캠페인 시리즈·9그리드·지면 연작을 "한 손에서 나온 것처럼" 읽히게 하는 문법.
- 관찰 시그니처:
  - 1도 색면 판면을 격자로 깔고 칸마다 배경색만 갈아끼우며 요소 배치 순서는 고정 (`a grid of single-hue color-field panels with swapped hues and a fixed element order`)
  - **앵커 권한은 한 종에만** — 초압축 슬랩 대문자 한 종이 매 칸 같은 자리에서 판면 폭을 꽉 채우며 위계의 바닥을 만듦 (`one ultra-condensed slab anchor filling the panel width at a fixed lower band`)
  - 표제 자형은 칸마다 계열을 바꿈 — 인라인 줄무늬, 아웃라인+오프셋 그림자, 계단형 비트맵, 점 조합 도트 (`inline-striped, offset-shadow outline, pixel-stepped, dotted display letterforms alternating panel to panel`)
  - 원형 씰 배지와 모노스페이스 극소 캡션이 매 판면 같은 모서리에 반복돼 위성 층을 이룸 (`a circular seal badge with a monospaced micro caption locked to the same corner`)
  - 인쇄물이 석재·아스팔트 같은 거친 바닥 위에 확산광으로 놓여 여백이 실제 표면으로 이어짐 (`printed sheets resting on speckled stone under broad soft daylight`)
- 드롭인: `a grid of single-hue color-field panels with swapped hues and a fixed element order, each panel carrying a different display letterform — inline-striped, offset-shadow outline, pixel-stepped, dotted — while one ultra-condensed slab anchor holding {단어} fills the panel width at a fixed lower band, a circular seal badge and a monospaced micro caption locked to the same corner, printed sheets resting on speckled stone under broad soft daylight`
- 컷 공식(1컷 = 1행): `[고정 골격 문장(격자·앵커 밴드·씰 코너·석재 바닥)] + [이 컷의 자형 계열 조합 1문장] + [이 컷의 앵커 단어]`
- 팔레트 시작값: 색면 필드 `#DAE9BE` · 앵커 잉크 `#143212` · 액센트 띠 `#F27A2C` · 하이라이트 스트라이프 `#ECE873`
- 주의: 생명줄은 `one ultra-condensed slab anchor` — 앵커를 한 종으로 못 박아야 나머지 자형이 아무리 갈려도 한 시리즈로 읽힌다. 실패 모드는 앵커가 위성 캡션 크기로 내려앉아 위계가 평평해지는 것이므로 `filling the panel width`처럼 폭 점유를 수치화한 문장을 항상 붙인다. 색면과 앵커 잉크의 명도차를 4단 이상 벌려 두면 자형 계열이 넷으로 갈려도 앵커가 먼저 읽힌다. **고정 밴드도 '가장자리 배치'로 약하게 해석되기 쉽다** — `at a fixed lower band` 단독 대신 `an ultra-condensed slab anchor filling the full panel width inside a fixed bottom band, its baseline locked to the bottom margin of every panel`처럼 밴드의 위치와 점유 폭을 결과로 못 박는다. **한글 2~4자 안전권** — 초압축 슬랩은 받침 있는 글자에서 획이 서로 붙으므로 짧게 가고, 정확도가 최우선이면 `2048x2048` + quality high로 올린다. 위성 텍스트는 모노스페이스 소자로 앵커 대비 8분의 1 이하 크기. `AR 4:5`
- 경계: **TP15 손절단 워드마크**는 한 단어 안에서 글자마다 어긋나는 단일 워드마크, P12는 판면끼리 자형 계열이 갈리는 다판면 시스템 — 어긋남의 단위가 **글자 대 판면**으로 다르다. "워드마크 한 컷"이면 TP15, "시리즈·그리드"면 P12. **P4 컬러 블로킹**은 색을 상수로 두고 컷당 소품 1개를 변주하지만 P12는 색과 표제 자형을 변수로, 앵커 1종을 상수로 둔다 — 상수·변수 배정이 정확히 뒤집혀 있다. **P6 스트리트 콜라주**의 콜라주는 기울인 사진·테이프·낙서의 스크랩 물성이 전부이고 P12는 사진 없이 자형 계열만 교체하는 순수 자형 콜라주. **C8 signage**는 브랜드 사인물 자체를 실물 목업으로 보여주는 컷타입이고, P12는 간판 자형을 인쇄 판면으로 인용해 시리즈로 묶는다.
- 완성 예:
  ```
  한국어 캠페인 포스터 시리즈, 상업 인쇄 완성도. Scene: 여섯 칸 격자로 늘어놓은 1도 색면 판면, 칸마다 배경 색상만 갈아끼우고 요소 배치 순서는 고정, 표제 자형 계열이 인라인 줄무늬·아웃라인 오프셋 그림자·계단형 비트맵·도트 조합으로 칸마다 교체되며, 초압축 슬랩 앵커 한 종이 매 칸 같은 하단 밴드에서 판면 폭을 꽉 채우고 베이스라인이 하단 마진에 물린다. Camera: 톱다운 정면 평면 구성, 모든 면이 화면과 평행, 판면 여백이 실제 바닥으로 이어진다. Lighting: 좌상단 넓은 확산 자연광 하나, 시트 가장자리에 붙는 열린 그림자. Color grading: 색면 #DAE9BE, 앵커 잉크 #143212, 액센트 띠 #F27A2C, 하이라이트 스트라이프 #ECE873. Texture/Medium: 비도공 오프셋 용지의 섬유 그레인과 매트 평면 잉크, 아래에는 점박이 석재 표면. Text-in-image: "오늘의 맛" 하단 밴드의 슬랩 앵커에 판면 폭 가득, "제1호" 우하단 원형 씰 배지 옆 모노스페이스 극소 캡션 1행. 모든 텍스트는 한 번씩만, 완벽히 또렷하게 — no duplicate text, no extra words, no invented glyphs, no watermark. AR 4:5
  ```
