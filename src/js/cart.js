import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productListElement = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  productListElement.innerHTML = "";

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productListElement.innerHTML = htmlItems.join("");

    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    cartFooter.classList.remove("hide");
    cartFooter.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  } else {
    productListElement.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  // CORRECCIÓN DEFINITIVA:
  // Se comprueba si existe la propiedad `item.Image` (para tiendas, hamacas)
  // o si no, se usa `item.Images.PrimarySmall` (para mochilas, sacos de dormir).
  // Esto evita el error y asegura que siempre tengamos una imagen.
  const imageUrl = item.Image || item.Images.PrimarySmall;

  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?id=${item.Id}" class="cart-card__image">
      <img src="${imageUrl}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?id=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

async function initCartPage() {
  await loadHeaderFooter();
  renderCartContents();
}

initCartPage();