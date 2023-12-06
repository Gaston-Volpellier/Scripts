// Tracking
function sendTracking(dyExperienceName, dyTagName, dyVariationName, area) {
  dataLayer.push({ event_data: null });
  dataLayer.push({
    event: "DY Event",
    eventAction: dyVariationName,
    eventCategory: dyTagName,
    eventLabel: area,
  });
}

function closePopin(
  newCtn,
  popupCtn,
  dyExperienceName,
  dyTagName,
  dyVariationName,
  eventName,
  cb
) {
  sendTracking(dyExperienceName, dyTagName, dyVariationName, eventName);
  if (popupCtn) {
    popupCtn.classList.remove("is-opened");
    setTimeout(function () {
      popupCtn.classList.remove("popin-wrapper");
      popupCtn.innerHTML = "";
    }, 400);
  } else {
    newCtn.remove();
  }

  if (typeof cb === "function") {
    cb();
  }
}

function centeringElt(newCtn, btnLogin) {
  const clientWidth = document.body.clientWidth;
  const btnLoginBounds = btnLogin.getBoundingClientRect();
  const newCtnWidth = newCtn.clientWidth;
  const xCenterBtnLogin = btnLoginBounds.x + btnLoginBounds.width / 2;

  let right, top, beforeX, rootVar;

  right = parseInt(clientWidth - xCenterBtnLogin - newCtnWidth / 2);
  top = btnLoginBounds.bottom + parseFloat("${Arrow Size}") * 10;

  if (window.matchMedia("(min-width: 1191px)").matches) {
    top -= 10;
  }

  if (right <= 0) {
    right = clientWidth / 25;
    /*if (window.matchMedia("(min-width: 1191px)").matches) {
      right = 20;
    }*/
  }

  beforeX =
    newCtnWidth -
    (clientWidth - xCenterBtnLogin) +
    right -
    (parseFloat("${Arrow Size}") * 10) / 2 +
    "px";
  rootVar = document.querySelector(":root");
  rootVar.style.setProperty("--dy-left", beforeX);
  newCtn.setAttribute("style", "right: " + right + "px; top: " + top + "px;");
}

let createElt = (tag, oAttr, content) => {
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

function createPopinElt() {
  let section,
    firstLine,
    firstContentDiv,
    userIcon,
    firstContent,
    closeIcon,
    mainContent;
  let ctnButtons, btn1, btn1Span;

  newCtn = createElt("div", {
    class:
      "dy-popin-login curved--large bg-white l-fixed font-small card-shadow--light dy-arrow ${Popin Desktop Size} ${Popin Mobile Tablet} ${Popin Mobile Size}",
  });

  section = createElt("section", { class: "l-relative l-vmargin--small" });

  firstLine = createElt("div", {
    class: "flex flex--space-between flex--align-center fs--medium text-black",
  });
  section.appendChild(firstLine);

  firstContentDiv = createElt("div", { class: "flex flex--justify-start" });

  userIcon = createElt(
    "div",
    { class: "l-hmargin--small iconSize" },
    '<svg role="presentation" class="icon-svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688084394767/img/svg/critical.svg#icon-my-account"></use></svg>'
  );
  firstContentDiv.appendChild(userIcon);

  firstContent = createElt("div", { class: "fw-bold" }, "${Title}");
  firstContentDiv.appendChild(firstContent);
  firstLine.appendChild(firstContentDiv);

  closeIcon = createElt(
    "div",
    { class: "cursor-pointer" },
    '<svg role="presentation" aria-hidden="true" class="icon-svg " style="font-size: 3.5rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688052685667/img/svg//critical.svg#icon-close"></use></svg>'
  );
  firstLine.appendChild(closeIcon);

  mainContent = createElt(
    "div",
    { class: "l-vmargin--medium font-small" },
    "${Content}"
  );

  ctnButtons = createElt("div", { class: "flex flex--justify-center" });

  btn1 = createElt("a", {
    class: "btn-cta btn--primary font-label l-hmargin--small",
    href: "${Link Button 1}",
  });
  btn1Span = createElt(
    "span",
    { style: "padding-left: 1.5rem; padding-right: 1.5rem;" },
    "${Text Button 1}"
  );
  btn1.appendChild(btn1Span);
  ctnButtons.appendChild(btn1);

  section.appendChild(firstLine);
  section.appendChild(mainContent);
  section.appendChild(ctnButtons);
  newCtn.appendChild(section);

  return {
    newCtn: newCtn,
    closeIcon: closeIcon,
    btn1: btn1,
  };
}

let createPopin = () => {
  const btnLogin = document.querySelector("ul.menu-icons .myaccount-wrapper");

  const dyTagName = "${dyTagName}";
  const dyExperienceName = "${dyExperienceName}";
  const dyVariationName = "${dyVariationName}";

  let popupCtn;
  let timeout;

  const reportWindowSize = function () {
    clearInterval(timeout);
    timeout = setTimeout(function () {
      centeringElt(newCtn, btnLogin);
    }, 100);
  };

  const removeResize = function () {
    window.removeEventListener("resize", reportWindowSize);
  };

  const popinElt = createPopinElt();
  const newCtn = popinElt.newCtn;
  const closeIcon = popinElt.closeIcon;
  const btn1 = popinElt.btn1;

  if (btnLogin) {
    headerMenuMain = document.querySelector(".header-menu-main");
    headerMenuMainParent = headerMenuMain.parentNode;
    headerMenuMainParent.insertBefore(newCtn, headerMenuMain);
    centeringElt(newCtn, btnLogin);
    window.addEventListener("resize", reportWindowSize);
  }

  // events
  closeIcon.addEventListener("click", function () {
    closePopin(
      newCtn,
      popupCtn,
      dyExperienceName,
      dyTagName,
      dyVariationName,
      "close_popin",
      removeResize
    );
  });

  btn1.addEventListener("click", function () {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "click_on_btn1");
  });
};

try {
  createPopin();
} catch (e) {
  console.log("DY | err", e);
}
