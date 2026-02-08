# Deployment

## Cloudflare (Workers / Pages)

This app is configured to build and deploy to Cloudflare using [OpenNext Cloudflare](https://opennext.js.org/cloudflare).

### Build

```bash
npx @opennextjs/cloudflare build
```

This runs the Next.js build and produces output in `.open-next/` (Worker + assets).

### Deploy

```bash
npx @opennextjs/cloudflare deploy
```

Or use the npm scripts:

- `npm run preview` — build and run locally in the Cloudflare Workers runtime.
- `npm run deploy` — build and deploy to Cloudflare.

### Building on Windows

OpenNext may hit permission or spawn errors on Windows. Prefer **WSL** or **Cloudflare’s CI** (e.g. connect the repo in the Cloudflare dashboard) for reliable builds. To use Cloudflare bindings during `next dev`, add `initOpenNextCloudflareForDev()` from `@opennextjs/cloudflare` to `next.config.ts` (see OpenNext docs).

### Content updates

Product and resource pages are **statically generated at build time**. Changes to product lists (e.g. `public/images/*/products.json`) or to the resources library require a **new build and deploy** to appear on the site. There is no ISR or on-demand revalidation on Cloudflare for this app.
