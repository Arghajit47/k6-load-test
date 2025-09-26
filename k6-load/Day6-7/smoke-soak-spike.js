import http from "k6/http";
import { check } from "k6";

// CLI env variable to run a specific type of test
const testType = __ENV.TEST_TYPE || "smoke";

const testConfigs = {
  smoke: [
    { duration: "10s", target: 1 }, // 1 VU for 10 seconds
  ],

  spike: [
    { duration: "0s", target: 50 }, // immediate jump
    { duration: "20s", target: 50 },
    { duration: "5s", target: 0 },
  ],

  soak: [
    { duration: "5m", target: 40 }, // maintain 40 VUs for 30 seconds
  ],
};

const thresholdsConfig = {
  smoke: {
    http_req_failed: ["rate<0.01"], // Less than 1% errors
    http_req_duration: ["p(95)<1000"], // 95% < 1 second
    "http_req_duration{status:200}": ["p(95)<800"], // Successful requests only
  },
  spike: {
    http_req_failed: ["rate<0.03"], // Allow up to 3% errors during spike
    http_req_duration: ["p(95)<2000"], // 95% < 2 seconds during stress
    http_reqs: ["count>1000"], // Should make at least 1000 requests

    // Different thresholds for different stages
    "http_req_duration{scenario:default}": [
      { threshold: "p(95)<1000", abortOnFail: true }, // Strict during normal load
    ],
  },
  soak: {
    http_req_failed: ["rate<0.005"], // Very strict: < 0.5% errors
    http_req_duration: ["p(95)<500"], // Consistent performance over time
    http_reqs: ["rate>50"], // Sustained throughput

    // Memory/performance thresholds (if using browser metrics)
    iteration_duration: ["p(95)<2000"], // No performance degradation
  },
};

// configurations
export const options = {
  stages: testConfigs[testType],
  thresholds: thresholdsConfig[testType],
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  const url = "https://quickpizza.grafana.com";

  // Make a GET request to the target URL
  const response = http.get(url);

  // Check the response status and check no performance degradation
  check(response, {
    "status is 200": (r) => r.status === 200,
    "no performance degradation": (r) => r.timings.duration < 1000,
  });
}
