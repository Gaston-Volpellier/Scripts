let currWordIx = 0;
let count = 0;

const init = () => {
  console.log("DY | Running PTI 224");

  const messageData = "${Placeholder messages}";
  const timer = "${Time interval}";
  const searchBar = document
    .querySelector(".header-search-bar-form")
    .querySelector("input");

  if (searchBar) {
    const messages = messageData.split(";");

    setInterval(() => {
      searchBar.setAttribute("placeholder", messages[currWordIx]);
      currWordIx == messages.length - 1 ? (currWordIx = 0) : currWordIx++;
    }, timer);
  } else {
    if (count < 50 && !searchBar) {
      setTimeout(() => {
        init();
        count++;
      }, 500);
    }
  }
};

try {
  init();
} catch (e) {
  console.log("DY | err", e);
}
