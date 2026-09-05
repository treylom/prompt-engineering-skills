---
name: prompt-sync-obsidian
description: Use when needing 프롬프트 동기화 (Obsidian). 프롬프트 생성기 결과물을 Obsidian vault에 저장.
---

# Obsidian 동기화 전용 스킬

GitHub의 GPTs/Gems 최신본을 Obsidian vault에 동기화합니다.

> **Version**: 1.1.0 | **Updated**: 2025-12-28

## 동기화 대상

| GitHub 원본 | Obsidian 대상 |
|------------|--------------|
| `instructions/GPTs-Prompt-Generator.md` | `Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md` |
| `instructions/Gems-Prompt-Generator.md` | `Prompt-Engineering/Gems-Prompt-Generator-Instructions.md` |

## 워크플로우

1. **GitHub 최신본 읽기**: Read 도구로 원본 파일 읽기
2. **Obsidian 기존본 읽기**: Obsidian CLI read → MCP fallback → Read 도구 fallback
3. **변경 사항 식별**: 버전, 섹션별 차이점 파악
4. **업데이트 적용**: Edit 도구 (surgical edit) → CLI read-modify-overwrite → Write 도구 fallback

### Obsidian 도구 우선순위 (2-Tier Fallback)

```bash
OBSIDIAN_CLI="/mnt/c/Program Files/Obsidian/Obsidian.com"
```

| 작업 | Tier 1: CLI | Tier 2: 파일 도구 |
|------|------------|-------------------|
| 읽기 | `"$OBSIDIAN_CLI" read path="{path}"` | `Read(file_path)` |
| Surgical edit | read-modify-overwrite 로 우회 | `Edit(file_path)` (아래 참조) |
| 전체 교체 | `"$OBSIDIAN_CLI" create path="{path}" content="{new}"` | `Write(file_path)` |

> **Note**: 이 플러그인은 surgical text replacement(oldText→newText)용 MCP 도구를 사용하지 않음 — Obsidian CLI/파일 쓰기로 대체. 부분 수정은 `Edit` 도구가 1순위이고, CLI는 read-modify-overwrite 패턴으로 우회합니다.

## 동기화 패턴 (CRITICAL)

### Surgical Edit: Edit 도구 방식 (1순위)

노트 히스토리 보존을 위해 변경 사항만 적용합니다.
이 플러그인은 Obsidian MCP 도구를 사용하지 않음 — Obsidian CLI/파일 쓰기로 대체.

```
1. Read("<vault>/Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md")
2. Edit(file_path=위 경로, old_string="> **Version**: 3.8.1", new_string="> **Version**: 4.0.0")
3. Edit(file_path=위 경로, old_string="이전 섹션 내용", new_string="새로운 섹션 내용")
```

### CLI read-modify-overwrite 패턴 (2순위)

```bash
OBSIDIAN_CLI="/mnt/c/Program Files/Obsidian/Obsidian.com"

# 1. CLI로 현재 내용 읽기
"$OBSIDIAN_CLI" read path="Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md"

# 2. 내용을 수정하여 CLI create로 덮어쓰기
"$OBSIDIAN_CLI" create path="Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md" content="[수정된 전체 내용]"
```

### CLI도 실패 시: Edit/Write 도구 fallback (3순위)

```
# 부분 수정
Edit(file_path="<vault>/Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md",
     old_string="...", new_string="...")

# 전체 교체
Write(file_path="<vault>/Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md",
      content="[새로운 전체 내용]")
```

### 전체 교체가 필요한 경우

구조가 크게 변경되어 부분 업데이트가 어려운 경우:

**방법 1: Write 도구로 전체 덮어쓰기**
```
Write(file_path="<vault>/Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md",
      content="[새로운 전체 내용]")
```

**방법 2: CLI create로 덮어쓰기**
```bash
"$OBSIDIAN_CLI" create path="Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md" content="[새로운 전체 내용]"
```

**방법 3: 섹션별 순차 업데이트**
- 헤더 기준으로 섹션 분리
- 각 섹션을 개별 edit으로 적용

### 적용 전 확인

적용 전 Read로 현재 내용을 확인한다(Edit 도구는 dryRun 미지원 — old_string 유일 매칭 여부를 직접 확인).

## 주의사항

### oldText 매칭 규칙
- **정확히 일치**해야 함 (공백, 줄바꿈 포함)
- 줄바꿈은 `\n`으로 표현
- 탭/스페이스 차이 주의

### 대규모 변경 시 전략
1. 버전 번호 먼저 업데이트
2. 주요 섹션 헤더 변경
3. 섹션 내용 순차 업데이트
4. Changelog 추가

## Obsidian Vault 경로 규칙 (CRITICAL)

**Vault root = `Second_Brain` 폴더**

```
✅ 올바른 경로:
   Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md

❌ 잘못된 경로:
   Second_Brain/Prompt-Engineering/...  (중첩 폴더 생성됨!)
```

## 동기화 옵션

- **전체**: GPTs + Gems 모두 동기화
- **GPTs만**: GPTs-Prompt-Generator만 동기화
- **Gems만**: Gems-Prompt-Generator만 동기화

---

## Metadata

- **Version**: 1.1.0
- **Changes v1.1.0**:
  - delete→create 패턴에서 update_note 방식으로 전환
  - dryRun 테스트 방법 추가
  - oldText 매칭 규칙 및 주의사항 추가
