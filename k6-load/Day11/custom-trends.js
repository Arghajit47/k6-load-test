import { Trend, Counter, Rate, Gauge } from "k6/metrics";
import http from "k6/http";
import { check } from "k6";

let loginDuration = new Trend("login_duration");
let successRate = new Rate("success_rate");
let totalRequests = new Counter("total_requests");
let responseSize = new Gauge("response_size");

export const options = {
  thresholds: {
    login_duration: ["p(95)<1000"],
    success_rate: ["rate>0.95"],
    response_size: ["value<200"],
  },
};

export default function () {
  let res = http.get("https://httpbin.org/delay/1");

  totalRequests.add(1);
  loginDuration.add(res.timings.duration);
  successRate.add(res.status === 200);
  responseSize.add(res.body.length);

  check(res, { "status is 200": (r) => r.status === 200 });
}
