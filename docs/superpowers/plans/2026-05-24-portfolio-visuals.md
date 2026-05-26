# Portfolio visuals — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the visual asset slots planned in `2026-05-24-portfolio-visuals-design.md` into the source files so Lindsey can drop assets at known paths.

**Architecture:** Three small mechanical edits. (1) Revert two broken `src=` references in `summary.mdx` to `placeholder` mode so dev preview is clean. (2) Add 10 new `<Figure placeholder>` slots into `advertising.mdx` at the placements specified in the spec. (3) Stub the About modal's filesystem layout so `<img onerror>` placeholder fallback continues to work and asset drops are friction-free. No component, layout, or test changes.

**Tech Stack:** Astro 6 + MDX, existing `<Figure>` and `<Video>` components (already support `placeholder` boolean prop). Playwright smoke tests already cover route + h2 invariants — figures don't affect them.

---

## File Structure

**Modified:**
- `src/content/work/summary.mdx` — two slot edits (revert to placeholder mode)
- `src/content/work/advertising.mdx` — add 10 `<Figure>` slots inline

**Created:**
- `public/media/about/games/.gitkeep`
- `public/media/about/illustrations/.gitkeep`
- `public/media/about/animation/.gitkeep`
- `public/media/about/branding/.gitkeep`
- `public/media/about/advertising/.gitkeep`

`public/media/advertising/` and `public/media/summary/` already exist; no creation needed there.

**Untouched:** `src/pages/about.astro`, `src/components/Figure.astro`, `src/components/Video.astro`, `tests/smoke.spec.ts`, all CSS, all other MDX.

---

## Task 1: Revert summary.mdx slots 6 + 8 to placeholder mode

**Files:**
- Modify: `src/content/work/summary.mdx`

The two broken stubs are:
- Line ~95–99: `<Video>` with `src="/media/summary/story-card-prototype.mp4"` (no `placeholder`).
- Line ~120–125: `<Figure>` with `src="/media/summary/architecture-diagram.png"` (no `placeholder`).

Each points to a 69-byte stub file, so they currently render as broken video / broken image in the dev preview. Reverting to `placeholder` mode makes the diagonal-stripe placeholder render until real assets land.

- [ ] **Step 1: Revert slot 6 (Video → placeholder)**

In `src/content/work/summary.mdx`, find this block:

```mdx
<Video
  wide
  src="/media/summary/story-card-prototype.mp4"
  caption="Working prototype: the tap-through rhythm, and the last frame's return path to the full article."
/>
```

Replace with:

```mdx
<Video
  wide
  placeholder
  alt="Working prototype of the story-card tap-through — rhythm of one card to the next, last frame returning to the article"
  caption="Working prototype: the tap-through rhythm, and the last frame's return path to the full article."
/>
```

The `Video` component renders the shared `_placeholder/video-placeholder.mp4` loop with the alt text overlaid when `placeholder` is true. The caption stays.

- [ ] **Step 2: Revert slot 8 (Figure → placeholder)**

In the same file, find this block:

```mdx
<Figure
  wide
  src="/media/summary/architecture-diagram.png"
  alt="Summary system sketch: Scoop produces 3 base summary types per article; each consumer surface applies its own prompt at request time"
  caption="The system as I currently sketch it: Scoop bases at the bottom, surface-specific prompts on top. Still exploratory."
/>
```

Replace with:

```mdx
<Figure
  wide
  placeholder
  alt="Summary system sketch: Scoop produces 3 base summary types per article; each consumer surface applies its own prompt at request time"
  caption="The system as I currently sketch it: Scoop bases at the bottom, surface-specific prompts on top. Still exploratory."
/>
```

`alt` and `caption` are unchanged.

- [ ] **Step 3: Verify the file builds**

Run: `npx astro check`
Expected: 0 errors. (Existing warnings about other files are fine; no new errors should appear.)

- [ ] **Step 4: Verify the rendered page**

