function init() {
  let popinCtn;
  let config, timeout;
  let popinATC, dyReinsuranceCtn;
  let dyMainCtn;

  const reinsurances = [
    {
      picSrc: "${Picture Reinsurance 1}",
      content: "${Content Reinsurance 1}",
    },
    {
      picSrc: "${Picture Reinsurance 2}",
      content: "${Content Reinsurance 2}",
    },
    {
      picSrc: "${Picture Reinsurance 3}",
      content: "${Content Reinsurance 3}",
    },
    {
      picSrc: "${Picture Reinsurance 4}",
      content: "${Content Reinsurance 4}",
    },
  ];

  const eltFactory = function (type, attributes) {
    const elt = document.createElement(type);
    for (let attribute in attributes) {
      elt.setAttribute(attribute, attributes[attribute]);
    }
    return elt;
  };

  dyMainCtn = eltFactory("div", {
    class:
      "dy-reinsurance l-vmargin--large flex flex--col flex--start fs--medium",
    style: "margin-top: 2.5rem",
  });

  const createReinsuranceElt = function () {
    let reinsuranceCtn, imgCtn, contentCtn, hr;

    hr = eltFactory("hr", {
      class: "l-vmargin--large",
    });

    dyMainCtn.appendChild(hr);

    for (let i = 0, l = reinsurances.length; i < l; i++) {
      if (reinsurances[i].picSrc !== "") {
        reinsuranceCtn = eltFactory("div", {
          class: "flex flex--start flex--align-center l-vmargin--large",
        });
        imgCtn = eltFactory("img", {
          src: reinsurances[i].picSrc,
          class: "dy-reinsurance-pic l-hmargin--large",
        });
        contentCtn = eltFactory("div", { class: "font-small" });
        contentCtn.innerHTML = reinsurances[i].content;

        reinsuranceCtn.appendChild(imgCtn);
        reinsuranceCtn.appendChild(contentCtn);
        dyMainCtn.appendChild(reinsuranceCtn);
        hr = eltFactory("hr", {
          class: "l-vmargin--large",
        });

        dyMainCtn.appendChild(hr);
      }
    }
  };

  const mutationCallback = function (mutationsList) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      popinATC = document.querySelector(
        '[data-popin-content="popin-addtocart"]'
      );
      if (popinATC) {
        popinClose = document.querySelector(
          '[data-popin-content="popin-addtocart"]  .js-popin-close'
        );
        if (popinClose) {
          popinCloseParent = popinClose.parentNode.parentNode;
          dyReinsuranceCtn = document.querySelector(".dy-reinsurance");
          if (!dyReinsuranceCtn && popinCloseParent) {
            popinCloseParent.appendChild(dyMainCtn);
          }
        }
      }
    }, 250);
  };

  popinCtn = document.querySelector(".js-popin-container.popin-container");
  config = { attributes: true, subtree: true };

  if (popinCtn) {
    createReinsuranceElt();
    observer = new MutationObserver(mutationCallback);
    observer.observe(popinCtn, config);
  }
}

try {
  init();
} catch (e) {
  console.log("DY | Error", e);
}
