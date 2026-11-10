# Skyline Engineering & Construction

A single-page marketing site for Skyline Engineering & Construction, rebuilt as a
React application with an editorial, yellow-and-black visual system.

**Beautiful homes. Honest prices.**

![Acid yellow and black brand palette](https://img.shields.io/badge/palette-%23E6E440%20%2F%20%23000000-000000?style=flat-square&labelColor=E6E440&color=000000)

## Stack

- **React 19** + **TypeScript**
- **Vite 8** for development and production builds
- **Tailwind CSS v4** with brand tokens in `src/index.css`
- **Motion** (Framer Motion) for reveals, the hero and scroll-linked detail
- **Lenis** for smooth scrolling, with reduced-motion fallbacks
- **Lucide React** for icons
- **Fontsource** for self-hosted Sora, Manrope and JetBrains Mono

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Vite prints the local URL (normally `http://localhost:5173`).

```bash
npm run build    # type-check, then bundle to dist/
npm run preview  # serve the production build locally
```

`vite.config.ts` uses `base: "./"`, so the built site can be hosted at a domain
root or in a subdirectory. The page uses hash links only, so no SPA rewrite rule
is required.

## Contact details and the quote form

Contact channels live in `src/config.ts`:

```ts
export const CONTACT = {
  phone: "+234 703 055 3134", // display format
  whatsapp: "2347030553134", // international format, digits only
  email: "ogiethompson11@gmail.com",
};
```

- When a channel is filled in, its call, WhatsApp or email link becomes active.
- When a channel is empty, the button shows an honest "details are being added"
  message and points people to the quote form.
- On submit, the form opens a prefilled WhatsApp message if `whatsapp` is set.
  Otherwise it opens a prefilled email if `email` is set.
- If neither is configured, the form runs in **demo mode**: it saves the request
  in this browser under `skyline:last-quote-request` and clearly says that
  nothing was sent.
- There is **no server-side form handler**. To send enquiries to a CRM, inbox or
  database, replace the WhatsApp/email/demo branches in `handleSubmit` in
  `src/components/Quote.tsx` with your API call. Update the privacy copy if
  submissions are stored remotely.

Contact details are configured in `src/config.ts`. Update them there if the
phone, WhatsApp or email changes, and verify each link before launch.

## Lookbook and saved looks

The interactive lookbook (`src/components/Showcase.tsx`) sits between Designs and
Upgrades. It includes:

- Six category filters: Architecture, Smart Homes, Interiors, Furniture,
  Lighting, and Solar & Water.
- A dense mosaic gallery with hover treatment and per-look save and enquire
  actions.
- A keyboard-accessible lightbox with previous/next navigation, Escape to close,
  focus trapping, and a caption for each look.
- A persistent saved-lookbook bar that feeds selected looks into the quote form.
  Saved looks are included in the WhatsApp/email message and in the demo-mode
  `skyline:last-quote-request` record.

The lookbook uses concept imagery for inspiration, not completed Skyline
projects. Replace the files in `public/images/showcase/` and update
`SHOWCASE_ITEMS` in `src/content.ts` before launch.

## Content and imagery

All marketing copy comes from the supplied Skyline material. The site does not
invent testimonials, project counts, locations, prices or completion figures.
Editable copy and data live in `src/content.ts`.

Photography in `public/images/` is **temporary concept imagery sourced from
Unsplash**, not completed Skyline projects. It is treated in grayscale and
labelled as concept imagery on the page. Replace it with licensed photography of
real Skyline work before launch, then:

1. Update the files in `public/images/` (or change the paths in `src/content.ts`).
2. Review the alt text for accuracy.
3. Remove or update the concept-imagery notes in `About`, `Designs`, `Showcase`
   and `Footer`.
4. Keep a record of the photographer and source URL for each replacement image.

The Unsplash License does not require attribution, but the current files are
placeholders and should not be presented as Skyline projects. The supplied logo
is `public/logo.png`; `public/skyline-original.jpg` is the original reference
artwork.

### Lookbook image credits

The 19 lookbook images in `public/images/showcase/` are temporary concept
imagery. Eighteen are sourced from Unsplash. One is used under a Creative
Commons licence:

- `lighting-chandelier.jpg` — “The Mardan Palace lobby” by **atkinson000** on
  Flickr, licensed under
  [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). The credit is also
  shown in the lookbook lightbox.

Replace these images with licensed photography of real Skyline work before
launch, update the alt text and credit fields, and keep a record of each new
source.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `acid` | `#E6E440` | Primary brand accent |
| `ink` | `#000000` | Primary background and type |
| `bone` | `#F3F1E6` | Warm editorial sections |
| `paper` | `#FFFFFF` | Light text and cards |
| `smoke` | `#0B0B0B` | Raised dark surfaces |
| `mute` | `#85857A` | Secondary neutral |

Fonts: **Sora** for display type, **Manrope** for body copy and **JetBrains Mono**
for labels and metadata.

The interface includes a skip link, keyboard-trapped mobile menu, visible focus
states, reduced-motion handling, labelled form fields and honest empty states.
The original sections were audited with axe for WCAG A/AA at 1440, 1024, 390 and
320 pixels with zero reported violations. The lookbook follows the same patterns
(keyboard lightbox with a focus trap, labelled controls, reduced-motion
fallbacks) but should be included in the next full audit. That is a
point-in-time automated check, not a formal accessibility certification.

## Project structure

```text
.
├── public/
│   ├── images/              # Temporary concept photography (incl. showcase/)
│   ├── logo.png             # Supplied Skyline logo
│   └── skyline-original.jpg # Supplied reference artwork
├── src/
│   ├── components/          # Page sections and UI primitives
│   ├── lib/                 # Smooth-scroll and class helpers
│   ├── App.tsx              # Page composition and shared quote state
│   ├── config.ts            # Contact details
│   ├── content.ts           # Copy, designs, lookbook, upgrades and process data
│   ├── index.css            # Tailwind theme and global styles
│   └── main.tsx
├── archive/v1-static/       # Original static site, retained for reference
├── index.html
├── vite.config.ts
└── README.md
```

`archive/v1-static/` is not part of the Vite build. It preserves the first static
version for copy and design reference.

## Preview captures

- `preview-desktop.png` - full-page capture at 1440px
- `preview-mobile.png` - full-page capture at 390px

These are generated captures of the full document. Sticky sections and
scroll-linked images can appear differently in a single full-page capture than
they do in the live, scrolling site.

## Deployment notes

1. Verify the contact details in `src/config.ts` and confirm the call, WhatsApp
   and email links work.
2. Replace the concept photography and review the disclaimers.
3. Run `npm run build` and deploy the generated `dist/` folder to any static host
   (Netlify, Vercel, Cloudflare Pages, GitHub Pages or similar).
4. Update the Open Graph image and canonical URL in `index.html` to absolute
   production URLs so social previews resolve correctly.
5. Point the quote form at a real backend if enquiries should be delivered
   automatically.

## Status

The front end is complete and buildable. Contact details are configured; the
remaining launch dependencies are approved project photography and, if desired,
a form delivery endpoint.
