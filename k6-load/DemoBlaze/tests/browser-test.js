import { browser } from "k6/browser";
import { check } from "k6";
import { Trend } from "k6/metrics";
import { options as browserOptions } from "../configs/browser-config.js";

// Create custom metrics
const firstContentfulPaintMetric = new Trend('browser_performance_firstContentfulPaint');
const domCompleteMetric = new Trend('browser_performance_domComplete');
const loadTimeMetric = new Trend('browser_performance_loadTime');
const timeToFirstByteMetric = new Trend('browser_performance_timeToFirstByte');

// We still need to define options here for when this script is run directly
export const options = {
  scenarios: {
    default: {
      executor: browserOptions.executor,
      vus: browserOptions.vus,
      options: {
        ...browserOptions.options,
        browser: {
          type: "chromium",
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        },
      },
    }
  },
  thresholds: browserOptions.thresholds,
  tags: browserOptions.tags
};


export default async function testBrowser() {
  const page = await browser.newPage();

  try {
    // Navigate to the target URL
    await page.goto("https://demoblaze.com/", { waitUntil: "networkidle" });

    // Basic check to see if page loaded
    check(page, {
      "page loaded": () => page.url().includes('demoblaze.com'), // Check that we landed on the correct site
    });

    // Collect performance metrics using browser APIs
    const metrics = await page.evaluate(() => {
      // Get navigation timing metrics
      const perfEntries = performance.getEntriesByType("navigation")[0];
      const paintEntries = performance.getEntriesByType("paint");

      return {
        firstPaint: paintEntries.find((entry) => entry.name === "first-paint")
          ?.startTime,
        firstContentfulPaint: paintEntries.find(
          (entry) => entry.name === "first-contentful-paint"
        )?.startTime,
        domComplete: perfEntries.domComplete,
        loadTime: perfEntries.loadEventEnd - perfEntries.fetchStart,
        timeToFirstByte: perfEntries.responseStart - perfEntries.requestStart,
        totalBytes: perfEntries.transferSize,
      };
    });

    console.log("Performance metrics:", metrics);
    
    // Report metrics to k6 for threshold evaluation using the Trend objects
    if (metrics.firstContentfulPaint) {
      firstContentfulPaintMetric.add(metrics.firstContentfulPaint);
    }
    if (metrics.domComplete) {
      domCompleteMetric.add(metrics.domComplete);
    }
    if (metrics.loadTime) {
      loadTimeMetric.add(metrics.loadTime);
    }
    if (metrics.timeToFirstByte) {
      timeToFirstByteMetric.add(metrics.timeToFirstByte);
    }

    return metrics;
  } finally {
    page.close();
  }
}
