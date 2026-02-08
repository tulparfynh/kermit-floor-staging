# App Name: Kermit Floor Corporate Website

## Product Purpose

- Present Kermit Floor as a manufacturer of a complete SPC interior finishing system.
- Showcase three connected product families: SPC flooring, SPC wall panels (including 3D), and SPC skirting boards.
- Convert website traffic into commercial conversations via contact channels (phone, email, WhatsApp).
- Provide practical technical and marketing resources for installers, dealers, architects, and project buyers.

## Core Experiences

- Home: brand positioning, product family overview, starter pack request entry points, social proof, and contact CTA.
- Product collections: rich catalog browsing with variant-level visuals, specs, feature highlights, and application videos.
- Resources: downloadable catalogs and technical documents grouped by product line and document type, plus starter packs by audience.
- About: company story, manufacturing mindset, system approach, footprint, and sustainability positioning.
- Contact: multi-location company contact details and map embed for direct outreach.
- Legal: localized privacy policy and terms pages.

## Information Architecture

- Bilingual structure: English and Turkish with localized paths.
- Product taxonomy:
  - Flooring: natural collection, stone collection, full natural range.
  - Walls: SPC wall panels, 3D model A, 3D model B.
  - Skirting: multiple profile families under dedicated routes.
- Data model is asset-driven: product variants are sourced from collection manifests and image folders.
- Legacy URL mapping is preserved through permanent redirects for migration continuity and SEO protection.

## UX and Design Direction

- Visual identity: clean industrial-modern look with nature-linked greens and light neutral surfaces.
- Brand palette:
  - Primary: forest green `#2d422f`
  - Secondary: soft green `#89ad8c`
  - Background: light grey `#f0f2f0`
- Typography:
  - Headings: Montserrat
  - Body: Inter
- Experience style: image-led cards, clear specs, lightweight motion, strong CTA clarity, and mobile-first usability.

## Functional Principles

- Informational and lead-generation focused (not ecommerce).
- Deployment target is Cloudflare Workers; OpenNext is the adapter layer that enables reliable Next.js runtime/build output on Cloudflare.
- Static-first product content for fast delivery, aligned with the Cloudflare + OpenNext deployment model.
- Contact-first conversions: email, phone, and WhatsApp rather than checkout flows.
- SEO fundamentals: localized metadata, sitemap/robots, legacy redirects, and stable route architecture.

## Non-Goals

- No cart, checkout, or account system.
- No on-site transactional purchasing flow.
