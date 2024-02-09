let count = 0;
let countObserver = 0;
const config = { attributes: true, subtree: true };
const container = document.querySelector(".js-popin-container.popin-container");

const handleChange = () => {
  const link = document.querySelector(
    ".js-popin-view-content .popin-d-hpadding span"
  );

  if (link) {
    countObserver = 0;
    link.innerHTML = "${Link Text}";
  } else {
    if (countObserver < 20 && !link) {
      countObserver++;
      setTimeout(handleChange, 100);
    }
  }
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.attributeName === "class" &&
      container.firstElementChild.classList.contains("is-opened")
    ) {
      handleChange();
    }
  });
});

const init = () => {
  const tilesCtn = document.querySelector(".js-plp-tiles");
  const tiles = tilesCtn.querySelectorAll(".js-product-tile-main-link");

  if (tiles) {
    tiles.forEach((tile) => {
      const quickview = tile.querySelector(".js-quick-pdp-eye");
      const links = tile.querySelectorAll(".js-product-tile-link");

      links.forEach((link) => {
        link.setAttribute("href", "javascript:void(0);");
        link.addEventListener("click", () => {
          quickview.click();
        });
      });

      quickview.classList.add("is-hidden");
    });

    if (container) {
      const observer = new MutationObserver(handleChange);
      observer.observe(container, config);
    }
  } else {
    if (count < 50 && !tiles) {
      count++;
      setTimeout(init, 250);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
