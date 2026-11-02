# Thary Vireak — QA Command Center

A single-page QA Engineer portfolio built with React, TypeScript, Tailwind CSS, Vite, and Lucide React. It presents QA case studies, public project repositories, academic lab work, and a contact section.

## Sections

| # | Section | What it shows |
|---|---------|---------------|
| – | Hero | Profile, headline metrics (animated count-up), release-readiness console |
| 01 | Work | QA case-study explorer and linked public GitHub repositories |
| 02 | SETEC Lab | Academic capstone, SRS / acceptance-criteria showcase, lab architecture |
| 03 | About | Experience, skills, CV download, and contact (email and Telegram) |

## Features

- **Animation:** scroll reveals, count-up metrics, hero entrance, magnetic buttons with click ripple, cursor glow, and an animated network/glow/grid background. All motion is disabled for visitors with `prefers-reduced-motion`.
- **Responsive:** layouts adapt down to phone width.
- **Light and dark** theme colors, with the background canvas reading the theme palette.

## Project structure

```
src/
  App.tsx       Components, scroll/pointer hooks, animated background
  data.ts       Projects, GitHub repositories, skills
  styles.css    Styles, including the motion, button, and and mobile layers
  main.tsx      Entry point
public/
  PF3-web.jpg           Hero portrait (optimized copy of PF3.jpg)
  Thary_Vireak_CV.pdf   CV served by the "Download CV" button
  qa-mark.svg           Favicon
vercel.json     Vercel build and header configuration
```

## Development

Requires Node 18.18 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build    # type-checks, then builds to dist/
npm run preview  # serve the built site locally
```

## Updating content

- **Projects, repositories, skills:** edit `src/data.ts`.
- **CV:** replace `public/Thary_Vireak_CV.pdf`, keeping the file name.
- **Contact links:** email and Telegram (`https://t.me/reak6c`) are in the `About` component in `src/App.tsx`.
- **Portrait:** replace `public/PF3-web.jpg`. The crop is set at the end of `src/styles.css`.

## Deploy to Vercel

```bash
npm i -g vercel   # once
vercel            # preview deployment
vercel --prod     # production deployment
```

`vercel.json` sets the Vite build (`npm ci` → `npm run build` → `dist`), long-lived caching for `/assets`, and basic security headers. Alternatively, push the repo to GitHub and import it at vercel.com/new.

After the first deploy, change the `og:image` URL in `index.html` to an absolute URL (`https://<your-domain>/PF3-web.jpg`) so link previews work on every platform.

## Notes

`REPOSITORY_NOTES.md` records the public-repository details used for the GitHub cards. Repository ownership is not treated as proof of authorship or QA contribution.
