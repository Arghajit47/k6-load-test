import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/xhr-config.js";

export { options };

export default function testXhrFetch() {
  const responses = []; // Store responses to return

  group("XHR/Fetch API", function () {
    let res1 = http.post("https://demo.nopcommerce.com/cdn-cgi/rum?", {
      tags: { endpoint: "xhr-fetch", type: "api" },
      body: JSON.stringify({
        memory: {
          totalJSHeapSize: 41239022,
          usedJSHeapSize: 35248638,
          jsHeapSizeLimit: 4294705152,
        },
        resources: [],
        referrer: "",
        eventType: 1,
        firstPaint: 660,
        firstContentfulPaint: 660,
        startTime: 1763709299440.1,
        versions: {
          fl: "2024.11.0",
          js: "2024.6.1",
          timings: 2,
        },
        pageloadId: "3bcbf920-dae3-464d-a646-fff7959fae36",
        location: "https://demo.nopcommerce.com/",
        nt: "reload",
        timingsV2: {
          unloadEventStart: 572.1000000238419,
          unloadEventEnd: 572.1000000238419,
          domInteractive: 613.6000000238419,
          domContentLoadedEventStart: 618.8999999761581,
          domContentLoadedEventEnd: 619.2000000476837,
          domComplete: 750.5,
          loadEventStart: 750.5,
          loadEventEnd: 750.8999999761581,
          type: "reload",
          redirectCount: 0,
          criticalCHRestart: 0,
          activationStart: 0,
          initiatorType: "navigation",
          nextHopProtocol: "h3",
          deliveryType: "",
          workerStart: 0,
          redirectStart: 0,
          redirectEnd: 0,
          fetchStart: 4.700000047683716,
          domainLookupStart: 4.700000047683716,
          domainLookupEnd: 4.700000047683716,
          connectStart: 4.700000047683716,
          connectEnd: 4.700000047683716,
          secureConnectionStart: 4.700000047683716,
          requestStart: 8.200000047683716,
          responseStart: 551.7000000476837,
          responseEnd: 553.7000000476837,
          transferSize: 7851,
          encodedBodySize: 7551,
          decodedBodySize: 34119,
          responseStatus: 200,
          finalResponseHeadersStart: 551.7000000476837,
          firstInterimResponseStart: 0,
          workerRouterEvaluationStart: 0,
          workerCacheLookupStart: 0,
          workerMatchedSourceType: "",
          workerFinalSourceType: "",
          renderBlockingStatus: "non-blocking",
          name: "https://demo.nopcommerce.com/",
          entryType: "navigation",
          startTime: 0,
          duration: 750.8999999761581,
        },
        dt: "",
        siteToken: "c9968ab4bf7342ef8c643d4835a610ea",
        st: 2,
      }),
    });
    responses.push(res1);

    check(res1, {
      "Fetch/XHR rum api status is successful": (r) => r.status === 200,
    });
  });

  return responses; // Return responses for RUM integration
}
