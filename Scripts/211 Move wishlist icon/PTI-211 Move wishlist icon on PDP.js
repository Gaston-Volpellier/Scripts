let count = 0;

const init = () => {
  const ctaContainer = document.querySelector(".js-buy-or-notify");
  const addToCartCta = document.querySelector(".pdp-add-to-cart").parentElement;
  const wishlistIcon = document.querySelector(
    ".js-update-gallery .js-wishlist-add-item"
  );

  if (ctaContainer && addToCartCta && wishlistIcon) {
    const newIcon = wishlistIcon.cloneNode(true);

    newIcon.classList.remove("wishlist-icon");
    newIcon.classList.add(
      "btn-cta",
      "btn--conversion",
      "l-hmargin--small",
      "l-vmargin--medium",
      "font-large"
    );
    addToCartCta.classList.add("flex--grow");
    ctaContainer.classList.add("flex");

    ctaContainer.prepend(newIcon);
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
