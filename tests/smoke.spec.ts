import { test, expect } from "@playwright/test";

test.describe("portfolio smoke", () => {
  test("index renders header with nav and active highlight on Work", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header.site-header .brand")).toHaveText("Lindsey Liang");
    const navLinks = page.locator("header.site-header nav a");
    await expect(navLinks).toHaveCount(2);
    await expect(navLinks.nth(0)).toHaveText("Work");
    await expect(navLinks.nth(1)).toHaveText("About/CV");
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

  test("about page renders About + Contact + CV sections", async ({ page }) => {
    await page.goto("/about");
    const labels = page.locator("main.about .section-label");
    await expect(labels).toHaveCount(2);
    await expect(labels.nth(0)).toHaveText("About");
    await expect(labels.nth(1)).toHaveText("CV");
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
    await expect(page.locator(".company-block").first()).toBeVisible();
  });

  test("each case study renders title, dek, sections, and footer nav", async ({ page }) => {
    const cases = [
      { slug: "nyt-search", h2Count: 5 },
      { slug: "summary", h2Count: 5 },
      { slug: "advertising", h2Count: 3 },
    ];
    for (const { slug, h2Count } of cases) {
      await page.goto(`/work/${slug}`);
      await expect(page.locator("article.cs h1")).toBeVisible();
      await expect(page.locator("article.cs .dek")).toBeVisible();
      await expect(page.locator("article.cs h2")).toHaveCount(h2Count);
      await expect(page.locator("nav.cs-foot")).toBeVisible();
    }
  });

  test("nyt-search case study has marginalia in three kinds", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto("/work/nyt-search");
    await expect(page.locator(".margin--footnote").first()).toBeVisible();
    await expect(page.locator(".margin--note").first()).toBeVisible();
    await expect(page.locator(".margin--credit").first()).toBeVisible();
  });
});
