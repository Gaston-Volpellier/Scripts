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

function createNoLoggedCtn(userStatus) {
  // Beware
  // userStatus is FALSE when user is logged
  const newCtn = eltFactory("div", {
    class: "dy-gwp-content padding-1 l-vmargin--xlarge",
  });
  const styleNewCtn = userStatus ? "" : "background-color: #ebf7f1";
  let classNewCtn = "flex l-fill-width l-vmargin--small";
  if (!userStatus) {
    classNewCtn += " curved--medium l-padding-around";
  }
  const innerCtn = eltFactory("div", {
    class: classNewCtn,
    style: styleNewCtn,
  });

  const widthImg = userStatus ? "24" : "70";

  const src = userStatus ? "${Club Lacoste Picture}" : "${Gift Picture}";
  const styleImg = userStatus
    ? ""
    : "box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);";
  const classImg = userStatus
    ? "l-hmargin--small curved"
    : "l-hmargin--large curved";
  const img = eltFactory("img", {
    src: src,
    width: widthImg,
    height: widthImg,
    class: classImg,
    style: styleImg,
  });
  innerCtn.appendChild(img);

  const contentCtn = eltFactory("div");
  const title = userStatus
    ? "${Title For Logged Users}"
    : "${Title For Guest Users}";
  if (title !== "") {
    const titleCtn = eltFactory("div", {
      class: "title--small l-vmargin--xsmall",
    });
    titleCtn.innerHTML = title;

    contentCtn.appendChild(titleCtn);
  }
  const text = userStatus
    ? "${Content For Logged Users}"
    : "${Content For Guest Users}";
  if (text !== "") {
    const textCtn = eltFactory("div", {
      class: "fs--small",
      style: "line-height: 1.4",
    });
    textCtn.innerHTML = text;

    contentCtn.appendChild(textCtn);
  }

  innerCtn.appendChild(contentCtn);
  newCtn.appendChild(innerCtn);

  return newCtn;
}

function changeBlockLogin() {
  const blockLogin = document.querySelector(
    ".cart-login-block .notification-message"
  );
  let blockLoginDiv;
  let ctaContainer;

  if (blockLogin) {
    blockLoginDiv = blockLogin.children;

    for (let i = blockLoginDiv.length - 1; i >= 0; i--) {
      if (!blockLoginDiv[i].querySelector("button")) {
        blockLoginDiv[i].remove();
      } else {
        ctaContainer = blockLoginDiv[i];
      }
    }

    // PICT
    const pictContainer = eltFactory("div", {
      class:
        "flex flex--justify-center flex--align-center bg-grey l-padding--small l-vmargin--large",
      style:
        "margin-top: -22px; margin-right: -22px; margin-left:-14px; border-radius: 5px 5px 0 0;",
    });
    const imgSrc = eltFactory("img", {
      src: "${GiftPicture In Block Login}",
      width: "${Gift Picture In Block Witdh}",
    });
    pictContainer.appendChild(imgSrc);
    blockLogin.insertBefore(pictContainer, ctaContainer);

    // TITLE
    const blockLoginTitle = eltFactory("div", {
      class: "l-vmargin--xsmall l-vmargin--large",
    });
    const blockLoginH3 = eltFactory("h3", {
      class: "title--large",
    });
    blockLoginH3.innerHTML = "${Block Login Title}";
    blockLoginTitle.appendChild(blockLoginH3);
    blockLogin.insertBefore(blockLoginTitle, ctaContainer);

    //CONTENT
    const blockLoginContent = eltFactory("div", {
      class: "text-grey l-fill-width l-vmargin--medium",
    });
    const blockLoginContenP = eltFactory("h3");

    blockLoginContenP.innerHTML = "${Block Login Content}";
    blockLoginContent.appendChild(blockLoginContenP);
    blockLogin.insertBefore(blockLoginContent, ctaContainer);
  }
}

function getUserStatus() {
  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (prop === "user_data") {
        if (dataLayer[i][prop].hasOwnProperty("user_id")) {
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
  let refCtn, hr;

  if (currentStep && !gwpContent) {
    if (isFirstCurrentStep(currentStep)) {
      if (!userStatus) {
        changeBlockLogin();
      } else {
        refCtn = document.querySelector(".accordion");
        refCtn.parentNode.insertBefore(createNoLoggedCtn(!userStatus), refCtn);
        if (!userStatus) {
          hr = eltFactory("hr", {
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
        mutation.removedNodes.forEach(function (
          currentValue,
          currentIndex,
          listObj
        ) {
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