Run: `npm run dev` (background it or run in another terminal), then load `http://localhost:4321/work/summary` and scroll to the prototype + architecture-diagram slots. Both should render the diagonal-stripe placeholder with their alt text overlaid — not broken-media icons.

If the dev server is already running, the change picks up via HMR.

- [ ] **Step 5: Commit**

```bash
git add src/content/work/summary.mdx
git commit -m "fix(summary): revert two broken stub references to placeholder mode

The wired src= for story-card-prototype.mp4 and architecture-diagram.png
points to 69-byte stub files, so dev preview was rendering broken media.
Revert both to placeholder mode until real assets land — caption + alt
text preserved on each.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Add 10 Figure slots to advertising.mdx

**Files:**
- Modify: `src/content/work/advertising.mdx`

All 10 slots are `<Figure wide placeholder>`. Each gets a descriptive `alt` and a caption that sets up what the visual will show. Filenames in alt text are NOT included (they belong in the spec, not the rendered page) — but the slot's *purpose* is described so the placeholder is informative.

Placements follow the spec: each figure is dropped *after* the paragraph that introduces the moment it illustrates.

- [ ] **Step 1: Add slot 1 (Bundle buildout) at end of Context**

In `src/content/work/advertising.mdx`, find the closing of the Context section — the `</Margin>` footnote that ends with the AdWeek line, followed by the Joy Robins quote paragraph that ends with `That buildout — surface by surface, brand by brand, format by format — is what this case study is about.`

Insert this block immediately after that closing paragraph and BEFORE the `## Major Contribution` heading:

```mdx
<Figure
  wide
  placeholder
  alt="Map of NYT ad surfaces in 2021 (News only) versus 2025 (Games, Cooking, Wirecutter, The Athletic, News all carrying ads) — a two-state diagram of the buildout"
  caption="The buildout, at a glance: News-only in 2021 to every brand in 2025."
/>
```

- [ ] **Step 2: Add slot 2 (Bundle launches) at end of *Monetizing the bundle***

Find the paragraph that ends with `The full craft of that format lives in the next sub-section.` (closes the Wirecutter paragraph in *Monetizing the bundle*).

Insert immediately after that paragraph and BEFORE the `### Building native ad products` heading:

```mdx
<Figure
  wide
  placeholder
  alt="Four-brand composite — Athletic ad launch, Wordle interstitial, Cooking inventory expansion, Wirecutter context — shown side by side"
  caption="One image, four launches: ads landed across Athletic, Wordle, Cooking, and Wirecutter."
/>
```

- [ ] **Step 3: Add slot 3 (Wordle Flex XL) inside *Building native ad products***

Find the paragraph that begins `[**Wordle Flex XL**](https://advertising.nytimes.com/formats/display-formats/wordle-flex-xl/).` It ends with `The ad earns its impression in the natural pause between rounds, rather than by interrupting one.`

Insert immediately after that paragraph:

```mdx
<Figure
  wide
  placeholder
  alt="Three-still sequence of the Wordle interstitial — end of round, ad fade-in with viewability tuning, CTA appearing after 2s skip-button delay"
  caption="The interstitial in three frames: round ends, ad fades in, CTA appears once the play loop has paused."
/>
```

- [ ] **Step 4: Add slot 4 (Product Carousel Flex XL)**

Find the paragraph that begins `[**Product Carousel Flex XL**](https://advertising.nytimes.com/formats/display-formats/product-carousel-flex-xl/).` It ends with `The design challenge was making a multi-product ad feel like editorial content rather than a banner of products.`

Insert immediately after:

```mdx
<Figure
  wide
  placeholder
  alt="The Product Carousel Flex XL format in context — a horizontal product-browse unit with direct-purchase paths, designed to read as editorial rather than as a banner"
  caption="Multi-product browse with direct-purchase paths — built to sit beside editorial content."
/>
```

- [ ] **Step 5: Add slot 5 (Wirecutter Shopper Unit)**

Find the paragraph that begins `[**Wirecutter Shopper Unit**](https://advertising.nytimes.com/formats/display-formats/wirecutter-shopper-unit/).` It ends with `This one had to earn its place through restraint.`

