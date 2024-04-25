let count = 0;
const tagName = "${dyTagName}";
const experienceName = "${dyExperienceName}";
const variationName = "${dyVariationName}";
// use single quotes to parse Json
const jsonMessagesData = "${welcome_message attribute value JSON}";
const apiJsonData = "${urls API JSON String}";

const getLcstCookie = function (name) {
  console.log("getLcstCookie ", name);
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  let valueLcstCookie = false;
  if (parts.length == 2) {
    valueLcstCookie = true;
  }
  console.log("getLcstCookie return", valueLcstCookie);

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

  // only for dev env, delete before going to prod
  if (host === "dev-emea-sfcc.lacoste.com") {
    country = "fr";
  }
  console.log("getCountry return", country, lang);

  return {
    country: country,
    lang: lang,
  };
};

const didomiStatus = function () {
  console.log("didomiStatus");

  var didomiPurposes = google_tag_manager["GTM-PJVJS4V"].dataLayer.get(
    "didomiPurposesConsent"
  );
  var status = "0";

  if (typeof didomiPurposes === "undefined") {
    status = "3";
  } else {
    // personnalization;
    if (
      didomiPurposes.indexOf("create_content_profile") !== -1 &&
      didomiPurposes.indexOf("select_personalized_content") !== -1 &&
      didomiPurposes.indexOf("improve_products") !== -1 &&
      didomiPurposes.indexOf("geolocation_data") !== -1
    ) {
      status = "1";
      // perfomance;
      if (
        didomiPurposes.indexOf("measure_content_performance") !== -1 &&
        didomiPurposes.indexOf("cookies") !== -1 &&
        didomiPurposes.indexOf("device_characteristics") !== -1
      ) {
        status = "2";
        // marketing;
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
  console.log("didomiStatus return ", status);

  return status;
};

const startChatBot = () => {
  console.log("DY | Starting Chatbot");

  const countryData = getCountry();

  const jsonApi = JSON.parse(apiJsonData);
  console.log("DY | Json API", jsonApi);

  let country = countryData.country;
  const countryCode = country.toUpperCase();
  if (country === "be") {
    country = countryData.country + "_" + countryData.lang;
  }

  let pageType;

  console.log("pageViewData ", pageViewData);

  if (
    pageViewData &&
    pageViewData.page_data &&
    pageViewData.page_data.category
  ) {
    pageType = pageViewData.page_data.category;
  }

  if (typeof jsonApi[country] === "undefined") {
    console.log("typeof JsonApi[country] is undefined ", jsonApi);

    return;
  }

  let api = jsonApi[country].scope1;
  const customDelayForProducts = "${Delay For Product Page}";
  const useScope2 = "${Use scope 2}";
  const cookieName = "_lcsthdopened";

  if (pageType === "product") {
    console.log("pagetype product ");

    if (useScope2 === "yes" && typeof jsonApi[country].scope2 !== "undefined") {
      console.log("pagetype product and useScope2 yes");

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
    console.log("chat close", elt);

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

    console.log("btnClose", btnClose);

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

      console.log("adding cookie", document.cookie);
    });
  };

  const chatPosition = function (elt) {
    console.log("chat position: ", elt);
    let pageCategory;

    if (
      pageViewData &&
      pageViewData.page_data &&
      pageViewData.page_data.category
    ) {
      pageCategory = pageViewData.page_data.category;
    }

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

    console.log("Chat Listen changes: ", targetNode);

    const chatObserver = function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type == "childList") {
          for (let i = 0, l = mutation.addedNodes.length; i < l; i++) {
            if (mutation.addedNodes[i].id === "HeydayStartIconContainer") {
              console.log(
                "mutation childlist added heydayStartIconContainer: ",
                mutation.addedNodes
              );

              chatClose(mutation.addedNodes[i]);
              chatPosition(mutation.addedNodes[i]);

              console.log("Disconecting observer");

              observer.disconnect();
            }
          }
        }
      }
    };
    const observer = new MutationObserver(chatObserver);

    console.log("Observing");

    observer.observe(targetNode, config);
  };

  const chatLoadScript = function (evt) {
    if (chatIconAsync) {
      chatIconAsync.style.filter = "grayscale(0.5)";
    }

    console.log("Loading chat script");

    const o = document.createElement("script");
    o.type = "text/javascript";
    o.async = !0;
    o.onload = function () {
      if (displayCloseButton === "yes") {
        console.log("display close button yes");

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

    console.log("Final Script:", o);

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

    console.log("Appending chat logo.", chatIconAsync);

    chatIconAsync.addEventListener("click", chatLoadScript);
  };

  const chatHTML = function () {
    const useDelayClose = "${Use Delay Close}";
    const delayClose = "${Display Bubble Welcome Time}";
    const widgetState = "${Widget State}";
    const useClientCbrId = "${Use Client CBR ID}";
    const chatDiv = document.createElement("div");
    const heydayCookieValue = didomiStatus();

    console.log("chat HTML", chatDiv);

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

      chatDiv.setAttribute("ref", ref);
      if (jsonMessagesData.length !== 0) {
        const welcome_message = JSON.parse(jsonMessagesData);
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

    console.log("Final chatdiv", chatDiv);
  };

  chatHTML();

  if (asyncMode === "yes") {
    console.log("asyncmode");

    chatAppendLogo();
  } else {
    if (getLcstCookie(cookieName)) {
      console.log("getLcstCookie true");

      chatLoadScript();
    } else {
      if (useScope2 === "yes" && pageType === "product") {
        setTimeout(chatLoadScript, customDelayForProducts * 1000);
      } else {
        chatLoadScript();
      }
    }
  }

  window.hdOnWidgetStateChange = function (state) {
    if (state === "opened") {
      console.log("hdOnWidgetStateChange opened");

      // read cookie
      if (!getLcstCookie(cookieName)) {
        // set cookie for persistence
        document.cookie = cookieName + "=1; path=/; secure; samesite=lax";
      }
    }
  };
};

const init = () => {
  console.log("DY | Running ContactHub HeyDay");

  const chatbox = document
    .querySelectorAll("main")[1]
    .querySelector("section")
    .querySelectorAll("article")[1];

  if (chatbox) {
    const link = chatbox.firstElementChild.lastElementChild.firstElementChild;
    console.log("Chatbox found", link);

    link.setAttribute("href", "javascript:void(0);");
    link.addEventListener("click", startChatBot);
  } else {
    if (count < 50 && !chatbox) {
      console.log("Didnt find box", count);

      setTimeout(() => {
        init();
      }, 100);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | ", e);
}
