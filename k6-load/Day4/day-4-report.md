# Day 4: Thresholds Implementation and Analysis

## Assignment

Update the script to include thresholds on at least:

1. `http_req_failed` (failure rate)
2. `http_req_duration` (95th percentile)
3. One check-based custom threshold (e.g., % of passed checks > 95%)

Requirements:

- Run the test so that at least one threshold fails
- Document which thresholds passed/failed
- Explain how failing threshold affects exit code and CI/CD usage
- Explain why thresholds are more suitable than checks for enforcing SLOs

## Answers

### Implemented Thresholds and Results

1. **HTTP Request Duration (95th percentile)**

   - ✓ PASSED: `http_req_duration p(95)<500`
   - Actual: p(95) = 328.96ms
   - Analysis: The majority of requests performed well within acceptable limits, with 95% completing under 329ms.

2. **HTTP Request Failure Rate**

   - ✓ PASSED: `http_req_failed rate<0.01`
   - Actual: rate = 0.00%
   - Analysis: Perfect reliability with no failed requests, indicating stable service availability.

3. **Check-based Threshold**

   - ✓ PASSED: `checks rate>0.95`
   - Actual: rate = 100.00%
   - Analysis: All functional checks passed, confirming correct service behavior.

4. **Custom Response Time Metrics**
   - ✗ FAILED: `response_time_trend avg < 200`
     - Actual: avg = 333.30ms
     - Analysis: Failed due to server's baseline response time (~333ms), suggesting our threshold might be too aggressive.
   - ✗ FAILED: `response_time_trend p(99) < 1000`
     - Actual: p(99) = 1056.8ms
     - Analysis: While most requests perform well, the p99 threshold reveals occasional performance spikes that need investigation.

### Performance Analysis

1. **Response Time Distribution**

   - Average response time: 314.66ms
   - Median (p50): 311.38ms
   - p90: 322.09ms
   - p95: 328.96ms
   - p99: 1056.8ms

   The tight clustering of average, median, and p90/p95 metrics (all within ~17ms of each other) indicates very stable performance for the majority of requests. However, the significant jump at p99 (1056.8ms) suggests occasional outliers that warrant investigation.

2. **Load Characteristics**
   - Total requests: 391
   - Request rate: 4.81 requests/second
   - Test duration: 1m21.3s
   - VUs: 1-10 (scaled according to stages)

### Impact on Exit Code and CI/CD

When thresholds fail:

1. k6 exits with a non-zero code and outputs an error message:

   ```bash
   ERRO[0082] thresholds on metrics 'response_time_trend' have been crossed
   ```

2. This non-zero exit code triggers a CI/CD pipeline failure
3. The failure prevents deployment, acting as a quality gate

### Why Thresholds are Better than Checks for SLOs

1. **Aggregated Metrics**: Thresholds work with aggregated data over the entire test duration, providing a comprehensive view of system performance rather than individual request results.

2. **Statistical Analysis**: Thresholds can enforce percentile-based requirements (p95, p99) which are common in SLOs and better represent real-world performance distribution.

3. **Automated Pipeline Control**: They automatically fail the CI/CD pipeline when breached, ensuring quality gates are enforced systematically.

4. **Flexible Metric Types**: Support various metric types (counters, rates, trends, gauges) allowing for diverse SLO definitions.

## Test Output

```bash
administrator@L0222 performance-metrics % k6 run k6-load/Day4/thresholds.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: k6-load/Day4/thresholds.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 1m50s max duration (incl. graceful stop):
              * default: Up to 10 looping VUs for 1m20s over 4 stages (gracefulRampDown: 30s, gracefulStop: 30s)



  █ THRESHOLDS

    active_users
    ✓ 'value < 50' value=1

    checks
    ✓ 'rate>0.95' rate=100.00%

    error_count
    ✓ 'count < 10' count=0

    http_req_duration
    ✓ 'p(95)<500' p(95)=328.96ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%

    response_time_trend
    ✗ 'avg < 200' avg=333.299233
    ✗ 'p(99) < 1000' p(99)=1056.8

    success_rate
    ✓ 'rate > 0.95' rate=100.00%


  █ TOTAL RESULTS

    checks_total.......: 391     4.808492/s
    checks_succeeded...: 100.00% 391 out of 391
    checks_failed......: 0.00%   0 out of 391

    ✓ status is 200

    CUSTOM
    active_users...................: 1       min=1          max=10
    error_count....................: 0       0/s
    response_time_trend............: avg=333.299233 min=295     med=312      max=1382    p(90)=324      p(95)=353
    success_rate...................: 100.00% 391 out of 391

    HTTP
    http_req_duration..............: avg=314.66ms   min=295.7ms med=311.38ms max=594.6ms p(90)=322.09ms p(95)=328.96ms
      { expected_response:true }...: avg=314.66ms   min=295.7ms med=311.38ms max=594.6ms p(90)=322.09ms p(95)=328.96ms
    http_req_failed................: 0.00%   0 out of 391
    http_reqs......................: 391     4.808492/s

    EXECUTION
    iteration_duration.............: avg=1.33s      min=1.29s   med=1.31s    max=2.38s   p(90)=1.32s    p(95)=1.35s
    iterations.....................: 391     4.808492/s
    vus............................: 1       min=1          max=10
    vus_max........................: 10      min=10         max=10

    NETWORK
    data_received..................: 1.2 MB  14 kB/s
    data_sent......................: 26 kB   321 B/s




running (1m21.3s), 00/10 VUs, 391 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  1m20s
ERRO[0082] thresholds on metrics 'response_time_trend' have been crossed
```
