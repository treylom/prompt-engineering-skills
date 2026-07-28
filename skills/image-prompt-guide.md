---
name: image-prompt-guide
description: AI 이미지 생성 프롬프트 가이드. 공냥이(@specal1849)님의 자료를 기반으로 한 종합 이미지 프롬프트 작성법.
references:
  - prompt-engineering-guide
  - context-engineering-collection
version: 1.10.0
created: 2025-12-28
author: Claude Code (공냥이(@specal1849)님 자료 기반)
source_credits:
  - name: 공냥이(@specal1849)
    url_slides: https://docs.google.com/presentation/d/1rPQVnbu1INJyUAqCvMA7dkO2WzJpD4Q9q_UXq9RH2GU/edit
    url_notion: https://fascinated-alley-b43.notion.site/PRO-2b1861d1faaf80b8bf7ef4093827f59b
---

# AI 이미지 프롬프트 마스터 가이드

> **자료 출처**: 이 가이드는 공냥이(@specal1849)님의 "이미지 프롬프트 101" 슬라이드와 "PRO 이미지 프롬프트" Notion 문서를 기반으로 작성되었습니다.

---

## 0. Codex `/prompt` 적용 계약

Codex의 `prompt` 스킬이 이미지 목적을 감지하면 이 파일을 **직접 전체 로드**한 뒤 아래 계약을 우선 적용합니다.

- 플러그인 외부의 `image-prompt`·`gongnyang-photo` 스킬로 우회하지 않습니다.
- 최종 산출은 설명문이 아니라 JSON 이미지 프롬프트입니다.
- 최상위 필수 키는 `purpose`·`hero`·`context`·`evidence`·`constraints`입니다.
- `visual_re_description`에는 `Visual Re-description` 라벨과 함께 추상적 요구를 구체적인 색·재질·조명·구도·전후 대비로 번역한 결과를 적습니다.

```json
{
  "purpose": "이미지의 목적, 매체, 대상 독자",
  "hero": "주 피사체와 가장 먼저 읽혀야 할 시각 요소",
  "context": "사용 장면, 배경, 레이아웃, 정보 위계",
  "evidence": "주장을 눈으로 확인하게 만드는 구체적 시각 증거",
  "visual_re_description": "Visual Re-description: 추상어를 색·재질·조명·구도·대비로 재기술",
  "constraints": "비율, 필수 문구, 가독성, 보존·금지 요소"
}
```

출력 직전 여섯 항목을 검사하고, 누락 시 이 계약으로 한 번 재생성합니다.

---

## 1. 이미지 생성 프로세스 이해

### 1.1 기본 프로세스 흐름

```
사용자 입력 → LLM (프롬프트 해석/재구성) → Image Gen 모델 → 이미지 출력
```

**핵심 이해사항:**
- 이미지 생성 과정에서 **LLM과 Image Gen 두 모델**을 거침
- 프롬프트는 여러 모델들(LLM/VLM 등)을 거쳐 **재해석(Recaption)**됨
- ChatGPT의 경우: 사용자 입력 → GPT가 재구성 → gpt-image 모델에 전달

### 1.2 프롬프트 리라이트 (Recaption)

**ChatGPT 예시:**
```
사용자: "검은 아기고양이 그려줘"
      ↓ (LLM 재해석)
gpt-image에 전달: "A cute black kitten sitting upright, looking directly
at the viewer with large, curious yellow-green eyes..."
```

**Gemini Native Image Gen:**
- LLM: Gemini 2.0 Flash → Prompt → Image Gen: Imagen 3
- **중요**: "이미지 생성" 의도 시그널이 있어야 Imagen이 작동함

---

## 2. 핵심 개념

### 2.1 신뢰도 (Faithful)

**정의**: 생성된 이미지가 입력 프롬프트와 일치하는 정도

| 신뢰도 | 결과 |
|--------|------|
| 높음 | 프롬프트에 충실한 이미지 생성 |
| 낮음 | 모델이 멋대로 해석/재해석, **환각(Hallucination)** 발생 가능 |

**Tip**: Recaption이 적게 되면 신뢰도가 높아짐

### 2.2 시그널 (Signal)

**정의**: 오브젝트를 생성할 때 모델이 확신을 가질 수 있게 해주는 정보

**시그널 강도 스펙트럼:**
```
약함 ←――――――――――――――――――――――――――→ 강함
"A Cat"  →  "Black Cat"  →  "Black, fluffy cat sitting on a yellow sofa, looking at the camera"
```

| 시그널 강도 | 모델 행동 |
|-------------|----------|
| 약함 | 모델이 자유롭게 해석, 다양한 결과 |
| 강함 | 모델이 명확하게 이해, 일관된 결과 |

---

## 3. 프롬프트 형식별 특징

### 3.1 5가지 주요 형식

| 형식 | 특징 | 적합한 용도 |
|------|------|------------|
| **자연어** | 직관적, 자유로움 | 일반적인 이미지 생성, 연결된 느낌 |
| **Markdown** | 계층 구조, 구분 명확 | 구획이 나뉜 인포그래픽 |
| **JSON** | 파라미터화, 재현성 | 배치 생성, A/B 테스팅, 일관성 필요 시 |
| **XML** | 엄격한 구조, 명확한 구분 | 엔터프라이즈, 구획 인포그래픽 |
| **YAML** | 가독성, 설정 | 시스템 프롬프트, 설정 파일 |

