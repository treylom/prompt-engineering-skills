# TP4 광학 현상 타입 (글자가 잉크가 아니라 빛으로 존재한다)

- 성격: 헤드라인이 인쇄가 아니라 **물리 현상으로 존재**한다 — 램프가 벽에 드리운 그림자가 글자를 쓰고, 수면 반사가 글자를 만들고, 역광 풍경이 글자를 가린다. "실제 찍힌 사진인데 글자가 있다"는 발견의 감각. Found/Shadow Typography 계보.
- 관찰 시그니처 3변형:
  - **그림자 글자**: 실물 광원(램프·창)은 또렷하고, 헤드라인은 벽 위 소프트 섀도로만 존재 (`the headline existing purely as soft blurred shadow letters cast on the plain wall, the lamp itself sharp and physical`)
  - **반사 글자**: 글자 본체는 프레임 밖, 수면·유리에 비친 뒤집힌 상만 보임 — 수면 아래 서사 요소 1개 (`the title visible only as a rippling mirrored reflection on the water surface, its source outside the frame`)
  - **역광 오클루전**: 노을 하늘 위 대형 세리프, 도시 스카이라인·능선 실루엣이 글자 하단을 잠식 (`giant serif letters standing in the sunset sky, the black city skyline silhouette biting into their lower halves`)
- 드롭인(그림자): `a real floor lamp on the right edge washing warm light across a plain wall, the headline existing purely as soft blurred shadow letters cast on the wall surface, every letter edge diffused like a true shadow, the lamp body and cable rendered sharp and physical`
- 팔레트 시작값: 변형별 — 그림자: 라벤더 그레이 `#B9B7C9`·잉크 `#2B2A33`·웜 벌브 `#E8DCC4` / 반사: 딥네이비 `#1C2333`·아이스블루 `#9FC4D8` / 역광: 앰버 `#E8A13C`·실루엣 블랙 `#14100C`
- 주의: 그림자·반사 글자는 블러가 오탈자를 은폐해주는 대신 **짧은 카피(2~5어)**만. 반사 변형은 뒤집힘 방향을 명시("mirrored upside-down"). C11 `shadow_narrative`(그림자가 장면 서사)와 구분 — 여긴 그림자·반사가 **글자를 렌더**. `AR 2:3`
- 완성 예:
  ```
  Scene: a real black floor lamp on the right edge of the tall frame washing warm light across
  a plain lilac-grey wall, the headline "REST YOUR EYES" existing purely as soft blurred shadow
  letters cast on the wall in four stacked rows, every letter edge diffused like a true shadow,
  the lamp body and cable rendered sharp and physical. Camera: frontal, slight low angle, the
  wall filling the frame. Lighting: single directional lamp glow, gentle falloff toward the
  corners. Color grading: lilac grey #B9B7C9, shadow ink #2B2A33, warm bulb accent #E8DCC4.
  Texture/Medium: photographic realism, smooth matte wall grain. Text-in-image: the shadow
  headline appears once, small product line "floor lamp — from 14.900" near the bottom left. All text
  appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs,
  no watermark. AR 2:3
  ```
