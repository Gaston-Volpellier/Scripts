let count = 0;

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

const addSpan = (text) => {
  const deskCta = document.querySelector(".js-pdp-sticky-atc");
  const mobileCta = document.querySelector(".js-buy-or-notify-banner");
  const mobileBanner = document.querySelector(".js-sticky-banner");

  if (deskCta && mobileCta) {
    // desktop span
    const deskCtn = createElt("div", {
      class: "flex flex--justify-center",
    });
    const deskSpan = createElt(
      "span",
      { class: "text-grey-dark text-start font-small l-hmargin--xsmall" },
      text
    );
    // const deskIcon = createElt(
    //   "div",
    //   { class: "no-flex--shrink l-hmargin--small message-info" },
    //   '<svg role="presentation" class="icon-svg message-icon l-hmargin--small rounded no-flex--resize large-icon" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/default/v1705457938392/img/svg//non-critical.svg#icon-info"></use></svg>'
    // );

    deskCtn.appendChild(deskSpan);
    // deskCtn.appendChild(deskIcon);

    deskCta.firstElementChild.classList.add("l-vmargin--xsmall");
    deskCta.appendChild(deskCtn);

    // mobile span
    const mobileCtn = createElt("div", {
      class: "flex flex--justify-center no-desk no-tab",
    });
    const mobileSpan = createElt(
      "span",
      { class: "text-grey-dark text-start font-small l-hmargin--xsmall" },
      text
    );
    // const mobileIcon = createElt(
    //   "div",
    //   { class: "no-flex--shrink l-hmargin--small message-info" },
    //   '<svg role="presentation" class="icon-svg message-icon l-hmargin--small rounded no-flex--resize medium-icon" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/default/v1705457938392/img/svg//non-critical.svg#icon-info"></use></svg>'
    // );

    mobileCtn.appendChild(mobileSpan);
    // mobileCtn.appendChild(mobileIcon);

    mobileCta.classList.add("flex--col");
    mobileCta.firstElementChild.classList.add("l-m-vmargin--xsmall");
    mobileCta.appendChild(mobileCtn);

    mobileBanner ? mobileBanner.classList.add("dy-sticky") : null;
  } else {
    if (count < 20) {
      count++;
      setTimeout(() => {
        addSpan(text);
      }, 100);
    }
  }
};

const getDayName = (locale) => {
  const now = new Date().getTime();
  const date = now + 48 * 60 * 60 * 1000;

  return {
    day: new Date(date).toLocaleDateString(locale, { day: "numeric" }),
    month: new Date(date).toLocaleDateString(locale, { month: "long" }),
  };
};

const modifyText = (text) => {
  const zone = "${Date language}";

  const deliveryDate = getDayName(zone);
  const modifiedText = text.replace("%%", deliveryDate.day);

  return modifiedText.replace("##", deliveryDate.month);
};

const init = () => {
  const text = "${Text}";
  const specifyDay = "${Show weekday name}";

  const newText = specifyDay === "true" ? modifyText(text) : text;

  addSpan(newText);
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
