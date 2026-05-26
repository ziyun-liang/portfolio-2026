# Portfolio Site — Living State

Personal long-form portfolio. Editorial three-column layout (left TOC · center essay · right marginalia), inspired by the Thinking Machines genre. Built fresh: own design tokens, own CSS, open-source typefaces. Astro 6 + MDX, fully local repo, no remote. Will be password-protected when deployed.

---

## ▶ Three case studies + CV done · About is being rethought

NYT Search, Summary, Advertising — full text + visuals end-to-end. CV page (`/cv`) scaffolded from LinkedIn data. Header has Work · CV · About.

About page started this session with a clickable-company modal, then **Lindsey reverted to plain prose** and decided to put non-case-study work into a separate "selected work" surface (not modals on About). That's the next thread.

Visual planning ratified for the three case studies + About in `docs/superpowers/specs/2026-05-24-portfolio-visuals-design.md` and executed against `docs/superpowers/plans/2026-05-24-portfolio-visuals.md`.

### Picking up next — "Selected work" surface (Lindsey to design 2026-05-25)

Lindsey wants a place to show non-case-study work (Marco Polo Learning startup era; Madwell + Kettle agency era), but **not as modals on the About page**. The shape is TBD — could be a /work gallery section, a separate /selected page, or per-company pages. To be designed tomorrow.

- About page is plain prose; company names are italicized but not interactive.
- Empty company folders left in place: `public/media/about/{marco-polo-learning,madwell,kettle}/` (`.gitkeep` only). Might be repurposed for the selected-work surface; might be deleted if work goes elsewhere.

What's left across the rest of the site:
- **Summary**: 1 slot still placeholder — `industry-vs-nyt-bet.png` (Approach section). All 7 other slots + cover are wired.
- **About** copy-side: `hello@example.com` and generic LinkedIn URL still placeholders. No portrait or resume PDF wired. Marco Polo Learning $8M raise: Lindsey has the article — once URL is shared, wrap `$8M` in `<a>` (TODO comment is in `about.astro`).
- **CV**: Kettle / Madwell / MarcoPolo Learning role descriptions empty. Education section placeholder. Skills section TBD.
- **Deploy**: password protection, hosting, asset size optimization (see file-size flag in Notes).

---

## Status

### Case study 1: NYT AI-Powered Search — COMPLETE (copy + most visuals)
All 5 sections written. Visual placement restructure landed: figures/videos added throughout Context, Approach, Exploration, Outcome, Reflection. Two structural changes during wiring: content-card slot turned into a Video (Lindsey supplied an mp4), and the AI-label before/after collapsed into a single combined Figure (`ai-label.png`).

- File: `src/content/work/nyt-search.mdx`
- **Real assets wired (11):** `ai-elements.png`, `cover.png`, `vision-collage.png`, `summary-standards.png`, `search-as-ask-vision.png`, `intent-map-prototype.mp4`, `figma-2024-spec.png`, `content-card-system.mp4`, `intent-map-figjam.png`, `latest-news-interaction.mp4`, `ai-label.png`
- **Still placeholder grey-box (5):** `prototype-workflow.png` (Approach, second of the stacked How-I-worked pair), `early-concepts.png` (Exploration), `latest-news-card.png` (Exploration), `roadmap.png` (Outcome), `from-times-coverage.png` (Reflection). MDX uses `<Figure placeholder ... />` for these — when a real asset arrives, drop it in `public/media/nyt-search/` with the canonical name and replace `placeholder` with `src="/media/nyt-search/<file>"`.
- **Heads-up:** the three wired videos are heavy (15 MB, 12 MB, 5 MB). Fine for local dev; downsample before any deploy where size matters.

