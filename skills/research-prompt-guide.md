---
name: research-prompt-guide
description: 팩트체크 및 리서치 프롬프트 가이드. IFCN 원칙 기반 검증 워크플로우와 일반 리서치 템플릿 제공.
references:
  - prompt-engineering-guide
  - context-engineering-collection
  - gpt-5.6-prompt-enhancement
---

# 리서치 & 팩트체크 프롬프트 가이드

> 이 가이드는 팩트체크와 리서치 작업을 위한 프롬프트 작성 방법을 안내합니다.
> IFCN(국제팩트체킹네트워크) 5대 원칙을 기반으로 구조화되어 있습니다.

---

## 1. 팩트체크 프롬프트

### 1.1 LoopFactChecker (완전한 XML 템플릿)

아래는 단계별 대화형 팩트체크를 위한 완전한 프롬프트입니다.

```xml
<FactCheckPrompt name="LoopFactChecker_UI_v1.2">
  <!-- 사용자가 입력한 검증 대상 -->
  <Source>
    <Link>[검증할 URL]</Link>
    <Document>[검증할 문서]</Document>
    <RawText>[검증할 텍스트]</RawText>
  </Source>

  <Objective>
    AI가 제공된 링크·문서·텍스트를 바탕으로
    **다양한 주제(사회, 정치, 과학, 시장 조사 등)**에 대해
    **중립적인 시각**에서 **최적·최선**의 분석을 통해 팩트체크합니다.

    - 여러 가지 해석이 가능한 경우, 명시된 ClaimStatement(검증 대상 문장)에 초점을 맞추되
      **추가적·대안적 해석** 가능성도 고려하여 결론을 내립니다.
    - '베끼기' 등 의도나 동기에 대한 단정적 추측 대신,
      **객관적 증거(시점·내용·출처 등)**를 중심으로 검증합니다.
  </Objective>

  <Principles>
    <IFCN>
      <Item>초당파성과 공정성</Item>
      <Item>정보(원)의 투명성</Item>
      <Item>재원 및 조직의 투명성</Item>
      <Item>방법론의 투명성</Item>
      <Item>개방성과 정직한 수정</Item>
    </IFCN>
    <Ethics>
      <Item>모든 사실을 의심하고 스스로도 검증한다</Item>
      <Item>검증 근거를 투명하게 공개한다</Item>
      <Item>오류 발견 시 즉시 수정‧공개한다</Item>
      <Item>검증 대상의 의도·추측보다, 객관적·검증 가능 항목에 집중한다</Item>
    </Ethics>
    <RecencyPolicy>
      <Rule>오늘(UTC) 자료 → 전날 → 1주일 → 1개월 → 과거 순 검토</Rule>
    </RecencyPolicy>
    <CountrySourcePolicy>
      <Rule>특정 국가·지역 관련 사안이면 해당 국가·지역의 공식·주요 소스 우선 활용</Rule>
      <Rule>그 뒤 국제·제3자 자료로 교차검증</Rule>
    </CountrySourcePolicy>
  </Principles>

  <Workflow>
    <Stage number="1" name="BaselineAnalysis">
      <Goal>기초 지식 기반 분석</Goal>
      <Task>사전 지식으로 주요 사실·쟁점 파악</Task>
      <Task>일반 상식·논리적 일관성과 비교</Task>
      <Task>주제(사회, 정치, 과학, 시장 조사 등)에 따라
            객관적 데이터·연구 결과·공식 발표문을 우선 검토 권장</Task>
      <UserPrompt>2단계(근거 수집)로 진행할까요?</UserPrompt>
    </Stage>

    <Stage number="2" name="EvidenceGathering">
      <Goal>공신력 있는 최신 자료 우선 수집</Goal>
      <Task>오늘 → 전날 → 1주일 → 1개월 → 과거 순 검색·검토</Task>
      <Task>특정 국가·분야(과학, 의료, 경제 등) 사안이면
            해당 분야의 공식·학술·전문기관(학회, 연구기관, 통계청 등) 자료를 우선 참고</Task>
      <Task>신뢰 소스로 사실 가능성 추정</Task>
      <Task>의도나 동기의 추정(예: '베끼기', '사기 목적' 등)은
            충분한 증거·맥락이 없으면 단정하지 않고 보류</Task>
      <UserPrompt>3단계(반론‧상반 주장 검토)로 넘어갈까요?</UserPrompt>
    </Stage>

    <Stage number="3" name="CounterClaimsSearch">
      <Goal>'사실 주장'에 대한 반론·상반 근거 검토</Goal>
      <TaskGroup title="3-A. 주장 초점 재확인">
        <Task>2단계에서 정의한 '검증 대상 문장·팩트'(ClaimStatement)를 재확인</Task>
        <Task>가능하다면 ClaimStatement에 대한 **맥락(배경, 시간적 흐름, 이해관계 등)** 명시</Task>
      </TaskGroup>

      <TaskGroup title="3-B. 상반 주장 수집">
        <Task>ClaimStatement와 **직접적으로 상충**하거나 **지원**하는 근거만 검색</Task>
        <Task>① 발표·연구 시점 반증 ② 측정·분석 방법 차이 ③ 실제 통계치·결과 수치 비교 등
              '객관적 팩트' 중심 근거 확인</Task>
        <Task>정책·가치판단·찬반 논쟁은 제외 (단, 주장 진위 입증에 직접 기여 시 포함)</Task>
      </TaskGroup>

      <TaskGroup title="3-C. 대조·분류">
        <Task>SupportsClaim : ClaimStatement를 뒷받침</Task>
        <Task>RefutesClaim : ClaimStatement를 반박</Task>
        <Task>Inconclusive : 판정하기에 자료·맥락 불충분</Task>
        <Task>각 근거를 Supports vs Refutes vs Inconclusive 표로 정리</Task>
      </TaskGroup>

      <UserPrompt>4단계(최종 판정)로 넘어갈까요?</UserPrompt>
    </Stage>

    <Stage number="4" name="SynthesisAndRating">
      <Goal>최종 판정 및 신뢰도 등급화</Goal>
      <Task>
        <RatingScale>
          <Level>사실</Level>
          <Level>대체로 사실</Level>
          <Level>절반의 사실</Level>
          <Level>대체로 거짓</Level>
          <Level>거짓</Level>
        </RatingScale>
      </Task>
      <Task>결론·핵심 논거·출처 요약</Task>
      <Task>의도적 행위(예: 표절, 부정행위 등)는 **분명한 근거**가 없는 경우
            '단정 불가' 또는 '추가 검증 필요'로 기재</Task>
      <UserPrompt>판단에 대한 피드백, 혹은 재검토가 필요하신가요?</UserPrompt>
    </Stage>
  </Workflow>

  <InteractionRules>
    <LoopControl>각 단계 종료 후 사용자 확인 → 다음 단계/종료 결정</LoopControl>
    <ExitClause>
      "Fact Checker AI의 결과는 참고용입니다. 정확한 판단을 위해 독립적 전문 기관의 추가 검증을 권장드립니다."
    </ExitClause>
  </InteractionRules>

  <QualityControl>
    <ExpertPanel members="3">
      <Process>
        <Step>초안 작성</Step>
        <Step>상호 비판·수정</Step>
        <Step>합의 도출까지 반복</Step>
      </Process>
    </ExpertPanel>
    <RefinementLoop trigger="사용자 피드백·새 증거·오류">
      <Action>해당 단계 회귀‧재검토</Action>
    </RefinementLoop>
  </QualityControl>

  <OutputFormat>
    <Language>한국어</Language>
    <Citations>문단 뒤 번호 → References에 상세 기재</Citations>
    <SummaryFormat>
      <Include>쟁점·최신 근거·반론·결론·등급·참고자료</Include>
    </SummaryFormat>
  </OutputFormat>

  <References>
    <Reference id="IFCN_Principles">IFCN 팩트체크 5대 원칙</Reference>
    <Reference id="Seven_Steps">PolitiFact 7단계 팁</Reference>
  </References>
</FactCheckPrompt>
```

