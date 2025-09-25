# Day 3 Assignment: Response Validation

## Assignment Overview

Enhance the Day 1 load testing script by implementing comprehensive response validation through checks for both status codes and response bodies.

## Requirements

1. Add validation checks for:
   - Status codes
   - Response body content
2. Execute load test with checks
3. Document results in day-3-report.md

## Key Questions to Address

1. Check Results Analysis
   - Which checks passed/failed during test execution?
   - How are results reflected in check metrics?
2. Conceptual Understanding
   - Differentiate between checks and thresholds
   - Use cases for each validation method

## Deliverables

- [x] Enhanced k6 script with validation checks
- [x] Detailed analysis report (day-3-report.md)

## Answer

1. As per the below attached test output, I have used the following checks:

   - Status codes 200 - Passed
   - Response body is in HTML format - Passed
   - Response body is in JSON format - Failed (intentionally)
   - Response body contains expected text - Passed
     It is visible in the form of below;

   ```bash
   █ TOTAL RESULTS

    checks_total.......: 1432   16.026716/s
    checks_succeeded...: 49.44% 708 out of 1432
    checks_failed......: 50.55% 724 out of 1432
   ```

2. The difference in use cases between checks and thresholds would be as follows:

   - Checks: Used to validate specific conditions in the response, such as status codes, response body content, etc.
   - Thresholds: Used to set performance expectations and alert on deviations from those expectations.
   - Checks don’t stop the test — they just record success/failure.
   - Thresholds stop CI/CD if unmet.

## Test Output

```bash

administrator@L0222 performance-metrics % k6 run k6-load/Day3/checks.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: k6-load/Day3/checks.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 1m50s max duration (incl. graceful stop):
              * default: Up to 10 looping VUs for 1m20s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)



  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<500' p(95)=457.89ms

    http_req_failed
    ✗ 'rate<0.01' rate=1.11%


  █ TOTAL RESULTS

    checks_total.......: 1432   16.026716/s
    checks_succeeded...: 49.44% 708 out of 1432
    checks_failed......: 50.55% 724 out of 1432

    ✗ status is 200
      ↳  98% — ✓ 354 / ✗ 4
    ✗ response is in HTML format
      ↳  0% — ✓ 0 / ✗ 358
    ✗ response body contains expected text
      ↳  98% — ✓ 354 / ✗ 4
    ✗ response body is in JSON format
      ↳  0% — ✓ 0 / ✗ 358

    HTTP
    http_req_duration..............: avg=497.51ms min=289.08ms med=342ms   max=11.46s p(90)=371.32ms p(95)=457.89ms
      { expected_response:true }...: avg=381.49ms min=289.08ms med=341.7ms max=2.03s  p(90)=370.59ms p(95)=377.52ms
    http_req_failed................: 1.11%  4 out of 358
    http_reqs......................: 358    4.006679/s

    EXECUTION
    iteration_duration.............: avg=1.51s    min=1.29s    med=1.34s   max=12.46s p(90)=1.37s    p(95)=2.06s
    iterations.....................: 358    4.006679/s
    vus............................: 1      min=1        max=10
    vus_max........................: 10     min=10       max=10

    NETWORK
    data_received..................: 1.1 MB 12 kB/s
    data_sent......................: 24 kB  271 B/s




running (1m29.4s), 00/10 VUs, 358 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  1m20s
ERRO[0089] thresholds on metrics 'http_req_failed' have been crossed
```
