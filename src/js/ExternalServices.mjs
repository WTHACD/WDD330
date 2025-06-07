const baseURL = "http://wdd330-backend.onrender.com/";

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
   
    const response = await fetch(`/json/${category}.json`);
    const data = await convertToJson(response);

   
    return data.Result || data;
  }

  async findProductById(id) {
    
    const tents = await this.getData("tents");
    const backpacks = await this.getData("backpacks");
    const sleepingBags = await this.getData("sleeping-bags");
    const hammocks = await this.getData("hammocks");

    const allProducts = [...tents, ...backpacks, ...sleepingBags, ...hammocks];
    
    const product = allProducts.find((item) => item.Id === id);
    
    return { Result: product };
  }

  async checkout(payload) {
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(baseURL + "checkout/", options);
    return await convertToJson(response);
  }
}