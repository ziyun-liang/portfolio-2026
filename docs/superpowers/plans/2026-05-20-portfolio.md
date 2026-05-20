# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static long-form portfolio site with a three-column case-study layout (left TOC, center essay, right marginalia), an index page listing three case studies, and an about page.

**Architecture:** Astro + MDX, static output, zero JS by default. Three case studies authored as MDX files in a content collection. A shared `CaseStudy` layout implements the three-column body. A small JS island powers the sticky TOC scroll-spy. Smoke tests via Playwright assert page-level structure.

**Tech Stack:** Astro 5+, MDX, TypeScript (strict), Playwright (smoke tests), self-hosted Source Serif 4 + Inter (open-source).

**Spec:** `docs/superpowers/specs/2026-05-20-portfolio-design.md`

---

## File structure (final)

```
portfolio/
  package.json
  astro.config.mjs
  tsconfig.json
  playwright.config.ts
  .gitignore
  src/
    content/
      config.ts                       # Zod schema for work collection
      work/
        nyt-search.mdx
        article-overview.mdx
        wellness-shop.mdx
    layouts/
      Base.astro                      # HTML shell, head, fonts, global styles
      CaseStudy.astro                 # three-column body layout
    components/
      SiteHeader.astro
      Footer.astro
      LeftNav.astro                   # sticky TOC w/ scroll-spy island
      Margin.astro                    # marginalia (footnote / note / credit)
      Figure.astro
      Video.astro
      PullQuote.astro
      Aside.astro
      CaseStudyCard.astro             # used on index list
    pages/
      index.astro
      about.astro
      work/[slug].astro
    styles/
      tokens.css
      base.css
      fonts.css
  public/
    fonts/                            # self-hosted woff2 files
    media/
      nyt-search/
      article-overview/
      wellness-shop/
      about/
  tests/
    smoke.spec.ts                     # Playwright smoke tests
```

Each file has one responsibility. Components are split by role (header, footer, marginalia, figure) so any one can be revised without touching the others. The `Base` layout owns the page shell; `CaseStudy` owns the three-column body. Content lives in MDX so copy and visuals can be edited without touching component code.

---

## Task 1: Scaffold the Astro project and initialize the repo

**Files:**
- Create: `~/projects/portfolio/package.json` (via Astro CLI)
- Create: `~/projects/portfolio/astro.config.mjs`
- Create: `~/projects/portfolio/tsconfig.json`
- Create: `~/projects/portfolio/.gitignore`

The directory `~/projects/portfolio/` already exists (created during spec phase) and contains `docs/`. Astro's CLI requires an empty target dir, so we scaffold to a temp dir and copy in.

- [ ] **Step 1: Scaffold Astro into a temp directory**

```bash
cd ~/projects
npm create astro@latest portfolio-tmp -- --template minimal --typescript strict --install --no-git --skip-houston
```

Expected: Astro creates `~/projects/portfolio-tmp/` with a minimal TypeScript project and runs `npm install`. If the CLI flags have changed, fall back to the interactive prompt: choose `Empty`, `TypeScript: Strict`, `Install dependencies: Yes`, `Initialize git: No`.

- [ ] **Step 2: Move scaffold files into the existing portfolio directory**

```bash
mv ~/projects/portfolio-tmp/* ~/projects/portfolio/
mv ~/projects/portfolio-tmp/.gitignore ~/projects/portfolio/.gitignore
mv ~/projects/portfolio-tmp/.vscode ~/projects/portfolio/.vscode 2>/dev/null || true
rmdir ~/projects/portfolio-tmp
cd ~/projects/portfolio
ls -la
```

Expected: `~/projects/portfolio/` now contains `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/`, `public/`, `node_modules/`, plus the existing `docs/` from the spec phase.

- [ ] **Step 3: Add MDX integration**

```bash
cd ~/projects/portfolio
npx astro add mdx --yes
```

Expected: Astro installs `@astrojs/mdx`, updates `astro.config.mjs` to register the integration. Confirm `astro.config.mjs` now imports and uses `mdx()`.

- [ ] **Step 4: Initialize git and make the first commit**

```bash
cd ~/projects/portfolio
git init
git add -A
git commit -m "chore: scaffold Astro + MDX project"
```

Expected: clean working tree on `main` branch with one commit.

- [ ] **Step 5: Verify dev server boots**

```bash
cd ~/projects/portfolio
npm run dev
```

Expected: Astro reports `Local: http://localhost:4321/`. Open in browser, confirm default Astro page renders. Stop with Ctrl-C.

---

## Task 2: Add design tokens

**Files:**
- Create: `src/styles/tokens.css`

- [ ] **Step 1: Create the tokens file**

`src/styles/tokens.css`:

```css
:root {
  /* Color */
  --bg: #FAF8F4;
  --ink: #1A1A1A;
  --ink-muted: #6B6B6B;
  --rule: #E8E3D7;
  --accent: #1A1A1A;

  /* Typography */
  --font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  --fs-h1: 52px;
  --fs-dek: 22px;
  --fs-h2: 28px;
  --fs-h3: 20px;
  --fs-body: 18px;
  --fs-margin: 13px;
  --fs-meta: 12px;

  --lh-tight: 1.1;
  --lh-snug: 1.35;
  --lh-normal: 1.45;
  --lh-relaxed: 1.6;

  /* Spacing (8px scale) */
  --s-1: 8px;
  --s-2: 16px;
  --s-3: 24px;
  --s-4: 32px;
  --s-6: 48px;
  --s-7: 56px;
  --s-8: 64px;
  --s-12: 96px;
  --s-16: 128px;

  /* Layout */
  --page-max: 1280px;
  --col-center: 640px;
  --col-left: 200px;
  --col-right: 240px;
  --col-gutter: 56px;

  /* Misc */
  --radius-sm: 4px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/tokens.css
git commit -m "feat: add design tokens"
```

