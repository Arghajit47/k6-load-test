import { sharedThresholds } from "./shared-thresholds.js";

export const options = {
  executor: "constant-vus",
  vus: 5000,
  duration: "5m",
  thresholds: {
    ...sharedThresholds,
    "http_req_duration{type:js}": ["p(95)<300"], // JS should be fast
    "http_req_duration{type:js}": ["max<1000"], // No very slow JS loads
    "http_reqs{type:js}": ["rate>50"], // Rate-based threshold
  },
  tags: {
    test_type: "static",
    resource: "javascript",
  },
  jsonFile: "test-results.json",
  output: "test-reports",
};
