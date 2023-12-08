let count = 0;

const init = () => {
  console.log("DY | Starting AB test");
  const container = document.querySelector(".confirmation-pix-block");
  if (container) {
    console.log("DY | Container", container);
    container.firstElementChild.lastElementChild.firstElementChild.classList.remove(
      "text-white"
    );
  } else {
    if (count < 250 && !container) {
      count++;
      setTimeout(init, 250);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
