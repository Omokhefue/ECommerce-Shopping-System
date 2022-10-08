const deleteBtn = document.getElementsByClassName("cart-remove");
const productQty = document.getElementsByClassName("cart-quantity");
const cartContent = document.getElementsByClassName("cart-content")[0];
const addIcon = document.getElementsByClassName("add-cart");
const cartBoxes = document.getElementsByClassName("cart-box");
const totalPrice = document.querySelector(".total-price");
const cart = document.querySelector(".cart");
const buyBtn = document.querySelector(".btn-buy");
const openCartIcon = document.querySelector("#cart-icon");
const closeCartIcon = document.querySelector("#close-cart");

openCartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeCartIcon.addEventListener("click", () => {
  cart.classList.remove("active");
});
ready();
function ready() {
  [...addIcon].forEach((icon) => {
    icon.addEventListener("click", addProductToCart);
  });
}

function addProductToCart(e) {
  let icon = e.target;
  const product = icon.parentElement;
  const productTitle = product.querySelector(".product-title").textContent;
  const productPrice = product.querySelector(".price").textContent;
  const productImg = product.querySelector(".product-img").src;
  dynamicCartContent(productPrice, productImg, productTitle);
}
function dynamicCartContent(price, img, title) {
  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  const cartTitleNames =
    cartContent.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartTitleNames.length; i++) {
    if (cartTitleNames[i].textContent == title) {
      alert("Item already added to cart");
      openCartIcon.click();
      return;
    }
  }
  let cartBoxContent = `
            <img src="${img}" class="cart-img"></img>
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="cart-remove bx bxs-trash-alt" ></i>
         
  `;

  cartShopBox.innerHTML = cartBoxContent;
  cartContent.prepend(cartShopBox);
  updateTotal();

  let cartB = cartContent.getElementsByClassName("cart-box");
  [...cartB].forEach((cartBox) => {
    cartBox
      .querySelector(".cart-quantity")
      .addEventListener("change", qtyChanged);
    cartBox.querySelector(".cart-remove").addEventListener("click", removeItem);
  });
}
function qtyChanged(e) {
  const qty = e.target;
  if (isNaN(qty.value) || qty.value <= 0) {
    qty.value = 1;
  }
  updateTotal();
}
function removeItem(e) {
  let btn = e.target;
  btn.parentElement.remove();
  updateTotal();
}
buyBtn.addEventListener("click", () => {
  if (cartBoxes.length > 0) {
    alert("Your order has been shipped");
    cartContent.innerHTML = "";
    updateTotal();
  } else {
    alert("nothing has been added to cart");
  }
});
function updateTotal() {
  let total = 0;
  [...cartBoxes].forEach((cartBox) => {
    const productPrice = parseFloat(
      cartBox.querySelector(".cart-price").textContent.replace("$", "")
    );
    const qty = cartBox.querySelector(".cart-quantity");
    const productQty = qty.value;
    total = total + productPrice * productQty;
    total = Math.round(total * 100) / 100;
  });
  totalPrice.textContent = `$${total}`;
}
