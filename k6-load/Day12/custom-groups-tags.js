import { Trend, Counter, Rate, Gauge } from "k6/metrics";
import http from "k6/http";
import { check, group } from "k6";

let loginDuration = new Trend("login_duration", true);
let searchDuration = new Trend("search_duration", true);
let successRate = new Rate("success_rate", true);
let totalRequests = new Counter("total_requests");
let responseSize = new Gauge("response_size");

export const options = {
  thresholds: {
    "login_duration{type:page}": ["p(95)<800"],
    "search_duration{type:api}": ["p(95)<1200"],
    "success_rate{type:page}": ["rate>0.95"],
    "success_rate{type:api}": ["rate>0.95"],
    "response_size{type:page}": ["value<200"],
    "response_size{type:api}": ["value<200"],
  },
};

export default function () {
  group("Landing Page", function () {
    let res = http.get("https://httpbin.org/status/200", {
      tags: { endpoint: "landing", type: "page" },
    });
    totalRequests.add(1, { endpoint: "landing", type: "page" });
    loginDuration.add(res.timings.duration, {
      endpoint: "landing",
      type: "page",
    });
    successRate.add(res.status === 200, { endpoint: "landing", type: "page" });
    responseSize.add(res.body.length, { endpoint: "landing", type: "page" });
    check(res, { "Landing page status is 200": (r) => r.status === 200 });
  });

  group("API Delay", function () {
    let res = http.get("https://httpbin.org/delay/1", {
      tags: { endpoint: "delay", type: "api" },
    });
    totalRequests.add(1, { endpoint: "delay", type: "api" });
    searchDuration.add(res.timings.duration, {
      endpoint: "delay",
      type: "api",
    });
    successRate.add(res.status === 200, { endpoint: "delay", type: "api" });
    responseSize.add(res.body.length, { endpoint: "delay", type: "api" });
    check(res, { "Search API responds": (r) => r.status === 200 });
  });
}
