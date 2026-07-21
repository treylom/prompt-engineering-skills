---
description: AI 프롬프트 자동 생성 - K-AI 스테이션 양식 호환 (한 행에 한 모델)
allowedTools: Task, Read, Write, Bash, Glob, Grep, AskUserQuestion, TodoWrite
---

# Auto Prompt 에이전트 실행 (v3.10.0)

K-AI 스테이션 양식에 호환되는 AI 프롬프트를 자동 생성합니다.

## 에이전트 정보

- **에이전트 파일**: `.claude/agents/auto-prompt.md`
- **버전**: v3.10.0
- **참조 스킬**:
  - `.claude/skills/xlsx.md` (Excel 생성)
  - `.claude/skills/gpt-5.6-prompt-enhancement.md` (GPT 스타일 — 5.6 Sol 기본 + 5.5/5.4/5.2 legacy)
  - `.claude/skills/claude-fable-5-prompt-strategies.md` (Claude 스타일 — Fable 5·Opus 4.8·Sonnet 5, 구세대는 `claude-4.7-prompt-strategies.md`)
  - `.claude/skills/gemini-3.1-prompt-strategies.md` (Gemini 스타일)
  - `.claude/skills/research-prompt-guide.md` (Perplexity 검색 스타일)

## Excel 출력 양식 (K-AI 스테이션)

| 열 | 헤더 | 설명 |
|----|------|------|
| A | 직업 번호 | 1~100 직업 번호 |
| B | 직업 | 직업명 (예: 교사) |
| C | 프롬프트 주제 | 간단한 제목 (중복 금지) |
| D | 프롬프트 설명 | 실제 프롬프트 내용 |
| E | ai model | GPT / Gemini / Claude / Perplexity |
| F | 난이도 | 1~7 숫자 |
| G | 출처 | 김재경 (고정) |

## 입력 양식

### 모델별 × 난이도별 개수 지정

```
GPT : 난이도 1~2 4개 / 난이도 3~5 4개 / 난이도 6 1개 / 난이도 7 1개
Gemini : 난이도 1~2 11개 / 난이도 3~5 7개 / 난이도 6 1개 / 난이도 7 1개
Claude : 난이도 1~2 4개 / 난이도 3~5 4개 / 난이도 6 1개 / 난이도 7 1개
Perplexity : 난이도 1~2 4개 / 난이도 3~5 4개 / 난이도 6 1개 / 난이도 7 1개
```

### 난이도별 프롬프트 형식

| 난이도 | 형식 | 설명 |
|--------|------|------|
| 1~2 | 자연어 | 1~3줄의 간단한 지시 |
| 3~5 | 마크다운 | 5줄 이상, # 헤더 + 구조화 |
| 6~7 | XML | 20줄 이상, 태그 기반 구조 |

## 실행 워크플로우

### Step 1: 직업군/직업 입력
사용자로부터 직업군과 직업을 입력받습니다.

### Step 2: 모델별 개수 입력
위 입력 양식에 따라 모델별 × 난이도별 개수를 지정합니다.

### Step 3: 프롬프트 생성
- 프롬프트 주제를 먼저 생성 (중복 방지)
- 난이도에 맞는 형식으로 프롬프트 설명 작성
- 모델별 특화 스타일 적용

### Step 4: Excel 저장
파일명: `{직업군}_{직업}_AI프롬프트_{YYYYMMDD}.xlsx`

## 실행

에이전트 파일을 읽고 워크플로우를 따라 실행하세요.

```
Read: .claude/agents/auto-prompt.md
```

사용자의 추가 요청사항: $ARGUMENTS
