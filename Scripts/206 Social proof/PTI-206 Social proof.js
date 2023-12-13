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
  const views = "${Views}";
  const minimumViews = "${minimumViews}";
  const text = "${Text}";
  const viewCount = parseInt(views);
  const minimum = parseInt(minimumViews);

  if (viewCount >= minimum) {
    const newText = text.replace("$$", "<b>${Views}</b>");

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
  }
};

try {
  init();
} catch (error) {
  console.log(error);
}
