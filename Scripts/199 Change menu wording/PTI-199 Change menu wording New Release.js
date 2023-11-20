const pushTracking = () => {
  if (dataLayer) {
    dataLayer.push({
      event: "DY Event",
      eventCategory: "DY Smart Action",
      eventAction: "${dyTagName}",
      eventLabel: "${dyTagName}" + " (${dyVariationName} | click)",
    });
  }
};

const handleButton = () => {
  const variation = parseInt(`${variation}`);
  const buttonSpan = document.querySelector('[aria-label="Collections"] span');

  if (buttonSpan) {
    buttonSpan.parentElement.addEventListener("click", () => {
      pushTracking();
    });

    if (variation) {
      const buttonText = `${text}`;
      buttonSpan.innerHTML === ""
        ? buttonSpan.setAttribute("data-text", buttonText)
        : (buttonSpan.innerHTML = buttonText);
    }
  }
};

try {
  handleButton();
} catch (error) {
  console.log("DY | error: ", error);
}
