---
name: gemini-3-1-prompt-strategies
description: Use when composing or optimizing prompts targeting Google Gemini models (Gemini 3 Pro/Flash, 3.1) — Google 공식 문서 + 실전 팁 기반 Gemini 프롬프트 전략 레퍼런스. /prompt 커맨드가 Gemini 타겟 감지 시 로드하는 참조 자료.
disable-model-invocation: true
---

# Gemini 프롬프트 전략 통합 가이드

> **Version**: 2.0.0 | **Created**: 2025-12-28 | **Updated**: 2026-03-08
> **Source**: Google AI 공식 문서 + @specal1849 Threads 꿀팁
> **Covers**: Gemini 3, Gemini Flash, Veo 3.1, Nano Banana (Pro), NanoBanana2 (Gemini 3.1 Flash Image), 동적뷰, 노트북LM, 믹스보드

---

## Part 1: Gemini 3 프롬프트 전략

> Gemini 3 모델은 고급 추론 및 요청 사항 처리를 위해 설계되었습니다. 직접적이고 구조화되어 있으며 작업과 제약 조건을 명확하게 정의하는 프롬프트에 가장 잘 반응합니다.

### 1.1 핵심 프롬프팅 원칙

#### 원칙 1: 정확하고 직접적으로 표현
- 목표를 명확하고 간결하게 설명
- 불필요하거나 지나치게 설득적인 표현 제거

```
❌ 피해야 할 표현:
"제발 잘 부탁드립니다, 정말 중요한 작업이니..."

✅ 권장하는 표현:
"다음 텍스트를 3문장으로 요약하세요."
```

#### 원칙 2: 일관된 구조 사용
명확한 구분자를 사용하여 프롬프트의 여러 부분을 구분합니다.

**XML 스타일 태그 예시:**
```xml
<context>
사용자 배경 정보
</context>

<task>
수행할 작업 설명
</task>
```

**마크다운 제목 예시:**
```markdown
# Identity
You are a senior solution architect.

# Constraints
- No external libraries allowed.
- Python 3.11+ syntax only.

# Output format
Return a single code block.
```

#### 원칙 3: 매개변수 정의
모호한 용어나 매개변수를 명시적으로 설명합니다.

```
❌ "간단하게 설명해주세요"
✅ "3문장 이내로, 기술 용어 없이 설명해주세요"
```

#### 원칙 4: 출력 장황도 제어
기본적으로 Gemini 3는 직접적이고 효율적인 답변을 제공합니다.
- **더 자세한 응답 필요시**: 명시적으로 요청
- **대화형 응답 필요시**: 시스템 안내에 명시

#### 원칙 5: 중요한 안내에 우선순위 지정
다음 항목을 시스템 안내 또는 프롬프트 **맨 처음**에 배치:
- 필수 행동 제약 조건
- 역할 정의 (페르소나)
- 출력 형식 요구사항

#### 원칙 6: 긴 컨텍스트의 구조
많은 양의 컨텍스트(문서, 코드)를 제공할 때:
1. 먼저 모든 컨텍스트를 제공
2. 프롬프트의 **맨 끝**에 구체적인 지침이나 질문 배치

#### 원칙 7: 앵커 컨텍스트
대량의 데이터 블록 후 명확한 전환 문구 사용:
```
"위의 정보를 바탕으로..."
"위 문서를 참고하여..."
```

### 1.2 구조화된 프롬프트 템플릿

#### XML 형식 템플릿
```xml
<role>
You are a helpful assistant.
</role>

<constraints>
1. Be objective.
2. Cite sources.
</constraints>

<context>
[Insert User Input Here - The model knows this is data, not instructions]
</context>

<task>
[Insert the specific user request here]
</task>
```

#### 마크다운 형식 템플릿
```markdown
# Identity
You are a senior solution architect.

# Constraints
- No external libraries allowed.
- Python 3.11+ syntax only.

# Output format
Return a single code block.
```

### 1.3 추론 및 계획 개선

Gemini 3의 고급 사고 기능을 활용하여 복잡한 작업의 답변 품질을 개선할 수 있습니다.

#### 명시적 계획 프롬프트
```
Before providing the final answer, please:
1. Parse the stated goal into distinct sub-tasks.
2. Check if the input information is complete.
3. Create a structured outline to achieve the goal.
```

#### 자체 비판 프롬프트
```
Before returning your final response, review your generated output against the user's original constraints.
1. Did I answer the user's *intent*, not just their literal words?
2. Is the tone authentic to the requested persona?
```

### 1.4 권장사항 통합 템플릿

