# brack.io Website

Personal [brack.io website](http://brack.io)

## Dev Setup

Run `npm install` once, then use:

- `npm run dev` to start the Astro dev server
- `npm run build` to create the production build in `dist/`
- `npm run preview` to preview the production build locally

## Cloudflare Pages

This project is configured as a static Astro site and is ready to deploy on
Cloudflare Pages via a connected GitHub repository.

Use these Pages settings:

- Framework preset: `Astro`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`

Notes:

- The repo includes a `.node-version` file pinned to Node `22`, which Cloudflare
  Pages supports via its build image.
- No Astro Cloudflare adapter or Wrangler config is required for this site,
  because it is deployed as pre-rendered static assets.
- If you are deploying from an older existing Pages project, make sure it uses a
  modern Pages build image so Node 22 is available.
