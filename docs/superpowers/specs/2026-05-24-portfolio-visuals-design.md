# Portfolio visuals — slot plan

Plan for the visual assets across the three case studies and the About page. Scope is *deciding what visuals each section needs and placing slots in the source* — producing the assets themselves is downstream work owned by Lindsey.

Companion to `2026-05-20-portfolio-design.md` (which covers the site architecture). This spec is asset-planning only.

---

## Scope

Three pages need visual planning:

1. **Summary** — `src/content/work/summary.mdx`. Already has 8 visual slots drafted. Slot plan stays as-is; this spec ratifies the filenames + folder convention and fixes two slots that are currently rendering broken.
2. **Advertising** — `src/content/work/advertising.mdx`. Has zero figures today. This spec adds 10 new slots (9 + 1 optional).
3. **About** — `src/pages/about.astro`. The discipline modal already specifies 15 thumbnails (5 disciplines × 3). This spec confirms folder structure and aspect ratio; no MDX edits needed. No additional About-page visuals (no portrait, no inline images).

Out of scope: producing the asset files themselves, reviewing alt text, hosting/deploy concerns.

---

## Conventions (apply to all three pages)

- **Folder**: `public/media/<page-slug>/`
- **Filenames**: kebab-case, descriptive of purpose not caption text. Stable enough that Lindsey can drop assets at known paths over time without coordinating MDX edits.
- **Image format**: PNG for screenshot/comp content, JPG for photographic. Width ~2400–3000px ideal (wide figures display ≤1216px; 2x retina is plenty).
- **Video format**: H.264 MP4, ≤8 MB ideal (NYT Search videos hit 12–15 MB and CLAUDE.md flags this for deploy).
- **Wide vs inline**: all case-study figures are `wide` by default. Wide is the editorial breakout pattern that escapes the 3-col grid. Use inline only if there's a visual reason (none currently planned).

---

## Summary — 8 slots (no structural changes)

Folder: `public/media/summary/`. All slots are `wide`.

| # | Section | Type | Filename | Slot intent |
|---|---|---|---|---|
| 1 | Approach | image | `industry-vs-nyt-bet.png` | Industry pattern (text-first, on-demand) vs NYT bet (additive, visual, interactive). Side-by-side. |
| 2 | Exploration | image | `internal-tool-styles.png` | Internal tool output: same article rendered as paragraph, bullets, longer recap. |
| 3 | Exploration | image | `story-card-first-sketch.png` | First full-screen Instagram-story-style summary card sketch. |
| 4 | Exploration | image | `card-directions-range.png` | Range of card directions (templatized → editorial). Includes treatments for low-image and quote-less stories. |
| 5 | Exploration | image | `nyt-identity-comps.png` | Comps showing NYT visual identity translated into the story format — masthead bar, type, photo treatment. |
| 6 | Exploration | video | `story-card-prototype.mp4` | Working prototype of the tap-through. Already wired in MDX. |
| 7 | Exploration | image | `summary-as-capability.png` | Summary as a capability across NYT — article tap, digest, briefing, synthesis. |
| 8 | Exploration | image | `architecture-diagram.png` | Scoop bases at the bottom, surface-specific prompts on top. Already wired in MDX. |

### Inline fix to summary.mdx

Slots 6 and 8 currently have `src=` set without `placeholder`, pointing to 69-byte stub files — they render as broken image / broken video. Revert both to `placeholder` mode until real assets arrive:

- Slot 6 (`<Video>`): replace `src="/media/summary/story-card-prototype.mp4"` with `placeholder` + `alt="..."`. Caption stays.
- Slot 8 (`<Figure>`): replace `src="/media/summary/architecture-diagram.png"` with `placeholder`. `alt`, `caption` stay.

When real assets arrive, swap back: remove `placeholder`, add `src="/media/summary/<filename>"`.

---

## Advertising — 10 new slots (all locked)

Folder: `public/media/advertising/`. All slots are `wide`. Image-first per Lindsey's direction; multiple images may be combined into one slot where it serves the design.

### Cover (replace 69-byte stub)

`cover.png` — composite hero of native ad formats across the bundle. Used as case-study card thumbnail. Not placed inline.

### Slot list

