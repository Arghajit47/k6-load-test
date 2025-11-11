import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/css-config.js";

export { options };

export default function testJs() {
  const responses = []; // Store responses to return

  group("Jquery JS API", function () {
    let res = http.get(
      "https://www.demoblaze.com/node_modules/jquery/dist/jquery.min.js",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Jquery JS API responds": (r) => r.status === 200 || r.status === 304,
    });
  });

  group("Video JS API", function () {
    let res = http.get(
      "https://www.demoblaze.com/node_modules/video.js/dist/video.min.js",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Video JS API responds": (r) => r.status === 200 || r.status === 304,
    });
  });

  group("Video HLS JS API", function () {
    let res = http.get(
      "https://www.demoblaze.com/node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.min.js",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Video HLS JS API responds": (r) => r.status === 200 || r.status === 304,
    });
  });

  group("Tether JS API", function () {
    let res = http.get(
      "https://www.demoblaze.com/node_modules/tether/dist/js/tether.min.js",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Tether JS API responds": (r) => r.status === 200 || r.status === 304,
    });
  });

  group("Bootstrap JS API", function () {
    let res = http.get(
      "https://www.demoblaze.com/node_modules/bootstrap/dist/js/bootstrap.min.js",
      {
        tags: { endpoint: "js", type: "api" },
      }
    );
    responses.push(res);

    check(res, {
      "Bootstrap JS API responds": (r) => r.status === 200 || r.status === 304,
    });
  });

  group("Index JS API", function () {
    let res = http.get("https://www.demoblaze.com/js/index.js", {
      tags: { endpoint: "js", type: "api" },
    });
    responses.push(res);

    check(res, {
      "Index JS API responds": (r) => r.status === 200 || r.status === 304,
    });
  });

  // REMOVE THIS GROUP - blob URLs won't work with HTTP requests
  // group("Blob JS API", function () {
  //   let res = http.get(
  //     "blob:https://www.demoblaze.com/eda83917-11d9-4c9b-900b-b1a6bff3f8c3",
  //     {
  //       tags: { endpoint: "js", type: "api" },
  //     }
  //   );
  //   responses.push(res);
  //
  //   check(res, {
  //     "Blob JS API responds": (r) => r.status === 200 || r.status === 304,
  //   });
  // });

  return responses; // Return responses for RUM integration
}
