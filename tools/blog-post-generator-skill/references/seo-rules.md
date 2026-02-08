# SEO Rules for Generated Posts

Apply these rules to both EN and TR outputs.

## Metadata Quality

- Title: specific, intent-matching, locale-natural.
- Description: concise summary with user value and keyword alignment.
- Excerpt: card-friendly summary, not duplicate spam.

## Keyword Usage

- Use locale-specific primary keyword in:
  - title (if natural)
  - intro context
  - at least one heading or strong semantic section
- Use secondary keywords naturally; avoid stuffing.

## Internal Linking

- Add internal links/CTAs when they clearly help the reader take a meaningful next step.
- Avoid generic bottom "related page" blocks.
- Keep link text and CTA copy lively and section-specific (not repetitive boilerplate).
- Prefer 1-3 high-value internal links over many weak links.

## Image SEO

- Use descriptive, locale-specific alt text for each inline image.
- Keep filenames deterministic and topic-grouped under `public/images/blog/<topicId>/`.
- Align each image with the section intent.
- Add selected external image source URLs to `sourceUrls`.

## Video SEO and UX

- If user provides repo videos, insert playable video blocks in relevant sections.
- Use descriptive localized context around each video.
- Do not insert unrelated videos just to increase media count.

## Tagging

- Choose tags that support topical clustering.
- Use locale-specific tags (English tags for EN posts, Turkish tags for TR posts).

## Source Traceability

- Store research and verification references in `sourceUrls`.
- Include repo source paths for product claims whenever used.
