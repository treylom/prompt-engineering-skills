---
description: 프롬프트 엔지니어링 통합 업데이트 (tofu-at 생성 — /prompt-update)
allowedTools: Task, Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion, TeamCreate, TeamDelete, TaskCreate, TaskUpdate, TaskList, SendMessage, ToolSearch, Skill, WebFetch, WebSearch, Agent, mcp__obsidian__create_note, mcp__obsidian__update_note, mcp__obsidian__read_note, mcp__obsidian__search_vault, mcp__obsidian__list_notes
---

# /prompt-update

> tofu-at 자동 생성 커맨드. 3-Phase Prompt Engineering 통합 업데이트
> Phase 1: KM (3소스 웹 리서치 → Obsidian 3-tier 저장)
> Phase 2: /prompt 리서치 (변경사항 목록 도출)
> Phase 3: /prompt-sync Mode A (8파일 수정 + 사본 동기화 + git push)

$ARGUMENTS

## 팀 설정

- **team_id**: prompt-eng.update.v1
- **설명**: 프롬프트 엔지니어링 통합 업데이트 — 최신 AI 모델 문서 반영
- **팀원**: 7명 (Lead + KM Workers 3 + Researcher 1 + Sync Executor 1 + DA 1)
- **모델 믹스**: Lead: Opus 1M, Workers: Sonnet 5, DA: Sonnet 5
- **생성일**: 2026-03-08
- **Ralph**: ON (최대 5회)
- **DA**: ON (Sonnet 5)

## 실행

> Agent Office 대시보드가 자동으로 실행됩니다 (port 3747).

이 커맨드는 3-Phase 워크플로우를 Agent Teams로 실행합니다:

**Phase 1 (병렬)**: 3명의 KM 워커가 각각 웹 리서치 후 Obsidian 3-tier 노트 생성
- KM-Source-A: OpenAI 최신 Prompt Guidance
- KM-Source-B: Anthropic Claude 최신 문서
- KM-Source-C: Google Gemini/NanoBanana 최신 문서

**Phase 2 (순차)**: Prompt Researcher가 Phase 1 결과를 종합하여 변경사항 목록 도출
- `/prompt` 스킬 사용하여 각 소스별 프롬프트 전략 리서치

**Phase 3 (순차)**: Prompt Sync Executor가 변경사항을 8개 파일에 적용
- `/prompt-sync` Mode A 실행 (GPTs + Gems + Skills + Obsidian)
- `.claude/` 사본 동기화 + Obsidian vault 동기화
- `cd prompt-engineering-skills && git add . && git commit && git push origin master`
- Windows 클론 동기화: 수정 파일을 `/mnt/c/.../prompt-engineering-skills/`에 복사 → commit → `git push origin master` (treylom/prompt-engineering-skills)

## Git Push 대상 (2개 리포)

| 리포 | 브랜치 | 방식 |
|------|--------|------|
| `<your-vault-repo>` | master | WSL 메인 리포에서 직접 push |
| `treylom/prompt-engineering-skills` | master | Windows 클론(`/mnt/c/.../prompt-engineering-skills/`)에 파일 복사 → commit → push |

## 수정 대상 파일

| 파일 | 위치 |
|------|------|
| claude-fable-5-prompt-strategies.md | prompt-engineering-skills/skills/ |
| gpt-5.6-prompt-enhancement.md | prompt-engineering-skills/skills/ |
| gemini-3.1-prompt-strategies.md | prompt-engineering-skills/skills/ |
| prompt-engineering-guide.md | prompt-engineering-skills/skills/ |
| image-prompt-guide.md | prompt-engineering-skills/skills/ |
| prompt.md | prompt-engineering-skills/commands/ |
| GPTs-Prompt-Generator.md | prompt-engineering-skills/instructions/ |
| Gems-Prompt-Generator.md | prompt-engineering-skills/instructions/ |

## 사본 동기화 대상

| 원본 | 사본 |
|------|------|
| prompt-engineering-skills/skills/*.md | .claude/skills/*.md |
| prompt-engineering-skills/commands/prompt.md | .claude/commands/prompt.md |
| prompt-engineering-skills/instructions/GPTs-*.md | Obsidian Prompt-Engineering/GPTs-*.md |
| prompt-engineering-skills/instructions/Gems-*.md | Obsidian Prompt-Engineering/Gems-*.md |

Skill("tofu-at", args: "scan prompt-engineering-skills/")
