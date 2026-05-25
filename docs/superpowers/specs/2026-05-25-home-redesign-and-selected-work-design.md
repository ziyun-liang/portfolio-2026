# Homepage redesign + Selected Work section

Date: 2026-05-25
Figma sketch: <https://www.figma.com/design/lzfsH9VaQzCFXxIKeJINlc/P?node-id=70-6945>
References: <https://staffansundstrom.com/karin-mamma-andersson> (layout), <https://remcovanbaren.nl/archival-dissonance> (hover-swap interaction)

## Problem

The homepage and `/work` route currently are the same surface: an intro block plus a vertical list of three case-study cards. Two changes:

1. Tighten the homepage. Less intro copy, bigger case-study cards, and update the active-nav indicator from the current bolded text to a yellow highlighter mark per the Figma sketch.
2. Add a new "Other Selected Work" section beneath the case studies — a full-bleed, pinned, scroll-driven showcase of agency- and startup-era work (Madwell, Kettle, Marco Polo Learning) that doesn't merit a full case study but is too good to hide.

The selected-work pattern was first considered as modal triggers on the About page. That direction was tried and reverted (commit `8c07f1c`). This spec replaces it with a dedicated showcase on the homepage.

## Scope

- Rewrite `/` (homepage). No separate `/work` route — homepage IS the work page.
- Add one new component (`SelectedWork.astro`) and one new data file (`src/data/selected-work.ts`).
- Update site nav order and active-state styling.
- Add asset directory for paired images.

Out of scope: case-study pages, CV, About — all untouched.

## Part 1 — Homepage restructure

### Layout (top to bottom)

1. **Site header** — `Lindsey Liang` left · `Work · About · CV` right. Note nav reorder vs current site (currently `Work · CV · About`).
2. **Intro** — single short paragraph. Wire this exact line from the Figma sketch:
   > "I'm at The New York Times, where I work across advertising, AI-powered search, and editorial summarization — much of what I've shipped lives in the case studies on this site."
   Lindsey can edit later. ~600px max-width.
3. **"Case Study" section label** — uppercase mono, left-aligned (matches existing `.section-label` pattern).
4. **Three case-study cards**, stacked vertically. Each card:
   - Image: ~1262×700, rounded `var(--radius-sm)`, fills container width inside `var(--page-max)` (1280px).
   - Title (h2 below image): NYT AI-Powered Search · AI Summary at NYT · Advertising at NYT.
   - Dek (one line below title).
   - Whole card is clickable → `/work/<slug>`.
   - Larger than current cards. The existing `CaseStudyCard` either gets bigger image dimensions or is replaced with an inline implementation; either is fine, prefer reusing.
5. **"Other Selected Work" section label** — same mono uppercase style.
6. **Selected-work section** — see Part 2.
7. **Footer** — `© 2026 · Lindsey Liang` left · `Back to Top` right.

### Active nav indicator

Replace `font-weight: 500` with a yellow highlighter mark.

- Color: `#eeff83` (chartreuse) — add as `--highlight: #eeff83` token in `tokens.css`.
- Treatment: highlight extends ~5px past the text on each side and is slightly shorter than the text height — looks like a marker pen swiped under the word, not a button. Implementation: a `box-shadow: inset 0 0 0 ... var(--highlight)` or `background: var(--highlight)` with negative-y `box-shadow` clipping; alternatively a `::before` pseudo-element. Pick the simplest version that survives multi-word link text without overflowing.
- Applies to the `aria-current="page"` link in `SiteHeader.astro`. The matching logic stays (`Work` lights when path is `/` or `/work/*`, etc.).

## Part 2 — Selected-work section

### Behavior summary

