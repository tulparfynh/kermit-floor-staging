# Media Workflow

Use this process for inline images and user-provided videos.

## 1) Decide Image Count Autonomously

Choose image count from post depth and section complexity:

- 900-1050 words: 2-3 images
- 1050-1300 words: 3-5 images
- Add one extra image only when it improves clarity (for example, comparison tables or installation detail steps).

Do not add images just to hit a number.

## 2) Discover and Select Web Images

If user provided `image_assets[]`, use those first.
Only fill remaining media slots with web-sourced images.

For each planned image slot:

1. Define the section purpose (context, step detail, material close-up, comparison visual).
2. Search the web for a matching image.
3. Prefer technically clear visuals that match blog intent.
4. Record each selected image source URL for traceability.

## 3) File Images in Repo

Store selected images at:

- `public/images/blog/<topicId>/`

Naming convention:

- `<locale>-section-01.webp`
- `<locale>-section-02.webp`

Use locale-specific alt text in body image markdown.

For user-provided repo images, keep original path and do not duplicate unless optimization is required.

## 4) Insert Images Into MDX

Place image markdown near the relevant section:

```md
![Localized alt text](/images/blog/<topicId>/<locale>-section-01.webp)
```

Keep spacing balanced and section-relevant.

## 5) Handle User Video Inputs

If user provides `video_assets[]`:

1. Verify each repo path exists.
2. Use `about` text to choose the most relevant section.
3. Insert a playable video markdown block:

```md
![<localized short label>](<repo video path>.mp4)
```

The renderer interprets video file image syntax as an HTML5 `<video controls>` block.

## 6) Confirmation Before Finalization

Before final write/publish, present a summary:

- selected image count and why
- each image path + section + source URL
- each user video path + section

Wait for user approval, then finalize files.
