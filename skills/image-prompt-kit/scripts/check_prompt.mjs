#!/usr/bin/env node
// 공냥 프롬프트 킷 검증기 (킷 v3.x 동봉) — SPEC-FREEZE-v2 동결 스펙 준수. zero-dependency Node ESM.
// 사용: node check_prompt.mjs <file> (stdin 파이프 가능) | --jsonl <file> | --tier <0|1|2> | --api | --test
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SIZE_WHITELIST = ["1024x1024","1536x1024","1024x1536","1792x1024","1024x1792","2048x2048"];
// 21:9는 사이즈락 6종 밖(codex 실측 기록 전용) — --api 모드에서만 ar↔size 정합 검사용으로 존재
const AR_SIZE_MAP = { "1:1":["1024x1024","2048x2048"], "2:3":["1024x1536"], "3:4":["1024x1536"],
  "4:5":["1024x1536"], "3:2":["1536x1024"], "4:3":["1536x1024"], "16:9":["1792x1024"], "9:16":["1024x1792"],
  "21:9":["2048x896"] };
const QUALITY_ENUM = ["high","medium","low"];
const CATEGORY_RE = /^C([1-9]|1[0-2])$/;
const HARD = { maxEdge:3840, multiple:16, maxRatio:3, minPx:655360, maxPx:8294400 };
const TIER1 = ["verbatim, no extra characters","no duplicate text","no invented glyphs","no extra words","no extra text","no watermark","no logo"];
const TAIL = ["no nudity","no nipple or genital exposure","no wardrobe malfunction","no extra people","no text","no watermark"];
const TAIL_ONLY = TAIL.slice(0, 4); // Tier-2 전용 항목 — 이게 있어야 tail로 간주
const ANCHORS = [/25\+/, /original character/i, /fully opaque/i, /covered (?:chest|bust)/i, /editorial upright/i];
const REWRITE_MAP = {
  "no people": "빈 배경, 인물 없는 구성", "no text": "텍스트 없음(한국어 긍정형)", "no watermark": "브랜드 없는 클린 마감",
  "no logo": "로고 없는 클린 마감", "no background": "단색 스튜디오 배경", "no blur": "엣지까지 또렷한 포커스",
  "no shadow": "균등광의 평면 조명", "without": "뺄 요소 대신 원하는 요소만 서술", "avoid": "피할 상태 대신 원하는 상태를 서술",
};
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const err = (list, code, msg, hint) => list.push(hint ? { code, msg, hint } : { code, msg });
const quotesOf = (p) => [...p.matchAll(/"([^"\n]+)"|“([^”\n]+)”/g)].map((m) => (m[1] ?? m[2]).replace(/\s+/g, " ").trim());

function localFailureTokens() { // editorial-hwabo.local.md의 FAILURE_TOKENS: 라인 — 없으면 조용히 무시
  try {
    const md = readFileSync(resolve(SCRIPT_DIR, "../references/editorial-hwabo.local.md"), "utf8");
    const line = md.split(/\r?\n/).find((l) => l.startsWith("FAILURE_TOKENS:"));
    return line ? line.slice(15).split(",").map((s) => s.trim()).filter(Boolean) : [];
  } catch { return []; }
}

