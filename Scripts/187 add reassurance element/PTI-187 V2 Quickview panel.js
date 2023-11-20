const elementCreate = (type, attributes) => {
  const element = document.createElement(type);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
};

const getDaySuffix = (date) =>
  date % 10 == 1 && date % 100 != 11
    ? "st"
    : date % 10 == 2 && date % 100 != 12
    ? "nd"
    : date % 10 == 3 && date % 100 != 13
    ? "rd"
    : "th";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const instances = [
  {
    line1: "${deliveryLine1}",
    line2: "${deliveryLine2}",
    line3: "${deliveryLine3}",
    imgSrc: "${deliveryImage}",
    hasDate: true,
  },
  {
    line1: "${storeLine1}",
    line2: "${storeLine2}",
    imgSrc: "${storeImage}",
  },
  {
    line1: "${returnLine1}",
    line2: "${returnLine2}",
    imgSrc: "${returnImage}",
  },
];

const createNewSection = () => {
  let delay;
  const today = new Date();
  const deliveryDate = new Date(today);

  deliveryDate.getDay() === 0 ? (delay = 2) : (delay = 1);
  deliveryDate.setDate(today.getDate() + delay);

  const deliveryDateNum = deliveryDate.getDate();
  const deliveryDateSuffix = getDaySuffix(deliveryDateNum);

  const reassuranceCtn = elementCreate("div", {
    class: "dy-reassurance l-vmargin--large",
  });

  const sectionTitle = elementCreate("div", {
    class: "title--large l-vmargin--large",
  });
  sectionTitle.innerHTML = "${Title}";
  reassuranceCtn.appendChild(sectionTitle);

  instances.forEach((instance) => {
    const hr = elementCreate("hr", { class: "l-vmargin--medium" });
    const container = elementCreate("div", {
      class: "flex flex-mt--align-start l-hmargin--small fs--medium ",
    });
    const img = elementCreate("img", {
      src: instance.imgSrc,
      class: "l-hmargin--large imageSmall",
    });
    const contentCtn = elementCreate("div");
    const line1 = elementCreate("p", {
      class: "l-vmargin--small",
    });
    line1.innerHTML = instance.line1;
    const line2 = elementCreate("p", {
      class: "l-vmargin--small",
    });
    if (instance.hasDate) {
      line2.innerHTML =
        instance.line2 +
        " <b>" +
        weekday[deliveryDate.getDay()] +
        " " +
        deliveryDateNum +
        deliveryDateSuffix +
        " " +
        month[deliveryDate.getMonth()] +
        " " +
        deliveryDate.getFullYear() +
        "</b>";
    } else {
      line2.innerHTML = instance.line2;
    }

    contentCtn.appendChild(line1);
    contentCtn.appendChild(line2);
    if (instance.line3) {
      const line3 = elementCreate("p", {
        class: "l-vmargin--small",
      });
      line3.innerHTML = instance.line3;
      contentCtn.appendChild(line3);
    }
    container.appendChild(img);
    container.appendChild(contentCtn);
    reassuranceCtn.appendChild(container);
    reassuranceCtn.appendChild(hr);
  });

  return reassuranceCtn;
};

const handleChange = () => {
  const container = document.querySelector(".js-quick-view-scroll");
  const dyCtn = document.querySelector(".dy-reassurance");

  // If it finds the container & the section is not already added.
  if (container && !dyCtn) {
    const reassuranceCtn = createNewSection();

    // adds an element after the last child of the container.
    container.lastElementChild.parentNode.insertBefore(
      reassuranceCtn,
      container.lastElementChild.nextSibling
    );
  }
};

const init = () => {
  try {
    const container = document.querySelector(
      ".js-popin-container.popin-container"
    );

    if (container) {
      mutationObserver = new MutationObserver(handleChange);
      mutationObserver.observe(container, { attributes: true, subtree: true });
    }
  } catch (e) {
    console.log("DY | error", e);
  }
};
init();
