let count = 0;

const init = () => {
  const descriptionText = "${Description text}";
  const description = document.querySelector(".js-ellipsis-contents p");

  if (description) {
    description.innerHTML = descriptionText;
    description.setAttribute("data-filter-id", "fit");
  } else {
    if (count < 50 && !description) {
      count++;
      setTimeout(replaceDescription, 250);
    }
  }
};

try {
  init();
} catch (error) {
  console.log(error);
}