function detectFormat(p) {
  const labels = p.match(/(?:Scene|Camera|Lighting|Color grading|Texture\/Medium|Text-in-image)\s*:/g);
  if (labels && labels.length >= 3) return "A";
  const hex = (p.match(/#[0-9A-Fa-f]{6}/g) || []).length;
  if ((/팔레트/.test(p) || hex >= 3) && /AR\s+\d+\s*:\s*\d+$/i.test(p)) return "B";
  return "A";
}

function checkNegatives(p, tier, renderText, errors, warnings) {
  if (/\bNegative\s*:/i.test(p)) err(errors, "E-NEG-SECTION", "`Negative:` 섹션 금지 — 전부 긍정형 서술로.");
  let scan = p.replace(/negative\s+space/gi, ""); // 디자인 여백 용어는 허용
  const alt = TAIL.map(esc).join("|");
  const runs = [...scan.matchAll(new RegExp(`(?:${alt})(?:\\s*,\\s*(?:${alt}))*`, "gi"))].map((m) => ({ str: m[0], idx: m.index }));
  const t2 = runs.filter((r) => TAIL_ONLY.some((it) => r.str.toLowerCase().includes(it)));
  if (t2.length) {
    if (tier !== 2) err(errors, "E-NEG-TIER", "티어 미선언 상태에서 Tier-2 NEGATIVE_TAIL 사용 — `--tier 2`(또는 jsonl tier/lane) 명시 선언 시에만 허용, 추론 승격 금지.");
    else {
      if (t2.length > 1) err(errors, "E-TIER2-DUP", "NEGATIVE_TAIL이 2회 이상 — 정확히 1회만.");
      const r = t2[t2.length - 1];
      let last = -1;
      for (const it of r.str.split(/\s*,\s*/).map((s) => s.toLowerCase().trim())) {
        const i = TAIL.indexOf(it);
        if (i <= last) { err(errors, "E-TIER2-EXTRA", "tail은 캐노니컬 고정 순서의 부분집합만 허용 — 항목 추가·중복·순서 변경 금지."); break; }
        last = i;
      }
      const after = scan.slice(r.idx + r.str.length);
      if (/^\s*,\s*no\s+[A-Za-z]/i.test(after)) err(errors, "E-TIER2-EXTRA", "캐노니컬 외 항목이 tail에 추가됨 — 항목 삭제만 허용.");
      else if (!/^[\s.,]*AR\s+\d+\s*:\s*\d+\s*$/i.test(after)) err(errors, "E-TIER2-POS", "NEGATIVE_TAIL은 트레일링 `AR x:y` 직전 마지막 절이어야 함.");
      if (ANCHORS.filter((a) => a.test(p)).length < 3)
        err(errors, "E-TIER2-PAIR", "tail 단독 금지 — SAFETY_ASSERT 앵커(25+/original character/fully opaque/covered chest/editorial upright) 3개 이상과 페어.");
    }
    for (const r of t2) scan = scan.replace(r.str, " ");
  }
  const t1 = TIER1.filter((ph) => scan.toLowerCase().includes(ph));
  if (t1.length) {
    if (tier < 1) err(errors, "E-NEG-TIER", `티어 0에서 Tier-1 화이트리스트 문구 사용(${t1.join("; ")}) — --tier 1 선언 필요.`);
    else if (!renderText) err(errors, "E-NEG-TIER", "렌더 텍스트(따옴표 카피)가 없는데 Tier-1 문구 사용 — 렌더 텍스트가 실제로 있을 때만 유효.");
    for (const ph of t1) scan = scan.replace(new RegExp(esc(ph), "gi"), " ");
  }
  // 한국어 지시형 부정문(경고) — 상태 서술형("텍스트 없음")은 독트린상 긍정형으로 허용, 지시형만 잡는다
  const koNeg = scan.match(/[가-힣A-Za-z0-9 ]{0,12}(?:금지|하지 ?마|하지 않|없어야|없도록|제외하고|빼고)/g);
  if (koNeg) {
    const uniqKo = [...new Set(koNeg.map((s) => s.trim()))].slice(0, 3);
    err(warnings, "W-NEG-KO", `한국어 지시형 부정문 감지(${uniqKo.join(" / ")}) — 장면 배제는 긍정형 재서술(철칙 #2)이 안전(예: "군중 제외하고" → "인물 한 명, 단독").`);
  }
  const neg = scan.match(/\b(?:no|without|avoid|exclude|never|free of|devoid of|do not|don't)\s+[A-Za-z][A-Za-z'-]*(?:\s+[A-Za-z'-]+)?/gi);
  if (neg) {
    const uniq = [...new Set(neg.map((s) => s.toLowerCase().trim()))].slice(0, 5);
    const w = uniq[0].split(/\s+/);
    const to = REWRITE_MAP[w.slice(0, 2).join(" ")] || REWRITE_MAP[w[0]] || "빼려는 요소 대신 원하는 결과 상태를 구체 명사로 서술";
    err(errors, "E-NEG-001", `화이트리스트 밖 영어 부정문 금지(${uniq.join(", ")}…) — 전부 긍정형으로.`, `긍정형 재작성 제안: "${uniq[0]}" → ${to}`);
  }
}

function validateText(raw, opts = {}, rec = null) {
  const errors = [], warnings = [];
  const p = raw.replace(/^﻿/, "").trim();
  const has = (re) => re.test(p);
  const format = rec && (rec.format === "A" || rec.format === "B") ? rec.format : detectFormat(p);
  const quotes = quotesOf(p);
  const renderText = quotes.length > 0 || /Text-in-image\s*:/.test(p) || !!(rec && rec.korean_copy);
  const tier = [0, 1, 2].includes(opts.tier) ? opts.tier // Tier-2는 명시 선언만 — 휴리스틱 승격 불가
    : rec && [0, 1, 2].includes(rec.tier) ? rec.tier
    : rec && rec.lane === "editorial" ? 2 : renderText ? 1 : 0;

  if (!/AR\s+\d+\s*:\s*\d+$/i.test(p)) err(errors, "E-AR-END", "끝에 `AR 3:4` 형태의 종횡비 토큰이 없음(반드시 프롬프트 맨 끝).");
  const hexCount = (p.match(/#[0-9A-Fa-f]{6}/g) || []).length;
  if (format === "A") { // v1 4대 섹션-언어 체크 유지
    if (p.length < 220) err(warnings, "W-SHORT-A", "프롬프트가 짧음 — 프로덕션 프롬프트는 구체 시각 명세가 더 필요.");
    if (!has(/(Scene:|한국|포스터|카드뉴스|도감|목업|아이콘|웹툰|만화|제품|패션|뷰티|인포그래픽)/)) err(errors, "E-CAT-LANG", "첫 절에 매체/카테고리(결과물 장르)가 드러나지 않음.");
    if (!has(/(Camera:|정면|톱다운|아이레벨|eye-level|로우앵글|클로즈업|와이드|중앙|레이아웃|컷|거터|읽힘)/)) err(errors, "E-CAM-LANG", "카메라·구도·레이아웃 언어가 없음.");
    if (!has(/(Lighting:|조명|키라이트|소프트박스|자연광|림라이트|그림자|컨택트 섀도|반사)/)) err(errors, "E-LIGHT-LANG", "명시적 조명 지시가 없음.");
    if (!has(/(Texture\/Medium:|재질|질감|광택|종이|실크|리넨|유리|포일|베벨|셀 쉐이딩|스크린톤|수채|잉킹)/)) err(errors, "E-TEX-LANG", "재질·질감·매체 디테일이 없음.");
  } else { // Format B — 콘텐츠 토큰 체크로 대체
    if (!has(/(조명|키라이트|소프트박스|자연광|필라이트|림라이트|역광|그림자|광원|채광|lighting|rim light|backlight)/i)) err(errors, "E-LIGHT-LANG", "Format B 콘텐츠 토큰: 조명 어휘가 없음.");
    if (!has(/(재질|질감|텍스처|그레인|광택|매트|마감|texture|grain|finish)/i)) err(errors, "E-TEX-LANG", "Format B 콘텐츠 토큰: 질감 어휘가 없음.");
    if (hexCount < 3 || hexCount > 5) err(errors, "E-FMT-B-HEX", `Format B는 팔레트 HEX 3~5개 필수(현재 ${hexCount}개).`);
    if (p.length < 300 || p.length > 550) err(warnings, "W-LEN-B", `Format B 길이 ${p.length}자 — 300~550자 밴드 밖(타깃 350~450).`);
  }
  if (hexCount === 0) err(warnings, "W-HEX-MISS", "HEX 팔레트 없음 — 가능하면 핵심색 2~3개를 HEX로.");

  // ── 텍스트 프로토콜 ──
  if ((/Text-in-image\s*:/.test(p) || !!(rec && rec.korean_copy)) && quotes.length === 0)
    err(errors, "E-TEXT-QUOTE", "Text-in-image/korean_copy가 있는데 따옴표 카피가 0개 — 렌더 카피는 따옴표로 고정.");
  const dup = [...new Set(quotes.filter((q, i) => quotes.indexOf(q) !== i))];
  if (dup.length) err(errors, "E-TEXT-DUP", `동일 따옴표 카피 2회 이상(${dup.join(" / ")}) — 모든 카피는 한 번씩만.`);
  if (quotes.length >= 2 && !has(/(상단|하단|중앙|좌측|우측|타이틀|부제|서브|라벨|캡션|헤드|말풍선|SFX|headline|subhead|callout|billing|caption|centered|upper|lower)/i)) err(warnings, "W-TEXT-ROLE", "따옴표 카피 2개 이상인데 롤 라벨(타이틀/부제/위치)이 없음.");
  const mix = quotes.find((q) => /[가-힣]/.test(q) && /[A-Za-z]/.test(q));
  if (mix) err(warnings, "W-TEXT-MIXLANG", `한 따옴표 문자열 안 KO+EN 혼합: "${mix}" — 언어별로 분리.`);
  if ((renderText || has(/(텍스트|한글|타이틀|부제|라벨|말풍선|내레이션|SFX|카피|문구)/)) && !has(/(또렷|가독|한 번씩만|1~2개만|legible|appears once)/))
    err(warnings, "W-TEXT-GUARD", "텍스트가 있는데 가독성/반복 가드가 없음 (예: \"모든 텍스트는 한 번씩만, 또렷하게\").");

  checkNegatives(p, tier, renderText, errors, warnings);

  // ── 앞브래킷 / 슬롯 잔존 / SD 폐기 문법 (v1 유지) ──
  if (/^\[[^\]\n]*(\d+\s*:\s*\d+|SIZE|size)[^\]\n]*\]/.test(p.slice(0, 80))) err(errors, "E-HEAD-BRACKET", "앞머리 `[AR x:y SIZE wxh]` 브래킷 금지 — size는 API 파라미터, 프롬프트엔 끝의 `AR x:y`만.");
  const slots = p.match(/\[[A-Z_]{3,}\]/g); // ASCII 대문자 전용 — 한글 브래킷 라벨은 비대상
  if (slots) err(errors, "E-SLOT-LEAK", `슬롯 토큰 잔존: ${[...new Set(slots)].join(", ")} — 최종 프롬프트에는 치환 완료된 값만.`);
  const banned = p.match(/\b(masterpiece|best[ _]quality|(?:4|8)k|uhd|trending on artstation|ultra[- ]?detailed|hyper[- ]?detailed|highly detailed|intricate details?|sharp focus|award[- ]winning|raw photo)\b/gi);
  if (banned) err(errors, "E-SD-VOCAB", `SD 품질태그 폐기 어휘: ${[...new Set(banned.map((s) => s.toLowerCase()))].join(", ")}.`);
  if (has(/\([^()]*:\s*[01]?\.\d+\s*\)/)) err(errors, "E-WEIGHT", "가중치 문법 `(word:1.3)` 금지.");
  if (has(/--(ar|v|no|style|niji)\b/)) err(errors, "E-MJ-FLAG", "Midjourney식 슬래시 플래그(`--ar/--v/--no`) 금지.");
  if (has(/(^|\n)\s*§|§\s*\d/)) err(warnings, "W-SECTION-MARK", "본문에 `§` 기호 사용 — 헤더 `# 1.` 형식만 허용.");
  const filler = p.match(/(어워드 수준|전문가처럼|(?:멋지게|감성적으로|고급스럽게|예쁘게|세련되게|감도있게|world-class|beautifully|stunning|atmospheric|perfect|professional)(?![\p{L}\p{N}_]))/giu);
  if (filler) err(warnings, "W-FILLER", `빈 형용사(구체 명세로 대체): ${[...new Set(filler.map((s) => s.toLowerCase()))].join(", ")}.`);

  if (tier === 2) { // 화보 실패 토큰
    const toks = [];
    if (/cleavage-forward/i.test(p)) toks.push("cleavage-forward");
    if ((p.match(/plung(?:ing|e)/gi) || []).length >= 2) toks.push("plunging×2+");
    if (/bustier/i.test(p) && /photoreal/i.test(p)) toks.push("bustier+photoreal");
    for (const t of localFailureTokens()) if (p.toLowerCase().includes(t.toLowerCase())) toks.push(t);
    if (toks.length) err(warnings, "W-HWABO-TOKEN", `화보 실패 토큰 감지: ${[...new Set(toks)].join(", ")} — 단정한 스타일링 어휘로 교체.`);
  }
  return { ok: errors.length === 0, format, tier, errors, warnings };
}

function checkHardConstraints(size, errors) {
  const m = /^(\d+)x(\d+)$/.exec(size);
  if (!m) return;
  const w = +m[1], h = +m[2], px = w * h;
  if (Math.max(w, h) > HARD.maxEdge) err(errors, "E-SIZE-EDGE", `최대 변 ${HARD.maxEdge}px 초과: ${size}.`);
  if (w % HARD.multiple || h % HARD.multiple) err(errors, "E-SIZE-MULT", `가로·세로는 ${HARD.multiple}의 배수여야 함: ${size}.`);
  if (Math.max(w, h) / Math.min(w, h) > HARD.maxRatio) err(errors, "E-SIZE-RATIO", `종횡비 ${HARD.maxRatio}:1 초과: ${size}.`);
  if (px < HARD.minPx || px > HARD.maxPx) err(errors, "E-SIZE-PIXELS", `총 픽셀 ${HARD.minPx.toLocaleString()}~${HARD.maxPx.toLocaleString()} 밖: ${px.toLocaleString()}.`);
}

function nearestSize(size) {
  const m = /^(\d+)x(\d+)$/.exec(size);
  if (!m) return SIZE_WHITELIST[0];
  const w = +m[1], h = +m[2];
  const d = (s) => { const [W, H] = s.split("x").map(Number); return Math.abs(W - w) + Math.abs(H - h) + Math.abs(W / H - w / h) * 512; };
  return [...SIZE_WHITELIST].sort((a, b) => d(a) - d(b))[0];
}

function validateRecord(rec, ids, opts) {
  const errors = [], warnings = [];
  for (const f of ["id", "category", "ar", "size", "quality", "full_prompt", "output_path"])
    if (rec[f] === undefined || rec[f] === null || rec[f] === "") err(errors, "E-REC-FIELD", `필수 필드 누락: ${f}.`);
  if (rec.id !== undefined) { if (ids.has(rec.id)) err(errors, "E-REC-DUPID", `중복 id: ${rec.id}.`); ids.add(rec.id); }
  if (rec.quality === "auto") err(errors, "E-REC-QUALITY", 'quality "auto" 금지 — high/medium/low를 명시.');
  else if (rec.quality !== undefined && !QUALITY_ENUM.includes(rec.quality)) err(errors, "E-REC-QUALITY", `quality "${rec.quality}"는 허용값 밖(${QUALITY_ENUM.join("/")}).`);
  if (typeof rec.category === "string" && rec.category && !CATEGORY_RE.test(rec.category)) err(errors, "E-REC-CATEGORY", `category "${rec.category}"는 C1~C12 밖.`);
  if (rec.tier !== undefined && ![0, 1, 2].includes(rec.tier)) err(errors, "E-REC-TIER", `tier ${JSON.stringify(rec.tier)}는 0/1/2 밖.`);
  if (rec.format !== undefined && rec.format !== "A" && rec.format !== "B") err(errors, "E-REC-FORMAT", `format "${rec.format}"는 "A"/"B" 밖.`);
  if (typeof rec.ar === "string" && rec.ar && !/^\d+:\d+$/.test(rec.ar)) err(errors, "E-REC-AR", `ar "${rec.ar}"는 "x:y" 형식이 아님.`);
  if (typeof rec.output_path === "string" && rec.output_path &&
      (/^([A-Za-z]:[\\/]|[\\/])/.test(rec.output_path) || rec.output_path.split(/[\\/]/).includes("..")))
    err(errors, "E-PATH-ESCAPE", `output_path "${rec.output_path}" — 절대 경로·상위 디렉토리 탈출(..) 금지, 작업 루트 하위 상대 경로만.`);
  if (typeof rec.size === "string") {
    if (!SIZE_WHITELIST.includes(rec.size)) {
      const msg = `size ${rec.size}는 6종 화이트리스트 밖.`, hint = `가장 가까운 허용 size: ${nearestSize(rec.size)}`;
      if (opts.api) err(warnings, "E-SIZE-LOCK", `${msg} ${hint} (--api: warning 강등)`);
      else err(errors, "E-SIZE-LOCK", msg, hint);
    }
    checkHardConstraints(rec.size, errors); // 하드 제약은 --api에서도 유지
  }
  if (rec.ar && rec.size && AR_SIZE_MAP[rec.ar] && !AR_SIZE_MAP[rec.ar].includes(rec.size))
    err(errors, "E-SIZE-AR", `ar ${rec.ar} ↔ size ${rec.size} 매핑 불일치(허용: ${AR_SIZE_MAP[rec.ar].join(", ")}).`);
  if (rec.status === "approved") { // 문서 합격선(qa 평균 ≥4 AND text_accuracy ≥4)을 approved 레코드에 집행
    const qa = rec.qa;
    if (!qa || typeof qa !== "object") err(errors, "E-QA-GATE", "status approved인데 qa 4항목이 없음 — 합격선(평균 ≥4 AND text_accuracy ≥4) 검증 불가.");
    else {
      const vals = ["goal_fit", "text_accuracy", "material_realism", "layout"].map((k) => Number(qa[k]) || 0);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      if (avg < 4 || (Number(qa.text_accuracy) || 0) < 4)
        err(errors, "E-QA-GATE", `approved인데 합격선 미달 — qa 평균 ${avg.toFixed(2)}(≥4 필요), text_accuracy ${qa.text_accuracy}(≥4 필요).`);
    }
  }
  let t = { format: rec.format ?? null, tier: rec.tier ?? null };
  if (typeof rec.full_prompt === "string") {
    const m = rec.full_prompt.trim().match(/AR\s+(\d+)\s*:\s*(\d+)$/i);
    if (m && rec.ar && `${m[1]}:${m[2]}` !== rec.ar) err(errors, "E-REC-ARMATCH", `프롬프트 끝 AR ${m[1]}:${m[2]} ≠ record.ar ${rec.ar}.`);
    if (Array.isArray(rec.palette) && rec.palette.some((c) => !rec.full_prompt.includes(c)))
      err(warnings, "W-PALETTE-MISS", "record palette가 full_prompt에 반영되지 않음.");
    if ((rec.korean_copy || /Text-in-image\s*:|["“]/.test(rec.full_prompt)) && rec.quality !== "high")
      err(warnings, "W-TEXT-QUALITY", '텍스트 heavy record는 quality "high" 권장.');
    t = validateText(rec.full_prompt, opts, rec);
    errors.push(...t.errors); warnings.push(...t.warnings);
  }
  return { id: rec.id ?? null, ok: errors.length === 0, format: t.format, tier: t.tier, errors, warnings };
}

function runJsonl(content, opts) {
  const results = [], ids = new Set();
  content.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    let rec;
    try { rec = JSON.parse(line); } catch (e) {
      results.push({ line: i + 1, id: null, ok: false, errors: [{ code: "E-REC-JSON", msg: `line ${i + 1} JSON 파싱 실패: ${e.message}` }], warnings: [] });
      return; // 파싱 실패해도 다음 라인 계속
    }
    results.push({ line: i + 1, ...validateRecord(rec, ids, opts) });
  });
  if (results.length === 0)
    results.push({ line: 0, id: null, ok: false, errors: [{ code: "E-REC-EMPTY", msg: "jsonl에 레코드가 0건 — 빈 배치는 실패로 처리." }], warnings: [] });
  const pass = results.filter((r) => r.ok).length;
  return { ok: pass === results.length, results, summary: { total: results.length, pass, fail: results.length - pass } };
}

function parseFlags(flags) {
  const o = { api: false, tier: undefined };
  for (let i = 0; i < flags.length; i++) { if (flags[i] === "--api") o.api = true; else if (flags[i] === "--tier") o.tier = Number(flags[++i]); }
  return o;
}

function runTest() { // fixtures/manifest.json 셀프테스트 — 경로는 스크립트 기준(import.meta.url)
  const entries = JSON.parse(readFileSync(resolve(SCRIPT_DIR, "fixtures/manifest.json"), "utf8"));
  let fails = 0;
  const rows = entries.map((e) => {
    const opts = parseFlags(e.flags || []);
    const content = readFileSync(resolve(SCRIPT_DIR, e.path), "utf8");
    const res = e.mode === "jsonl" ? runJsonl(content, opts) : validateText(content, opts);
    const codes = e.mode === "jsonl" ? res.results.flatMap((r) => r.errors.map((x) => x.code)) : res.errors.map((x) => x.code);
    const missing = (e.expect.codes || []).filter((c) => !codes.includes(c)); // expect.codes ⊆ 실코드
    const pass = res.ok === e.expect.ok && missing.length === 0;
    if (!pass) fails++;
    return [pass ? "PASS" : "FAIL", e.path, e.mode, pass ? "" : `ok=${res.ok}(기대 ${e.expect.ok})${missing.length ? ` 누락코드:${missing.join(",")}` : ""} 실코드:${[...new Set(codes)].join(",") || "-"}`];
  });
  const wp = Math.max(...rows.map((r) => r[1].length), 4);
  console.log(`RESULT  ${"PATH".padEnd(wp)}  MODE   DETAIL`);
  for (const r of rows) console.log(`${r[0].padEnd(6)}  ${r[1].padEnd(wp)}  ${r[2].padEnd(5)}  ${r[3]}`);
  console.log(`\n${rows.length - fails}/${rows.length} fixtures green`);
  process.exit(fails ? 1 : 0);
}

// ── CLI ──
const argv = process.argv.slice(2);
const opts = { api: false, tier: undefined };
let file = null, jsonlPath = null, test = false;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--api") opts.api = true;
  else if (a === "--test") test = true;
  else if (a === "--tier") opts.tier = Number(argv[++i]);
  else if (a === "--jsonl") jsonlPath = argv[++i];
  else file = a;
}
if (test) runTest();
else {
  let out;
  try {
    out = jsonlPath ? runJsonl(readFileSync(jsonlPath, "utf8"), opts) : validateText(readFileSync(file ?? 0, "utf8"), opts);
  } catch (e) {
    console.log(JSON.stringify({ ok: false, errors: [{ code: "E-INPUT", msg: `입력을 읽지 못함: ${e.message}` }], warnings: [] }, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify(out, null, 2));
  process.exitCode = out.ok ? 0 : 1;
}
