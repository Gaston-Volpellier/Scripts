try {
  let timeout;
  const productView = parseInt("${Threshold View}");
  const productPurchase = parseInt("${Threshold Puchase}");
  const flagPurchaseText = "${Flag Text Purchase}";
  const flagViewText = "${Flag Text View}";
  const purchaseIcon = "${Purchase Icon}";
  const trendingIcon = "${View Icon}";
  const flagTemplate = "${Template}";

  let msgFlag = "";
  let iconFlag = "";
  let flagCtn = null;
  let iconCtn = null;
  let imgCtn = null;

  let dyCtnMsgSocial = null;
  let dyMsgSocial = null;

  const timeFrames = "twoDays";

  // GLOBALS
  const tagName = "${dyTagName}";
  const experienceName = "${dyExperienceName}";
  const variationName = "${dyVariationName}";

  let sendGa = function (version) {
    if (typeof ga !== "undefined" && typeof window.ga.getAll === "function") {
      var tracker = window.ga.getAll()[0];
      tracker.send(
        "event",
        "DY Smart Action",
        tagName,
        experienceName + " (" + variationName + ") - version:" + version,
        { nonInteraction: true }
      );
    }
  };

  let dyApi = function (cb) {
    let ean; // = utag_data.product.sku;
    const eanCtn = document.querySelector(".js-pdp-section[data-ean]");
    if (eanCtn) {
      ean = eanCtn.getAttribute("data-ean");
    }
    // https://support.dynamicyield.com/hc/en-us/articles/360007233457-Social-Proof-Data-Client-Side-API#enabling-the-api-0-1
    DY.ServerUtil.getProductsData(
      [ean],
      [timeFrames],
      null,
      false,
      function (err, res) {
        if (res !== null) {
          cb(err, res, ean);
        }
      }
    );
  };

  const displayFlag = function (flagTemplate, flagCtn) {
    switch (flagTemplate) {
      case "flag":
        let pdpFlagCtnChild;
        const pdpFlagCtn = document.querySelector(
          ".js-pdp-section .js-pdp-flags"
        );
        flagCtn.classList.add(
          "l-inline-block",
          "fs--xsmall",
          "l-hmargin--small"
        );
        flagCtn.setAttribute(
          "style",
          "border: 0.1rem solid #105A33; background: transparent; color: #105A33;"
        );
        if (pdpFlagCtn) {
          pdpFlagCtnChild = pdpFlagCtn.firstElementChild;
          if (pdpFlagCtnChild) {
            pdpFlagCtnChild.appendChild(flagCtn);
          } else {
            pdpFlagCtnChild = document.createElement("div");
            pdpFlagCtnChild.setAttribute(
              "class",
              "fs--xsmall text-white padding-m-1"
            );
            pdpFlagCtn.appendChild(pdpFlagCtnChild);
            pdpFlagCtnChild.appendChild(flagCtn);
          }
        }
        break;
      case "flag_slider":
        const gallery = document.querySelector(
          ".js-pdp-section .js-pdp-gallery"
        );

        if (gallery) {
          flagCtn.setAttribute(
            "style",
            "background-color: rgba(255,255,255,.5); border: solid 0.1rem #D7F0E3; border-radius: 3.6rem; height: 3.6rem; color: #545454;"
          );
          flagCtn.classList.add(
            "item-flag--large",
            "flex",
            "flex--align-center",
            "dy-flag-slider"
          );
          gallery.appendChild(flagCtn);
        }
        break;
    }
  };

  const createFlag = function (ean, res) {
    const productData = res[ean].productInterest;

    flagCtn = document.querySelector(".dy-flag-ctn");
    if (flagCtn) {
      flagCtn.remove();
    }

    msgFlag = document.createElement("span");
    msgFlag.setAttribute("class", "dy-flag-txt");

    if (productData.purchase[timeFrames] >= productPurchase) {
      msgFlag.innerHTML = flagPurchaseText;
      iconFlag = purchaseIcon;
      sendGa("views");
    } else {
      if (productData.view[timeFrames] >= productView) {
        msgFlag.innerHTML = flagViewText;
        iconFlag = trendingIcon;
        sendGa("views");
      } else {
        sendGa("none");
        return;
      }
    }

    flagCtn = document.createElement("div");
    flagCtn.setAttribute("class", "dy-flag-ctn item-flag fs--small");
    if (flagTemplate === "flag_slider") {
      msgFlag.classList.add("dy-flag_slider-txt");
      imgCtn = document.createElement("img");
      imgCtn.setAttribute("src", iconFlag);
      imgCtn.setAttribute("width", "24");
      imgCtn.setAttribute("height", "24");
      flagCtn.appendChild(imgCtn);
    }
    flagCtn.appendChild(msgFlag);
    displayFlag(flagTemplate, flagCtn);
  };

  const timeoutFn = function (current, max, cb) {
    current++;
    clearTimeout(timeout);
    if (typeof DY !== "undefined" && typeof DY.ServerUtil === "object") {
      // if (window.utag_data.product.sku) {
      dyApi(cb);
      // }
    } else {
      if (current < max) {
        timeout = setTimeout(timeoutFn, 500, current, max, cb);
      } else {
        cb(null, null);
      }
    }
  };

  const mutationCallback = function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.attributeName === "data-ref-col") {
        dyApi(function (err, res, ean) {
          if (flagTemplate === "flag" || flagTemplate === "flag_slider") {
            createFlag(ean, res);
          }
        });
        break;
      }
    }
  };

  const colorsObserver = function () {
    const ctn = document.querySelector(".js-pdp-section");

    if (ctn) {
      const config = { attributeFilter: ["data-ref-col"] };
      const observer = new MutationObserver(mutationCallback);
      observer.observe(ctn, config);
    }
  };

  timeoutFn(0, 20, (err, res, ean) => {
    if (res !== null) {
      createFlag(ean, res);
      colorsObserver();
    }
  });
} catch (e) {
  console.log("DY | ", e);
}
