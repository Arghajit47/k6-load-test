import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/css-config.js";

export { options };

export default function testCss() {
  const responses = []; // Store responses to return

  group("CSS API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/css/h3od5j_krejpo2qkbl1kgq.styles.css?v=pFyrQnM3K4l52k9aWYFPuj4sjhQ",
      {
        tags: { endpoint: "css", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "NopCommerce CSS API responds": (r) => r.status === 200,
    });
  });

  return responses; // Return responses for RUM integration
}
