function moveRecommandation() {
  const behaviorReco = "${Move Recommandation below}";
  const scrollId = "dy-scroll-custo";

  let sectionCtn, sectionCtnChildren, sectionCtnFirstChild;
  let starter;
  let refCtn, nextRefCtn;
  let straterBtnScroll;
  let homeRecommandation;

  sectionCtn = document.querySelector(".js-modular-section");
  sectionCtnChildren = document.querySelectorAll(".js-modular-section > div");

  for (let i = 0, l = sectionCtnChildren.length; i < l; i++) {
    if (sectionCtnChildren[i].classList.contains("js-modular--starter")) {
      starter = sectionCtnChildren[i];
    }

    if (sectionCtnChildren[i].classList.contains(behaviorReco)) {
      refCtn = sectionCtnChildren[i];
      nextRefCtn = sectionCtnChildren[i + 1];
    }

    if (sectionCtnChildren[i].classList.contains("js-home-recommendations")) {
      homeRecommandation = sectionCtnChildren[i];
    }

    if (refCtn && homeRecommandation) {
      sectionCtn.insertBefore(homeRecommandation, nextRefCtn);
      break;
    }
  }

  // Change strater's scroll behavior
  homeRecommandation.setAttribute("id", scrollId);
  straterBtnScroll = starter.querySelector(".js-btn-scroll");

  if (straterBtnScroll) {
    straterBtnScroll.setAttribute("href", "#" + scrollId);
  }
}

function init() {
  const starter = document.querySelector(".modular--starter");
  const config = { attributes: true };
  let timeout;

  const mutationCallback = function (mutationList) {
    clearTimeout(timeout);
    timeout = setTimeout(moveRecommandation, 1500);
  };
  const observer = new MutationObserver(mutationCallback);

  if (starter) {
    if (starter.getAttribute("data-modularstarter") === "true") {
      clearTimeout(timeout);
      timeout = setTimeout(moveRecommandation, 1500);
    } else {
      observer.observe(starter, config);
    }
  }
}

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
