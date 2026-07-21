---
name: prompt-sync-skills
description: Use when needing 프롬프트 동기화 (Claude Skills). 스킬 프롬프트 파일 자동 생성 및 업데이트.
---

# Skills /prompt 커맨드 업데이트 스킬

commands/prompt.md 파일 업데이트를 위한 서브 스킬입니다.

> **Version**: 1.1.0 | **Updated**: 2026-01-01

## 대상 파일

| 위치 | 파일 경로 |
|------|----------|
| GitHub | `prompt-engineering-skills/commands/prompt.md` |

**Note**: Skills는 Claude Code 전용이므로 Obsidian 동기화가 없습니다.

## 연동 스킬 파일 (참조용)

변경 유형에 따라 아래 스킬을 함께 참조합니다:

| 수정 유형 | 참조 스킬 파일 |
|----------|---------------|
| 이미지 생성 관련 | `.claude/skills/image-prompt-guide.md` |
| 리서치/팩트체크 | `.claude/skills/research-prompt-guide.md` |
| 모델별 전략 | `.claude/skills/prompt-engineering-guide.md` |
| GPT 최적화 (5.6 Sol + legacy) | `.claude/skills/gpt-5.6-prompt-enhancement.md` |
| Gemini 최적화 | `.claude/skills/gemini-3.1-prompt-strategies.md` |
| Claude 최적화 (Fable 5·Opus 4.8·Sonnet 5) | `.claude/skills/claude-fable-5-prompt-strategies.md` |
| CE 원칙 | `.claude/skills/context-engineering-collection.md` |

## 워크플로우

### 1. 파일 읽기 (CRITICAL - 먼저 실행)

수정 전 반드시 전체 파일을 읽어 현재 상태를 파악합니다:

```
필수 읽기:
- prompt-engineering-skills/commands/prompt.md (전체)

선택적 읽기 (변경 유형에 따라):
- .claude/skills/image-prompt-guide.md
- .claude/skills/research-prompt-guide.md
- .claude/skills/prompt-engineering-guide.md
- .claude/skills/gpt-5.6-prompt-enhancement.md
- .claude/skills/gemini-3.1-prompt-strategies.md
- .claude/skills/claude-fable-5-prompt-strategies.md
```

### 2. 수정 적용

요청된 변경사항 적용

### 3. 버전 업데이트

Metadata 섹션의 버전 번호 증가

### 4. Git 커밋

변경사항 커밋 & 푸시

## Skills 전용 특성

### 구조 특성
- `$ARGUMENTS` 플레이스홀더로 사용자 입력 받음
- 모델 선택 옵션 포함 (GPTs/Gems와 다름)
- LMArena 순위 기반 모델 추천 테이블
- AskUserQuestion 도구로 사용자 옵션 수집

### GPTs/Gems와의 차이점

| 항목 | Skills | GPTs/Gems |
|------|--------|-----------|
| 모델 선택 | 사용자가 선택 | 플랫폼 고정 |
| 실행 환경 | Claude Code | ChatGPT/Gemini |
| Obsidian 동기화 | ❌ 없음 | ✅ 있음 |
| 포맷 선택 | XML/Markdown/JSON 등 | 플랫폼 권장 포맷 |

### 버전 관리
- 현재 버전 체계: v1.x.x
- Metadata 섹션에서 관리

---

## Metadata

- **Version**: 1.1.0
- **Changes v1.1.0**:
  - 파일 읽기 단계 추가 (워크플로우 최상단)
  - 연동 스킬 파일 목록 추가
