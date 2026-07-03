# Project Context — Nitpreet Bamra's Personal Website

> **Purpose of this file:** a complete handoff so any future Claude (or developer)
> can pick up exactly where the last session left off. Read this top-to-bottom
> before making changes. Last updated: **July 2026**.

---

## 1. What this is

The personal website of **Nitpreet Bamra** — a final-year Mechatronics Engineering
student at the University of Waterloo, currently a Data Analyst at Super.com.

- **Repo:** `github.com/NitpreetB/Personal-Website` (branch `main`)
- **Live host:** Vercel (auto-deploys on every push to `main`)
- **Goal / vibe the owner asked for:** clean, mysterious, engaging, dark, photo-
  and color-rich. NOT the plain white starter it began as. Think cinematic,
  editorial, "after dark."

### Origin story
The site started life as a **Wix site** (the "wixstro" Astro-on-Wix template) at
`my-site-lwatyry6-nitpreetbamra.wix-vibe.com`. The owner wanted **all Wix
dependencies removed** and the site made professional and reliable. That
migration is **done** — it is now a plain, portable Vite SPA with no platform
lock-in.

---

## 2. Tech stack (current)

| Layer | Choice |
| --- | --- |
| Build tool | **Vite 6** (`vite.config.ts`) |
| Framework | **React 18** + **TypeScript** (SPA, not SSR) |
| Routing | **react-router-dom v7** (`createBrowserRouter`, client-side) |
| Styling | **Tailwind CSS v3** (`tailwind.config.ts`) + one global stylesheet |
| Animation | **framer-motion** (used heavily — scroll, parallax, layout, reveals) |
| Icons | **lucide-react** |
| Dates | **date-fns** |
| Deploy | **Vercel** (config in `vercel.json`) |

**There is NO Wix, NO Astro, NO CMS anymore.** If you see references to `@wix/*`,
`@astrojs/*`, or a CMS in old memory — they're gone. Do not reintroduce them.

### Commands
```bash
npm install          # deps (~150 packages, fast)
npm run dev          # local dev server (Vite)
npm run build        # production build -> dist/
npm run preview      # serve the production build locally
npm run check        # tsc --noEmit typecheck
```
Always run `npm run check && npm run build` before committing — both must pass.

---

## 3. Design system ("Lamplight" theme)

Dark, warm, editorial. Defined in `tailwind.config.ts` + `src/styles/global.css`.