#### 시스템 안내 (System Instruction)
```xml
<role>
You are Gemini 3, a specialized assistant for [Insert Domain, e.g., Data Science].
You are precise, analytical, and persistent.
</role>

<instructions>
1. **Plan**: Analyze the task and create a step-by-step plan.
2. **Execute**: Carry out the plan.
3. **Validate**: Review your output against the user's task.
4. **Format**: Present the final answer in the requested structure.
</instructions>

<constraints>
- Verbosity: [Specify Low/Medium/High]
- Tone: [Specify Formal/Casual/Technical]
</constraints>

<output_format>
Structure your response as follows:
1. **Executive Summary**: [Short overview]
2. **Detailed Response**: [The main content]
</output_format>
```

#### 사용자 프롬프트 (User Prompt)
```xml
<context>
[Insert relevant documents, code snippets, or background info here]
</context>

<task>
[Insert specific user request here]
</task>

<final_instruction>
Remember to think step-by-step before answering.
</final_instruction>
```

### 1.5 온도 설정 주의사항

> **중요**: Gemini 3 모델 사용 시 `temperature`를 기본값 **1.0으로 유지**하는 것이 좋습니다.

온도를 1.0 미만으로 설정하면 복잡한 수학적 또는 추론 작업에서:
- 루핑 발생 가능
- 성능 저하 발생 가능

---

## Part 2: Gemini Flash 전략

> Gemini 3 Flash 모델에 특화된 프롬프트 전략으로, 날짜 정확성, 지식 컷오프 인식, 그라운딩 성능 개선을 다룹니다.

### 2.1 핵심 전략 3가지

#### 전략 1: 현재 날짜 정확성

모델이 2025년의 현재 날짜에 주의하도록 개발자 지침에 다음 절을 추가합니다:

```
For time-sensitive user queries that require up-to-date information, you MUST follow the provided current time (date and year) when formulating search queries in tool calls. Remember it is 2025 this year.
```

**적용 상황:**
- 최신 뉴스 검색
- 시간에 민감한 정보 요청
- 도구 호출 시 검색 쿼리 생성

#### 전략 2: 지식 컷오프 정확성

모델이 지식 컷오프를 인식하도록 개발자 지침에 다음 절을 추가합니다:

```
Your knowledge cutoff date is January 2025.
```

**효과:**
- 모델이 자신의 지식 한계를 인식
- 컷오프 이후 정보에 대해 적절히 안내
- 환각(hallucination) 감소

#### 전략 3: 그라운딩 성능 개선

제공된 컨텍스트에서 대답을 그라운딩하는 모델의 능력을 개선하려면 다음 조항을 추가하세요:

```
You are a strictly grounded assistant limited to the information provided in the User Context.

In your answers, rely **only** on the facts that are directly mentioned in that context. You must **not** access or utilize your own knowledge or common sense to answer.

Do not assume or infer from the provided facts; simply report them exactly as they appear.

Your answer must be factual and fully truthful to the provided text, leaving absolutely no room for speculation or interpretation.

Treat the provided context as the absolute limit of truth; any facts or details that are not directly mentioned in the context must be considered **completely untruthful** and **completely unsupported**.

If the exact answer is not explicitly written in the context, you must state that the information is not available.
```

### 2.2 실용적 적용 예시

#### RAG 시스템에서의 활용

```xml
<system_instruction>
Your knowledge cutoff date is January 2025.

For time-sensitive user queries that require up-to-date information, you MUST follow the provided current time (date and year) when formulating search queries in tool calls.

You are a strictly grounded assistant limited to the information provided in the User Context.
</system_instruction>

<user_context>
[검색된 문서 내용]
</user_context>

<user_query>
[사용자 질문]
</user_query>
```

#### 고객 서비스 봇에서의 활용

```xml
<system_instruction>
현재 날짜: 2025년 12월 27일
지식 컷오프: 2025년 1월

고객 서비스 담당자로서, 제공된 FAQ 문서에 있는 정보만을 기반으로 답변하세요.
문서에 없는 정보는 "해당 정보를 확인할 수 없습니다"라고 안내하세요.
</system_instruction>
```

### 2.3 그라운딩 강화 체크리스트

- [ ] 시스템 안내에 지식 컷오프 날짜 명시
- [ ] 현재 날짜 정보 포함 (시간 민감 작업 시)
- [ ] 컨텍스트 전용 그라운딩 지침 추가
- [ ] "정보 없음" 시 대응 방법 명시
- [ ] 추론/가정 금지 지침 포함

### 2.4 Before & After 비교

