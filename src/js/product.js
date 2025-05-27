import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

const category = "tents";
const productId = getParam("products");

const dataSource = new ProductData(category);

const product = new ProductDetails(productId, dataSource);
product.init();
