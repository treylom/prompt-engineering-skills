---
name: prompt-sync-gpts
description: Use when needing 프롬프트 동기화 (OpenAI GPTs). GPTs용 프롬프트 파일 자동 생성 및 업데이트.
---

# GPTs 프롬프트 생성기 업데이트 스킬

GPTs-Prompt-Generator.md 파일 업데이트를 위한 서브 스킬입니다.

> **Version**: 1.1.0 | **Updated**: 2026-01-01

## 대상 파일

| 위치 | 파일 경로 |
|------|----------|
| GitHub | `prompt-engineering-skills/instructions/GPTs-Prompt-Generator.md` |
| Obsidian | `Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md` |

## 연동 스킬 파일 (참조용)

변경 유형에 따라 아래 스킬을 함께 참조합니다:

| 수정 유형 | 참조 스킬 파일 |
|----------|---------------|
| 이미지 생성 관련 | `.claude/skills/image-prompt-guide/references/full.md` |
| 리서치/팩트체크 | `.claude/skills/research-prompt-guide/references/full.md` |
| 모델별 전략 | `.claude/skills/prompt-engineering-guide/references/full.md` |
| GPT 최적화 (5.6 Sol + legacy) | `.claude/skills/gpt-5.6-prompt-enhancement/references/full.md` |

## 워크플로우

### 1. 파일 읽기 (CRITICAL - 먼저 실행)

수정 전 반드시 전체 파일을 읽어 현재 상태를 파악합니다:

```
필수 읽기:
- prompt-engineering-skills/instructions/GPTs-Prompt-Generator.md (전체)

선택적 읽기 (변경 유형에 따라):
- .claude/skills/image-prompt-guide/references/full.md
- .claude/skills/research-prompt-guide/references/full.md
- .claude/skills/prompt-engineering-guide/references/full.md
- .claude/skills/gpt-5.6-prompt-enhancement/references/full.md
```

### 2. 수정 적용

요청된 변경사항 적용

### 3. 버전 업데이트

버전 번호 증가 + Changelog 추가

### 4. Git 커밋

변경사항 커밋 & 푸시

### 5. Obsidian 동기화

해당 MCP 도구는 현재 없음 — Obsidian CLI/파일 쓰기로 대체.

```
1. Read("<vault>/Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md")
2. Edit(file_path=위 경로, old_string="> **Version**: 이전버전", new_string="> **Version**: 새버전")
3. Edit(file_path=위 경로, old_string="변경 전 섹션", new_string="변경 후 섹션")
```

적용 전 확신이 안 서면 Read로 현재 내용을 먼저 확인(Edit 도구는 dryRun 미지원 — old_string 유일 매칭 여부를 직접 확인).

## GPTs 전용 주의사항

- CRITICAL RULES 최상단 배치 필수
- 입력 폼은 코드블록 사용 가능 (GPTs는 렌더링 정상)
- XML 포맷 지원 (GPT-5.2 최적화)
- 현재 버전 체계: v1.x.x

## Changelog 형식

```markdown
**Changes vX.Y.Z**:
- 변경 내용
```

---

## Metadata

- **Version**: 1.1.0
- **Changes v1.1.0**:
  - 파일 읽기 단계 추가 (워크플로우 최상단)
  - 연동 스킬 파일 목록 추가
  - Obsidian 동기화: delete→create에서 update_note 방식으로 변경
