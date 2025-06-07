import { getSessionStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


function formDataToJSON(form) {
  const formData = new FormData(form);
  const jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  return jsonObject;
}


function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}



export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }
  
  init() {
    this.list = getSessionStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
  
    if (!this.list || this.list.length === 0) {
      location.assign("/cart/index.html");
      return;
    }
    
   
    this.itemTotal = this.list
      .filter(item => item && typeof item.FinalPrice === "number")
      .reduce((sum, item) => sum + item.FinalPrice, 0);

    
    document.querySelector(`${this.outputSelector} #subtotal`).innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    
    this.shipping = 10 + (this.list.length > 1 ? (this.list.length - 1) * 2 : 0);
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

   
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #shipping`).innerText =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #tax`).innerText =
      `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #orderTotal`).innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];

    if (!formElement.checkValidity()) {
        formElement.reportValidity();
        return;
    }

    const json = formDataToJSON(formElement);
    
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping.toFixed(2);
    json.items = packageItems(this.list);

    try {
      const res = await this.services.checkout(json);
      console.log(res); 
      localStorage.removeItem(this.key);
      location.assign("/checkout/success.html");
    } catch (err) {
       // get all the error messages from the server
       const messages = Object.values(err.message).join(', ');
       alertMessage(messages);
    }
  }
}