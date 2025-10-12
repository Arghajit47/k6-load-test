import http from "k6/http";
import { check, group } from "k6";

export const options = {
  vus: 5,
  duration: "10s",
  thresholds: {
    "http_req_duration{endpoint:landing}": ["p(95)<500"],
    "http_req_duration{endpoint:search}": ["p(95)<1500"],
  },
};

export default function () {
  group("Landing Page", function () {
    let res = http.get("https://httpbin.org/status/200", {
      tags: { endpoint: "landing", type: "page" },
    });
    check(res, { "Landing page status is 200": (r) => r.status === 200 });
  });

  group("API Search", function () {
    let res = http.get("https://httpbin.org/delay/1", {
      tags: { endpoint: "search", type: "api" },
    });
    check(res, { "Search API responds": (r) => r.status === 200 });
  });
}
