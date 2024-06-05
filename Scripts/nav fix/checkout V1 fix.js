let count = 0;

const init = () => {
  console.log("DY | Checkout Fix");

  const topbar = document.querySelector(".topbar");

  if (topbar) {
    topbar.classList.add("flex");
    topbar.firstElementChild.classList.remove("topbar-wrapper");
    topbar.firstElementChild.classList.add(
      "flex",
      "flex--align-center",
      "padding-1"
    );
    topbar.firstElementChild.firstElementChild.firstElementChild.classList.add(
      "dy--fix-iconSize"
    );
  } else {
    if (count < 50 && !topbar) {
      setTimeout(() => {
        init();
        count++;
      }, 150);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
