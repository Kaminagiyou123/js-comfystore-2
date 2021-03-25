import { getElement } from "../utils.js";
import display from "../displayProducts.js";
const setupSearch = (store) => {
  const form = getElement(".input-form");
  const nameInput = getElement(".search-input");

  form.addEventListener("keyup", () => {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((item) => {
        if (item.name.toLowerCase().startsWith(value)) {
          return item;
        }
      });
      if (newStore.length > 0) {
        display(newStore, getElement(".products-container"));
      } else {
        const products = getElement(".products-container");
        products.innerHTML = `<h3 class='filter-error'>sorry, no product matched your search</h3>`;
      }
    } else {
      display(store, getElement(".products-container"));
    }
  });
};

export default setupSearch;
