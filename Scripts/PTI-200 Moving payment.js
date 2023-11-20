let count = 0;

const moveElement = (element, destination) => {
  const container = document.createElement("div");

  container.setAttribute("class", "padding-1");
  destination.appendChild(container);
  container.appendChild(element);
};

let init = () => {
  console.log("DY | executing", document.querySelector(".step-current"));

  const destinationCtn = document.querySelector(".step-current");
  const element = document.querySelector("[data-key='credit-promotion-badge']");

  if (destinationCtn && element) {
    moveElement(element, destinationCtn.lastChild.firstChild);
  } else {
    //tries 250 times every 250 miliseconds.
    if (count < 250 && !element) {
      count++;
      setTimeout(init, 250);
    }
  }
};

try {
  init();
} catch (error) {
  console.log("DY|error: ", error);
}