---

## Task 3: Add base styles (reset + element defaults)

**Files:**
- Create: `src/styles/base.css`

- [ ] **Step 1: Write base styles**

`src/styles/base.css`:

```css
*, *::before, *::after { box-sizing: border-box; }

html, body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd, ul, ol {
  margin: 0;
  padding: 0;
}

ul, ol { list-style: none; }

html {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: var(--fs-body);
  line-height: var(--lh-relaxed);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body { min-height: 100vh; }

h1, h2, h3 { font-weight: 500; line-height: var(--lh-tight); }

a { color: inherit; text-decoration: underline; text-underline-offset: 0.18em; text-decoration-thickness: 1px; }
a:hover { color: var(--accent); }

img, video { max-width: 100%; height: auto; display: block; }

p + p { margin-top: var(--s-3); }

hr { border: none; border-top: 1px solid var(--rule); margin: var(--s-12) 0; }

::selection { background: var(--ink); color: var(--bg); }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/base.css
git commit -m "feat: add base styles"
```

---

## Task 4: Self-host fonts

**Files:**
- Create: `public/fonts/source-serif-4-regular.woff2`
- Create: `public/fonts/source-serif-4-italic.woff2`
- Create: `public/fonts/source-serif-4-medium.woff2`
- Create: `public/fonts/inter-regular.woff2`
- Create: `public/fonts/inter-medium.woff2`
- Create: `src/styles/fonts.css`

- [ ] **Step 1: Install fontsource packages and copy woff2 files**

Use Fontsource which packages open-source fonts as npm modules.

```bash
cd ~/projects/portfolio
npm install @fontsource/source-serif-4 @fontsource/inter
mkdir -p public/fonts
cp node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff2 public/fonts/source-serif-4-regular.woff2
cp node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-italic.woff2 public/fonts/source-serif-4-italic.woff2
cp node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-500-normal.woff2 public/fonts/source-serif-4-medium.woff2
cp node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2 public/fonts/inter-regular.woff2
cp node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2 public/fonts/inter-medium.woff2
```

Expected: 5 woff2 files in `public/fonts/`. If the file paths inside the fontsource package have changed, run `ls node_modules/@fontsource/source-serif-4/files/ | head` and adjust the source paths.

- [ ] **Step 2: Write @font-face rules**

`src/styles/fonts.css`:

```css
@font-face {
  font-family: "Source Serif 4";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/source-serif-4-regular.woff2") format("woff2");
}

@font-face {
  font-family: "Source Serif 4";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/source-serif-4-italic.woff2") format("woff2");
}

@font-face {
  font-family: "Source Serif 4";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/source-serif-4-medium.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/inter-regular.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("/fonts/inter-medium.woff2") format("woff2");
}
```

- [ ] **Step 3: Commit**

```bash
git add public/fonts src/styles/fonts.css package.json package-lock.json
git commit -m "feat: self-host Source Serif 4 and Inter"
```

---

## Task 5: Create the Base layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Write the Base layout**

`src/layouts/Base.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = "Portfolio of Lindsey Liang." } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preload" href="/fonts/source-serif-4-regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import "../styles/fonts.css";
  @import "../styles/tokens.css";
  @import "../styles/base.css";
</style>
```

- [ ] **Step 2: Replace the default index page so we can confirm Base works**

Overwrite `src/pages/index.astro` with:

```astro
---
import Base from "../layouts/Base.astro";
---
<Base title="Lindsey Liang">
  <main style="padding: var(--s-8); max-width: var(--col-center); margin: 0 auto;">
    <h1>Lindsey Liang</h1>
    <p>Portfolio site under construction.</p>
  </main>
</Base>
```

- [ ] **Step 3: Boot dev server and verify**

```bash
npm run dev
```

Expected: `http://localhost:4321/` shows the heading and paragraph in Source Serif on the warm off-white background. Stop with Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro src/pages/index.astro
git commit -m "feat: add Base layout"
```

---

## Task 6: SiteHeader and Footer components

**Files:**
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Write SiteHeader**

`src/components/SiteHeader.astro`:

```astro
---
const path = Astro.url.pathname;
const isWork = path === "/" || path.startsWith("/work");
const isAbout = path.startsWith("/about");
---
<header class="site-header">
  <div class="inner">
    <a href="/" class="brand">Lindsey Liang</a>
    <nav>
      <a href="/" aria-current={isWork ? "page" : undefined}>Work</a>
      <a href="/about" aria-current={isAbout ? "page" : undefined}>About</a>
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
  nav a { text-decoration: none; }
  nav a[aria-current="page"] { font-weight: 500; }
</style>
```

- [ ] **Step 2: Write Footer**

`src/components/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---
<footer class="site-footer">
  <div class="inner">
    <span>© {year} · Lindsey Liang</span>
    <a href="#top">Back to top</a>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid var(--rule);
    font-family: var(--font-sans);
    font-size: var(--fs-meta);
    color: var(--ink-muted);
    margin-top: var(--s-16);
  }
  .inner {
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--s-3) var(--s-4);
    display: flex;
    justify-content: space-between;
  }
  a { text-decoration: none; }
