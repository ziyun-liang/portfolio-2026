# Home Redesign + Selected Work Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the portfolio homepage to match the Figma sketch (tighter intro, three big stacked case-study cards, yellow highlighter active-nav indicator) and add a new full-bleed `SelectedWork` section with section-pinned scroll, hover override, and a stacked-mobile fallback.

**Architecture:** A single-page rewrite of `src/pages/index.astro` plus one new component (`SelectedWork.astro`) and one data file (`selected-work.ts`). Two CSS-token additions and a single JS module (~80 lines, scoped to the component) handle the pinned-scroll behavior. No new dependencies.

**Tech Stack:** Astro 6 + MDX, TypeScript strict, plain CSS with custom properties, Playwright for smoke tests.

**Spec:** `docs/superpowers/specs/2026-05-25-home-redesign-and-selected-work-design.md`

---

## Pre-flight: working-tree note

The repo currently has pre-existing uncommitted work (multiple `M` files in `src/components/`, `src/styles/`, `src/content/`, plus an untracked `raw assets/` dir). **Every commit in this plan stages files explicitly by path** (`git add <path1> <path2>`), never `git add .` or `git add -A`. That keeps each commit focused on the work it describes.

Confirm before starting: `git status --short` should look familiar — same set of pre-existing dirty files. If it changes between tasks, investigate.

---

## File Structure

**Created:**

| File | Responsibility |
|------|----------------|
| `src/components/SelectedWork.astro` | Two-column pinned section: image pane + scrolling row list. Owns its scroll/hover/crossfade JS. |
| `src/data/selected-work.ts` | TypeScript type + entries array (reverse-chronological). |
| `public/media/selected/` (dir) | Paired images for selected-work entries. |
| `public/media/selected/visible-mobile-billboard.jpg` | Initial placeholder image (copy of an existing asset until real image arrives). |
| `tests/smoke.spec.ts` (modify only) | Smoke assertions for new homepage shape. |

**Modified:**

| File | Change |
|------|--------|
| `src/pages/index.astro` | Full rewrite to match new homepage layout. |
| `src/components/SiteHeader.astro` | Nav reorder (Work · About · CV) + yellow-highlighter active state. |
| `src/styles/tokens.css` | Add `--highlight: #eeff83` token. |
| `src/styles/base.css` | Add `.full-bleed` utility. |
| `tests/smoke.spec.ts` | Update homepage test, assert selected-work section + active-nav highlight. |

**Untouched:** all case study MDX, About, CV, all other components, all layouts.

---

## Task 1: Add `--highlight` token + full-bleed utility

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/base.css`

- [ ] **Step 1: Add the highlight token**

In `src/styles/tokens.css`, add `--highlight: #eeff83;` to the Color block.

```css
/* Color */
--bg: #DAE5E4;
--ink: #47250B;
--ink-muted: #6B6B6B;
--rule: #C6D3D2;
--accent: #47250B;
--accent-coral: #FF6666;
--highlight: #eeff83;
```

- [ ] **Step 2: Add the full-bleed utility**

Append to `src/styles/base.css`:

```css
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```

This lets a child of any container with `max-width` escape and span the viewport edge-to-edge.

- [ ] **Step 3: Build to verify no CSS errors**

Run: `npm run build`
Expected: build succeeds, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css src/styles/base.css
git commit -m "feat(tokens): add --highlight token and .full-bleed utility

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Update SiteHeader — nav order + yellow active state

**Files:**
- Modify: `src/components/SiteHeader.astro`
- Modify: `tests/smoke.spec.ts`

- [ ] **Step 1: Reorder nav and replace active styling**

Replace the contents of `src/components/SiteHeader.astro` with:

```astro
---
const path = Astro.url.pathname;
const isWork = path === "/" || path.startsWith("/work");
const isAbout = path.startsWith("/about");
const isCV = path.startsWith("/cv");
---
<header class="site-header">
  <div class="inner">
    <a href="/" class="brand">Lindsey Liang</a>
    <nav>
      <a href="/" aria-current={isWork ? "page" : undefined}>Work</a>
      <a href="/about" aria-current={isAbout ? "page" : undefined}>About</a>
      <a href="/cv" aria-current={isCV ? "page" : undefined}>CV</a>
    </nav>
  </div>
</header>

<style>
  .site-header {
    border-bottom: 1px solid var(--rule);
    font-family: var(--font-sans);
    font-size: var(--fs-meta);
    letter-spacing: 0.04em;
  }
  .inner {
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--s-2) var(--s-4);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .brand { text-decoration: none; font-weight: 500; }
  nav { display: flex; gap: var(--s-3); }
  nav a {
    text-decoration: none;
    padding: 0 5px;
    margin: 0 -5px;
    /* keeps siblings in place while highlight extends past text */
  }
  nav a[aria-current="page"] {
    background-image: linear-gradient(
      transparent 20%,
      var(--highlight) 20%,
      var(--highlight) 85%,
      transparent 85%
    );
  }
</style>
```

