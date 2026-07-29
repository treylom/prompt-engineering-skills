#!/usr/bin/env node
/**
 * prompt-output-gate.mjs — /prompt 산출물 코드 게이트
 *
 * 의존성 0 (node 표준 모듈만). 공냥 킷 `check_prompt.mjs` 패턴 참조 — 킷 자체는 무수정.
 *
 * 사용법
 *   node scripts/prompt-output-gate.mjs <파일>                 # 산출 텍스트 판정
 *   cat out.md | node scripts/prompt-output-gate.mjs -         # stdin 판정
 *   node scripts/prompt-output-gate.mjs --check-versions       # 리포 버전 표기 정합
 *   node scripts/prompt-output-gate.mjs --test                 # fixture 셀프테스트
 *
 * 플래그
 *   --mode interactive|auto|batch     기본 interactive
 *   --purpose text|image|video|research  미지정 시 본문에서 추정
 *   --json                            결과를 JSON 으로 출력
 *
 * 종료코드
 *   0 = PASS       모든 판정 축 통과
 *   1 = FAIL       하나 이상 축 위반 (축별 사유 stdout)
 *   2 = UNMEASURED 잴 수 없었음 (빈 입력·파일 부재·목적 판별 실패 등)
 *                  ⚠️ 2 를 통과로 취급하지 말 것. 안 잰 것은 통과가 아니다.
 *
 * 판정 축
 *   A1 five_options   5가지 옵션 전건 (interactive 전용 — auto/batch 는 구조적 면제)
 *   A2 expert_anchor  전문가 지명 (대원칙 §1) — 목적별 판정
 *   A3 target_line    "타겟: <모델>" 1줄 (대원칙 §2)
 *   A4 kit_ar         image + gpt-image 타겟일 때 킷 포맷 끝 `AR x:y`
 *   A5 version_sync   instructions/ 버전 표기 ↔ plugin.json  (--check-versions 전용)
 *
 * ⚠️ 이 게이트가 재는 것은 **구조**다. "그 이름이 실존 인물인가", "그 어휘가 충분히
 *    구체적인가" 같은 의미 판정은 정규식의 사정거리 밖이라 note 로만 고지한다.
 *    음성 결과는 "없다" 가 아니라 "이 도구로는 안 보인다" 로 적는다.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");

/* ── 판정 결과 3값 ───────────────────────────────────────── */
const PASS = "pass", FAIL = "fail", UNMEASURED = "unmeasured";

const axis = (id, name, status, msg, note) => ({ id, name, status, msg, ...(note ? { note } : {}) });

/* ── A1: 5가지 옵션 ──────────────────────────────────────────
   번호가 아니라 라벨로 잡는다. 실제 결함(에이전트 모드 누락)은 5번 라벨의
   부재로 나타나고, 번호만 세면 "16:9" 의 1·9 같은 숫자에 오염된다. */
const OPTION_LABELS = [
  { n: 1, name: "바로 실행", re: /바로\s*실행|즉시\s*실행/ },
  { n: 2, name: "자동 개선", re: /자동\s*개선/ },
  { n: 3, name: "직접 개선", re: /직접\s*(?:개선|수정)/ },
  { n: 4, name: "기타", re: /기타/ },
  { n: 5, name: "에이전트 모드", re: /에이전트\s*모드/ },
];

function checkFiveOptions(text, mode) {
  if (mode !== "interactive") {
    return axis("A1", "five_options", PASS,
      `면제 — ${mode} 모드는 5옵션 제시가 구조적으로 배제됨(사용자 대기 없음)`);
  }
  const missing = OPTION_LABELS.filter((o) => !o.re.test(text));
  if (missing.length === 0) return axis("A1", "five_options", PASS, "5가지 옵션 전건 존재");
  return axis("A1", "five_options", FAIL,
    `옵션 ${missing.length}개 누락: ${missing.map((m) => `${m.n}번 "${m.name}"`).join(" · ")}`);
}

/* ── A2: 전문가 지명 (대원칙 §1) ───────────────────────────── */
const ROLE_RE = /<role>\s*당신은\s*([^<\n]+?)\s*입니다/;
// 지명이 아니라 자리표시자·빈 수사인 경우
const PLACEHOLDER_RE = /^(?:\[?[^\]]*전문가[^\]]*\]?|최고의?\s*\S*|뛰어난\s*\S*|훌륭한\s*\S*|숙련된\s*\S*|해당\s*분야\s*\S*|X|OOO|___+)$/;
const EMPTY_RHETORIC_RE = /전문가처럼|최고급|프로처럼|고퀄리티/;

