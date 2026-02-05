# Staging branch changelog (vs main)

Summary of changes made on the staging branch since diverging from main. Use this as a reminder before merging to main or deploying.

---

## 1. Cloudflare image pipeline (hero images + loader)

**Goal:** Use Cloudflare Image Resizing for optimized images when on a custom domain; allow images to work on localhost and workers.dev without it.

**Added**
- **`src/lib/cloudflare-image-loader.ts`** – Custom Next.js image loader. Builds URLs like `origin/cdn-cgi/image/width=...,quality=...,format=auto/path` for production. For **localhost** or **\*.workers.dev**, returns direct URLs (`origin + path`) so images load from the app/Worker without Image Resizing. Remote URLs (e.g. Unsplash) are returned unchanged.
- **`src/lib/hero-images.ts`** – Central list of hero image paths and helpers (`getHeroImageUrl`, `HOME_HERO_IMAGE_PATH`, etc.) for homepage and product pages.
- **`src/components/showcase/HeroPreload.tsx`** – Preloads hero images for the current page (home or product) to improve LCP.

**Modified**
- **`next.config.ts`** – Set `images.loader: 'custom'`, `loaderFile: './src/lib/cloudflare-image-loader.ts'`, and `remotePatterns` for Unsplash/Google Storage. No per-image loader props elsewhere; global loader is used (with explicit `loader` where Next 15/Turbopack required it).
- **`src/app/[locale]/page.tsx`** – Homepage uses `HOME_HERO_IMAGE_PATH` and hero preload.
- **`src/app/[locale]/full-natural-collection/page.tsx`** and all other product pages under `src/app/[locale]/` – Use hero images from `hero-images.ts` and `HeroPreload`.
- **`src/components/showcase/Header.tsx`** – Uses hero image for the header strip; **explicit `loader={cloudflareImageLoader}`** added on both `<Image>` usages (logo and hero) so Next.js 15/Turbopack does not report “missing loader”.

**Behavior**
- **Localhost / \*.workers.dev (staging):** Loader returns direct image URLs; images load from dev server or Worker assets.
- **Production (e.g. kermitfloor.com):** Loader returns `/cdn-cgi/image/...` URLs when Image Resizing is enabled for that zone. Set `NEXT_PUBLIC_SITE_URL` at build time for correct origin.

---

## 2. Genkit / AI removed

**Removed**
- **`src/ai/genkit.ts`** – Deleted.
- **`src/ai/dev.ts`** – Deleted.
- All Genkit-related packages and scripts from the project.

**Reason:** No longer using Genkit; cleanup to avoid unused deps and config.

---

## 3. Cloudflare build and deploy fixes

**Problem:** Builds on Cloudflare (from GitHub) were failing: (1) `npm ci` failed because `@swc/helpers@0.5.18` was missing from the lock file; (2) deploy failed because the build command only ran `next build`, so `.open-next/worker.js` was never created; (3) OpenNext build failed with “Cannot find package 'esbuild'”.

**Changes**

- **`package.json`**
  - **`engines`** – Added `"node": ">=20"` so local and Cloudflare use the same Node version.
  - **`overrides`** – Added `"@swc/helpers": "0.5.18"` so the lock file includes that version and `npm ci` on Cloudflare succeeds.
  - **`devDependencies`** – Added **`esbuild`** (e.g. `^0.24.0`) so OpenNext’s build can find it when bundling.
- **`package-lock.json`** – Regenerated (after adding overrides and esbuild) so it matches the above and Cloudflare’s `npm ci`.
- **`.nvmrc`** – Added with `20` so local Node version aligns with Cloudflare.

**Cloudflare project settings (in dashboard)**  
- **Build command:** `node scripts/generate-panel-manifests.mjs && npx opennextjs-cloudflare build` (so `.open-next/` and `worker.js` are produced).  
- **Deploy command:** `npx wrangler deploy` (unchanged).

---

## 4. Documentation

- **`DEPLOY.md`** – Added section **“Environment variables (required for images)”**: set `NEXT_PUBLIC_SITE_URL` at build time to the site’s public URL (e.g. custom domain or Pages URL) so the image loader uses the correct origin. Noted that on staging (workers.dev) and localhost, images are served directly; on production, set the env var and enable Image Resizing for optimized images.

---

## 5. Next.js version

- **Stayed on Next.js 15.5.10** – No upgrade to 16; OpenNext Cloudflare support and stability were the deciding factors.

---

## File list (staging vs main)

| Change | Path |
|--------|------|
| Added | `.nvmrc` |
| Modified | `DEPLOY.md` |
| Modified | `next.config.ts` |
| Modified | `package-lock.json` |
| Modified | `package.json` |
| Deleted | `src/ai/dev.ts` |
| Deleted | `src/ai/genkit.ts` |
| Modified | `src/app/[locale]/full-natural-collection/page.tsx` |
| Modified | `src/app/[locale]/page.tsx` |
| Modified | `src/app/[locale]/spc-3d-wall-panels-model-a/page.tsx` |
| Modified | `src/app/[locale]/spc-3d-wall-panels-model-b/page.tsx` |
| Modified | `src/app/[locale]/spc-parquet-natural-collection/page.tsx` |
| Modified | `src/app/[locale]/spc-parquet-stone-collection/page.tsx` |
| Modified | All `src/app/[locale]/spc-skirting-boards/*/page.tsx` |
| Modified | `src/app/[locale]/spc-wall-panels/page.tsx` |
| Modified | `src/components/showcase/Header.tsx` |
| Added | `src/components/showcase/HeroPreload.tsx` |
| Added | `src/lib/cloudflare-image-loader.ts` |
| Added | `src/lib/hero-images.ts` |

---

## Before merging to main / production

1. **Production env:** Set `NEXT_PUBLIC_SITE_URL` in the production build (e.g. `https://kermitfloor.com`) if you want correct image origins and optional Image Resizing.
2. **Image Resizing:** Enable Image Resizing (or the merged Images product) for the kermitfloor.com zone in Cloudflare if you want `/cdn-cgi/image/` optimization in production; otherwise images will still load via direct URLs.
3. **Cloudflare build:** Ensure the production project uses the same build command (`node scripts/generate-panel-manifests.mjs && npx opennextjs-cloudflare build`) and has the same env/plan as needed.
