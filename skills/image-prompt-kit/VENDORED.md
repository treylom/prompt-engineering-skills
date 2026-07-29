# VENDORED — 공냥 프롬프트 킷 (gongnyang-prompt-kit)

이 디렉터리는 [gongnyang/gongnyang-prompt-kit](https://github.com/gongnyang/gongnyang-prompt-kit) (MIT, © 공냥이 @specal1849)의 **원문 사본(vendor)** 입니다.

- **원본 리비전**: `fb5f75f` (v4.0.0, 2026-07-27) — 재sync 시 이 줄을 갱신합니다.
- **포함**: `KIT-SKILL.md`(원본 `skills/image-prompt/SKILL.md` — 플러그인 스킬 자동 등록을 피하려고 파일명만 변경, 내용 무수정) · `references/`(라우터·패턴 전체) · `scripts/`(check_prompt.mjs 검증기 + fixtures) · `examples/`(완성 예시 txt·jsonl — 이미지 갤러리 PNG 제외) · `LICENSE`.
- **수정 금지 원칙**: vendored 파일은 원문 그대로 유지합니다. 규칙 변경은 upstream에서 pull 하여 반영합니다.
- **재sync 절차**: upstream clone에서 `git pull` → 본 디렉터리에 동일 rsync(PNG 제외) → `node scripts/check_prompt.mjs --test` green 확인 → 이 파일의 리비전 갱신.
- **진입점**: 플러그인의 이미지 프롬프트 정본 계약은 `skills/image-prompt-guide/references/full.md`가 요약 전사하며, 상세 라우팅·패턴은 이 디렉터리의 파일을 그대로 읽습니다.
- **⚠️ 본 파일(VENDORED.md)의 지위**: 킷 payload 가 아니라 **우리가 관리하는 로컬 vendoring 메타**입니다(원본 리비전 줄·이 진입점 포인터가 그 증거 — upstream 에 없는 파일). "디렉터리 무수정" 계약의 스코프 = **킷 원문 payload**이며, 본 파일의 경로 포인터 갱신(예: 2026-07-29 P5 분할 반영)은 계약 위반이 아닙니다. payload 파일들은 불변.
