function eltFactory(type, attributes) {
  const elt = document.createElement(type);
  for (let attribute in attributes) {
    elt.setAttribute(attribute, attributes[attribute]);
  }
  return elt;
}

function createLoginCtn() {
  let aCtn, img, contentCtn;
  const loginCtn = eltFactory("li", {
    class: "dy-login-btn no-desk padding-mt-1 l-padding--small",
  });
  aCtn = eltFactory("a", {
    class: "flex ff-semibold fs--medium",
    href: "${Link to Sign in / Sign up}",
  });
  img = eltFactory("img", {
    class: "l-hmargin--small",
    src: "${Icon Account}",
    width: "24",
    height: "24",
  });
  contentCtn = eltFactory("span");
  contentCtn.innerHTML = "${Content}";
  aCtn.appendChild(img);
  aCtn.appendChild(contentCtn);
  loginCtn.appendChild(aCtn);
  return loginCtn;
}

function init() {
  const mainMenu = document.querySelector(".js-menu-main");
  let ulCtn, firstLi, loginCtn;

  if (mainMenu) {
    ulCtn = mainMenu.querySelector("ul");
    firstLi = ulCtn.querySelector("li");
    ulCtn.insertBefore(createLoginCtn(), firstLi);
  }
}

try {
  init();
} catch (e) {
  console.log("DY | Error", e);
}