Notes for the engineer:
- Order is now `Work · About · CV` (was `Work · CV · About`).
- The active state is a marker-pen highlight: a vertical band of yellow that covers the middle ~65% of the text height and extends 5px past the text on each side (the negative `margin` + positive `padding` keeps siblings stationary).
- The gradient stops `20% / 85%` give the slight clipping at top + bottom that makes it look hand-drawn rather than boxed.

- [ ] **Step 2: Run dev server and verify visually**

Run: `npm run dev`
Open `http://localhost:4321/`.

Expected:
- Nav reads `Work · About · CV` in that order.
- "Work" has a yellow chartreuse highlight behind it (looks like a marker pen swipe).
- Visit `/about` — highlight moves to "About". Visit `/cv` — highlight moves to "CV".

Stop the dev server when done.

- [ ] **Step 3: Update smoke test for nav order + highlight**

In `tests/smoke.spec.ts`, replace the first test with:

```ts
test("index renders header with nav and active highlight on Work", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header.site-header .brand")).toHaveText("Lindsey Liang");
  const navLinks = page.locator("header.site-header nav a");
  await expect(navLinks).toHaveCount(3);
  await expect(navLinks.nth(0)).toHaveText("Work");
  await expect(navLinks.nth(1)).toHaveText("About");
  await expect(navLinks.nth(2)).toHaveText("CV");
  await expect(navLinks.nth(0)).toHaveAttribute("aria-current", "page");
});
```

(The old `main.index h1` assertion is dropped because the new homepage has no h1 with "Lindsey Liang".)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all tests pass. (Other tests are unaffected.)

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteHeader.astro tests/smoke.spec.ts
git commit -m "feat(header): reorder nav to Work·About·CV, add yellow highlighter active state

Replaces the bolded-text active treatment with a chartreuse marker-pen
mark behind the active link, per the Figma sketch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Create selected-work data module

**Files:**
- Create: `src/data/selected-work.ts`
- Create: `public/media/selected/visible-mobile-billboard.jpg`

- [ ] **Step 1: Create the data file with the type and one placeholder entry**

Create `src/data/selected-work.ts`:

```ts
export interface SelectedWorkEntry {
  client: string;
  employer: string;
  year: number;
  project: string;
  role: string;
  image: string;
  alt: string;
}

export const selectedWork: SelectedWorkEntry[] = [
  {
    client: "Visible Mobile",
    employer: "Madwell",
    year: 2022,
    project: "This beach is a phone store",
    role: "Art direction · OOH production",
    image: "/media/selected/visible-mobile-billboard.jpg",
    alt: "Truck-mounted billboard reading 'This beach is a phone store' with the Visible logo, parked near a beach with workers in safety vests.",
  },
];
```

The component will be built to render gracefully with any count from 1 to ~25. Lindsey will populate more entries later.

- [ ] **Step 2: Provide a placeholder image so the section renders**

Until the real `visible-mobile-billboard.jpg` is dropped in, copy an existing asset into the slot so the component can render visually during development.

```bash
mkdir -p public/media/selected
cp public/media/advertising/cover.gif public/media/selected/visible-mobile-billboard.jpg
```

