// Import the http module to make HTTP requests. From this point, you can use `http` methods to make HTTP requests.
import http from "k6/http";

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep, check } from "k6";

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
    // Define performance thresholds
    http_req_duration: ["p(95)<500"], // 95% of requests under 500ms
    http_req_failed: ["rate<0.01"], // Error rate less than 1%
  },
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  const url = "https://quickpizza.grafana.com";

  // Make a GET request to the target URL
  const response = http.get(url);

  // Check the response status
  check(response, {
    "status is 200": (r) => r.status === 200,
  });

  // Sleep for 1 second to simulate real-world usage
  sleep(1); // For Day2 assignment I just increased the sleep time to 3 seconds
}
