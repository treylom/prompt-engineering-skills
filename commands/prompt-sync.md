# /prompt-sync - 프롬프트 생성기 시스템 동기화 에이전트

프롬프트 생성기 시스템(`prompt-engineering-skills/`)을 **SRC 구조 그대로** 로컬·vault·배포 repo 에 동기화합니다.

> **Version**: 5.1.0 | **Updated**: 2026-05-24
> **부모 Repo**: `<your-vault-repo>`
> **배포 Repo**: `treylom/prompt-engineering-skills`
> **원칙 (v5.0.0~)**: ~~프롬프트 스킬은 하나만 유지~~ → **SRC 구조(분야별 분할 가이드 + SKILL.md 포함)를 그대로 미러**. 2026-05-20 공개 repo 가 "분야별 분할"로 발전 → "분할 유지" 채택, "분리 스킬 제거" 단계 폐기.
> **v5.1.0 (public-safe paths)**: 개인 경로 리터럴(`/Users/<name>`·`/home/<name>`·Windows user) 제거 → **`$HOME` 상대 + glob 감지**로 일반화(공개 repo 노출 방지, Mac/WSL/일반 환경 모두 동작).
> **계승**: 환경 자동 감지(Mac/WSL/일반) + 도달 불가 타깃 skip + macOS bash 3.2 호환.
> **🚨 안전**: `.claude/skills`·`.claude/commands` 는 다른 스킬·명령이 공존하는 **공유 디렉터리** → **절대 `--delete` ❌** (additive만). `--delete` 는 전용 `prompt-engineering-skills/` 미러 디렉터리·deploy clone 에만.

$ARGUMENTS

---

## 실제 저장소 구조 (환경 무관 — ROOT 상대, 분할 구조 그대로)

