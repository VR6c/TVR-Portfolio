# Thary Vireak — QA Command Center

A single-page QA Engineer portfolio built with React, TypeScript, Tailwind CSS, Vite, and Lucide React. It presents case studies, filterable manual test specifications, expandable defect evidence, requirements traceability, and an interactive REST API response viewer. Scroll-triggered section reveals respect reduced-motion settings.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deploy to Vercel

```bash
npm i -g vercel   # once
vercel            # preview deployment
vercel --prod     # production deployment
```

`vercel.json` sets the Vite build (`npm run build` → `dist`). Alternatively, push the repo to GitHub and import it at vercel.com/new.
