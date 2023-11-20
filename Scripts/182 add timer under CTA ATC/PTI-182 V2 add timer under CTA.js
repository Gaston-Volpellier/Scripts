function countdown(nextDate) {
  const fillZero = function (n) {
    return n < 10 ? "0" + n : n;
  };

  let lastTime = new Date(nextDate);
  lastTime = lastTime.getTime();
  let now = new Date();
  now = now.getTime();

  const delta = lastTime - now;
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((delta % (1000 * 60)) / 1000);

  const D = days; // fillZero(days);
  const H = hours > 0 ? hours + "h " : "";
  const M = fillZero(minutes);
  const S = fillZero(seconds);

  return delta <= 0
    ? 0
    : '<span class="ff-semibold">' + H + M + "mn " + S + "s</span>";
}

function init() {
  // DESK
  const btnAtcDesk = document.querySelector(".js-payment-reinsurance");

  // MOB
  const btnSizeMob = document.querySelector(".js-stock-alert + hr + hr + div");

  // MESSAGE
  const date = new Date();
  date.setHours(parseInt("${Hour}"));
  date.setMinutes(parseInt("${Minute}"));
  date.setSeconds(0);
  date.setMilliseconds(0);
  console.log("DY | date", date);

  let msg = "${Message}";
  let innerHtml = msg.replace("%%timer%%", countdown(date));

  // CREATE DESK MESSAGE
  const divDesk = document.createElement("div");
  divDesk.setAttribute(
    "class",
    "dy-desk-timer no-mob flex flex--justify-center flex--align-center fs--small ff-normal l-vmargin--large"
  );
  btnAtcDesk.parentNode.insertBefore(divDesk, btnAtcDesk);

  // CREATE MOB MESSAGE
  const divMob = document.createElement("div");
  divMob.setAttribute(
    "class",
    "dy-mob-timer no-desk no-tab padding-m-1 fs--small ff-normal bg-green-dy-light"
  );
  btnSizeMob.parentNode.insertBefore(divMob, btnSizeMob);

  divDesk.innerHTML = innerHtml;
  divMob.innerHTML = innerHtml;

  setInterval(function () {
    let time = countdown(date);
    time != false
      ? (innerHtml = msg.replace("%%timer%%", time))
      : (innerHtml = "");

    divDesk.innerHTML = innerHtml;
    divMob.innerHTML = innerHtml;
  }, 1000);
}

try {
  init();
} catch (e) {
  console.log("DY | e", e);
}
