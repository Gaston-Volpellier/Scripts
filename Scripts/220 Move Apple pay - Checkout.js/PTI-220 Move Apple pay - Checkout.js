const init = () => {
  const container = document.querySelector(".step-current");
  const accordion = container.querySelector(".accordion").firstElementChild;

  accordion
    ? accordion.click()
    : console.log("Accordion not found. ", container);
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
