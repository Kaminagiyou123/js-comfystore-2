import { getElement } from "../utils.js";
import display from "../displayProducts.js";
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const setupCompanies = (store) => {
  let companies = store.map((item) => item.company);
  companies = ["All", ...companies.filter(onlyUnique)];
  const companiesDOM = getElement(".companies");
  companiesDOM.innerHTML = companies
    .map((company) => {
      return ` <button class="company-btn">${company}</button>`;
    })
    .join("");

  companiesDOM.addEventListener("click", (e) => {
    const company = e.target.textContent;

    const newStore = store.filter((item) => item.company === company);
    display(newStore, getElement(".products-container"));
  });
};

export default setupCompanies;
