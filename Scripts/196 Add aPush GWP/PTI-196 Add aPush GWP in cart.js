let count = 0;

function eltFactory(type, attributes) {
  const elt = document.createElement(type);
  for (let attribute in attributes) {
    elt.setAttribute(attribute, attributes[attribute]);
  }
  return elt;
}

function isFirstCurrentStep(currentStep) {
  const currentStepParent = currentStep.parentElement;
  return currentStepParent.firstChild === currentStep;
}

function createLoggedCtn() {
  const newCtn = eltFactory("div", {
    class: "dy-gwp-content padding-1 l-vmargin--xlarge",
  });
  const classNewCtn =
    "flex l-fill-width l-vmargin--small curved--medium l-padding-around bg-primary";
  const innerCtn = eltFactory("div", { class: classNewCtn });

  const img = eltFactory("img", {
    src: "${GiftPicture}",
    width: "70",
    height: "70",
    class: "l-hmargin--large curved",
    style: "box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);",
  });
  innerCtn.appendChild(img);

  const contentCtn = eltFactory("div", { class: "text-white " });
  const title = "${Logged users title}";
  if (title !== "") {
    const titleCtn = eltFactory("div", {
      class: "l-vmargin--xsmall fw-bold",
    });
    titleCtn.innerHTML = title;

    contentCtn.appendChild(titleCtn);
  }
  const text = "${Logged users content}";
  if (text !== "") {
    const textCtn = eltFactory("div", {
      class: "font-small",
    });
    textCtn.innerHTML = text;

    contentCtn.appendChild(textCtn);
  }

  innerCtn.appendChild(contentCtn);
  newCtn.appendChild(innerCtn);

  return newCtn;
}

const replaceLogin = () => {
  const blockLogin = document.querySelector(".cart-login-block");
  if (blockLogin) {
    let buttonElement;
    blockLogin.classList.remove(
      "notification-message",
      "l-padding-around",
      "padding-1",
      "l-vspaced-row-m-2",
      "l-vspaced-row-1",
      "bordered"
    );

    blockLogin.classList.add("curved--large");

    Array.from(blockLogin.children).forEach((e) => {
      if (!e.querySelector("button")) {
        e.remove();
      } else {
        buttonElement = e;
      }
    });

    const pictContainer = eltFactory("div", {
      class:
        "flex flex--justify-center flex--align-center bg-grey l-overflow-hidden dy-pictBackground",
    });
    blockLogin.insertBefore(pictContainer, buttonElement);

    const section = eltFactory("section", {
      class:
        "flex flex--justify-center flex--col flex--align-center l-padding-around--large text-white bg-green ",
    });

    // TITLE
    const blockLoginTitle = eltFactory("div", {
      class: "l-vmargin--xsmall l-vmargin--large",
    });
    const blockLoginH3 = eltFactory("h3", {
      class: "fw-bold",
    });
    blockLoginH3.innerHTML = "${Title for guests}";
    blockLoginTitle.appendChild(blockLoginH3);
    section.appendChild(blockLoginTitle);
    blockLogin.appendChild(section);

    //CONTENT
    const blockLoginContent = eltFactory("div", {
      class: "l-vmargin--medium text-center",
    });
    const blockLoginContenP = eltFactory("h3");

    blockLoginContenP.innerHTML = "${Content guests}";
    blockLoginContent.appendChild(blockLoginContenP);
    section.appendChild(blockLoginContent);
    section.appendChild(buttonElement);
  }
};

function getUserStatus() {
  console.log("Getting user status", dataLayer);
  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (prop === "user_data") {
        if (dataLayer[i][prop].hasOwnProperty("user_id")) {
          console.log("DY | Is logged! ", i, dataLayer[i][prop]);
          return true;
        }
      }
    }
  }

  return false;
}

function createBox(selector) {
  const currentStep = document.querySelector(selector);
  const gwpContent = document.querySelector(".dy-gwp-content");
  const userStatus = getUserStatus();

  if (currentStep && !gwpContent) {
    if (isFirstCurrentStep(currentStep)) {
      if (!userStatus) {
        replaceLogin();
      } else {
        const refCtn = document.querySelector(".accordion");
        refCtn.parentElement.insertBefore(createLoggedCtn(), refCtn);
        if (!userStatus) {
          const hr = eltFactory("hr", {
            class: "l-vmargin--xlarge",
          });
          refCtn.parentNode.insertBefore(hr, refCtn);
        }
      }
    }
  }
}

function mutationCallback(mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.removedNodes) {
      if (mutation.removedNodes.length > 0) {
        mutation.removedNodes.forEach(function (currentValue) {
          if (
            currentValue.classList &&
            currentValue.classList.contains("cart-login-block")
          ) {
            createBox(".step-current");
          }
        });
      }
    }

    if (mutation.attributeName === "class") {
      if (mutation.target.className.indexOf("step-current") !== -1) {
        createBox(".step-current");
        break;
      }
    }
  }
}

function createMutationObserver(currentStep) {
  const config = { childList: true, subtree: true, attributes: true };
  const observer = new MutationObserver(mutationCallback);
  observer.observe(currentStep, config);
}

function init() {
  const gwpContent = document.querySelector(".dy-gwp-content");
  if (!gwpContent) {
    const currentStep = document.querySelector(".step-current");
    if (currentStep) {
      createBox(".step-current");
      createMutationObserver(currentStep);
    } else {
      if (count < 500 && !currentStep) {
        count++;
        setTimeout(init, 250);
      }
    }
  }
}

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}