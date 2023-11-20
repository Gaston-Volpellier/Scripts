function getCtnReinsurance() {
  return document.querySelector(".js-pdp-orderable-section > div + div hr");
}

function createNewCtnReinsurance(refNode, parentNode) {
  const newCtnReinsurance = document.createElement("div");
  newCtnReinsurance.setAttribute(
    "class",
    "dy-reinsurance l-display-grid l-column-gap--medium l-row-gap--medium grid-template-2 grid-template-m-1 text-black l-m-padding--small"
  );
  parentNode.insertBefore(newCtnReinsurance, refNode);
  return newCtnReinsurance;
}

function getKlarnaElt(klarnaElt, count) {
  if (klarnaElt.kpsr) {
    // remove div style;
    let mainDiv = klarnaElt.querySelector("div");
    if (mainDiv) {
      mainDiv.setAttribute("style", "");
    }
    let firstDiv = klarnaElt.kpsr.querySelector("div");
    let styles = klarnaElt.kpsr.querySelectorAll("style");
    if (firstDiv) {
      firstDiv.setAttribute("style", "");
    }
    if (styles) {
      let i, j, l, ll;
      for (i = 0, l = styles.length; i < l; i++) {
        styles[i].innerHTML = "";
      }
    }
    let customStyle = "p {margin: 0; padding: 0;}";
    customStyle += "div {text-align: center}";
    customStyle +=
      "p button {padding: 0; border: none; background: none; color: inherit; font-family: inherit; font-size: inherit; cursor: pointer; border: none; width: 100%; display: flex; justify-content: center;}";
    customStyle += "p button:hover {text-decoration: none;}";
    customStyle +=
      "span.logo {background: #ffb3c7; border-radius: 5px; padding: 2px 5px;}";
    customStyle +=
      "@media only screen and (max-width: 767px) {div {text-align: left; } p button {justify-content: flex-start;}}";
    styles[styles.length - 1].innerHTML = customStyle;
  } else {
    count++;
    if (count < 10) {
      setTimeout(getKlarnaElt, 150, klarnaElt, count);
    }
  }
}

function createCell(data, picKlana) {
  const div = document.createElement("div");
  let innerHTML = "";
  div.setAttribute(
    "class",
    "dy-reinsurance-items curved--medium bordered--grey l-padding--small l-padding-around flex flex--col flex-m--row flex--space-between flex--align-center flex-m--align-start"
  );
  if (data !== null) {
    if (data.link3 !== "none") {
      div.classList.add(data.link3);
    }
    innerHTML +=
      '<div class="dy-reinsurance-pic"><img src="' + data.pic + '"/></div>';
    innerHTML +=
      '<div class="flex flex--col flex--align-center flex-m--align-start flex-m--basis-full font-small">';
    innerHTML +=
      '  <div class="dy-reinsurance-row1 text-td-center reverse-link">' +
      data.row1 +
      "</div>";
    if (data.row2 !== "") {
      innerHTML +=
        '  <div class="dy-reinsurance-row2 text-td-center">' +
        data.row2 +
        "</div>";
    }
    if (data.link3 !== "none") {
      innerHTML +=
        '  <div class="dy-reinsurance-row3 text-td-center"><button class="l-hmargin--small">' +
        data.row3 +
        "</button></div>";
    }
    innerHTML += "</div>";
    div.innerHTML = innerHTML;
  } else {
    const klarnaElt = document.querySelector(
      '[data-key="credit-promotion-auto-size"]'
    );
    if (klarnaElt) {
      innerHTML +=
        '<div class="dy-reinsurance-pic"><img class="" src="' +
        picKlana +
        '" /></div>';
      innerHTML +=
        '<div class="dy-klarna flex flex--col flex--align-center flex-m--align-start flex-m--basis-full"></div>';
      div.innerHTML = innerHTML;
      let divKlarna = div.querySelector(".dy-klarna");
      divKlarna.appendChild(klarnaElt);
      getKlarnaElt(klarnaElt, 0);
    }
  }
  return div;
}

function createHr() {
  const hr = document.createElement("hr");
  hr.setAttribute("class", "no-tab no-desk");
  return hr;
}

function removeOldReinsurance(newCtnReinsurance) {
  const parentReinsurance = newCtnReinsurance.parentNode;
  const parentReinsuranceChildren = parentReinsurance.children;
  for (let i = parentReinsuranceChildren.length - 1; i > 0; i--) {
    if (parentReinsuranceChildren[i].classList.contains("dy-reinsurance"))
      break;
    else {
      parentReinsuranceChildren[i].remove();
    }
  }
}

function init() {
  const insertKlarna = "${Insert Klarna}";
  const picKlarna = "${Klarna Picture}";
  const ctnReinsurance = getCtnReinsurance();

  if (ctnReinsurance) {
    let numReinsurance = 0;
    const newCtnReinsurance = createNewCtnReinsurance(
      ctnReinsurance,
      ctnReinsurance.parentNode
    );

    const data = [
      {
        pic: "${Item 1 - Picture}",
        row1: "${Item 1 - First Sentence}",
        row2: "${Item 1 - Second Sentence}",
        row3: "${Item 1 - Panel Text Link}",
        link3: "${Item 1 - Panel Option}",
      },
      {
        pic: "${Item 2 - Picture}",
        row1: "${Item 2 - First Sentence}",
        row2: "${Item 2 - Second Sentence}",
        row3: "${Item 2 - Panel Text Link}",
        link3: "${Item 2 - Panel Option}",
      },
      {
        pic: "${Item 3 - Picture}",
        row1: "${Item 3 - First Sentence}",
        row2: "${Item 3 - Second Sentence}",
        row3: "${Item 3 - Panel Text Link}",
        link3: "${Item 3 - Panel Option}",
      },
      {
        pic: "${Item 4 - Picture}",
        row1: "${Item 4 - First Sentence}",
        row2: "${Item 4 - Second Sentence}",
        row3: "${Item 4 - Panel Text Link}",
        link3: "${Item 4 - Panel Option}",
      },
    ];
    numReinsurance = data.length;

    if (insertKlarna === "yes") {
      numReinsurance -= 1;
      newCtnReinsurance.appendChild(createHr());
      newCtnReinsurance.appendChild(createCell(null, picKlarna));
    }

    newCtnReinsurance.appendChild(createHr());

    for (let i = 0, l = numReinsurance; i < l; i++) {
      newCtnReinsurance.appendChild(createCell(data[i]));
      if (i < l - 1) {
        newCtnReinsurance.appendChild(createHr());
      }
    }

    removeOldReinsurance(newCtnReinsurance);
  }
}

init();
