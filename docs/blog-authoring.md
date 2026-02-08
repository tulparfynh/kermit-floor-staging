# Blog Authoring Checklist

## Create a new topic

Run:

```bash
npm run blog:new -- --topic <topic-id>
```

This creates:

- `content/blog/topics/<topic-id>/en.mdx`
- `content/blog/topics/<topic-id>/tr.mdx`

## Starter placeholders

- The repo currently includes two starter topic pairs only as initial placeholders.
- Replace or remove them as your editorial calendar is finalized.
- Keep EN/TR parity and validator rules intact when replacing.

## Required publishing rules

1. Keep one shared `topicId` for EN and TR files.
2. Keep `status` aligned:
   - `draft` + `draft`, or
   - `published` + `published`
3. Use locale-specific slugs:
   - `en.mdx` -> English slug
   - `tr.mdx` -> Turkish slug
4. Use locale-specific tags for each locale (EN tags in English, TR tags in Turkish).
5. Fill all required frontmatter fields before publishing.
6. Ensure `updatedAt` is on or after `publishedAt`.
7. Keep `ctaPath` to a valid app pathname (for example `/resources`, `/spc-wall-panels`).
8. Set strategy fields in both locales:
   - `searchIntent`: `informational | commercial-investigation | comparison`
   - `targetAudience`: `mixed-b2b | installer | dealer | architect`
   - `funnelStage`: `awareness | consideration | decision`
9. Add non-empty `sourceUrls` with repo claim-check paths and external research URLs.
10. Write Turkish locale content with proper Turkish characters (`ç, ğ, ı, İ, ö, ş, ü`).

## Keyword workflow

1. Use one shared topic in both locales.
2. Define keyword targets per locale:
   - `primaryKeyword` for EN and TR separately
   - `secondaryKeywords` for EN and TR separately
3. Keep intent parity across locales even if phrasing differs.

## SEO checks before publish

1. Title and description are unique and locale-appropriate.
2. Excerpt is concise and useful for listing cards.
3. Cover image path is valid and image alt text is descriptive.
4. Avoid forced internal "related page" or bottom CTA blocks; add contextual CTAs only when they are genuinely useful.
5. Inline body images are section-relevant and use descriptive localized alt text.
6. If user videos are used, playable video blocks are placed in relevant sections.
7. Source traceability is present in frontmatter (`sourceUrls`).
8. Key terms are emphasized with selective bold formatting where it improves clarity (without overuse).
9. Validate content:

```bash
npm run blog:validate
```

## CI/build guardrails

- Build runs blog validation before `next build`.
- PR checks run:
  - `npm run blog:validate`
  - `npm run typecheck`
