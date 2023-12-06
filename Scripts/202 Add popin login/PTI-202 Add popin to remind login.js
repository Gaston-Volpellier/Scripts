const items = [
  {
    content: "${Content item 1}",
    iconPath: "${Path 1}",
  },
  {
    content: "${Content item 2}",
    iconPath: "${Path 2}",
  },
  {
    content: "${Content item 3}",
    iconPath: "${Path 3}",
  },
];

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
  eventName
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
      "dy-popin-login bg-white l-fixed l-padding-around--medium dy-popin-fullscreen flex",
  });

  const innerCtn = createElt("div", {
    class: "dy-popin-width",
  });

  const ctnPictureDesk = createElt("img", {
    src: "${Desktop Picture}",
    class: "dy-img-desk l-vmargin-row-mt-1",
  });

  const ctnPictureMobile = createElt("img", {
    src: "${Mobile Picture}",
    class: "dy-img-mob l-vmargin-row-mt-1",
  });

  innerCtn.appendChild(ctnPictureDesk);
  innerCtn.appendChild(ctnPictureMobile);
  newCtn.appendChild(innerCtn);

  const section = createElt("section", {
    class:
      "l-relative l-vmargin--small l-padding-around--medium flex--col flex--space-around dy-section",
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
    class: "l-vmargin--large font-medium dy-main-content",
  });

  const subTitle = createElt(
    "div",
    { class: "font-medium l-vmargin--small fw-bold " },
    "${Subtitle}"
  );

  mainContent.appendChild(subTitle);

  items.forEach((item) => {
    const iconDiv = createElt("div", {
      class: "flex flex--align-center l-vmargin--xsmall dy-iconCtn",
    });

    const SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    SVG.setAttribute("role", "presentation");
    SVG.setAttribute("class", "l-hmargin--small dy-icon-style");
    SVG.setAttribute("fill", "none");
    SVG.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttributeNS(null, "d", item.iconPath);
    path.setAttribute("fill", "#002D18");

    SVG.appendChild(path);
    iconDiv.appendChild(SVG);

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

  const btn = createElt("a", {
    class: "btn-cta btn--primary font-label l-hmargin--small l-vmargin--medium",
    href: "${Link Button}",
  });
  const btnSpan = createElt(
    "span",
    { style: "padding-left: 1.5rem; padding-right: 1.5rem;" },
    "${Text Button}"
  );
  btn.appendChild(btnSpan);
  ctnButtons.appendChild(btn);

  const hyperTextCtn = createElt("div", {
    class: "flex flex--justify-center",
  });
  const link = createElt("a", {
    href: "${hyperText link}",
  });
  const hyperText = createElt(
    "span",
    { class: "reverse-link font-small" },
    "${hyperText text}"
  );
  link.appendChild(hyperText);
  hyperTextCtn.appendChild(link);

  section.appendChild(firstLine);
  section.appendChild(mainContent);
  section.appendChild(ctnButtons);
  section.appendChild(hyperTextCtn);
  innerCtn.appendChild(section);

  return {
    newCtn: newCtn,
    closeIcon: closeIcon,
    btn: btn,
    hyperText: hyperText,
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
  const btn = popinElt.btn;
  const hyperText = popinElt.hyperText;

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

  btn.addEventListener("click", function () {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "click_on_btn");
  });

  hyperText.addEventListener("click", function () {
    sendTracking(
      dyExperienceName,
      dyTagName,
      dyVariationName,
      "click_on_hyper"
    );
  });
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
