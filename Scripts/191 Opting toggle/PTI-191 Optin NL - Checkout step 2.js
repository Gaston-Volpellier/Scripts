function pushTracking(e) {
  if (e.currentTarget.checked && dataLayer) {
    dataLayer.push({
      event: "DY Event",
      eventCategory: "DY Smart Action",
      eventAction: "${dyTagName}",
      eventLabel: "${dyTagName}" + " (" + "${dyVariationName}" + " | optin-nl)",
    });
  }
}

function eltFactory(type, attributes) {
  const elt = document.createElement(type);
  for (let attribute in attributes) {
    elt.setAttribute(attribute, attributes[attribute]);
  }
  return elt;
}

function createHeader(addIcon) {
  const titleCtn = eltFactory("div", {
    class: "flex l-vmargin--small",
  });
  if (addIcon) {
    const picCtn = eltFactory("img", {
      src: "${Gift Icon}",
      style: "margin-right: 7px;",
      width: "24",
      height: "24",
    });
    titleCtn.appendChild(picCtn);
  }

  const contentCtn = eltFactory("div", {
    class: "fs-medium ff-semibold",
  });
  contentCtn.innerHTML = "${Title}";

  titleCtn.appendChild(contentCtn);
  return titleCtn;
}

function init() {
  const useThisAsControl = "${Use this variation as control}";
  const signinSignupRegister = document.querySelector(
    "#signin_signup-optin-true"
  );
  const signinSignupContext = document.querySelector("#signin_signup-context");
  const displayToggle = "${Display Toggle ckeckbox}";

  let headerCtn;
  let parentCtn;
  let signinSignupContextCtn;
  let signinSignupRegisterCtnParent;
  let signinSignupRegisterCtnLabel;
  let signinSignupRegisterCtnInput;
  let signinSignupRegisterCtn;

  if (signinSignupRegister) {
    signinSignupRegisterCtn = signinSignupRegister.parentNode.parentNode;
    signinSignupRegisterCtnLabel =
      signinSignupRegisterCtn.querySelector("label p");

    if (signinSignupRegisterCtnLabel) {
      signinSignupRegisterCtnLabel.innerHTML = "${Label}";
    }
  }

  if (signinSignupContext) {
    signinSignupContextCtn = signinSignupContext.parentNode;
  }

  if (signinSignupRegister && signinSignupContext) {
    parentCtn = signinSignupContextCtn.parentNode;
    signinSignupRegisterCtnInput =
      signinSignupRegisterCtn.querySelector("input");
    signinSignupRegisterCtnInput.addEventListener("click", pushTracking);
    if (useThisAsControl !== "yes") {
      if (displayToggle === "yes") {
        headerCtn = createHeader(false);
        signinSignupRegisterCtnInput.classList.remove("checkbox-custom");
        signinSignupRegisterCtnInput.classList.add(
          "toggle",
          "no-appearence",
          "l-hmargin--small"
        );
        signinSignupRegisterCtnParent = signinSignupRegister.parentNode;
        signinSignupRegisterCtnParent.classList.remove("grid");
        signinSignupRegisterCtnParent.classList.add("flex");
      } else {
        headerCtn = createHeader(true);
      }
      parentCtn.insertBefore(headerCtn, signinSignupContextCtn);
      parentCtn.insertBefore(signinSignupRegisterCtn, signinSignupContextCtn);
    }
  }
}

try {
  setTimeout(init, 1500);
} catch (e) {
  console.log("DY | error", e);
}
