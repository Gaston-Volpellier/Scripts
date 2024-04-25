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

  // only for dev env, delete before going to production
  if (host === "dev-emea-sfcc.lacoste.com") {
    country = "fr";
  }
  console.log("getCountry return", country, lang);

  return {
    country: country,
    lang: lang,
  };
};

const startChatBot = () => {
  let jsonApi = "${urls API JSON String}";
  jsonApi = JSON.parse(jsonApi);
  const countryData = getCountry();

  let country = countryData.country;

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
  const cookieName = "_lcsthdopened";

  const chatLoadScript2 = () => {
    const tagString = "<script async src='" + api + "'></script>";
    console.log("Loading script2", tagString);

    const range = document.createRange();
    range.selectNode(document.getElementsByTagName("head")[0]);
    const documentFragment = range.createContextualFragment(tagString);
    document.body.appendChild(documentFragment);
  };
  chatLoadScript2();
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
  // contact hub
  const container = document
    .querySelectorAll("main")[1]
    .querySelector("section")
    .querySelectorAll("article")[1].firstElementChild.lastElementChild;

  // contactUs
  // const container = document.querySelectorAll(".customerContact")[1];

  //  checkout page
  //const container = document.querySelector(".message-refit");

  if (container) {
    // const link = chatbox.firstElementChild.lastElementChild.firstElementChild;
    console.log("Chatbox found", container);
    // const ctaText = container.firstElementChild.firstElementChild.innerHTML;
    // container.firstElementChild.remove();

    const chatBotCta = createElt(
      "div",
      {
        class: "btn-cta btn--primary font-label l-fill-width dy-chatbot",
      },
      "Start chatbot"
      // ctaText
    );
    console.log("chatBotCta", chatBotCta);

    container.appendChild(chatBotCta);

    chatBotCta.addEventListener("click", startChatBot);
  } else {
    if (count < 50 && !container) {
      console.log("Didnt find box", count);

      setTimeout(() => {
        init();
      }, 100);
    }
  }
};
try {
  init();
} catch (error) {
  console.log("DY | ", e);
}
