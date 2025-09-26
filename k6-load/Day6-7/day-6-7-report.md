# Day 6-7 Assignment (Load Models)

## Overview

Practice implementing load models with stages and options in k6.

## Assignment Requirements

Create three runnable profiles in k6:

1. Spike Test - sudden jump to high load
2. Soak Test - sustained load over long duration
3. Smoke Test - minimal load just to validate functionality

For each profile, provide:

- Script snippet (options block)
- SLOs to enforce with thresholds
- Expected system behavior description

## Deliverables

- Three runnable scripts OR one script with three configurations
- Markdown file (day-6-7-report.md) containing:
  - Implementation rationale
  - Service Level Objectives (SLOs)

## Answers

### Script snippets

#### Smoke Test

```javascript
smoke: [
    { duration: "10s", target: 1 }, // 1 VU for 10 seconds
  ],
```

#### Spike Test

```javascript
spike: [
    { duration: "10s", target: 20 }, // 20 VU for 10 seconds
    { duration: "20s", target: 40 }, // sudden increase to 40 VUs
    { duration: "5s", target: 0 }, // return to 0 VUs
  ],
```

#### Soak Test

```javascript
soak: [
    { duration: "1m", target: 40 }, // maintain 40 VUs for 30 seconds
  ],
```

### Thresholds

```javascript
const thresholdsConfig = {
  smoke: {
    http_req_failed: ["rate<0.01"], // Less than 1% errors
    http_req_duration: ["p(95)<1000"], // 95% < 1 second
    "http_req_duration{status:200}": ["p(95)<800"], // Successful requests only
  },
  spike: {
    http_req_failed: ["rate<0.03"], // Allow up to 3% errors during spike
    http_req_duration: ["p(95)<2000"], // 95% < 2 seconds during stress
    http_reqs: ["count>1000"], // Should make at least 1000 requests
  },
  soak: {
    http_req_failed: ["rate<0.005"], // Very strict: < 0.5% errors
    http_req_duration: ["p(95)<500"], // Consistent performance over time
    http_reqs: ["rate>50"], // Sustained throughput

    // Memory/performance thresholds (if using browser metrics)
    iteration_duration: ["p(95)<2000"], // No performance degradation
  },
};
```

### Expected behaviour

#### Smoke Test behavior

- System should handle 1 VU for 10 seconds without errors
- 95% of requests should complete in under 1 second
- Successful requests should complete in under 800ms

#### Spike Test behavior

- System should handle 20 VU for 10 seconds without errors
- System should handle 40 VU for 20 seconds without errors
- System should return to 0 VU for 5 seconds without errors
- 95% of requests should complete in under 2 seconds
- Total requests should be at least 1000

#### Soak Test behavior

- System should maintain 40 VU for 1 minute without errors
- 95% of requests should complete in under 500ms
- Total requests should be at least 50 per second
- System should not experience performance degradation over time

### Additional Considerations

Our implementation uses a single script file (smoke-soak-spike.js) that can run different load test profiles (smoke, soak, spike) based on command-line variables. This approach offers flexibility while maintaining a clean codebase.

Running Different Test Profiles
We use the TEST_TYPE environment variable to specify which test profile to run:

```bash
# Run a smoke test
k6 run smoke-soak-spike.js

# Run a spike test
k6 run -e TEST_TYPE=spike smoke-soak-spike.js

# Run a soak test
k6 run -e TEST_TYPE=soak smoke-soak-spike.js
```

How CLI Variables Work
The script implements this functionality through these key components:

1.Environment Variable Detection:

```javascript
const testType = __ENV.TEST_TYPE || "smoke";
```

This line reads the TEST_TYPE environment variable passed via CLI, defaulting to "smoke" if none is provided.

2.Configuration Selection:

```javascript
export const options = {
  stages: testConfigs[testType],
  thresholds: thresholdsConfig[testType],
};
```

This dynamically selects the appropriate stages and thresholds configuration based on the test type.

3.Test-Specific Configurations:

Each test type has its own array of stages with appropriate durations and VU targets
Each test type has custom thresholds aligned with its specific SLOs
Benefits of This Approach
Maintainability: Single script with clear separation of configurations
Consistency: Same test logic across all profiles ensures comparable results
CI/CD Integration: Easy to integrate different test profiles in deployment pipelines
Scalability: Simple to add new test profiles by extending configuration objects
This implementation demonstrates how to create a flexible, reusable performance testing framework that can adapt to different testing needs while maintaining consistent test logic across all profiles.
