// This is the chatbot that opens when it exists the cookie signaling that the bot has been oponed already

// https://rantz.net/tools/stringify/index.php
/*const _api = {
  "fr":{
    "scope1":"https://api.eu.heyday.ai/v130/0017414526/0724868275/fr/setupchat.js",
    "scope2":"https://api.eu.heyday.ai/v130/0017414526/0724868275/fr/setupchat.js"
  },
  "us":{
    "scope1":"https://api.eu.heyday.ai/v130/6407788685/9455540576/en/setupchat.js"
    
  },
  "gb":{
    "scope1":"https://api.eu.heyday.ai/v130/9250843058/3945472610/en/setupchat.js"
  },
  "es":{
    "scope1":"https://api.eu.heyday.ai/v130/1068942742/0087086033/es/setupchat.js"
  },
  "de":{
    "scope1":"https://api.eu.heyday.ai/v130/0926335300/3699691995/de/setupchat.js"
  }
};*/

/* const scope2Message = {
    fr:{
      "message": "Besoin des conseils d\'un expert produit ?",
    },
    us:{
      "message": "",
    },
    gb:{
      "message": "",
    }
}*/

const getLcstCookie = function (name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  let valueLcstCookie = false;
  if (parts.length == 2) {
    valueLcstCookie = true;
  }
  return valueLcstCookie;
};

const getCountry = function () {
  const url = document.location;
  const host = url.host;
  let country;
  let lang = "";
  let reg = ".*lacoste.com/([a-zA-Z]{2})/(([a-zA-Z]{2})/)?.*";
  if (host.indexOf("dev") === 0) {
    reg = "dev.*/s/([a-zA-Z]{2})/";
  } else {
    if (host.indexOf("shop") === 0) {
      reg = "shop-([a-zA-Z]{2})-.*";
    }
  }
  const regex = new RegExp(reg, "gi");
  let match;
  let matches = [];
  while ((match = regex.exec(url.href))) {
    matches.push(match);

    if (regex.lastIndex === match.index) {
      regex.lastIndex++;
    }
  }
  if (matches.length) {
    country = matches[0][1].toLowerCase();
    if (typeof matches[0][3]) {
      lang = matches[0][3];
    }
  }
  if (country === "uk") {
    country = "gb";
  }

  return {
    country: country,
    lang: lang,
  };
};

const didomiStatus = function () {
  var didomiPurposes = google_tag_manager["GTM-PJVJS4V"].dataLayer.get(
    "didomiPurposesConsent"
  );
  var status = "0";

  if (typeof didomiPurposes === "undefined") {
    status = "3";
  } else {
    //personnalization
    if (
      didomiPurposes.indexOf("create_content_profile") !== -1 &&
      didomiPurposes.indexOf("select_personalized_content") !== -1 &&
      didomiPurposes.indexOf("improve_products") !== -1 &&
      didomiPurposes.indexOf("geolocation_data") !== -1
    ) {
      status = "1";
      //perfomance
      if (
        didomiPurposes.indexOf("measure_content_performance") !== -1 &&
        didomiPurposes.indexOf("cookies") !== -1 &&
        didomiPurposes.indexOf("device_characteristics") !== -1
      ) {
        status = "2";
        //marketing
        if (
          didomiPurposes.indexOf("select_basic_ads") !== -1 &&
          didomiPurposes.indexOf("create_ads_profile") !== -1 &&
          didomiPurposes.indexOf("select_personalized_ads") !== -1 &&
          didomiPurposes.indexOf("measure_ad_performance") !== -1 &&
          didomiPurposes.indexOf("market_research") !== -1
        ) {
          status = "3";
        }
      }
    }
  }
  return status;
};

const tagName = "${dyTagName}";
const experienceName = "${dyExperienceName}";
const variationName = "${dyVariationName}";