</style>
```

- [ ] **Step 3: Wire header and footer into Base**

Replace the body of `src/layouts/Base.astro`:

```astro
---
import SiteHeader from "../components/SiteHeader.astro";
import Footer from "../components/Footer.astro";
interface Props {
  title: string;
  description?: string;
}
const { title, description = "Portfolio of Lindsey Liang." } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preload" href="/fonts/source-serif-4-regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body id="top">
    <SiteHeader />
    <slot />
    <Footer />
  </body>
</html>

<style is:global>
  @import "../styles/fonts.css";
  @import "../styles/tokens.css";
  @import "../styles/base.css";
</style>
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Expected: index page now shows the thin header strip with `Lindsey Liang` left and `Work`/`About` right, plus a footer at the bottom. Ctrl-C.

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteHeader.astro src/components/Footer.astro src/layouts/Base.astro
git commit -m "feat: add SiteHeader and Footer"
```

---

## Task 7: Build out the Index page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index page with full layout**

`src/pages/index.astro`:

```astro
---
import Base from "../layouts/Base.astro";
---
<Base title="Lindsey Liang — Designer">
  <main class="index">
    <section class="intro">
      <h1>Lindsey Liang</h1>
      <p class="dek">Designer working on AI-powered editorial products at the New York Times.</p>
      <div class="bio">
        <p>I focus on the seam between people and intelligent systems — how interfaces shape what people understand, trust, and decide. My work spans search, summarization, and personalization in editorial contexts.</p>
        <p>Before NYT I worked on consumer software and design tooling.</p>
      </div>
    </section>

    <hr />

    <h2 class="section-label">Selected work</h2>

    <ul class="work-list">
      {/* Cards will be wired in Task 9 */}
    </ul>
  </main>
</Base>

<style>
  .index {
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--s-12) var(--s-4);
  }
  .intro h1 { font-size: var(--fs-h1); margin-bottom: var(--s-3); }
  .intro .dek {
    font-size: var(--fs-dek);
    font-style: italic;
    line-height: var(--lh-snug);
    color: var(--ink);
    margin-bottom: var(--s-6);
    max-width: var(--col-center);
  }
  .intro .bio { max-width: var(--col-center); }
  .section-label {
    font-family: var(--font-sans);
    font-size: var(--fs-meta);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-muted);
    font-weight: 500;
    margin-bottom: var(--s-6);
  }
  .work-list { display: flex; flex-direction: column; gap: var(--s-8); }
</style>
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: page shows H1, dek in italic, two-paragraph bio, hairline rule, "SELECTED WORK" label. Empty list area below. Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build out index page intro and structure"
```

---

## Task 8: About page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Write about page**

`src/pages/about.astro`:

```astro
---
import Base from "../layouts/Base.astro";
const lastUpdated = "May 2026";
---
<Base title="About — Lindsey Liang">
  <main class="about">
    <header>
      <h1>About</h1>
    </header>
    <section class="bio">
      <p>I'm a designer focused on the boundary between people and intelligent systems. I currently work at the New York Times on editorial products powered by AI — search, summarization, and personalization.</p>
      <p>My practice sits between research, prototyping, and shipping. I tend to build to think: most of what I learn comes from putting an interactive thing in front of someone and watching what they do.</p>
      <p>Before NYT I worked on consumer software and design tooling.</p>
    </section>

    <section class="cv">
      <h2>Background</h2>
      <ul>
        <li><span class="when">2024 — Present</span><span class="what">Designer, The New York Times</span></li>
        <li><span class="when">Earlier</span><span class="what">Consumer software, design tooling</span></li>
      </ul>
    </section>

    <section class="contact">
      <h2>Contact</h2>
      <ul>
        <li><a href="mailto:hello@example.com">Email</a></li>
        <li><a href="https://www.linkedin.com/in/" rel="me">LinkedIn</a></li>
      </ul>
    </section>

    <p class="updated">Last updated {lastUpdated}.</p>
  </main>
</Base>

<style>
  .about {
    max-width: var(--col-center);
    margin: 0 auto;
    padding: var(--s-12) var(--s-4);
  }
  h1 { font-size: var(--fs-h1); margin-bottom: var(--s-6); }
  h2 { font-size: var(--fs-h2); margin: var(--s-8) 0 var(--s-3); }
  .cv ul, .contact ul { display: flex; flex-direction: column; gap: var(--s-1); }
  .cv li { display: grid; grid-template-columns: 180px 1fr; gap: var(--s-3); font-family: var(--font-sans); font-size: var(--fs-margin); }
  .cv .when { color: var(--ink-muted); }
  .updated { font-family: var(--font-sans); font-size: var(--fs-meta); color: var(--ink-muted); margin-top: var(--s-12); }
</style>
```

- [ ] **Step 2: Verify in browser**

Visit `http://localhost:4321/about`. Confirm bio paragraphs, Background list with two-column rows, Contact list, last-updated stamp.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page"
```

---

## Task 9: Content collection schema and three placeholder MDX files

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/work/nyt-search.mdx`
- Create: `src/content/work/article-overview.mdx`
- Create: `src/content/work/wellness-shop.mdx`

- [ ] **Step 1: Write the collection schema**

`src/content/config.ts`:

