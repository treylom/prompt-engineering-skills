---
name: prompt-sync-gems
description: Use when needing 프롬프트 동기화 (Google Gems). Gems용 프롬프트 파일 자동 생성 및 업데이트.
---

# Gems 프롬프트 생성기 업데이트 스킬

Gems-Prompt-Generator.md 파일 업데이트를 위한 서브 스킬입니다.

> **Version**: 1.1.0 | **Updated**: 2026-01-01

## 대상 파일

| 위치 | 파일 경로 |
|------|----------|
| GitHub | `prompt-engineering-skills/instructions/Gems-Prompt-Generator.md` |
| Obsidian | `Prompt-Engineering/Gems-Prompt-Generator-Instructions.md` |

## 연동 스킬 파일 (참조용)

변경 유형에 따라 아래 스킬을 함께 참조합니다:

| 수정 유형 | 참조 스킬 파일 |
|----------|---------------|
| 이미지 생성 관련 | `.claude/skills/image-prompt-guide/references/full.md` |
| 리서치/팩트체크 | `.claude/skills/research-prompt-guide/references/full.md` |
| 모델별 전략 | `.claude/skills/prompt-engineering-guide/references/full.md` |
| Gemini 최적화 | `.claude/skills/gemini-3.1-prompt-strategies/references/full.md` |

## 워크플로우

### 1. 파일 읽기 (CRITICAL - 먼저 실행)

수정 전 반드시 전체 파일을 읽어 현재 상태를 파악합니다:

```
필수 읽기:
- prompt-engineering-skills/instructions/Gems-Prompt-Generator.md (전체)

선택적 읽기 (변경 유형에 따라):
- .claude/skills/image-prompt-guide/references/full.md
- .claude/skills/research-prompt-guide/references/full.md
- .claude/skills/prompt-engineering-guide/references/full.md
- .claude/skills/gemini-3.1-prompt-strategies/references/full.md
```

### 2. 수정 적용

요청된 변경사항 적용 (**코드블록 → 테이블 변환 주의**)

### 3. 버전 업데이트

버전 번호 증가 + Changelog 추가

### 4. Git 커밋

변경사항 커밋 & 푸시

### 5. Obsidian 동기화

해당 MCP 도구는 현재 없음 — Obsidian CLI/파일 쓰기로 대체.

```
1. Read("<vault>/Prompt-Engineering/Gems-Prompt-Generator-Instructions.md")
2. Edit(file_path=위 경로, old_string="> **Version**: 이전버전", new_string="> **Version**: 새버전")
3. Edit(file_path=위 경로, old_string="변경 전 섹션", new_string="변경 후 섹션")
```

적용 전 확신이 안 서면 Read로 현재 내용을 먼저 확인(Edit 도구는 dryRun 미지원 — old_string 유일 매칭 여부를 직접 확인).

## Gems 전용 주의사항 (CRITICAL)

### 코드블록 렌더링 이슈

Gems(Gemini)에서 코드블록이 제대로 렌더링되지 않습니다.

**해결책**: 입력 폼을 **마크다운 테이블**로 작성

```markdown
❌ 잘못된 예시:
```
1️⃣ 목적
ㄱ. 코딩/개발
```

✅ 올바른 예시:
| 1️⃣ 목적 | 2️⃣ 상세도 |
|---------|-----------|
| ㄱ. 코딩/개발 | I. 간결 |
```

### 기타 특성
- Constraints 섹션 최상단 배치 (Gemini 최적화)
- Gemini 3, Veo 3.1, Gemini Image 특화
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
