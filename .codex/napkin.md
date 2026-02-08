# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2026-02-07 | self | Used `Get-Content` on paths containing `[locale]` without literal mode in PowerShell | Use `Get-Content -LiteralPath` for bracketed Next.js route folders |
| 2026-02-07 | self | Ran `npm` directly in PowerShell and hit execution-policy block | Use `npm.cmd` in this environment for install/run commands |
| 2026-02-07 | self | Left YAML scalars unquoted in blog frontmatter (title/date), causing parser/type issues | Quote colon-containing text and date strings in frontmatter templates |
| 2026-02-08 | self | Assumed skill snapshots always include `agents/openai.yaml` | Check existing repo snapshot structure first and mirror local convention (`SKILL.md` + `README.md`) |
| 2026-02-08 | self | Tried invoking `.ps1` scripts directly and hit execution policy restrictions | Run scripts with `powershell -ExecutionPolicy Bypass -File <script>.ps1 ...` in this environment |
| 2026-02-08 | self | Drafted a CTA example route (`/spc-skirting`) that does not exist in `src/navigation.ts` | Validate CTA examples against actual pathnames before finalizing skill docs |
| 2026-02-08 | user | I answered image support as if "cover image" and "blog images" were the same need | Distinguish cover-image metadata from multiple inline body images and answer separately |
| 2026-02-08 | self | Repeated bracketed-route read error by using `Get-Content` without literal mode | Always use `Get-Content -LiteralPath` for paths containing `[locale]` or `[tag]` |
| 2026-02-08 | self | Turkish tag pages could 404 when tag params arrived URL-encoded | Decode tag params before normalization and lookup on tag pages |
| 2026-02-08 | self | Ran multiple `npm` mutation commands in parallel and caused lockfile/node_modules inconsistency | Run dependency mutation commands sequentially (shared files/state) |
| 2026-02-08 | self | Used `&&` in Windows PowerShell where it is unsupported | Chain commands with `;` and explicit `$LASTEXITCODE` checks |
| 2026-02-08 | self | OpenNext Cloudflare runtime may fail with older Workers compatibility date after adapter updates | Keep `wrangler.jsonc` compatibility_date at least `2025-05-05` for FinalizationRegistry support |
| 2026-02-08 | self | Cloudflare build logs can be fully green while runtime still returns 500 | Treat build logs and runtime logs separately; reproduce with live probes and tail runtime errors |
| 2026-02-08 | self | Assumed dependency warnings were primary cause of runtime 500 | Prioritize route-level runtime pattern checks (which URLs fail) before attributing outages to package warnings |
| 2026-02-08 | self | Missed that Cloudflare image quota exhaustion can present as generic 500s | Tail runtime logs and inspect `/_next/image` errors for `IMAGES_TRANSFORM_ERROR` before deeper code rollback |
| 2026-02-08 | self | Added `export const dynamic` in a file already importing `dynamic` from `next/dynamic`, causing a TS declaration conflict | Alias `next/dynamic` import (e.g., `nextDynamic`) when using route config export `dynamic` |
| 2026-02-08 | self | Ran `rg` with shell-escaped regex that broke in PowerShell | Prefer simple fixed-string `rg` patterns in PowerShell unless regex is necessary |

## User Preferences
- Keep responses concise and practical.
- Implement approved plans end-to-end without partial delivery.
- Prefer a visual hero section on key listing pages (blog list was explicitly requested).
- Wants the blog generation workflow to support fetching web images and filing them per post.
- Wants the skill to autonomously decide inline image count, then present a final media confirmation summary.
- Wants user-provided repo videos accepted with topic-aware placement inside blog content.
- Wants videos in blog content to be playable inline (not plain links).
- Does not want bottom "related page" style internal link blocks in blog posts.
- Wants internal links and CTAs when genuinely helpful, but they should feel lively/contextual rather than generic.
- Prefers conversational intake: start with "Let's generate a new blog post" and be asked for required variables step-by-step instead of providing parameter blocks upfront.
- Wants explicit skill invocation (`$blog-post-generator`) as the standard start so blog generation is never triggered by ambiguity.
- Wants `$blog-post-generator` alone as the only starter; generic starter phrase should not be required.
- Wants all workflow questions in English; Turkish is only for TR keyword/locale content inputs.
- Wants locale-specific tags (EN tags in English, TR tags in Turkish) instead of forced shared tag sets.
- Wants Turkish articles to use proper Turkish characters instead of ASCII transliteration.
- Wants blog drafts to use bold emphasis on key words/phrases when it improves clarity.
- Prefers aligning repo worker name to Cloudflare connected-build expectation (`kermit-floor`) to avoid deploy warnings.
- Wants optional user-provided inputs for blog generation: own images, short article context, and reference sources/style examples.
- Wants image delivery to use raw/local image paths rather than Next/Cloudflare image optimization.

## Patterns That Work
- Validate assumptions by checking repository files before acting.
- For this repo, favor static-first features that fit Next.js + Cloudflare/OpenNext deployment.
- Run `npm.cmd run blog:validate` + `npm.cmd run typecheck` before full build to catch schema/typing issues early.
- For Cloudflare incidents, probe route groups (`/`, `/about`, `/blog`, `/sitemap.xml`) to isolate failing feature paths quickly.
- If `wrangler tail` seems "stuck", treat it as active stream mode; trigger requests from another terminal and read emitted logs.
- For Workers-hosted content pages, compile repo content into a deterministic build artifact instead of reading filesystem at runtime.

## Patterns That Don't Work
- Guessing environment behavior without verifying local config/scripts.
- Treating successful build logs as proof of runtime health on Workers.

## Domain Notes
- Deploy target is Cloudflare Workers using OpenNext.
- Product scope: SPC flooring, wall panels, and skirting boards.
- Seed blog posts are placeholders and expected to be replaced by editorial content later.
- A route can fail on Workers runtime while unrelated routes stay healthy; this often points to feature-specific runtime dependencies.
- Cloudflare Images free unique transformation limits can trigger `IMAGES_TRANSFORM_ERROR 9422` for `/_next/image` requests.
