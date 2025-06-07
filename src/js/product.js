import ExternalServices from "./ExternalServices.mjs"; // CAMBIADO
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

async function initProductDetailsPage() {
  await loadHeaderFooter(); 
  const productId = getParam("id");
  if (!productId) {
    document.querySelector("main").innerHTML = "<p>Product not found. No ID specified.</p>";
    return;
  }
  const dataSource = new ExternalServices(); // CAMBIADO
  const product = new ProductDetails(productId, dataSource);
  product.init();
}

initProductDetailsPage();