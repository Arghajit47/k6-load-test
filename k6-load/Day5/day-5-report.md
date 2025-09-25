# Day 5: Built-in K6 Metrics & Aggregation

## Assignment Overview

This document explores key built-in k6 metrics and their application in performance testing analysis.

## Built-in K6 Metrics Analysis

### 1. http_reqs

- **Definition**: Total number of HTTP requests generated during the test
- **Example Threshold**:

  ```javascript
  thresholds: {
    'http_reqs': ['rate>100']  // Ensure at least 100 requests per second
  }
  ```

- **Performance Insight**: Helps monitor the overall load generated and system throughput capacity

### 2. http_req_duration

- **Definition**: End-to-end time of HTTP requests, from sending to receiving response
- **Example Threshold**:

  ```javascript
  thresholds: {
    'http_req_duration': ['p95<2000']  // 95% of requests should complete within 2 seconds
  }
  ```

- **Performance Insight**: Critical for understanding user experience and system response time

### 3. http_req_failed

- **Definition**: Rate of failed HTTP requests (non-2xx/3xx responses)
- **Example Threshold**:

  ```javascript
  thresholds: {
    'http_req_failed': ['rate<0.01']  // Less than 1% error rate
  }
  ```

- **Performance Insight**: Indicates system stability and error handling under load

### 4. iterations

- **Definition**: Count of complete script iterations executed
- **Example Threshold**:

  ```javascript
  thresholds: {
    'iterations': ['count>1000']  // Ensure test completes at least 1000 iterations
  }
  ```

- **Performance Insight**: Measures test coverage and execution completeness

### 5. data_received

- **Definition**: Total amount of data received from the server
- **Example Threshold**:

  ```javascript
  thresholds: {
    'data_received': ['rate>1000']  // Ensure minimum 1000 bytes per second throughput
  }
  ```

- **Performance Insight**: Helps analyze network performance and bandwidth utilization