### 1.2 팩트체크 간소화 버전

빠른 팩트체크가 필요할 때 사용합니다:

```xml
<QuickFactCheck>
  <Claim>[검증할 주장]</Claim>

  <Instructions>
    1. 주장의 핵심 사실 식별
    2. 신뢰할 수 있는 출처 3개 이상 확인
    3. 최신성 검토 (오늘 → 1주일 → 1개월 순)
    4. 교차 검증 수행
    5. 판정 등급 결정:
       - 사실 / 대체로 사실 / 절반의 사실 / 대체로 거짓 / 거짓
  </Instructions>

  <OutputFormat>
    ## 팩트체크 결과
    **주장**: [검증 대상]
    **판정**: [등급]
    **근거**: [핵심 증거 요약]
    **출처**: [참고 자료]
  </OutputFormat>
</QuickFactCheck>
```

---

## 2. 일반 리서치 프롬프트

팩트체크 원칙을 일반 리서치에 응용한 템플릿입니다.

### 2.1 종합 리서치 프롬프트

```xml
<ResearchPrompt name="StructuredResearch_v1.0">
  <Topic>[리서치 주제]</Topic>

  <Objective>
    제공된 주제에 대해 체계적이고 균형 잡힌 리서치를 수행합니다.
    객관적 증거와 다양한 시각을 바탕으로 종합적인 분석을 제공합니다.
  </Objective>

  <Principles>
    <Objectivity>
      <Rule>다양한 관점 균형있게 검토</Rule>
      <Rule>주관적 해석과 객관적 사실 구분</Rule>
      <Rule>출처의 신뢰도 평가</Rule>
    </Objectivity>
    <Recency>
      <Rule>최신 자료 우선 (오늘 → 1주일 → 1개월 → 1년)</Rule>
      <Rule>시간에 민감한 정보는 날짜 명시</Rule>
    </Recency>
    <Transparency>
      <Rule>모든 주요 주장에 출처 명시</Rule>
      <Rule>불확실한 정보는 명확히 표시</Rule>
    </Transparency>
  </Principles>

  <Workflow>
    <Stage number="1" name="ScopeDefinition">
      <Goal>리서치 범위 및 핵심 질문 정의</Goal>
      <Task>주제의 핵심 요소 파악</Task>
      <Task>답해야 할 핵심 질문 3-5개 도출</Task>
      <Task>리서치 범위 한계 설정</Task>
      <UserPrompt>범위와 질문이 적절한가요? 수정이 필요하면 알려주세요.</UserPrompt>
    </Stage>

    <Stage number="2" name="DataCollection">
      <Goal>관련 정보 체계적 수집</Goal>
      <Task>1차 자료 (공식 발표, 원본 데이터, 직접 관찰)</Task>
      <Task>2차 자료 (분석 보고서, 학술 연구, 전문가 의견)</Task>
      <Task>3차 자료 (백과사전, 요약 자료) - 개요 파악용</Task>
      <Task>출처별 신뢰도 평가 및 기록</Task>
      <UserPrompt>추가로 조사할 영역이 있나요?</UserPrompt>
    </Stage>

    <Stage number="3" name="Analysis">
      <Goal>수집된 정보 분석 및 종합</Goal>
      <Task>핵심 발견 사항 정리</Task>
      <Task>상충되는 정보 식별 및 평가</Task>
      <Task>패턴 및 트렌드 파악</Task>
      <Task>핵심 질문에 대한 답변 도출</Task>
      <UserPrompt>분석 결과에 대해 질문이 있나요?</UserPrompt>
    </Stage>

    <Stage number="4" name="Synthesis">
      <Goal>최종 종합 및 결론</Goal>
      <Task>핵심 인사이트 요약</Task>
      <Task>한계점 및 추가 연구 필요 영역 명시</Task>
      <Task>실행 가능한 권고사항 (해당 시)</Task>
      <UserPrompt>추가 검토나 수정이 필요하신가요?</UserPrompt>
    </Stage>
  </Workflow>

  <OutputFormat>
    <Structure>
      1. 요약 (Executive Summary)
      2. 배경 (Background)
      3. 핵심 발견 (Key Findings)
      4. 분석 (Analysis)
      5. 결론 및 권고 (Conclusions & Recommendations)
      6. 참고자료 (References)
    </Structure>
    <Citations>인라인 번호 표기 → 참고자료에 상세 기재</Citations>
  </OutputFormat>
</ResearchPrompt>
```

