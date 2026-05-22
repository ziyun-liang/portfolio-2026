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
    const slugs = ["nyt-search", "summary", "wellness-shop"];
    for (const slug of slugs) {
      await page.goto(`/work/${slug}`);
      await expect(page.locator("article.cs h1")).toBeVisible();
      await expect(page.locator("article.cs .dek")).toBeVisible();
      await expect(page.locator("article.cs h2")).toHaveCount(5);
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
