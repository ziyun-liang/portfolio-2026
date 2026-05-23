# Portfolio Site — Living State

Personal long-form portfolio. Editorial three-column layout (left TOC · center essay · right marginalia), inspired by the Thinking Machines genre. Built fresh: own design tokens, own CSS, open-source typefaces. Astro 6 + MDX, fully local repo, no remote. Will be password-protected when deployed.

---

## ▶ All three case studies are written

Copy phase complete: NYT Search, Summary, and Advertising all have full text end-to-end. What's left is visual finalization (Summary assets via the parallel Claude; Advertising visuals to be added) and any deploy work (password protection, hosting).

### Note on parallel work — Summary assets

A separate Claude session is producing the visual assets for Summary (the placeholder PNGs/MP4 currently rendering). **Do not touch `public/media/summary/` in this session** — let the other Claude own it. The MDX references will resolve when those files appear.

---

## Status

### Case study 1: NYT AI-Powered Search — COMPLETE (copy + most visuals)
All 5 sections written. Visual placement restructure landed: figures/videos added throughout Context, Approach, Exploration, Outcome, Reflection. Two structural changes during wiring: content-card slot turned into a Video (Lindsey supplied an mp4), and the AI-label before/after collapsed into a single combined Figure (`ai-label.png`).

- File: `src/content/work/nyt-search.mdx`
- **Real assets wired (11):** `ai-elements.png`, `cover.png`, `vision-collage.png`, `summary-standards.png`, `search-as-ask-vision.png`, `intent-map-prototype.mp4`, `figma-2024-spec.png`, `content-card-system.mp4`, `intent-map-figjam.png`, `latest-news-interaction.mp4`, `ai-label.png`
- **Still placeholder grey-box (5):** `prototype-workflow.png` (Approach, second of the stacked How-I-worked pair), `early-concepts.png` (Exploration), `latest-news-card.png` (Exploration), `roadmap.png` (Outcome), `from-times-coverage.png` (Reflection). MDX uses `<Figure placeholder ... />` for these — when a real asset arrives, drop it in `public/media/nyt-search/` with the canonical name and replace `placeholder` with `src="/media/nyt-search/<file>"`.
- **Heads-up:** the three wired videos are heavy (15 MB, 12 MB, 5 MB). Fine for local dev; downsample before any deploy where size matters.

### Case study 2: Summary at the Times — COMPLETE
All 5 sections written + committed.
- File: `src/content/work/summary.mdx`
- Title: "Summary at the Times"
- Dek: "A capability that takes many shapes — text, audio, email, article overview — across NYT's brands and surfaces."
- Slug: `/work/summary` (renamed from Article Overview)
- Visual placeholders rendering until parallel asset work lands: `architecture-diagram.png`, `story-card-sketches.png`, `story-card-comps.png`, `story-card-prototype.mp4`
- Reminder: a separate Claude session owns the Summary assets — don't touch `public/media/summary/` here.

### Case study 3: Advertising at the Times — COMPLETE (copy)
All 3 sections + 4 sub-sections written. No visuals yet.
- File: `src/content/work/advertising.mdx`
- Title: "Advertising at the Times"
- Dek: "Four years leading the design of the ad experience across the Times' bundle — Games, Cooking, The Athletic, Wirecutter, and News."
- Slug: `/work/advertising`
- **Non-standard structure**: 3 sections — Context, Major Contribution (4 h3 sub-sections: Monetizing the bundle, Building native ad products, Video monetization, Internal ad tooling), Reflection. Smoke test pinned to h2Count: 3.
- Replaced Wellness Shop in case study 3 slot. `public/media/wellness-shop/` → `public/media/advertising/`.
- Through-lines pinned across the case study: reader-first inside constraints; working in someone else's space (collaboration without defensiveness); designing for scale across products *and* advertisers. Cross-link to Summary's "ok with not controlling outcomes" sits inside Building native ad products.
- Confidentiality: AdWeek figures OK (Q4 2025 +24.9% YoY; Q1 2026 +31.6% / $93.3M). Internal-only figures skipped (Games $11M→$32M, Flex 2.0 Beta $800k). "Elvex" generic-ized to "AI-assistant button"; Kaleidoscope kept by name as the load-bearing artifact.
- Source for the 4-year project audit: `~/Downloads/2025 Work Document - My work.csv`.

---

## Co-writing workflow (Lindsey's preference)

For each section:
1. Assistant asks 2–3 framing questions
2. Lindsey answers in bullets (rough is fine)
3. Assistant drafts inline in chat
4. Lindsey edits / pushes back
5. Assistant writes final to MDX file, builds to verify, commits
6. Move to next section

Length targets per section: ~250–500 words. Approach and Exploration tend to be longest.

---

## Confidentiality reminder

Portfolio will be password-protected, but is still a public-facing artifact. Avoid in copy:
- Specific dates / percentages / unannounced launch details
- "First ever in product" claims that haven't been publicly disclosed (one hedged use is in NYT Search Outcome — leave it)
- Internal infrastructure names unless they earn their place

OK to name (already in copy): NAPP, Cooking, Wirecutter, Scoop (in context), the Newsroom AI Initiative team, public product surfaces, role/team structure.

---

## Stack & files

- Astro 6 + MDX, TypeScript strict
- Self-hosted Source Serif 4 + Inter (SIL OFL)
- Playwright smoke tests: `tests/smoke.spec.ts` (4 tests, all passing)
- Spec: `docs/superpowers/specs/2026-05-20-portfolio-design.md`
- Plan: `docs/superpowers/plans/2026-05-20-portfolio.md`

Layouts: `src/layouts/{Base,CaseStudy}.astro`
Components: `src/components/{SiteHeader,Footer,LeftNav,Margin,Figure,Video,PullQuote,Aside,CaseStudyCard}.astro`
Content: `src/content/work/{nyt-search,summary,advertising}.mdx`
Styles: `src/styles/{tokens,base,fonts}.css`
Media: `public/media/{nyt-search,summary,advertising,about}/` (+ `_placeholder/video-placeholder.mp4` shared by Video placeholder mode)
Fonts: `public/fonts/`

---

## Commands

```bash
cd ~/projects/portfolio
npm run dev          # localhost:4321
npm run build        # static build to dist/
npm test             # Playwright smoke tests
npx astro check      # type/schema check
```

5 routes: `/`, `/about`, `/work/nyt-search`, `/work/summary`, `/work/advertising`.

---

## Notes for future sessions

- Repo is on `main`, no remote, ~25 commits. Don't push without asking.
- All work has been done with each section approved by Lindsey before commit.
- The "tools as clarity" framing in NYT Search Exploration is Lindsey's own POV — keep the through-line consistent across case studies.
- The "From Times coverage" / prompt-as-design-surface insight is the strongest single moment in NYT Search; it lands in Reflection.
- Summary's Reflection through-line: *design as making the invisible visible*, paired with *process matters more than outcome / hold influence loosely when the decision isn't yours*. The card moved the room more than the system diagram did — keep that hierarchy if Summary comes up again.
- Do not over-credit Lindsey's individual contribution; honor the shared work. Don't undersell either — Lindsey was lead on key threads.
- **Visual placeholder system:** `Figure` and `Video` both accept a `placeholder` boolean prop. When true they render a labeled grey box (image or autoplay video with full controls), with the alt text shown inside so flow is readable before real captures land. Use this for any new visual slot — drop assets later, swap `placeholder` → `src` to wire. Shared placeholder loop lives at `public/media/_placeholder/video-placeholder.mp4`.
