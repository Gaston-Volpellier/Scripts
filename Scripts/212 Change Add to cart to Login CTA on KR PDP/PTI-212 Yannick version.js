let observerPopin;
let cta, btnBuyParent, linkToRedirect;
let btnPopinCta, btnPopinCtaParent, popinNewButton, btnSize;
let count = 0;
const btnBuy = document.querySelector(".js-buy-or-notify");
const ctaText = "${CTA Text}";
const config = { childList: true };
const configPopin = { childList: true, atttribute: true, subtree: true };

function changeButton(btnBuy, cta, ctaText) {
  if (window.matchMedia("(max-width: 767px)").matches) {
    btnBuyParent = btnBuy.parentNode;
    btnBuyParent.classList.add("l-padding-top-row-small");
  }

  cta.classList.remove("js-pdp-exclusive-atc");

  if (ctaText !== "") {
    cta.innerHTML = "${CTA Text}";
  }

  linkToRedirect = cta.getAttribute("href");
  btnSize = document.querySelector(".js-pdp-select-size");
  addEventToBtnSize(btnSize);
}

function globalObserver(state) {
  if (state === "on") {
    observerPopin.observe(popinCtn, configPopin);
  }
  if (state === "off") {
    observerPopin.disconnect();
  }
}

function eventClick() {
  globalObserver("on");
}

function addEventToBtnSize(btnSize) {
  btnSize.removeEventListener("click", eventClick);
  btnSize.addEventListener("click", eventClick);
}

try {
  cta = btnBuy.querySelector(".btn-cta");

  if (cta) {
    changeButton(btnBuy, cta, ctaText);
  }

  const observer = new MutationObserver(function (mutationsList) {
    let cta;
    for (let mutation of mutationsList) {
      count++;
      cta = btnBuy.querySelector(".js-buy-or-notify .btn-cta");
      if (cta) {
        if (window.matchMedia("(max-width: 767px)").matches) {
          btnBuyParent = btnBuy.parentNode;
          btnBuyParent.classList.add("l-padding-top-row-small");
        }
        changeButton(btnBuy, cta, ctaText);
        btnSize = document.querySelector(".js-pdp-select-size");
        addEventToBtnSize(btnSize);
        if (count > 50) {
          observer.disconnect();
        }
      }
    }
  });

  observer.observe(btnBuy, config);

  // POPIN observer
  const popinCtn = document.querySelector("footer + div");

  observerPopin = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      btnPopinCta = document.querySelector(
        ".popin-content button.pdp-sticky-mt--bottom"
      );
      if (btnPopinCta) {
        popinNewButton = btnPopinCta.querySelector(".dy-popin-cta");

        if (!popinNewButton) {
          popinNewButton = document.createElement("a");
          popinNewButton.setAttribute(
            "class",
            btnPopinCta.getAttribute("class") + "dy-popin-cta"
          );
          popinNewButton.setAttribute("href", linkToRedirect);
          popinNewButton.innerHTML = btnPopinCta.innerHTML;

          btnPopinCtaParent = btnPopinCta.parentNode;
          btnPopinCtaParent.insertBefore(popinNewButton, btnPopinCta);
          btnPopinCta.remove();
          break;
        }
        globalObserver("off");
      }
    }
  });

  observerPopin.observe(popinCtn, configPopin);
} catch (e) {
  console.log("DY | error", e);
}
