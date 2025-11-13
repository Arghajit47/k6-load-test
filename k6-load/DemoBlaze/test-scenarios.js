import { default as testXhrFetch } from "./tests/test-xhr-fetch.js";
import { default as testCss } from "./tests/test-css.js";
import { default as testDoc } from "./tests/test-doc.js";
import { default as testJs } from "./tests/test-js.js";
import { default as testBrowser } from "./tests/browser-test.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";
// Import all configs
import { options as xhrOptions } from "./configs/xhr-config.js";
import { options as cssOptions } from "./configs/css-config.js";
import { options as jsOptions } from "./configs/js-config.js";
import { options as browserOptions } from "./configs/browser-config.js";

// Merge the necessary parts

// Check for BROWSER_ONLY environment variable
const browserOnly = __ENV.BROWSER_ONLY === 'true';

export const options = {
  scenarios: browserOnly ? {
    // Only include browser scenario when BROWSER_ONLY is true
    browser: {
      exec: "testBrowser",
      executor: browserOptions.executor || "per-vu-iterations",
      vus: browserOptions.vus || 1,
      options: browserOptions.options || {
        browser: {
          type: "chromium",
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
        },
      },
      tags: browserOptions.tags || { test_type: "browser_performance" },
    }
  } : {
    // Include all scenarios when BROWSER_ONLY is not true
    browser: {
      exec: "testBrowser",
      executor: browserOptions.executor || "per-vu-iterations",
      vus: browserOptions.vus || 1,
      options: browserOptions.options || {
        browser: {
          type: "chromium",
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
        },
      },
      tags: browserOptions.tags || { test_type: "browser_performance" },
    },
    xhr: {
      exec: "testXhrFetch",
      executor: "ramping-vus", // Use ramping-vus for stages
      stages: xhrOptions.stages, // Use the stages directly
      tags: xhrOptions.tags,
    },
    css: {
      exec: "testCss",
      executor: cssOptions.executor || "constant-vus",
      vus: cssOptions.vus || 20,
      duration: cssOptions.duration || "2m",
      tags: cssOptions.tags,
    },
    doc: {
      exec: "testDoc",
      executor: "constant-vus", // Using default since doc uses xhr config
      vus: 5000,
      duration: "5m",
      tags: { test_type: "static", resource: "document" },
    },
    js: {
      exec: "testJs",
      executor: jsOptions.executor || "constant-vus",
      vus: jsOptions.vus || 20,
      duration: jsOptions.duration || "2m",
      tags: jsOptions.tags,
    },
  },
  // Global thresholds can be defined here or in each scenario
  thresholds: {
    // Common thresholds
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
    // Browser performance thresholds
    ...(browserOptions.thresholds || {}),
  },
};

export function handleSummary(data) {
  console.log("Preparing the end-of-test summary...");
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

// Export the test functions for k6 to use
export { testXhrFetch, testCss, testDoc, testJs, testBrowser };
