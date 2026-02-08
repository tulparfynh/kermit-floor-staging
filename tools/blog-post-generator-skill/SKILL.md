---
name: blog-post-generator
description: Generate bilingual (EN + TR) SEO blog posts for Kermit Floor with shared topic planning, locale-specific keywords, claim checks against repo product sources, auto-planned inline media, and paired MDX output under content/blog/topics. Use when creating or updating SEO blog content that must keep EN/TR parity and pass blog validation.
---

# Bilingual SEO Blog Post Generator

Generate paired EN/TR blog posts for a single topic and write both locale files in one run.

## Conversational Intake (Default UX)

Start this workflow only when the user explicitly invokes the skill with `$blog-post-generator`.
`$blog-post-generator` alone is sufficient to start; do not require any extra starter phrase.
If the skill is not explicitly invoked, ask for confirmation before starting blog generation.

Run a short guided intake and collect missing inputs step-by-step in chat:

1. Topic name (natural language)
2. EN primary keyword
3. EN secondary keywords
4. TR primary keyword
5. TR secondary keywords
6. Status (`draft` or `published`)
7. Optional videos to include (repo path + what video is about + locale)

After collecting these answers, normalize into the required input model and continue generation workflow.

## Required Inputs

Collect and confirm all required inputs before drafting:

1. `topic_id`
2. `en_primary_keyword`
3. `en_secondary_keywords[]`
4. `tr_primary_keyword`
5. `tr_secondary_keywords[]`
6. `post_status` (`draft` or `published`)

Stop immediately with a clear input error if any required input is missing.

## Optional Inputs

- `video_assets[]`: user-provided repo videos to place inside the post body.
  - Each item includes:
    - `repoPath`: repository-relative video path (for example `public/videos/blog/spc-installation-demo.mp4`)
    - `about`: what the video demonstrates
    - `locale`: optional (`en`, `tr`, or `both`; default `both`)

## Output Contract

Write both files:

- `content/blog/topics/<topicId>/en.mdx`
- `content/blog/topics/<topicId>/tr.mdx`

Use the frontmatter contract in `references/schema.md`.

## Workflow

1. Validate required inputs.
2. Infer `searchIntent`, `targetAudience`, and `funnelStage` from keywords/topic.
3. Build a media plan before drafting:
   - Decide inline image count autonomously from content depth and section count.
   - Default guidance:
     - 900-1050 words: 2-3 inline images
     - 1050-1300 words: 3-5 inline images
   - Assign each planned image to a specific section purpose (context, process step, comparison visual, detail shot).
4. Run web research for topical context and image candidate discovery.
5. Select web images and file them under `public/images/blog/<topicId>/`.
   - Use deterministic filenames (for example `<locale>-section-01.webp`).
   - Track selected image source URLs for traceability.
6. Build claim candidates and verify product/spec claims using `references/claim-sources.md`.
7. Draft EN post using the template and SEO rules in `references/writing-templates.md` and `references/seo-rules.md`.
8. Draft TR post from the same topic plan, optimized for TR keywords and search behavior (not a literal translation).
9. Insert inline image markdown in both locale bodies using the chosen media plan.
10. If `video_assets[]` are provided:
   - Verify each `repoPath` exists.
   - Place each video in the most relevant section described by `about`.
   - Insert playable video markdown using the repo path (for example `![Installation demo](<video-path>.mp4)`).
11. Add internal links/CTAs only when they are genuinely helpful for the reader's next step.
   - Avoid generic bottom "related page" blocks.
   - Use lively, context-specific CTA phrasing tied to the section topic.
12. Populate `sourceUrls` with:
   - product/spec verification repo paths
   - external research URLs
   - selected external image source URLs
13. Present a final draft media confirmation summary to the user before finalizing:
   - image count selected and rationale
   - each image path + placement section + source URL
   - each video repo path + placement section
14. After user confirmation, write/update both MDX files.
15. Run `npm run blog:validate`.
16. Return a report with:
   - files created/updated
   - status used
   - research URLs captured
   - image files created
   - videos inserted
   - contextual internal links/CTAs added (if any)
   - claims dropped or softened due to missing verification

## Claim Safety Rules

For Kermit product/spec claims, verify against repo sources before inclusion.

- If verified: keep the claim factual.
- If not verified: remove it or rewrite as non-quantified generic guidance.

Do not publish unsupported quantified claims.

## Writing Constraints

- Keep tone neutral, practical, and B2B useful.
- Keep each locale draft approximately 900-1300 words unless user asks otherwise.
- Keep EN/TR intent-aligned while allowing localized phrasing and examples.
- Use internal links/CTAs selectively when they improve utility.
- Keep CTA presentation lively and contextual, not boilerplate.
- Use comparison framing only when the topic/keywords indicate comparison intent.
- Place media naturally inside the flow; avoid decorative image stuffing.
- Use selective markdown bold (`**...**`) for key terms, warnings, or decision-critical points when emphasis improves readability.
- Avoid bold overuse; keep emphasis meaningful and sparse.

## References

- `references/schema.md`
- `references/claim-sources.md`
- `references/writing-templates.md`
- `references/seo-rules.md`
- `references/media-workflow.md`