**Colors** (Tailwind tokens — use these names, don't hardcode hex):
- `background` `#0B0B10` — near-black indigo night
- `panel` `#111118` — slightly lifted section background
- `foreground` `#EAE8E1` — warm off-white ink
- `dark-gray` `#B9B6C3` — muted body copy (name kept from template)
- `secondary` `#8F8C9C` — muted labels
- `light-gray` `#232331` — hairlines / borders (name kept from template)
- `accent` `#E3A857` — **amber-gold** (the signature color; echoes the
  streetlights/lanterns in Nitpreet's own photos)
- `accent-dim` `#8A6A3B` — muted gold

**Fonts** (loaded via Google Fonts in `index.html`):
- `font-heading` → **Fraunces** (serif; used big, often `font-light` + `italic`
  for the accented word)
- `font-paragraph` → **Space Grotesk** (sans; body + all UI labels)

**Recurring patterns / conventions:**
- `.eyebrow` utility class = tiny uppercase wide-tracked label (e.g. `01 — About`).
  Defined in `global.css`. Override color with `!text-accent` etc.
- `.grain` class on the router Layout adds an animated film-grain overlay site-wide.
- Titles usually render one word italic + gold: `Now <em className="text-accent">spinning</em>`.
- Section reveals: `initial opacity/y` → `whileInView`, `ease: [0.16, 1, 0.3, 1]`.
- Interior pages use the shared `<PageShell eyebrow title intro>` wrapper.
- `prefers-reduced-motion` is respected in a few places (e.g. the vinyl spin).

---

## 4. File map & where content lives

```
index.html                     # HTML shell, font <link>s, favicon, SPA redirect script
vite.config.ts                 # Vite + React plugin, "@/" alias -> src/
tailwind.config.ts             # theme tokens (see §3)
vercel.json                    # SPA rewrite: all routes -> /index.html
tsconfig.json                  # strict TS, "@/*" path
postcss.config.mjs             # tailwind + autoprefixer

src/
  main.tsx                     # React entry, mounts <AppRouter>, imports global.css
  styles/global.css            # Tailwind layers + .eyebrow, .grain, scrollbar, selection
  components/
    Router.tsx                 # all routes (see §5)
    Header.tsx                 # fixed nav + full-screen "Index" overlay menu
    Footer.tsx                 # "Say hello" contact CTA + links
    PageShell.tsx              # shared interior-page frame (eyebrow/title/intro)
    SegmentedControl.tsx       # animated pill toggle (used on Music/Movies)
    Head.tsx                   # ⚠️ DEAD Wix leftover, not imported anywhere — safe to delete
    ui/image.tsx               # thin <img> wrapper (kept old Wix call sites working)
    pages/
      HomePage.tsx             # hero + about + featured projects + experience + "Takes" + home base
      ProjectsPage.tsx         # full project list
      ProjectDetailPage.tsx    # per-project case study (:id route)
      WorkPage.tsx             # experience timeline
      EducationPage.tsx        # Waterloo
      StoryPage.tsx            # "My story" chapters + lantern photo
      TravelPage.tsx           # ⭐ fluid scrollytelling travel journal (see §7)
      MusicPage.tsx            # ⭐ "Now Spinning" album reviews (see §6)
      MoviesPage.tsx           # ⭐ "Screening Room" film reviews (see §6)
  data/                        # ← EDIT CONTENT HERE, not in components
    site.ts                    # name, tagline, email, github, linkedin, location
    projects.ts                # all projects (list + case-study fields); `featured` flag
    experience.ts              # work history + education object
    trips.ts                   # travel journal data (see §7)
  lib/scroll-to-top.tsx        # scroll restoration on route change

public/
  photos/
    night-walk.jpg             # hero bg on HomePage (Nitpreet's real photo)
    lantern.jpg                # StoryPage (real photo)
    travel/                    # optimized NYC trip photos (see §7)
  favicon.svg
  404.html                     # GitHub-Pages SPA fallback (unused on Vercel; harmless)

photo-inbox/                   # 📥 staging area for new photos (see §8) — GITIGNORED
  README.md                    # (the only committed file in here)
  NYC_2026/*.HEIC              # original iPhone photos (gitignored, local only)
```

**Golden rule:** content (text, project lists, trips) lives in `src/data/*.ts`.
Components read from there. Change copy in the data files, not the JSX.

---

## 5. Routes (`src/components/Router.tsx`)

| Path | Page |
| --- | --- |
| `/` | HomePage |
| `/projects` | ProjectsPage |
| `/projects/:id` | ProjectDetailPage |
| `/story` | StoryPage |
| `/work` | WorkPage |
| `/education` | EducationPage |
| `/travel` | TravelPage |
| `/music` | MusicPage |
| `/movies` | MoviesPage |
| `*` | redirect to `/` |

**Removed on purpose** (owner asked): Books, Activities, Blog. Their pages,
routes, and nav links are all deleted. The header "Index" menu groups links as:
- **The Work** — Projects, Experience, Education
- **The Person** — My Story, Travel
- **The Takes** — Music, Movies

---

## 6. Music & Movies pages (redesigned, "modern/trendy/animated")

The owner asked for improved effects on these two. Current state:

**MusicPage — "Now Spinning"**
- Each album is a full-width alternating (left/right) section.
- A **vinyl record spins** behind each cover and slides further out on hover.
- The album's `primaryColor` washes the background (radial glow) + tints the
  cover's drop shadow.
- **Animated rating meter** fills to `rating/10` on scroll-in.
- Sort controls are `<SegmentedControl>` gold pills; re-sorting animates album
  order via framer `layout`.
- Data is inline in the component (8 albums). Reviews are mostly placeholder
  ("Review coming soon") — owner will supply real ones.

**MoviesPage — "The Screening Room"**
- The active film's poster becomes a **giant blurred backdrop** that cross-fades
  when you select a different film.
- Poster wall: posters lift/tilt on hover, desaturate when inactive, selected one
  gets a "Now Showing" badge + accent glow ring.
- Sticky **review panel** slides in per selection, animated rating meter,
  staggered genre chips.
- Genre/sort/direction are `<SegmentedControl>` pills with layout-animated filtering.
- Data inline (3 films: Inception, Scarface, Pulp Fiction). Reviews placeholder.

Both pages share the amber/dark theme and were verified via screenshots.

---

## 7. Travel page (the current active work — READ THIS)

**Concept the owner wants:** trips in chronological order, one **fluid continuous
scroll** — no clicking into external/detail pages. Photos placed throughout.

**Implementation** (`TravelPage.tsx` + `src/data/trips.ts`):
- A **gold "timeline spine"** on the left fills as you scroll.
- Each trip = a **chapter** with a **sticky trip rail** (Trip №, dates, location,
  coords, duration) pinned while content scrolls past.
- Photos are in **staggered, overlapping clusters** with **parallax** (each drifts
  at a different speed via `useScroll`/`useTransform`), subtle tilts, hover zoom.
- Between photo clusters sit **"moment" journal blocks** (Day 01–02 / Day 03 / Day 04).
- Optional **3-up gallery row** per trip (used for a "The Met" interlude).
- Page ends with a **"Next stop — To be determined…"** teaser for the next trip.

**Photo slot system in `trips.ts`:** each trip has a `photos[]` array (5 slots).
A slot with `src` set renders the image; a slot with **no `src`** renders a
dashed **"wanted" frame** on the page describing the shot + the filename to drop
in `photo-inbox/`. This is how missing photos are represented.

**First trip: New York City (May 15–18, 2026).**
- All 5 primary photos placed in `public/photos/travel/`.
- Converted from iPhone HEIC via pillow-heif (libheif's `heif-convert` CLI failed
  on HDR files with "Too many auxiliary image references").
- 8 JPEG files: nyc-01-hero-dusk, nyc-02-street-timessquare, nyc-03-detail-pizza,
  nyc-04-walk-dumbo, nyc-06-closing-ferry, plus 3-shot Met interlude (facade,
  court, papyrus).
- **Candid photo removed** (`nyc-05-candid.jpg` — "Proof I was there") per owner request.
- Narrative prose still placeholder copy — owner to provide real stories.

**Second trip: Italy (April 24–May 1, 2026): draft added, awaiting photos.**
- Multi-city: Venice → Naples → Pompeii → Amalfi Coast → Rome.
- 5 photo slots + optional 3-photo Pompeii gallery (8 total "wanted" frames).
- All photo descriptions and captions already in `trips.ts`.
- Owner drops HEIC files in `photo-inbox/Italy_2026/` → Claude optimizes & places.

**⚠️ PLACEHOLDER CONTENT:** All trip prose (`intro` + the three `moments`
bodies) in `trips.ts` is **placeholder copy** the owner will replace with real
stories. Keep lengths similar so the layout breathes. Adding future trips = append
another object to the `trips` array (they render oldest→newest by array order).

---

## 8. Photo inbox workflow

`photo-inbox/` is the owner's **staging area** for new photos. It is **gitignored**
(originals are heavy) — only `photo-inbox/README.md` is committed. Web-optimized
copies that make it into `public/photos/` are what actually ship.

Workflow: owner drops photos in (descriptive filenames or subfolders like
`NYC_2026/`) → asks Claude to "implement the photos" → Claude optimizes them
(cap long side ~2000px, JPEG q80, progressive), moves them to `public/photos/`,
and wires them into the right page/data file.

To convert HEIC (iPhone) photos, use Python + pillow-heif:
```python
from pillow_heif import register_heif_opener; from PIL import Image, ImageOps
register_heif_opener()
img = ImageOps.exif_transpose(Image.open("x.HEIC")).convert("RGB")
img.thumbnail((2000, 2000)); img.save("x.jpg", quality=80, optimize=True, progressive=True)
```

---

## 9. Deployment & GitHub auth (IMPORTANT for pushing)

**Hosting:** Vercel, connected to the GitHub repo. It auto-detects Vite
(build `npm run build`, output `dist`). `vercel.json` rewrites all routes to
`/index.html` so SPA deep links (`/travel`, `/projects/...`) don't 404.
**Every push to `main` auto-deploys.** Custom domain (e.g. nitpreetbamra.com)
would be set in Vercel → Project → Settings → Domains.

**Git auth in this cloud (Coder) workspace — the gotcha:**
The workspace has NO GitHub credentials by default (only a GitLab auth provider),
so `git push` over HTTPS FAILS with "could not read Username for github.com".
This was fixed by:
1. Generating an **SSH key** (`~/.ssh/id_ed25519`) in the workspace.
2. Owner added the **public key** to GitHub (Settings → SSH keys).
3. Remote switched to SSH: `git remote set-url origin git@github.com:NitpreetB/Personal-Website.git`
4. `github.com` added to `~/.ssh/known_hosts`.

So **`git push origin main` now works over SSH** from this workspace. If you're in
a FRESH workspace where that key doesn't exist, you'll need to redo steps 1–4
(the owner must add the new public key to GitHub via browser — Claude can't).

**Commit message convention** (owner's environment runs gitleaks on commit):
end commit messages with:
```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```
Only commit/push when the owner asks.

---

## 10. Owner facts & preferences

- **Name:** Nitpreet Bamra. **Email:** nitpreetbamra@gmail.com.
  **GitHub:** github.com/NitpreetB. **LinkedIn:** linkedin.com/in/nitpreetbamra/
  (this exact LinkedIn URL was explicitly corrected by the owner — keep it).
- Based in Mississauga ↔ Waterloo, Ontario.
- Work history & projects are real (see `experience.ts`, `projects.ts`): Super.com
  (Data Analyst), Arcturus Networks (MLOps), ATS Life Sciences (Machine Vision),
  Blue Lion Labs (ML Research). Projects: fraud classifier, lane detection, Stewart
  platform, DetectME, DINOio, sorting visualizer, PocketWatch.
- Music taste (real, in MusicPage): The Weeknd, PARTYNEXTDOOR, Dave, Kali Uchis,
  Tate McRae, Zara Larsson, Mariah the Scientist, Central Cee.
- **Working style:** likes to give creative latitude ("you take the reins") but
  has clear opinions; iterates section by section; provides real content after
  seeing a mock/format first (that's the pattern for Travel).

---

## 11. What's done vs. outstanding

**Done:**
- ✅ Full Wix removal → Vite/React/TS/Tailwind SPA
- ✅ "Lamplight" dark redesign across all pages
- ✅ Home, Projects, Project detail, Work, Education, Story pages
- ✅ Removed Books/Activities/Blog
- ✅ Music & Movies redesigned with heavy animation
- ✅ Travel page built with fluid scrollytelling + NYC photos placed
- ✅ Candid "proof I was there" photo slot removed per owner request
- ✅ Italy trip (April 24–May 1, 2026) added as draft, awaiting photos
- ✅ Pushed to GitHub, deployed on Vercel (auto-deploy live)

**Outstanding / next likely tasks:**
- ⬜ Italy trip photos: owner drops HEIC files in `photo-inbox/Italy_2026/`, Claude
  converts & places (8 photos: 5 primary + 3 gallery)
- ⬜ Real trip narratives for NYC & Italy (owner to provide) — replace mocks in
  `trips.ts`
- ⬜ Real reviews for Music albums & Movies (currently "Review coming soon")
- ⬜ More trips appended to `trips.ts` as they happen
- ⬜ (Optional) delete dead `src/components/Head.tsx`
- ⬜ (Optional) custom domain on Vercel
- ⬜ (Nice-to-have) the site is one big JS bundle (~150KB gzipped); could
  code-split routes later if it grows.

---

## 12. How to verify visual changes

The owner responds well to seeing results. This workspace can run headless
Chromium via Playwright for screenshots (installed on demand with
`npm i -D playwright && npx playwright install chromium`; system libs `libgbm1`,
`libnss3`, `libasound2t64` were needed and installed via apt). Pattern used:
run `npm run preview -- --port 5199`, then a small Playwright script that visits
routes, scrolls, and screenshots to `scratchpad/`. Remove Playwright from
devDependencies when done (it's not a runtime dep).