```ts
import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    role: z.string(),
    year: z.string(),
    context: z.string(),
    thumbnail: z.string(),       // path under /media/<slug>/
    order: z.number(),           // display order on index
  }),
});

export const collections = { work };
```

- [ ] **Step 2: Create the three MDX files with frontmatter and section backbone**

`src/content/work/nyt-search.mdx`:

```mdx
---
title: "NYT AI-Powered Search"
dek: "Rebuilding search around what readers are actually trying to do."
role: "Lead designer"
year: "2026"
context: "The New York Times"
thumbnail: "/media/nyt-search/cover.png"
order: 1
---

## Context

Placeholder copy for the Context section. Replace with the framing of the problem and the setting at NYT.

## Approach

Placeholder copy for the Approach section.

## Exploration

Placeholder copy for the Exploration section.

## Outcome

Placeholder copy for the Outcome section.

## Reflection

Placeholder copy for the Reflection section.
```

`src/content/work/article-overview.mdx`:

```mdx
---
title: "Article Overview"
dek: "A summary capability for long-form journalism."
role: "Designer"
year: "2026"
context: "The New York Times"
thumbnail: "/media/article-overview/cover.png"
order: 2
---

## Context

Placeholder copy for the Context section.

## Approach

Placeholder copy for the Approach section.

## Exploration

Placeholder copy for the Exploration section.

## Outcome

Placeholder copy for the Outcome section.

## Reflection

Placeholder copy for the Reflection section.
```

`src/content/work/wellness-shop.mdx`:

```mdx
---
title: "NYT Wellness Shop"
dek: "Reframing health Q&A as an e-commerce-shaped catalog."
role: "Designer"
year: "2026"
context: "The New York Times"
thumbnail: "/media/wellness-shop/cover.png"
order: 3
---

## Context

Placeholder copy for the Context section.

## Approach

Placeholder copy for the Approach section.

## Exploration

Placeholder copy for the Exploration section.

## Outcome

Placeholder copy for the Outcome section.

## Reflection

Placeholder copy for the Reflection section.
```

- [ ] **Step 3: Add placeholder thumbnail files**

Create solid-color placeholder PNGs so the schema's `thumbnail` paths resolve. A simple way:

```bash
cd ~/projects/portfolio
mkdir -p public/media/nyt-search public/media/article-overview public/media/wellness-shop public/media/about
# 1px gray PNG, can be replaced with real images later
printf '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xa3>$\xfe\x00\x00\x00\x00IEND\xaeB`\x82' > public/media/nyt-search/cover.png
cp public/media/nyt-search/cover.png public/media/article-overview/cover.png
cp public/media/nyt-search/cover.png public/media/wellness-shop/cover.png
```

- [ ] **Step 4: Run astro check to verify schema**

```bash
npx astro check
```

Expected: no errors. If it complains about missing `astro:content` types, run `npx astro sync` first, then re-run check.

- [ ] **Step 5: Commit**

```bash
git add src/content public/media
git commit -m "feat: add work content collection with three placeholder case studies"
```

---

## Task 10: CaseStudyCard component and wire into index

**Files:**
- Create: `src/components/CaseStudyCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write the card component**

`src/components/CaseStudyCard.astro`:

```astro
---
interface Props {
  href: string;
  title: string;
  dek: string;
  role: string;
  year: string;
  context: string;
  thumbnail: string;
}
const { href, title, dek, role, year, context, thumbnail } = Astro.props;
---
<a class="card" href={href}>
  <div class="thumb">
    <img src={thumbnail} alt="" loading="lazy" />
  </div>
  <div class="meta">
    <h3>{title}</h3>
    <p class="dek">{dek}</p>
    <p class="meta-row">{role} · {year} · {context}</p>
  </div>
</a>

<style>
  .card {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: var(--s-6);
    text-decoration: none;
    color: inherit;
  }
  .thumb {
    aspect-ratio: 16 / 10;
    background: var(--rule);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }
  .thumb img { width: 100%; height: 100%; object-fit: cover; transition: filter 150ms ease; }
  .card:hover .thumb img { filter: brightness(1.05); }
  h3 {
    font-size: var(--fs-h2);
    line-height: var(--lh-tight);
    margin-bottom: var(--s-2);
  }
  .card:hover h3 {
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-underline-offset: 0.2em;
  }
  .dek { font-size: var(--fs-body); margin-bottom: var(--s-3); max-width: 50ch; }
  .meta-row {
    font-family: var(--font-sans);
    font-size: var(--fs-meta);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-muted);
  }

  @media (max-width: 767px) {
    .card { grid-template-columns: 1fr; }
    .thumb { width: 100%; }
  }
</style>
```

- [ ] **Step 2: Wire cards into index**

Replace the empty `<ul class="work-list">` in `src/pages/index.astro` and update the frontmatter:

```astro
---
import { getCollection } from "astro:content";
import Base from "../layouts/Base.astro";
import CaseStudyCard from "../components/CaseStudyCard.astro";

const entries = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
---
<Base title="Lindsey Liang — Designer">
  <main class="index">
    <section class="intro">
      <h1>Lindsey Liang</h1>
      <p class="dek">Designer working on AI-powered editorial products at the New York Times.</p>
      <div class="bio">
        <p>I focus on the seam between people and intelligent systems — how interfaces shape what people understand, trust, and decide. My work spans search, summarization, and personalization in editorial contexts.</p>
        <p>Before NYT I worked on consumer software and design tooling.</p>
      </div>
    </section>

    <hr />

    <h2 class="section-label">Selected work</h2>

    <ul class="work-list">
      {entries.map((e) => (
        <li>
          <CaseStudyCard
            href={`/work/${e.slug}`}
            title={e.data.title}
            dek={e.data.dek}
            role={e.data.role}
            year={e.data.year}
            context={e.data.context}
            thumbnail={e.data.thumbnail}
          />
        </li>
      ))}
    </ul>
  </main>
</Base>
```