#### Before (일반 프롬프트)
```
당신은 도움이 되는 어시스턴트입니다.
사용자의 질문에 답변해주세요.
```

**문제점:**
- 모델이 자체 지식 사용
- 날짜 혼동 가능
- 환각 발생 위험

#### After (Flash 전략 적용)
```xml
<system>
Your knowledge cutoff date is January 2025.
Current date: 2025-12-27.

You are a strictly grounded assistant. Only use information from the provided context. If information is not available, say so.
</system>

<context>
[제공된 문서/데이터]
</context>
```

**개선점:**
- 명확한 지식 범위 인식
- 컨텍스트 기반 정확한 답변
- 정보 부재 시 적절한 안내

---

## Part 3: Veo 3.1 프롬프트 전략

> Veo 3.1은 Google의 최첨단 동영상 생성 모델로, 8초 길이의 720p 또는 1080p 동영상을 오디오와 함께 생성합니다.

### 3.1 Veo 모델 개요

#### 주요 기능
- **동영상 확장**: 이전 Veo 생성 동영상을 확장 (최대 141초)
- **프레임별 생성**: 첫 번째/마지막 프레임 지정하여 생성
- **이미지 기반 방향**: 최대 3개 참조 이미지로 콘텐츠 안내

#### 사양
| 항목 | Veo 3.1 |
|------|---------|
| 해상도 | 720p, 1080p |
| 길이 | 4초, 6초, 8초 |
| 프레임 속도 | 24fps |
| 오디오 | 기본 포함 |

### 3.2 프롬프트 작성 기본사항

#### 필수 요소

1. **주제 (Subject)**
   - 동영상에 담고 싶은 사물, 사람, 동물 또는 풍경
   - 예: *도시 경관*, *자연*, *차량*, *강아지*

2. **동작 (Action)**
   - 피사체가 하는 행동
   - 예: *걷기*, *달리기*, *머리 돌리기*

3. **스타일 (Style)**
   - 특정 영화 스타일 키워드
   - 예: *SF*, *공포 영화*, *필름 누아르*, *만화*

#### 선택 요소

4. **카메라 위치 및 모션**
   - *공중 촬영*, *눈높이*, *위에서 아래로 촬영*
   - *돌리 샷*, *로우 앵글*, *POV 샷*

5. **구도 (Composition)**
   - *와이드 샷*, *클로즈업*, *싱글 샷*, *투 샷*

6. **포커스 및 렌즈 효과**
   - *얕은 포커스*, *깊은 포커스*, *소프트 포커스*
   - *매크로 렌즈*, *광각 렌즈*

7. **분위기 (Mood)**
   - *파란색 톤*, *야간*, *따뜻한 색조*

### 3.3 오디오 프롬프트 (Veo 3+)

#### 대화 프롬프팅
특정 대화에는 따옴표 사용:
```
'이게 열쇠일 거야'라고 그는 중얼거렸습니다.
```

#### 음향 효과 (SFX)
소리를 명시적으로 설명:
```
타이어가 크게 삐걱거리고 엔진이 굉음을 냄
```

#### 주변 소음
환경의 사운드스케이프 설명:
```
희미하고 섬뜩한 험이 배경에 울려 퍼집니다.
```

### 3.4 이미지 활용 기법

#### 패턴 1: 시작 프레임으로 이미지 사용
Nano Banana로 이미지를 생성한 후, 해당 이미지를 동영상의 첫 프레임으로 사용:

```python
# 1. Nano Banana로 이미지 생성
image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=prompt,
    config={"response_modalities":['IMAGE']}
)

# 2. Veo로 동영상 생성
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    image=image.parts[0].as_image(),
)
```

#### 패턴 2: 참조 이미지 사용 (Veo 3.1)
최대 3개의 참조 이미지로 스타일/콘텐츠 안내:

```python
dress_reference = types.VideoGenerationReferenceImage(
    image=dress_image,
    reference_type="asset"
)

operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    config=types.GenerateVideosConfig(
        reference_images=[dress_reference, glasses_reference, woman_reference],
    ),
)
```

#### 패턴 3: 첫 번째 & 마지막 프레임 (보간)
시작과 끝 프레임을 지정하여 동영상 생성:

```python
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt=prompt,
    image=first_image,
    config=types.GenerateVideosConfig(
        last_frame=last_image
    ),
)
```

### 3.5 동영상 확장

이전 Veo 생성 동영상을 7초씩 최대 20배까지 확장:

```python
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    video=previous_operation.response.generated_videos[0].video,
    prompt="패러글라이더가 천천히 하강하는 장면으로 확장",
)
```