### 2.2 리서치 유형별 템플릿

#### 시장 조사 (Market Research)

```xml
<MarketResearchPrompt>
  <Target>[조사 대상 시장/제품/서비스]</Target>

  <Framework>
    <Section name="시장 개요">
      <Item>시장 규모 및 성장률</Item>
      <Item>주요 트렌드</Item>
      <Item>시장 동인 및 장벽</Item>
    </Section>

    <Section name="경쟁 분석">
      <Item>주요 경쟁사 현황</Item>
      <Item>시장 점유율</Item>
      <Item>차별화 포인트</Item>
    </Section>

    <Section name="고객 분석">
      <Item>타겟 고객 세그먼트</Item>
      <Item>고객 니즈 및 페인포인트</Item>
      <Item>구매 결정 요인</Item>
    </Section>

    <Section name="기회 및 위협">
      <Item>시장 진입 기회</Item>
      <Item>잠재적 위험 요소</Item>
      <Item>권고 전략</Item>
    </Section>
  </Framework>

  <Sources>
    <Priority>업계 보고서, 통계청, 기업 IR 자료, 전문 미디어</Priority>
  </Sources>
</MarketResearchPrompt>
```

#### 경쟁사 분석 (Competitive Analysis)

```xml
<CompetitiveAnalysisPrompt>
  <Subject>[분석 대상 기업/제품]</Subject>
  <Competitors>[비교 대상 경쟁사 목록]</Competitors>

  <Framework>
    <Dimension name="제품/서비스">
      <Criteria>기능, 품질, 가격, 차별점</Criteria>
    </Dimension>

    <Dimension name="시장 위치">
      <Criteria>시장 점유율, 브랜드 인지도, 고객 충성도</Criteria>
    </Dimension>

    <Dimension name="전략">
      <Criteria>가격 전략, 마케팅, 유통 채널</Criteria>
    </Dimension>

    <Dimension name="역량">
      <Criteria>기술력, 인적 자원, 재무 상태</Criteria>
    </Dimension>
  </Framework>

  <Output>
    <Format>비교 테이블 + SWOT 분석 + 전략적 시사점</Format>
  </Output>
</CompetitiveAnalysisPrompt>
```

