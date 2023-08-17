import "./contact/contactani.js";
import { fetchAndStoreData, getStoredData } from "/storage.js";

const toggleNav = document.getElementById("toggle-nav");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("sidebar-close");

toggleNav.addEventListener("click", () => {
  sidebarOverlay.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarOverlay.classList.remove("show");
});

const cartOverlay = document.getElementById("cart-overlay");
const closeCartBtn = document.getElementById("cart-close");
const toggleCartBtn = document.getElementById("toggle-cart");

toggleCartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});
closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
console.log("sa");

export {
  toggleCartBtn,
  toggleNav,
  cartOverlay,
  closeBtn,
  closeCartBtn,
  sidebarOverlay,
};
