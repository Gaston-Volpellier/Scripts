const config = { attributes: true };
const burgerIcon = document.querySelector(".js-menu-open");
const mainmenu = document.getElementById("main-menu");
const locationName = window.location.pathname.split("/");

const menuStructure = {};

const clickMenu = () => {
  // locationName[3] contains the gender in the url (homme - femme - enfant)

  if (menuStructure.gender[locationName[3]]) {
    mainmenu
      .querySelectorAll("li")
      [menuStructure.gender[locationName[3]]].firstElementChild.click();

    if (menuStructure.section[locationName[4]]) {
      // locationName[4] contains the section in the url (vetements - chaussures )

      setTimeout(() => {
        const activeMenu = document.querySelectorAll("li.is-active");
        if (activeMenu[0]) {
          const activeList = activeMenu[0].querySelector(
            ".header-submenu-item-inner > .header-submenu-wrapper > ul"
          );
          if (activeList) {
            activeList
              .querySelectorAll("li")
              [
                menuStructure.section[locationName[4]]
              ].firstElementChild.click();
          }
        }
      }, 100);
    }
  }
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.attributeName === "class" &&
      burgerIcon.classList.contains("is-active")
    ) {
      clickMenu();
    }
  });
});

const init = () => {
  console.log("DY | Running PTI 213 ", locationName);
  observer.observe(burgerIcon, config);
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