const IMG_SLOT_RE = /(?:Director\s+signature|Lens\s+character)\s*[:：]\s*\S/i;
const IMG_SECTION_RE = [/Camera\s*[:：]\s*\S/i, /Lighting\s*[:：]\s*\S/i, /Colou?r\s+grading\s*[:：]\s*\S/i];
const VIDEO_NAME_RE = /(?:"?cinematographer"?\s*[:：]\s*"?([^",\n}]+)|시네마토그래퍼\s*[:：]?\s*([^\n,]+)|촬영감독\s*[:：]?\s*([^\n,]+))/i;

function checkExpertAnchor(text, purpose) {
  const semanticNote =
    "구조만 판정함 — 지명된 이름이 실존 인물인지, 시각 어휘가 충분히 구체적인지는 이 도구로는 안 보임";

  if (purpose === "image") {
    const slot = IMG_SLOT_RE.test(text);
    const sections = IMG_SECTION_RE.filter((re) => re.test(text)).length;
    const hasRoleName = ROLE_RE.test(text);
    if (slot || sections >= 2) {
      return axis("A2", "expert_anchor", PASS,
        slot ? "시각 언어 앵커 슬롯 존재(Director signature / Lens character)"
             : `시각 어휘 섹션 ${sections}/3 존재(Camera·Lighting·Color grading)`,
        semanticNote);
    }
    if (hasRoleName) {
      return axis("A2", "expert_anchor", FAIL,
        "이름 지명만 있고 시각 언어 앵커가 없음 — 이미지는 `Director signature:`·`Lens character:` 슬롯 또는 Camera·Lighting·Color grading 구체 어휘가 있어야 충족(대원칙 §1)");
    }
    return axis("A2", "expert_anchor", FAIL, "전문가 앵커 부재 — 시각 언어 앵커도 role 지명도 없음");
  }

  if (purpose === "video") {
    const m = text.match(VIDEO_NAME_RE);
    const name = m ? (m[1] || m[2] || m[3] || "").trim() : "";
    if (name && !PLACEHOLDER_RE.test(name)) {
      return axis("A2", "expert_anchor", PASS, `시네마토그래퍼 지명 존재: "${name}"`, semanticNote);
    }
    if (m) {
      return axis("A2", "expert_anchor", FAIL,
        `시네마토그래퍼 칸은 있으나 지명이 자리표시자/빈 값: "${name}"`);
    }
    return axis("A2", "expert_anchor", FAIL, "시네마토그래퍼 지명 부재(대원칙 §1)");
  }

  // text / research
  const m = text.match(ROLE_RE);
  if (!m) {
    return axis("A2", "expert_anchor", FAIL,
      "`<role>당신은 [전문가명]입니다` 정규 패턴 부재(대원칙 §1)");
  }
  const name = m[1].trim();
  if (PLACEHOLDER_RE.test(name)) {
    return axis("A2", "expert_anchor", FAIL,
      `role 은 있으나 실존 인물 지명이 아니라 자리표시자: "${name}" — 전문가는 *지명*해야 함`);
  }
  const rhetoric = text.match(EMPTY_RHETORIC_RE);
  return axis("A2", "expert_anchor", PASS, `role 지명 존재: "${name}"`,
    rhetoric ? `${semanticNote} · 빈 수사 감지("${rhetoric[0]}") — 구체 어휘로 환원 권장` : semanticNote);
}

/* ── A3: 타겟 모델 1줄 (대원칙 §2) ─────────────────────────── */
const TARGET_LINE_RE = /(?:^|\n)\s*(?:\*\*)?타겟(?:\*\*)?\s*[:：]\s*(\S[^\n]*)/;
const TARGET_JSON_RE = /"target_model"\s*:\s*"([^"]+)"/;