Insert immediately after:

```mdx
<Figure
  wide
  placeholder
  alt="The Wirecutter Shopper Unit shown in context on a Wirecutter page — a custom format designed to coexist with affiliate revenue through native pacing and restrained visual treatment"
  caption="In context on Wirecutter: native pacing, restrained treatment, designed to coexist with the affiliate flow."
/>
```

- [ ] **Step 6: Add slot 6 (Cooking Sponsored Collection)**

Find the paragraph that begins `**Cooking Sponsored Collection.** Less visible than the others.` It ends with `but those didn't ship — Cooking's editorial team preferred a quieter sponsor presence.`

Insert immediately after:

```mdx
<Figure
  wide
  placeholder
  alt="Cooking Sponsored Collection — the shipped quiet placements alongside the unshipped UI variants that called out the sponsor more prominently"
  caption="What shipped, beside what didn't: Cooking's editorial preference for quieter sponsor presence."
/>
```

- [ ] **Step 7: Add slot 7 (Unshipped concepts) at end of *Building native ad products***

Find the paragraph that begins `**The work that didn't ship.**` It ends with `Like a thread that runs through [Summary at the Times](/work/summary), what matters here is making the design tangible enough to be argued over and pulled forward; the outcome is something I have to be ok with not controlling.`

Insert immediately after that paragraph and BEFORE the `### Video monetization` heading:

```mdx
<Figure
  wide
  placeholder
  alt="Three unshipped concepts side by side — Wirecutter Hub as a sustained editorial-meets-advertiser destination, the NYT Thanksgiving sponsored moment, and the Athletic × Ads Moments exploration around live sports rituals"
  caption="The work that didn't ship — Wirecutter Hub, the Thanksgiving moment, Athletic × Ads. Some of the design I'm proudest of from this period."
/>
```

- [ ] **Step 8: Add slot 8 (Video across surfaces) at end of *Video monetization***

Find the closing paragraph of *Video monetization* — it begins `The design that pulled it all together: a single spec where features could be turned on or off based on the surface and the product's needs.` and ends with `without any of those surfaces feeling out of character.`

Insert immediately after that paragraph and BEFORE the `### Internal ad tooling` heading:

```mdx
<Figure
  wide
  placeholder
  alt="The same video creative landing across four surfaces — Wordle's pause-between-rounds, News' Watch Tab full-screen rhythm, Cooking pre-roll with editorial framing, and a podcast app with sound-on defaults — shown as four stills in one composite"
  caption="One creative, four surfaces: a single spec underneath, surface-appropriate behavior on top."
/>
```

- [ ] **Step 9: Add slot 9 (Kaleidoscope dashboard) inside *Internal ad tooling***

Find the paragraph in *Internal ad tooling* that begins `The users are campaign managers, ad sales, and analytics — the people who keep the ad business running day to day.` It ends with `picking up redesign threads as they came up.`

Insert immediately after:

```mdx
<Figure
  wide
  placeholder
  alt="Kaleidoscope dashboard overview showing the pre / mid / post campaign lifecycle — segment search, delivery tracking, and post-buy reporting in one system"
  caption="Kaleidoscope — pre, mid, post — the system the ad org runs on day to day."
/>
```

- [ ] **Step 10: Add slot 10 (Kaleidoscope AI features) at end of *Internal ad tooling***

Find the closing paragraph of *Internal ad tooling* — it begins `The design goal throughout: every AI feature had to add real value, not show up for the sake of being AI.` and ends with `That's the version of "AI in tools" we built.`

Insert immediately BEFORE that closing paragraph (i.e. *between* the AI-features bullet list and the closing paragraph). The bullet list ends with the line about the redesigned post-buy report, AI-assistant button, and new eval process.

```mdx
<Figure
  wide
  placeholder
  alt="AI features in Kaleidoscope — semantic search across audience segments returning meaning-based matches, and the AI-assisted post-buy report flow with the AI-assistant button surfacing patterns across pulled reports"
  caption="AI in tools, the shipped version: semantic segment search and the AI-assisted post-buy report."
/>
```