### 3.2 형식별 결과 차이

**타임라인/인포그래픽 생성 시:**
- **자연어/JSON/YAML**: 연결된 느낌, 매끄러운 흐름
- **Markdown/XML**: 명백한 구분, 각 섹션이 확실하게 나뉨

**핵심 인사이트:**
> "구분된 섹션을 나눠서 만들 때는 **XML이나 마크다운**을 선호합니다."
> "인포그래픽 디자인의 경우 **계층구조 설계가 필수**고 이를 표현하는 가장 쉬운 방법이 **마크다운**"

### 3.3 JSON 프롬프트 예시 (권장 기본 형식)

> **권장**: 이미지 생성 시 JSON 구조를 기본으로 사용하고, 유연한 설명이 필요한 부분만 자연어로 작성합니다.

**기본 JSON 구조:**
```json
{
  "subject": "주제 - 핵심 피사체 설명",
  "style": "스타일 - 사진풍/일러스트/3D/수채화 등",
  "mood": "분위기 - 색조, 감정, 톤",
  "composition": "구도 - 앵글, 프레이밍",
  "lighting": "조명 - 자연광/스튜디오/골든아워 등",
  "details": "세부사항 - 추가 디테일 (자연어로 유연하게)",
  "text_language": "Korean",
  "aspect_ratio": "16:9"
}
```

**상세 예시:**
```json
{
  "subject": "premium minimalist coffee machine",
  "materials": ["brushed steel"],
  "features": ["geometric lines", "curved spout", "illuminated touch control panel"],
  "environment": {
    "surface": "white marble countertop"
  },
  "presentation": "floating",
  "technical": {
    "lighting": "studio lighting from top-left",
    "quality": "8K"
  },
  "style": "commercial product photography"
}
```

**JSON의 장점:**
- 키-값 구조로 파라미터화
- 자동화에 최적
- 스키마 검증으로 **재현성 강화**
- 배치 생성과 A/B 파라미터 튜닝에 유리

**유연한 자연어 부분:**
- `details` 필드: 복잡한 설명, 스토리, 감정 표현에 자연어 사용
- `prompt` 필드: 각 이미지별 완전한 생성 프롬프트

### 3.4 다중 이미지 JSON 구조

> **필수**: `generation_instruction` 필드로 순차 생성 지시 포함

```json
{
  "generation_instruction": "Generate ONLY ONE image per call. Do NOT combine multiple images into one frame. Call the image generator separately for each image: [1/N] → generate single image → [2/N] → generate single image → ...",
  "shared_style": {
    "art_style": "공통 스타일",
    "color_palette": "공통 색상",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "images": [
    { "sequence": 1, "prompt": "완전한 이미지 생성 프롬프트" },
    { "sequence": 2, "prompt": "완전한 이미지 생성 프롬프트" }
  ]
}
```

**다중 이미지 생성 규칙:**
- `generation_instruction`: 최상단에 순차 생성 지시 포함 (필수)
- `shared_style`: 모든 이미지에 적용될 공통 스타일
- `images[].prompt`: 각 이미지별 완전한 생성 프롬프트 (영어 권장)
- 순서 표기: [1/4], [2/4], ... 형식으로 진행상황 표시

> 📸 **Gemini 다중 이미지 생성 시 추가 안내**: gemini에서 여러 장의 이미지를 생성할 경우, **'한 장씩 순차적으로 생성, 반드시 끝까지 다 생성해주세요'**도 함께 입력해주세요

### 3.5 Markdown 프롬프트 예시

```markdown
Create high-quality, vertical layout infographic

**Text Instructions:**
- clean, isometric 3D
- glowing robotic hand taking computer mouse from human

**Header (Top):**
- **Text (Big Bold):** "이제 야근은 AI가 합니다"

**Section 1 (Top):**
- **Visual:** airline ticket and calendar being organized
- **Text:** "1. OpenAI 오퍼레이터"
- **Sub-text:** "예약부터 결제까지"

**Section 2 (Middle):**
- **Visual:** browser window (Chrome style) with blue shopping cart
- **Text:** "2. Google 자비스"
- **Sub-text:** "브라우저 속 비서"

**Style Parameters:**
- Soft blue, purple, and mint pastel gradients
- Professional, futuristic, clean, readable
```

---

## 4. 일상적 Tips

### 4.1 키워드 반복으로 시그널 강화

**원리**: 같은 키워드를 의도적으로 반복하면 시그널이 강해짐

**예시:**
```
❌ "A beautiful sunset"
✅ "A beautiful sunset, golden sunset colors, sunset glow on clouds, warm sunset atmosphere"
```

**주의사항:**
- 프롬프트가 지저분해질 수 있음
- 모든 모델에서 효과가 있는 것은 아님
- **직접 실험하여 해당 모델에 맞는 키워드 확인 필요**

### 4.2 띄어쓰기로 토큰 구분

