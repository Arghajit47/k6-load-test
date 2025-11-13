import { sharedThresholds } from "./shared-thresholds.js";

export const options = {
  executor: "per-vu-iterations",
  vus: 1,
  options: {
    browser: {
      type: "chromium",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    },
  },
  thresholds: {
    ...sharedThresholds,
    "browser_performance_firstContentfulPaint": ["p(95)<3000"], // FCP adjusted based on actual performance
    "browser_performance_domComplete": ["p(95)<2000"], // DOM complete adjusted for headless mode
    "browser_performance_loadTime": ["p(95)<2000"], // Load time adjusted for headless mode
    "browser_performance_timeToFirstByte": ["p(95)<500"], // TTFB threshold added
  },
  tags: {
    test_type: "browser_performance",
    priority: "high",
  },
};