# 변주 기법 상세 레퍼런스

Variation Decision Matrix, Advanced Patterns, Job Adaptability Guide 상세.

---

## Part 3: Variation Decision Matrix

> 🆕 GPT 열의 XML 블록은 구 5.2 세대 스타일(명시 요청 시) — 현행 GPT-5.6 Sol 디폴트는 같은 개념을 Markdown 섹션으로 표현(예: verbosity 제어 → `# Output` 간결 지시). Claude 열은 현행(Opus 4.8·Fable 5) 유효.

### 3.1 Task Type × Model Matrix

| 작업 유형 | GPT (구 5.2 XML) | Claude (Opus 4.8 · Fable 5) | Gemini 3.1 | Perplexity |
|----------|---------|------------|----------|------------|
| **코딩/개발** | `<design_and_scope_constraints>` | `<avoid_over_engineering>` + `<investigate_before_answering>` | `must_not`에 금지 패턴 명시 | N/A |
| **글쓰기/문서** | `<output_verbosity_spec>` | `<avoid_excessive_markdown>` | `format_rules` 상세화 | 우수 사례 검색 + 스타일 가이드 |
| **분석/리서치** | `<uncertainty_and_ambiguity>` | 맥락 설명 강화 (왜 중요한지) | 분석 단계를 `<step>` 구조로 | 3단계 워크플로우 필수 |
| **데이터 처리** | `<extraction_spec>` + JSON 스키마 | 필드별 설명 + 예외 처리 명시 | 출력 구조를 `constraints`에 | 업계 표준 검색 |

### 3.2 Difficulty Progression Patterns

#### 1-2 → 3-5 Evolution
```
변화 요소:
- 길이: 1-3줄 → 5-15줄
- 구조: Role + Task → 4 Layers (Role/Context/Task/Output)
- XML 블록: 없음 → 모델별 필수 블록 1개
- 표현: 간단 → 구조화된 섹션
```

#### 3-5 → 6-7 Evolution
```
변화 요소:
- 형식: Markdown → XML
- XML 블록: 필수 1개 → 필수 2-3개 조합
- 출력 형식: 간단 명시 → 상세한 output_format 태그
- 맥락: 최소 → 풍부한 context/background 포함
```

---

## Part 6: Advanced Patterns

### 6.1 Multi-Block Combinations

**코딩 작업 + 고난이도 (Difficulty 6-7)**:
```xml
GPT (구 5.2 XML 스타일):
  <output_verbosity_spec> (간결화)
  + <design_and_scope_constraints> (범위 제약)
  + <tool_usage_rules> (도구 사용 규칙)

Claude (Opus 4.8 · Fable 5):
  <default_to_action> (즉시 실행)
  + <avoid_over_engineering> (과도한 설계 방지)
  + <investigate_before_answering> (파일 확인 먼저)
  + <use_parallel_tool_calls> (병렬 실행)
```

**글쓰기 작업 + 고난이도**:
```xml
GPT (구 5.2 XML 스타일):
  <output_verbosity_spec> (간결화)
  + <long_context_handling> (긴 문서)

Claude (Opus 4.8 · Fable 5):
  <avoid_excessive_markdown> (마크다운 최소화)
  + <default_to_action> (즉시 작성)
```

### 6.2 Persona Variation

**동일 작업, 다른 페르소나로 차별화**:
```
교사 "수업 계획서 작성":
- Difficulty 1-2: "초등학교 5학년 담임교사"
- Difficulty 3-5: "경력 10년의 초등학교 교사"
- Difficulty 6-7: "경력 20년의 초등교육 전문가, 교육과정 설계 컨설턴트"

변호사 "계약서 검토":
- Difficulty 1-2: "부동산 전문 변호사"
- Difficulty 3-5: "경력 15년의 부동산 전문 변호사"
- Difficulty 6-7: "부동산 거래법 전문가, 대형 로펌 파트너 변호사"
```

---

## Part 7: Job Adaptability Guide (핵심!)

### 7.1 작업 유형 분류 체계

**모든 직업군을 4가지 작업 유형으로 분류**:

| 작업 유형 | 특징 | 직업군 예시 |
|----------|------|-----------|
| **코딩/개발** | 코드 작성, 시스템 설계 | 개발자, 데이터 과학자, 시스템 관리자 |
| **글쓰기/문서** | 문서 작성, 보고서 | 교사, 마케터, 기자, 작가, 컨설턴트 |
| **분석/리서치** | 검토, 평가, 연구 | 변호사, 회계사, 연구원, 애널리스트 |
| **데이터 처리** | 계산, 분류, 정리 | 자영업자, 판매자, 세무사, 재무 담당자 |

