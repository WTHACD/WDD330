import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


async function initProductPage() {
    await loadHeaderFooter();
  
    const productId = getParam('id');
    const category = getParam('category'); 
    const dataSource = new ProductData(); 
    const product = new ProductDetails(productId, category, dataSource);
    product.init();
}
initProductPage();

const category = "tents";
const productId = getParam("products");

const dataSource = new ProductData(category);

const product = new ProductDetails(productId, dataSource);




product.init();
