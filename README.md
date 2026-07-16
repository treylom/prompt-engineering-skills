# 프롬프트 엔지니어링 통합 스킬

Claude Code, ChatGPT GPTs, Gemini Gems에서 함께 쓰는 프롬프트 엔지니어링 스킬 저장소입니다. 모델별 전략, 이미지/동영상, 리서치/팩트체크, 슬라이드, 전문가 도메인 프라이밍, Context Engineering 원칙을 모두 다룹니다.

> **운영 구조**: 단일 권원 통합본(`skills/prompt-engineering-guide.md`) + 영역별 분할 가이드(`skills/*.md`) + Skills 2.0 분할 모듈(`skills/<name>/`) + 플랫폼별 헬퍼 커맨드를 모두 동봉합니다. 사용자 환경에 맞춰 필요한 자산만 선택해 설치하세요.

## 바로 사용하기

| 플랫폼 | 링크 |
|--------|------|
| ChatGPT GPTs | [두부경 종합 프롬프트 생성기](https://chatgpt.com/g/g-694feb6bf18481918acd876e3c3eed37-tofukyung-jonghab-peurompeuteu-saengseonggi) |
| Gemini Gems | [프롬프트 생성기 Gem](https://gemini.google.com/gem/1ZV9S3vNOwExi4_yLHRJKFtpNpATPDI5d?usp=sharing) |

### Claude Code / ChatGPT (Codex CLI) 플러그인 설치

스킬이 [Agent Skills 오픈 표준](https://agentskills.io)을 따르므로 두 플랫폼에서 같은 저장소를 그대로 씁니다.

```bash
# Claude Code
/plugin marketplace add https://github.com/treylom/tofukyung-plugins.git
/plugin install prompt-engineering-skills

# ChatGPT (Codex CLI)
codex plugin marketplace add treylom/tofukyung-plugins
codex plugin add prompt-engineering-skills@tofukyung-plugins
```

## 커버리지

| 영역 | 통합본 위치 | 분할본 파일 |
|------|------------|-----------|
| GPT 5.x (**5.6 Sol = 기본**) | `prompt-engineering-guide.md` 모델별 섹션 | `skills/gpt-5.6-prompt-enhancement.md` (5.5/5.4 legacy 포함, 구 `gpt-5.5-…`는 stub) |
| **Claude Fable 5 / Opus 4.8 (디폴트)** | `prompt-engineering-guide.md` 모델별 섹션 | `skills/claude-fable-5-prompt-strategies.md` |
| Claude 4.x (구세대) | `prompt-engineering-guide.md` 모델별 섹션 | `skills/claude-4.7-prompt-strategies.md` |
| Gemini / Veo | `prompt-engineering-guide.md` 통합 부록 | `skills/gemini-3.1-prompt-strategies.md` |
| 이미지 프롬프트 | `prompt-engineering-guide.md` 이미지 부록 | `skills/image-prompt-guide.md` |
| 리서치 / 팩트체크 | `prompt-engineering-guide.md` 리서치 부록 | `skills/research-prompt-guide.md` |
| 슬라이드 / PPT | `prompt-engineering-guide.md` 슬라이드 부록 | `skills/slide-prompt-guide.md` |
| 전문가 프라이밍 | `prompt-engineering-guide.md` Expert Domain Priming | `skills/expert-domain-priming.md` |
| Context Engineering | `prompt-engineering-guide.md` CE 부록 | `skills/context-engineering-collection.md` |
| 프롬프트 변형 | — | `skills/prompt-variation-guide/` (Skills 2.0 분할) |

## 저장소 구조

```text
prompt-engineering-skills/
|-- README.md
|-- LICENSE
|
|-- skills/
|   |-- prompt-engineering-guide.md           # 단일 권원 통합본 (Claude Code 기본 설치 대상)
|   |
|   |-- claude-fable-5-prompt-strategies.md   # Fable 5·Opus 4.8 전략 (2026-06-10, Claude 디폴트=4.8)
|   |-- claude-4.7-prompt-strategies.md       # 영역별 분할 가이드 (GPTs Knowledge 분리 업로드 대응)
|   |-- gpt-5.6-prompt-enhancement.md         # GPT 5.x 통합 (5.6 Sol default + 5.5/5.4/5.2 legacy)
|   |-- gpt-5.5-prompt-enhancement.md         # → stub (5.6로 이관)
|   |-- gemini-3.1-prompt-strategies.md
|   |-- image-prompt-guide.md
|   |-- research-prompt-guide.md
|   |-- slide-prompt-guide.md
|   |-- expert-domain-priming.md
|   |-- context-engineering-collection.md
|   |
|   |-- prompt-engineering-guide/             # Skills 2.0 분할 모듈 (frontmatter + references)
|   |   |-- SKILL.md
|   |   `-- references/
|   |       |-- techniques.md
|   |       |-- frameworks.md
|   |       `-- examples.md
|   |
|   `-- prompt-variation-guide/               # 프롬프트 변형/A/B 전략 분할 모듈
|       |-- SKILL.md
|       `-- references/
|           |-- techniques.md
|           `-- examples.md
|
|-- commands/
|   |-- prompt.md                             # /prompt 메인 커맨드
|   |-- prompt-sync.md                        # /prompt-sync 동기화 허브
|   |-- auto-prompt.md                        # /auto-prompt 자동 생성기
|   |-- prompt-update.md                      # /prompt-update 통합 업데이트
|   `-- sync/                                 # 플랫폼별 sync 헬퍼
|       |-- prompt-sync-skills.md
|       |-- prompt-sync-gems.md
|       |-- prompt-sync-gpts.md
|       `-- prompt-sync-obsidian.md
|
|-- instructions/
|   |-- GPTs-Prompt-Generator.md              # GPTs Instructions (단일 파일)
|   |-- Gems-Prompt-Generator.md              # Gems Instructions (단일 파일)
|   `-- Gems-Prompt-Generator/                # Gems Instructions 분할 8개 모듈
|       |-- SKILL.md
|       |-- 01-mindset-constraints.md
|       |-- 02-role-model-rankings.md
|       |-- 03-element-expansion-expert-priming.md
|       |-- 04-workflow-detection-structuring.md
|       |-- 05-workflow-generation-output.md
|       |-- 06-gemini-guide-json-structures.md
|       |-- 07-references-final-reminder.md
|       `-- 08-changelog.md
|
`-- examples/
    |-- claude-4.5-examples.md
    |-- gpt-5.4-examples.md
    |-- image-generation-examples.md
    `-- hooks/block-text-overlay.sh   # 글자 후처리 차단 훅 (공냥 킷 연동, §9)
```

## 설치

### Claude Code — 통합본만 (간단)

```bash
git clone https://github.com/treylom/prompt-engineering-skills.git /tmp/pes
mkdir -p ~/.claude/skills ~/.claude/commands
cp /tmp/pes/skills/prompt-engineering-guide.md ~/.claude/skills/
cp /tmp/pes/commands/*.md ~/.claude/commands/
rm -rf /tmp/pes
```

### Claude Code — 전체 (통합본 + 분할 가이드 + 분할 모듈)

```bash
git clone https://github.com/treylom/prompt-engineering-skills.git /tmp/pes
mkdir -p ~/.claude/skills ~/.claude/commands

# 1) skills/: 통합본 + 분할 가이드 + 분할 모듈 디렉토리
cp /tmp/pes/skills/*.md ~/.claude/skills/ 2>/dev/null
cp -r /tmp/pes/skills/prompt-engineering-guide ~/.claude/skills/
cp -r /tmp/pes/skills/prompt-variation-guide ~/.claude/skills/

# 2) commands/: 메인 + sync 헬퍼
cp /tmp/pes/commands/*.md ~/.claude/commands/
cp -r /tmp/pes/commands/sync ~/.claude/commands/

# 3) instructions/: GPTs/Gems Instructions
mkdir -p ~/.claude/instructions
cp -r /tmp/pes/instructions/* ~/.claude/instructions/

rm -rf /tmp/pes
```

### Windows PowerShell — 통합본만

```powershell
git clone https://github.com/treylom/prompt-engineering-skills.git $env:TEMP\pes
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills", "$env:USERPROFILE\.claude\commands" | Out-Null
Copy-Item "$env:TEMP\pes\skills\prompt-engineering-guide.md" "$env:USERPROFILE\.claude\skills"
Copy-Item "$env:TEMP\pes\commands\*.md" "$env:USERPROFILE\.claude\commands"
Remove-Item -Recurse -Force "$env:TEMP\pes"
```

### GPTs / Gems

| 운영 모드 | 업로드할 Knowledge 파일 | Instructions |
|----------|---------------------|-------------|
| **단일 파일 모드** (간단) | `skills/prompt-engineering-guide.md` 1개 | `instructions/GPTs-Prompt-Generator.md` 또는 `instructions/Gems-Prompt-Generator.md` |
| **분할 파일 모드** (영역별 분리) | `skills/*.md` 중 필요한 분할 가이드 다수 | 동일 (Instructions가 분할 파일을 참조) |

GPTs는 Knowledge 파일 10개 한도가 있으므로, 모든 분할 가이드가 필요하면 핵심만 선택 업로드하거나 통합본을 사용하세요. Gems는 첨부 한도가 다르므로 분할 파일 전체 업로드도 가능합니다.

## 사용 시나리오별 선택 가이드

| 상황 | 권장 자산 |
|------|----------|
| Claude Code 신규 사용자, 빠른 설치 | 통합본 1개 (`skills/prompt-engineering-guide.md`) + commands |
| Claude Code 고급 사용자, Skills 2.0 분할 활용 | 통합본 + `skills/prompt-engineering-guide/` 분할 모듈 |
| GPTs Knowledge 한도 빡빡함 | 통합본 1개만 업로드 |
| GPTs에서 이미지·리서치만 별도 운영 | `image-prompt-guide.md` + `research-prompt-guide.md` 만 업로드 |
| Gems에 풍부한 분할 자산 모두 활용 | 분할 가이드 8개 + Instructions 분할 모듈 |

## 운영 규칙

- 통합본(`skills/prompt-engineering-guide.md`)을 권원으로 유지하고, 영역별 분할 가이드는 각 영역의 깊이 있는 참조용으로 동봉합니다.
- 모델별·영역별 업데이트는 통합본과 해당 분할 가이드를 함께 갱신합니다.
- `/prompt-sync` 및 `commands/sync/` 헬퍼는 권원 파일을 미러 경로와 배포 저장소로 동기화하는 용도로 사용합니다.

## English Summary

This repository ships both a canonical merged skill (`skills/prompt-engineering-guide.md`) and per-area split guides (`skills/*.md`) plus Skills 2.0 split-module directories. Pick the assets matching your environment: Claude Code installs prefer the merged file, GPTs Knowledge can use either the merged file or a curated subset of split guides, Gems can carry the full split set.

## License

MIT License. See [LICENSE](./LICENSE).
