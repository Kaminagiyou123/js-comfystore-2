import { getElement } from "./utils.js";

const toggleNav = getElement(".toggle-nav");
const sideBar = getElement(".sidebar-overlay");
const closeBtn = getElement(".sidebar-close");

toggleNav.addEventListener("click", () => {
  sideBar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sideBar.classList.remove("show");
});
