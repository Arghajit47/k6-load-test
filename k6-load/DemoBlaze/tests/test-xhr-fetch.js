import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/xhr-config.js";

export { options };

export default function testXhrFetch() {
  const responses = []; // Store responses to return

  group("XHR/Fetch API", function () {
    let res1 = http.get("https://api.demoblaze.com/entries", {
      tags: { endpoint: "xhr-fetch", type: "api" },
    });
    responses.push(res1);

    check(res1, {
      "Fetch/XHR api status is successful": (r) => r.status === 200,
    });

    let res2 = http.get("https://www.demoblaze.com/config.json", {
      tags: { endpoint: "xhr-fetch", type: "api" },
    });
    responses.push(res2);

    check(res2, {
      "Fetch/XHR api status is successful": (r) => r.status === 200,
    });
  });

  return responses; // Return responses for RUM integration
}
