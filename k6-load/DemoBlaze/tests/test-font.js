import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/xhr-config.js";

export { options };

export default function testDoc() {
  const responses = []; // Store responses to return

  group("Font API", function () {
    let res = http.get(
      "https://www.demoblaze.com/css/fonts/Lato-Regular.woff2",
      {
        tags: { endpoint: "font", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Landing page font api status is successful": (r) => r.status === 200,
    });
  });

  return responses; // Return responses for RUM integration
}
