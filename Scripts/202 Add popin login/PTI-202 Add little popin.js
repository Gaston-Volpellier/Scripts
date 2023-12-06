const sendTracking = (dyExperienceName, dyTagName, dyVariationName, area) => {
  dataLayer.push({ event_data: null });
  dataLayer.push({
    event: "DY Event",
    eventAction: dyTagName,
    eventCategory: "DY Smart Action",
    eventLabel: dyVariationName + " - " + area,
  });
};

const closePopin = (
  newCtn,
  popupCtn,
  dyExperienceName,
  dyTagName,
  dyVariationName,
  eventName,
  cb
) => {
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
};

const centeringElt = (newCtn, btnLogin) => {
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
};

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

const createPopinElt = () => {
  const newCtn = createElt("div", {
    class:
      "dy-popin-login curved--large bg-white l-fixed font-small card-shadow--light dy-arrow ${Popin Desktop Size} ${Popin Mobile Tablet} ${Popin Mobile Size}",
  });

  const section = createElt("section", {
    class: "l-relative l-vmargin--small",
  });

  const firstLine = createElt("div", {
    class: "flex flex--space-between flex--align-center fs--medium text-black",
  });
  section.appendChild(firstLine);

  const firstContentDiv = createElt("div", {
    class: "flex flex--justify-start",
  });

  const userIcon = createElt(
    "div",
    { class: "l-hmargin--xsmall iconSize" },
    '<svg role="presentation" class="icon-svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688084394767/img/svg/critical.svg#icon-my-account"></use></svg>'
  );
  firstContentDiv.appendChild(userIcon);

  const firstContent = createElt("div", { class: "fw-bold" }, "${Title}");
  firstContentDiv.appendChild(firstContent);
  firstLine.appendChild(firstContentDiv);

  const closeIcon = createElt(
    "div",
    { class: "cursor-pointer" },
    '<svg role="presentation" aria-hidden="true" class="icon-svg " style="font-size: 3.5rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688052685667/img/svg//critical.svg#icon-close"></use></svg>'
  );
  firstLine.appendChild(closeIcon);

  const mainContent = createElt(
    "div",
    { class: "l-vmargin--medium font-small" },
    "${Content}"
  );

  const ctnButtons = createElt("div", { class: "flex flex--justify-center" });

  const btn1 = createElt("a", {
    class: "btn-cta btn--primary font-label l-hmargin--small",
    href: "${Link Button 1}",
  });
  const btn1Span = createElt(
    "span",
    { style: "padding-left: 1.5rem; padding-right: 1.5rem;" },
    "${Text Button 1}"
  );
  btn1.appendChild(btn1Span);
  ctnButtons.appendChild(btn1);

  const btn2 = createElt("a", {
    class: "btn-cta font-label l-hmargin--small",
    href: "${Link Button 2}",
  });

  const btn2Span = createElt(
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
};

const init = () => {
  const dyTagName = "${dyTagName}";
  const dyExperienceName = "${dyExperienceName}";
  const dyVariationName = "${dyVariationName}";
  const btnLogin = document.querySelector("ul.menu-icons .myaccount-wrapper");
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
  const btn2 = popinElt.btn2;

  if (btnLogin) {
    headerMenuMain = document.querySelector(".header-menu-main");
    headerMenuMainParent = headerMenuMain.parentNode;
    headerMenuMainParent.insertBefore(newCtn, headerMenuMain);
    centeringElt(newCtn, btnLogin);
    window.addEventListener("resize", reportWindowSize);
  }

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

  btn2.addEventListener("click", function () {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "click_on_btn2");
  });
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
