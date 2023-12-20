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

const init = () => {
  console.log("DY | 204 quickfilters");
  const quickFiltersCtn = document.querySelector(".js-quick-filters-wrapper");

  if (quickFiltersCtn.firstElementChild) {
    const stylesBtn = createElt(
      "button",
      { class: "js-plp-quick-filters-btn fw-bold l-hmargin--large nowrap" },
      "${Button text}"
    );

    quickFiltersCtn.firstElementChild.appendChild(stylesBtn);
  } else {
    console.log("DY | not found ", count);

    if (count < 50 && !quickFiltersCtn.firstElementChild) {
      count++;
      setTimeout(init, 250);
    }
  }
};

try {
  init();
} catch (error) {
  console.log(error);
}