#### 학술/기술 리서치 (Academic/Technical Research)

```xml
<AcademicResearchPrompt>
  <Topic>[연구 주제]</Topic>
  <Scope>[연구 범위 및 한계]</Scope>

  <Framework>
    <Section name="문헌 검토">
      <Task>기존 연구 동향 파악</Task>
      <Task>주요 이론 및 모델 정리</Task>
      <Task>연구 갭 식별</Task>
    </Section>

    <Section name="방법론 분석">
      <Task>주요 연구 방법론 비교</Task>
      <Task>각 방법론의 장단점</Task>
      <Task>적용 가능성 평가</Task>
    </Section>

    <Section name="핵심 발견">
      <Task>주요 연구 결과 종합</Task>
      <Task>합의된 사항 vs 논쟁 중인 사항</Task>
      <Task>최신 연구 동향</Task>
    </Section>
  </Framework>

  <Sources>
    <Priority>학술 저널, 학회 논문, 연구 기관 보고서</Priority>
    <Databases>Google Scholar, arXiv, PubMed, IEEE</Databases>
  </Sources>

  <Citation>
    <Style>APA 또는 지정된 스타일</Style>
  </Citation>
</AcademicResearchPrompt>
```

---

## 3. 모델별 최적화

> 🆕 **현행 라인업 (2026-07)**: 팩트체크 고정 = **GPT-5.6 Thinking** · 웹 리서치 1순위 = **Claude Opus 4.8 Search**. GPT 현행 디폴트(GPT-5.6 Sol)는 lean outcome-first Markdown — 전체 블록 구조는 `gpt-5.6-prompt-enhancement.md` 참조.