(Keep the existing `<style>` block.)

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: index page now shows three case-study rows in order: NYT AI-Powered Search, Article Overview, NYT Wellness Shop. Each row has a placeholder thumbnail, title, dek, meta. Links go to `/work/<slug>` (will 404 until Task 14).

- [ ] **Step 4: Commit**

```bash
git add src/components/CaseStudyCard.astro src/pages/index.astro
git commit -m "feat: render case-study cards on index from content collection"
```

---

## Task 11: Inline content components (Figure, Video, PullQuote, Aside)

**Files:**
- Create: `src/components/Figure.astro`
- Create: `src/components/Video.astro`
- Create: `src/components/PullQuote.astro`
- Create: `src/components/Aside.astro`

- [ ] **Step 1: Figure**

`src/components/Figure.astro`:

```astro
---
interface Props {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  fullBleed?: boolean;
}
const { src, alt, caption, credit, fullBleed = false } = Astro.props;
---
<figure class={fullBleed ? "full-bleed" : "inline"}>
  <img src={src} alt={alt} loading="lazy" />
  {(caption || credit) && (
    <figcaption>
      {caption && <span class="caption">{caption}</span>}
      {credit && <span class="credit">{credit}</span>}
    </figcaption>
  )}
</figure>

<style>
  figure { margin: var(--s-6) 0; }
  figure.inline img { border-radius: var(--radius-sm); }
  figure.full-bleed { margin-left: calc(-1 * var(--s-6)); margin-right: calc(-1 * var(--s-6)); }
  figcaption {
    margin-top: var(--s-2);
    font-family: var(--font-sans);
    font-size: var(--fs-margin);
    line-height: var(--lh-normal);
    color: var(--ink-muted);
    display: flex;
    justify-content: space-between;
    gap: var(--s-3);
  }
  .credit { white-space: nowrap; }
</style>
```

- [ ] **Step 2: Video**

`src/components/Video.astro`:

```astro
---
interface Props {
  src: string;
  caption?: string;
  controls?: boolean;
  poster?: string;
}
const { src, caption, controls = false, poster } = Astro.props;
---
<figure>
  {controls ? (
    <video src={src} poster={poster} preload="metadata" controls />
  ) : (
    <video src={src} poster={poster} preload="metadata" autoplay loop muted playsinline />
  )}
  {caption && <figcaption>{caption}</figcaption>}
</figure>

<style>
  figure { margin: var(--s-6) 0; }
  video { width: 100%; border-radius: var(--radius-sm); }
  figcaption {
    margin-top: var(--s-2);
    font-family: var(--font-sans);
    font-size: var(--fs-margin);
    line-height: var(--lh-normal);
    color: var(--ink-muted);
  }
</style>
```

- [ ] **Step 3: PullQuote**

`src/components/PullQuote.astro`:

```astro
<blockquote class="pull">
  <slot />
</blockquote>

<style>
  .pull {
    font-family: var(--font-serif);
    font-size: var(--fs-h3);
    font-style: italic;
    line-height: var(--lh-snug);
    color: var(--ink);
    margin: var(--s-6) 0;
    padding-left: var(--s-3);
    border-left: 2px solid var(--ink);
  }
</style>
```

- [ ] **Step 4: Aside**

`src/components/Aside.astro`:

```astro
<aside class="callout">
  <slot />
</aside>

<style>
  .callout {
    background: rgba(26, 26, 26, 0.04);
    border-left: 2px solid var(--rule);
    padding: var(--s-3);
    margin: var(--s-6) 0;
    font-size: var(--fs-body);
    line-height: var(--lh-relaxed);
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Figure.astro src/components/Video.astro src/components/PullQuote.astro src/components/Aside.astro
git commit -m "feat: add inline content components"
```

---

## Task 12: Margin component (footnote / note / credit)

**Files:**
- Create: `src/components/Margin.astro`

The `Margin` component is special — visually it lives in the right column of the case-study layout, but it's authored inline in MDX. We use CSS grid on the case-study body so the marginalia children flow into the right column at their declared insertion point. To make this work, the case-study layout assigns each marginalia element to `grid-column: 3` while body elements default to `grid-column: 2`.

- [ ] **Step 1: Write the component**

`src/components/Margin.astro`:

```astro
---
interface Props {
  kind: "footnote" | "note" | "credit";
  n?: number;
}
const { kind, n } = Astro.props;
---
<aside class={`margin margin--${kind}`} data-kind={kind}>
  {kind === "footnote" && n !== undefined && <span class="num">{n}</span>}
  <div class="body"><slot /></div>
</aside>

<style>
  .margin {
    grid-column: 3;
    font-family: var(--font-sans);
    font-size: var(--fs-margin);
    line-height: var(--lh-normal);
    color: var(--ink-muted);
    align-self: start;
  }
  .margin--footnote { display: grid; grid-template-columns: auto 1fr; gap: var(--s-1); }
  .margin--footnote .num {
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    color: var(--ink);
  }
  .margin--note { font-style: italic; }
  .margin--credit :global(ul) { display: flex; flex-direction: column; gap: 4px; }
  .margin--credit :global(li) { display: grid; grid-template-columns: 90px 1fr; gap: var(--s-1); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Margin.astro
git commit -m "feat: add Margin component"
```

