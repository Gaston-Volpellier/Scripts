const pushTracking = () => {
  console.log("DY | Tracking.");
  if (dataLayer) {
    dataLayer.push({
      event: "DY Event",
      eventCategory: "DY Smart Action",
      eventAction: "${dyTagName}",
      eventLabel: "${dyTagName}" + " (" + "${dyVariationName}" + ")",
    });
  }
};

const elementCreate = (type, attributes) => {
  const element = document.createElement(type);
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
};

const createMutationObserver = (currentStep) => {
  const config = { childList: true, subtree: true, attributes: true };
  const observer = new MutationObserver(mutationCallback);
  observer.observe(currentStep, config);
};

const initWithTimeOut = () => {
  const element = document.querySelector(".element");
  if (element) {
    continueCode(element);
  } else {
    //tries 250 times every 250 miliseconds.
    if (count < 250 && !element) {
      count++;
      setTimeout(initWithTimeOut, 250);
    }
  }
};

const createCountDown = () => {
  // Set the date we're counting down to
  var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
};
