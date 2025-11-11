import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/css-config.js";

export { options };

export default function testCss() {
  const responses = []; // Store responses to return

  group("CSS API", function () {
    let res1 = http.get(
      "https://www.demoblaze.com/node_modules/bootstrap/dist/css/bootstrap.min.css",
      {
        tags: { endpoint: "css", type: "api" },
      }
    );
    responses.push(res1);

    check(res1, {
      "Bootstrap CSS API responds": (r) => r.status === 200 || r.status === 304,
    });

    let res2 = http.get(
      "https://www.demoblaze.com/node_modules/video.js/dist/video-js.min.css",
      {
        tags: { endpoint: "css", type: "api" },
      }
    );
    responses.push(res2);

    check(res2, {
      "Video CSS API responds": (r) => r.status === 200 || r.status === 304,
    });

    let res3 = http.get("https://www.demoblaze.com/css/latofonts.css", {
      tags: { endpoint: "css", type: "api" },
    });
    responses.push(res3);

    check(res3, {
      "Layout fonts CSS API responds": (r) =>
        r.status === 200 || r.status === 304,
    });

    let res4 = http.get("https://www.demoblaze.com/css/latostyle.css", {
      tags: { endpoint: "css", type: "api" },
    });
    responses.push(res4);

    check(res4, {
      "Layout Styles CSS API responds": (r) =>
        r.status === 200 || r.status === 304,
    });
  });

  return responses; // Return responses for RUM integration
}