function checkTargetLine(text) {
  const m = text.match(TARGET_LINE_RE) || text.match(TARGET_JSON_RE);
  if (!m) {
    return axis("A3", "target_line", FAIL,
      '타겟 모델 명시 부재 — 산출에 `타겟: <모델>` 1줄(또는 JSON `target_model`)이 있어야 함(대원칙 §2)');
  }
  const v = m[1].trim();
  if (!v || PLACEHOLDER_RE.test(v) || /^<.*>$/.test(v)) {
    return axis("A3", "target_line", FAIL, `타겟 칸은 있으나 값이 자리표시자: "${v}"`);
  }
  return axis("A3", "target_line", PASS, `타겟 명시: "${v}"`);
}

/* ── A4: 킷 포맷 끝 AR (image + gpt-image 타겟) ─────────────── */
const GPT_IMAGE_RE = /gpt-image(?:-2)?|\$imagegen/i;
// 줄 시작 앵커 ❌ — 킷 포맷 B(화보 콤마형)는 한 문단 끝에 `AR x:y` 가 이어 붙는다.
const AR_TAIL_RE = /\bAR\s+\d{1,2}\s*:\s*\d{1,2}\s*$/;
const FENCE_RE = /```([^\n]*)\n([\s\S]*?)```/g;

/**
 * 프롬프트 본문 블록 추출.
 *
 * A4 는 "산출 문서의 끝"이 아니라 "프롬프트 블록의 끝"을 봐야 한다.
 * interactive 모드는 프롬프트 뒤에 5옵션 메뉴가 **반드시** 오므로(A1 이 그걸 요구한다),
 * 문서 tail 을 보면 A1 과 A4 가 구조적으로 상충해 A4 가 영구 FAIL 이 된다.
 * (2026-07-29 실전 1호 오탐 — fixture 에 interactive+image 양성 케이스가 없어
 *  셀프테스트 전건 통과 상태로 실물에서 터졌다.)
 */
function extractPromptBlock(text) {
  const fences = [...text.matchAll(FENCE_RE)];
  if (!fences.length) return null;
  const textFences = fences.filter((m) => /^\s*text\s*$/i.test(m[1]));
  const pool = textFences.length ? textFences : fences;
  return pool[pool.length - 1][2];
}

function checkKitAr(text, purpose) {
  if (purpose !== "image") {
    return axis("A4", "kit_ar", PASS, `면제 — purpose=${purpose} 는 킷 포맷 대상이 아님`);
  }
  if (!GPT_IMAGE_RE.test(text)) {
    return axis("A4", "kit_ar", PASS,
      "면제 — gpt-image-2/$imagegen 타겟이 아님(웹 UI·Gemini Image 경로는 JSON 이 정본, 킷 규격 강제 ❌)");
  }
  const block = extractPromptBlock(text);
  const scope = (block === null ? text : block).replace(/\s+$/, "");
  const where = block === null ? "문서 tail(코드펜스 없음 — fallback)" : "프롬프트 코드펜스 블록 tail";
  if (AR_TAIL_RE.test(scope)) {
    return axis("A4", "kit_ar", PASS, `킷 포맷 끝 \`AR x:y\` 토큰 존재 — 검사 범위: ${where}`);
  }
  return axis("A4", "kit_ar", FAIL,
    `gpt-image 타겟인데 \`AR x:y\` 토큰 부재 — 킷 포맷 A/B 는 프롬프트 본문 끝에 AR 이 와야 함 (검사 범위: ${where})`);
}

/* ── A5: 버전 표기 정합 (--check-versions) ─────────────────── */
const VERSION_SOURCES = [
  { path: ".claude-plugin/plugin.json", re: /"version"\s*:\s*"([^"]+)"/, label: "plugin.json (Claude)" },
  { path: ".codex-plugin/plugin.json", re: /"version"\s*:\s*"([^"]+)"/, label: "plugin.json (Codex — Works가 버전 판단에 쓰는 매니페스트, 2026-07-29 5회 bump 방치 실증)" },
  { path: "instructions/GPTs-Prompt-Generator.md", re: /\*\*Version\*\*\s*[:：]\s*([0-9][^\s|]*)/, label: "GPTs 지침" },
  { path: "instructions/Gems-Prompt-Generator.md", re: /\*\*Version\*\*\s*[:：]\s*([0-9][^\s|]*)/, label: "Gems 지침" },
  { path: "instructions/Gems-Prompt-Generator/SKILL.md", re: /\*\*Version\*\*\s*[:：]\s*([0-9][^\s|]*)/, label: "Gems 디렉터리판 SKILL" },
  { path: "instructions/Gems-Prompt-Generator/08-changelog.md", re: /\*\*Version\*\*\s*[:：]\s*([0-9][^\s|]*)/, label: "Gems 디렉터리판 changelog" },
];

