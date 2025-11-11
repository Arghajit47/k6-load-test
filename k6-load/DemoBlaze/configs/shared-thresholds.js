export const sharedThresholds = {
  http_req_failed: ["rate<0.01"], // Less than 1% requests should fail
  http_req_duration: ["p(95)<2000"], // Global duration threshold
};
