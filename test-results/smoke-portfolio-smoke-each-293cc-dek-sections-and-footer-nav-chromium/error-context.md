# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> portfolio smoke >> each case study renders title, dek, sections, and footer nav
- Location: tests/smoke.spec.ts:17:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('article.cs h1')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('article.cs h1')

```

```yaml
- main:
  - img
  - 'heading "404: Not found" [level=1]'
  - text: "Path: /work/article-overview"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("portfolio smoke", () => {
  4  |   test("index renders header, intro, and three case-study cards", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await expect(page.locator("header.site-header .brand")).toHaveText("Lindsey Liang");
  7  |     await expect(page.locator("main.index h1")).toHaveText("Lindsey Liang");
  8  |     await expect(page.locator(".work-list > li")).toHaveCount(3);
  9  |   });
  10 | 
  11 |   test("about page renders title and contact section", async ({ page }) => {
  12 |     await page.goto("/about");
  13 |     await expect(page.locator("main.about h1")).toHaveText("About");
  14 |     await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  15 |   });
  16 | 
  17 |   test("each case study renders title, dek, sections, and footer nav", async ({ page }) => {
  18 |     const slugs = ["nyt-search", "article-overview", "wellness-shop"];
  19 |     for (const slug of slugs) {
  20 |       await page.goto(`/work/${slug}`);
> 21 |       await expect(page.locator("article.cs h1")).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  22 |       await expect(page.locator("article.cs .dek")).toBeVisible();
  23 |       await expect(page.locator("article.cs h2")).toHaveCount(5);
  24 |       await expect(page.locator("nav.cs-foot")).toBeVisible();
  25 |     }
  26 |   });
  27 | 
  28 |   test("nyt-search case study has marginalia in three kinds", async ({ page }) => {
  29 |     await page.setViewportSize({ width: 1400, height: 900 });
  30 |     await page.goto("/work/nyt-search");
  31 |     await expect(page.locator(".margin--footnote")).toHaveCount(1);
  32 |     await expect(page.locator(".margin--note")).toHaveCount(1);
  33 |     await expect(page.locator(".margin--credit")).toHaveCount(1);
  34 |   });
  35 | });
  36 | 
```