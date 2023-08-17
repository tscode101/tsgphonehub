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
// console.log("sa");

// // vision fade

document.addEventListener("DOMContentLoaded", function () {
  const textContainer = document.querySelector(".outvision");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function showTextIfInViewport() {
    if (isElementInViewport(textContainer)) {
      textContainer.style.opacity = 1;
      textContainer.style.transform = "translateY(0)";
      window.removeEventListener("scroll", showTextIfInViewport);
    }
  }

  window.addEventListener("scroll", showTextIfInViewport);
  showTextIfInViewport();
});

// .listabout
document.addEventListener("DOMContentLoaded", function () {
  const textContainer = document.querySelector(".listabout");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function showTextIfInViewport() {
    if (isElementInViewport(textContainer)) {
      textContainer.style.opacity = 1;
      textContainer.style.transform = "translateY(0)";
      window.removeEventListener("scroll", showTextIfInViewport);
    }
  }

  window.addEventListener("scroll", showTextIfInViewport);
  showTextIfInViewport();
});

//section re