**제한사항:**
- 입력 동영상 최대 141초
- 가로세로 비율: 9:16 또는 16:9
- 해상도: 720p만 지원

### 3.6 프롬프트 예시 모음

#### 간단한 프롬프트
```
눈표범 같은 털을 가진 귀여운 생물이 겨울 숲을 걷고 있는
3D 만화 스타일의 렌더링입니다.
```

#### 상세한 프롬프트
```
재미있는 만화 스타일의 짧은 3D 애니메이션 장면을 만들어 줘.
눈표범 같은 털과 표정이 풍부한 커다란 눈,
친근하고 동글동글한 모습을 한 귀여운 동물이
기발한 겨울 숲을 즐겁게 뛰어다니고 있습니다.

이 장면에는 둥글고 눈 덮인 나무, 부드럽게 떨어지는 눈송이,
나뭇가지 사이로 들어오는 따뜻한 햇빛이 담겨 있어야 합니다.
생물의 통통 튀는 움직임과 환한 미소는 순수한 기쁨을 전달해야 합니다.

밝고 경쾌한 색상과 장난기 넘치는 애니메이션으로
낙관적이고 따뜻한 분위기를 연출하세요.
```

#### 대화가 포함된 프롬프트
```
안개가 자욱한 미국 북서부의 숲을 넓게 촬영한 장면
지친 두 등산객인 남성과 여성이 고사리를 헤치고 나아가는데
남성이 갑자기 멈춰 서서 나무를 응시합니다.

클로즈업: 나무껍질에 깊은 발톱 자국이 새겨져 있습니다.

남자: (사냥용 칼에 손을 대며) '저건 평범한 곰이 아니야.'
여성: (두려움에 목소리가 떨리며 숲을 둘러봄) '그럼 뭐야?'

거친 짖음, 부러지는 나뭇가지, 축축한 땅에 찍히는 발자국.
외로운 새가 지저귄다.
```

### 3.7 부정적 프롬프트 사용법

동영상에 포함하고 싶지 **않은** 요소 지정:

```
❌ 피하세요: "벽 없음", "하지 마세요"
✅ 권장: "wall, frame" (단순 나열)
```

**예시:**
```
부정적 프롬프트: 도시 배경, 인공 구조물,
어둡거나 폭풍이 몰아치거나 위협적인 분위기
```

---

## Part 4: Nano Banana 프롬프트 전략

> Nano Banana (Gemini 2.5 Flash Image)는 Gemini의 네이티브 이미지 생성 모델입니다. 텍스트에서 이미지를 생성하며, Veo 동영상의 시작 프레임이나 참조 이미지로 활용할 수 있습니다.

### 4.1 Nano Banana 개요

#### 모델 정보
- **정식 명칭**: Gemini 2.5 Flash Image (일명 Nano Banana)
- **모델 코드**: `gemini-2.5-flash-image`
- **주요 용도**: 이미지 생성, Veo 동영상의 입력 이미지 생성

#### 기본 사용법
```python
from google import genai

client = genai.Client()

image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents="소형 미니어처 서퍼들이 소박한 돌 욕실 싱크대 안에서 바다의 파도를 타는 초현실적인 매크로 사진",
    config={"response_modalities":['IMAGE']}
)
```

### 4.2 프롬프트 작성 가이드

#### 효과적인 프롬프트 구조

1. **주제 설명**
   - 이미지의 주요 피사체를 명확하게 기술

2. **스타일 지정**
   - 사진, 그림, 3D 렌더링 등 원하는 스타일 명시

3. **분위기/조명**
   - 색조, 조명 조건, 전체적인 분위기

4. **구도**
   - 클로즈업, 와이드 샷, 매크로 등

### 4.3 프롬프트 예시 모음

#### 초현실적인 이미지
```
소형 미니어처 서퍼들이 소박한 돌 욕실 싱크대 안에서
바다의 파도를 타는 초현실적인 매크로 사진
빈티지 황동 수도꼭지가 작동하여 끊임없이 파도가 치고 있습니다.
초현실적이고 기발하며 밝은 자연광
```

#### 패션/제품 이미지
```
분홍색과 푸시아색 깃털이 여러 겹으로 이루어진
하이 패션 플라밍고 드레스
```

#### 인물 이미지
```
어두운 머리와 따뜻한 갈색 눈을 가진 아름다운 여성
```

#### 액세서리/소품
```
기발한 분홍색 하트 모양 선글라스
```

