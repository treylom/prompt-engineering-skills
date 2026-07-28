# TP12 퓨처 미디벌 고딕 (순흑 제단 위로 발광하며 부상하는 블랙레터)

- 성격: 블랙레터·프락투어 자형을 **극세 샤프한 디지털 렌더로 재해석** — 중세 필사본의 손맛을 지우고 칼날처럼 벼린 벡터 획으로 다시 깎는다. 순흑 배경에서 글자가 발광하듯 부상하고, 오컬트 심볼·문장(紋章)·중세 장식 테두리가 디지털 렌더와 시대 충돌을 일으키는 David Rudnick 계보의 post-digital blackletter.
- 관찰 시그니처:
  - 순흑 제단 위로 글자가 자체 발광하며 떠오름 — 광원이 글자 안쪽에 있는 감각 (`sharp digital blackletter glowing from within, rising out of a pure black field like light through a cathedral window`)
  - **칼날 세리프**: 세리프·획 끝이 검처럼 뾰족하게 연장되어 자형 실루엣을 날카롭게 마감 (`the serif terminals extended into thin blade-like points, each stroke ending in a sharp edge`)
  - **제단화 구도**: 좌우대칭 altarpiece 프레임 — 글자를 중심축에 두고 문장·오컬트 심볼·중세 장식 테두리가 좌우로 접혀 대칭 (`a symmetrical altarpiece composition, heraldic crests and occult sigils mirrored left and right around a central axis`)
  - 밀도는 장식 테두리에 배분 — 글자는 크고 단순하게, 화면의 세공감은 필리그리 보더·문장 세부로 채운다 (`the ornamental border dense with fine engraved filigree while the central word stays large and clean`)
- 드롭인: `the word "{단어}" rendered as sharp digital blackletter glowing on a black altar field, blade-tipped serifs and a symmetrical engraved border of heraldic sigils, ...`
- 팔레트 시작값: 순흑 필드 `#040406` · 발광 본 화이트 `#E8E4DA` · 제단 골드 `#C9A24B` · 콜드 할로 `#3A4A66`
- 주의: 블랙레터는 획 분절이 많아 자형 오류율이 라틴 산스보다 높다 — 렌더 카피는 **짧은 단어(3~8자)로 한정하고 대형 사이즈**로 배치, 남는 밀도는 장식 테두리에 넘긴다(장식은 잘 뽑힌다). 한글은 블랙레터 직역이 불가하니 **붓글씨·각진 궁서체 어휘로 번역** — `sharp angular Korean brush calligraphy, gungseo strokes cut like a blade`. 한글도 3~5자 대형 한정. 발광·순흑 대비가 이 패턴의 생명줄. `AR 2:3`
- 완성 예:
  ```
  Scene: the single word "AEON" standing at the center of a pure black altar, rendered as sharp digital blackletter that glows from within like stained glass lit from behind, a symmetrical engraved border of heraldic crests and occult sigils folding around it left and right.
  Camera: straight-on frontal view, letters centered on the vertical axis, the ornamental frame filling the outer edges.
  Lighting: soft inner glow radiating from the letterforms outward, the black field absorbing all spill so the glyphs float unsupported, a faint cold rim tracing the blade-tipped serifs.
  Color grading: pure black field #040406, glowing bone white letters #E8E4DA, heraldic gold #C9A24B in the border filigree, a cold blue halo #3A4A66 bleeding off the edges.
  Texture/Medium: crisp vector-sharp strokes with blade-like extended serifs, fine engraved filigree in the border, a perfectly smooth matte black ground.
  Text-in-image: the blackletter word appears once, large and centered. All text appears once, perfectly legible — no duplicate text, no extra words, no invented glyphs, no watermark. AR 2:3
  ```
