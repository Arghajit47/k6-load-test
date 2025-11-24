import { sharedThresholds } from "./shared-thresholds.js";

export const options = {
  stages: [
    { duration: "2m", target: 500 }, // Ramp up
    { duration: "3m", target: 1000 }, // Peak load
    { duration: "1m", target: 500 }, // Ramp down
  ],
  thresholds: {
    ...sharedThresholds,
    "http_req_duration{type:xhr}": ["p(95)<500"], // Stricter for XHR
    "http_reqs{type:xhr}": ["count>=300"], // Minimum XHR requests
    iterations: ["count>=100"],
  },
  tags: {
    test_type: "api",
    priority: "high",
  },
};
