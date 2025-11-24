import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/css-config.js";

export { options };

export default function testJs() {
  const responses = []; // Store responses to return

  group("Jquery JS API", function () {
    let res = http.get(
      "https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Jquery JS API responds": (r) => r.status === 200,
    });
  });

  group("Rocket loader JS API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Rocket loader JS API responds": (r) => r.status === 200,
    });
  });

  group("Script JS API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/js/cjkceal7d8chik1yvvedwg.scripts.js?v=R_FRvhIKfWkEGwb519F8p_5a5oc",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Script JS API responds": (r) => r.status === 200,
    });
  });

  group("Google Tag Manager JS API", function () {
    let res = http.get(
      "https://www.googletagmanager.com/gtag/js?id=G-SCT41TW89V",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Google Tag Manager JS API responds": (r) => r.status === 200,
    });
  });



  return responses; // Return responses for RUM integration
}
