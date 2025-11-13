// @ts-check
import { test, expect } from "@playwright/test";
import { PerformanceMetricsCollector } from "playwright-performance-metrics";

export function createTest() {
  test("has title", async ({ page }) => {
    const collector = new PerformanceMetricsCollector();
    await page.goto("https://stage.peimembership.com/", {
      waitUntil: "networkidle",
    });
    const metrics = await collector.collectMetrics(page, {
      timeout: 10000,
    });
    console.log("Performance metrics:", {
      "First Paint": metrics.paint?.firstPaint,
      "First Contentful Paint": metrics.paint?.firstContentfulPaint,
      "Largest Contentful Paint": metrics.largestContentfulPaint,
      "Cumulative Layout Shift": metrics.cumulativeLayoutShift,
      "Total Blocking Time": metrics.totalBlockingTime,
      "Total Bytes": metrics.totalBytes,
      "Page Load Time": metrics.pageloadTiming,
      "DOM Complete Time": metrics.domCompleteTiming,
      "First Byte - Total": metrics.timeToFirstByte?.total,
      "First Byte - DNS": metrics.timeToFirstByte?.dns,
      "First Byte - Wait": metrics.timeToFirstByte?.wait,
      "First Byte - TSL": metrics.timeToFirstByte?.tls,
      "First Byte - Connection": metrics.timeToFirstByte?.connection,
      "First Byte - Redirect": metrics.timeToFirstByte?.redirect,
    });
  });

  test.skip("get started link", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  });
}

