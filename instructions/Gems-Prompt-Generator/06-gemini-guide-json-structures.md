## Gemini 특화 가이드

### Gemini Image (이미지 생성)

**모델 선택:**

| 모델 | 프롬프트 스타일 | 속도 | 추천 |
|------|---------------|------|------|
| NB Pro (Gemini Image) | 태그 나열형 | 15-20초 | 고품질 |
| NB2 (Gemini 3.1 Flash Image) | 서술형(narrative) | 4-6초 | 빠른 생성, CJK 텍스트 |

**NB Pro — 프롬프트 구조:**

| 순서 | 요소 | 설명 |
|------|------|------|
| 1 | 주제 설명 | 주요 피사체 명확히 |
| 2 | 스타일 지정 | 사진, 그림, 3D |
| 3 | 분위기/조명 | 색조, 조명, 분위기 |
| 4 | 구도 | 클로즈업, 와이드 샷 |

**NB2 — 5요소 서술형:**
Subject(피사체) + Action(동작) + Environment(환경) + Mood(분위기) + Camera(촬영)

**시그널 강화 예시:**

| 강도 | 예시 |
|------|------|
| 약함 | "A Cat" |
| 강함 | "Black, fluffy cat sitting on a yellow sofa, looking at the camera, soft natural lighting" |

**비율:** 1:1(기본) | 16:9(와이드) | 9:16(세로) | 4:3(PPT) | NB2: 14종 지원

### Veo 3.1 (동영상 생성)

**필수 요소:** 주제 + 동작 + 스타일

**오디오 프롬프트:**

| 유형 | 표기 방법 |
|------|----------|
| 대화 | '따옴표' 사용 |
| 음향효과 | 명시적 설명 |
| 배경음 | 환경 설명 |

**부정적 프롬프트:** 단순 나열 (wall, frame)

### 다중 이미지 순차 생성

> **원칙**: 각 이미지를 한 장씩 순차적으로 생성하고, 각각 다양한 디자인 적용(일관성은 유지)

**JSON 배치 템플릿:**

```json
{
  "generation_instruction": "이미지를 한 장씩 순차적으로 생성하세요. [1/N] → [2/N] → ... → [N/N]. 각 이미지마다 다양한 디자인을 적용하세요.",
  "shared_style": { "art_style": "...", "color_palette": "...", "text_language": "Korean", "aspect_ratio": "16:9" },
  "images": [
    { "sequence": 1, "prompt": "완전한 이미지 생성 프롬프트" },
    { "sequence": 2, "prompt": "완전한 이미지 생성 프롬프트" }
  ]
}
```

**순서 표기:** [1/4], [2/4], ...

---

## 이미지 프롬프트 JSON 구조 (기본 형식)

> 🔀 **먼저 타겟 이미지 모델을 판정하세요 (대원칙 §2)**. 이 Gem의 기본 타겟은 **Gemini Image** 계열이고, 아래 JSON이 그 경로입니다. 사용자가 **gpt-image-2 API·Codex `$imagegen`·배치(jsonl)** 로 쓸 프롬프트를 요청하면 그쪽은 **공냥 킷 포맷**(포맷 A 라벨 6섹션 / 포맷 B 화보 콤마형 + 끝 `AR x:y` 토큰)이 정본입니다. ⚠️ **킷 규격은 gpt-image-2 전용** — Gemini Image·Seedream에 강제하지 마세요(대원칙 §2의 명시 금지 사항).

**단일 이미지:**
```json
{
  "target_model": "Gemini Image",
  "expert_anchor": "실존 전문가 시각 언어 앵커 - Director signature / Lens character 또는 해당 포토그래퍼·아트디렉터 스타일을 결과 서술로 (대원칙 §1). 빈 수사 ❌ — 지명 후 lighting·composition·style 에 구체 어휘로 환원",
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

**다중 이미지:**

```json
{
  "generation_instruction": "이미지를 한 장씩 순차적으로 생성하세요. [1/N] → [2/N] → ... → [N/N]. 각 이미지마다 다양한 디자인을 적용하세요.",
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

**유연한 자연어 부분:**
- `details` 필드: 복잡한 설명, 스토리, 감정 표현
- `prompt` 필드: 각 이미지별 완전한 생성 프롬프트

---

## 동영상 프롬프트 JSON 구조

> **모든 동영상에 스토리보드 형식 적용** (단일 클립도 scenes 배열 사용)

```json
{
  "model": "Veo 3.1",
  "cinematographer": "실존 시네마토그래퍼/디렉터 1인 지명 - 스토리보드 단계부터 그 사람의 촬영·조명 어휘로 장면 기술 (대원칙 §1)",
  "shared_style": {
    "visual_style": "스타일 (cinematic, animation, realistic 등)",
    "color_grade": "색보정 톤",
    "text_language": "Korean",
    "aspect_ratio": "16:9"
  },
  "scenes": [
    {
      "sequence": 1,
      "duration": "8s",
      "description": "장면 + 캐릭터 행동 + 조명/빛",
      "camera": "카메라 위치 + 모션 (dolly, pan, tracking 등)",
      "audio": "대사(따옴표) + 효과음 + 환경음"
    }
  ],
  "negative": "제외 요소 (단순 나열: wall, frame 등)",
  "details": "품질 지시사항"
}
```

**필수 요소 (Veo 3.1 공식 가이드 기준):**
- **Subject**: 피사체 (사람, 동물, 사물, 풍경)
- **Action**: 동작 (걷기, 달리기, 머리 돌리기)
- **Style**: 영상 스타일 (SF, 필름누아르, 만화)
- **Camera**: 위치 + 모션 (aerial, eye-level, dolly, POV)
- **Audio**: 대사(따옴표로 표기), SFX(효과음 명시), 환경음

**다중 장면 예시:**
```json
{
  "scenes": [
    { "sequence": 1, "duration": "3s", "description": "...", "camera": "...", "audio": "..." },
    { "sequence": 2, "duration": "5초", "description": "두 번째 장면 설명", "audio": "..." }
  ]
}
```

**Veo 오디오 표기법:**

| 유형 | 표기 방법 | 예시 |
|------|----------|------|
| 대화 | '따옴표' 사용 | 'Hello, how are you?' |
| 음향효과 | 명시적 설명 | door creaking, footsteps |
| 배경음 | 환경 설명 | ambient city noise |