#### 캐릭터 디자인
```
심해 아귀가 어둡고 깊은 물속에 숨어
이빨을 드러내고 미끼를 빛내고 있습니다.
```

#### 애니메이션 캐릭터
```
눈표범 같은 털과 표정이 풍부한 커다란 눈,
친근하고 동글동글한 모습을 한 귀여운 동물
3D 만화 스타일로 렌더링
```

### 4.4 Veo와의 연동 활용

#### 연동 패턴 1: 동영상 시작 프레임으로 사용
```python
# Step 1: Nano Banana로 이미지 생성
prompt = "황금빛 노을이 지는 해변의 파노라마 풍경"
image = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=prompt,
    config={"response_modalities":['IMAGE']}
)

# Step 2: Veo로 동영상 생성 (이미지를 시작 프레임으로)
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="카메라가 천천히 해변을 패닝하며 파도가 밀려옵니다",
    image=image.parts[0].as_image(),
)
```

#### 연동 패턴 2: 참조 이미지로 사용 (Veo 3.1)
```python
# 여러 참조 이미지 생성
dress_image = generate_image("하이 패션 플라밍고 드레스")
woman_image = generate_image("어두운 머리의 아름다운 여성")
glasses_image = generate_image("분홍색 하트 모양 선글라스")

# Veo에서 참조 이미지로 활용
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    prompt="여성이 해변을 우아하게 걷는 모습",
    config=types.GenerateVideosConfig(
        reference_images=[
            types.VideoGenerationReferenceImage(image=dress_image, reference_type="asset"),
            types.VideoGenerationReferenceImage(image=woman_image, reference_type="asset"),
            types.VideoGenerationReferenceImage(image=glasses_image, reference_type="asset"),
        ],
    ),
)
```

#### 연동 패턴 3: 첫 번째/마지막 프레임 보간
```python
# 첫 번째 프레임 이미지
first_image = generate_image(
    "프랑스 리비에라 해안에서 빨간색 컨버터블 레이싱 자동차를 운전하는 생강색 고양이"
)

# 마지막 프레임 이미지
last_image = generate_image(
    "절벽에서 출발하는 빨간색 컨버터블과 생강색 고양이"
)

# Veo로 보간 동영상 생성
operation = client.models.generate_videos(
    model="veo-3.1-generate-preview",
    image=first_image,
    config=types.GenerateVideosConfig(last_frame=last_image),
)
```

### 4.5 프롬프트 최적화 팁

#### 설명적인 언어 사용
형용사와 부사를 활용하여 명확한 그림을 그립니다:
```
❌ "강아지 사진"
✅ "햇살 가득한 공원에서 뛰노는 골든 리트리버 강아지, 부드러운 자연광"
```

#### 얼굴 세부정보 개선
얼굴을 초점으로 지정:
```
"인물 사진 스타일로, 얼굴에 초점을 맞춘 클로즈업"
```

#### 스타일 혼합
여러 스타일 키워드 조합:
```
"초현실주의적 + 매크로 사진 + 밝은 자연광 + 기발한"
```

### 4.6 용도별 프롬프트 템플릿

#### 제품 이미지
```
[제품명]이 [배경]에 있습니다.
제품 촬영 스타일, 깨끗한 배경, 전문적인 조명
```

#### 캐릭터 디자인
```
[캐릭터 특징]을 가진 [캐릭터 유형]
[스타일] 스타일로 렌더링
[표정/포즈] 표현
```

#### 풍경 이미지
```
[장소]의 [시간대] 풍경
[분위기] 느낌의 [색조] 색상
[구도] 샷으로 촬영
```

---

## Part 5: 실전 활용 예시 (@specal1849)

> **출처**: @specal1849 (패스트캠퍼스 제미나이 강의자)의 Threads 꿀팁 모음
> **추가일**: 2026-01-03

### 5.1 동적뷰 (Dynamic View)

> Gemini 3 출시와 함께 공식 지원되는 동적뷰 기능. 간단한 입력만으로 인터랙티브한 결과물 생성.

#### 사용 방법
```
제미나이 접속 → 도구 → 동적뷰 선택 → 프롬프트 입력
```

#### 바로 사용 가능한 프롬프트 3선

**프롬프트 1: 여행 계획 (표 형식)**
```
후쿠오카 2박 3일 효도 여행 코스를 짜줘.
부모님 체력을 고려해서 여유로운 일정으로 잡고,
맛집과 관광지를 포함해서 시간대별로 표로 정리해줘
```