---

## Task 13: CaseStudy layout (three-column body)

**Files:**
- Create: `src/layouts/CaseStudy.astro`

- [ ] **Step 1: Write the layout**

`src/layouts/CaseStudy.astro`:

```astro
---
import Base from "./Base.astro";
import LeftNav from "../components/LeftNav.astro";

interface Props {
  title: string;
  dek: string;
  role: string;
  year: string;
  context: string;
  sections: { id: string; label: string }[];
  prev?: { href: string; title: string };
  next?: { href: string; title: string };
}
const { title, dek, role, year, context, sections, prev, next } = Astro.props;
---
<Base title={`${title} — Lindsey Liang`} description={dek}>
  <article class="cs">
    <header class="cs-title">
      <h1>{title}</h1>
      <p class="dek">{dek}</p>
      <p class="meta">{role} · {year} · {context}</p>
    </header>

    <div class="hero"><slot name="hero" /></div>

    <div class="cs-body">
      <LeftNav sections={sections} />
      <div class="content"><slot /></div>
    </div>

    <nav class="cs-foot">
      {prev ? <a href={prev.href}>← {prev.title}</a> : <span />}
      <a href="/">All work</a>
      {next ? <a href={next.href}>{next.title} →</a> : <span />}
    </nav>
  </article>
</Base>

<style is:global>
  .cs { max-width: var(--page-max); margin: 0 auto; padding: var(--s-12) var(--s-4); }
  .cs-title { max-width: var(--col-center); margin-bottom: var(--s-8); }
  .cs-title h1 { font-size: var(--fs-h1); margin-bottom: var(--s-3); }
  .cs-title .dek {
    font-size: var(--fs-dek);
    font-style: italic;
    line-height: var(--lh-snug);
    margin-bottom: var(--s-3);
  }
  .cs-title .meta {
    font-family: var(--font-sans);
    font-size: var(--fs-meta);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-muted);
  }
  .hero { margin-bottom: var(--s-8); }
  .hero:empty { display: none; }

  .cs-body {
    display: grid;
    grid-template-columns: var(--col-left) var(--col-center) var(--col-right);
    column-gap: var(--col-gutter);
    align-items: start;
  }
  .cs-body .content {
    grid-column: 2;
    display: grid;
    grid-template-columns: subgrid;
    column-gap: var(--col-gutter);
  }
  .cs-body .content > * { grid-column: 1; }
  .cs-body .content > .margin { grid-column: 2; }

  .cs-body h2 {
    font-size: var(--fs-h2);
    margin: var(--s-12) 0 var(--s-3);
  }
  .cs-body h2:first-child { margin-top: 0; }
  .cs-body h3 { font-size: var(--fs-h3); margin: var(--s-6) 0 var(--s-2); }
  .cs-body p { margin-bottom: var(--s-3); }

  .cs-foot {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--s-3);
    margin-top: var(--s-16);
    padding-top: var(--s-3);
    border-top: 1px solid var(--rule);
    font-family: var(--font-sans);
    font-size: var(--fs-margin);
  }
  .cs-foot a { text-decoration: none; }
  .cs-foot a:nth-child(1) { justify-self: start; }
  .cs-foot a:nth-child(2) { justify-self: center; color: var(--ink-muted); }
  .cs-foot a:nth-child(3) { justify-self: end; }

  @media (max-width: 1199px) {
    .cs-body { grid-template-columns: var(--col-center) var(--col-right); }
    .cs-body .content { grid-column: 1; }
    .cs-body .content > .margin { grid-column: 2; }
  }
  @media (max-width: 767px) {
    .cs-body { grid-template-columns: 1fr; }
    .cs-body .content { grid-column: 1; }
    .cs-body .content > .margin {
      grid-column: 1;
      border-left: 2px solid var(--rule);
      padding-left: var(--s-2);
      margin: var(--s-3) 0;
    }
  }
</style>
```

Note on the subgrid trick: the `.content` element uses `grid-template-columns: subgrid` to inherit the parent grid's columns, then individual children pin to either column 1 (body) or column 2 (margin). Browsers without subgrid support get a single-column fallback because the grid lines won't match.

- [ ] **Step 2: Commit**

```bash
git add src/layouts/CaseStudy.astro
git commit -m "feat: add CaseStudy three-column layout"
```

---

## Task 14: LeftNav component (sticky TOC with scroll-spy)

**Files:**
- Create: `src/components/LeftNav.astro`

This is the only JS island in the site. It uses an IntersectionObserver to highlight the active section as the user scrolls.

- [ ] **Step 1: Write the component**

`src/components/LeftNav.astro`:

```astro
---
interface Props {
  sections: { id: string; label: string }[];
}
const { sections } = Astro.props;
---
<nav class="left-nav" aria-label="Section navigation">
  <ul>
    {sections.map((s) => (
      <li><a href={`#${s.id}`} data-section={s.id}>{s.label}</a></li>
    ))}
  </ul>
</nav>