**문제**: 한글의 동음이의어
- "눈을" → 눈(eye)? 눈(snow)?

**해결 방법:**
```
❌ "큰 눈동자를 가진 소녀"
✅ "큰 눈 동자를 가진 소녀" (띄어쓰기로 구분)
✅ "큰 눈(eye)을 가진 소녀" (영어 병기)
```

### 4.3 영어 키워드 혼합 사용

**원리**: 이미지 생성 모델은 영어 데이터로 더 많이 학습됨

**예시:**
```
"빛나는 별이 가득한 밤하늘 배경의 fairy tale 스타일 그림"
"dreamy, ethereal 느낌의 풍경화"
```

**코드 스위칭 효과:**
```
❌ "너는 전문 카피라이터야" (저성능)
✅ "You are a professional Korean copywriter" (고성능)
```

### 4.4 짧은 vs 긴 프롬프트

| 프롬프트 길이 | 특징 | 용도 |
|--------------|------|------|
| **짧음** | 모델에게 자유도 부여, 창의적 결과 | 아이디어 탐색 단계 |
| **김** | 더 구체적, 제어된 결과 | 구체적인 결과물 필요 시 |

### 4.5 네거티브 프롬프트

**형태**: "~하지 마" 지시

**예시:**
```
"손가락 6개 그리지 마"
"텍스트 넣지 마"
```

**주의:**
- 효과가 있을 수도, 없을 수도 있음 (모델마다 다름)
- **네거티브 프롬프트에 의존하기보다 원하는 것을 명확히 설명하는 게 더 효과적**

---

## 5. 고급 Tips

### 5.1 구조화된 프롬프트

**구조 예시:**
```
[주제]: 고양이
[스타일]: 수채화
[배경]: 꽃밭
[분위기]: 몽환적, 따뜻한
[세부사항]: 큰 눈, 하얀 털
```

**장점:**
- 명확한 의도 전달
- 수정이 쉬움
- 재사용 가능

### 5.2 스타일 레퍼런스

**유명 화가/아티스트/스타일 언급:**
```
"in the style of Studio Ghibli"
"Van Gogh style painting"
"watercolor illustration"
```

**주의**: 저작권 이슈 가능, 일부 플랫폼에서 특정 아티스트 이름 차단 (⚠️ ChatGPT는 생존 아티스트명 하드 블록)

### 5.3 카메라/렌즈 용어 활용

| 카테고리 | 키워드 예시 |
|----------|------------|
| **카메라 앵글** | bird's eye view, low angle, close-up, wide shot |
| **렌즈** | 85mm portrait lens, fisheye lens, macro lens |
| **조명** | golden hour, studio lighting, backlighting |
| **사진 스타일** | film photography, polaroid, DSLR quality |

### 5.4 아스펙트 비율

| 비율 | 용도 |
|------|------|
| **1:1** | 정사각형, 인스타그램 |
| **16:9** | 와이드, 유튜브 썸네일, 배너 |
| **9:16** | 세로형, 스토리, 릴스 |
| **4:3** | 전통적 사진 비율 |
| **3:2** | 35mm 필름 비율 |

### 5.5 시드(Seed) 값 활용

**용도:**
- 동일한 프롬프트로 재현 가능한 결과물 생성
- 캐릭터 일관성 유지
- 시리즈물 제작
- A/B 테스트

---

## 6. 시네마틱 조명 & 색상 테크닉

### 6.1 조명 종류

| 조명 | 설명 | 프롬프트 |
|------|------|----------|
| **Rembrandt Lighting** | 얼굴 한쪽에 삼각형 빛 패치 | `Rembrandt lighting, dramatic shadow, triangular light patch` |
| **Chiaroscuro** | 극단적 명암 대비 | `Chiaroscuro lighting, extreme contrast, baroque style` |
| **Golden Hour** | 황금빛 일출/일몰 조명 | `Golden hour lighting, warm orange-yellow tones` |
| **Blue Hour** | 해 진 직후 파란빛 | `Blue hour lighting, cool blue tones, twilight atmosphere` |
| **Noir Lighting** | 필름 누아르 스타일 | `Film noir lighting, high contrast, harsh shadows` |
| **Neon Lighting** | 사이버펑크 네온 | `Neon lighting, cyberpunk, pink and blue glow` |

### 6.2 색상 기법

| 기법 | 설명 | 프롬프트 |
|------|------|----------|
| **보색 대비** | 오렌지-블루 등 | `Complementary color scheme, orange and blue contrast` |
| **유사색 조화** | 비슷한 톤 | `Analogous color harmony, warm earth tones` |
| **모노크로매틱** | 단색 계열 | `Monochromatic blue palette, various shades` |

---

## 7. 스타일별 프롬프트 템플릿

### 7.1 제품 사진

```
Clean product photography, [제품 이름] centered,
white seamless background, soft box lighting,
professional studio setup, commercial quality,
sharp focus, no reflections
```

### 7.2 푸드 포토그래피

```
Editorial food photography, [음식 이름],
dark moody background, dramatic side lighting,
fresh ingredients scattered around,
professional food styling, appetizing presentation
```

### 7.3 패션 포토그래피

