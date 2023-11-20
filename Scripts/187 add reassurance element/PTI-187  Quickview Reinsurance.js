function init() {
  try {
    let observer;
    let timeout;
    let popinCtn;
    let config;
    let reinsurancesCtn;
    let quickviewCtn;
    let dyReinsuranceCtn;
    let lastItemQuickviewCtn;

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

    const createReinsuranceContainer = function () {
      const dyMainCtn = eltFactory("div", {
        class: "dy-reinsurance l-vmargin--large font-medium",
      });
      let reinsuranceCtn, reisuranceContent, reisuranceSrc, hr;

      const titleCtn = eltFactory("div", {
        class: "title--large l-vmargin--large",
      });
      titleCtn.innerHTML = "${Title Reinsurant}";
      dyMainCtn.appendChild(titleCtn);

      for (let i = 0, l = reinsurances.length; i < l; i++) {
        if (reinsurances[i].content !== "") {
          reinsuranceCtn = eltFactory("div", {
            class:
              "flex flex--justify-start flex--align-center l-vmargin--medium",
          });
          reisuranceSrc = eltFactory("img", {
            src: reinsurances[i].picSrc,
            style: "width: 32px; height: 32px",
            class: "l-hmargin--small",
          });
          reisuranceContent = eltFactory("div", {
            class: "fs--medium",
          });
          reisuranceContent.innerHTML = reinsurances[i].content;
          reinsuranceCtn.appendChild(reisuranceSrc);
          reinsuranceCtn.appendChild(reisuranceContent);
          dyMainCtn.appendChild(reinsuranceCtn);
          if (i < l - 2) {
            hr = eltFactory("hr", {
              class: "flex l-vmargin--medium",
            });
            dyMainCtn.appendChild(hr);
          }
        }
      }

      return dyMainCtn;
    };

    const mutationCallback = function (mutationsList) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        quickviewCtn = document.querySelector(".js-quick-view-scroll");
        dyReinsuranceCtn = document.querySelector(".dy-reinsurance");
        if (!dyReinsuranceCtn && quickviewCtn) {
          lastItemQuickviewCtn =
            quickviewCtn.children[quickviewCtn.children.length - 1];
          if (lastItemQuickviewCtn.classList.contains("l-padding--small")) {
            quickviewCtn.appendChild(reinsurancesCtn);
          } else {
            quickviewCtn.insertBefore(
              reinsurancesCtn,
              quickviewCtn.children[quickviewCtn.children.length - 1]
            );
          }
        }
      }, 250);
    };

    // Begin starts here
    reinsurancesCtn = createReinsuranceContainer();
    popinCtn = document.querySelector(".js-popin-container.popin-container");
    config = { attributes: true, subtree: true };

    if (popinCtn) {
      observer = new MutationObserver(mutationCallback);
      observer.observe(popinCtn, config);
    }
  } catch (e) {
    console.log("DY | error", e);
  }
}

init();