**프롬프트 2: 파이썬 데이터 시각화**
```
파이썬을 사용하여 2025년 가상의 월별 매출 데이터를 생성하고,
이를 막대 그래프와 꺾은선 그래프로 시각화하는 대시보드 코드를 작성해줘.
```

**프롬프트 3: 블로그 글쓰기**
```
요즘 유행하는 '두바이 초콜릿' 먹어본 후기 블로그 글 써줘.
서론-본론-결론으로 나누고, 사람들이 검색할 만한 해시태그도 달아줘.
말투는 친근하고 재밌게.
```

> 💡 **Tip**: 1분이면 따라할 수 있어요! 파이썬 한글 폰트도 자동 처리됨

### 5.2 노트북LM PPT 생성

> NotebookLM에 공식적으로 **프레젠테이션과 인포그래픽** 기능 추가됨. 나노바나나2 기반으로 디자인과 가시성이 뛰어남.

#### 슬라이드 맞춤설정 2가지

| 유형 | 특징 | 용도 |
|------|------|------|
| **자세한 자료** (Detailed) | 전체 텍스트와 세부 정보 포함 | 이메일 공유, 단독 읽기용 |
| **발표자 슬라이드** (Presenter) | 핵심 내용만 깔끔하게 | 임원 발표, IR 프레젠테이션 |

#### 스타일 프롬프트 예시

**강의용 슬라이드:**
```
단계별 안내에 중점을 둔 대담하고 재미있는 스타일의 초보자용 자료 만들어줘
```

**IR 발표용:**
```
임원발표용 IR 블루 스타일로 전문적이고 깔끔한 프레젠테이션 만들어줘
```

#### ⚠️ 한국어 깨짐 해결

| 문제 | 원인 | 해결책 |
|------|------|--------|
| 한글 깨짐 | 나노바나나2 글자수 제한 | **200~300자 이하**로 유지 |
| 장문 텍스트 오류 | 300자 초과 시 깨짐 | 짧은 문장으로 분리 |

### 5.3 믹스보드 (Mixboard)

> 구글 믹스보드가 한국에 상륙! 나노바나나 기반의 이미지 합성 및 스타일 변경 도구.

#### 핵심 기능

| 기능 | 설명 |
|------|------|
| **스타일 변경** | 다양한 아트 스타일 적용 |
| **이미지 합성** | 나노바나나 기반 합성 |
| **양산 가능** | PPT, 포스터 등 대량 제작 |

> 💡 **Tip**: PPT 제작에 특히 유용. 고점이 높은 서비스 (숙련도에 따라 결과 차이)

### 5.4 만화 제작 프롬프트

> 나노바나나2로 AI 만화 제작 가능. 상세 내용은 **image-prompt-guide** 스킬 참조.

#### 핵심 태그 요약

```
monochrome           → 흑백 톤
manga style          → 일본 만화 스타일
screentone           → 스크린톤 효과
multiple panels      → 여러 패널 구성
speech bubble        → 말풍선 포함
action lines         → 액션 효과선
```

#### 4컷 만화 예시
```
A 4-panel manga comic, monochrome style with screentone,
Panel 1: A cat waking up sleepily
Panel 2: Cat sees empty food bowl, shocked expression
Panel 3: Cat meowing loudly at owner
Panel 4: Happy cat eating, speech bubble "Finally!"
manga style, clean linework, expressive characters
```

### 5.5 AI 함수 (Google Sheets)

> Gemini 3 출시와 함께 구글 Sheet에 AI 함수 공식 지원 (기존 워크스페이스 전용 → 일반 사용자)

#### 활용 사례
- **CS 답변 자동 생성**: 함수로 고객 문의 자동 응답
- **데이터 기반 대시보드형 PPT**: 더미 데이터로 즉시 제작

---

## Part 6: NanoBanana2 (Gemini 3.1 Flash Image) 프롬프트 전략

> NanoBanana2(NB2)는 Gemini 3.1 Flash 기반의 차세대 이미지 생성 모델로, NB Pro 대비 3-5배 빠르고 37% 저렴합니다. **서술형(narrative) 프롬프트**에 최적화되어 있습니다.

### 6.1 NB2 모델 개요

#### 모델 정보
- **정식 명칭**: Gemini 3.1 Flash Image (일명 NanoBanana2)
- **모델 코드**: `gemini-3.1-flash-image-preview`
- **아키텍처**: Gemini 3.1 Flash 기반 네이티브 이미지 생성

#### NB Pro vs NB2 비교

