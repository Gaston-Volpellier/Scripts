let count = 0;
const config = { childList: true, subtree: true };
const text = "${Text}";
let originalText = "";

// const regex = "^https://www.lacoste.com/fr/(?!.*(?:?|&)size=).*$";

const getSizeStatus = () => {
  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (dataLayer[i].event === "size_selection") {
        return true;
      }
    }
  }
  return false;
};

const mutationCallback = () => {
  const bannerCta = document.querySelector(".btn-banner");
  const mainCta = document.querySelector(".pdp-add-to-cart");

  if (getSizeStatus()) {
    if (bannerCta.lastElementChild.innerHTML === text) {
      bannerCta.lastElementChild.innerHTML = originalText;
    }
    if (mainCta.firstElementChild.innerHTML === text) {
      mainCta.firstElementChild.innerHTML = originalText;
    }
  }
};

const observer = new MutationObserver(mutationCallback);

const init = () => {
  console.log("DY | PTI 222 running");
  const bannerCta = document.querySelector(".btn-banner");
  const mainCta = document.querySelector(".pdp-add-to-cart");

  if (bannerCta && mainCta) {
    const sizeButton = document.querySelector(".js-update-select-size");
    originalText = mainCta.firstElementChild.innerHTML;

    mainCta.firstElementChild.innerHTML = text;
    bannerCta.lastElementChild.innerHTML = text;
    observer.observe(sizeButton, config);
  } else {
    if (count < 50 && !(bannerCta && mainCta)) {
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
