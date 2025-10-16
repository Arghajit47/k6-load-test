# 🧩 Day 12 – Advanced Custom Metrics & Tag-Based Thresholds

## 🎯 Goal

Combine everything from Days 9 – 11: groups, tags, and custom metrics — and tie them together with per-tag thresholds that act as real SLO gates.

## 🧠 Concept Recap

You've already:

- ✅ built custom metrics (Trend, Counter, Rate, Gauge)
- ✅ used groups for user journeys
- ✅ tagged requests for per-endpoint visibility

Now you'll make those metrics tag-aware and threshold-enforced.

## 🧪 Assignment Requirements

### 1️⃣ Implement Two User Journeys (as Groups)

Keep it realistic:

- **Landing Page** → `https://httpbin.org/status/200`
- **Search API** → `https://httpbin.org/delay/2` (adds latency → forces threshold fail)

Each group must:

- Have its own custom Trend metric (e.g. `landing_duration`, `search_duration`)
- Apply unique tags like `{type:'page'}` and `{type:'api'}`

## Output

```bash
administrator@L0222 k6-load % k6 run Day12/custom-groups-tags.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: Day12/custom-groups-tags.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ THRESHOLDS

    login_duration{type:page}
    ✓ 'p(95)<800' p(95)=273.95ms

    response_size{type:api}
    ✗ 'value<200' value=289

    response_size{type:page}
    ✓ 'value<200' value=0

    search_duration{type:api}
    ✗ 'p(95)<1200' p(95)=1.58s

    success_rate{type:api}
    ✓ 'rate>0.95' rate=100.00%

    success_rate{type:page}
    ✓ 'rate>0.95' rate=100.00%


  █ TOTAL RESULTS

    checks_total.......: 2       0.726092/s
    checks_succeeded...: 100.00% 2 out of 2
    checks_failed......: 0.00%   0 out of 2

    ✓ Landing page status is 200
    ✓ Search API responds

    CUSTOM
    login_duration.................: avg=273.95ms min=273.95ms med=273.95ms max=273.95ms p(90)=273.95ms p(95)=273.95ms
      { type:page }................: avg=273.95ms min=273.95ms med=273.95ms max=273.95ms p(90)=273.95ms p(95)=273.95ms
    response_size..................: 289     min=0      max=289
      { type:api }.................: 289     min=289    max=289
      { type:page }................: 0       min=0      max=0
    search_duration................: avg=1.58s    min=1.58s    med=1.58s    max=1.58s    p(90)=1.58s    p(95)=1.58s
      { type:api }.................: avg=1.58s    min=1.58s    med=1.58s    max=1.58s    p(90)=1.58s    p(95)=1.58s
    success_rate...................: 100.00% 2 out of 2
      { type:api }.................: 100.00% 1 out of 1
      { type:page }................: 100.00% 1 out of 1
    total_requests.................: 2       0.726092/s

    HTTP
    http_req_duration..............: avg=931.92ms min=273.95ms med=931.92ms max=1.58s    p(90)=1.45s    p(95)=1.52s
      { expected_response:true }...: avg=931.92ms min=273.95ms med=931.92ms max=1.58s    p(90)=1.45s    p(95)=1.52s
    http_req_failed................: 0.00%   0 out of 2
    http_reqs......................: 2       0.726092/s

    EXECUTION
    iteration_duration.............: avg=2.75s    min=2.75s    med=2.75s    max=2.75s    p(90)=2.75s    p(95)=2.75s
    iterations.....................: 1       0.363046/s
    vus............................: 1       min=1      max=1
    vus_max........................: 1       min=1      max=1

    NETWORK
    data_received..................: 5.1 kB  1.8 kB/s
    data_sent......................: 686 B   249 B/s




running (00m02.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m02.8s/10m0s  1/1 iters, 1 per VU
ERRO[0003] thresholds on metrics 'response_size{type:api}, search_duration{type:api}' have been crossed
```

## 📝 Answers

### 1️⃣ Two User Journeys Implementation

✅ **Successfully implemented two user journeys as groups:**

- **Landing Page Journey**:

  - URL: `https://httpbin.org/status/200`
  - Custom metric: `login_duration` (used for landing page timing)
  - Tags: `{type: 'page'}`
  - Performance: p(95) = 273.95ms (well under the 800ms threshold)

- **Search API Journey**:
  - URL: `https://httpbin.org/delay/2`
  - Custom metric: `search_duration`
  - Tags: `{type: 'api'}`
  - Performance: p(95) = 1.58s (failed the 1200ms threshold as expected)

### 2️⃣ Custom Metrics with Tag-Based Thresholds

✅ **Four custom metrics were implemented:**

1. **login_duration** (Trend): Tracks response times for the landing page

   - Tagged with `{type:page}`
   - Threshold: `p(95)<800` - ✓ PASSED (273.95ms)

2. **search_duration** (Trend): Tracks response times for the search API

   - Tagged with `{type:api}`
   - Threshold: `p(95)<1200` - ✗ FAILED (1.58s)

3. **success_rate** (Rate): Monitors success rate for both endpoints

   - Tagged with `{type:page}` and `{type:api}`
   - Threshold: `rate>0.95` - ✓ PASSED for both (100%)

4. **response_size** (Gauge): Measures response payload size
   - Tagged with `{type:page}` and `{type:api}`
   - Threshold: `value<200`
   - ✓ PASSED for page (0 bytes)
   - ✗ FAILED for api (289 bytes)

### 3️⃣ Threshold Failures Analysis

Two thresholds failed as designed:

1. **search_duration{type:api}**: Failed because the `/delay/2` endpoint introduces a 2-second delay, exceeding the 1200ms (1.2s) threshold

2. **response_size{type:api}**: Failed because the API response (289 bytes) exceeds the 200-byte threshold

### 4️⃣ Key Achievements

- ✅ Combined groups, tags, and custom metrics effectively
- ✅ Implemented per-tag thresholds that act as SLO gates
- ✅ Demonstrated how different endpoints can have different performance requirements
- ✅ Successfully separated metrics by endpoint type (page vs api)
- ✅ All checks passed (100% success rate for both endpoints)
- ✅ Total of 2 requests executed with proper tag-based metric collection

The test successfully demonstrates how to use advanced custom metrics with tag-based thresholds to monitor different parts of an application with different SLO requirements.
