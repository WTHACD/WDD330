import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  
  const imageUrl = product.Images?.PrimaryMedium || product.Image;

  return `
    <li class="product-card">
     <a href="/product_pages/index.html?id=${product.Id}">
       <img src="${imageUrl}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);

    if (list && list.length > 0) {
      this.renderList(list);
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}