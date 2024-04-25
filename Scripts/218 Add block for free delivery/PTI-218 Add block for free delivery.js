let count = 0;
const freeDelivery = parseInt("${Free delivery amount}");
const message = "${Message}";

const createElt = (tag, oAttr, content) => {
  const elt = document.createElement(tag);
  if (oAttr) {
    for (let prop in oAttr) {
      elt.setAttribute(prop, oAttr[prop]);
    }
  }
  if (content) {
    elt.innerHTML = content;
  }
  return elt;
};

const getCartTotal = () => {
  let cartTotal = 0;
  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (dataLayer[i].event === "view_cart") {
        if (dataLayer[i].ecommerce.items !== undefined) {
          dataLayer[i].ecommerce.items.forEach((item) => {
            const itemPrice =
              item.price !== undefined ? item.price * item.quantity : 0;
            cartTotal = cartTotal + itemPrice;
          });

          break;
        }
      }
    }
  }

  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (dataLayer[i].event === "add_to_cart") {
        if (dataLayer[i].ecommerce.items !== undefined) {
          dataLayer[i].ecommerce.items.forEach((item) => {
            const itemPrice =
              item.price !== undefined ? item.price * item.quantity : 0;
            cartTotal = cartTotal + itemPrice;
          });

          break;
        }
      }
    }
  }

  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (dataLayer[i].event === "remove_from_cart") {
        if (dataLayer[i].ecommerce.items !== undefined) {
          dataLayer[i].ecommerce.items.forEach((item) => {
            const itemPrice =
              item.price !== undefined ? item.price * item.quantity : 0;
            cartTotal = cartTotal - itemPrice;
          });

          break;
        }
      }
    }
  }

  return cartTotal;
};

const setProgress = (percentage) => {
  if (percentage > 0) {
    const progress = document.querySelectorAll(".dy-progress");
    progress.forEach((element) => {
      element.style.width = percentage >= 100 ? "100%" : percentage + "%";
    });
  }
};

const createProgressBar = () => {
  // checks for existing progress bar
  const deskBar = document.querySelector(".dy-desk-ctn");
  const mobBar = document.querySelector(".dy-mobile-ctn");
  deskBar ? deskBar.remove() : null;
  mobBar ? mobBar.remove() : null;

  const container = document.querySelector(".cart-summary");
  const mobileContainer = document.querySelector(".step-current");
  const cartTotal = getCartTotal();
  const cartProgress = cartTotal > 0 ? (cartTotal / freeDelivery) * 100 : 0;
  const difference = freeDelivery - cartTotal;

  if (difference > 0) {
    if (container && mobileContainer) {
      const formatDifference = Intl.NumberFormat("${Country currency format}", {
        style: "currency",
        currency: "${Currency}",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
      }).format(difference);

      const title = container.firstElementChild.querySelector("h1");
      const ctn = createElt("div", { class: "dy-container l-vmargin--large" });

      // hides mobile version of "Join club lacoste"
      mobileContainer.children[1].firstElementChild.firstElementChild.classList.add(
        "no-mob",
        "no-tab"
      );

      const descriptionCtn = createElt("div", {
        class: "flex flex--align-center l-vmargin--small",
      });

      const descriptionSpan = createElt(
        "span",
        {
          class: "font-medium text-primary text-center l-hmargin--xsmall",
        },
        message.replace("%amount%", formatDifference)
      );

      const progressBar = createElt("div", {
        class: "dy-progressBar",
      });
      const progress = createElt("div", {
        class: "dy-progress",
      });

      descriptionCtn.appendChild(descriptionSpan);
      ctn.appendChild(descriptionCtn);

      progressBar.appendChild(progress);
      ctn.appendChild(progressBar);

      const mobileCtn = ctn.cloneNode(true);

      ctn.classList.add("no-mob", "no-tab", "dy-desk-ctn");
      mobileCtn.classList.add("no-desk", "padding-1", "dy-mobile-ctn");

      container.firstElementChild.insertBefore(ctn, title.nextElementSibling);
      mobileContainer.insertBefore(mobileCtn, mobileContainer.lastElementChild);

      setProgress(cartProgress);
    } else {
      count++;

      setTimeout(() => {
        if (count < 50 && !container && !mobileContainer) {
          createProgressBar();
        }
      }, 300);
    }
  }
};

const init = () => {
  console.log("DY | PTI-218 Running");

  const selects = document.querySelectorAll(".select-cta");

  if (selects.length > 0) {
    count = 0;

    selects.forEach((element) => {
      element.addEventListener("change", function () {
        setTimeout(() => {
          createProgressBar();
        }, 1000);
      });
    });
    createProgressBar();
  } else {
    count++;
    setTimeout(() => {
      if (count < 200) {
        init();
      }
    }, 300);
  }
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
