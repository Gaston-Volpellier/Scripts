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

function createElt(tag, oAttr, content) {
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
}

function createPopinElt(useFullscreenPopin) {
  let wrapperSection,
    section,
    firstLine,
    firstContentDiv,
    userIcon,
    firstContent,
    closeIcon,
    mainContent;
  let ctnButtons, btn1, btn1Span, btn2, btn2Span;

  newCtn = createElt("div", {
    class:
      "dy-popin-login curved bg-white l-fixed fs--small bordered-grey-medium ff-normal dy-arrow ${Popin Desktop Size} ${Popin Mobile Tablet} ${Popin Mobile Size}",
  });

  section = createElt("section", { class: "l-relative l-vmargin--small" });

  firstLine = createElt("div", {
    class: "flex flex--space-between flex--align-center fs--medium text-black",
  });
  section.appendChild(firstLine);

  firstContentDiv = createElt("div", { class: "flex flex--justify-start" });

  userIcon = createElt(
    "div",
    { class: "l-hmargin--small" },
    '<svg role="presentation" class="icon-svg l-icon-margin fs--xlarge"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688084394767/img/svg/critical.svg#icon-my-account"></use></svg>'
  );
  firstContentDiv.appendChild(userIcon);

  firstContent = createElt("div", { class: "ff-semibold" }, "${Title}");
  firstContentDiv.appendChild(firstContent);
  firstLine.appendChild(firstContentDiv);

  closeIcon = createElt(
    "div",
    { class: "cursor-pointer" },
    '<svg role="presentation" aria-hidden="true" class="icon-svg " style="font-size: 3.5rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688052685667/img/svg//critical.svg#icon-close"></use></svg>'
  );
  firstLine.appendChild(closeIcon);

  if (useFullscreenPopin === "yes") {
    ctnPicture = createElt("img", { src: "${Picture}", class: "dy-flex-1" });
    newCtn.appendChild(ctnPicture);

    newCtn.classList.remove(
      "dy-arrow",
      "curved",
      "bordered-grey-medium",
      "${Popin Desktop Size}",
      "${Popin Mobile Tablet}",
      "${Popin Mobile Size}"
    );
    newCtn.classList.add("dy-popin-fullscreen", "flex");
    section.classList.remove("l-relative", "l-vmargin--small");
    section.classList.add(
      "dy-section",
      "flex",
      "flex--col",
      "flex--justify-center",
      "flex--align-center"
    );
    userIcon.classList.add("is-hidden");
    closeIcon.classList.add("l-absolute", "dy-top-right");
    firstContent.classList.add(
      "dy-font--xlarge",
      "l-vmargin--medium",
      "font-large"
    );
  }

  mainContent = createElt(
    "div",
    { class: "l-vmargin--medium fs--medium font-medium" },
    "${Content}"
  );

  ctnButtons = createElt("div", { class: "flex flex--justify-center" });

  btn1 = createElt("a", {
    class:
      "text-black btn--xsmall fs--medium l-hmargin--large btn-cta ff-normal font-label",
    href: "${Link Button 1}",
  });
  btn1Span = createElt(
    "span",
    { style: "padding-left: 1.5rem; padding-right: 1.5rem;" },
    "${Text Button 1}"
  );
  btn1.appendChild(btn1Span);
  ctnButtons.appendChild(btn1);

  btn2 = createElt("a", {
    class:
      "text-black btn--xsmall text-white fs--medium l-hmargin--large btn-cta ff-normal font-label btn--primary",
    href: "${Link Button 2}",
  });
  btn2Span = createElt(
    "span",
    { style: "padding-left: 1.5rem; padding-right: 1.5rem;" },
    "${Text Button 2}"
  );
  btn2.appendChild(btn2Span);
  ctnButtons.appendChild(btn2);

  section.appendChild(firstLine);
  section.appendChild(mainContent);
  section.appendChild(ctnButtons);
  newCtn.appendChild(section);

  return {
    newCtn: newCtn,
    closeIcon: closeIcon,
    btn1: btn1,
    btn2: btn2,
  };
}

function createPopin() {
  const btnLogin = document.querySelector("ul.menu-icons .myaccount-wrapper");
  const autoHide = "${Auto Hide Enabled}";
  const autoHideDelay = "${Auto Hide Delay}";
  const useFullscreenPopin = "${Use Fullscreen Popin}";

  const dyTagName = "${dyTagName}";
  const dyExperienceName = "${dyExperienceName}";
  const dyVariationName = "${dyVariationName}";

  let popinElt, newCtn, closeIcon, btn1, btn2;
  let popupCtn, popupInnerCtn;
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

  popinElt = createPopinElt(useFullscreenPopin);
  newCtn = popinElt.newCtn;
  closeIcon = popinElt.closeIcon;
  btn1 = popinElt.btn1;
  btn2 = popinElt.btn2;

  if (useFullscreenPopin === "yes") {
    popupCtn = document.querySelector(".popup-container");
    if (popupCtn) {
      popupInnerCtn = createElt("div", { class: "dy-center-screen" });
      popupCtn.appendChild(popupInnerCtn);
      popupInnerCtn.appendChild(newCtn);
      popupCtn.classList.add("popin-wrapper", "is-opened", "is-active");
    }
  } else {
    if (btnLogin) {
      headerMenuMain = document.querySelector(".header-menu-main");
      headerMenuMainParent = headerMenuMain.parentNode;
      headerMenuMainParent.insertBefore(newCtn, headerMenuMain);
      centeringElt(newCtn, btnLogin);
      window.addEventListener("resize", reportWindowSize);
    }
  }

  if (autoHide === "yes") {
    setTimeout(
      closePopin,
      autoHideDelay * 1000,
      newCtn,
      popupCtn,
      dyExperienceName,
      dyTagName,
      dyVariationName,
      "auto_hide_popin",
      removeResize
    );
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

  if (popupCtn) {
    popupCtn.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        closePopin(
          newCtn,
          popupCtn,
          dyExperienceName,
          dyTagName,
          dyVariationName,
          "layout_close_popin",
          removeResize
        );
      }
    });
  }

  btn1.addEventListener("click", function () {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "click_on_btn1");
  });

  btn2.addEventListener("click", function () {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "click_on_btn2");
  });
}

try {
  if (DY && DY.API) {
    DY.API("event", { name: "PTI-184" });
  }
  createPopin();
} catch (e) {
  console.log("DY | err", e);
}
