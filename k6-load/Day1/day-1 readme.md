# K6 Summary Output Fields - Annotated Explanation

## Basic Metrics

### http_reqs (HTTP Requests)

**What**: Total number of HTTP requests made during the test

**Practice**: Measures overall throughput. High numbers indicate good capacity, but must be analyzed with error rates and response times.

### http_req_duration (HTTP Request Duration)

**What**: Time taken for requests to complete (in milliseconds)

**Practice**: Key performance indicator. Broken down into:

- **avg**: Average response time
- **min/max**: Best/worst case performance
- **p(90), p(95), p(99)**: Percentiles showing performance for most users

### http_req_failed (HTTP Request Failures)

**What**: Percentage or count of failed requests

**Practice**: Reliability metric. Should be near 0% for healthy systems.

## Load Metrics

### vus (Virtual Users)

**What**: Number of concurrent users simulated

**Practice**: Shows how the load scaled during the test. In your script: 1 VU → 10 VUs → 0 VUs.

### vus_max (Maximum Virtual Users)

**What**: Highest number of VUs reached

**Practice**: Confirms the test reached expected load levels.

### iterations (Iterations)

**What**: Total number of times the main function executed

**Practice**: Combined with duration, shows how "busy" each VU was.

## System Metrics

### data_received & data_sent

**What**: Amount of data transferred (in bytes)

**Practice**: Helps identify bandwidth requirements and potential bottlenecks.

### iteration_duration

**What**: Time taken for one complete iteration (request + sleep)

**Practice**: Helps calculate maximum throughput per VU.

## Thresholds & Checks

### checks

**What**: Percentage of passed validation checks

**Practice**: Functional correctness metric. 100% = all validations passed.

## Expected Output

```bash
administrator@L0222 performance-metrics % k6 run k6-load/Day1/my-first-test.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: k6-load/Day1/my-first-test.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 1m50s max duration (incl. graceful stop):
              * default: Up to 10 looping VUs for 1m20s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)



  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<500' p(95)=316.75ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......: 395     4.912396/s
    checks_succeeded...: 100.00% 395 out of 395
    checks_failed......: 0.00%   0 out of 395

    ✓ status is 200

    HTTP
    http_req_duration..............: avg=302.44ms min=293.96ms med=301.48ms max=325.15ms p(90)=315.81ms p(95)=316.75ms
      { expected_response:true }...: avg=302.44ms min=293.96ms med=301.48ms max=325.15ms p(90)=315.81ms p(95)=316.75ms
    http_req_failed................: 0.00%  0 out of 395
    http_reqs......................: 395    4.912396/s

    EXECUTION
    iteration_duration.............: avg=1.32s    min=1.29s    med=1.3s     max=2.32s    p(90)=1.31s    p(95)=1.31s
    iterations.....................: 395    4.912396/s
    vus............................: 1      min=1        max=10
    vus_max........................: 10     min=10       max=10

    NETWORK
    data_received..................: 1.2 MB 15 kB/s
    data_sent......................: 26 kB  327 B/s




running (1m20.4s), 00/10 VUs, 395 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  1m20s
```