<script>
  const links = document.querySelectorAll<HTMLAnchorElement>(".left-nav a[data-section]");
  const targets: HTMLElement[] = [];
  links.forEach((a) => {
    const id = a.dataset.section!;
    const el = document.getElementById(id);
    if (el) targets.push(el);
  });

  if (targets.length > 0) {
    const setActive = (id: string) => {
      links.forEach((a) => {
        a.classList.toggle("is-active", a.dataset.section === id);
      });
    };

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    targets.forEach((t) => obs.observe(t));
  }
</script>

<style>
  .left-nav {
    grid-column: 1;
    position: sticky;
    top: var(--s-6);
    align-self: start;
  }
  .left-nav ul { display: flex; flex-direction: column; gap: var(--s-1); }
  .left-nav a {
    display: block;
    font-family: var(--font-sans);
    font-size: var(--fs-margin);
    color: var(--ink-muted);
    text-decoration: none;
    line-height: var(--lh-normal);
    padding: 4px 0;
    border-left: 2px solid transparent;
    padding-left: var(--s-1);
    transition: color 150ms ease, border-color 150ms ease;
  }
  .left-nav a:hover { color: var(--ink); }
  .left-nav a.is-active { color: var(--ink); border-left-color: var(--accent); }

  @media (max-width: 1199px) {
    .left-nav { display: none; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LeftNav.astro
git commit -m "feat: add LeftNav sticky TOC with scroll-spy"
```

---

## Task 15: Wire case-study slug page

**Files:**
- Create: `src/pages/work/[slug].astro`

- [ ] **Step 1: Write the dynamic route**

`src/pages/work/[slug].astro`:

```astro
---
import { getCollection } from "astro:content";
import CaseStudy from "../../layouts/CaseStudy.astro";

export async function getStaticPaths() {
  const entries = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
  return entries.map((entry, i) => ({
    params: { slug: entry.slug },
    props: {
      entry,
      prev: i > 0 ? { href: `/work/${entries[i - 1].slug}`, title: entries[i - 1].data.title } : undefined,
      next: i < entries.length - 1 ? { href: `/work/${entries[i + 1].slug}`, title: entries[i + 1].data.title } : undefined,
    },
  }));
}

const { entry, prev, next } = Astro.props;
const { Content, headings } = await entry.render();
const sections = headings
  .filter((h) => h.depth === 2)
  .map((h) => ({ id: h.slug, label: h.text }));
---
<CaseStudy
  title={entry.data.title}
  dek={entry.data.dek}
  role={entry.data.role}
  year={entry.data.year}
  context={entry.data.context}
  sections={sections}
  prev={prev}
  next={next}
>
  <Content />
</CaseStudy>
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Visit `http://localhost:4321/work/nyt-search`. Expected:
- Header strip at top
- Title block with title, italic dek, meta row
- Three-column body: left TOC listing Context/Approach/Exploration/Outcome/Reflection, center column with section headings and placeholder paragraphs, right column empty for now
- Footer with `← prev` / `All work` / `next →` (next only on first two; prev only on last two)
- Scrolling highlights the active section in the left TOC

Visit `/work/article-overview` and `/work/wellness-shop` to confirm all three render.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work
git commit -m "feat: render case-study pages from content collection"
```

---

## Task 16: Demonstrate Margin component in one MDX file

**Files:**
- Modify: `src/content/work/nyt-search.mdx`

To prove the marginalia rendering works end-to-end, add one of each kind to the NYT Search file. The other two case studies stay clean for now and will gain marginalia during co-writing.

- [ ] **Step 1: Update nyt-search.mdx**

Replace `src/content/work/nyt-search.mdx`:

```mdx
---
title: "NYT AI-Powered Search"
dek: "Rebuilding search around what readers are actually trying to do."
role: "Lead designer"
year: "2026"
context: "The New York Times"
thumbnail: "/media/nyt-search/cover.png"
order: 1
---

import Margin from "../../components/Margin.astro";

## Context

Placeholder copy for the Context section. Replace with the framing of the problem and the setting at NYT.

<Margin kind="footnote" n={1}>
  Reference text supporting the claim above. Replace with a real citation.
</Margin>

## Approach

Placeholder copy for the Approach section.

<Margin kind="note">
  A short side-note that expands on the approach without breaking the main flow.
</Margin>

## Exploration

Placeholder copy for the Exploration section.

<Margin kind="credit">
  - **Engineering** — TBD
  - **PM** — TBD
  - **Research** — TBD
</Margin>

## Outcome

Placeholder copy for the Outcome section.

## Reflection

Placeholder copy for the Reflection section.
```

- [ ] **Step 2: Verify in browser**

Visit `/work/nyt-search`. Expected:
- A small superscripted footnote-styled block in the right column near the Context paragraph
- An italic side-note in the right column near the Approach paragraph
- A credits list in the right column near the Exploration paragraph
- On screens narrower than 1200px, the marginalia inline below their anchor paragraphs

- [ ] **Step 3: Commit**

```bash
git add src/content/work/nyt-search.mdx
git commit -m "feat: demonstrate Margin component in NYT Search case study"
```

---

## Task 17: Set up Playwright and write smoke tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/smoke.spec.ts`
- Modify: `package.json` (add scripts)

- [ ] **Step 1: Install Playwright**

```bash
cd ~/projects/portfolio
npm install -D @playwright/test
npx playwright install chromium
```

Expected: `@playwright/test` added as devDependency, Chromium browser installed.

- [ ] **Step 2: Write playwright config**

`playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://localhost:4321" },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4321",
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
```

- [ ] **Step 3: Add npm scripts**

Modify `package.json` `scripts`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  }
}
```

- [ ] **Step 4: Write smoke test (failing first)**

`tests/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test.describe("portfolio smoke", () => {
  test("index renders header, intro, and three case-study cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header.site-header .brand")).toHaveText("Lindsey Liang");
    await expect(page.locator("main.index h1")).toHaveText("Lindsey Liang");
    await expect(page.locator(".work-list > li")).toHaveCount(3);
  });

  test("about page renders title and contact section", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("main.about h1")).toHaveText("About");
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  });

  test("each case study renders title, dek, sections, and footer nav", async ({ page }) => {
    const slugs = ["nyt-search", "article-overview", "wellness-shop"];
    for (const slug of slugs) {
      await page.goto(`/work/${slug}`);
      await expect(page.locator("article.cs h1")).toBeVisible();
      await expect(page.locator("article.cs .dek")).toBeVisible();
      await expect(page.locator("article.cs h2")).toHaveCount(5);
      await expect(page.locator("nav.cs-foot")).toBeVisible();
    }
  });

  test("nyt-search case study has marginalia in three kinds", async ({ page, viewport }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto("/work/nyt-search");
    await expect(page.locator(".margin--footnote")).toHaveCount(1);
    await expect(page.locator(".margin--note")).toHaveCount(1);
    await expect(page.locator(".margin--credit")).toHaveCount(1);
  });
});
```

- [ ] **Step 5: Build and run tests**

```bash
npm run build
npm test
```

Expected: all 4 tests pass. If any fail, fix the underlying selector or implementation, then re-run. Do not loosen tests to make them pass.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests package.json package-lock.json
git commit -m "test: add Playwright smoke tests"
```