- **Full-bleed.** Section spans `100vw`, breaking out of the page's `var(--page-max)` (1280px) container. Edge-to-edge, no horizontal margin at any viewport.
- **Pinned.** When the section's top reaches the viewport top, it pins (`position: sticky`, height: `100vh`). Continued page scroll inside the pinned region drives the right-list movement.
- **Scroll-driven active row + hover override.** As page scroll progresses, the right list translates upward. A fixed anchor line ~40% down the right column defines the **scroll-active row** — its image fills the left side. Hovering any visible row temporarily overrides → image swaps to that row's image. Mouse-leave returns to scroll-active.
- **Image transition.** 250ms crossfade between images. No slide, no wipe.
- **Non-interactive rows.** Cursor stays `default`. No links, no clicks.
- **Mobile fallback (< 900px).** Section unpins entirely. Image becomes a 1:1 hero on top, list scrolls normally beneath. Tap a row → image swaps; no hover.

### Layout

```
┌─ section, position: sticky, height: 100vh, width: 100vw ─────────────────┐
│                                                                          │
│  ╔══════════════════════════════════╗  ┌─ right column (scrolling) ──┐  │
│  ║                                  ║  │  CLIENT / EMPLOYER · YEAR  │  │
│  ║                                  ║  │  PROJECT NAME              │  │
│  ║                                  ║  │  Role / responsibilities   │  │
│  ║         LEFT IMAGE               ║  │  ─────────────────────     │  │
│  ║         (active row's            ║  │  CLIENT / EMPLOYER · YEAR  │  │
│  ║          image, crossfade)       ║  │  PROJECT NAME ← active     │  │ ← anchor line
│  ║                                  ║  │  Role / responsibilities   │  │
│  ║                                  ║  │  ─────────────────────     │  │
│  ║                                  ║  │  CLIENT / EMPLOYER · YEAR  │  │
│  ║                                  ║  │  PROJECT NAME              │  │
│  ╚══════════════════════════════════╝  │  Role / responsibilities   │  │
│                                        └────────────────────────────┘  │
│         50% viewport                          50% viewport              │
└──────────────────────────────────────────────────────────────────────────┘
```

### Row anatomy

Each row, top to bottom:

```
[CLIENT] / [EMPLOYER] · [YEAR]      ← top line, mono small, ink-muted color
PROJECT NAME                        ← h3-sized, bold, ink color
Role / responsibilities             ← serif body, ink-muted color
─────────────────────────────────   ← 1px rule, --rule color
```

Vertical rhythm: ~24px top padding, ~24px bottom padding. Total row height ~120–140px. With 15 rows the list is ~2000px tall.

### Scroll budget

The pinned section reserves a total of `3 × 100vh` of page-scroll distance regardless of row count:

- 1st viewport: section enters and pins. Row 1 is anchor-active.
- 2nd–3rd viewports: list translates upward. Image swaps as new rows hit anchor. By end of 3rd, last row is anchor-active.
- After 3rd: section unpins, normal page scroll resumes, footer appears.

This means the entire selected-work showcase costs the visitor 3 screen-heights of scroll, regardless of whether there are 10 or 20 rows. The list moves at a brisker pace with more entries — that's fine; people who want to linger can hover.

Implementation: outer `<div class="selected-work-anchor">` with `height: 300vh` provides the scroll runway. Inside it, `<section class="selected-work">` with `position: sticky; top: 0; height: 100vh;` gets pinned for the duration. JavaScript reads `window.scrollY` against the anchor's bounding rect to compute progress (0→1) and translates the inner list.

### Active-row computation

Two states tracked on the section:

- `scrollActiveIndex` — derived from scroll progress. With N rows, `index = floor(progress × N)` clamped to `[0, N-1]`.
- `hoverIndex` — set on `pointerenter` of a row, cleared on `pointerleave`. Null when not hovering.

The image shown is `rows[hoverIndex ?? scrollActiveIndex].image`.

The active row also gets a visual treatment in the list — leading dot, color shift, or weight bump. Pick one that's subtle. (Lindsey to confirm during implementation review.)

### Image crossfade

Two `<img>` elements stacked (absolute positioning), one fades out as the other fades in over 250ms. JavaScript swaps the active layer on each change. CSS:

```css
.image-layer {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 250ms ease;
}
.image-layer.is-visible { opacity: 1; }
```

Preload all images on mount (`new Image(); img.src = …` for each row) so swaps don't show a flash.