function checkVersionSync(root) {
  const found = [], missing = [];
  for (const src of VERSION_SOURCES) {
    const p = join(root, src.path);
    if (!existsSync(p)) { missing.push(src); continue; }
    const m = readFileSync(p, "utf8").match(src.re);
    if (!m) { missing.push(src); continue; }
    found.push({ ...src, version: m[1].trim() });
  }
  if (found.length === 0) {
    return axis("A5", "version_sync", UNMEASURED,
      `버전 표기를 한 곳도 읽지 못함 — 리포 루트가 맞는지 확인 필요(${root})`);
  }
  const detail = found.map((f) => `${f.label}=${f.version}`).join(" · ");
  if (missing.length) {
    return axis("A5", "version_sync", UNMEASURED,
      `일부 파일에서 버전 표기를 못 읽음: ${missing.map((m) => m.label).join(" · ")} — 부분 결과로 정합 판정 불가`,
      `읽힌 것: ${detail}`);
  }
  const uniq = [...new Set(found.map((f) => f.version))];
  if (uniq.length === 1) return axis("A5", "version_sync", PASS, `버전 표기 ${found.length}곳 전부 ${uniq[0]}`);
  return axis("A5", "version_sync", FAIL, `버전 표기 불일치 (${uniq.join(" ≠ ")}) — ${detail}`);
}

/* ── 목적 추정 ────────────────────────────────────────────── */
function detectPurpose(text) {
  if (/"scenes"\s*:|스토리보드|cinematographer|시네마토그래퍼|Veo|Sora|Kling/i.test(text)) return "video";
  if (/aspect_ratio|Director\s+signature|Lens\s+character|gpt-image|\$imagegen|(?:^|\n)\s*AR\s+\d+\s*:/i.test(text)) return "image";
  if (/팩트체크|IFCN|StructuredResearch|리서치\s*개요/i.test(text)) return "research";
  if (/<role>|<task>|<constraints>/i.test(text)) return "text";
  return null;
}

/* ── 실행 ────────────────────────────────────────────────── */
function evaluate(text, { mode, purpose }) {
  const axes = [
    checkFiveOptions(text, mode),
    checkExpertAnchor(text, purpose),
    checkTargetLine(text),
    checkKitAr(text, purpose),
  ];
  return axes;
}

function verdict(axes) {
  if (axes.some((a) => a.status === FAIL)) return { code: 1, label: "FAIL" };
  if (axes.some((a) => a.status === UNMEASURED)) return { code: 2, label: "UNMEASURED" };
  return { code: 0, label: "PASS" };
}

function report(axes, meta, asJson) {
  const v = verdict(axes);
  if (asJson) {
    console.log(JSON.stringify({ verdict: v.label, exit_code: v.code, ...meta, axes }, null, 2));
    return v.code;
  }
  const mark = { [PASS]: "PASS", [FAIL]: "FAIL", [UNMEASURED]: "UNMEASURED" };
  console.log(`prompt-output-gate — ${v.label}`);
  if (meta.mode || meta.purpose) console.log(`  mode=${meta.mode ?? "-"} purpose=${meta.purpose ?? "-"}${meta.source ? ` source=${meta.source}` : ""}`);
  console.log("");
  for (const a of axes) {
    console.log(`  [${mark[a.status].padEnd(10)}] ${a.id} ${a.name}`);
    console.log(`               ${a.msg}`);
    if (a.note) console.log(`               ↳ note: ${a.note}`);
  }
  console.log("");
  if (v.code === 2) console.log("  ⚠️ UNMEASURED 는 통과가 아닙니다. 안 잰 축을 통과로 기록하지 마세요.");
  return v.code;
}

function readStdin() {
  try { return readFileSync(0, "utf8"); } catch { return ""; }
}

