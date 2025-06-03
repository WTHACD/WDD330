import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs"; 

async function initProductDetailsPage() {
  await loadHeaderFooter(); 

  const productId = getParam("id");
  if (!productId) {
    console.error("Product ID no especified in the URL.");
   
    document.querySelector("main").innerHTML = "<p>Product not found. No ID specified.</p>";
    return;
  }

  const dataSource = new ProductData();
  const product = new ProductDetails(productId, dataSource);
  product.init();
}

initProductDetailsPage();