| # | Section | Type | Filename | Slot intent |
|---|---|---|---|---|
| 1 | Context | image | `bundle-buildout.png` | 2021 vs 2025 ad surface map. 2021 = News only, 2025 = every brand. Visualizes the Joy Robins quote without needing internal revenue numbers. |
| 2 | Major Contribution → Monetizing the bundle | image | `bundle-launches.png` | 4-brand composite: Athletic ad launch + Wordle interstitial + Cooking inventory + Wirecutter context. Reads "ads now run across the whole bundle." |
| 3 | Major Contribution → Building native ad products → Wordle Flex XL | image | `wordle-flex-xl.png` | 3-still sequence: end of round → ad fades in → CTA visible. Tells the timing story without video. |
| 4 | Major Contribution → Building native ad products → Product Carousel Flex XL | image | `product-carousel-flex-xl.png` | The horizontal product-browse format in context. |
| 5 | Major Contribution → Building native ad products → Wirecutter Shopper Unit | image | `wirecutter-shopper-unit.png` | The unit shown in context on a Wirecutter page. Restraint and affiliate-coexistence story. |
| 6 | Major Contribution → Building native ad products → Cooking Sponsored Collection | image | `cooking-sponsored-collection.png` | Shipped placement + the unshipped UI-variant sketches together (one figure, two states). |
| 7 | Major Contribution → Building native ad products → didn't ship | image | `unshipped-concepts.png` | Wirecutter Hub + Thanksgiving sponsored moment + Athletic × Ads Moments. Load-bearing — Lindsey calls these "design I'm proudest of." |
| 8 | Major Contribution → Video monetization | image | `video-across-surfaces.png` | Same creative shown across Wordle / Watch Tab / Cooking / Podcast — 4 stills in one wide composite. |
| 9 | Major Contribution → Internal ad tooling | image | `kaleidoscope.png` | Kaleidoscope dashboard / pre-mid-post lifecycle overview. |
| 10 | Major Contribution → Internal ad tooling | image | `kaleidoscope-ai.png` | AI features — semantic search across audience segments OR AI-assisted post-buy report. Carries the AI-in-tools story. |

Reflection: no figures.

### Where each slot lands in advertising.mdx

Slots are placed *after* the paragraph that introduces the moment they illustrate, except the cover. Approximate placement:

- Slot 1: after the Joy Robins quote at the end of Context.
- Slot 2: after the Wirecutter paragraph at the end of *Monetizing the bundle*.
- Slots 3–6: each after its own paragraph inside *Building native ad products*.
- Slot 7: after the "What didn't ship" paragraph.
- Slot 8: after the bullet list of surface adaptations in *Video monetization*.
- Slot 9: after the introductory paragraph and lifecycle bullet list in *Internal ad tooling*.
- Slot 10: after the AI-features bullet list, before the closing "AI in tools" paragraph.

---

## About — 15 modal thumbnails (no MDX changes)

The discipline modal in `src/pages/about.astro` already maps to filesystem paths. Lindsey drops files at the predetermined locations and the modal picks them up; missing files auto-render as the diagonal-stripe placeholder via the `onerror` handler.

**Aspect ratio**: 4:3 (modal uses `aspect-ratio: 4 / 3` with `object-fit: cover`).
**Min size**: ~600×450. 2x retina is fine.

| Category | Folder | Files |
|---|---|---|
| Games | `public/media/about/games/` | `01.png`, `02.png`, `03.png` |
| Illustrations | `public/media/about/illustrations/` | `01.png`, `02.png`, `03.png` |
| Animation | `public/media/about/animation/` | `01.png`, `02.png`, `03.png` |
| Branding | `public/media/about/branding/` | `01.png`, `02.png`, `03.png` |
| Advertising | `public/media/about/advertising/` | `01.png`, `02.png`, `03.png` |

Alt text is already declared in `about.astro` (`disciplines` config object). Lindsey may want to revise these later — flagged but not blocking. Example: "Wordle interstitial reference" in Games overlaps with the Advertising case study; a different game might serve the About page better.

---

## Implementation work

The implementation is mechanical and small:

1. **summary.mdx** — revert slots 6 and 8 to `placeholder` mode (two small edits).
2. **advertising.mdx** — add 10 `<Figure placeholder ... />` slots at the placements listed above. Each slot has a known filename, alt, caption.
3. **about.astro** — no edits.
4. **Folders** — create `public/media/advertising/` subdirectories as needed (already exists). About category subfolders (`games/`, `illustrations/`, etc.) created on first asset drop or stubbed empty.

No build/config/component changes needed. `Figure` and `Video` components already support `placeholder` mode. Existing smoke tests (`tests/smoke.spec.ts`) should pass unchanged.

---

## Out of scope (flagged for future passes)

- Producing the asset files themselves (Lindsey owns).
- Revising About modal alt text.
- Tuning placeholder visual treatment (current diagonal-stripe + grey-box treatment stays).
- Cover image hero treatment in case-study layouts (currently thumbnail-only; not changed here).
- Adding portrait, inline About images, or resume PDF.
- Optimizing existing heavy NYT Search videos (12–15 MB) — separate deploy concern.
