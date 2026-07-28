---
name: prompt
description: Use when the user asks to create, refine, or optimize a prompt ('프롬프트 만들어/생성해/다듬어') — AI 프롬프트 생성기. 사용자의 아이디어를 모델별(Claude/GPT/Gemini/이미지) 최적화 프롬프트로 변환. Codex 포트 — Claude Code의 /prompt 명령과 동일 절차.
---

# /prompt — AI 프롬프트 생성기 (Codex port wrapper)

## Codex 이미지 목적 선행 게이트

사용자 요청이 이미지·그림·사진·포스터·카드뉴스·인포그래픽·썸네일·이미지 편집 중 하나라면, 일반 절차보다 먼저 아래를 수행한다.

1. 플러그인 내부 `../image-prompt-guide.md`를 **처음부터 끝까지 읽는다**. 파일이 있다는 사실이나 이 문서의 요약만으로 대체하지 않는다.
2. 이 경로에서는 플러그인 밖의 `image-prompt`·`gongnyang-photo` 스킬을 호출하지 않는다. 내부 가이드만 정본으로 사용한다. (공냥 킷 원문은 플러그인 **내부** `../image-prompt-kit/`에 동봉 — 가이드 §K5 라우팅 표가 지시하는 그 파일들을 읽는 것은 우회가 아니다.)
3. 최종 산출은 가이드 §0 계약을 따른다 — **gpt-image-2/Codex `$imagegen` 대상 = 공냥 킷 텍스트 프롬프트**(포맷 A 라벨 6섹션 또는 포맷 B 화보 콤마형, 끝에 `AR x:y` 토큰만 · 배치 = jsonl 레코드). ChatGPT/Gemini **웹 UI 간이 경로만** legacy JSON 골격(`purpose`·`hero`·`context`·`evidence`·`visual_re_description`·`constraints` 6키)을 쓴다.
4. 출력 직전 자가검사 — 킷 경로: ①포맷 A/B 구조 ②철칙 위반 0(네거티브 전면 긍정형·SD어휘 0·끝 `AR`) ③렌더 텍스트 시 Tier-1 결합 공식 1회 / 웹 UI 경로: 6키 전부. 미충족이면 출력하지 말고 내부 가이드를 다시 적용해 한 번 재생성한다.

그 밖의 요청은 이 스킬 디렉터리의 [references/prompt-command.md](references/prompt-command.md)를 읽고, 그 문서 전체를 프롬프트 생성 절차로 삼아 사용자의 요청($ARGUMENTS)을 처리한다. 이미지 요청도 위 선행 게이트를 통과한 뒤 필요한 공통 절차를 이 문서에서 보충한다.

- 모델별 전략 문서는 플러그인 루트 `skills/` 아래에 있다 (claude-fable-5-prompt-strategies.md, gpt-5.6-prompt-enhancement.md, gemini-3.1-prompt-strategies.md, image-prompt-guide.md 등). `references/prompt-command.md` 가 지시하는 상대경로 `skills/...` 는 이 플러그인 루트 기준으로 해석한다.
- `--batch` 인자가 있으면 질문 없이 바로 결과를 출력한다.