try {
  console.log("DY | Running HeyDay");
  const countryData = getCountry();
  let jsonApi = "${urls API JSON String}";
  jsonApi = JSON.parse(jsonApi);

  const country = countryData.country;
  const countryCode = country.toUpperCase();
  if (country === "be") {
    country = countryData.country + "_" + countryData.lang;
  }

  const pageType =
    google_tag_manager["GTM-PJVJS4V"].dataLayer.get("page_data").category;

  if (typeof jsonApi[country] === "undefined") {
    return;
  }

  let api = jsonApi[country].scope1;
  let customDelayForProducts = "${Delay For Product Page}";
  const useScope2 = "${Use scope 2}";
  const cookieName = "_lcsthdopened";

  if (pageType === "product") {
    if (useScope2 === "yes" && typeof jsonApi[country].scope2 !== "undefined") {
      api = jsonApi[country].scope2;
    } else {
      return;
    }
  }

  const logoChat = "${Logo Chat}";
  const textAltIconChat = "${Text alternatif For Async Logo}";
  const asyncMode = "${Use Async Mode}";
  const displayCloseButton = "${Display Close Button}";
  let chatIconAsync = null;

  const chatClose = function (elt) {
    const btnClose = document.createElement("div");
    btnClose.setAttribute(
      "style",
      "cursor:pointer; position: absolute; left: -10px; bottom: 0px; border-radius: 50%; border: 0.1rem solid #545454; background-color: white;"
    );
    btnClose.setAttribute("title", "${Text Alternatif Close}");
    const srcImgClose = "${Close Icon}";
    const img = document.createElement("img");
    img.setAttribute("style", "width: 20px; height: 20px; display: block; ");
    img.setAttribute("src", srcImgClose);

    btnClose.appendChild(img);
    elt.appendChild(btnClose);

    btnClose.addEventListener("click", function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      elt.remove();
      let HeydayStartIconClose = document.querySelector(
        "#HeydayStartIconClose"
      );
      if (HeydayStartIconClose) {
        HeydayStartIconClose.remove();
      }
      let heydayWidgetIframeContainer = document.querySelector(
        "#heyday-widget-iframe-container"
      );
      if (heydayWidgetIframeContainer) {
        heydayWidgetIframeContainer.remove();
      }

      document.cookie = cookieName + "_closed=1; path=/; secure; samesite=lax";
    });
  };

  const chatPosition = function (elt) {
    const pageCategory =
      google_tag_manager["GTM-PJVJS4V"].dataLayer.get("page_data").category;
    if (pageCategory === "product") {
      if (window.matchMedia("(max-width: 767px)").matches) {
        elt.style.bottom = "68px";
        elt.style.right = "8px";
      } else {
        elt.style.bottom = "108px";
        elt.style.right = "16px";
        const chat = document.querySelector(
          "#heyday-widget-iframe-container #chatWindow"
        );
        chat.style.bottom = "152px";
      }
    }
  };

  const chatListenChanges = function () {
    const targetNode = document.querySelector("body");
    const config = { childList: true };
    const chatObserver = function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type == "childList") {
          for (let i = 0, l = mutation.addedNodes.length; i < l; i++) {
            if (mutation.addedNodes[i].id === "HeydayStartIconContainer") {
              chatClose(mutation.addedNodes[i]);
              chatPosition(mutation.addedNodes[i]);
              observer.disconnect();
            }
          }
        }
      }
    };
    const observer = new MutationObserver(chatObserver);
    observer.observe(targetNode, config);
  };

  const chatLoadScript = function (evt) {
    if (chatIconAsync) {
      chatIconAsync.style.filter = "grayscale(0.5)";
    }
    const o = document.createElement("script");
    o.type = "text/javascript";
    o.async = !0;
    o.onload = function () {
      if (displayCloseButton === "yes") {
        chatListenChanges();
        if (chatIconAsync) {
          chatIconAsync.remove();
        }
      }
    };
    //Hide any bottom message
    var styleSheet = document.createElement("style");
    styleSheet.id = "HeyDayHideCss";
    styleSheet.innerText = ".dy_bottom_notification{display:none}";
    document.head.appendChild(styleSheet);

    o.src = api;
    const a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(o, a);

    //Send DY Impression
    DY.API("event", {
      name: "HeyDay Impression",
      properties: {
        page: google_tag_manager["GTM-PJVJS4V"].dataLayer.get("page_data").name,
      },
    });
  };

  const chatAppendLogo = function () {
    chatIconAsync = document.createElement("div");
    chatIconAsync.setAttribute("class", "dy-chat-icon");
    chatIconAsync.setAttribute("title", textAltIconChat);
    chatIconAsync.setAttribute(
      "style",
      "width:50px; height:50px; border-radius:50%; border-bottom-right-radius:4px; position:fixed; bottom:30px; right:30px; cursor:pointer; z-index:10000; -webkit-tap-highlight-color:transparent; filter:grayscale(1);"
    );
    const img = document.createElement("img");
    img.setAttribute("style", "width: 50px; height: auto;");
    img.setAttribute("src", logoChat);
    chatIconAsync.appendChild(img);
    document.body.appendChild(chatIconAsync);
    chatIconAsync.addEventListener("click", chatLoadScript);
  };

  const chatHTML = function () {
    const useDelayClose = "${Use Delay Close}";
    const delayClose = "${Display Bubble Welcome Time}";
    const widgetState = "${Widget State}";
    const useClientCbrId = "${Use Client CBR ID}";
    const chatDiv = document.createElement("div");
    const heydayCookieValue = didomiStatus();

    let clienId = "";
    let userData = google_tag_manager["GTM-PJVJS4V"].dataLayer.get("user_data");
    if (useClientCbrId === "yes") {
      if (userData.hasOwnProperty("user_id")) {
        clienId = userData.user_id;
      }
    }

    chatDiv.setAttribute("id", "hdAttributes");
    chatDiv.setAttribute("country", countryCode);
    if (useDelayClose === "yes") {
      chatDiv.setAttribute("delay_close", delayClose);
    }
    chatDiv.setAttribute("widget_state", widgetState);
    chatDiv.setAttribute("cookie_consent", heydayCookieValue);
    if (clienId !== "") {
      chatDiv.setAttribute("external_id", clienId);
    }

    if (useScope2 === "yes" && pageType === "product") {
      const ref = "${Ref attribute value}";
      let jsonMessages = "${welcome_message attribute value JSON}";
      chatDiv.setAttribute("ref", ref);
      if (jsonMessages.length !== 0) {
        welcome_message = JSON.parse(jsonMessages);
        if (
          typeof welcome_message[country] !== "undefined" &&
          welcome_message[country].message.length !== 0
        ) {
          chatDiv.setAttribute(
            "welcome_message",
            welcome_message[country].message
          );
        }
      }
    }

    document.body.appendChild(chatDiv);
  };

  chatHTML();

  if (asyncMode === "yes") {
    chatAppendLogo();
  } else {
    if (getLcstCookie(cookieName)) {
      chatLoadScript();
    } else {
      if (useScope2 === "yes" && pageType === "product") {
        setTimeout(chatLoadScript, customDelayForProducts * 1000);
      } else {
        chatLoadScript();
      }
    }
    /*
    if (useScope2 === 'yes' && pageType === 'product') {
      if (getLcstCookie(cookieName)) {
        chatLoadScript();
      } else {
        setTimeout(chatLoadScript, customDelayForProducts * 1000);
      }
    } else {
      chatLoadScript();
    }*/
  }

  window.hdOnWidgetStateChange = function (state) {
    if (state === "opened") {
      // read cookie
      if (!getLcstCookie(cookieName)) {
        // set cookie for persistence
        document.cookie = cookieName + "=1; path=/; secure; samesite=lax";
      }
    }
  };
} catch (e) {
  console.log("DY | ", e);
}