```
High fashion editorial photography, Vogue magazine style,
[모델 설명], avant-garde [의상/액세서리],
dramatic studio lighting, full body shot,
professional fashion photography
```

### 7.4 3D 스타일라이즈드 캐릭터

```
3D stylized character, [캐릭터 설명],
Pixar/Disney style, expressive features,
soft subsurface scattering, character design
```

### 7.5 아이소메트릭 디자인

```
Isometric room design, [공간 설명],
30-degree angle, detailed interior,
cute miniature style, vibrant colors
```

### 7.6 스티커 디자인

```
Die-cut sticker design, [주제/캐릭터],
white border outline, vibrant colors,
kawaii cute style, vector illustration
```

### 7.7 만화/코믹 스타일 (Manga/Comic)

> **출처**: @specal1849의 나노바나나2 만화 제작 프롬프트

#### 3단계 프롬프트 구조

```
[장면 설명] + [스타일 정의] + [기술적 사양]
```

| 단계 | 설명 | 예시 |
|------|------|------|
| **장면 설명** | 원하는 이미지의 구체적 묘사 | "A samurai cat standing on a rooftop" |
| **스타일 정의** | 아트 스타일, 분위기 | "Style: Dark Fantasy, dramatic lighting" |
| **기술적 사양** | 해상도, 비율, 렌더링 | "hyperrealistic, cinematic, 16:9" |

#### 만화 제작 태그 (Panel Layout Tags)

```
monochrome           → 흑백 톤
manga style          → 일본 만화 스타일
screentone           → 스크린톤 효과
multiple panels      → 여러 패널 구성
speech bubble        → 말풍선 포함
comic panel          → 만화 칸
action lines         → 액션 효과선
clean linework       → 깔끔한 선화
expressive characters → 풍부한 표정
```

#### 스타일 태그

```
Style: Dark Fantasy     → 어둡고 신비로운 판타지
Style: Cyberpunk        → 네온, 미래 도시, 사이버네틱
Style: Romance Fantasy  → 로맨틱하고 부드러운 판타지
Style: Anime           → 일본 애니메이션 스타일
Style: Watercolor      → 수채화 느낌
Style: Oil Painting    → 유화 스타일
```

#### 4컷 만화 프롬프트 예시

```
A 4-panel manga comic, monochrome style with screentone,
Panel 1: A cat waking up sleepily
Panel 2: Cat sees empty food bowl, shocked expression
Panel 3: Cat meowing loudly at owner
Panel 4: Happy cat eating, speech bubble "Finally!"
manga style, clean linework, expressive characters
```

#### 액션 장면 프롬프트 예시

```
Dynamic manga action scene, monochrome,
samurai cat slashing with katana,
action lines, dramatic angle,
multiple speed lines, intense expression
```

---

## 8. 인포그래픽 제작 가이드

### 8.1 Chain 프롬프팅 활용

**단계별 접근:**
1. **조사**: AI 뉴스나 콘텐츠 조사
2. **구조화**: Markdown으로 계층 구조 설계
3. **생성**: 이미지 생성 툴에 입력

### 8.2 인포그래픽 프롬프트 구조

```markdown
Create high-quality, vertical layout infographic

**Header (Top):**
- **Text (Big Bold):** "[제목]"

**Section (Middle - Divided into distinct sections vertically):**

**Section 1:**
- **Visual:** [시각적 요소 설명]
- **Text:** "[텍스트]"
- **Sub-text:** "[부제]"

**Section 2:**
- **Visual:** [시각적 요소 설명]
- **Text:** "[텍스트]"
- **Sub-text:** "[부제]"

**Style Parameters:**
- [색상 팔레트]
- [스타일 키워드]
- the Korean text spelled correctly as requested
```

### 8.3 편향성 제어

**문제점:**
- 한국어 텍스트를 잘못 처리
- 기본적으로 인포그래픽 형태로만 생성하려 함

**해결책:**
- 세부 프롬프트로 명확하게 지시
- "카드뉴스" 형태로 직접 명시
- 특정 부분을 길게 쓰도록 강제

---

## 9. 분위기/무드 키워드 치트시트

| 한국어 | 영어 키워드 |
|--------|-------------|
| 드라마틱 | dramatic, cinematic, moody |
| 평화로운 | peaceful, serene, calm, tranquil |
| 에너지틱 | energetic, dynamic, vibrant |
| 우울한 | melancholic, somber, gloomy |
| 신비로운 | mystical, ethereal, dreamlike |
| 레트로 | vintage, retro, nostalgic |
| 미래적 | futuristic, sci-fi, cyberpunk |
| 고급스러운 | luxurious, elegant, sophisticated |
| 귀여운 | cute, kawaii, adorable |
| 무서운 | creepy, eerie, unsettling |

---

## 10. 조명 키워드 치트시트

| 타입 | 영어 키워드 |
|------|-------------|
| 자연광 | natural light, daylight, sunlight |
| 황금시간 | golden hour, magic hour |
| 블루아워 | blue hour, twilight |
| 역광 | backlit, silhouette, rim light |
| 소프트 | soft light, diffused, gentle |
| 하드 | hard light, harsh shadows, dramatic |
| 네온 | neon lights, RGB lighting |
| 스튜디오 | studio lighting, professional |

