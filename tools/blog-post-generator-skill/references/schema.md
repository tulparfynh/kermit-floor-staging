# Blog Frontmatter Schema

All generated files must include this frontmatter shape.

## Required Fields

- `topicId`: string, shared across EN/TR files
- `locale`: `en` or `tr`
- `slug`: locale-specific kebab-case slug
- `title`: localized title
- `description`: localized meta description
- `excerpt`: localized listing summary
- `primaryKeyword`: locale-specific primary target keyword
- `secondaryKeywords`: non-empty array of locale-specific keywords
- `tags`: non-empty locale-specific array (EN tags in English, TR tags in Turkish)
- `publishedAt`: ISO date `YYYY-MM-DD`
- `updatedAt`: ISO date `YYYY-MM-DD`, must be on or after `publishedAt`
- `status`: `draft` or `published` (both locales must match for publish)
- `searchIntent`: `informational`, `commercial-investigation`, or `comparison`
- `targetAudience`: `mixed-b2b`, `installer`, `dealer`, or `architect`
- `funnelStage`: `awareness`, `consideration`, or `decision`
- `sourceUrls`: non-empty array of repo paths and/or valid `http(s)` URLs.
  - Include product/spec claim-check sources.
  - Include external research URLs used in drafting.
  - Include external source URLs of selected web images.
- `coverImage`: absolute app path (starts with `/`)
- `coverImageAlt`: descriptive localized alt text
- `authorName`: string
- `ctaPath`: optional valid route path from `src/navigation.ts`

## File Contract

- EN file: `content/blog/topics/<topicId>/en.mdx`
- TR file: `content/blog/topics/<topicId>/tr.mdx`

## Validation Notes

- Slugs must be unique per locale.
- Missing locale pair is invalid.
- `published` status must be set on both locale files together.
- `sourceUrls` cannot be empty.
- User video references are inserted in MDX body as playable blocks (not as frontmatter fields).
