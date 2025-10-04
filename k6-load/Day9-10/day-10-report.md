# Assignment Requirements

## Tag-based Thresholds

Apply thresholds filtered by tags (e.g., only for requests tagged as "type:api" or "type:page").

Example:

```javascript
"http_req_duration{type:api}": ["p(95)<1000"], // API requests must be fast
"http_req_duration{type:page}": ["p(95)<2000"], // Page requests can be slightly slower
```

## Group-specific Validation

Keep your Landing Page and API Search groups from Day 9.

Ensure both groups have clear checks so that failures are visible.

## Run & Fail at least one Threshold

Design the test so that one tag-specific threshold fails (e.g., by using [https://httpbin.org/delay/2](https://httpbin.org/delay/2) for API calls).

## Analysis Section in Report (day-10-report.md)

- Which thresholds passed/failed?
- How does per-tag analysis give more insight than global thresholds?
- Why is this approach better for real-world SLO enforcement?

## Answers

### Test Output

```bash
administrator@L0222 performance-metrics % k6 run k6-load/Day9-10/groups-tags.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: k6-load/Day9-10/groups-tags.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)



  █ THRESHOLDS

    http_req_duration{endpoint:landing}
    ✗ 'p(95)<500' p(95)=1.02s

    http_req_duration{endpoint:search}
    ✗ 'p(95)<1500' p(95)=5.98s

    http_req_failed{endpoint:landing}
    ✓ 'rate<0.1' rate=0.00%

    http_req_failed{endpoint:search}
    ✗ 'rate>0.2' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......: 22      1.599799/s
    checks_succeeded...: 100.00% 22 out of 22
    checks_failed......: 0.00%   0 out of 22

    ✓ Landing page status is 200
    ✓ Search API responds

    HTTP
    http_req_duration..............: avg=2.49s    min=287.34ms med=2.28s    max=6.72s p(90)=5.16s    p(95)=5.24s
      { endpoint:landing }.........: avg=593.22ms min=287.34ms med=556.29ms max=1.05s p(90)=989.28ms p(95)=1.02s
      { endpoint:search }..........: avg=4.4s     min=3.52s    med=4.12s    max=6.72s p(90)=5.24s    p(95)=5.98s
      { expected_response:true }...: avg=2.49s    min=287.34ms med=2.28s    max=6.72s p(90)=5.16s    p(95)=5.24s
    http_req_failed................: 0.00%  0 out of 22
      { endpoint:landing }.........: 0.00%  0 out of 11
      { endpoint:search }..........: 0.00%  0 out of 11
    http_reqs......................: 22     1.599799/s

    EXECUTION
    iteration_duration.............: avg=5.42s    min=3.81s    med=5.8s     max=7.94s p(90)=6.64s    p(95)=7.29s
    iterations.....................: 11     0.7999/s
    vus............................: 2      min=2       max=5
    vus_max........................: 5      min=5       max=5

    NETWORK
    data_received..................: 29 kB  2.1 kB/s
    data_sent......................: 3.9 kB 287 B/s




running (13.8s), 0/5 VUs, 11 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s
ERRO[0014] thresholds on metrics 'http_req_duration{endpoint:landing}, http_req_duration{endpoint:search}, http_req_failed{endpoint:search}' have been crossed
```

### Which thresholds passed/failed?

- http_req_duration{endpoint:landing} failed [✗ 'p(95)<500' p(95)=1.02s]
- http_req_failed{endpoint:landing} passed [✓ 'rate<0.1' rate=0.00%]

- http_req_duration{endpoint:search} failed [✗ 'p(95)<1500' p(95)=5.98s]
- http_req_failed{endpoint:search} failed [✗ 'rate>0.2' rate=0.00%]

### How does per-tag analysis give more insight than global thresholds?

- Per-tag analysis allows us to see which specific requests are failing, helping us to target those areas for optimization.
- Global thresholds, on the other hand, provide a high-level view of the system's performance, but they don't tell us which specific requests are causing the issues.

### Why is this approach better for real-world SLO enforcement?

- This approach is better for real-world SLO enforcement because it allows us to focus on the specific areas that are causing issues.
- By analyzing per-tag thresholds, we can identify which specific requests are failing and take corrective actions.
- Global thresholds, while useful for high-level visibility, don't provide the granularity needed for real-world SLO enforcement.
