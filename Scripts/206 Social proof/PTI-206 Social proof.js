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
  const viewCount = parseInt(views);

  if (viewCount >= 50) {
    const priceIndicator = document.querySelector(
      ".js-pdp-price.js-update-price-with-installments"
    ).parentElement;

    const ctn = createElt("div", {
      class: "l-vmargin--small padding-m-1 l-padding--xsmall",
    });

    const text = createElt(
      "span",
      { class: "font-small dy-text-warning" },
      "&#8226 Cet article a été vu <b>${Views}</b> fois au cours des dernières 48h"
    );
    ctn.appendChild(text);

    priceIndicator.insertAdjacentElement("afterend", ctn);
  } else {
    console.log("DY | The item views are less than 50, they are: ", viewCount);
  }
};

try {
  init();
} catch (error) {
  console.log(error);
}
