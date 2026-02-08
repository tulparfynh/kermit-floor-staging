# Kermit Floor

Next.js site for Kermit Floor (SPC floors, wall panels, skirting). Supports English and Turkish via next-intl.

## Development

```bash
npm install
npm run dev
```

Runs at http://localhost:9002.

## Deployment

See [DEPLOY.md](DEPLOY.md) for Cloudflare (OpenNext) build and deployment instructions.

## Codex Napkin Guardrails

This repo uses a committed, Codex-only napkin at `.codex/napkin.md` to persist
mistakes, corrections, and working patterns across sessions.

One-time setup:

```powershell
./scripts/install-napkin-skill.ps1
```

Daily usage (recommended entrypoint):

```powershell
./scripts/start-codex.ps1
```

Troubleshooting:

```powershell
./scripts/check-napkin-setup.ps1
```

Notes:

- The frozen skill snapshot is in `tools/napkin-skill/` and intentionally not auto-synced.
- `.codex/napkin.md` is committed so team members and agents share learned patterns.

## Codex Blog Post Generator Skill

Install the bilingual EN/TR blog generation skill:

```powershell
./scripts/install-blog-post-generator-skill.ps1
```

Verify setup:

```powershell
./scripts/check-blog-post-generator-skill-setup.ps1
```

Frozen skill files live in `tools/blog-post-generator-skill/`.

Quick start in chat:

- Start explicitly with: `$blog-post-generator`
- The skill asks required inputs one by one (topic, EN/TR keywords, status, optional videos).

Current skill behavior includes:

- automatic EN/TR paired post generation
- autonomous inline image count planning by post depth
- web image sourcing + filing under `public/images/blog/<topicId>/`
- optional playable user video placement from repo paths
- final media confirmation summary before finalizing draft
- optional user-provided image assets, article context brief, and reference/style source inputs
