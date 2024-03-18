let count = 0;
const config = { childList: true, subtree: true };
const container = document.querySelector(".js-checkout-app");

function globalObserver(state) {
  if (state === "on") {
    observer.observe(container, config);
  }
  if (state === "off") {
    observer.disconnect();
  }
}

const mutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    const signInForm = document.getElementById("signin-signup-form");

    if (signInForm) {
      const signInAction = signInForm.action;

      if (signInAction.endsWith("signupLoyalty")) {
        globalObserver("off");
        signInForm
          .querySelector(".js-continue-without-account")
          .classList.add("is-hidden");
        globalObserver("on");
      }
    }
  }
};

const observer = new MutationObserver(mutationCallback);

const init = () => {
  if (container) {
    globalObserver("on");
  } else {
    if (count < 50 && !container) {
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