---

## 11. 렌즈/카메라 키워드 치트시트

| 효과 | 영어 키워드 |
|------|-------------|
| 아웃포커스 | shallow depth of field, bokeh, f/1.4 |
| 와이드 | wide angle, 24mm, fisheye |
| 망원 | telephoto, 200mm, compressed |
| 매크로 | macro, close-up, extreme detail |
| 틸트시프트 | tilt-shift, miniature effect |
| 필름 | film grain, 35mm film, analog |

---

## 12. 구도 & 카메라 샷 테크닉

### 12.1 카메라 앵글

| 앵글 | 설명 | 프롬프트 |
|------|------|----------|
| Eye Level | 자연스러운 시점 | `Eye level shot, natural perspective` |
| Low Angle | 강력한 존재감 | `Low angle shot, dramatic, powerful` |
| High Angle | 취약한 느낌 | `High angle shot, diminishing effect` |
| Dutch Angle | 긴장감 | `Dutch angle, tilted, tension` |
| Bird's Eye | 직접 위에서 | `Bird's eye view, overhead, pattern` |
| Worm's Eye | 극단적 로우앵글 | `Worm's eye view, extreme low angle` |

### 12.2 프레이밍 기법

| 기법 | 설명 | 프롬프트 |
|------|------|----------|
| Rule of Thirds | 3분할 법칙 | `Rule of thirds composition, balanced` |
| Leading Lines | 유도선 | `Leading lines composition, depth` |
| Frame within Frame | 프레임 속 프레임 | `Frame within frame, layered depth` |
| Symmetry | 대칭 | `Symmetrical composition, mirror-like` |

### 12.3 샷 거리

| 샷 타입 | 설명 | 프롬프트 키워드 |
|---------|------|-----------------|
| Extreme Close-up | 얼굴 일부 | ECU, extreme detail shot |
| Close-up | 얼굴 전체 | close-up portrait |
| Medium Shot | 허리 위 | medium shot, waist up |
| Long Shot | 전신 | full body shot |
| Extreme Long Shot | 풍경 속 인물 | wide establishing shot |

---

## 13. 자주 하는 실수들

### 13.1 너무 모호한 프롬프트

```
❌ "예쁜 여자"
✅ "검은 긴 머리, 큰 눈, 하얀 드레스를 입은 20대 여성, 정면을 바라보는"
```

### 13.2 상충되는 지시

```
❌ "밝고 어두운 분위기"
✅ 하나의 명확한 분위기 선택
```

### 13.3 너무 많은 요소

- 프롬프트가 길어질수록 일부 요소가 무시될 수 있음
- **핵심 요소에 집중**

### 13.4 추상적 개념만 나열

```
❌ "행복한 느낌"
✅ "웃고 있는 아이의 클로즈업"
```

### 13.5 부정형 지시 과다

- "no watermark" 보다 **원하는 것을 직접 묘사**하는 게 효과적

---

## 14. 핵심 정리

### 14.1 기본 원칙 5가지

1. **명확하고 구체적으로 설명하기**
   - 추상적 표현 피하기
   - 시각적으로 묘사

2. **핵심 키워드 반복으로 시그널 강화**
   - 중요한 요소는 여러 번 언급

3. **영어 키워드 적절히 활용**
   - 한글 설명 + 핵심 영어 키워드 혼합

4. **구조화된 프롬프트 사용**
   - 목적에 맞는 형식 선택 (JSON/XML/Markdown)

5. **실험하고 반복하기!**
   - 완벽한 프롬프트는 없음
   - 모델마다 특성이 다름

### 14.2 형식 선택 가이드

| 상황 | 권장 형식 |
|------|----------|
| **기본 이미지 생성** | **JSON** (구조화된 속성 + 유연한 자연어 details) |
| 구분된 섹션/인포그래픽 | **XML** 또는 **Markdown** |
| 연결된 느낌/타임라인 | **JSON** 또는 **YAML** |
| 배치 생성/일관성 필요 | **JSON** |
| 간단한 단일 이미지 | **자연어** (짧은 설명 시) |

### 14.3 핵심 인사이트

> **"구조화 안되면 아무것도 못만든다"**
>
> **"시스템화하는게 훨씬 좋다"**
>
> - 공냥이(@specal1849)

---

## 15. 동영상 프롬프트 JSON 구조 (Veo/Kling 등)

> **핵심 원칙**: 이미지와 동일하게 JSON으로 구조를 잡고, 유연한 설명이 필요한 부분만 자연어로 작성합니다.

### 15.1 단일 동영상 구조

```json
{
  "subject": "주제 - 핵심 피사체/장면 설명",
  "action": "동작 - 움직임, 행동, 변화",
  "style": "스타일 - 시네마틱/다큐멘터리/애니메이션 등",
  "camera": "카메라 워크 - 패닝/줌인/트래킹샷 등",
  "audio": {
    "dialogue": "대화 (따옴표로 표기)",
    "sfx": "음향효과",
    "music": "배경음악/환경음"
  },
  "duration": "5초/10초/30초",
  "details": "세부사항 - 추가 디테일 (자연어로 유연하게)",
  "negative": "제외할 요소 (wall, frame 등)"
}
```

