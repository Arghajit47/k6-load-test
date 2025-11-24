import { default as testXhrFetch } from "./tests/test-xhr-fetch.js";
import { default as testCss } from "./tests/test-css.js";
import { default as testDoc } from "./tests/test-doc.js";
import { default as testImage } from "./tests/test-image.js";
import { default as testJs } from "./tests/test-js.js";
import { default as testBrowser } from "./tests/browser-test.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";
// Import all configs
import { options as xhrOptions } from "./configs/xhr-config.js";
import { options as cssOptions } from "./configs/css-config.js";
import { options as jsOptions } from "./configs/js-config.js";
import { options as imageOptions } from "./configs/images-config.js";
import { options as browserOptions } from "./configs/browser-config.js";

export const options = {
  scenarios: {
    browser: {
      exec: "testBrowser", // Change to testBrowser instead of testXhrFetch
      executor: "constant-arrival-rate", // Change to constant-arrival-rate for predictable execution
      rate: browserOptions.rate, // Run 5 iterations total
      timeUnit: browserOptions.timeUnit, // Within 1 minute
      duration: browserOptions.duration, // Use environment variable or default to 5 minutes
      preAllocatedVUs: browserOptions.preAllocatedVUs, // Add this line to include preAllocatedVUs
      maxVUs: browserOptions.maxVUs, // Also include maxVUs for good measure
      tags: browserOptions.tags, // Use browser-specific tags
    },
    xhr: {
      exec: "testXhrFetch",
      executor: "ramping-vus", // Use ramping-vus for stages
      stages: xhrOptions.stages, // Use the stages directly
      tags: xhrOptions.tags,
      options: xhrOptions.options,
    },
    css: {
      exec: "testCss",
      executor: cssOptions.executor || "constant-vus",
      vus: cssOptions.vus || 20,
      duration: cssOptions.duration || "2m",
      tags: cssOptions.tags,
      options: cssOptions.options,
    },
    doc: {
      exec: "testDoc",
      executor: "constant-vus", 
      vus: 1000, // Reduced from 5000
      duration: "5m",
      tags: { test_type: "static", resource: "document" },
      options: cssOptions.options,
    },
    js: {
      exec: "testJs",
      executor: jsOptions.executor || "constant-vus",
      vus: jsOptions.vus || 20,
      duration: jsOptions.duration || "2m",
      tags: jsOptions.tags,
      options: jsOptions.options,
    },
    image: {
      exec: "testImage",
      executor: imageOptions.executor || "constant-vus",
      vus: imageOptions.vus || 20,
      duration: imageOptions.duration || "2m",
      tags: imageOptions.tags,
      options: imageOptions.options,
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
    "summary.json": JSON.stringify(data),
  };
}

// Export the test functions for k6 to use
export { testXhrFetch, testCss, testDoc, testJs, testImage, testBrowser };
