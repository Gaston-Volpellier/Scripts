DYO.Q.Promise(function (resolve) {
  if (typeof window.dataLayer === "undefined") {
    console.info("DY | dataLayer unavailable");
    resolve(false);
  }
  const pageName = dataLayer[1].page_data.name;

  resolve(pageName);
});