**직업군 → 작업 유형 매핑 예시**:
```
교사:
- "수업 계획서 작성" → 글쓰기/문서
- "학생 평가 분석" → 분석/리서치
- "성적 집계" → 데이터 처리

변호사:
- "계약서 검토" → 분석/리서치
- "법률 의견서 작성" → 글쓰기/문서
- "판례 검색" → 분석/리서치 (Perplexity 활용)

자영업자:
- "메뉴 가격 계산" → 데이터 처리
- "마케팅 문구 작성" → 글쓰기/문서
- "경쟁사 분석" → 분석/리서치
```

### 7.2 직업 변환 패턴

#### Pattern 1: 교사 → 의사/간호사
```
공통점: 대상자(학생/환자) 중심, 계획 수립, 단계별 실행
변환 규칙:
- "학생" → "환자"
- "학습 목표" → "치료 목표"
- "수업 시간" → "진료 시간"
- "학습 활동" → "치료 활동"
```

#### Pattern 2: 변호사 → 회계사/세무사
```
공통점: 법령/기준 기반 검토, 위험 식별, 개선안 제시
변환 규칙:
- "법률" → "회계기준" 또는 "세법"
- "계약서" → "재무제표" 또는 "세무 신고서"
- "조항" → "계정" 또는 "신고 항목"
- "판례" → "회계 감독원 해석" 또는 "국세청 예규"
```

#### Pattern 3: 자영업자 → 판매자/제조업자
```
공통점: 원가 관리, 가격 설정, 재고 관리
변환 규칙:
- "메뉴" → "제품"
- "재료비" → "원재료비" 또는 "입고 단가"
- "판매가" → "소비자가" 또는 "출고가"
- "마진율" → "수익률"
```

### 7.3 범용 템플릿 (직업 무관)

**Difficulty 1-2 범용 템플릿**:
```
당신은 [직업명]입니다. [작업명]을 수행해주세요.

예시:
- "당신은 교사입니다. 수업 계획서를 작성해주세요."
- "당신은 변호사입니다. 계약서를 검토해주세요."
- "당신은 개발자입니다. API 문서를 작성해주세요."
```

**Difficulty 3-5 범용 템플릿**:
```markdown
# 역할
[경력 N년의] [직업명]

## 작업
[구체적인 작업 설명]

## 요구사항
- [제약조건 1]
- [제약조건 2]
- [산출물 형식]

[모델별 필수 XML 블록]

## 출력 형식
[구체적 형식 명시]
```

**Difficulty 6-7 범용 템플릿**:
```xml
<system_prompt>
  <role>[경력 N년의] [직업명], [전문 분야]</role>

  <context>
    [작업 배경 및 중요성]
    [대상자/고객 특성]
  </context>

  <core_instructions>
    [구체적 지시사항]
  </core_instructions>

  [모델별 필수 XML 블록 2-3개]

  <output_format>
    [상세 형식 명시]
  </output_format>
</system_prompt>
```

### 7.4 직업 적응 실전 가이드

**Step 1: 작업 유형 판단**
```
주제: "세무사 - 법인세 신고서 작성"
→ 작업 유형: 데이터 처리 (계산 + 양식 작성)
```

**Step 2: 유사 직업군 예시 참조**
```
데이터 처리 예시: "자영업자 - 메뉴 가격 계산"
→ 구조 참조: 계산 기준, 단계별 계산, JSON 출력
```

**Step 3: 직업 특화 요소 교체**
```
"메뉴 가격" → "법인세액"
"재료비" → "소득금액"
"마진율" → "세율"
"판매가" → "납부 세액"
```

**Step 4: 법령/기준 추가**
```
"법인세법 제13조, 제55조" 등 관련 법령 명시
```

**결과**: 세무사용 프롬프트 완성!

---

## Part 5: Integration with /auto-prompt

### 5.1 Enhanced Phase 3 Workflow

```
Phase 3: 프롬프트 생성
Step 1: 주제 선택
Step 2: 난이도 확인 → 형식 결정
Step 3: 변주 매트릭스 확인 (Part 3)  ← NEW
Step 4: 작업 유형 판단 (코딩/글쓰기/분석/데이터)              ← NEW
Step 5: 모델별 + 작업별 조합 생성                            ← NEW
Step 6: 참고사항 템플릿 적용
Step 7: 품질 체크리스트 실행                                   ← NEW
```

### 5.2 Quality Checklist (Excel 저장 전 필수)

```markdown
## Phase 4: Excel 저장 전 품질 검증 (MANDATORY)

### 체크리스트 1: 모델별 차별화
[ ] GPT: output_verbosity_spec 포함? (난이도 3+)
[ ] Claude: 맥락 설명 또는 default_to_action?
[ ] Gemini: Constraints가 맨 앞?
[ ] Perplexity: 워크플로우 또는 검색 요청?

### 체크리스트 2: 작업 유형 반영
[ ] 코딩: 범위 제약 블록?
[ ] 글쓰기: 문서 구조/톤?
[ ] 분석: 판단 기준?

### 체크리스트 3: 다양성
[ ] 같은 모델 내 프롬프트가 서로 다른 구조?

검증 실패 시 → 해당 프롬프트 재생성
```
