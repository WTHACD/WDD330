// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Failed to load template: ${path}, Status: ${res.status}`);
    }
    const template = await res.text();
    return template;
  } catch (error) {
    console.error("Error loading template:", error);
    return null; 
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html"); 
  const headerElement = document.querySelector("#main-header"); 
  if (headerTemplate && headerElement) {
    renderWithTemplate(headerTemplate, headerElement, null, () => {
    });
  } else {
    if (!headerTemplate) console.error("Header template not loaded or found.");
    if (!headerElement) console.error("Header element (#main-header) not found in DOM.");
  }
  const footerTemplate = await loadTemplate("/partials/footer.html"); 
  const footerElement = document.querySelector("#main-footer"); 
  if (footerTemplate && footerElement) {
    renderWithTemplate(footerTemplate, footerElement, null, () => {      
      const yearSpan = document.querySelector("#current-year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
  } else {
    if (!footerTemplate) console.error("Footer template not loaded or found.");
    if (!footerElement) console.error("Footer element (#main-footer) not found in DOM.");
  }
}