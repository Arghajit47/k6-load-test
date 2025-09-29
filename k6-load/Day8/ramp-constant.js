import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    // First Ramp up test
    ramp_phase: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 10 },
        { duration: "10s", target: 40 },
        { duration: "10s", target: 100 },
      ],
      gracefulStop: "5s",
    },
    // Constant test
    constant_phase: {
      executor: "constant-arrival-rate",
      rate: 50,
      timeUnit: "1s",
      duration: "1m",
      preAllocatedVUs: 20,
      maxVUs: 100,
      gracefulStop: "5s",
      startTime: "35s", // Start after ramp up phase
    },
  },
};

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
