import { sharedThresholds } from "./shared-thresholds.js";

export const options = {
  executor: "per-vu-iterations",
  vus: 1,
  options: {
    browser: {
      type: "chromium",
    },
  },
  thresholds: {
    ...sharedThresholds,
    "browser_performance_firstContentfulPaint": ["p(95)<3000"], // FCP adjusted based on actual performance
    "browser_performance_domComplete": ["p(95)<1500"], // DOM complete adjusted based on actual performance
    "browser_performance_loadTime": ["p(95)<1500"], // Load time adjusted based on actual performance
    "browser_performance_timeToFirstByte": ["p(95)<500"], // TTFB threshold added
  },
  tags: {
    test_type: "browser_performance",
    priority: "high",
  },
};