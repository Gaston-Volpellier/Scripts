// change any double quotes for single quotes in this variables to avoid the string quitting the json
const apiUrls = "${urls API JSON String}";
const jsonMessages = "${welcome_message attribute value JSON}";
const ctaText = "${CTA text JSON}";

let count = 0;
let openChatCount = 0;

const setLoader = (content) => {
  const chatBotCta = document.querySelector(".dy-chatbot");
  if (content) {
    chatBotCta.innerHTML = "";

    const cocoLoader = createElt(
      "div",
      {
        class: "croco-loader is-opened flex flex--justify-center dy-loader-ctn",
      },
      '<svg role="presentation" class="icon-svg icon-croco-loader dy-loader"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1713861100024/img/svg/critical.svg#icon-croco-loader"></use></svg>'
    );
    chatBotCta.appendChild(cocoLoader);
  } else {
    // removes loader if there
    chatBotCta.firstElementChild ? chatBotCta.firstElementChild.remove() : null;

    const countryData = getCountry();
    const country = countryData.country;
    const jsonCtaText = JSON.parse(ctaText);

    // If it does not find the country it defaults to english
    const buttonText =
      typeof jsonCtaText[country] === "undefined"
        ? jsonCtaText["gb"].text
        : jsonCtaText[country].text;

    chatBotCta.innerHTML = buttonText;
  }
};

const clickOnChat = () => {
  const chatbotBubble = document.getElementById("HeydayStartIconContainer");
  if (chatbotBubble) {
    chatbotBubble.click();
  } else {
    if (openChatCount < 30 && !chatbotBubble) {
      openChatCount++;
      setTimeout(() => {
        clickOnChat();
      }, 500);
    }
  }
};

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

  // url set to french contacthub
  if (url.pathname === "/on/demandware.store/Sites-FR-Site/fr/Contact-Hub") {
    country = "fr";
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

const startChatBot = () => {
  console.log("DY | Creating chatbot");

  setLoader(true);
  const countryData = getCountry();
  const jsonApi = JSON.parse(apiUrls);

  let country = countryData.country;
  const countryCode = country.toUpperCase();

  if (country === "be") {
    country = countryData.country + "_" + countryData.lang;
  }

  let pageType;

  if (
    pageViewData &&
    pageViewData.page_data &&
    pageViewData.page_data.category
  ) {
    pageType = pageViewData.page_data.category;
  }

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
    const chatObserver = function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type == "childList") {
          for (let i = 0, l = mutation.addedNodes.length; i < l; i++) {
            if (mutation.addedNodes[i].id === "HeydayStartIconContainer") {
              chatClose(mutation.addedNodes[i]);
              chatPosition(mutation.addedNodes[i]);
              observer.disconnect();

              setTimeout(() => {
                clickOnChat();
                setLoader(false);
              }, 500);
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

  // after 10 seconds, if the loader is still there, it will go back to the text
  setTimeout(() => {
    setLoader(false);
  }, 10000);
};

const createElt = (tag, oAttr, content) => {
  const elt = document.createElement(tag);
  if (oAttr) {
    for (let prop in oAttr) {
      elt.setAttribute(prop, oAttr[prop]);
    }
  }
  if (content) {
    elt.innerHTML = content;
  }
  return elt;
};

const init = () => {
  const cta = document.querySelector('[data-value="ContactHub_Chatbot"]');
  const container = cta.parentElement;

  if (container) {
    // Removes original cta
    cta.remove();

    const chatBotCta = createElt("div", {
      class:
        "btn--primary btn-cta font-label l-fill-width js-contact-hub-tracked-cta dy-chatbot",
    });

    container.appendChild(chatBotCta);
    setLoader(false);

    chatBotCta.addEventListener("click", startChatBot);
  } else {
    if (count < 50 && !container) {
      count++;

      setTimeout(() => {
        init();
      }, 100);
    }
  }
};

try {
  console.log("DY | Running ContactHub HeyDay");

  init();
} catch (e) {
  console.log("DY | ", e);
}
