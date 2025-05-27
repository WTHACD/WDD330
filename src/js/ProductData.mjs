
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    
    this.path = `../json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      console.log("Fetching from:", this.path);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Loaded product data:", data);

      return data;
    } catch (error) {
      console.error("Error loading product data:", error);
      return [];
    }
  }

  
  async findProductById(id) {
    const products = await this.getData(); 
   
    if (Array.isArray(products)) {
      return products.find((item) => item.Id === id);
    }
    return undefined; 
  }
}