### Case study 2: Summary at the Times — COMPLETE (copy + most visuals)
All 5 sections written + committed. 8 of 9 visual slots wired with real assets (2026-05-24).
- File: `src/content/work/summary.mdx`
- Title: "AI Summary at The Times" (was "Summary at the Times" — refined 2026-05-26)
- Dek: "A capability that takes many shapes — text, audio, email, article overview — across NYT's brands and surfaces."
- Slug: `/work/summary` (renamed from Article Overview)
- Timeframe: "March 2026 – Now" (refined 2026-05-26 from generic "2026")
- **Real assets wired (8):** `cover.png`, `internal-tool-styles.png`, `story-card-first-sketch.png`, `card-directions-range-1.png` + `card-directions-range-2.png` (one slot, stacked pair: spectrum on top, variables underneath), `nyt-identity-comps.png`, `story-card-prototype.mp4`, `summary-as-capability.png`, `architecture-diagram.png`.
- **Still placeholder (1):** `industry-vs-nyt-bet.png` (Approach section — industry default vs NYT bet, side-by-side). Drop at `public/media/summary/industry-vs-nyt-bet.png` and a Claude session can swap `placeholder` → `src=`.
- **2026-05-26 refinements**: removed the `<Margin kind="credit">` block in Context that listed "AI Initiative team — Editorial leadership, prompt shaping" + "Brand standard team — Voice and tone feedback" (duplicated role/partner/timeframe info). Added inline link on "Newsroom AI Initiative team" → https://www.nytco.com/press/introducing-the-a-i-initiatives-team/.
- **File-size heads-up:** `story-card-prototype.mp4` is 19 MB and `summary-as-capability.png` is 15 MB. Fine for local dev; both want optimization before deploy.

### Case study 3: Advertising at the Times — COMPLETE (copy + visuals)
All 3 sections + 4 sub-sections written. Visual structure restructured during 2026-05-24 (slot count went 11 → 19) and all 19 assets wired in commit `418e41b` — 1 GIF cover, 6 PNGs, 12 MP4s.
- File: `src/content/work/advertising.mdx`
- Title: "Advertising at the Times"
- Dek: "Four years leading the design of the ad experience across the Times' bundle — Games, Cooking, The Athletic, Wirecutter, and News."
- Slug: `/work/advertising`
- **Non-standard structure**: 3 sections — Context, Major Contribution (4 h3 sub-sections: Monetizing the bundle, Building native ad products, Video monetization, Internal ad tooling), Reflection. Smoke test pinned to h2Count: 3.
- **Real assets wired (19 incl. cover):** `cover.gif`, `bundle-buildout.mp4`, `launch-{athletic,wordle,cooking,wirecutter}.mp4`, `wordle-flex-xl.png`, `product-carousel-flex-xl.png`, `wirecutter-shopper-unit.png`, `cooking-sponsored-collection.png`, `unshipped-{wirecutter-hub,thanksgiving}.mp4`, `unshipped-athletic-moments.png`, `video-base-spec.png`, `video-2x2-surfaces.mp4`, `kaleidoscope-old.png`, `kaleidoscope-{semantic-search,post-buy,tooling-redesign}.mp4`. All in `public/media/advertising/`.
- Through-lines pinned across the case study: reader-first inside constraints; working in someone else's space (collaboration without defensiveness); designing for scale across products *and* advertisers. Cross-link to Summary's "ok with not controlling outcomes" sits inside Building native ad products.
- Confidentiality: AdWeek figures OK (Q4 2025 +24.9% YoY; Q1 2026 +31.6% / $93.3M). Internal-only figures skipped (Games $11M→$32M, Flex 2.0 Beta $800k). "Elvex" generic-ized to "AI-assistant button"; Kaleidoscope kept by name as the load-bearing artifact.
- **File-size heads-up:** total folder is ~450MB (cover.gif alone is 202MB; several MP4s in 30–53MB range). Optimization pass needed before deploy.
- Source for the 4-year project audit: `~/Downloads/2025 Work Document - My work.csv`.

