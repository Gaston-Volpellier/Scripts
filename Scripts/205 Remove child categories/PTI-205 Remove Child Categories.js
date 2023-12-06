const init = () => {
  const element = document.querySelector(".js-plp-categories ul");
  if (element) {
    element.classList.add("is-hidden");
    element.parentElement.parentElement.parentElement.classList.add(
      "no-mob",
      "no-tab"
    );
  }
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
