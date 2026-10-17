# brack.io Website

Personal [brack.io website](https://brack.io)

## Dev Setup

Run `npm install` once, then use:

- `npm run dev` to start the Astro dev server
- `npm run build` to create the production build in `dist/`
- `npm run preview` to preview the production build locally
- `npm test` to check theme behavior and brand asset consistency

## Waypoint identity and themes

The supplied artwork lives in `brand-waypoint-assets/`. Published copies in
`public/brand/` retain the supplied geometry and bytes. The header uses the
transparent SVGs; the portrait, site copy, project lists, and navigation are
unchanged. The supplied dark/light SVG favicons are referenced directly and
switched by the existing theme script. PNG and ICO fallbacks, an Apple touch icon, and
192/512px manifest icons are also provided. Manifest icons use the dark variant.

The theme control shows three visible icons: a monitor for Automatic (system),
a moon for Dark, and a sun for Light. Native radio inputs provide a single Tab
stop and arrow-key selection, with accessible labels, 44px targets, and visible
selection and keyboard focus. System is the initial
selection: it follows an explicit OS light preference and otherwise uses dark.
Manual choices are saved under `brack.io.theme`; System follows subsequent OS
changes. The small script is inlined in the head to resolve the theme before
first paint and synchronize browser chrome and icons. If storage is blocked,
selection still works for the current visit. Without JavaScript, the page stays
dark and the inactive control is hidden.

Open Graph and Twitter use the supplied 1200×630 social preview, with absolute
production URLs, existing title/description, and image alt text. The preview
contains no portrait.

The header lockup uses the original SVG aspect ratio, with a 44px image height
(42px on phones) to account for the artwork's inset bounds. The three theme
targets remain 44×44px, while the visible selected circle is 32px and the icons
are 18px. The enclosing pill is removed so the control stays subordinate to the
identity. Light mode uses a flat ivory background, no glow layers, and a short
neutral portrait shadow; dark mode retains its existing atmospheric treatment.
Before/after screenshots were compared in both themes at 320, 390, 768, 1024,
and 1440px widths. At 320px, the header retains approximately 72px between the
identity and control without shrinking the touch targets.

Integration verification (2026-10-14):

- Node 22 production build, TypeScript check, and nine regression tests pass.
- Both themes checked at 320, 375, 390, 430, 768, 1024, and 1440px widths;
  no horizontal overflow. Keyboard Tab/Space/arrows and reload persistence
  checked in the browser. Theme controls have 44px targets and visible focus.
- Light muted text contrast is at least 5.07:1 against the darker light surface;
  focus rings are at least 5.80:1. Dark muted text and theme icons also exceed
  their applicable contrast thresholds.
- The traced contours were compared with the reference and inspected at header
  and 16px favicon sizes; no contour edits were needed. SVG paths and transformed
  dot coordinates are checked for consistency. The original 400px portrait
  covers 2× rendering at its largest displayed size (146px), and the logos and
  social icons are vectors. Browser screenshots were captured at 1×; physical
  Retina/iOS hardware was not available for testing.
- No lint command is configured. Formatting checks for new JavaScript/tests and
  the manifest, plus `git diff --check`, pass. The build retains its existing
  Cloudflare adapter warning about runtime image optimization. Browser checks
  used the Astro development server because sandbox restrictions prevented the
  separate production preview from binding its ports.

## Approved asset refresh (2026-10-17)

The corrected external asset pack is consolidated in `brand-waypoint-assets/`.
Its SVGs, PNGs, ICO, social preview, and supplied README are preserved byte for
byte. The pack is flat despite the folder prefixes in its supplied README.
The `@2048` raster masters replace the obsolete `-1024` files; proof renders
remain source references. Only assets used by the site are copied into
`public/brand/`; unused 48px and light 192/512px public copies were removed.
The ICO now contains 16px and 32px images, reflected in the layout metadata.
The obsolete custom adaptive SVG favicon was removed; the layout defaults to
the supplied dark SVG and the theme script selects the matching supplied SVG
for Dark, Light, or Automatic mode.

Both header themes and their favicon/touch-icon links were checked in the
browser. The social preview remains exactly 1200 × 630 and both social metadata
URLs remain `https://brack.io/brand/social-preview-1200x630.png`. Asset equality
and SVG geometry tests now validate the corrected pack. Supplied SVG whitespace
is preserved deliberately, including trailing spaces on the blank second line
of the two logo masters.

## Search indexing

The production build generates a sitemap at
`https://brack.io/sitemap-index.xml` and publishes a crawl policy at
`https://brack.io/robots.txt`.

After verifying the domain through DNS, submit
`https://brack.io/sitemap-index.xml` under **Sitemaps** in Google Search
Console.

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
