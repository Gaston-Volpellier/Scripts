const dyTagName = "${dyTagName}";
const dyExperienceName = "${dyExperienceName}";
const dyVariationName = "${dyVariationName}";
const timeout = parseInt("${Timeout}");

let timerEnd;
let popinTimer;
let remainingTime = timeout;
let count = 0;

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

const sendTracking = (dyExperienceName, dyTagName, dyVariationName, area) => {
  dataLayer.push({ event_data: null });
  dataLayer.push({
    event: "DY Event",
    eventAction: dyTagName,
    eventCategory: "DY Smart Action",
    eventLabel: dyVariationName + " - " + area,
  });
};

const pausePopinTimer = () => {
  const progressBar = document.querySelector(".progress");
  progressBar.classList.add("animation-paused");

  sendTracking(dyExperienceName, dyTagName, dyVariationName, "mouse_over");

  // gets remaining time.
  remainingTime = timerEnd - new Date().getTime();
  clearTimeout(popinTimer);
};

const resumePopinTimer = () => {
  const progressBar = document.querySelector(".progress");

  // sets the new end moment.
  timerEnd = new Date().getTime() + remainingTime;
  progressBar.classList.remove("animation-paused");
  popinTimer = setTimeout(closePopin, remainingTime, "closed_timeout");
};

const closePopin = (method) => {
  const notification = document.getElementById("dy-notification-container");

  clearTimeout(popinTimer);
  notification.removeEventListener("mouseleave", resumePopinTimer);

  sendTracking(dyExperienceName, dyTagName, dyVariationName, method);

  if (notification) {
    notification.classList.add("dismissed");

    // awaits for the dismiss animation.
    setTimeout(() => {
      notification.remove();
    }, 300);
  }
};

const createPopinElt = () => {
  const sectionCtn = createElt("section", {
    class:
      "js-notif notification l-relative l-overflow-hidden bg-primary pointer-auto above l-fill-width l-vmargin--small",
    id: "dy-notification-container",
  });

  const timerCtn = createElt("div", {
    class: "progress-wrapper l-absolute l-fill-width",
  });

  const timer = createElt("div", {
    class: "progress bg-white l-fill ",
    style: "--notification-timeout: ${Timeout}ms",
  });

  const mainCtn = createElt("div", {
    class: "flex flex--align-start font-medium text-white",
  });

  const infoIcon = createElt(
    "div",
    { class: "no-flex--shrink l-hmargin--small message-info iconSize" },
    '<svg role="presentation" class="icon-svg message-icon l-hmargin--small rounded no-flex--resize large-icon" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/default/v1705457938392/img/svg//non-critical.svg#icon-info"></use></svg>'
  );

  const infoCtn = createElt("div", {
    class: "flex flex--col flex--basis-full",
  });

  const title = createElt("p", {
    class: "fw-bold",
  });
  title.innerHTML = "${Title}";

  const text = createElt("p");
  text.innerHTML = "${Description}";

  const closeIconCtn = createElt("div", { class: "l-padding-around" });

  const closeIcon = createElt(
    "a",
    {
      class: "js-notification-close l-absolute l-corner",
      style: "top: 20px",
    },
    '<svg role="presentation" class="icon-svg" style="font-size: 3.5rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/default/v1704471614151/img/svg//critical.svg#icon-close"></use></svg>'
  );
  closeIcon.addEventListener("click", () => closePopin("closed_dismissed"));

  const ctaCtn = createElt("div", {
    class: "cta-container font-medium flex flex--justify-end",
  });

  const cta = createElt("a", {
    class: "btn-cta font-label  js-btn-cta l-hmargin--large ",
    href: "${Link Button}",
  });

  const ctaText = createElt("span", { class: "" });
  ctaText.innerHTML = "${Cta text}";

  cta.addEventListener("click", function () {
    sendTracking(dyExperienceName, dyTagName, dyVariationName, "click_on_cta");
  });

  timerCtn.appendChild(timer);
  mainCtn.appendChild(infoIcon);
  infoCtn.appendChild(title);
  infoCtn.appendChild(text);
  mainCtn.appendChild(infoCtn);
  closeIconCtn.appendChild(closeIcon);
  mainCtn.appendChild(closeIconCtn);
  cta.appendChild(ctaText);
  ctaCtn.appendChild(cta);
  sectionCtn.appendChild(timerCtn);
  sectionCtn.appendChild(mainCtn);
  sectionCtn.appendChild(ctaCtn);

  return sectionCtn;
};

const createPopin = () => {
  const aside = document.getElementsByTagName("aside")[0];
  if (aside) {
    const notification = createPopinElt();
    aside.appendChild(notification);
    notification.addEventListener("mouseenter", pausePopinTimer);
    notification.addEventListener("mouseleave", resumePopinTimer);

    // sets timer & registers when it should end.
    timerEnd = new Date().getTime() + timeout;
    popinTimer = setTimeout(closePopin, timeout, "closed_timeout");
  }
};

const init = () => {
  console.log("DY | Running PTI 203");
  const minicart =
    document.querySelector(".js-minicart-link").lastElementChild
      .firstElementChild;

  if (minicart) {
    // checks if there's items in the cart.

    const minicartHTML = minicart.innerHTML;
    const minicartNumber = parseInt(
      minicartHTML.replace(/\r?\n|\r/g, "").trim()
    );

    minicartNumber > 0 ? createPopin() : null;
  } else {
    if (count < 100 && !minicart) {
      count++;
      setTimeout(init, 250);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
