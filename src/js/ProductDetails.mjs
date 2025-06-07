import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    const data = await this.dataSource.findProductById(this.productId);
    this.product = data.Result;

    if (!this.product) {
      console.error(`Producto no encontrado: ${this.productId}`);
      document.querySelector("main").innerHTML = "<p>Product Not Found</p>";
      return;
    }

    this.renderProductDetails();


    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
   
    let cart = getLocalStorage("so-cart") || [];
   
    cart.push(this.product);
    
    setLocalStorage("so-cart", cart);
    alertMessage(`'${this.product.Name}' has been added to the cart.`);
  
   
    const cartButton = document.getElementById("addToCart");
    cartButton.textContent = "Added!";
    cartButton.classList.add("added"); 
    setTimeout(() => {
        cartButton.classList.remove("added");
        cartButton.textContent = "Add to Cart";
    }, 2000);
    
  }

  renderProductDetails() {
   
    const imageUrl = this.product.Images?.PrimaryLarge || this.product.Image;
    
    document.querySelector("h2").textContent = this.product.Brand.Name;
    document.querySelector("h3").textContent = this.product.NameWithoutBrand;
    document.getElementById("productImage").src = imageUrl;
    document.getElementById("productImage").alt = this.product.NameWithoutBrand;
    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productColor").textContent = this.product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = this.product.DescriptionHtmlSimple;
    document.getElementById("addToCart").dataset.id = this.product.Id;
  }
}