```text
<ROOT>/                                     # 부모 repo (Mac/WSL/일반 자동 감지)
|-- prompt-engineering-skills/              # = SRC (분할 구조 그대로 미러)
|   |-- commands/ , instructions/ , skills/ , examples/ , README.md , LICENSE
|-- .claude/commands/   (prompt 관련 명령만 additive)
|-- .claude/skills/     (prompt 관련 스킬만 additive — 다른 스킬 보존)
`-- AI_Second_Brain/050-Prompt-Engineering/prompt-engineering-skills/
```

- **ROOT 감지**: Mac → `$HOME/<your-vault>` · WSL → `$HOME/AI` · 일반 → git repo root.
- **LIVE_VAULT 감지**: Mac → `$HOME/Documents/Second_Brain/Second_Brain` · WSL → `/mnt/c/Users/*/Documents/Obsidian/Second_Brain`(glob, user 하드코딩 회피) · 일반 → 없음(skip).

## 1-Shot Bash (cross-platform · public-safe paths · 분할 유지 · 공유 dir 보호)

```bash
set -uo pipefail
# --- 환경 자동 감지 (개인 경로 리터럴 없음: $HOME + glob) ---
if [[ "${OSTYPE:-}" == darwin* ]]; then
  ROOT="$HOME/<your-vault>"
  LIVE_VAULT="$HOME/Documents/Second_Brain/Second_Brain"
  EXTRA_MIRRORS=()
elif grep -qi microsoft /proc/version 2>/dev/null || [ -d /mnt/c ]; then   # WSL
  ROOT="$HOME/AI"
  LIVE_VAULT="$(ls -d /mnt/c/Users/*/Documents/Obsidian/Second_Brain 2>/dev/null | head -1)"
  EXTRA_MIRRORS=()
  [ -n "${LIVE_VAULT:-}" ] && EXTRA_MIRRORS+=("$LIVE_VAULT/prompt-engineering-skills/")
  for od in /mnt/c/Users/*/OneDrive/Desktop/AI; do [ -d "$od" ] && EXTRA_MIRRORS+=("$od/prompt-engineering-skills/"); done
else                                                                       # 일반 환경
  ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  LIVE_VAULT=""
  EXTRA_MIRRORS=()
fi
SRC="$ROOT/prompt-engineering-skills"
[ -d "$SRC" ] || { echo "[prompt-sync] SRC 없음: $SRC"; exit 1; }
echo "[prompt-sync] v5.1.0 ROOT=$ROOT LIVE_VAULT=${LIVE_VAULT:-<none>}"

# 1) 전체 미러 — 전용 prompt-engineering-skills 디렉터리만 --delete (부모 존재 가드)
MIRRORS=("$ROOT/AI_Second_Brain/050-Prompt-Engineering/prompt-engineering-skills/")
[ -n "${LIVE_VAULT:-}" ] && MIRRORS+=("$LIVE_VAULT/050-Prompt-Engineering/prompt-engineering-skills/")   # vault 루트 상대 (AI_Second_Brain prefix ❌ — 2026-06-10 중첩미러 fix)
[ ${#EXTRA_MIRRORS[@]} -gt 0 ] && MIRRORS+=("${EXTRA_MIRRORS[@]}")
for T in "${MIRRORS[@]}"; do
  if [ -d "$(dirname "$T")" ]; then
    rsync -a --delete --exclude='.git/' --exclude='.gitmodules' "$SRC/" "$T" && echo "mirror→ $T"
  else echo "skip(부모 미존재)→ $T"; fi
done

# 2) Claude Code 로컬 사본 — 공유 디렉터리이므로 ADDITIVE (--delete ❌, 다른 스킬/명령 보존)
mkdir -p "$ROOT/.claude/commands" "$ROOT/.claude/skills"
rsync -a "$SRC/commands/" "$ROOT/.claude/commands/"
rsync -a "$SRC/skills/"   "$ROOT/.claude/skills/"
# (v5.0.0~: "이전 분리 스킬 제거" 단계 폐기 — 분할 유지)

# 3) GPTs/Gems instructions 보조 사본 (ROOT + 도달 가능 LIVE_VAULT)
mkdir -p "$ROOT/AI_Second_Brain/050-Prompt-Engineering"
cp "$SRC/instructions/GPTs-Prompt-Generator.md" "$ROOT/AI_Second_Brain/050-Prompt-Engineering/GPTs-Prompt-Generator-Instructions.md"
cp "$SRC/instructions/Gems-Prompt-Generator.md" "$ROOT/AI_Second_Brain/050-Prompt-Engineering/Gems-Prompt-Generator-Instructions.md"
if [ -n "${LIVE_VAULT:-}" ] && [ -d "$LIVE_VAULT" ]; then
  for sub in "AI_Second_Brain/050-Prompt-Engineering" "Library/Prompt-Engineering"; do
    [ -d "$LIVE_VAULT/$(dirname "$sub")" ] || continue
    mkdir -p "$LIVE_VAULT/$sub"
    cp "$SRC/instructions/GPTs-Prompt-Generator.md" "$LIVE_VAULT/$sub/GPTs-Prompt-Generator-Instructions.md"
    cp "$SRC/instructions/Gems-Prompt-Generator.md" "$LIVE_VAULT/$sub/Gems-Prompt-Generator-Instructions.md"
  done
fi

# 4) 배포 repo 미러 (stage only — commit/push 는 공개레포라 diff 확인 + 시크릿/경로 검사 후 사용자 go)
DEPLOY=/tmp/pes-deploy/prompt-engineering-skills
if [ ! -d "$DEPLOY/.git" ]; then mkdir -p /tmp/pes-deploy; git clone https://github.com/treylom/prompt-engineering-skills.git "$DEPLOY"; fi
( cd "$DEPLOY" && git fetch -q origin master && git checkout -q master && git reset -q --hard origin/master )
rsync -a --delete --exclude='.git/' --exclude='.gitmodules' "$SRC/" "$DEPLOY/"
echo "[prompt-sync] deploy staged: $DEPLOY — git status/diff 확인 + 개인경로·시크릿 검사 후 commit/push (자동 push ❌)"
```

## 검증 (위 1-Shot 과 같은 셸)

```bash
echo "SRC skills/:"; ls -1 "$SRC/skills"
node -e "const fs=require('fs');const c=fs.readFileSync('$SRC/instructions/GPTs-Prompt-Generator.md','utf8');console.log('GPTs',c.length,c.length<=8000)"
git -C "$ROOT" status --short -- prompt-engineering-skills .claude/commands .claude/skills AI_Second_Brain/050-Prompt-Engineering
# 공개 push 전 개인경로 누출 검사 (0건이어야):
grep -rnE "/Users/[a-z_]+|/home/[a-z_]+|/mnt/c/Users/[A-Za-z0-9]+" /tmp/pes-deploy/prompt-engineering-skills --include='*.md' 2>/dev/null | grep -v '/Users/<' | head
( cd /tmp/pes-deploy/prompt-engineering-skills 2>/dev/null && git status --short )
```

## 완료 기준

- 환경(Mac/WSL/일반) 자동 감지, 도달 불가 타깃 에러 없이 skip.
- **개인 경로 리터럴 0** (공개 repo 노출 방지 — `$HOME`/glob 만 사용).
- SRC 의 분할 구조가 미러·로컬에 그대로 반영(단일 강제 ❌).
- `.claude/skills`·`.claude/commands` 의 prompt 외 다른 스킬/명령 보존(additive).
- 배포 repo push 전 diff + 개인경로 + 시크릿 검사 + 사용자 go(자동 push ❌).
- GPTs instructions 8000자 이하.