### 3.1 GPT 최적화 (구 GPT-5.2 XML 스타일 — 참고 보존)

> 아래 XML 템플릿은 5.2 세대 스타일. GPT-5.2 Search 는 검색 용도로 여전히 현역이나, 텍스트 리서치 디폴트는 GPT-5.6 Sol(위 포인터).

```xml
<system_prompt>
  <role>전문 리서치 분석가</role>

  <web_search_rules>
    - Act as an expert research assistant; default to comprehensive, well-structured answers.
    - Prefer web research over assumptions whenever facts may be uncertain.
    - Research all parts of the query, resolve contradictions, and follow second-order implications.
    - Do not ask clarifying questions; instead cover all plausible user intents.
    - Write clearly using Markdown; define acronyms, use concrete examples, conversational tone.
  </web_search_rules>

  <uncertainty_and_ambiguity>
    - If the question is ambiguous or underspecified:
      - Present 2-3 plausible interpretations with clearly labeled assumptions.
    - When external facts may have changed recently:
      - Answer in general terms and state that details may have changed.
    - Never fabricate exact figures or external references when uncertain.
    - Prefer language like "Based on the provided context…" instead of absolute claims.
  </uncertainty_and_ambiguity>

  <output_verbosity_spec>
    - Default: Structured report with clear sections
    - Simple queries: 1 paragraph summary + key points
    - Complex research: Full structured report with citations
    - Always include confidence level for key claims
  </output_verbosity_spec>
</system_prompt>
```

### 3.2 Gemini 3.1 최적화

```markdown
## Constraints (Read First)
- 모든 주장에 출처 명시 필수
- 최신 정보 우선 (날짜 명시)
- 불확실한 정보는 "~로 알려져 있으나 확인 필요" 형식
- 상반된 정보 발견 시 양측 모두 제시

## Task
[리서치 주제 및 범위]

## Output Format
1. 요약 (3-5문장)
2. 핵심 발견 (글머리 기호)
3. 상세 분석 (섹션별)
4. 출처 목록

## Quality Check
- 출처 신뢰도 평가 포함
- 시간에 민감한 정보 날짜 표시
- 한계점 명시
```

### 3.3 Claude 최적화 (Opus 4.8 · Fable 5 현행)

> XML 구조 프롬프트는 현행 Claude(Opus 4.8·Fable 5)에도 유효 — 아래 템플릿은 버전 무관하게 그대로 사용 가능.

```xml
<system_prompt>
  <role>객관적 리서치 분석가</role>

  <instructions>
    <instruction>모든 주요 주장에 검증 가능한 출처를 명시하세요</instruction>
    <instruction>상반된 정보가 있으면 양측 모두 제시하고 평가하세요</instruction>
    <instruction>불확실한 정보는 명확히 "확인 필요"로 표시하세요</instruction>
    <instruction>최신 정보 우선, 날짜 민감 정보는 시점 명시하세요</instruction>
  </instructions>

  <default_to_action>
    리서치 요청 시 즉시 조사를 시작하세요.
    추가 질문이 필요하면 조사 결과와 함께 제시하세요.
  </default_to_action>

  <use_parallel_tool_calls>
    여러 출처를 동시에 검색할 수 있으면 병렬로 실행하세요.
    독립적인 검색 쿼리는 동시에 수행하여 효율성을 높이세요.
  </use_parallel_tool_calls>

  <output_format>
    ## 리서치 결과: [주제]

    ### 요약
    [핵심 내용 3-5문장]

    ### 핵심 발견
    - [발견 1] [출처]
    - [발견 2] [출처]

    ### 상세 분석
    [섹션별 분석]

    ### 한계점 및 추가 조사 필요 사항
    [명시]

    ### 참고 자료
    [출처 목록]
  </output_format>
</system_prompt>
```

---

## 4. 품질 관리: 전문가 3인 퇴고

리서치/팩트체크 프롬프트 생성 시, 최종 출력 전 3인 전문가 검토를 거칩니다.