### About page — plain prose, modal direction abandoned
- File: `src/pages/about.astro`
- Voice: personal, philosophical, flowing prose with no bold lead-ins or h2s inside the bio (intentional — "loose" was Lindsey's brief). Seven paragraphs: current role + portfolio pointer; design values (clarity, craft, delight, process); the "magic power" framing (speed at extracting simple solutions from chaotic conversations + "driving in the dark with strong partners"); Marco Polo Learning startup arc ($8M raise, many hats); Madwell + Kettle agency era (excellence + self-critique); corporate-NYT era (bigger teams, conflict, advocacy); closing "one-person shop, find collaborators, dive in" beat.
- **No interactive triggers in the bio.** Company names italicized as plain text: *Marco Polo Learning*, *Madwell*, *Kettle*. Same convention as the original `<em>Marco Polo</em>` from before the modal pivot.
- **Modal pattern was tried + abandoned this session (2026-05-24).** First as 5 discipline triggers (games/illustrations/animation/branding/advertising), pivoted to 3 company triggers (commit `f8a166e`), then Lindsey decided not to "hide art under underline" and reverted to plain text. The non-case-study work showcase is being rethought as a separate "selected work" surface — to be designed 2026-05-25.
- **Empty company folders left in place** at `public/media/about/{marco-polo-learning,madwell,kettle}/` (`.gitkeep` only). Might be repurposed for the selected-work surface; might be deleted if it goes elsewhere.
- **Still placeholder:** `hello@example.com` and generic LinkedIn URL in contact section. No portrait or resume PDF wired (TBD).
- **$8M Marco Polo Learning raise:** Lindsey has the article and will share the URL. TODO comment is in `about.astro` next to the `$8M` text — wrap in `<a>` once URL is shared.

### CV page — SCAFFOLDED (`/cv`)
- File: `src/pages/cv.astro`
- Source: Lindsey's LinkedIn experience screenshot (May 2026). Ogilvy & Mather summer intern (2015) intentionally omitted per her note.
- Layout: terse, structured. Date column on left (`160px`), role + description on right. Mobile collapses to single column under 600px.
- **Roles wired (6 across 4 companies):**
  - NYT, Lead PD AI Products & Platforms (Jan 2026 – Present)
  - NYT, Lead PD Advertising (Mar 2023 – Jan 2026)
  - NYT, Senior PD Advertising (Sep 2021 – Feb 2023)
  - Kettle, Senior PD (Sep 2019 – Sep 2021)
  - Madwell, PD (Feb 2018 – Sep 2019)
  - MarcoPolo Learning, Lead PD (Dec 2015 – Jan 2018)
- **Role descriptions:** NYT roles have descriptions written from case-study context; Kettle / Madwell / MarcoPolo Learning have empty `description: ""` strings — Lindsey to fill (one line each is fine).
- **Education section:** placeholder italic line; awaiting school/degree/dates.
- **Skills section:** not added; TBD whether to include.
- SiteHeader updated: nav now Work · CV · About.

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

## Site-wide conventions added 2026-05-26

- **Work dropdown nav**: `SiteHeader.astro` now renders a hover/focus dropdown under the "Work" link with the three case studies (AI-Powered Search, AI Summary, Advertising). Clicking "Work" still goes to `/` (home) — the menu is additive, not a replacement. Dropdown reveals via `:hover` on `.work-wrap` and `:focus-within` for keyboard users (Tab through). Visual style matches the header: blue-grey bg, brown ink, hairline `--rule` border, soft shadow, Work Sans 14px. Active case study (when on `/work/<slug>`) gets the same yellow `--highlight` underline as top-level nav, inset 16px to align with menu padding.
- **External links open in new tab**: added `rehype-external-links` (in both `markdown.rehypePlugins` and the `mdx()` integration's `rehypePlugins` in `astro.config.mjs`). Any markdown-style `[text](https://…)` link in MDX or .md gets `target="_blank" rel="noopener noreferrer"` automatically at build time. Internal links (`/work/...`, anchors) untouched. From now on, just write the link with markdown shorthand — no need to remember per-link.

---

## Stack & files

- Astro 6 + MDX, TypeScript strict
- `rehype-external-links` ^3.0.0 (added 2026-05-26 for the new-tab convention)
- Self-hosted Source Serif 4 (body) + Work Sans (display) + Inter (UI labels) + JetBrains Mono (captions, footnote markers) — all open-source, in `public/fonts/`
- Playwright smoke tests: `tests/smoke.spec.ts` (4 tests, all passing)
- Specs: `docs/superpowers/specs/2026-05-20-portfolio-design.md` (site architecture); `docs/superpowers/specs/2026-05-24-portfolio-visuals-design.md` (visual asset slot plan, all 3 case studies + About)
- Plans: `docs/superpowers/plans/2026-05-20-portfolio.md`; `docs/superpowers/plans/2026-05-24-portfolio-visuals.md` (visual slot placement, executed 2026-05-24)

Layouts: `src/layouts/{Base,CaseStudy}.astro`
Components: `src/components/{SiteHeader,Footer,LeftNav,Margin,Figure,Video,PullQuote,Aside,CaseStudyCard}.astro`
Pages: `src/pages/{index,about,cv}.astro` + `src/pages/work/[slug].astro`
Content: `src/content/work/{nyt-search,summary,advertising}.mdx`
Styles: `src/styles/{tokens,base,fonts}.css`
Media: `public/media/{nyt-search,summary,advertising,about}/` (+ `_placeholder/video-placeholder.mp4` shared by Video placeholder mode). About page no longer uses thumbnails (modal pattern reverted). Empty company folders remain at `public/media/about/{marco-polo-learning,madwell,kettle}/` pending decisions about the selected-work surface.
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

6 routes: `/`, `/about`, `/cv`, `/work/nyt-search`, `/work/summary`, `/work/advertising`.

---

## Notes for future sessions

- Repo is on `main`, no remote, ~25 commits. Don't push without asking.
- All work has been done with each section approved by Lindsey before commit.
- The "tools as clarity" framing in NYT Search Exploration is Lindsey's own POV — keep the through-line consistent across case studies.
- The "From Times coverage" / prompt-as-design-surface insight is the strongest single moment in NYT Search; it lands in Reflection.
- Summary's Reflection through-line: *design as making the invisible visible*, paired with *process matters more than outcome / hold influence loosely when the decision isn't yours*. The card moved the room more than the system diagram did — keep that hierarchy if Summary comes up again.
- Advertising's Reflection through-lines (three beats): reader-first inside constraints (slow, compounding impact); working in someone else's space (collaboration over defensiveness — "the work has only deepened those instincts"); designing for scale across products *and* advertisers.
- About page through-line: *clarity, craft, delight, process* + the "magic power" framing (speed at extracting simple solutions from chaotic conversations) + the closing "one-person shop, find collaborators, dive in" stance. Tone is loose and personal — no bold leads inside the bio. All three company names — Marco Polo Learning, Madwell, Kettle — italicized as styled-but-non-clickable names. The clickable-modal pattern was tried and reverted on Lindsey's call (don't "hide art under underline").
- Do not over-credit Lindsey's individual contribution; honor the shared work. Don't undersell either — Lindsey was lead on key threads.
- **Visual placeholder system:** `Figure` and `Video` both accept a `placeholder` boolean prop. When true they render a labeled grey box (image or autoplay video with full controls), with the alt text shown inside so flow is readable before real captures land. Use this for any new visual slot — drop assets later, swap `placeholder` → `src` to wire. Shared placeholder loop lives at `public/media/_placeholder/video-placeholder.mp4`.
- **Watch for pre-existing uncommitted work:** the working tree carries pre-existing `M` files (CLAUDE.md, several components, styles, fonts, `nyt-search.mdx`) plus untracked items (`raw assets/`, font files). Before committing a targeted edit, check `git status` on the specific file — if it was already `M`, the commit will sweep up unrelated work and the message must reflect that. Pattern lived through during the 2026-05-24 visual asset session: `summary.mdx` was already `M` and one commit ended up combining prior uncommitted prose with new placeholder reverts.
- **Asset file-size pattern (deploy concern):** large media is accumulating across case studies — NYT Search videos at 5–15 MB, Summary's now-wired `story-card-prototype.mp4` at 19 MB and `summary-as-capability.png` at 15 MB. CLAUDE.md target is ≤8 MB. Optimization pass needed before any password-protected deploy.

---

## Design system overhaul (2026-05-23)

Major typography + color shift inspired by Font Review Journal's Windsor article. Lindsey reviewed and approved all changes iteratively.

**Typography hierarchy** (all open-source, in `public/fonts/`):
- H1: Work Sans 500, `clamp(44px, 8vw, 96px)`, letter-spacing `-0.025em`
- H2/H3: Work Sans 500
- Body: Source Serif 4 17px, line-height 1.75
- Captions (Figure/Video figcaption) + footnote markers: JetBrains Mono 13px, line-height 1.35
- Margin notes / nav / labels: Inter (sans, smaller)
- Tokens: `--font-display` (Work Sans), `--font-body` (Source Serif), `--font-sans` (Inter), `--font-mono` (JetBrains Mono)

**Color palette** (cool blue + dark brown, replacing prior cream + near-black):
- `--bg: #DAE5E4` (cool blue-grey paper)
- `--ink: #47250B` (dark brown — replaces prior near-black)
- `--accent: #47250B` (matches ink)
- `--accent-coral: #FF6666` (footnote markers only)
- `--rule: #C6D3D2` (cool divider)
- Placeholder grey-box: `#C6D3D2` bg + `#9AA8A7` dashed border (Figure.astro / Video.astro hardcoded)

**Wide figure system** (key new pattern):
- `<Figure wide ... />` and `<Video wide ... />` opt-in per figure for editorial breakout
- Figures escape the `.cs-body` 3-col grid (TOC | body | margin) and span a wider track via `width: min(100vw - 64px, 1216px)` centered
- Caption stays anchored to body-column position (figure has internal grid mirroring page columns)
- 32px buffer at viewport edges; figure caps at 1216px max so it doesn't grow disproportionately on ultra-wide screens
- Caption max-width 320px, JetBrains Mono, flush-left to body column
- All Summary + NYT Search figures already marked `wide`. Advertising has no figures yet — when they land, default to `wide` unless visual reason not to.
- The `.cs-body` grid uses `justify-content: center` so the inner grid is centered within cs-body — required for the wide-figure margin math to land cleanly at viewport edges.

**TOC scroll-collapse behavior**:
- LeftNav is sticky again, but with smart collapse based on scroll direction
- Top of page (scrollY < 240px): always expanded
- Scroll DOWN: collapses to show only the active section (everything else fades + max-height: 0)
- Scroll UP: re-expands to full TOC
- Uses `:has(a.is-active)` selector for the visible item — modern browsers only
- This was Lindsey's request after rejecting Option A (image not under TOC) and Option D (TOC not sticky at all)

**Things to flag for future sessions**:
- Brown ink `#47250B` on blue bg `#DAE5E4` — passes WCAG AA but worth eyeballing on long reading. Easy to tune toward `#3D1F08` (darker) if reading feels strained.
- Some image content in NYT Search (e.g. `summary-standards.png`) has content flush against the source PNG's edges by design (Lindsey screenshotted panels tightly when assembling). The 32px viewport buffer makes this OK — content is no longer visually cut at the screen edge — but if she wants more breathing room around panels, the fix is at the image-source level, not CSS.
- Debug screenshots from this session live in `~/Desktop/portfolio-debug/` — feel free to clean up.
