# Portfolio Site — Living State

Personal long-form portfolio. Editorial three-column layout (left TOC · center essay · right marginalia), inspired by the Thinking Machines genre. Built fresh: own design tokens, own CSS, open-source typefaces. Astro 6 + MDX, password-protected, deployed on Vercel.

---

## ▶ Live and deployed (2026-05-26)

- **Live URL:** https://portfolio-2026-ruby-rho.vercel.app
- **Repo:** https://github.com/ziyun-liang/portfolio-2026 (public)
- **Password:** set as `PORTFOLIO_PASSWORD` env var on Vercel — Lindsey holds the value
- **Deploy flow:** push to `main` → Vercel auto-deploys in ~1 min

Three case studies + CV + About all written and polished end-to-end. Asset optimization pass done (668M → 158M). Loading polish (font preloads, image fade-in, view transitions). Password gate works in production.

### Open threads (not blocking)

- **Other Selected Work — mobile redesign** — desktop sticky scroll-pair pattern is shipped. Mobile is currently `display: none` on the whole section (see Home page status above). Followup: design an inline-thumbnail-per-row pattern that doesn't depend on an absolute-positioned image pane. Until then, the entire "Other Selected Work" surface is desktop-only.
- **More demo videos for Selected Work** — only NYT Movie Planner and NYT Cooking Planner have `.mp4` previews so far. Remaining Figma Make / unreleased prototype entries still rely on a static `.png`. Recording short (~30–60s) muted screen captures and dropping them in `public/media/selected/` will progressively replace stills with autoplay video as time allows.
- **Empty company folders** at `public/media/about/{marco-polo-learning,madwell,kettle}/` (`.gitkeep` only) — leftover from an earlier "per-company gallery" idea that's been superseded by the Selected Work section. Safe to delete or repurpose.
- **CV** — Kettle, Madwell, MarcoPolo Learning role descriptions still empty (`description: ""`). Education section placeholder. Skills section TBD whether to include.

---

## Status (current as of 2026-05-26 polish + deploy session)

### Case study 1: NYT AI-Powered Search — POLISHED
- File: `src/content/work/nyt-search.mdx`
- Dek: *"Designing AI search grounded in NYT's human reporting, not flat synthesized answers."*
- Title: "AI-Powered Search at The Times"
- All bold sub-heads dropped (no more `**The thesis.**` etc.). Em dashes cleared from new prose. Section structure intact.
- Context tightened from 3 paragraphs to 2. NAPP framing: "NYT formed a new mission" not "formalized work as."
- Approach opens directly with Show vs. Tell thesis.
- Exploration: dropped `### Tools as clarity` h3, paragraph carries the idea.
- Reflection: 5 paragraphs → 2 paragraphs. Vibe-coding personal beat dropped. New closer about NYT newsroom embracing AI.
- All assets wired and compressed.

### Case study 2: AI Summary at The Times — POLISHED
- File: `src/content/work/summary.mdx`
- Dek: *"Designing AI summary as a visual, interactive layer that draws readers into NYT's reporting."*
- Title: "AI Summary at The Times"
- Slug: `/work/summary`
- Approach reframed: industry default = text/efficient, NYT bet = additive/visual/interactive. Big "open questions" block dropped. Bold sub-heads removed.
- Exploration restructured into a clear 8-beat arc: opener → directions image → narrative-arc beat → 5-slide buildout image → prototype-fast beat → prototype video → positive margin → range exploration → NYT identity → margin (travel) → scalability beat → TA capability image → architecture beat → Scoop image.
- Architecture footnote dropped. The Athletic named explicitly as the working example for cross-brand scalability.
- All assets wired (incl. `industry-vs-nyt-bet.png` for the audit figure).

