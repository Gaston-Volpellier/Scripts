const getCartValue = () => {
  let cartTotal = 0;
  const dataLayer = window.dataLayer || [];

  for (i = dataLayer.length - 1; i >= 0; i--) {
    for (let prop in dataLayer[i]) {
      if (dataLayer[i].event === "view_cart") {
        if (dataLayer[i].ecommerce.items !== undefined) {
          dataLayer[i].ecommerce.items.forEach((item) => {
            const itemPrice =
              item.price !== undefined ? item.price * item.quantity : 0;
            cartTotal = cartTotal + itemPrice;
          });

          break;
        }
      }
    }
  }

  return cartTotal;
};

DYO.Q.Promise(function (resolve) {
  if (typeof window.dataLayer === "undefined") {
    console.info("DY | dataLayer unavailable");
    resolve(false);
  }
  const cartValue = getCartValue();

  resolve(cartValue);
});