### 15.2 다중 장면 구조

```json
{
  "shared_style": {
    "visual_style": "공통 비주얼 스타일",
    "color_grade": "색보정 톤",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "scenes": [
    { "sequence": 1, "duration": "5초", "description": "첫 번째 장면 설명", "audio": "..." },
    { "sequence": 2, "duration": "5초", "description": "두 번째 장면 설명", "audio": "..." }
  ]
}
```

### 15.3 오디오 프롬프트 표기법

| 유형 | 표기 방법 | 예시 |
|------|----------|------|
| **대화** | '따옴표' 사용 | 'Hello, how are you?' |
| **음향효과** | 명시적 설명 | door creaking, footsteps on gravel |
| **배경음** | 환경 설명 | ambient city noise, gentle rain |

### 15.4 카메라 워크 키워드

| 카메라 워크 | 영어 키워드 |
|------------|------------|
| 패닝 | pan left, pan right, slow pan |
| 줌 | zoom in, zoom out, dolly zoom |
| 트래킹 | tracking shot, follow shot |
| 고정 | static shot, locked off |
| 드론 | aerial shot, drone sweep |
| 핸드헬드 | handheld, shaky cam |

### 15.5 동영상 전용 체크리스트

- [ ] 주제/피사체가 명확한가?
- [ ] 동작/움직임이 구체적으로 설명되었는가?
- [ ] 카메라 워크가 지정되었는가?
- [ ] 오디오 요소가 포함되었는가? (대화/효과음/배경음)
- [ ] 길이(duration)가 명시되었는가?
- [ ] 제외할 요소(negative)가 정리되었는가?
- [ ] 비영어 대사 시 영어 감정/말투 메타 지시가 함께 들어갔는가? (15.6 참조)

### 15.6 비영어 대사 자연스럽게 만들기 (Veo / Sora / Seedance / Kling 공통)