| 항목 | NB Pro (Gemini 2.5 Flash Image) | NB2 (Gemini 3.1 Flash Image) |
|------|------|------|
| **모델 ID** | `gemini-2.5-flash-image` | `gemini-3.1-flash-image-preview` |
| **속도 (1K)** | 15-20초 | **4-6초** (3-5배 빠름) |
| **가격 (4K)** | $0.240 | **$0.151** (37% 저렴) |
| **CJK 텍스트** | 기본 지원 | **우수** (Pro 대비 향상) |
| **Thinking Mode** | 미지원 | **3단계 조절** |
| **Web Grounding** | 미지원 | **Google Search 연동** |
| **종횡비** | 기본 비율 | **14종** (극단 비율 포함) |
| **참조 이미지** | 제한적 | **최대 14장** |
| **워터마크** | 기본 | **SynthID + C2PA** |

### 6.2 서술형 프롬프트 전략 (NB2 핵심)

> **NB2의 핵심 차이**: 태그 나열형 프롬프트보다 **서술형(narrative) 프롬프트**가 더 효과적입니다.

```
❌ NB Pro 스타일 (태그 나열):
"cat, black, fluffy, sitting, yellow sofa, natural light, bokeh"

✅ NB2 스타일 (서술형):
"A fluffy black cat sits gracefully on a bright yellow sofa,
gazing directly at the camera with curious green eyes.
Soft natural light streams through a nearby window,
creating a warm, cozy atmosphere with gentle bokeh
in the background."
```

### 6.3 5요소 프레임워크 (5-Element Framework)

NB2 프롬프트 작성 시 다음 5요소를 서술형으로 구성:

| 요소 | 설명 | 예시 |
|------|------|------|
| **Subject** | 주요 피사체 | "검은 고양이가" |
| **Action** | 행동/동작 | "노란 소파에 앉아" |
| **Environment** | 환경/배경 | "창가 옆 거실에서" |
| **Mood** | 분위기/감정 | "따뜻하고 아늑한 분위기" |
| **Camera** | 촬영 기법 | "부드러운 자연광, 얕은 심도" |

```
5요소 조합 예시:
"A golden retriever puppy (Subject) leaps joyfully through
a field of wildflowers (Action + Environment), bathed in
warm golden hour light that creates a dreamy, nostalgic mood (Mood),
captured with a 85mm portrait lens at f/1.8 creating
beautiful bokeh (Camera)."
```

### 6.4 Thinking Mode (3단계)

NB2의 사고 모드를 조절하여 이미지 품질/속도 트레이드오프 제어:

| 모드 | 설명 | 용도 |
|------|------|------|
| **Off** | 사고 없이 즉시 생성 | 빠른 반복, 프로토타이핑 |
| **Balanced** | 기본 사고 | 일반적 사용 (기본값) |
| **Deep** | 깊은 사고 | 복잡한 구도, 정밀한 텍스트 |

### 6.5 Web Search Grounding

Google Search와 연동하여 최신 정보 기반 이미지 생성:

```
"2026년 현재 서울 강남역 거리 풍경을 사실적으로 그려줘"
→ NB2가 Google Search로 최신 정보 조회 후 이미지 생성
```

### 6.6 CJK 텍스트 렌더링

NB2는 한국어/중국어/일본어 텍스트 렌더링이 Pro 대비 크게 향상:

```
# 한국어 텍스트 포함 이미지
"카페 메뉴판. 상단에 '오늘의 커피' 텍스트, 아래에 3가지 음료 목록.
깔끔한 손글씨 스타일, 크래프트 종이 배경"
```

**팁**: 텍스트는 200-300자 이하로 유지 (300자 초과 시 깨짐 가능)

### 6.7 14종 종횡비

NB2는 극단적 비율을 포함한 14종 종횡비 지원:

| 비율 | 용도 | 비율 | 용도 |
|------|------|------|------|
| 1:1 | 정사각형, SNS | 9:16 | 세로 스토리 |
| 16:9 | 와이드, 유튜브 | 3:4 | 세로 사진 |
| 4:3 | 표준 사진 | 2:3 | 포트레이트 |
| 3:2 | 35mm 필름 | 21:9 | 시네마 와이드 |
| 4:5 | 인스타그램 | 1:2 | 극세로 |
| 5:4 | 중형 카메라 | 2:1 | 극와이드 |
| 9:21 | 극세로 배너 | 1:3 | 북마크 |

### 6.8 참조 이미지 활용 (최대 14장)

NB2는 최대 14장의 참조 이미지를 사용하여 스타일/콘텐츠 안내 가능:

