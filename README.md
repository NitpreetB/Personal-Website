# nitpreetbamra.github.io

Personal website of Nitpreet Bamra — a Vite + React + TypeScript + Tailwind single-page app. No CMS, no platform lock-in: all content lives in `src/data/`.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run check      # typecheck
```

## Edit content

| What | Where |
| --- | --- |
| Name, tagline, email, socials | `src/data/site.ts` |
| Projects (list + case studies) | `src/data/projects.ts` |
| Work experience & education | `src/data/experience.ts` |
| Music / movie / book reviews | `src/components/pages/{Music,Movies,Book}Page.tsx` |
| Photos | `public/photos/` |

## Deploy (GitHub Pages)

Build and publish `dist/` to Pages. `public/404.html` handles SPA deep links.
