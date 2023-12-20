let count = 0;

const init = () => {
  console.log("DY | 209 Replace description");

  const descriptionText = "${Description text}";
  const description = document.querySelector(".js-ellipsis-contents p");

  if (description) {
    description.innerHTML = descriptionText;
  } else {
    console.log("DY | not found ", count);

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