---

## Task 18: Final build verification and cleanup

**Files:** none

- [ ] **Step 1: Run astro check**

```bash
cd ~/projects/portfolio
npx astro check
```

Expected: 0 errors, 0 warnings. Fix any reported issues before continuing.

- [ ] **Step 2: Run a clean build**

```bash
rm -rf dist
npm run build
```

Expected: build completes. Confirm `dist/` contains:
- `dist/index.html`
- `dist/about/index.html`
- `dist/work/nyt-search/index.html`
- `dist/work/article-overview/index.html`
- `dist/work/wellness-shop/index.html`
- `dist/fonts/*.woff2`
- `dist/media/*/cover.png`

```bash
ls dist
ls dist/work
```

- [ ] **Step 3: Run tests against the production preview**

```bash
npm test
```

Expected: all tests pass against `astro preview` server.

- [ ] **Step 4: Visual review checklist**

Boot dev server (`npm run dev`) and walk through:

- [ ] Index page: header strip, large H1, italic dek, two-paragraph bio, hairline, "SELECTED WORK" label, three rows with placeholder thumbnails
- [ ] About page: title, three-paragraph bio, Background list, Contact list, last-updated stamp
- [ ] Each case study: title block, three-column body where width allows, sticky left TOC highlights as you scroll, footer with prev/next/all-work links
- [ ] NYT Search specifically: footnote, note, and credit blocks visible in the right column at desktop width, inlined under anchor paragraphs at mobile width
- [ ] Resize browser to ~1000px: left TOC disappears, right margin column remains
- [ ] Resize browser to ~600px: single column, marginalia inlines under paragraphs as bordered blocks

- [ ] **Step 5: Final commit**

```bash
git status
git log --oneline
```

Expected: clean working tree, ~17 commits on `main`.

---

## Self-Review

**Spec coverage check:**
- [x] Index page (Task 7, 10)
- [x] About page (Task 8)
- [x] 3 case-study pages (Task 9, 15)
- [x] Shared CaseStudy layout (Task 13)
- [x] Three-column body (Task 13 — grid + subgrid)
- [x] Visual system / tokens (Task 2)
- [x] Self-hosted fonts (Task 4)
- [x] Site header (Task 6)
- [x] Footer (Task 6)
- [x] Marginalia: footnote / note / credit (Task 12, 16)
- [x] Figure / Video / PullQuote / Aside (Task 11)
- [x] Sticky TOC with scroll-spy (Task 14)
- [x] Content collection schema (Task 9)
- [x] Responsive: tablet drops left TOC, mobile inlines marginalia (Task 13)
- [x] Performance: zero JS by default, font-display swap, image lazy loading (Tasks 4, 5, 10, 11)
- [x] Smoke tests (Task 17)

**Placeholder scan:** No "TBD" / "fill in later" steps. All component code, CSS, and commands are concrete. Placeholder MDX copy is intentional — the user co-writes content during implementation, not before.

**Type / name consistency:**
- `CaseStudy.astro` props (`title`, `dek`, `role`, `year`, `context`, `sections`, `prev`, `next`) match what `[slug].astro` passes in Task 15.
- `Margin.astro` `kind` values (`"footnote" | "note" | "credit"`) match the CSS selectors (`.margin--footnote`, `.margin--note`, `.margin--credit`) and the test assertions in Task 17.
- Content collection schema field names match what `CaseStudyCard` and `[slug].astro` read (`title`, `dek`, `role`, `year`, `context`, `thumbnail`, `order`).
- CSS variable names introduced in Task 2 are used consistently across all later component styles.

Plan is internally consistent. Ready to execute.
