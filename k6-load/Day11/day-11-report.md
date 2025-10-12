# Day 11: Custom Metrics Implementation Report

## Assignment Requirements

### 1. Implement Custom Metrics

Create at least three custom metrics in your script:

| Metric Type | Purpose                                               |
| ----------- | ----------------------------------------------------- |
| Trend       | Track response time for a specific endpoint           |
| Counter     | Count total number of requests                        |
| Rate        | Track success vs failure ratio                        |
| Gauge       | Capture the last observed value (e.g., response size) |

## Implementation Details

### Custom Metrics Implemented

- **Trend: `login_duration`** – Tracks the response time for login endpoint
- **Counter: `total_requests`** – Counts the total number of requests made
- **Rate: `success_rate`** – Tracks the ratio of successful requests
- **Gauge: `response_size`** – Measures the size of HTTP responses

### Test Configuration

```javascript
export const options = {
  thresholds: {
    login_duration: ["p(95)<1000"],
    success_rate: ["rate>0.95"],
    response_size: ["value<200"],
  },
};
```

## Test Results

### Console Output

```text
█ THRESHOLDS
login_duration
✗ 'p(95)<1000' p(95)=1758.553

response_size
✗ 'value<200' value=289

success_rate
✓ 'rate>0.95' rate=100.00%
```

### Threshold Results Summary

| Threshold      | Target      | Actual    | Status  |
| -------------- | ----------- | --------- | ------- |
| login_duration | p(95) < 1s  | 1758.55ms | ❌ FAIL |
| response_size  | < 200 bytes | 289 bytes | ❌ FAIL |
| success_rate   | > 95%       | 100%      | ✅ PASS |

## Analysis of Metric Trends

### 1. Login Duration Performance

- **Result**: The 95th percentile response time (1758.55ms) significantly exceeded our target of 1000ms
- **Root Cause**: The intentional delay in the test endpoint (`httpbin.org/delay/1`) adds a 1-second delay to each request
- **Impact**: In a production scenario, this would indicate a performance bottleneck requiring immediate attention

### 2. Response Size Monitoring

- **Result**: Response size (289 bytes) exceeded our threshold of 200 bytes
- **Analysis**: The httpbin.org/delay endpoint returns a JSON response with metadata, resulting in a larger payload
- **Consideration**: The actual size is still reasonable for typical HTTP responses; threshold may need adjustment

### 3. Success Rate Achievement

- **Result**: Perfect 100% success rate, exceeding our 95% target
- **Performance**: All HTTP requests completed successfully without any failures
- **Reliability**: Demonstrates stable endpoint behavior during the test period

## Additional Performance Metrics

- **Total Requests**: 1 request executed
- **Average Iteration Duration**: 2.55 seconds
- **Data Transferred**:
  - Received: 4.9 KB
  - Sent: 634 B

## Recommendations

### 1. Improve Test Coverage

- Increase test duration from single iteration to at least 30 seconds
- Add multiple virtual users (VUs) to simulate concurrent load
- Include different test scenarios (smoke, load, stress)

### 2. Adjust Thresholds

- Review login duration threshold considering the 1-second built-in delay
- Set response size threshold based on actual expected payload (e.g., 300-500 bytes)
- Add additional thresholds for error rate and request count

### 3. Enhance Test Script

- Add multiple endpoints to test different parts of the application
- Implement proper login flow instead of using delay endpoint
- Include authentication tokens and session handling

### 4. Production Readiness

- Use environment-specific endpoints instead of httpbin.org
- Implement data correlation for realistic user journeys
- Add custom error handling and retry logic

## Conclusion

The custom metrics implementation successfully demonstrates the four metric types (Trend, Counter, Rate, Gauge) with appropriate thresholds. While two thresholds failed, this was expected given the test endpoint's characteristics. The 100% success rate confirms reliable test execution. For production use, the recommendations above should be implemented to create more comprehensive and realistic load tests.

## Output

```bash
administrator@L0222 Day11 % k6 run custom-trends.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: custom-trends.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ THRESHOLDS

    login_duration
    ✗ 'p(95)<1000' p(95)=1758.553

    response_size
    ✗ 'value<200' value=289

    success_rate
    ✓ 'rate>0.95' rate=100.00%


  █ TOTAL RESULTS

    checks_total.......: 1       0.390893/s
    checks_succeeded...: 100.00% 1 out of 1
    checks_failed......: 0.00%   0 out of 1

    ✓ status is 200

    CUSTOM
    login_duration.................: avg=1758.553 min=1758.553 med=1758.553 max=1758.553 p(90)=1758.553 p(95)=1758.553
    response_size..................: 289     min=289    max=289
    success_rate...................: 100.00% 1 out of 1
    total_requests.................: 1       0.390893/s

    HTTP
    http_req_duration..............: avg=1.75s    min=1.75s    med=1.75s    max=1.75s    p(90)=1.75s    p(95)=1.75s
      { expected_response:true }...: avg=1.75s    min=1.75s    med=1.75s    max=1.75s    p(90)=1.75s    p(95)=1.75s
    http_req_failed................: 0.00%   0 out of 1
    http_reqs......................: 1       0.390893/s

    EXECUTION
    iteration_duration.............: avg=2.55s    min=2.55s    med=2.55s    max=2.55s    p(90)=2.55s    p(95)=2.55s
    iterations.....................: 1       0.390893/s
    vus............................: 1       min=1      max=1
    vus_max........................: 1       min=1      max=1

    NETWORK
    data_received..................: 4.9 kB  1.9 kB/s
    data_sent......................: 634 B   248 B/s




running (00m02.6s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m02.6s/10m0s  1/1 iters, 1 per VU
ERRO[0003] thresholds on metrics 'login_duration, response_size' have been crossed
```
