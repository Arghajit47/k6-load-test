// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from "k6/http";

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep, check } from "k6";
import { Trend, Counter, Rate, Gauge } from "k6/metrics";

// Create custom metrics
const responseTimeTrend = new Trend("response_time_trend");
const errorCounter = new Counter("error_count");
const successRate = new Rate("success_rate");
const activeUsers = new Gauge("active_users");

export const options = {
  stages: [
    // Stage 1: Smoke test - validate basic functionality
    { duration: "10s", target: 1 }, // 1 VU for 10 seconds

    // Stage 2: Ramp up to small load
    { duration: "30s", target: 10 }, // Gradually increase to 10 VUs over 30s

    // Stage 3: Small load sustain
    { duration: "30s", target: 10 }, // Maintain 10 VUs for 30s

    // Stage 4: Graceful ramp down
    { duration: "10s", target: 0 }, // Gradually decrease to 0 VUs
  ],
  thresholds: {
    // Core requirements from assignment
    http_req_failed: ["rate<0.01"], // Requirement 1: Failure rate threshold
    http_req_duration: ["p(95)<500"], // Requirement 2: 95th percentile threshold
    checks: ["rate>0.95"], // Requirement 3: Check-based threshold

    // Additional custom metrics for deeper analysis
    response_time_trend: ["avg < 200", "p(99) < 1000"],
    error_count: ["count < 10"],
    success_rate: ["rate > 0.95"],
    active_users: ["value < 50"],
  },
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  const start = Date.now();
  const url = "https://quickpizza.grafana.com";

  // Make a GET request to the target URL
  const response = http.get(url);
  const duration = Date.now() - start;
  responseTimeTrend.add(duration);

  if (response.status !== 200) {
    errorCounter.add(1);
  } else {
    successRate.add(1);
  }
  activeUsers.add(__VU);

  // Check the response status
  check(response, {
    "status is 200": (r) => r.status === 200,
  });

  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}
