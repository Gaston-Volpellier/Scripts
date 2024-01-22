let count = 0;
let timeout;

const moveElements = (elementToMove, targetElement) => {
  targetElement.insertAdjacentElement("afterend", elementToMove);
  return true;
};

const callback = () => {
  clearTimeout(timeout);
  timeout = setTimeout(moveShopTheLook, 1500);
};

const observer = new MutationObserver(callback);

const moveShopTheLook = () => {
  const shopTheLook = document.getElementById("shop-the-look");
  const recommendationsList = document.querySelector(
    '[data-code="ProductRecommendation1"]'
  );
  if (shopTheLook && recommendationsList) {
    if (moveElements(shopTheLook, recommendationsList)) {
      observer.disconnect();
    }
  }
};

const init = () => {
  const config = { childList: true };
  const advantages = document.querySelector(
    '[id^="PushSliderLayer-"]'
  ).parentElement;
  const mainCtn = document.querySelector(".js-pdp-description-btn")
    .parentElement.parentElement;
  const recommendations = document.querySelector(".js-pdp-recommendations");

  if (advantages && mainCtn) {
    if (
      moveElements(advantages, mainCtn) &&
      moveElements(recommendations, advantages)
    ) {
      observer.observe(recommendations, config);
    }
  } else {
    if (count < 50) {
      count++;
      setTimeout(init, 50);
    }
  }
};

try {
  init();
} catch (error) {
  console.log("DY | Error: ", error);
}
