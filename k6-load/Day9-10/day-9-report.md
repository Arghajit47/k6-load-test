# Requirements

## User Journey Groups

- Implement at least two groups to simulate user journeys

### Example Flows

1. Landing Page
   - GET homepage
2. API Search
   - GET search endpoint with query parameters

## Request Tagging

- Tag requests with meaningful metadata
- Example tag format:

  ```json
  {
    "endpoint": "/search",
    "type": "API"
  }
  ```

## Test URLs

Use real testable URLs from httpbin.org ✅

Available test endpoints:

- `https://httpbin.org/get` - Basic GET request
- `https://httpbin.org/status/200` - Returns 200 status
- `https://httpbin.org/delay/1` - 1 second response delay

## Test Execution

- Run performance tests
- Analyze results by:
  - Tags
  - Groups

## Answers

### Implementation Summary

I've implemented a k6 test script that demonstrates both user journey groups and request tagging. The script simulates two key user flows:

1. **Landing Page Group** - Simulates users visiting the homepage
2. **API Search Group** - Simulates users performing search operations

### Groups Implementation

Groups in k6 allow for logical organization of test steps, making results more readable and actionable. Each group represents a distinct user journey:

```javascript
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
```

### Request Tag Implementation

Each request has been tagged with meaningful metadata to enable more granular analysis:

- **Landing Page Request:**

  ```json
  {
    "endpoint": "landing",
    "type": "page"
  }
  ```

- **API Search Request:**

  ```json
  {
    "endpoint": "search",
    "type": "api"
  }
  ```

## Test Results Analysis

### Performance Metrics

TOTAL RESULTS

checks_total.......: 10 0.24999/s
checks_succeeded...: 100.00% 10 out of 10
checks_failed......: 0.00% 0 out of 10

HTTP
http_req_duration..............: avg=8.77s min=336.4ms med=3.79s max=31.01s p(90)=25.32s p(95)=28.17s
{ expected_response:true }...: avg=8.77s min=336.4ms med=3.79s max=31.01s p(90)=25.32s p(95)=28.17s
http_req_failed................: 0.00% 0 out of 10
http_reqs......................: 10 0.24999/s

### Analysis by Group

By implementing groups, we can analyze performance by user journey:

1. **Landing Page Group**

   - All checks passed (100%)
   - Fast response times (status 200 endpoint)
   - Represents critical user entry point

2. **API Search Group**
   - All checks passed (100%)
   - Longer response times (using delay/1 endpoint)
   - The high average response time of 8.77s is primarily driven by this group

### Analysis by Tags

The tagging implementation allows for analyzing performance by:

1. **Endpoint Type**

   - `landing` endpoints vs `search` endpoints
   - This enables pinpointing which functional areas need optimization

2. **Content Type**
   - `page` content vs `api` responses
   - This helps distinguish between user-facing content performance and backend API performance

## Benefits of Groups and Tags

1. **Improved Test Readability**

   - Clearly structured test code with logical user journey organization
   - Self-documenting test structure

2. **Enhanced Results Analysis**

   - Ability to isolate performance issues to specific user flows
   - Can determine if performance issues are isolated to specific endpoint types

3. **Better Decision Making**
   - Targeted optimization efforts based on precise data
   - Ability to prioritize fixes based on user impact

## Test Output

```bash
administrator@L0222 performance-metrics % k6 run k6-load/Day-9/groups-tags.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: k6-load/Day-9/groups-tags.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)



  █ TOTAL RESULTS

    checks_total.......: 10      0.24999/s
    checks_succeeded...: 100.00% 10 out of 10
    checks_failed......: 0.00%   0 out of 10

    ✓ Landing page status is 200
    ✓ Search API responds

    HTTP
    http_req_duration..............: avg=8.77s  min=336.4ms med=3.79s  max=31.01s p(90)=25.32s p(95)=28.17s
      { expected_response:true }...: avg=8.77s  min=336.4ms med=3.79s  max=31.01s p(90)=25.32s p(95)=28.17s
    http_req_failed................: 0.00%  0 out of 10
    http_reqs......................: 10     0.24999/s

    EXECUTION
    iteration_duration.............: avg=18.26s min=5.84s   med=18.39s max=35.96s p(90)=31.59s p(95)=33.78s
    iterations.....................: 5      0.124995/s
    vus............................: 2      min=2       max=5
    vus_max........................: 5      min=5       max=5

    NETWORK
    data_received..................: 25 kB  632 B/s
    data_sent......................: 3.6 kB 91 B/s




running (40.0s), 0/5 VUs, 5 complete and 2 interrupted iterations
default ✓ [======================================] 5 VUs  10s
```
