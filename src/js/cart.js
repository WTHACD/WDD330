import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);

  setLocalStorage("so-cart", cart);
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  console.log("Tipo de cartItems:", typeof cartItems);
  console.log("Contenido de cartItems:", cartItems);
  console.log("¿Es array?:", Array.isArray(cartItems));

  if (!Array.isArray(cartItems)) {
    console.warn("so-cart no es un array. Usando arreglo vacío.");
    cartItems = [];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