/* ── fixture 셀프테스트 ───────────────────────────────────── */
function runTest() {
  const manifestPath = join(SCRIPT_DIR, "fixtures", "prompt-gate", "manifest.json");
  if (!existsSync(manifestPath)) {
    console.log(`UNMEASURED — fixture manifest 부재: ${manifestPath}`);
    return 2;
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const base = dirname(manifestPath);
  let fails = 0, ran = 0;

  console.log("prompt-output-gate 셀프테스트");
  console.log("  (양성 대조 = PASS 케이스가 실제로 통과하는가 · 축 격리 = FAIL 케이스가 지정 축에서만 걸리는가)\n");

  for (const c of manifest.cases) {
    const p = join(base, c.file);
    if (!existsSync(p)) { console.log(`  [MISSING ] ${c.file}`); fails++; ran++; continue; }
    const text = readFileSync(p, "utf8");
    const purpose = c.purpose ?? detectPurpose(text);
    const axes = evaluate(text, { mode: c.mode ?? "interactive", purpose });
    const v = verdict(axes);
    const failed = axes.filter((a) => a.status === FAIL).map((a) => a.id).sort();
    const want = (c.expectFailAxes ?? []).slice().sort();

    const verdictOk = v.label === c.expect.toUpperCase();
    const axesOk = JSON.stringify(failed) === JSON.stringify(want);
    const ok = verdictOk && axesOk;
    if (!ok) fails++;
    ran++;

    console.log(`  [${ok ? "OK  " : "FAIL"}] ${c.file}`);
    console.log(`         기대 ${c.expect.toUpperCase()} / 축 [${want.join(",") || "-"}]  ←→  실제 ${v.label} / 축 [${failed.join(",") || "-"}]`);
    if (!ok && !axesOk) {
      const extra = failed.filter((x) => !want.includes(x));
      const short = want.filter((x) => !failed.includes(x));
      if (extra.length) console.log(`         ⚠️ 축 오염 — 의도치 않게 걸린 축: ${extra.join(",")}`);
      if (short.length) console.log(`         ⚠️ 미검출 — 걸려야 하는데 안 걸린 축: ${short.join(",")}`);
    }
  }

  // A5 는 리포 상태에 의존하므로 별도 1회
  const a5 = checkVersionSync(REPO_ROOT);
  console.log(`\n  [${a5.status === PASS ? "OK  " : a5.status === FAIL ? "FAIL" : "UNM "}] A5 version_sync (리포 실제 상태)`);
  console.log(`         ${a5.msg}`);
  if (a5.status === FAIL) fails++;

  console.log(`\n  ${ran + 1}건 실행 · 실패 ${fails}건`);
  return fails ? 1 : 0;
}

/* ── CLI ─────────────────────────────────────────────────── */
const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : dflt;
};
const has = (name) => argv.includes(`--${name}`);

if (has("help") || argv.length === 0) {
  console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].replace(/^\/\*\*?/, "").replace(/^ \* ?/gm, ""));
  process.exit(0);
}

if (has("test")) process.exit(runTest());

if (has("check-versions")) {
  const a5 = checkVersionSync(flag("repo-root", REPO_ROOT));
  process.exit(report([a5], { source: flag("repo-root", REPO_ROOT) }, has("json")));
}

const target = argv.find((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--mode" && argv[argv.indexOf(a) - 1] !== "--purpose" && argv[argv.indexOf(a) - 1] !== "--repo-root");
let text = "", source = "";
if (target === "-" || (!target && !process.stdin.isTTY)) { text = readStdin(); source = "stdin"; }
else if (target) {
  if (!existsSync(target)) {
    console.log(`prompt-output-gate — UNMEASURED\n  입력 파일 없음: ${target}`);
    process.exit(2);
  }
  text = readFileSync(target, "utf8"); source = target;
} else {
  console.log("prompt-output-gate — UNMEASURED\n  입력 없음 (파일 인자 또는 stdin 필요)");
  process.exit(2);
}

if (!text.trim()) {
  console.log(`prompt-output-gate — UNMEASURED\n  입력이 비어 있음: ${source}`);
  process.exit(2);
}

const mode = flag("mode", "interactive");
let purpose = flag("purpose", null) ?? detectPurpose(text);
if (!purpose) {
  console.log(`prompt-output-gate — UNMEASURED\n  목적(purpose)을 판별하지 못했습니다 — --purpose text|image|video|research 로 명시하세요.\n  source=${source}`);
  process.exit(2);
}

process.exit(report(evaluate(text, { mode, purpose }), { mode, purpose, source }, has("json")));