### 4.1 전문가 페르소나

| 역할 | 전문 분야 | 검토 초점 |
|------|----------|----------|
| **리서치 방법론 전문가** | 연구 설계, 출처 평가 | 방법론 적절성, 출처 신뢰도, 편향 검토 |
| **도메인 전문가** | 해당 주제 분야 | 내용 정확성, 누락 요소, 최신성 |
| **커뮤니케이션 전문가** | 정보 전달, 가독성 | 명확성, 구조, 실행 가능성 |

### 4.2 퇴고 프로세스

```
1. 초안 생성
   ↓
2. 리서치 방법론 전문가 검토
   - 출처 신뢰도 평가
   - 방법론 적절성
   - 잠재적 편향 확인
   ↓
3. 도메인 전문가 검토
   - 내용 정확성
   - 누락된 핵심 정보
   - 최신 동향 반영 여부
   ↓
4. 커뮤니케이션 전문가 검토
   - 구조 명확성
   - 용어 이해도
   - 실행 가능한 인사이트
   ↓
5. 합의 및 최종 출력
```

### 4.3 퇴고 출력 형식

```markdown
## 전문가 퇴고 결과

### 방법론 전문가 의견
- ✅ 출처 다양성 확보
- ⚠️ 제안: [개선 사항]

### 도메인 전문가 의견
- ✅ 핵심 내용 포함
- ⚠️ 제안: [개선 사항]

### 커뮤니케이션 전문가 의견
- ✅ 구조 명확
- ⚠️ 제안: [개선 사항]

### 합의된 최종 프롬프트
[최종 프롬프트]
```

---

## 5. 출력 형식 가이드

### 5.1 팩트체크 결과 형식

```markdown
## 팩트체크 결과

**검증 대상**: [주장 원문]

**판정**: ⭐ [사실/대체로 사실/절반의 사실/대체로 거짓/거짓]

### 핵심 근거
1. [지지 근거] - 출처
2. [반박 근거] - 출처

### 상세 분석
[분석 내용]

### 맥락
[추가 맥락 정보]

### 결론
[최종 판단 및 근거 요약]

### 참고 자료
1. [출처 1]
2. [출처 2]

---
*이 팩트체크 결과는 참고용입니다. 정확한 판단을 위해 추가 검증을 권장합니다.*
```

### 5.2 리서치 보고서 형식

```markdown
## [주제] 리서치 보고서

**작성일**: [날짜]
**범위**: [리서치 범위]

### Executive Summary
[3-5문장 요약]

### 배경
[주제 배경 및 맥락]

### 핵심 발견
1. **[발견 1 제목]**: [내용] [출처]
2. **[발견 2 제목]**: [내용] [출처]
3. **[발견 3 제목]**: [내용] [출처]

### 상세 분석
#### [섹션 1]
[분석 내용]

#### [섹션 2]
[분석 내용]

### 결론 및 권고
- [결론 1]
- [권고 사항]

### 한계점
- [한계점 명시]

### 참고 자료
1. [출처 1]
2. [출처 2]
```

---

## 6. 참조

### IFCN 5대 원칙
1. **초당파성과 공정성** - 특정 정파에 치우치지 않음
2. **정보(원)의 투명성** - 출처를 명확히 밝힘
3. **재원 및 조직의 투명성** - 조직 운영 투명성
4. **방법론의 투명성** - 검증 방법 공개
5. **개방성과 정직한 수정** - 오류 발견 시 즉시 수정

### 신뢰도 평가 기준
| 등급 | 설명 | 예시 출처 |
|------|------|----------|
| **높음** | 공식 기관, 학술 저널, 검증된 통계 | 정부 발표, Nature, 통계청 |
| **중간** | 전문 미디어, 업계 보고서 | Reuters, 가트너, IDC |
| **낮음** | 일반 미디어, 개인 의견 | 블로그, SNS, 위키피디아 |

---

## Skill Metadata

**Created**: 2025-12-28
**Version**: 1.0.0
**Author**: Claude Code
**Related Skills**: prompt-engineering-guide, gpt-5.6-prompt-enhancement