- [ ] **Step 11: Verify the file builds**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 12: Verify the rendered page**

Load `http://localhost:4321/work/advertising` and scroll. All 10 placeholder figures should render as the labeled grey-box treatment, evenly distributed across Context, Monetizing the bundle, Building native ad products (5), Video monetization, and Internal ad tooling (2).

- [ ] **Step 13: Verify smoke tests still pass**

Run: `npm test`
Expected: 4 tests pass. The advertising case study smoke test pins `h2Count: 3` — figures don't introduce h2s, so this stays green. (If the test runner needs the dev server, follow the existing project convention.)

- [ ] **Step 14: Commit**

```bash
git add src/content/work/advertising.mdx
git commit -m "feat(advertising): add 10 figure placeholder slots

Drops Figure placeholder slots into the Advertising case study at the
placements defined in the visuals spec — one in Context, one closing
Monetizing the bundle, five across Building native ad products
(Wordle Flex XL, Product Carousel, Wirecutter Shopper Unit, Cooking
Sponsored Collection, work that didn't ship), one closing Video
monetization, two in Internal ad tooling (Kaleidoscope, AI features).

All slots use placeholder mode; assets to be dropped in
public/media/advertising/ at canonical filenames per the spec.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Stub About modal asset folders

**Files:**
- Create: `public/media/about/games/.gitkeep`
- Create: `public/media/about/illustrations/.gitkeep`
- Create: `public/media/about/animation/.gitkeep`
- Create: `public/media/about/branding/.gitkeep`
- Create: `public/media/about/advertising/.gitkeep`

The About modal's `<img onerror>` handler already swaps to a diagonal-stripe placeholder when files are missing, so the page works today. Pre-creating the category folders is purely so Lindsey can drop assets at canonical paths without first creating directories.

- [ ] **Step 1: Create the five category folders with .gitkeep**

```bash
mkdir -p public/media/about/games \
         public/media/about/illustrations \
         public/media/about/animation \
         public/media/about/branding \
         public/media/about/advertising
touch public/media/about/games/.gitkeep \
      public/media/about/illustrations/.gitkeep \
      public/media/about/animation/.gitkeep \
      public/media/about/branding/.gitkeep \
      public/media/about/advertising/.gitkeep
```

- [ ] **Step 2: Verify About page still renders correctly**

Load `http://localhost:4321/about`, click each discipline word (`games`, `illustrations`, `animation`, `branding`, `advertising`). The modal should still open and show three diagonal-stripe placeholders per category (no real images yet — the `onerror` handler picks up missing files just like before). Behavior should be identical to current state.

- [ ] **Step 3: Commit**

```bash
git add public/media/about/
git commit -m "chore(about): stub modal category folders

Create empty folders with .gitkeep for the five disciplines so Lindsey
can drop modal thumbnails at canonical paths
(public/media/about/<category>/01.png, 02.png, 03.png) without first
creating directories. Modal behavior unchanged — onerror handler still
covers missing files.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Final verification

**Files:** none

- [ ] **Step 1: Run the smoke test suite**

Run: `npm test`
Expected: 4 tests pass.

- [ ] **Step 2: Type/schema check**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 3: Visit each affected page and visually verify**

- `http://localhost:4321/work/summary` — slots 6 (video) and 8 (figure) now render as labeled placeholders with their alt text overlaid. No broken media icons.
- `http://localhost:4321/work/advertising` — 10 figure placeholders evenly distributed across the case study. Each renders the diagonal-stripe grey-box treatment with descriptive alt text.
- `http://localhost:4321/about` — page renders normally; modal opens for all 5 disciplines and shows 3 placeholders each.

- [ ] **Step 4: Update CLAUDE.md if state has shifted**

The implementation doesn't introduce structural changes worth documenting. CLAUDE.md already references the placeholder system; no edits needed unless something genuinely surprising lands during verification.
