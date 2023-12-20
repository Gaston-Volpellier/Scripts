const sendTracking = (dyExperienceName, dyTagName, dyVariationName, area) => {
  dataLayer.push({ event_data: null });
  dataLayer.push({
    event: "DY Event",
    eventAction: dyTagName,
    eventCategory: "DY Smart Action",
    eventLabel: dyExperienceName + "-" + dyVariationName + " - " + area,
  });
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
  const actions = "${Actions}";
  const minimumActions = "${minimumActions}";
  const text = "${Text}";
  const dyExperienceName = "${dyExperienceName}";
  const dyTagName = "${dyTagName}";
  const dyVariationName = "${dyVariationName}";
  const viewCount = parseInt(actions);
  const minimum = parseInt(minimumActions);

  if (viewCount >= minimum) {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "Msg_seen");
    const newText = text.replace("$$", "<b>${Actions}</b>");

    const priceIndicator = document.querySelector(
      ".js-pdp-price.js-update-price-with-installments"
    ).parentElement;

    const ctn = createElt("div", {
      class: "padding-m-1 l-padding--xsmall",
    });

    const textSpan = createElt(
      "span",
      { class: "font-small dy-text-warning" },
      newText
    );
    ctn.appendChild(textSpan);

    priceIndicator.insertAdjacentElement("afterend", ctn);
  } else {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "Msg_not_seen");
  }
};

try {
  init();
} catch (error) {
  console.log(error);
}
