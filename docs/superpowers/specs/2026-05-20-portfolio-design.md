# Portfolio Site — Design Spec

**Date:** 2026-05-20
**Owner:** Lindsey Liang
**Status:** Draft, pending review

## 1. Goal

A personal portfolio in the editorial long-form genre — three-column layout with sticky left navigation, center essay column, and right marginalia. Showcases three case studies. Optimized for fast loads with text, images, and short video clips.

Reference aesthetic: Thinking Machines case-study layout (`thinkingmachines.ai/blog/interaction-models`). The genre — three-column long-form essay with marginalia, off-white background, serif body — is the structural target. Concrete tokens, typefaces, and copy are our own.

## 2. Scope

**In scope**
- 1 index page
- 1 about page
- 3 case-study pages (NYT AI-powered Search, Article Overview as summary capability, Wellness Shop)
- Shared three-column case-study layout
- Visual system (type, color, spacing tokens)
- Co-written copy for the three case studies (drafted with the user inline during build)

**Out of scope (for v1)**
- Blog, writing index, additional case studies
- CMS or admin UI (content is MDX in the repo)
- Analytics, search, or comments
- Dark mode (can add later)
- Internationalization

## 3. Architecture

**Tech:** Astro + MDX. Astro renders static HTML and ships zero JS by default. MDX lets case studies be authored as markdown with embedded components for citations and inline media. Islands architecture means any future interactive demo only ships JS for that island.

**Project location:** `~/projects/portfolio/`

**Folder layout:**
```
portfolio/
  src/
    layouts/
      CaseStudy.astro       # three-column long-form layout
      Index.astro           # landing-page layout
      About.astro           # about-page layout
    components/
      SiteHeader.astro      # thin persistent header
      LeftNav.astro         # sticky TOC, scroll-spy active state
      Margin.astro          # marginalia element (footnote / side-note / credit)
      Figure.astro          # image + caption + optional credit
      Video.astro           # autoplay-loop or controls modes
      PullQuote.astro
      Aside.astro           # boxed callout
      CaseStudyCard.astro   # used on index list
      Footer.astro
    content/
      work/
        nyt-search.mdx
        article-overview.mdx
        wellness-shop.mdx
    pages/
      index.astro
      about.astro
      work/[slug].astro     # dynamic route reading content/work
    styles/
      tokens.css            # color, type, spacing variables
      base.css              # reset + base element styles
  public/
    media/
      nyt-search/
      article-overview/
      wellness-shop/
      about/                # portrait, etc.
  astro.config.mjs
  package.json
```

**Routing:**
- `/` — index
- `/about` — about page
- `/work/nyt-search`
- `/work/article-overview`
- `/work/wellness-shop`

## 4. Page anatomy

### 4.1 Site header (all pages)
- Thin persistent strip at top
- Left: name as link to `/`
- Right: `Work` (links to `/`) · `About` (links to `/about`)
- Subtle bottom hairline (`--rule`)

### 4.2 Index page
1. Site header
2. Intro strip
   - Name as H1 (~48px serif)
   - One-sentence dek beneath
   - Two short paragraphs about the practice (~3–5 lines total)
3. Hairline rule + label `SELECTED WORK` (12px sans, uppercase, muted)
4. Case-study list (vertical, 3 entries)
   - Each row: thumbnail (16:10, ~360px wide) on left, title + dek + meta on right
   - Whole row clickable → `/work/{slug}`
   - 64px vertical gap between entries
   - Hover: thumbnail brightens slightly, title underlines in `--accent`
5. Footer: `© Year · Lindsey Liang` + back-to-top link

### 4.3 About page
- Site header
- Title block: "About"
- Long bio (3–5 paragraphs)
- Optional portrait
- CV-style background (Role · Year list)
- Contact: email, LinkedIn, optional Are.na or similar
- Last-updated date stamp
- Footer

### 4.4 Case-study page
1. Site header
2. Title block (within content area)
   - Project title (52px serif, weight 500)
   - Dek/subtitle (22px serif italic)
   - Meta row: `Role · Year · Context` (12px sans, uppercase, muted)
3. Hero visual — image or short looping video; can break the center column on either side
4. Three-column body (the core)
   - **Left:** sticky table-of-contents nav with section anchors and scroll-spy active state
   - **Center:** essay column, ~640px / ~62ch wide
   - **Right:** marginalia — footnotes, side-notes, credits, anchored to body paragraphs
5. Section backbone (every case study uses these five beats):
   - Context
   - Approach
   - Exploration
   - Outcome
   - Reflection
6. Footer strip
   - `← Previous` / `Next →` between case studies
   - `All work` link back to index
   - "Last updated" date

