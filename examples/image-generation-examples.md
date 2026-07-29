# 이미지 생성 프롬프트 예시

이 문서는 Nano Banana (Gemini 2.5 Flash Image)와 Veo 3.1에 최적화된 프롬프트 예시를 제공합니다.

> **Credits**: 공냥이 (@specal1849) 자료 기반

---

## 핵심 개념

### 신뢰도 (Faithful)
생성된 이미지가 프롬프트를 얼마나 충실히 따르는지

### 시그널 (Signal)
모델이 확신을 가질 수 있게 하는 구체적인 정보량

```
약한 시그널: "A cat"
강한 시그널: "Black fluffy cat sitting on a yellow sofa, looking at camera, soft window light"
```

---

## 1. 제품 사진

### 기본 템플릿

```
Clean product photography, [제품명] centered on white seamless background,
soft box lighting from above, professional studio setup,
commercial quality, sharp focus, 4K resolution
```

### 예시: 화장품

```
Clean product photography, luxury skincare serum bottle centered,
white seamless background, soft gradient lighting,
glass reflection, minimalist composition,
professional cosmetic advertising style
```

### 예시: 전자기기

```
Product photography, wireless earbuds case floating,
dark gradient background, dramatic rim lighting,
tech product style, sleek and modern,
Apple-inspired minimalism
```

---

## 2. 푸드 포토그래피

### 기본 템플릿

```
Editorial food photography, [음식명],
[배경 스타일] background, [조명 스타일] lighting,
fresh ingredients visible, professional food styling,
overhead/45-degree angle shot
```

### 예시: 디저트

```
Editorial food photography, chocolate lava cake,
dark moody wooden table, dramatic side lighting,
melting chocolate flow, fresh raspberries garnish,
shallow depth of field, Michelin star presentation
```

### 예시: 한식

```
Editorial food photography, Korean bibimbap in stone bowl,
traditional wooden table setting, warm natural light,
steam rising, colorful vegetable toppings arranged,
chopsticks beside, authentic Korean restaurant style
```

---

## 3. 3D 캐릭터

### 기본 템플릿

```
3D stylized character, [캐릭터 설명],
[스타일 레퍼런스] style, expressive features,
soft subsurface scattering, clean background,
full body/portrait shot
```

### 예시: 귀여운 동물

```
3D stylized character, cute fluffy hamster chef,
Pixar animation style, wearing tiny white apron,
holding miniature whisk, warm smile,
soft studio lighting, pastel background
```

### 예시: 게임 캐릭터

```
3D stylized character, young wizard apprentice,
Genshin Impact art style, flowing blue robes,
glowing magic staff, determined expression,
fantasy forest background, magical particles
```

---

## 4. 인포그래픽 (Markdown 형식)

### 수직 레이아웃 템플릿

```markdown
Create high-quality vertical infographic

**Header (Top):**
- **Text (Big Bold):** "[메인 제목]"
- **Subtitle:** "[부제목]"

**Section 1: [섹션 제목]**
- **Icon:** [관련 아이콘]
- **Text:** "[핵심 내용]"

**Section 2: [섹션 제목]**
- **Icon:** [관련 아이콘]
- **Text:** "[핵심 내용]"

**Section 3: [섹션 제목]**
- **Icon:** [관련 아이콘]
- **Text:** "[핵심 내용]"

**Footer:**
- **Text:** "[출처/저작권]"

**Style Parameters:**
- Color scheme: [컬러 팔레트]
- Font style: modern, clean, readable
- Layout: balanced, professional
- Icons: simple line art style
```

### 예시: 통계 인포그래픽

```markdown
Create high-quality vertical infographic

**Header:**
- **Text (Big Bold):** "2025 AI Trends"
- **Subtitle:** "Key Statistics You Need to Know"

**Section 1: Market Growth**
- **Icon:** upward trending graph
- **Text:** "$500B market size by 2025"
- **Visual:** bar chart showing growth

**Section 2: Adoption Rate**
- **Icon:** building/enterprise icon
- **Text:** "78% of enterprises using AI"

**Section 3: Job Impact**
- **Icon:** person/briefcase icon
- **Text:** "97M new AI-related jobs"

**Style Parameters:**
- Color scheme: deep blue, electric purple, mint green
- Modern tech aesthetic
- Clean data visualization
- Dark background with light text
```

---

## 5. JSON 형식 (배치 생성/일관성)

### 제품 시리즈 템플릿

```json
{
  "style": {
    "type": "product_photography",
    "background": "white_seamless",
    "lighting": "soft_box",
    "quality": "commercial_4k"
  },
  "camera": {
    "angle": "eye_level",
    "lens": "85mm",
    "depth_of_field": "shallow"
  },
  "products": [
    {"name": "Product A", "color": "rose_gold"},
    {"name": "Product B", "color": "silver"},
    {"name": "Product C", "color": "space_gray"}
  ]
}
```

### A/B 테스팅 템플릿

```json
{
  "base": {
    "subject": "coffee cup on wooden table",
    "style": "lifestyle_photography"
  },
  "variations": [
    {"lighting": "morning_sunlight", "mood": "warm_cozy"},
    {"lighting": "dramatic_shadow", "mood": "bold_sophisticated"},
    {"lighting": "soft_overcast", "mood": "minimal_clean"}
  ]
}
```

---

## 6. Veo 3.1 동영상 생성

### 기본 템플릿

```
[주제]가 [동작]하는 장면,
[스타일] 스타일, [카메라 모션],
[조명/분위기], [추가 디테일]
```