> **핵심 원칙**: 비영어 대사를 그대로만 넣으면 표정·억양이 어색해진다. 괄호 안에 **언어 표시 + 영어로 작성한 감정/말투 묘사**를 함께 적으면 자연스러워진다.
>
> 출처: [@itsyun_ai](https://www.threads.com/@itsyun_ai/post/DXyxUwXghcR) (Seedance 한국어 대사 검증, 2026-05-01). 시나리오 작법(stage direction) 컨벤션이라 동영상 모델 전반에 일반화 가능.

#### 패턴

```
Dialogue - {Character}: ({English emotion/manner descriptor} in {Target Language}{, additional nuance}) "{대사 — 모국어 그대로}"
```

- **언어 표시**: `in Korean`, `in Japanese`, `in Spanish` 등 (필수)
- **감정/말투 묘사**: 영어 형용사·부사 (Whispering, angrily, dripping with rage, gleefully …)
- **추가 nuance**: 상세 컨텍스트 (with intense focus, voice cracking, barely audible)

#### 예시

| 시나리오 | 프롬프트 |
|----------|---------|
| 한국어 / 진지한 속삭임 | `Dialogue - Man: (Whispering in Korean with intense focus) "알파... 작전 개시."` |
| 한국어 / 분노 | `Dialogue - Wife: (Speaking angrily in Korean, voice dripping with rage) "뭐해?!!!"` |
| 일본어 / 부드러움 | `Dialogue - Woman: (Speaking softly in Japanese with a gentle smile) "ありがとう。"` |
| 스페인어 / 흥분 | `Dialogue - Boy: (Shouting excitedly in Spanish) "¡Vamos!"` |
| 중국어 / 슬픔 | `Dialogue - Mother: (Speaking sorrowfully in Mandarin, voice cracking) "回家吧。"` |

#### 감정 키워드 사전 (영어로 작성 권장)

| 감정 | 영어 키워드 |
|------|------------|
| 속삭임 | Whispering, in a low voice, barely audible |
| 분노 | angrily, dripping with rage, seething, fuming |
| 슬픔 | sorrowfully, voice cracking, with a trembling voice |
| 진지함 | with intense focus, gravely, solemnly |
| 즐거움 | cheerfully, gleefully, with a bright smile |
| 놀람 | gasping, wide-eyed, in shock |
| 두려움 | trembling, voice shaking, in a hushed tone |
| 다정함 | warmly, tenderly, softly |

#### 적용 가능 모델

| 모델 | 검증 상태 | 비고 |
|------|----------|------|
| **Seedance** | ✅ 검증됨 | itsyun_ai (2026-05-01, 한국어) |
| **Veo 3.1** | ⚠️ 일반화 적용 | 네이티브 다국어 음성 지원, 동일 패턴 호환 예상 |
| **Sora 2** | ⚠️ 일반화 적용 | 대화 프롬프트 stage direction 컨벤션 학습 |
| **Kling 3.0** | ⚠️ 일반화 적용 | 영어 메타 지시 인식 |

> ⚠️ 표시는 패턴 자체가 모델 비종속(시나리오 작법 컨벤션)이라 **이론적으로 적용 가능**하다는 의미. 모델별 미세 차이(억양·감정 깊이·발음)는 실제 생성으로 확인 필요.

#### JSON 통합 예시 (15.1 단일 동영상 구조에 적용)

```json
{
  "subject": "중년 남성, 어두운 부엌에서 라면을 끓이는 장면",
  "action": "냄비를 들여다보며 가족이 깰까 조심스럽게 움직임",
  "style": "시네마틱, 따뜻한 톤",
  "camera": "slow dolly in, low angle",
  "audio": {
    "dialogue": "Dialogue - Man: (Whispering in Korean with guilt) \"오늘만이야...\"",
    "sfx": "boiling water, gas stove ignition",
    "music": "ambient, late-night soft piano"
  },
  "duration": "8초",
  "details": "배경 시계 02:00 AM",
  "negative": "bright light, multiple people"
}
```

#### 안티패턴

| ❌ 비효율 | ✅ 권장 |
|---------|---------|
| `"뭐해?!" (분노)` (한국어 메타) | `(Speaking angrily in Korean) "뭐해?!"` |
| `Korean dialogue: "알파... 작전 개시."` (메타 분리) | 괄호 한 묶음 + in Korean 명시 |
| `"안녕하세요" 라고 화내며 말한다` (서술문 혼합) | Dialogue 필드 + 괄호 메타로 분리 |
| 감정만 쓰고 언어 누락: `(angrily) "뭐해?!"` | 항상 `in {Language}` 명시 (모델이 영어로 발화하는 사고) |

---

## 16. 프롬프트 생성 체크리스트

**생성 전 확인:**
- [ ] 주제/피사체가 명확한가?
- [ ] 스타일/매체가 지정되었는가?
- [ ] 조명 조건이 설정되었는가?
- [ ] 색상 팔레트가 정의되었는가?
- [ ] 구도/카메라 앵글이 명시되었는가?
- [ ] 분위기/무드가 설정되었는가?

**형식 선택:**
- [ ] 목적에 맞는 프롬프트 형식인가? (JSON/XML/Markdown/자연어)
- [ ] 구조화가 필요한 경우 적절히 구조화되었는가?

**시그널 강화:**
- [ ] 핵심 키워드가 충분히 강조되었는가?
- [ ] 영어 키워드가 적절히 활용되었는가?
- [ ] 모호한 표현이 제거되었는가?

---

## 참조 자료

### 원본 자료 (공냥이 @specal1849)

- **이미지 프롬프트 101 슬라이드**: https://docs.google.com/presentation/d/1rPQVnbu1INJyUAqCvMA7dkO2WzJpD4Q9q_UXq9RH2GU/edit
- **PRO 이미지 프롬프트 Notion**: https://fascinated-alley-b43.notion.site/PRO-2b1861d1faaf80b8bf7ef4093827f59b
- **나노바나나pro 마스터하기**: https://www.threads.com/@specal1849/post/DRYW09dEtUi
- **이미지 프롬프트 심화이론 - JSON vs YAML**: https://www.threads.com/@specal1849/post/DRp8XdFE2VH

### Obsidian Vault 연결 노트

- `Threads/3-이미지-프롬프트-JSON-2025-01-11.md` - JSON/YAML/XML/Markdown 형식 비교
- `Threads/5-제미나이-나노바나나-활용-2025-01-11.md` - 나노바나나 활용법
- `Threads/1-프롬프트-심화이론-화용론-2025-01-11.md` - 프롬프트 이론 심화

---

## 17. 슬라이드 이미지 생성

프레젠테이션 슬라이드를 AI 이미지로 생성할 때의 가이드.

> **상세 가이드**: `slide-prompt-guide.md` 스킬 파일 참조

### 17.1 슬라이드 이미지 필수 규칙

| 규칙 | 설명 |
|------|------|
| **16:9 비율 필수** | 모든 슬라이드는 와이드스크린 비율 |
| **shared_style** | 전체 덱에 일관된 스타일 적용 (색상, 타이포, 배경) |
| **session_id** | 같은 세션 ID로 일관성 유지 |
| **폰트명 금지** | 시각적 외형으로 설명 ("둥근 산세리프", "굵은 기하학적") |
| **텍스트 최소화** | 슬라이드당 1 메시지 원칙 |
| **자체 설명** | 구두 설명 없이 이해 가능하게 |

### 17.2 슬라이드 전용 JSON 구조

```json
{
  "generation_instruction": "Generate slide images [1/N], [2/N] in sequence. ONLY ONE image per call.",
  "shared_style": {
    "art_style": "[전체 스타일]",
    "color_palette": "[색상 팔레트 - Hex 코드 포함]",
    "typography": "[시각적 폰트 설명]",
    "background": "[배경 텍스처/색상]",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "slides": [
    {
      "sequence": 1,
      "type": "cover",
      "headline": "[타이틀]",
      "prompt": "[완전한 이미지 프롬프트 - 배경, 레이아웃, 텍스트 배치, 분위기]"
    }
  ]
}
```

### 17.3 슬라이드 유형별 이미지 구성

| 유형 | 비주얼 비중 | 텍스트 비중 | 구성 요소 |
|------|-----------|-----------|----------|
| Cover | 80% | 20% | 강렬한 비주얼 + 큰 타이틀 |
| Context | 70% | 30% | 배경 일러스트 + 핵심 질문 |
| Content | 60% | 40% | 도표/아이콘 + 핵심 포인트 |
| Data | 50% | 50% | 차트/그래프 + 강조 숫자 |
| Closing | 75% | 25% | 기억될 이미지 + CTA |

### 17.4 STYLE_INSTRUCTIONS 블록

슬라이드 덱의 비주얼 일관성을 위한 스타일 정의 블록:

```markdown
<STYLE_INSTRUCTIONS>
Design Aesthetic: [2-3문장 전체 비주얼 방향]
Background: [색상 + 텍스처]
Typography: [시각적 외형 - 폰트명 사용 금지]
Color Palette: [Primary, Accent 1, Accent 2 - Hex 포함]
Visual Elements: [그래픽 요소 + 렌더링 가이드]
Style Rules: Do [가이드라인] / Don't [안티패턴]
</STYLE_INSTRUCTIONS>
```

> **27개 비주얼 스타일과 7개 내러티브 모드 상세**: `slide-prompt-guide.md` 참조

---

## Skill Metadata

**Created**: 2025-12-28
**Version**: 1.10.0
**Author**: Claude Code (공냥이(@specal1849)님 자료 기반)
**Last Updated**: 2026-05-02
**Changes v1.10.0** (2026-05-02):
- **[NEW] 비영어 대사 자연스럽게 만들기 섹션 추가** (15.6): 언어 표시 + 영어 감정/말투 메타 지시 패턴. Seedance·Veo·Sora·Kling 공통 적용
- **5개 시나리오 예시 추가**: 한/일/스페인/중국어 + 감정 키워드 사전(8 감정)
- **JSON 통합 예시 추가**: 15.1 단일 동영상 구조에 적용 (audio.dialogue 필드)
- **안티패턴 4건 추가**: 한국어 메타·메타 분리·서술문 혼합·언어 누락
- **체크리스트 항목 추가**: "비영어 대사 시 영어 감정/말투 메타 지시 포함"
- **출처**: [@itsyun_ai](https://www.threads.com/@itsyun_ai/post/DXyxUwXghcR) Threads 포스트 (Seedance 한국어 대사 검증, 2026-05-01)
**Changes v1.9.0**:
- **[NEW] NanoBanana2 (Gemini 3.1 Flash Image) 섹션 추가** (섹션 18): NB Pro vs NB2 비교, 서술형 프롬프트 전략, 5요소 프레임워크
- **NB2 CJK 텍스트 렌더링 팁 추가**: 한국어 텍스트 200-300자 제한
- **14종 종횡비 테이블 추가**: 극단 비율 포함
- **Web Search Grounding 활용법 추가**: Google Search 연동 이미지 생성
**Changes v1.8.0**:
- **[NEW] 슬라이드 이미지 생성 섹션 추가** (섹션 17): 16:9 필수, shared_style, session_id, STYLE_INSTRUCTIONS 블록
- **슬라이드 전용 JSON 구조 추가**: cover/context/content/data/closing 유형별 구성
- **slide-prompt-guide.md 참조 연결**: 27개 스타일, 7개 내러티브 모드
**Changes v1.7.2**:
- **[FIX] generation_instruction 명확화**: "ONLY ONE image per call", "Do NOT combine multiple images" 명시로 다중 이미지 합성 방지
**Changes v1.7.1**:
- **[FIX] generation_instruction 영어로 변환**: 나노바나나 프로 다중 이미지 순차 생성 문제 해결 - "ONE AT A TIME", "in sequence" 명시
**Changes v1.7.0**:
- **[NEW] 다중 이미지 JSON 구조 추가** (섹션 3.4): `generation_instruction` 필드로 순차 생성 지시 포함, `description`→`prompt` 변경
**Changes v1.6.0**:
- **[NEW] 만화/코믹 스타일 섹션 추가** (섹션 7.7): @specal1849 나노바나나2 만화 제작 가이드 통합
- **만화 제작 태그 추가**: monochrome, screentone, multiple panels, speech bubble, action lines 등
- **3단계 프롬프트 구조 추가**: [장면 설명] + [스타일 정의] + [기술적 사양]
- **스타일 태그 추가**: Dark Fantasy, Cyberpunk, Romance Fantasy, Anime, Watercolor, Oil Painting
- **4컷 만화/액션 장면 예시 프롬프트 추가**
**Changes v1.5.0**:
- **[MAJOR] 동영상 프롬프트 JSON 구조 추가** (섹션 15): Veo/Sora 등 동영상 생성 모델용 JSON 템플릿 추가
- **오디오 프롬프트 표기법 추가**: 대화/음향효과/배경음 표기 가이드
- **카메라 워크 키워드 추가**: 패닝, 줌, 트래킹, 드론샷 등
- **동영상 전용 체크리스트 추가**
**Changes v1.0.1**: DALL-E를 gpt-image 모델로 수정 (정확한 모델명 반영)
