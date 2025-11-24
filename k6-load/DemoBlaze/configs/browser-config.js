import { sharedThresholds } from "./shared-thresholds.js";

// Define variables before using them
const rate = 5; // Total of 5 iterations
const duration = __ENV.TEST_DURATION || "5m"; // Default to 5 minutes if not specified
const timeUnit = __ENV.TEST_DURATION ? `${__ENV.TEST_DURATION / rate}m` : "1m"; // Calculate properly

export const options = {
  // Change to constant-arrival-rate to distribute 5 iterations throughout the test duration
  executor: "constant-arrival-rate",
  rate: rate,
  duration: duration,
  timeUnit: timeUnit,
  preAllocatedVUs: 1,
  maxVUs: 2, // Allow for slight concurrency if needed
  tags: {
    test_type: "browser_performance",
    priority: "high",
  },
  thresholds: {
    ...sharedThresholds,
  },
};