```python
from google import genai

client = genai.Client()

# NB2로 참조 이미지 기반 생성
response = client.models.generate_content(
    model="gemini-3.1-flash-image-preview",
    contents=[
        "이 참조 이미지의 스타일로 새로운 풍경 그려줘",
        reference_image_1,
        reference_image_2,
    ],
    config={"response_modalities": ["IMAGE"]}
)
```

### 6.9 NB2 API 통합

```python
from google import genai

client = genai.Client()

# NB2 기본 사용
image = client.models.generate_content(
    model="gemini-3.1-flash-image-preview",
    contents="서울 남산타워가 보이는 야경, 시네마틱 분위기의 와이드 샷",
    config={"response_modalities": ["IMAGE"]}
)
```

### 6.10 NB2 프롬프트 체크리스트

- [ ] 서술형(narrative)으로 작성했는가? (태그 나열 ❌)
- [ ] 5요소(Subject/Action/Environment/Mood/Camera)가 포함되었는가?
- [ ] 한국어 텍스트는 200-300자 이하인가?
- [ ] 적절한 종횡비가 지정되었는가?
- [ ] Thinking Mode가 작업에 맞게 설정되었는가?

---

## 부록: 키워드 치트시트

### 분위기 (Mood)
| 한국어 | 영어 키워드 |
|--------|-------------|
| 드라마틱 | dramatic, cinematic, moody |
| 평화로운 | peaceful, serene, calm |
| 에너지틱 | energetic, dynamic, vibrant |
| 신비로운 | mystical, ethereal, dreamlike |
| 미래적 | futuristic, sci-fi, cyberpunk |
| 귀여운 | cute, kawaii, adorable |

### 조명 (Lighting)
| 타입 | 영어 키워드 |
|------|-------------|
| 자연광 | natural light, daylight |
| 황금시간 | golden hour, magic hour |
| 역광 | backlit, silhouette, rim light |
| 네온 | neon lights, RGB lighting |
| 스튜디오 | studio lighting, professional |
| Rembrandt | Rembrandt lighting, triangular light patch |
| Chiaroscuro | extreme contrast, baroque style |

### 카메라 (Camera)
| 효과 | 영어 키워드 |
|------|-------------|
| 아웃포커스 | shallow depth of field, bokeh, f/1.4 |
| 와이드 | wide angle, 24mm, fisheye |
| 매크로 | macro, close-up, extreme detail |
| 필름 | film grain, 35mm film, analog |

### 카메라 모션 (Video)
| 효과 | 영어 키워드 |
|------|-------------|
| 패닝 | pan shot, panning |
| 돌리 | dolly shot, tracking |
| 크레인 | crane shot, aerial |
| POV | POV shot, first person |

---

## Metadata

- **Version**: 2.0.0
- **Created**: 2025-12-28
- **Last Updated**: 2026-03-08
- **Source Documents**:
  - Google-AI-Gemini-3-프롬프트-전략.md
  - Google-AI-Gemini-Flash-전략.md
  - Google-AI-Veo-프롬프트-전략.md
  - Google-AI-Nano-Banana-프롬프트-전략.md
  - Gemini-활용법-총집편-specal1849-MOC-2026-01-03.md
  - NanoBanana2 Guide (2026-03)
- **Original Source**: Google AI 공식 문서 (ai.google.dev)
- **Changes v2.0.0**:
  - **[CRITICAL] Part 6: NanoBanana2 전용 섹션 추가**: `gemini-3.1-flash-image-preview` 모델
  - **[HIGH] 서술형 프롬프트 전략**: 태그 나열 → narrative 방식 전환
  - **[HIGH] 5요소 프레임워크**: Subject/Action/Environment/Mood/Camera
  - **[HIGH] NB Pro vs NB2 비교 테이블**: 속도, 가격, 기능 7대 차이
  - **[MEDIUM] Thinking Mode**: 3단계 조절 (Off/Balanced/Deep)
  - **[MEDIUM] Web Search Grounding**: Google Search 연동 이미지 생성
  - **[MEDIUM] CJK 텍스트 렌더링**: Pro 대비 향상, 200-300자 제한
  - **[MEDIUM] 14종 종횡비**: 극단 비율 포함
  - **[MEDIUM] 참조 이미지**: 최대 14장 지원
  - **[MEDIUM] API 통합 코드**: SDK 예시
- **Changes v1.1.0**:
  - **[NEW] Part 5: 실전 활용 예시** 추가 (@specal1849 Threads 꿀팁)
  - 동적뷰 프롬프트 3선 추가
  - 노트북LM PPT 스타일 프롬프트 추가
  - 믹스보드, 만화 제작, AI 함수 섹션 추가