## 5. Visual system

### 5.1 Typography
- **Body / headings:** Source Serif 4 (open source, SIL OFL)
- **UI / nav / marginalia:** Inter (open source, SIL OFL)
- **Mono (rare):** JetBrains Mono

**Scale:**
| Token | Size | Family | Notes |
| --- | --- | --- | --- |
| H1 (project title) | 52px | Serif 500 | line-height 1.1 |
| Dek / subtitle | 22px | Serif italic | line-height 1.35 |
| H2 (section) | 28px | Serif 500 | |
| H3 (sub-section) | 20px | Serif 500 | |
| Body | 18px | Serif 400 | line-height 1.6 |
| Marginalia / caption | 13px | Sans 400 | line-height 1.45 |
| Meta (Role · Year) | 12px | Sans 500 | uppercase, letter-spacing 0.06em, muted |

### 5.2 Color tokens
- `--bg`: `#FAF8F4` warm off-white
- `--ink`: `#1A1A1A` body text
- `--ink-muted`: `#6B6B6B` meta + marginalia
- `--rule`: `#E8E3D7` hairlines
- `--accent`: `#1A1A1A` (deep ink for v1; revisit when content is in)

### 5.3 Spacing & layout
- Base unit: 8px
- Body paragraph spacing: 24px
- Section spacing: 96px between major sections, 64px within
- Page max-width: 1280px, centered
- Center column: 640px max
- Left TOC column: 200px wide
- Right marginalia column: 240px wide
- Gutters between columns: 56px
- Body line-height: 1.6

### 5.4 Other rules
- Hairline (1px, `--rule`) between major sections
- Inline figures: 4px corner radius
- Full-bleed figures: no radius
- Hover affordance on thumbnails: 1px ring in `--accent`, no shadow
- No drop shadows anywhere — separation is achieved by spacing or hairlines

## 6. Marginalia (right-column content)

Three kinds of content live in the right column. All are authored inline in MDX via `<Margin>` and anchor visually to the surrounding paragraph.

1. **Footnotes & citations** — numbered notes (e.g. links to articles, prior work, references). The center-column anchor shows a superscript number; the right-column block shows the matching number and the note body.
2. **Contextual side-notes** — un-numbered asides that expand on a paragraph without interrupting flow. Rendered as small italic blocks aligned to their paragraph's top.
3. **Credits / collaborators** — who you worked with on a phase, what they contributed. Rendered as a small label-value list (e.g. `Engineering — Name`).

**Component API sketch:**
```mdx
<Margin kind="footnote" n={1}>
  Reference text with a [link](https://example.com).
</Margin>

<Margin kind="note">
  Side-note text.
</Margin>

<Margin kind="credit">
  - Engineering — Name
  - PM — Name
</Margin>
```

## 7. Responsive behavior

| Breakpoint | Behavior |
| --- | --- |
| ≥1200px | Full three-column layout |
| 768–1199px | Drop left TOC; keep marginalia on the right |
| <768px | Single column. Marginalia inlines as a small block beneath its anchor paragraph. TOC becomes a collapsible button at the top of the page. |

Index case-study list:
- ≥768px: thumbnail and text side-by-side
- <768px: thumbnail above text, full-width

## 8. Performance

- Static output (no SSR runtime), deployed to a static host
- Astro `<Image>` / `<Picture>` for automatic resizing, format conversion (WebP/AVIF), and lazy loading
- Videos: `<video>` tags with `preload="metadata"`; short clips muted-autoplay-loop, longer use `controls`
- Fonts: self-hosted, `font-display: swap`, subset to Latin
- Total target: < 100KB JS on case-study pages (ideally 0); < 500KB images per page above the fold

## 9. Content authoring workflow

Co-write inline. For each case study:
1. Drop placeholder MDX file with the five-beat backbone scaffolded
2. User and assistant draft each section together; user has final say on copy
3. Visuals (images, short video clips) are placed in `public/media/{slug}/` and referenced via `<Figure>` / `<Video>`
4. Citations and credits added as `<Margin>` blocks alongside the relevant paragraph

## 10. Open questions / deferred decisions

- Final accent color (deferred — using `#1A1A1A` until content is in)
- Whether to add a "More work" / writing index later
- Hosting target (Vercel vs Netlify vs GitHub Pages) — defer until first deploy
- Whether About gets a portrait or stays text-only

## 11. Success criteria

- All three case studies published with co-written copy and real visuals
- Three-column layout renders correctly across the three breakpoints
- Lighthouse Performance ≥ 95 on the slowest case-study page (longest, most images)
- No JS shipped to case-study pages unless an island opt-in requires it
- Site loads on a cold cache in under 1.5s on a fast connection
