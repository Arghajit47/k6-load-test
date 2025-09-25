# Day 2 Assignment: Analyzing Iteration Duration Impact

## Background

In Day 1 testing, we observed normal iteration durations of approximately 1.3s with healthy throughput. Today's test introduced an artificial slowdown that increased iteration duration to 3.5-4.7s.

## Analysis Questions

### Root Cause Analysis

- What caused the iteration duration increase in the latest run?
- How does k6 calculate this metric?

### Impact Assessment

- How did increased iteration duration affect:
  - Total iterations
  - Requests per second (RPS)
  - Latency percentiles (p95)

### Critical Insights

- Why is iteration duration monitoring crucial for detecting client-side issues?
- How can this knowledge improve load test design?

## Deliverables

Please provide your analysis in 2-3 paragraphs or clear bullet points, supported by test result data, in a file named `day-2-report.md`.

## Answer

1. So the root cause of the iteration duration increase is that we added a sleep of 3 seconds in the test script.
2. K6 calculates the iteration duration by measuring the time taken for each complete iteration of the main function. This includes the time taken for the request and any sleep periods specified in the script.
3. In the case of the test we ran today, where we added a sleep of 3 seconds, the iteration duration will be 3.5-4.7s, which is higher than the normal 1.3s.
4. The increased iteration duration can have several implications:

   - Iterations dropped to 152 instead of ~700+.
   - RPS fell to ~1.8/s from ~4.9/s.
   - p95 jumped to 1.7s from ~316ms.
   - **Total iterations**: The number of iterations completed will be lower than expected, as each iteration now takes longer to complete.
   - **Requests per second (RPS)**: RPS will be lower than expected, as the number of requests per second processed by the system decreases.
   - **Latency percentiles (p95)**: p95 latency will be higher than expected, as the majority of requests will take longer to complete.

5. Critical Insight: Monitoring iteration duration is crucial for detecting client-side issues that may affect user experience. By identifying long-running iterations, we can pinpoint performance bottlenecks and optimize our application accordingly.
6. In the case of the test we ran today, where we added a sleep of 3 seconds, we can see that the iteration duration increased from 1.3s to 3.5-4.7s. iteration_duration increased because of test design, not because the system under test failed. You must always distinguish client/test-induced bottlenecks vs server-induced bottlenecks.
