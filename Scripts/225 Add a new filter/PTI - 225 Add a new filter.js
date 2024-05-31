let count = 0;

const toggleFilter = () => {
  const productTiles = document.querySelectorAll(".product-tile");
  productTiles.forEach((tile) => {
    if (tile.querySelector('[aria-label="${Aria label text}"]') === null) {
      if (tile.parentElement.classList.contains("is-hidden")) {
        tile.parentElement.classList.remove("is-hidden");
      } else {
        tile.parentElement.classList.add("is-hidden");
      }
    }
  });
};

const init = () => {
  console.log("DY | Running PTI 225");
  const filterButtonText = "${Button text}";

  const quickFilters = document.querySelector(
    ".js-quick-filters-wrapper"
  ).firstElementChild;

  if (quickFilters) {
    const filterButton = document.createElement("button");
    filterButton.setAttribute("class", "fw-bold l-hmargin--large nowrap");
    filterButton.setAttribute("data-filter-id", "new");

    filterButton.addEventListener("click", toggleFilter);
    filterButton.innerHTML = filterButtonText;

    quickFilters.appendChild(filterButton);
  } else {
    if (count < 50 && !quickFilters) {
      setTimeout(() => {
        init();
        count++;
      }, 150);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
