# TP14 미크로그래피 (Text Portrait — 글자로 그린 초상)

- 성격: 멀리서는 초상·사물, 다가가면 수천 개의 미세 글자 — **텍스트의 밀도·크기·굵기가 명암 계조를 대행한다**(밝은 곳은 성기고 가늘게, 어두운 곳은 조밀하고 굵게). 단색 잉크+백지의 극단 미니멀, 9세기 히브리 미크로그래피와 칼리그람의 계보.
- 관찰 시그니처:
  - 초상 전체가 오직 미세 글자 뭉치에서만 떠오름 (`the portrait emerging purely from thousands of tiny text-like marks, denser and bolder in the shadows, sparse and thin in the light`)
  - **윤곽선 없음**: 형태의 경계는 글자 흐름 방향이 꺾이는 것으로만 드러남 (`the boundaries of the form defined purely by shifts in the flow direction of the micro-lettering, every edge reading as a change in texture rather than a line`)
  - 단색 잉크가 맨 종이 위에서 밀도만으로 톤을 쌓음 (`a single ink on bare paper, tone built entirely by how tightly the lettering packs`)
  - 원경~중거리 구도로 초상 전체가 한눈에 잡힘 — 미세 글자는 판독되지 않는 질감으로만 (`mid-distance framing so the whole portrait reads at once, the micro-lettering resolving into pure texture`)
  - 크게 앉힌 헤드라인 1개만 또렷이 읽히는 유일한 글자 (`one large headline as the only legible text, set apart in a clear margin`)
- 드롭인: `a portrait rendered entirely in micrography, thousands of tiny text-like marks on bare paper standing in for tone — denser and bolder in the shadows, sparse and thin in the light — the boundaries of the face formed only by shifts in the flow direction of the lettering, with one large headline as the single legible word`
- 팔레트 시작값: 잉크 `#141414` · 종이 `#F4EFE3` (선택 세피아 잉크 `#3A2A1C`)
- 주의: 미세 반복 글자는 어떤 엔진에서도 유사문자 뭉개짐이 되므로 **판독을 포기하고 `text-like micro lettering`으로 명암만 취하는 것이 이 패턴의 공식 전략** — 판독 목표는 헤드라인 1개만 크게 분리해 앉힌다. 구도는 원경~중거리 고정, 근접 크롭은 뭉개짐이 들통나니 금지. **Tier-1 특례**: 미세 반복 마크 자체가 이 패턴의 디자인이므로 결합 공식(`no duplicate text` 등)을 쓰면 미세 글자가 억제되어 룩이 무너진다 — 부정형은 완성 예 끝의 `the headline appears once, perfectly legible — no watermark.`만 허용. 한글 헤드라인은 2~4자 안전권, 미세 마크는 언어 불문 text-like. 초상이 흐리게 나오면 밀도 대비 문구(`denser and bolder in the shadows, sparse and thin in the light`)를 먼저 강화해 리트라이. `AR 2:3`
- 완성 예:
  ```
  Scene: a human face in three-quarter view emerging entirely from thousands of tiny
  text-like marks on bare paper, the marks denser and bolder where shadow falls and sparse
  and thin where light hits, the planes and boundaries of the face formed purely by shifts in
  the flow direction of the micro-lettering, every edge reading as a change in texture.
  Camera: mid-distance
  framing, the full portrait held within the frame. Lighting: an implied single soft source
  from the upper left, the entire tonal range carried by lettering density alone. Color
  grading: single ink #141414 on warm paper #F4EFE3. Texture/Medium: pen-and-ink micrography
  on lightly textured paper. Text-in-image: the portrait body built from unreadable text-like
  micro lettering, and one large headline "고요" set apart in a clear lower margin. the
  headline appears once, perfectly legible — no watermark. AR 2:3
  ```
