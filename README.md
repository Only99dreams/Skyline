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
  phone: "", // display format, e.g. "+254 700 000 000"
  whatsapp: "", // international format, digits only
  email: "", // e.g. "hello@example.com"
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

The empty contact values are intentional: no phone number, WhatsApp number,
email address or location has been invented. Fill these in and verify them
before launch.

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
3. Remove or update the concept-imagery notes in `About`, `Designs` and `Footer`.
4. Keep a record of the photographer and source URL for each replacement image.

The Unsplash License does not require attribution, but the current files are
placeholders and should not be presented as Skyline projects. The supplied logo
is `public/logo.png`; `public/skyline-original.jpg` is the original reference
artwork.

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
It has been audited with axe for WCAG A/AA at 1440, 1024, 390 and 320 pixels with
zero reported violations. That is a point-in-time automated check, not a formal
accessibility certification.

## Project structure

```text
.
├── public/
│   ├── images/              # Temporary concept photography
│   ├── logo.png             # Supplied Skyline logo
│   └── skyline-original.jpg # Supplied reference artwork
├── src/
│   ├── components/          # Page sections and UI primitives
│   ├── lib/                 # Smooth-scroll and class helpers
│   ├── App.tsx              # Page composition and shared quote state
│   ├── config.ts            # Contact details
│   ├── content.ts           # Copy, designs, upgrades and process data
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

1. Add the real contact details in `src/config.ts`.
2. Replace the concept photography and review the disclaimers.
3. Run `npm run build` and deploy the generated `dist/` folder to any static host
   (Netlify, Vercel, Cloudflare Pages, GitHub Pages or similar).
4. Update the Open Graph image and canonical URL in `index.html` to absolute
   production URLs so social previews resolve correctly.
5. Point the quote form at a real backend if enquiries should be delivered
   automatically.

## Status

The front end is complete and buildable. Remaining launch dependencies are real
contact details, approved project photography and a form delivery endpoint.
