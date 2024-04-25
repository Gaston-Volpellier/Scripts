let count = 0;
const config = { attributes: true, childList: true, subtree: true };
const ctaText = "${CTA Text}";
const ctaLink = "${CTA Link}";
const popinContainer = document.querySelector("footer + div");

const fixCtaStyle = () => {
  const mobileCta = document.querySelector(".js-pdp-exclusive-atcbtn-cta");

  mobileCta
    ? (mobileCta.classList.add("js-pdp-exclusive-atc", "btn-cta"),
      mobileCta.classList.remove("js-pdp-exclusive-atcbtn-cta"))
    : null;
};

const changeCta = () => {
  // changes main cta
  const mainCta = document.querySelector(".js-buy-or-notify");
  const ctaAnchor = mainCta.querySelector(".btn-cta");
  const tabletCta = document.querySelector(
    ".js-sticky-banner-start-mt"
  ).firstElementChild;

  // Changes Desktop CTA
  if (ctaAnchor) {
    if (ctaAnchor.nodeName !== "A") {
      ctaAnchor.classList.remove("js-pdp-exclusive-atc");
      // Production classlist - Delete if not needed
      ctaAnchor.classList.remove("js-pdp-quick-buy-popin");

      const newAnchor = document.createElement("a");
      newAnchor.setAttribute(
        "class",
        " btn-cta btn--conversion font-label l-fill-width text-center "
      );
      newAnchor.setAttribute("href", ctaLink);
      if (ctaText !== "") {
        newAnchor.innerHTML = ctaText;
      }
      ctaAnchor.remove();
      mainCta.appendChild(newAnchor);
    } else {
      if (ctaText !== "") {
        ctaAnchor.innerHTML = ctaText;
      }
      ctaAnchor.setAttribute("href", ctaLink);
      ctaAnchor.classList.remove("js-pdp-exclusive-atc");

      // Production classlist - Delete if not needed
      ctaAnchor.classList.remove("js-pdp-quick-buy-popin");
    }
  } else {
    if (count < 50) {
      count++;
      setTimeout(changeCta, 100);
    }
  }

  tabletCta ? tabletCta.classList.remove("js-pdp-exclusive-atc") : null;
};

function globalObserver(state) {
  if (state === "on") {
    observer.observe(popinContainer, config);
  }
  if (state === "off") {
    observer.disconnect();
  }
}

const mutationCallback = (mutationList, observer) => {
  // checks for changes in the popin
  for (const mutation of mutationList) {
    const btnPopinCta = document.querySelector(
      ".popin-content button.pdp-sticky-mt--bottom"
    );

    if (btnPopinCta) {
      const popinDYBtn = btnPopinCta.querySelector(".dy-popin-cta");

      if (!popinDYBtn) {
        // if it does not find the DY made cta it creates one.
        const popinNewButton = document.createElement("a");
        const btnPopinCtaParent = btnPopinCta.parentNode;

        popinNewButton.setAttribute(
          "class",
          btnPopinCta.getAttribute("class") + "dy-popin-cta"
        );
        popinNewButton.setAttribute("href", ctaLink);

        if (ctaText !== "") {
          popinNewButton.innerHTML = ctaText;
        } else {
          popinNewButton.innerHTML = btnPopinCta.innerHTML;
        }
        btnPopinCtaParent.insertBefore(popinNewButton, btnPopinCta);
        btnPopinCta.remove();
        break;
      }
      globalObserver("off");
    }
  }
};

const observer = new MutationObserver(mutationCallback);

const init = () => {
  console.log("DY | Running PTI-212");
  globalObserver("on");
  changeCta();
  // fixCtaStyle();
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
