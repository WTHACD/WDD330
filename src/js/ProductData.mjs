const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {    
   console.log("ProductData instantiated. BaseURL:", baseURL);
  }
//Acá hice el cambio de getData
  async getData(category) {
    const response = await fetch(`<span class="math-inline">\{baseURL\}products/search/</span>{category}`);
    const data = await convertToJson(response); 
    return data.Result; 
  }

  

async findProductById(id) {
  try {   
    const response = await fetch(`<span class="math-inline">\{baseURL\}product/</span>{id}`);
    const data = await convertToJson(response);
    return data; 
  } catch (error) {
    console.error("Error fetching product by ID:", error);
        return undefined; 
  }
  }
}