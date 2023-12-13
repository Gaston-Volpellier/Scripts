function pushTracking(viewProduct) {
  if (dataLayer) {
    dataLayer.push({
      event: "DY Event",
      eventCategory: "DY Smart Action",
      eventAction: "${dyTagName}",
      eventLabel:
        "${dyTagName}" +
        " (" +
        "${dyVariationName}" +
        " | " +
        viewProduct +
        ")",
    });
  }
}

function getCompleteSrc(dataImageSrc) {
  let src = dataImageSrc;
  let url;
  if (dataImageSrc.indexOf("http:") !== 0) {
    src = "https:" + dataImageSrc;
  }
  url = new URL(src);
  return "//" + url.hostname + url.pathname;
}

function eltFactory(type, attributes) {
  const elt = document.createElement(type);
  for (let attribute in attributes) {
    elt.setAttribute(attribute, attributes[attribute]);
  }
  return elt;
}

function addSwitchButton() {
  let state = "model";
  const viewPictureSelected = "${View Selected}";
  const switchStatus = DYO.CookiesAPI.get("dy-product-view");

  state = switchStatus ? switchStatus : viewPictureSelected;

  pushTracking("view " + state);

  if (state === "packshot") {
    flipPicture();
  }

  const ctn = eltFactory("div", {
    class: "flex flex--align-center l-mt-vmargin--medium",
  });
  const contentCtn = eltFactory("div", {
    class: "l-hmargin--small fs--small line-height-1 ff-semibold",
  });
  contentCtn.innerHTML = "${View Content}";
  const packshotCtn = eltFactory("div", {
    class:
      "dy-btn dy-transition cursor-pointer " +
      (state === "model" ? "opacity--small" : ""),
    "data-dy": "packshot",
  });
  const packshotIcon = eltFactory("img", {
    src: "${PackShot Icon}",
    width: "24px",
    height: "auto",
    title: "${PackShot Bubble Title}",
  });
  const modelCtn = eltFactory("div", {
    class:
      "dy-btn dy-transition l-hmargin--small cursor-pointer " +
      (state === "packshot" ? "opacity--small" : ""),
    "data-dy": "model",
  });
  const modelIcon = eltFactory("img", {
    src: "${Model Icon}",
    width: "24px",
    height: "auto",
    title: "${Model Bubble Title}",
  });
  const toggleClass = function (elt) {
    let dataDy;
    if (elt.currentTarget.classList.contains("opacity--small")) {
      dataDy = elt.currentTarget.getAttribute("data-dy");
      packshotCtn.classList.toggle("opacity--small");
      modelCtn.classList.toggle("opacity--small");
      if (DYO && DYO.CookiesAPI) {
        DYO.CookiesAPI.set("dy-product-view", dataDy, null, "/", "");
      }
      pushTracking("click " + dataDy);
      flipPicture();
    }
  };

  packshotCtn.appendChild(packshotIcon);
  modelCtn.appendChild(modelIcon);
  packshotCtn.appendChild(packshotIcon);

  modelCtn.addEventListener("click", toggleClass);
  packshotCtn.addEventListener("click", toggleClass);

  ctn.appendChild(contentCtn);
  ctn.appendChild(modelCtn);
  ctn.appendChild(packshotCtn);

  // get container filter
  let parentFilter;
  let lastEltFilter;

  const filtersCtn = document.querySelector(".js-plp-filter-sort-wrapper");
  if (filtersCtn) {
    parentFilter = filtersCtn.parentNode;
    lastEltFilter = parentFilter.children[parentFilter.children.length - 1];
    parentFilter.insertBefore(ctn, lastEltFilter);
  }
}

function flipPicture() {
  let i, j, l, ll;
  let tiles;
  let hoverImage;
  let hoverImageSrc;
  let hoverImageSrcWithoutQuery;
  let pictureCtn;
  let originalSources;
  let datasrcSetOriginalSource;
  let srcsetOriginalSource;
  let srcsetOriginalSourceWithoutQuery;
  let imgOriginalSource;
  let imgOriginalSourceSrc;
  let regex = /(\/\/[^?]*)/gi;

  tiles = document.querySelectorAll(".js-plp-tiles > div");

  if (tiles) {
    for (i = 0, l = tiles.length; i < l; i++) {
      hoverImage = tiles[i].querySelector("div[data-image]");
      pictureCtn = tiles[i].querySelector("picture");
      if (hoverImage) {
        hoverImageSrc = hoverImage.getAttribute("data-image");
        hoverImageSrcWithoutQuery = getCompleteSrc(hoverImageSrc);

        if (pictureCtn) {
          originalSources = pictureCtn.querySelectorAll("source");
          if (originalSources) {
            for (j = 0, ll = originalSources.length; j < ll; j++) {
              dataSrcSetOriginalSource =
                originalSources[j].getAttribute("data-srcset");
              if (dataSrcSetOriginalSource) {
                dataSrcSetOriginalSource = dataSrcSetOriginalSource.replaceAll(
                  regex,
                  hoverImageSrcWithoutQuery
                );
                originalSources[j].setAttribute(
                  "data-srcset",
                  dataSrcSetOriginalSource
                );
              }
              srcsetOriginalSource = originalSources[j].getAttribute("srcset");
              if (srcsetOriginalSource) {
                srcsetOriginalSource = dataSrcSetOriginalSource.replaceAll(
                  regex,
                  hoverImageSrcWithoutQuery
                );
                originalSources[j].setAttribute("srcset", srcsetOriginalSource);
              }
              imgOriginalSource = pictureCtn.querySelector("img");
              imgOriginalSourceSrc = imgOriginalSource.getAttribute("data-src");
              srcsetOriginalSourceWithoutQuery =
                getCompleteSrc(imgOriginalSourceSrc);
            }
            imgOriginalSourceSrc = imgOriginalSourceSrc.replaceAll(
              regex,
              hoverImageSrcWithoutQuery
            );
            imgOriginalSource.setAttribute("src", imgOriginalSourceSrc);
            imgOriginalSource.setAttribute("data-src", imgOriginalSourceSrc);
            hoverImage.setAttribute(
              "data-image",
              hoverImageSrc.replaceAll(regex, srcsetOriginalSourceWithoutQuery)
            );
          }
        }
      }
    }
  }
}

try {
  addSwitchButton();
} catch (e) {
  console.log("DY | Error", e);
}
