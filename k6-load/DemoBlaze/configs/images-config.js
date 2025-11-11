import { sharedThresholds } from "./shared-thresholds.js";

export const options = {
  executor: "constant-vus",
  vus: 5000,
  duration: "1m",
  thresholds: {
    ...sharedThresholds,
    "http_req_duration{type:image}": ["p(95)<1000"], // Images can be slower
    "http_req_duration{type:image}": ["med<500"], // Median should be good
    "http_reqs{type:image}": ["count>=1000"],
  },
  tags: {
    test_type: "static",
    resource: "image",
  },
};