### Mobile fallback

Below `min-width: 900px`:

```css
@media (max-width: 899px) {
  .selected-work-anchor { height: auto; }
  .selected-work {
    position: static; height: auto;
    flex-direction: column;
  }
  .image-pane { aspect-ratio: 1 / 1; }
  /* list flows below image normally */
}
```

`pointerenter`/`pointerleave` handlers still bind on touch. On tap, `pointerenter` fires and sticks until the next tap on a different row — image stays swapped to the most recently tapped row. Acceptable touch behavior; no extra code needed.

### Reduced motion

If `prefers-reduced-motion: reduce`, skip the pinned-scroll behavior entirely and fall through to the mobile layout (stacked image + list, no scroll-hijacking).

## Part 3 — Data shape and file changes

### Data shape

```ts
// src/data/selected-work.ts
export interface SelectedWorkEntry {
  client: string;       // e.g. "Visible Mobile"
  employer: string;     // e.g. "Madwell"
  year: number;         // e.g. 2022
  project: string;      // e.g. "This beach is a phone store"
  role: string;         // e.g. "Art direction · OOH production"
  image: string;        // e.g. "/media/selected/visible-billboard.jpg"
  alt: string;          // image alt text
}

export const selectedWork: SelectedWorkEntry[] = [
  // ~10–20 entries, sorted reverse-chronological by year
  // Lindsey to populate. Initial commit can ship with 1–2 placeholder entries
  // using the existing Figma billboard image; remaining slots backfilled later.
];
```

Plain TypeScript array, not MDX. Reasoning: the data shape is rigid and small; a rich-text format would add friction with no payoff.

### Files

**Created:**

- `src/components/SelectedWork.astro` — the pinned section component. Accepts `entries: SelectedWorkEntry[]` as a prop. Renders the two-column layout, the row list, and ships its own scoped JS for scroll/hover handling.
- `src/data/selected-work.ts` — the entries array + type.
- `public/media/selected/` — paired images. Naming convention: `<slug>.jpg` (or `.png`/`.mp4` if needed later — start static-only).

**Modified:**

- `src/pages/index.astro` — rewritten per Part 1. Imports `selectedWork` data and `<SelectedWork>` component.
- `src/components/SiteHeader.astro` — nav order changes to Work · About · CV. Active-state styling switches from `font-weight: 500` to yellow highlight.
- `src/styles/tokens.css` — add `--highlight: #eeff83`.
- `src/styles/base.css` — if no full-bleed utility exists, add one (`.full-bleed { width: 100vw; margin-left: calc(50% - 50vw); }` or equivalent).
- `tests/smoke.spec.ts` — extend homepage test to assert presence of three case studies + the selected-work section.

**Untouched:** case study MDX files, layouts, About, CV, all other components.

### Tests

Smoke test additions for `/`:

- Three case-study cards present, each with title and dek visible.
- Selected-work section present with at least one row.
- Active nav highlight is rendered (assertion on the highlight pseudo-element or background-color).

No interaction testing for pinned-scroll in Playwright — too fragile, too implementation-specific. Manual QA covers it.

## Open items

- **Entry data.** Lindsey will populate `selected-work.ts` over multiple sessions. Initial commit ships with 1–2 entries; rest filled in later. The component must render gracefully with any count from 1 to 25.
- **Active-row visual treatment in the list.** Confirm during implementation review (subtle dot, color shift, or weight bump).
- **Highlight implementation detail.** Pick whichever CSS approach handles multi-word link text cleanly (`background-color` with `box-shadow` clipping, or `::before` pseudo-element). Decide during implementation.

## Implementation approach notes (for the planner)

- Section-pinned scroll uses `position: sticky` + `IntersectionObserver` for active-row tracking. No GSAP, no scroll-jacking libs. ~80 lines of JS, scoped inside `SelectedWork.astro`.
- Preload images on component mount.
- Honor `prefers-reduced-motion: reduce`.
- Test in Safari iOS specifically — sticky inside a scroll-runway is the kind of thing that breaks there.