(The file extension lies on disk for the moment — that's fine; browsers sniff content. Lindsey will swap with the real billboard photo before deploy.)

- [ ] **Step 3: Build to verify TypeScript accepts the data shape**

Run: `npx astro check`
Expected: no errors.

- [ ] **Step 4: Commit (data file only — image is binary placeholder, exclude)**

```bash
git add src/data/selected-work.ts
git commit -m "feat(data): add selected-work data module with type and one entry

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

The placeholder image stays uncommitted intentionally — it'll be replaced once Lindsey drops in the real billboard photo.

---

## Task 4: Build SelectedWork component (static layout, no JS)

**Files:**
- Create: `src/components/SelectedWork.astro`

- [ ] **Step 1: Write the component with static layout only**

Create `src/components/SelectedWork.astro`:

```astro
---
import type { SelectedWorkEntry } from "../data/selected-work";

interface Props {
  entries: SelectedWorkEntry[];
}
const { entries } = Astro.props;
---

<div class="sw-anchor">
  <section class="sw" data-row-count={entries.length}>
    <div class="sw-image-pane">
      {entries.map((entry, i) => (
        <img
          class={`sw-image-layer ${i === 0 ? "is-visible" : ""}`}
          src={entry.image}
          alt={entry.alt}
          data-index={i}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
    <ol class="sw-list">
      {entries.map((entry, i) => (
        <li class={`sw-row ${i === 0 ? "is-active" : ""}`} data-index={i}>
          <p class="sw-row-meta">
            <span class="sw-row-client">{entry.client}</span>
            <span class="sw-row-sep"> / </span>
            <span class="sw-row-employer">{entry.employer}</span>
            <span class="sw-row-sep"> · </span>
            <span class="sw-row-year">{entry.year}</span>
          </p>
          <h3 class="sw-row-title">{entry.project}</h3>
          <p class="sw-row-role">{entry.role}</p>
        </li>
      ))}
    </ol>
  </section>
</div>

<style>
  .sw-anchor {
    /* Scroll runway: 3 viewport-heights of page-scroll inside which the section pins. */
    height: 300vh;
  }
  .sw {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    display: flex;
    overflow: hidden;
    background: var(--bg);
  }

  .sw-image-pane {
    position: relative;
    flex: 1 1 50%;
    overflow: hidden;
  }
  .sw-image-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 250ms ease;
  }
  .sw-image-layer.is-visible {
    opacity: 1;
  }

  .sw-list {
    flex: 1 1 50%;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .sw-row {
    padding: var(--s-3) var(--s-6);
    border-bottom: 1px solid var(--rule);
    transition: opacity 200ms ease;
    opacity: 0.55;
  }
  .sw-row.is-active {
    opacity: 1;
  }

  .sw-row-meta {
    font-family: var(--font-mono);
    font-size: var(--fs-meta);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-muted);
    margin-bottom: var(--s-1);
  }
  .sw-row-client { color: var(--ink); }
  .sw-row-title {
    font-family: var(--font-display);
    font-size: var(--fs-h3);
    font-weight: 500;
    color: var(--ink);
    margin: 0 0 4px 0;
  }
  .sw-row-role {
    font-family: var(--font-body);
    font-size: var(--fs-body);
    color: var(--ink-muted);
  }
</style>
```

- [ ] **Step 2: Wire the component into a temporary test render**

Temporarily add the component to `src/pages/index.astro` so we can see it. At the bottom of the existing `<main class="index">` (before the closing `</main>`), insert:

```astro
<!-- TEMP: SelectedWork preview -->
<SelectedWork entries={selectedWork} />
```

And add to the frontmatter imports at the top:

```astro
import SelectedWork from "../components/SelectedWork.astro";
import { selectedWork } from "../data/selected-work";
```

This is temporary — the full homepage rewrite in Task 9 replaces it.

- [ ] **Step 3: Run dev server and verify visually**

Run: `npm run dev`
Open `http://localhost:4321/`.

Expected:
- Existing homepage content is followed by a full-width section.
- Left half: the placeholder image fills 50% of the viewport.
- Right half: a single row showing `VISIBLE MOBILE / MADWELL · 2022`, project title `This beach is a phone store`, role `Art direction · OOH production`.
- Page is currently very tall (300vh anchor) — scroll past, footer should reappear at the bottom.
- No JS yet, so the image and active-row state are static.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/SelectedWork.astro src/pages/index.astro
git commit -m "feat(selected-work): static component layout (no scroll/hover yet)

Two-column layout, full-bleed, image pane on left + scrolling row list
on right. JS for pinned-scroll, hover, and image swap arrives in
follow-up commits.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Add scroll-pinning + scroll-active row tracking

**Files:**
- Modify: `src/components/SelectedWork.astro`

- [ ] **Step 1: Add the JS scroll handler**

Append a `<script>` block to `src/components/SelectedWork.astro` (after the `<style>` block):

```astro
<script>
  function initSelectedWork(anchor: HTMLElement) {
    const section = anchor.querySelector(".sw") as HTMLElement;
    const list = section.querySelector(".sw-list") as HTMLElement;
    const rows = Array.from(section.querySelectorAll<HTMLElement>(".sw-row"));
    const images = Array.from(section.querySelectorAll<HTMLElement>(".sw-image-layer"));
    const N = rows.length;
    if (N === 0) return;

    let scrollActiveIndex = 0;
    let lastShown = 0;

    function showIndex(i: number) {
      if (i === lastShown) return;
      images[lastShown].classList.remove("is-visible");
      rows[lastShown].classList.remove("is-active");
      images[i].classList.add("is-visible");
      rows[i].classList.add("is-active");
      lastShown = i;
    }

    function update() {
      const rect = anchor.getBoundingClientRect();
      const runway = anchor.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / runway));

      // Translate the list so the active row sits at the anchor line (~40% down).
      // Total content height (rows) + bottom whitespace; scroll the inner content
      // upward proportionally to progress.
      const listContentHeight = list.scrollHeight;
      const visible = section.offsetHeight;
      const maxTranslate = Math.max(0, listContentHeight - visible * 0.6);
      list.style.transform = `translateY(-${progress * maxTranslate}px)`;

      // Active row index: 0 at progress=0, N-1 at progress=1.
      scrollActiveIndex = Math.min(N - 1, Math.round(progress * (N - 1)));
      showIndex(scrollActiveIndex);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  document.querySelectorAll<HTMLElement>(".sw-anchor").forEach(initSelectedWork);
</script>
```

Also update the `.sw-list` CSS rule to allow translation:

```css
.sw-list {
  flex: 1 1 50%;
  list-style: none;
  margin: 0;
  padding: 40vh 0 60vh 0; /* anchor padding so first row starts mid-pane and last can reach */
  overflow: hidden;
  position: relative;
  will-change: transform;
}
```

- [ ] **Step 2: Verify visually**

Run: `npm run dev`
Open `http://localhost:4321/`.

Expected:
- Scroll down to the section. As the section enters the viewport, it sticks (pins to fill the screen).
- Continued page scrolling causes the right list to translate upward.
- With only one entry today, the active row stays the only row; the list translation is small.
- After scrolling past the section's runway (~3 viewports), the section unpins and the page resumes (no footer yet — that comes later).

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/components/SelectedWork.astro
git commit -m "feat(selected-work): pin section during scroll, track active row by progress

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Add hover override

**Files:**
- Modify: `src/components/SelectedWork.astro`

- [ ] **Step 1: Extend the script with pointer handlers**

In the existing `<script>` block, add hover state tracking. Replace the body of `initSelectedWork` with:

```ts
function initSelectedWork(anchor: HTMLElement) {
  const section = anchor.querySelector(".sw") as HTMLElement;
  const list = section.querySelector(".sw-list") as HTMLElement;
  const rows = Array.from(section.querySelectorAll<HTMLElement>(".sw-row"));
  const images = Array.from(section.querySelectorAll<HTMLElement>(".sw-image-layer"));
  const N = rows.length;
  if (N === 0) return;

  let scrollActiveIndex = 0;
  let hoverIndex: number | null = null;
  let lastShown = 0;

  function activeIndex() {
    return hoverIndex !== null ? hoverIndex : scrollActiveIndex;
  }

  function showIndex(i: number) {
    if (i === lastShown) return;
    images[lastShown].classList.remove("is-visible");
    rows[lastShown].classList.remove("is-active");
    images[i].classList.add("is-visible");
    rows[i].classList.add("is-active");
    lastShown = i;
  }

  function update() {
    const rect = anchor.getBoundingClientRect();
    const runway = anchor.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / runway));

    const listContentHeight = list.scrollHeight;
    const visible = section.offsetHeight;
    const maxTranslate = Math.max(0, listContentHeight - visible * 0.6);
    list.style.transform = `translateY(-${progress * maxTranslate}px)`;

    scrollActiveIndex = Math.min(N - 1, Math.round(progress * (N - 1)));
    showIndex(activeIndex());
  }

  rows.forEach((row, i) => {
    row.addEventListener("pointerenter", () => {
      hoverIndex = i;
      showIndex(activeIndex());
    });
    row.addEventListener("pointerleave", () => {
      hoverIndex = null;
      showIndex(activeIndex());
    });
  });

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
```

- [ ] **Step 2: Verify visually (needs ≥2 entries to test meaningfully)**

To exercise hover, temporarily add a second placeholder entry to `src/data/selected-work.ts`:

```ts
{
  client: "Test Client B",
  employer: "Madwell",
  year: 2021,
  project: "Test entry B",
  role: "Test role",
  image: "/media/selected/visible-mobile-billboard.jpg",
  alt: "test",
},
```

Run dev server. Hover row 1 vs row 2 — image should swap (well, swap to itself for now; the test is that the active-row visual treatment toggles, since both entries point at the same placeholder image).

Revert the temporary second entry before committing — keep the single seed entry until Lindsey adds real ones.

- [ ] **Step 3: Commit**

```bash
git add src/components/SelectedWork.astro
git commit -m "feat(selected-work): hover override for active row

Hovering a row temporarily swaps the displayed image; pointer-leave
returns to the scroll-active row.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Image preload for instant swaps

**Files:**
- Modify: `src/components/SelectedWork.astro`

The crossfade transition is already in CSS (Task 4). Now add JS preloading so the image is in the browser cache before any swap, eliminating any flash of empty pane on the first hover/scroll-to.

- [ ] **Step 1: Add preload at the top of `initSelectedWork`**

Insert after the `if (N === 0) return;` line:

```ts
// Preload all images so swaps are instant.
images.forEach((img) => {
  const real = (img as HTMLImageElement).src;
  if (real) {
    const pre = new Image();
    pre.src = real;
  }
});
```

- [ ] **Step 2: Verify in DevTools**

Run dev server, open `http://localhost:4321/`, open DevTools → Network → Img filter. Reload. All entry images should appear in the network tab on first load (not waiting for hover).

- [ ] **Step 3: Commit**

```bash
git add src/components/SelectedWork.astro
git commit -m "feat(selected-work): preload all entry images on mount

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Mobile fallback + reduced motion

**Files:**
- Modify: `src/components/SelectedWork.astro`

Below 900px the section unpins entirely and stacks. `prefers-reduced-motion: reduce` falls through to the same stacked layout regardless of width.

- [ ] **Step 1: Add the media queries to the `<style>` block**

At the end of the `<style>` block in `src/components/SelectedWork.astro`, append:

```css
@media (max-width: 899px), (prefers-reduced-motion: reduce) {
  .sw-anchor {
    height: auto;
  }
  .sw {
    position: static;
    height: auto;
    flex-direction: column;
  }
  .sw-image-pane {
    aspect-ratio: 1 / 1;
    flex: none;
  }
  .sw-list {
    padding: 0;
    overflow: visible;
    transform: none !important;
  }
  .sw-row {
    opacity: 1; /* no dim treatment when stacked */
  }
}
```

- [ ] **Step 2: Add a runtime guard so the JS skips its work in stacked mode**

Top of `initSelectedWork`, after the early return:

```ts
const mq = window.matchMedia("(max-width: 899px), (prefers-reduced-motion: reduce)");
if (mq.matches) {
  // Stacked layout: hover still swaps for first-tap-then-stays behavior;
  // skip scroll handlers entirely.
  rows.forEach((row, i) => {
    row.addEventListener("pointerenter", () => {
      images.forEach((img, j) => img.classList.toggle("is-visible", j === i));
    });
  });
  return;
}
```

(This also gives mobile users tap-to-swap on the image, matching the intent in the spec.)

- [ ] **Step 3: Verify mobile + reduced-motion**

Run dev server. In DevTools, toggle device toolbar → 375px width. Expected:
- Section is no longer pinned. Image is a 1:1 hero on top, list flows below with normal page scroll.
- Tapping a row swaps the image (with one entry, this is a no-op visually).

Then in DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` while back in desktop width. Expected:
- Section unpins, falls back to the same stacked layout.

- [ ] **Step 4: Commit**

```bash
git add src/components/SelectedWork.astro
git commit -m "feat(selected-work): stacked layout for mobile + reduced motion

Below 900px or with prefers-reduced-motion, section unpins entirely:
image is a 1:1 hero, list flows below with normal page scroll. JS
skips scroll handlers and uses tap-to-swap for the image.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Rewrite homepage

**Files:**
- Modify: `src/pages/index.astro`

This is the big visual change.

- [ ] **Step 1: Replace `src/pages/index.astro` with the new layout**

Overwrite with:

```astro
---
import { getCollection } from "astro:content";
import Base from "../layouts/Base.astro";
import SelectedWork from "../components/SelectedWork.astro";
import { selectedWork } from "../data/selected-work";

const entries = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
---
<Base title="Lindsey Liang — Designer">
  <main class="index">
    <p class="intro">
      I'm at The New York Times, where I work across advertising, AI-powered search, and editorial summarization — much of what I've shipped lives in the case studies on this site.
    </p>

    <h2 class="section-label">Case Study</h2>

    <ul class="cs-list">
      {entries.map((e) => (
        <li class="cs-card">
          <a href={`/work/${e.id}`} class="cs-card-link">
            <div class="cs-card-thumb">
              <img src={e.data.thumbnail} alt="" loading="lazy" />
            </div>
            <div class="cs-card-meta">
              <h3 class="cs-card-title">{e.data.title}</h3>
              <p class="cs-card-dek">{e.data.dek}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>

    <h2 class="section-label">Other Selected Work</h2>

    <SelectedWork entries={selectedWork} />

    <footer class="home-foot">
      <p>© 2026 · Lindsey Liang</p>
      <a href="#top">Back to top</a>
    </footer>
  </main>
</Base>

<style>
  .index {
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--s-12) var(--s-4) 0;
  }

  .intro {
    font-family: var(--font-body);
    font-size: var(--fs-dek);
    line-height: var(--lh-snug);
    color: var(--ink);
    max-width: 600px;
    margin-left: auto;
    margin-bottom: var(--s-12);
  }

  .section-label {
    font-family: var(--font-mono);
    font-size: var(--fs-meta);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-muted);
    font-weight: 400;
    margin-bottom: var(--s-6);
  }

  .cs-list {
    list-style: none;
    margin: 0 0 var(--s-16) 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--s-12);
  }
  .cs-card-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  .cs-card-thumb {
    aspect-ratio: 1262 / 700;
    background: var(--rule);
    border-radius: var(--radius-sm);
    overflow: hidden;
    margin-bottom: var(--s-3);
  }
  .cs-card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 150ms ease;
  }
  .cs-card-link:hover .cs-card-thumb img { filter: brightness(1.05); }
  .cs-card-title {
    font-family: var(--font-display);
    font-size: var(--fs-h2);
    line-height: var(--lh-tight);
    margin: 0 0 var(--s-1) 0;
  }
  .cs-card-link:hover .cs-card-title {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .cs-card-dek {
    font-family: var(--font-body);
    font-size: var(--fs-body);
    color: var(--ink-muted);
    max-width: 600px;
  }

  .home-foot {
    max-width: var(--page-max);
    margin: var(--s-12) auto 0;
    padding: var(--s-6) var(--s-4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-sans);
    font-size: var(--fs-meta);
    color: var(--ink-muted);
    border-top: 1px solid var(--rule);
  }
  .home-foot a { text-decoration: none; }
  .home-foot a:hover { text-decoration: underline; }

  @media (max-width: 767px) {
    .intro { margin-left: 0; }
  }
</style>
```

- [ ] **Step 2: Verify visually**

Run: `npm run dev`
Open `http://localhost:4321/`.

Walk through:
- Top: header with `Work` highlighted in chartreuse.
- Intro paragraph, right-aligned to a 600px column.
- "Case Study" mono label.
- Three big cards stacked: NYT AI-Powered Search → AI Summary at NYT → Advertising at NYT, each with image + title + dek. Hover dims/underlines.
- "Other Selected Work" mono label.
- The pinned section enters and pins. List moves with scroll, hover overrides.
- Footer with copyright + Back to Top.

- [ ] **Step 3: Run all tests**

Run: `npm test`
Expected: existing tests pass (Task 2's nav assertions still hold; case-study and about tests unaffected).

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(home): rewrite homepage to match new sketch

- One-line intro, right-aligned to 600px column
- Three big stacked case-study cards (image-on-top, title + dek below)
- 'Other Selected Work' section with full-bleed pinned-scroll component
- Inline copyright + back-to-top footer

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Smoke tests for new homepage shape

**Files:**
- Modify: `tests/smoke.spec.ts`

- [ ] **Step 1: Update the homepage test**

Replace the first test in `tests/smoke.spec.ts` with the following two tests (the nav-order test from Task 2 is preserved as-is; this adds homepage shape coverage):

```ts
test("index renders header with nav and active highlight on Work", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header.site-header .brand")).toHaveText("Lindsey Liang");
  const navLinks = page.locator("header.site-header nav a");
  await expect(navLinks).toHaveCount(3);
  await expect(navLinks.nth(0)).toHaveText("Work");
  await expect(navLinks.nth(1)).toHaveText("About");
  await expect(navLinks.nth(2)).toHaveText("CV");
  await expect(navLinks.nth(0)).toHaveAttribute("aria-current", "page");
});

test("index renders intro, three case-study cards, and selected-work section", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main.index .intro")).toBeVisible();
  await expect(page.locator(".cs-list > li")).toHaveCount(3);
  await expect(page.locator(".sw-anchor")).toBeVisible();
  await expect(page.locator(".sw-row").first()).toBeVisible();
  await expect(page.locator(".home-foot")).toBeVisible();
});
```

(The replacement covers what was lost from the original test that asserted `main.index h1` — there's no longer an h1 on the page, but we check the intro paragraph and the three cards instead.)

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/smoke.spec.ts
git commit -m "test(smoke): assert homepage shape — intro, 3 cards, selected-work, footer

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: Manual QA pass

**Files:** none (verification only)

This is the final review before declaring the change done. No code; the goal is to catch interaction issues that automated tests don't cover.

- [ ] **Step 1: Run dev server and walk through the full homepage**

Run: `npm run dev`. Open `http://localhost:4321/`.

Check each:

- [ ] Header: `Work · About · CV` order. Yellow highlight under `Work` only on `/`. Highlight moves to `About` at `/about`, `CV` at `/cv`.
- [ ] Intro paragraph is one short line, right-edge-aligned to ~600px column.
- [ ] "Case Study" mono uppercase label is visible, in muted color.
- [ ] Three case-study cards render with their thumbnails. Hover dims slightly + underlines title.
- [ ] Clicking a card navigates to its case study.
- [ ] "Other Selected Work" mono label is visible.
- [ ] Selected-work section enters viewport and PINS.
- [ ] Continued scroll moves the right list. The image on the left swaps when the active row changes.
- [ ] Hover a row → image swaps to that row (or stays the same with only one entry — visual treatment of the row should brighten regardless).
- [ ] Mouse leave → image returns to scroll-active row.
- [ ] After section unpins, footer (`© 2026 · Lindsey Liang`, `Back to top`) appears.
- [ ] `Back to top` link scrolls to top.

- [ ] **Step 2: Mobile check**

In DevTools, switch to a 375px-wide viewport. Expected:
- Selected-work section UNPINS — image becomes a square hero, list scrolls normally beneath, no scroll-jacking.
- Tapping a row swaps the image (with only one entry, no visible change but no console errors).

- [ ] **Step 3: Reduced-motion check**

In DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`. Reload at desktop width.
Expected: same as mobile — section unpins, falls back to stacked layout.

- [ ] **Step 4: Cross-browser sanity**

Test in Safari (desktop) and Safari iOS (real device or simulator). The pinned-section pattern is the most likely thing to break on Safari iOS specifically.

If anything is broken, document the failure and either patch inline (small fix) or open a follow-up note in CLAUDE.md.

- [ ] **Step 5: Build the site for production**

Run: `npm run build`
Expected: build succeeds, no errors.

- [ ] **Step 6: Run full test suite one more time**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 7: No commit**

If any code fixes were needed during QA, commit them as separate, focused commits with descriptive messages — not a "QA fixes" catch-all.

---

## Done state

After all tasks:
- Homepage matches the Figma sketch.
- Selected-work section is full-bleed, pinned, with hover override and crossfade.
- Mobile + reduced-motion fall back gracefully.
- One placeholder entry is wired; Lindsey can add ~10–20 more by extending `src/data/selected-work.ts` and dropping images into `public/media/selected/`.
- Smoke tests cover the new homepage shape.
- The pre-existing uncommitted files (`M` on Figure, LeftNav, Margin, etc.) are still uncommitted — this plan deliberately did not touch them.

## Open items deferred to Lindsey

- Real `visible-mobile-billboard.jpg` image (placeholder is a copy of `advertising/cover.gif`).
- Remaining ~10–20 selected-work entries with paired images.
- Decision on whether the empty `public/media/about/{marco-polo-learning,madwell,kettle}/` folders stay or get repurposed/deleted.
