const elementCreate = (type, attributes, content) => {
  const element = document.createElement(type);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  content ? (element.innerHTML = content) : null;

  return element;
};

const createPopinElt = () => {
  const popInCtn = elementCreate("div", {
    class: "dy-popin-cart curved--large l-fixed font-small bordered--grey ",
  });

  const section = elementCreate("section", {
    class: "l-relative l-vmargin--small",
  });
  popInCtn.appendChild(section);

  const firstLine = createElt("div", {
    class: "flex flex--space-between flex--align-center",
  });
  section.appendChild(firstLine);

  const firstCtn = elementCreate("div", {
    class: "flex flex--space-between flex--align-center font-medium",
  });
  firstLine.appendChild(firstCtn);

  const userIcon = createElt(
    "div",
    { class: "l-hmargin--small" },
    '<svg role="presentation" class="icon-svg l-hmargin--large"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/on/demandware.static/Sites-FR-Site/-/default/v1699869134156/img/svg/critical.svg#icon-my-account"></use></svg>'
  );
  firstCtn.appendChild(userIcon);

  const title = createElt("div", { class: "ff-semibold" }, "${Title}");
  firstCtn.appendChild(title);

  const secondCtn = createElt("div", { class: "flex flex--justify-start" });
  section.appendChild(secondCtn);
  const ctnButtons = createElt("div", { class: "flex flex--justify-center" });
  section.appendChild(ctnButtons);

  return popInCtn;
};

const createPopin = () => {
  // selecciona el basket en el menu superior
  const btnCart = document.querySelector(".minicart-wrapper");
  // crea el popup
  const popinElt = createPopinElt();

  // falta probar y continuar.
};

try {
  createPopin();
} catch (e) {
  console.log("DY | err", e);
}
