function sendTracking(dyExperienceName, dyTagName, dyVariationName, area) {
  console.log(
    "DY | Sending tracking: ",
    dyExperienceName,
    dyTagName,
    dyVariationName,
    area
  );
  //   dataLayer.push({ event_data: null });
  //   dataLayer.push({
  //     event: "DY Event",
  //     eventAction: dyVariationName,
  //     eventCategory: dyTagName,
  //     eventLabel: area,
  //   });
}

function closePopin(
  newCtn,
  popupCtn,
  dyExperienceName,
  dyTagName,
  dyVariationName,
  eventName
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

const createPopinElt = () => {
  const newCtn = createElt("div", {
    class: "dy-popin-login bg-white l-fixed dy-popin-fullscreen flex",
  });

  ctnPicture = createElt("img", { src: "${Picture}", class: "" });
  newCtn.appendChild(ctnPicture);

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
    { class: "l-hmargin--small" },
    '<svg role="presentation" class="icon-svg l-icon-margin fs--xlarge"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688084394767/img/svg/critical.svg#icon-my-account"></use></svg>'
  );
  firstContentDiv.appendChild(userIcon);

  const firstContent = createElt("div", { class: "ff-semibold" }, "${Title}");
  firstContentDiv.appendChild(firstContent);
  firstLine.appendChild(firstContentDiv);

  const closeIcon = createElt(
    "div",
    { class: "cursor-pointer" },
    '<svg role="presentation" aria-hidden="true" class="icon-svg " style="font-size: 3.5rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688052685667/img/svg//critical.svg#icon-close"></use></svg>'
  );
  firstLine.appendChild(closeIcon);

  newCtn.classList.add("dy-popin-fullscreen", "flex");
  //   section.classList.remove("l-relative", "l-vmargin--small");
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

  const mainContent = createElt(
    "div",
    { class: "l-vmargin--medium fs--medium font-medium" },
    "${Content}"
  );

  const ctnButtons = createElt("div", { class: "flex flex--justify-center" });

  const btn1 = createElt("a", {
    class:
      "text-black btn--xsmall fs--medium l-hmargin--large btn-cta ff-normal font-label",
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
    class:
      "text-black btn--xsmall text-white fs--medium l-hmargin--large btn-cta ff-normal font-label btn--primary",
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
  console.log("DY | Initializing");
  const dyTagName = "${dyTagName}";
  const dyExperienceName = "${dyExperienceName}";
  const dyVariationName = "${dyVariationName}";

  const popupCtn = document.querySelector(".popup-container");

  const popinElt = createPopinElt();
  const newCtn = popinElt.newCtn;
  const closeIcon = popinElt.closeIcon;
  const btn1 = popinElt.btn1;
  const btn2 = popinElt.btn2;

  if (popupCtn) {
    const popupInnerCtn = createElt("div", { class: "dy-center-screen" });
    popupCtn.appendChild(popupInnerCtn);
    popupInnerCtn.appendChild(newCtn);
    popupCtn.classList.add("popin-wrapper", "is-opened", "is-active");
  }

  // events
  closeIcon.addEventListener("click", function () {
    closePopin(
      newCtn,
      popupCtn,
      dyExperienceName,
      dyTagName,
      dyVariationName,
      "close_popin"
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
          "layout_close_popin"
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
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
