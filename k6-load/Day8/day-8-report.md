# ⚔️ Day 8 Assignment (Scenarios & Executors)

## Overview

Move beyond simple stages. Implement at least two executors in one script:

## Requirements

- Example: ramping-vus + constant-arrival-rate

## Deliverables

1. Script showing both executors in use
2. day-8-report.md explaining:
   - Why you chose those executors
   - What traffic pattern each one simulates
   - When you'd use them in real-world testing

## Answers

### Chosen Executors

I chose to implement two executors in the load testing script:

1. **ramping-vus**: A VU-based executor that incrementally scales user load in defined stages
2. **constant-arrival-rate**: A rate-based executor that maintains a fixed number of requests per second

### Implementation Details

#### ramping-vus Executor

```javascript
ramp_phase: {
  executor: "ramping-vus",
  startVUs: 0,
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 40 },
    { duration: "10s", target: 100 },
  ],
  gracefulStop: "5s",
}
```

#### constant-arrival-rate Executor

```javascript
constant_phase: {
  executor: "constant-arrival-rate",
  rate: 50,
  timeUnit: "1s",
  duration: "1m",
  preAllocatedVUs: 20,
  maxVUs: 100,
  gracefulStop: "5s",
  startTime: "35s", // Start after ramp up phase
}
```

### Traffic Patterns Simulated

#### ramping-vus Traffic Pattern

The ramping-vus executor simulates a gradual increase in concurrent users over time. In our implementation:

1. Start with 0 VUs
2. Ramp up to 10 VUs over 10 seconds
3. Continue ramping to 40 VUs over the next 10 seconds
4. Finally reach 100 VUs by the 30-second mark

This pattern creates a steadily increasing load where the number of concurrent users grows in a controlled manner. The pattern is primarily focused on testing how the system handles an increasing number of concurrent connections.

#### constant-arrival-rate Traffic Pattern

The constant-arrival-rate executor maintains a consistent request rate regardless of response times. In our implementation:

1. Starts after the ramp phase (at 35 seconds)
2. Maintains exactly 50 requests per second
3. Runs for 1 minute
4. Allocates between 20-100 VUs as needed to maintain the request rate

This pattern creates a predictable, steady load focused on throughput rather than concurrent users. It simulates real-world traffic patterns where requests arrive at a consistent rate regardless of how quickly the server responds.

### Real-world Applications

#### When to Use ramping-vus

1. **Capacity Planning**: Determine at what user load your system starts to degrade
2. **Stress Testing**: Find breaking points by gradually increasing load until failures occur
3. **Scaling Verification**: Ensure auto-scaling mechanisms activate correctly under increasing load
4. **Performance Baseline**: Establish response time patterns across different concurrent user levels
5. **Pre-launch Verification**: Test how a new application handles growing user adoption

#### When to Use constant-arrival-rate

1. **SLA Verification**: Test if your system meets service level agreements under consistent load
2. **Production Simulation**: Accurately mirror real-world traffic patterns with fixed arrival rates
3. **Resource Optimization**: Determine optimal server configurations for handling specific throughput requirements
4. **Queue Testing**: Evaluate how message queues or task processors handle steady influx of work
5. **Backend Service Validation**: Test API endpoints that need to maintain consistent performance regardless of request volume

### Test Results Analysis

From the test execution output:

- **Total Requests**: 6,082 requests processed over ~95 seconds
- **Request Rate**: 63.81 requests/second average across both phases
- **Response Times**:

  - Average: 302.96ms
  - Minimum: 281.31ms
  - Median: 298.52ms
  - Maximum: 2.09s
  - p95: 311.44ms

- **Checks**:

  - 99.90% of status checks succeeded (12,152 out of 12,164)
  - 0.09% of performance checks failed (12 out of 12,164)

- **HTTP Metrics**:
  - 0.00% request failure rate
  - 18 MB data received (~186 kB/s)

The test results show that the system generally handled the load well, with consistent response times for most requests. The few performance check failures (12 instances where response time exceeded 1000ms) occurred during peak load conditions, indicating some performance degradation under stress but not catastrophic failure.