### Case study 3: Advertising at the Times — POLISHED
- File: `src/content/work/advertising.mdx`
- Dek: *"Four years expanding the ad business across NYT's entire product suite."*
- Timeframe: "Sep 2021 - Jan 2026"
- 4 sub-sections under Major Contribution now numbered (1. Monetizing the bundle, 2. Building native ad products, 3. Video monetization, 4. Internal ad tooling).
- Context tightened: dropped credit margin, removed bold sub-heads, switched Joy Robins quote to a real `<Quote cite="...">` block (now matches NYT Search's pattern). AdWeek footnote uses the actual canonical URL.
- Native format entries reframed (Wordle Flex XL = co-branded puzzle, Product Carousel = hero+carousel with two design goals, Wirecutter Shopper = affiliate-only Picks promotion). Cooking Sponsored Collection grounded with Instacart example.
- "What didn't ship" subsection collapsed to a single-sentence intro. NYT app tab sponsorship visual relabeled (was misnamed `unshipped-athletic-moments.png`).
- Section 4 reframed around Kaleidoscope as NYT's internal ad data and measurement tool. AI features are: smarter search, AI-generated 3-page post-buy report, Kaleidoscope platform redesign. Section bookended by old/new bookend before/after of Kaleidoscope.
- Reflection rewritten: same three through-lines (reader-first inside constraints, working in someone else's space with mutual goals, designing for scale), but tightened and bold sub-heads dropped.
- Cover swapped from 200MB GIF to 5.8MB MP4 (home card thumbnail now supports `<video>` for `.mp4` thumbnails).

### About page — REWRITTEN to 2 short paragraphs (2026-05-26)
- File: `src/pages/about.astro`
- Was 7 paragraphs (current role + values + magic power + startup + agency + NYT + one-person-shop). Now: career arc paragraph + values paragraph.
- Opener (2026-05-26 evening): *"Ten years into product design, I find myself useful in any room, maybe because I've been in a few different kinds."* — fronts a credibility anchor (ten years, Dec 2015 → now) before the value claim, so "useful" lands as earned rather than asserted cold. Comma joiner keeps the rhythm smooth (vs. an earlier draft using a period after "now" that read more staccato).
- Career arc: startup (*MarcoPolo Learning*, linked to https://marcopoloworldschool.com/) → agency (*Madwell*, *Kettle*, Kettle linked to https://www.wearekettle.com/) → NYT (patience/resilience/communication framing, replaced earlier "advocacy as much as pixels").
- Values paragraph: *"Good design, to me, is clarity and high craft with a memorable touch. What I'm looking for is an ambitious idea and a group of strong partners excited to drive in the dark together..."*
- Page-level changes: dropped `### About` h2 section label. Contact section: email + LinkedIn both Work Sans 15px, ↗ arrow only, no underline, both open in new tab.
- $8M Marco Polo Learning raise reference dropped entirely (no longer in copy; TODO from earlier session resolved by removing).

### CV page — SCAFFOLDED (`/cv`)
- Same as before. Roles wired, NYT roles described, Kettle/Madwell/MarcoPolo roles still empty (`description: ""`). Education + Skills sections still pending.

### Home page — TIGHTENED
- File: `src/pages/index.astro`
- Intro: *"I'm a lead product designer at The New York Times, currently building user-facing AI features."*
- Card thumbnails support both `<img>` (PNG/JPG) and `<video>` (MP4). The Advertising card now renders `cover.mp4` as a looping muted video.
- All three case study deks rewritten to lead with "Designing AI..." or "Four years..." patterns (concrete, no em dashes, no list-only descriptions).
- **Other Selected Work section** (`SelectedWork.astro` + `src/data/selected-work.ts`) is shipped on desktop only. Sticky scroll-pair pattern: image pane on left, list of project · employer · year · role on right. 20 entries spanning NYT, TRLab, Kettle, Madwell, Hatch, MarcoPolo Learning. Image pane now also supports `<video>` for `.mp4` entries (autoplay loop muted playsinline preload="metadata"). NYT Movie Planner and NYT Cooking Planner render as videos; AI User Research Site stays static. Three Vibe Code with Figma Make entries had their `.figma.site` URLs stripped (the URLs 302-redirect to Figma auth — not truly public); they render as plain-text rows. Wrapped in `.selected-work-wrap` and **hidden via `display: none` at `≤899px`** because the sticky pane's absolute-positioned image layers escape their static parent on mobile and overlay the case study cards. Proper mobile redesign is a follow-up (likely inline thumbnails per row, no sticky pane).

---

## Co-writing workflow (Lindsey's preference)

For copy revisions:
1. Lindsey points at a paragraph and says what feels off
2. Assistant proposes 2–3 specific options with tradeoffs
3. Lindsey picks
4. Assistant edits the file

Length targets per case study section: ~150–400 words now (after the 2026-05-26 tightening pass), down from 250–500.

---

## Writing-style memories (forward-looking only, won't rewrite history)

These are saved in auto-memory and apply to new copy:
- **No em dashes** — use periods, commas, colons, parens, or restructure. Hyphens in compound modifiers are fine.
- **No label-colon openings** — avoid "Label: rest of clause" as a sentence/paragraph opener. Mid-sentence colons introducing lists/restatements are fine.
- **No bold sub-heads inside case study bodies** — `**The thesis.**` / `**Open questions.**` style was systematically removed. Section structure is `## h2` and `### h3` (numbered for Advertising's Major Contribution sub-sections); body prose stands without labeled lead-ins.

---

## Confidentiality reminder

Site is password-gated but still a public-facing artifact. In copy:
- AdWeek figures OK (Q4 2025 +24.9% YoY; Q1 2026 +31.6% / $93.3M)
- Internal-only figures skipped (Games revenue, Flex 2.0 Beta numbers, etc.)
- "Elvex" generic-ized to "AI-assistant button"; Kaleidoscope and Scoop kept by name (load-bearing artifacts)
- The Athletic, Cooking, Wirecutter, NAPP, Newsroom AI Initiative team — all named, public surfaces
- "First ever in product" claims hedged where used

---

## Site-wide conventions

- **External links open in new tab**: `rehype-external-links` plugin (in `astro.config.mjs`) auto-applies `target="_blank" rel="noopener noreferrer"` to any markdown-style external link in MDX. No per-link work needed.
- **Work dropdown nav**: `SiteHeader.astro` renders a hover/focus dropdown under "Work" with the three case studies. Click "Work" still goes to `/`.
- **Quote component cite color**: brown `var(--ink)` (was `var(--ink-muted)` grey).
- **Selection color**: `var(--select-bg)` (`#BBC9C8`, slightly darker than `--bg`); does NOT use `--highlight` yellow (which is reserved for active nav underlines).
- **Margin notes (side rail)**: 15px Work Sans, applies to all `<Margin kind="...">` blocks.
- **Case study title**: top-aligned with My Role meta, letter-spacing `-0.025em`.
- **Image/video fade-in**: 0.4s opacity animation site-wide on `<img>` and `<video>` elements; respects `prefers-reduced-motion`.
- **View transitions**: Astro `<ClientRouter />` in `Base.astro` for crossfade page navigation.

---

## Stack & files

- Astro 6 + MDX + TypeScript strict
- Output mode: `server` (SSR) via `@astrojs/vercel` adapter — required so middleware runs on every request for password gate
- Self-hosted Source Serif 4 (`.ttf`) + Work Sans (`.woff2`) + Inter (`.woff2`) + JetBrains Mono (`.ttf`) — all open-source, in `public/fonts/`
- `rehype-external-links` ^3.0.0 (auto-target=_blank for external links)
- Playwright smoke tests: `tests/smoke.spec.ts`

**Project-local `.npmrc`** forces `registry=https://registry.npmjs.org/` so installs work on Vercel even if a contributor's global `~/.npmrc` points to a private registry (e.g. NYT Artifactory). Critical for deploys.

**Files:**
- Layouts: `src/layouts/{Base,CaseStudy}.astro`
- Components: `src/components/{SiteHeader,Footer,LeftNav,Margin,Figure,Video,PullQuote,Quote,Aside,CaseStudyCard,SelectedWork,Fn}.astro`
- Pages: `src/pages/{index,about,cv,login}.astro` + `src/pages/work/[slug].astro` (SSR'd via `getEntry()`, NOT `getStaticPaths()`) + `src/pages/api/auth.ts`
- Middleware: `src/middleware.ts` (password gate; bypasses static assets and the `/login` + `/api/auth` routes)
- Content: `src/content/work/{nyt-search,summary,advertising}.mdx` + `src/content/config.ts` (zod schema)
- Data: `src/data/selected-work.ts` (Other Selected Work entries with optional `url` field)
- Styles: `src/styles/{tokens,base,fonts}.css`
- Media: `public/media/{nyt-search,summary,advertising,about,selected}/` + `public/media/_placeholder/video-placeholder.mp4` (shared placeholder). The `selected/` folder backs the home page's Selected Work section — mostly `.png` stills, plus `nyt-cooking-planner.mp4` (2.3MB compressed from 33MB) and `nyt-movie-planner.mp4` (6.4MB).
- Fonts: `public/fonts/`
- Favicon: `public/favicon.svg` (solid `#DAE5E4` circle, replaces Astro logo)

---

## Commands

```bash
cd ~/projects/portfolio
npm run dev          # localhost:4321 (password gate bypassed locally since no PORTFOLIO_PASSWORD env var)
npm run build        # build to dist/ (and .vercel/output/ via adapter)
npm test             # Playwright smoke tests
npx astro check      # type/schema check
```

To trigger a Vercel redeploy: `git push` to `main`. Vercel auto-builds.

To set/change the live password: Vercel project → Settings → Environment Variables → `PORTFOLIO_PASSWORD` → Save → trigger redeploy from latest commit.

6 routes: `/`, `/about`, `/cv`, `/work/nyt-search`, `/work/summary`, `/work/advertising`, plus `/login` and `/api/auth` for the password gate.

---

## Notes for future sessions

- **Push without asking is OK now** that the deploy pipeline is live. Each push deploys in ~1 min. But always confirm with Lindsey before destructive ops (force push, history rewrite, deleting branches).
- **Asset optimization is done** but be careful adding new heavy media. Targets: PNGs ≤ 3MB, MP4s ≤ 8MB (use `ffmpeg -crf 28`), GIFs ≤ 10MB or convert to MP4. Originals get backed up to `raw assets/` (gitignored). Vercel hard limit is 100MB per file.
- **`raw assets/` is gitignored** — that's where original (uncompressed) source files live. Don't commit them.
- **The NYT private npm registry quirk**: Lindsey's global `~/.npmrc` points to NYT's Artifactory. The project-local `.npmrc` overrides this to public npm. Don't remove the project-local `.npmrc` or installs will bake NYT URLs into `package-lock.json` and break Vercel deploys.
- **Case study `[slug].astro` uses dynamic SSR lookup** — does NOT use `getStaticPaths()`. With output: 'server', that pattern would mean middleware doesn't run on those pages.
- **Don't over-credit Lindsey's individual contribution; honor the shared work.** Don't undersell either — Lindsey was lead on key threads.
- **Through-lines to preserve** (don't rewrite away in future passes):
  - NYT Search: show vs. tell, AI grounded in NYT reporting, designing through prompts (the bridging-line example), AI sharpens roles rather than replacing them.
  - Summary: design as making the invisible visible, additive/visual/interactive vs. text/efficient industry default, "ok with not knowing the fate of the project."
  - Advertising: reader-first inside constraints (slow, compounding impact), working in someone else's space with mutual goals, designing for scale.
  - About: useful in any room because of variety; clarity + high craft + memorable touch; partners excited to drive in the dark.

---

## Design system (foundational, set 2026-05-23, refined since)

**Typography hierarchy** (all open-source, in `public/fonts/`):
- H1 (case study title): Work Sans 600, `clamp(40px, 5vw, 66px)`, letter-spacing `-0.025em`
- H2/H3: Work Sans 500
- Body: Source Serif 4 17px, line-height 1.75
- Captions (Figure/Video figcaption) + footnote markers: JetBrains Mono 13px
- Margin notes: Work Sans 15px (was Inter 12px earlier)
- Tokens: `--font-display` (Work Sans), `--font-body` (Source Serif 4), `--font-sans` (Inter), `--font-mono` (JetBrains Mono)

**Color palette** (cool blue + dark brown):
- `--bg: #DAE5E4` (cool blue-grey paper)
- `--ink: #47250B` (dark brown)
- `--accent-coral: #FF6666` (footnote markers only)
- `--rule: #C6D3D2` (cool divider)
- `--highlight: #eeff83` (active nav underline only)
- `--select-bg: #BBC9C8` (text-selection background; new this session)

**Wide figure system**:
- `<Figure wide ... />` and `<Video wide ... />` opt-in per figure for editorial breakout
- Figures escape the `.cs-body` 3-col grid and span a wider track via `width: min(100vw - 64px, 1216px)` centered
- Caption stays anchored to body-column position

**TOC scroll-collapse**: LeftNav sticky with smart collapse based on scroll direction (collapses to active section on scroll down, re-expands on scroll up). Uses `:has(a.is-active)`.