### 예시: 제품 홍보 영상

```
Sleek smartphone rotating slowly on reflective surface,
cinematic commercial style, smooth 360-degree orbit shot,
dramatic studio lighting with blue accent,
premium tech product aesthetic, 4K quality
```

### 예시: 자연 다큐멘터리

```
Majestic eagle soaring over mountain peaks,
National Geographic documentary style, aerial tracking shot,
golden hour lighting, misty atmosphere,
slow motion wing movement, epic orchestral mood
```

### 오디오 포함 예시

```
Busy coffee shop morning scene,
'좋은 아침이에요'라고 바리스타가 인사합니다,
에스프레소 머신의 증기 소리,
잔잔한 재즈 음악이 배경에 흐릅니다,
warm ambient lighting, handheld documentary style
```

---

## 7. Nano Banana → Veo 연동

### 패턴 1: 시작 프레임

```
1. Nano Banana 프롬프트:
   "Professional headshot, young woman smiling, neutral gray background, studio lighting"

2. Veo 프롬프트:
   "Starting from the portrait, she turns her head slowly and breaks into a genuine laugh,
   camera slightly dollies in, warm natural lighting gradually increases"
```

### 패턴 2: 첫/마지막 프레임 보간

```
1. 첫 프레임 (Nano Banana):
   "Closed flower bud, morning dew drops, soft blue hour lighting"

2. 마지막 프레임 (Nano Banana):
   "Fully bloomed flower, bright daylight, warm golden tones"

3. Veo가 자동 보간:
   꽃이 피어나는 타임랩스 영상 생성
```

---

## 8. 키워드 치트시트

### 분위기 (Mood)

| 원하는 느낌 | 키워드 |
|------------|--------|
| 따뜻한 | warm, cozy, inviting |
| 차가운 | cold, icy, stark |
| 신비로운 | mystical, ethereal, magical |
| 에너지틱 | dynamic, vibrant, energetic |
| 고급스러운 | luxurious, premium, elegant |
| 귀여운 | cute, kawaii, adorable |

### 조명 (Lighting)

| 효과 | 키워드 |
|------|--------|
| 자연광 | natural light, window light, daylight |
| 황금 시간 | golden hour, magic hour, sunset glow |
| 역광 | backlit, silhouette, rim light |
| 드라마틱 | dramatic lighting, chiaroscuro, Rembrandt |
| 네온 | neon lights, cyberpunk, RGB |
| 스튜디오 | studio lighting, soft box, beauty dish |

### 카메라 (Camera)

| 효과 | 키워드 |
|------|--------|
| 클로즈업 | close-up, macro, extreme detail |
| 와이드 | wide angle, 24mm, fisheye |
| 보케 | shallow depth of field, bokeh, f/1.4 |
| 항공 | aerial view, drone shot, bird's eye |
| 시네마틱 | cinematic, anamorphic, 2.39:1 |
| 필름 | film grain, 35mm, analog |

---

## 9. gpt-image-2 — 공냥 프롬프트 킷 연동 (외부 킷 통합)

gpt-image-2(Codex `$imagegen`) 계열은 문서를 복제하지 않고 **원본 킷을 그대로 연동**하는 것을 권장합니다. 원본이 활발히 갱신되므로(카테고리 플레이북 C1~C12, 홍보물 그래픽 문법 P1~P8, 룩 프리셋, 타이포/글자배치, jsonl 스키마) 사본은 금방 뒤처집니다.

- 원본: [kimsh-1/gongnyang-prompt-kit](https://github.com/kimsh-1/gongnyang-prompt-kit) (MIT, 공냥이 @specal1849) · 대량 스폰: [kimsh-1/codex-fleet](https://github.com/kimsh-1/codex-fleet) (MIT)

### 설치 (자동 최신 유지 패턴 — 실운영 검증)

```bash
# clone 1회 + Claude Code 스킬 디렉토리에 symlink → 이후 git pull 만으로 전 세션 최신
git clone https://github.com/kimsh-1/gongnyang-prompt-kit ~/vendor/gongnyang-prompt-kit
ln -s ~/vendor/gongnyang-prompt-kit/skills/image-prompt ~/.claude/skills/image-prompt
# 갱신: (clean 트리 확인 후) cd ~/vendor/gongnyang-prompt-kit && git pull --ff-only
```

### 운영 규칙 1개 + 강제 훅

킷의 철칙 "생성 후 글자 후처리 금지"(텍스트는 프롬프트로 이미지 안에서 렌더, 틀리면 재생성)는 규칙만으론 지켜지지 않아 훅으로 강제하는 것을 권장합니다 — 이 저장소의 [`examples/hooks/block-text-overlay.sh`](hooks/block-text-overlay.sh)는 원본 훅에 2가지를 더한 판입니다: ① 정당한 결정적 오버레이(기술 이미지의 기계적 라벨)는 `ALLOW_TEXT_OVERLAY=1` 명시 선언 시 통과 ② git 명령 오탐 가드. PreToolUse(Bash) 훅으로 등록하면 됩니다.

---

## 참고

- 전체 이미지 가이드: `skills/prompt-engineering-guide/references/full.md`
- Veo 상세 문서: `skills/prompt-engineering-guide/references/full.md` (Veo 섹션)
- Context Engineering: `skills/prompt-engineering-guide/references/full.md`
- gpt-image-2 프롬프트 컴파일: 위 §9 공냥 프롬프트 킷 (원본 연동)
