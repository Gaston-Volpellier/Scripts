const init = () => {
  const accordion = document
    .querySelector(".step-current")
    .querySelector(".accordion").firstElementChild;

  accordion
    ? accordion.click()
    : console.log("Accordion not found. ", container);
};

try {
  init();
} catch (e) {
  console.log("DY | error", e);
}
