let count = 0;

const jsonData = "${JSON pages data}";

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
  console.log("DY | PTI 204 Running");

  const quickFiltersCtn = document.querySelector(".js-quick-filters-wrapper");
  const filterConfig = JSON.parse(jsonData);
  const locationArr = location.pathname.split("/");

  const filterInfo =
    filterConfig[locationArr[3]][locationArr[4]][locationArr[5]];

  if (quickFiltersCtn.firstElementChild) {
    const stylesBtn = createElt(
      "button",
      { class: "js-plp-quick-filters-btn fw-bold l-hmargin--large nowrap" },
      filterInfo.button
    );
    stylesBtn.setAttribute("data-filter-id", filterInfo.selector);

    quickFiltersCtn.firstElementChild.appendChild(stylesBtn);
  } else {
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
