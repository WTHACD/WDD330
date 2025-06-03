import { loadHeaderFooter } from "./utils.mjs";

async function initHomePage() {
  await loadHeaderFooter();  
  console.log("Página de inicio inicializada.");
}

initHomePage();
