let count = 0;

const init = () => {
  const togglePanelBtn = document.querySelector(".nrt-plp--filterBtn");
  const sidePanel = document.querySelector(".plp-filters-aside");
  if (togglePanelBtn && sidePanel) {
    if (!sidePanel.classList.contains("is-closed")) {
      togglePanelBtn.click();
    }
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
