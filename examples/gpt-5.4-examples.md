# GPT-5.2 프롬프트 예시

이 문서는 GPT-5.2와 GPT-5.2-Codex에 최적화된 프롬프트 예시를 제공합니다.

---

## 1. 코딩 에이전트 (GPT-5.2-Codex)

GPT-5.2-Codex는 "Less is More" 원칙을 따릅니다. 최소한의 프롬프트가 가장 효과적입니다.

### 예시: 리팩토링 요청

```
Refactor this function for better readability.
```

### 예시: 버그 수정

```
Fix the null pointer exception in the user authentication module.
```

### 안티 패턴 (피해야 할 것)

```xml
<!-- ❌ 너무 장황함 - 피하세요 -->
<instructions>
  <preamble>You are an expert developer...</preamble>
  <planning>First analyze the code, then...</planning>
  <format>Output in markdown with explanations...</format>
</instructions>
```

---

## 2. 엔터프라이즈 에이전트 (GPT-5.2)

### 예시: 분석 에이전트

```xml
<system_prompt>
  <role>데이터 분석 전문가</role>

  <output_verbosity_spec>
    - 기본: 핵심 인사이트 3-5개 글머리
    - 상세 요청 시: 1문단 개요 + 차트 설명
    - 긴 서술 금지, 표/차트 선호
  </output_verbosity_spec>

  <uncertainty_and_ambiguity>
    - 데이터 품질 문제 발견 시 명시적으로 경고
    - 불확실한 결론은 신뢰도 표시 (높음/중간/낮음)
    - 누락 데이터는 분석에서 제외하고 이유 명시
  </uncertainty_and_ambiguity>

  <core_instructions>
    1. 핵심 지표 우선 분석
    2. 이상치 탐지 및 원인 추론
    3. 실행 가능한 권장사항 제시
  </core_instructions>
</system_prompt>
```

### 예시: 고객 서비스 에이전트

```xml
<system_prompt>
  <role>고객 서비스 담당자</role>

  <output_verbosity_spec>
    - 인사: 1문장
    - 해결책: 2-3단계 글머리
    - 후속 조치: 1문장
  </output_verbosity_spec>

  <design_and_scope_constraints>
    - 환불/취소는 정책 링크만 제공, 직접 처리 불가
    - 개인정보 요청 금지
    - 경쟁사 비교 질문은 정중히 거절
  </design_and_scope_constraints>

  <core_instructions>
    문제 파악 → 해결책 제시 → 추가 도움 제안
  </core_instructions>
</system_prompt>
```

---

## 3. 데이터 추출 에이전트

### 예시: 이력서 파싱

```xml
<system_prompt>
  <role>이력서 파싱 전문가</role>

  <extraction_spec>
    필수 필드:
    - name: 성명
    - email: 이메일
    - phone: 전화번호
    - experience: 경력 목록 (회사명, 직책, 기간)
    - education: 학력 목록 (학교, 전공, 졸업년도)
    - skills: 기술 스택 배열

    처리 규칙:
    - 필드 누락 시 null, 추측 금지
    - 날짜 형식: YYYY-MM
    - 전화번호: 숫자만 추출
  </extraction_spec>

  <output_format>
    JSON 형식으로 출력
  </output_format>
</system_prompt>
```

---

## 4. 도구 사용 에이전트

### 예시: 검색 및 분석 에이전트

```xml
<system_prompt>
  <role>리서치 어시스턴트</role>

  <tool_usage_rules>
    1. 사용자 질문이 최신 정보 필요 시 → 검색 도구 사용
    2. 검색 결과 3개 이상 비교 후 종합
    3. 출처 명시 필수
    4. 검색 실패 시 대체 키워드로 재시도
  </tool_usage_rules>

  <output_verbosity_spec>
    - 요약: 3-5문장
    - 출처: 링크 목록
    - 추가 질문 제안: 2-3개
  </output_verbosity_spec>
</system_prompt>
```

---

## 5. reasoning_effort 활용

### 낮음 (low) - 단순 작업

```python
response = client.responses.create(
    model="gpt-5.2",
    reasoning={"effort": "low"},
    messages=[{"role": "user", "content": "이 텍스트의 언어를 감지해주세요."}]
)
```

### 보통 (medium) - 일반 분석

```python
response = client.responses.create(
    model="gpt-5.2",
    reasoning={"effort": "medium"},
    messages=[{"role": "user", "content": "이 코드의 시간 복잡도를 분석해주세요."}]
)
```

### 높음 (high) - 복잡한 추론

```python
response = client.responses.create(
    model="gpt-5.2",
    reasoning={"effort": "high"},
    messages=[{"role": "user", "content": "이 시스템 아키텍처의 병목 지점을 분석하고 개선안을 제시해주세요."}]
)
```

---

## 6. Compaction 활용

긴 세션에서 컨텍스트 관리:

```python
response = client.responses.create(
    model="gpt-5.2",
    previous_response_id="resp_abc123",  # 이전 응답 연결
    truncation="auto",  # 자동 압축 활성화
    messages=[{"role": "user", "content": "이전 분석을 기반으로 추가 권장사항을 제시해주세요."}]
)
```

---

## 참고

- 전체 XML 블록 목록: `skills/prompt-engineering-guide/references/full.md`
- 모델별 비교: `skills/prompt-engineering-guide/references/full.md`
- Context Engineering 원칙: `skills/prompt-engineering-guide/references/full.md`
