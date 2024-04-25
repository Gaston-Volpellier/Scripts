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

const countdown = (nextDate) => {
  const fillZero = function (n) {
    return n < 10 ? "0" + n : n;
  };

  let lastTime = new Date(nextDate);
  lastTime = lastTime.getTime();
  let now = new Date();
  now = now.getTime();

  const delta = lastTime - now;
  const showTimer = delta < 0 ? false : true;
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((delta % (1000 * 60)) / 1000);

  const M = fillZero(minutes);
  // const S = fillZero(seconds);

  let html = '<span class="fw-bold">';

  if (hours > 0) {
    html = hours == 1 ? html + hours + "h " : html + hours + "hs ";
  }
  html = html + M + "min</span>";

  return {
    showTimer: showTimer,
    html: html,
  };
};

const createTimer = (msg) => {
  const deskCta = document.querySelector(".js-pdp-sticky-atc");
  const mobileCta = document.querySelector(".js-buy-or-notify-banner");
  const mobileBanner = document.querySelector(".js-sticky-banner");

  if (deskCta && mobileCta) {
    const date = new Date();
    date.setHours(parseInt("${Hour}"));
    date.setMinutes(parseInt("${Minute}"));
    date.setSeconds(0);
    date.setMilliseconds(0);

    const timer = countdown(date);

    if (timer.showTimer) {
      let timerMsg = msg.replace("%timer%", timer.html);
      mobileBanner ? mobileBanner.classList.add("dy-sticky") : null;

      // CREATE DESK MESSAGE
      const deskCtn = createElt("div", {
        class:
          "dy-desk-timer flex flex--justify-center bg-grey-ultralight l-padding-around--small",
      });
      const deskSpan = createElt(
        "span",
        { class: "text-primary text-center font-small l-hmargin--xsmall" },
        timerMsg
      );
      deskCtn.appendChild(deskSpan);
      deskCta.appendChild(deskCtn);

      // CREATE MOB MESSAGE
      const mobileCtn = createElt("div", {
        class:
          "dy-mob-timer flex flex--justify-center bg-grey-ultralight l-padding-around--small",
      });
      const mobSpan = createElt(
        "span",
        { class: "text-primary text-center font-small l-hmargin--xsmall" },
        timerMsg
      );

      mobileCtn.appendChild(mobSpan);

      const elevateCta = "${Elevate mobile CTA in px}";
      // Sets the height of the mobile CTA.
      if (elevateCta !== "") {
        document.querySelector(".dy-sticky").style.height = elevateCta + "px";
      }

      // we must delay the mobile appendChild, because it is modified later.
      setTimeout(() => {
        mobileCta.insertBefore(mobileCtn, mobileCta.firstElementChild);

        // mobileCta.appendChild(mobileCtn);
        mobileCta.classList.add("flex--col");

        setInterval(function () {
          const currentTime = countdown(date);
          if (currentTime.showTimer) {
            timerMsg = msg.replace("%timer%", currentTime.html);
            deskSpan.innerHTML = timerMsg;
            mobSpan.innerHTML = timerMsg;
          } else {
            const deskTimer = document.querySelector(".dy-desk-timer");
            const mobTimer = document.querySelector(".dy-mob-timer");

            deskTimer ? deskTimer.remove() : null;
            mobTimer ? mobTimer.remove() : null;
          }
        }, 1000);
      }, 2000);
    } else {
      // the countdown is complete
      const deskTimer = document.querySelector("dy-desk-timer");
      const mobTimer = document.querySelector("dy-mob-timer");

      deskTimer ? deskTimer.remove() : null;
      mobTimer ? mobTimer.remove() : null;
      mobileBanner.classList.remove("dy-sticky");
    }
  } else {
    if (count < 20) {
      count++;
      setTimeout(() => {
        createTimer();
      }, 100);
    }
  }
};

const addSpan = (text) => {
  const deskCta = document.querySelector(".js-pdp-sticky-atc");
  const mobileCta = document.querySelector(".js-buy-or-notify-banner");

  if (deskCta && mobileCta) {
    // desktop span
    const deskCtn = createElt("div", {
      class:
        "flex flex--justify-center bg-grey-ultralight l-padding-around--small",
    });
    const deskSpan = createElt(
      "span",
      { class: "text-primary text-center font-small l-hmargin--xsmall" },
      text
    );

    deskCtn.appendChild(deskSpan);

    deskCta.appendChild(deskCtn);

    // mobile span
    const mobileCtn = createElt("div", {
      class:
        "dy-mob-message flex flex--justify-center no-desk no-tab bg-grey-ultralight l-padding-around--small",
    });
    const mobileSpan = createElt(
      "span",
      { class: "text-primary text-center font-small l-hmargin--xsmall" },
      text
    );

    mobileCtn.appendChild(mobileSpan);

    // we must delay the mobile appendChild, because it is modified later.
    setTimeout(() => {
      mobileCta.insertBefore(mobileCtn, mobileCta.firstElementChild);
      mobileCta.classList.add("flex--col");

      const mobileBanner = document.querySelector(".js-sticky-banner");
      mobileBanner ? mobileBanner.classList.add("dy-sticky") : null;
      const elevateCta = "${Elevate mobile CTA in px}";
      // Sets the height of the mobile CTA.
      if (elevateCta !== "") {
        document.querySelector(".dy-sticky").style.height = elevateCta + "px";
      }
    }, 2000);
  } else {
    if (count < 20) {
      count++;
      setTimeout(() => {
        addSpan(text);
      }, 100);
    }
  }
};

const getDayName = (locale) => {
  const now = new Date().getTime();
  const date = now + 48 * 60 * 60 * 1000;

  return {
    day: new Date(date).toLocaleDateString(locale, { day: "numeric" }),
    month: new Date(date).toLocaleDateString(locale, { month: "long" }),
  };
};

const modifyText = (text) => {
  const zone = "${Date language}";

  const deliveryDate = getDayName(zone);
  const modifiedText = text.replace("%day%", deliveryDate.day);

  return modifiedText.replace("#month#", deliveryDate.month);
};

const init = () => {
  const text = "${Text}";
  const variation = "${Select variation}";

  console.log("DY | PTI-216 Running ", variation);
  if (variation === "phrase") {
    addSpan(text);
  }
  if (variation === "estimatedDate") {
    addSpan(modifyText(text));
  }

  if (variation === "timer") {
    createTimer(text);
  }
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
