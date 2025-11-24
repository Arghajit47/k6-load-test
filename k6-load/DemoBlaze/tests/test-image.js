import http from "k6/http";
import { check, group } from "k6";
import { options } from "../configs/xhr-config.js";

export { options };

export default function testPng() {
  const responses = []; // Store responses to return

  group("Logo png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/logo.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Logo png api status is successful": (r) => r.status === 200,
    });
  });

  group("Electronics_450 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000005_electronics_450.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Electronics_450 jpeg api status is successful": (r) => r.status === 200,
    });
  });

  group("Apparel_450 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000009_apparel_450.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Apparel_450 jpeg api status is successful": (r) => r.status === 200,
    });
  });

  group("Digital-Downloads_450 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000013_digital-downloads_450.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Digital-Downloads_450 jpeg api status is successful": (r) =>
        r.status === 200,
    });
  });

  group("Build-Your-Own-Computer_415 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000020_build-your-own-computer_415.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Build-Your-Own-Computer_415 jpeg api status is successful": (r) =>
        r.status === 200,
    });
  });

  group("Apple-MacBook-Pro_415 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000024_apple-macbook-pro_415.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Apple-MacBook-Pro_415 jpeg api status is successful": (r) =>
        r.status === 200,
    });
  });

  group("HTC-Smartphone_415 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000041_htc-smartphone_415.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "HTC-Smartphone_415 jpeg api status is successful": (r) =>
        r.status === 200,
    });
  });

  group("25-Virtual-Gift-Card_415 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000073_25-virtual-gift-card_415.jpeg",
      {
        tags: { endpoint: "jpeg", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "25-Virtual-Gift-Card_415 jpeg api status is successful": (r) =>
        r.status === 200,
    });
  });

  group("Banner_1 webp API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000079_banner_1.webp",
      {
        tags: { endpoint: "webp", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Banner_1 webp api status is successful": (r) => r.status === 200,
    });
  });

  group("Banner_2 jpeg API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/images/thumbs/0000080_banner_2.webp",
      {
        tags: { endpoint: "webp", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Banner_2 jpeg api status is successful": (r) => r.status === 200,
    });
  });

  group("Shopping-Bag png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/shopping-bag.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Shopping-Bag png api status is successful": (r) => r.status === 200,
    });
  });

  group("Menu-icon png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/menu-icon.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Menu-icon png api status is successful": (r) => r.status === 200,
    });
  });

  group("Toggle-black png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/toggle-black.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Toggle-black png api status is successful": (r) => r.status === 200,
    });
  });

  group("Rating-1 png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/rating1.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Rating-1 png api status is successful": (r) => r.status === 200,
    });
  });

  group("Rating-2 png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/rating2.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Rating-2 png api status is successful": (r) => r.status === 200,
    });
  });

  group("Compare-button png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/compare-button.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Compare-button png api status is successful": (r) => r.status === 200,
    });
  });

  group("Wishlist-button png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/wishlist-button.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Wishlist-button png api status is successful": (r) => r.status === 200,
    });
  });

  group("Toggle-white png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/toggle-white.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Toggle-white png api status is successful": (r) => r.status === 200,
    });
  });

  group("Social-sprite png API", function () {
    let res = http.get(
      "https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/social-sprite.png",
      {
        tags: { endpoint: "png", type: "page" },
      }
    );
    responses.push(res);

    check(res, {
      "Social-sprite png api status is successful": (r) => r.status === 200,
    });
  });
  return responses; // Return responses for RUM integration
}
