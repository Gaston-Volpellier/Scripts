DYO.Q(
  DYO.waitForElementAsync(
    "#top-minicart > div > a > span:nth-child(3) > span",
    1,
    100,
    10
  )
).then(function (t) {
  var minicart = document.querySelector(
    "#top-minicart > div > a > span:nth-child(3) > span"
  );
  var minicartHTML = minicart.innerHTML;
  var minicartNumber = parseInt(minicartHTML.replace(/\r?\n|\r/g, "").trim());
  console.log(minicartNumber);

  return minicartNumber;
});
