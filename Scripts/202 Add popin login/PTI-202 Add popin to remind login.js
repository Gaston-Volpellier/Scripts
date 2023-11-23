const items = [
  {
    iconSrc: "${Icon item 1}",
    content: "${Content item 1}",
  },
  {
    iconSrc: "${Icon item 2}",
    content: "${Content item 2}",
  },
  {
    iconSrc: "${Icon item 3}",
    content: "${Content item 3}",
  },
];

function sendTracking(dyTagName, dyVariationName, area) {
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
    class:
      "dy-popin-login bg-white l-fixed l-padding-around--medium dy-popin-fullscreen flex",
  });

  const innerCtn = createElt("div", {
    class: "dy-popin-width",
  });

  const ctnPictureDesk = createElt("img", {
    src: "${Desktop Picture}",
    class: "dy-img-desk l-vmargin-row-mt-1",
  });
  // Borrar
  const pepe = "${Picture}";

  const ctnPictureMobile = createElt("img", {
    src: "${Mobile Picture}",
    class: "dy-img-mob l-vmargin-row-mt-1",
  });

  innerCtn.appendChild(ctnPictureDesk);
  innerCtn.appendChild(ctnPictureMobile);
  newCtn.appendChild(innerCtn);

  const section = createElt("section", {
    class: "l-relative l-vmargin--small l-padding-around--medium dy-section",
  });

  const closeIcon = createElt(
    "div",
    { class: "cursor-pointer l-absolute dy-top-right" },
    '<svg role="presentation" aria-hidden="true" class="icon-svg " style="font-size: 3.5rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/fr/v1688052685667/img/svg//critical.svg#icon-close"></use></svg>'
  );
  section.appendChild(closeIcon);
  const firstLine = createElt("div", {
    class: "",
  });
  section.appendChild(firstLine);

  const title = createElt(
    "div",
    { class: "fw-bold l-vmargin--medium dy-font--large" },
    "${Title}"
  );
  firstLine.appendChild(title);

  const mainContent = createElt("div", {
    class: "l-vmargin--large font-medium",
  });

  items.forEach((item) => {
    // to align left remove justify center.
    const iconDiv = createElt(
      "div",
      {
        class: "flex flex--align-center l-vmargin--xsmall dy-iconCtn",
      },
      '<svg role="presentation" class="icon-svg l-hmargin--large dy-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/default/v1700491094150/img/svg/non-critical.svg#' +
        item.iconSrc +
        '"></use></svg>'
    );
    const text = createElt(
      "div",
      { class: "font-medium text-start" },
      item.content
    );
    iconDiv.appendChild(text);

    mainContent.appendChild(iconDiv);
  });

  // buttons section
  const ctnButtons = createElt("div", {
    class: "flex flex--justify-center",
  });

  const btn1 = createElt("a", {
    class: "btn-cta font-label l-hmargin--large l-vmargin--medium",
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
    class: "btn-cta btn--primary font-label l-hmargin--small l-vmargin--medium",
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
  innerCtn.appendChild(section);

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
