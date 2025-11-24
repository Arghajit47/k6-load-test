import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/browser-config.js";

// Customize options by adding the threshold for performance score check
export const thresholds = {
  "checks{Landing page html api performance score is above 0.8}": ["rate>=1.0"],
};

// Merge with existing options
const customOptions = JSON.parse(JSON.stringify(options));
if (!customOptions.thresholds) {
  customOptions.thresholds = {};
}
Object.assign(customOptions.thresholds, thresholds);
export { customOptions as options };

const pageSpeedApiKey = "AIzaSyCtENysGuhYQF4_04k8FVyz-Bh4Wqu-l3k";
const url1 = "https://demo.nopcommerce.com/";
const url2 = "https://demo.nopcommerce.com/electronics";

export default function testBrowser() {
  const responses = []; // Store responses to return

  group("Browser Performance testing 1 - PageSpeed API", function () {
    let res = http.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url1}&key=${pageSpeedApiKey}`,
      {
        tags: { endpoint: ["browser", "homePage"], type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Landing page html api status is successful": (r) => r.status === 200,
    });
    check(res, {
      "Landing page html api performance score is above 0.8": (r) =>
        r.json().lighthouseResult.categories.performance.score >= 0.8,
    });
  });

  group("Browser Performance testing 2 - PageSpeed API", function () {
    let res = http.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url2}&key=${pageSpeedApiKey}`,
      {
        tags: { endpoint: ["browser", "electronics"], type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Electronics page html api status is successful": (r) => r.status === 200,
    });
    check(res, {
      "Electronics page html api performance score is above 0.8": (r) =>
        r.json().lighthouseResult.categories.performance.score >= 0.8,
    });
  });

  return responses;
}
