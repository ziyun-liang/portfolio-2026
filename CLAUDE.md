# Portfolio Site — Living State

Personal long-form portfolio. Editorial three-column layout (left TOC · center essay · right marginalia), inspired by the Thinking Machines genre. Built fresh: own design tokens, own CSS, open-source typefaces. Astro 6 + MDX, fully local repo, no remote. Will be password-protected when deployed.

---

## ▶ In progress — Advertising at the Times case study

Case study 3 was repositioned: replacing Wellness Shop with a 4-year retrospective on Lindsey's NYT Advertising work. Order on the index unchanged (NYT Search → Summary → Advertising). Currently scaffolded; starting with Context section using the standard co-writing workflow.

### Note on parallel work — Summary assets

A separate Claude session is producing the visual assets for Summary (the placeholder PNGs/MP4 currently rendering). **Do not touch `public/media/summary/` in this session** — let the other Claude own it. The MDX references will resolve when those files appear.

---

## Status

### Case study 1: NYT AI-Powered Search — COMPLETE
All 5 sections written + committed.
- File: `src/content/work/nyt-search.mdx`
- Real visual already in place: `public/media/nyt-search/ai-elements.png`
- Visuals to drop in later (placeholders rendering): `intent-map-figjam.png`, `intent-map-prototype.mp4`, `early-concepts.png`, `latest-news-card.png`, `latest-news-interaction.mp4`, `ai-label-before.png`, `ai-label-after.png`

### Case study 2: Summary at the Times — COMPLETE
All 5 sections written + committed.
- File: `src/content/work/summary.mdx`
- Title: "Summary at the Times"
- Dek: "A capability that takes many shapes — text, audio, email, article overview — across NYT's brands and surfaces."
- Slug: `/work/summary` (renamed from Article Overview)
- Visual placeholders rendering until parallel asset work lands: `architecture-diagram.png`, `story-card-sketches.png`, `story-card-comps.png`, `story-card-prototype.mp4`
- Reminder: a separate Claude session owns the Summary assets — don't touch `public/media/summary/` here.

### Case study 3: Advertising at the Times — IN PROGRESS
- File: `src/content/work/advertising.mdx` (scaffolded; sections still placeholder)
- Title: "Advertising at the Times"
- Dek: "Four years leading the design of the ad experience across the Times' bundle — Games, Cooking, The Athletic, Wirecutter, and News."
- Slug: `/work/advertising`
- **Non-standard structure**: 3 sections, not 5 — Context, Major Contribution, Reflection. Major Contribution has 3 h3 sub-sections: Monetizing the bundle, Video monetization, Internal ad tooling. (Smoke test updated to expect h2Count: 3 for this slug.)
- Replaced Wellness Shop in case study 3 slot. Old `public/media/wellness-shop/` renamed to `public/media/advertising/`.
- Confidentiality: revenue numbers from public earnings (e.g., 2025's double-digit ad revenue growth) are OK to cite. Internal infra names still off-limits unless they earn their place.
- ⏳ Context — next to write
- ⏸ Major Contribution — pending (3 sub-sections)
- ⏸ Reflection — pending

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
Content: `src/content/work/{nyt-search,summary,wellness-shop}.mdx`
Styles: `src/styles/{tokens,base,fonts}.css`
Media: `public/media/{nyt-search,summary,wellness-shop,about}/`
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

5 routes: `/`, `/about`, `/work/nyt-search`, `/work/summary`, `/work/wellness-shop`.

---

## Notes for future sessions

- Repo is on `main`, no remote, ~25 commits. Don't push without asking.
- All work has been done with each section approved by Lindsey before commit.
- The "tools as clarity" framing in NYT Search Exploration is Lindsey's own POV — keep the through-line consistent across case studies.
- The "From Times coverage" / prompt-as-design-surface insight is the strongest single moment in NYT Search; it lands in Reflection.
- Summary's Reflection through-line: *design as making the invisible visible*, paired with *process matters more than outcome / hold influence loosely when the decision isn't yours*. The card moved the room more than the system diagram did — keep that hierarchy if Summary comes up again.
- Do not over-credit Lindsey's individual contribution; honor the shared work. Don't undersell either — Lindsey was lead on key threads.
