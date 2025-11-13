import { sharedThresholds } from "./shared-thresholds.js";

export const options = {
  executor: "constant-vus",
  vus: 500,
  duration: "5m",
  thresholds: {
    ...sharedThresholds,
    "http_req_duration{type:css}": ["p(99)<200"], // Very strict for CSS
    "http_reqs{type:css}": ["count>=500"],
  },
  tags: {
    test_type: "static",
    resource: "stylesheet",
  },
};
