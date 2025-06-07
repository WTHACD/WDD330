import ExternalServices from "./ExternalServices.mjs"; // CAMBIADO
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function initProductListing() {
  await loadHeaderFooter();
  const category = getParam("category");
  if (!category) {
    document.querySelector("main").innerHTML = "<p>Please select a product category.</p>";
    return;
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  document.title = `${categoryName} | Sleep Outside`;
  const pageTitleElement = document.querySelector("main h1");
  if (pageTitleElement) {
    pageTitleElement.textContent = `Top Products: ${categoryName}`;
  }

  const dataSource = new ExternalServices(); // CAMBIADO
  const listElement = document.querySelector(".product-list");
  if (listElement) {
    const productList = new ProductList(category, dataSource, listElement);
    productList.init();
  } else {
    console.error("Element .product-list not found in the page.");
  }
}

initProductListing();