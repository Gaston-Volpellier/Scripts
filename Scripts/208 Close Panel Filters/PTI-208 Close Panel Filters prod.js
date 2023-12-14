let count = 0;

const init = () => {
  const togglePanelBtn = document.querySelector(".js-plp-filter-btn");
  if (togglePanelBtn) {
    togglePanelBtn.click();
  } else {
    if (count < 50) {
      count++;
      setTimeout(init, 50);
    }
  }
};

try {
  init();
} catch (error) {
  console.log(error);
}
