const toggleNav = document.getElementById("toggle-nav");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("sidebar-close");

toggleNav.addEventListener("click", () => {
  sidebarOverlay.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarOverlay.classList.remove("show");
});

let cartOverlay = document.getElementById("cart-overlay");
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

// console.log("hy");
// ***
import { fetchAndStoreData, getStoredData } from "/storage.js";

// To fetch and store the data
fetchAndStoreData();

// To retrieve the stored data
const storedUtils = getStoredData();
let cart = storedUtils;
console.log(storedUtils);
///main fetch

fetch("utils.json")
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementById("single-item-catalog");
    const nairaFormatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    });

    const productsHTML = data
      .map(
        (item) => `<div class="single-item-catalog" id="single-item-catalog">
            <a href="product.html?id=${item.id}">
          <img
            src="${item.image}"
            class="sigle-item-img"
            alt="${item.name}"
          />
          <footer class="item-name-price">
            <p class="item-name">${item.name}</p>
            <h4 class="product-price">${nairaFormatter.format(item.price)}</h4>
          </footer>
        </a>
        <button class="single-cart-btn" id="openmycart" data-item-id="${
          item.id
        }">
          <p><i class="fas fa-shopping-cart"></i>Add To Cart</p>
        </button>
         </div>
        `
      )
      .join("");

    productList.innerHTML = productsHTML;
  })
  .catch((error) => console.error("Error fetching utils.json:", error));

// search button*********
let originalData = []; // Keep a copy of the original data

document.addEventListener("DOMContentLoaded", () => {
  const cartOverlay = document.getElementById("cart-overlay");
  let originalData = storedUtils; // Keep a copy of the original data
  let cartItems = []; // Array to store added products
  fetch("utils.json")
    .then((response) => response.json())
    .then((data) => {
      originalData = data; // Store the original data
      const productList = document.getElementById("single-item-catalog");
      const cartContent = document.querySelector(".cart-content");
      const nairaFormatter = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      });

      const renderProducts = (products) => {
        if (products.length > 0) {
          const productsHTML = products
            .map(
              (item) => `<div class="single-item-catalog">
                  <a href="product.html?id=${item.id}">
                    <img src="${item.image}" class="sigle-item-img" alt="${
                item.name
              }" />
                    <footer class="item-name-price">
                      <p class="item-name">${item.name}</p>
                      <h4 class="product-price">${nairaFormatter.format(
                        item.price
                      )}</h4>
                    </footer>
                  </a>
                  <button class="single-cart-btn" data-item-id="${item.id}">
                    <p><i class="fas fa-shopping-cart"></i>Add To Cart</p>
                  </button>
                </div>`
            )
            .join("");

          productList.innerHTML = productsHTML;

          const openCartButtons = document.querySelectorAll(".single-cart-btn");
          const cartTotalPrice = document.getElementById("cart-total-price");
          const cartItemCountDOM = document.querySelector(".cart-item-count");
          openCartButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
              const productId = event.currentTarget.dataset.itemId;
              const selectedProduct = originalData.find(
                (item) => item.id === productId
              );
              if (selectedProduct) {
                const existingCartItem = cartItems.find(
                  (item) => item.id === productId
                );
                if (existingCartItem) {
                  existingCartItem.quantity += 1; // Increase quantity if item is already in the cart
                } else {
                  cartItems.push({ ...selectedProduct, quantity: 1 }); // Add new item with quantity 1
                }
                cartOverlay.classList.add("show");
                updateCart();
              } else {
                console.log("Product not found");
              }
            });
          });
          //sffa
          cartContent.addEventListener("click", (event) => {
            if (event.target.classList.contains("cart-item-remove")) {
              const itemId = event.target.dataset.itemId;
              const itemIndex = cartItems.findIndex(
                (item) => item.id === itemId
              );
              if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
              }
              updateCart();
            } else if (
              event.target.classList.contains("cart-quantity-decrease")
            ) {
              const itemId = event.target.dataset.itemId;
              const existingCartItem = cartItems.find(
                (item) => item.id === itemId
              );
              if (existingCartItem && existingCartItem.quantity > 1) {
                existingCartItem.quantity--;
              }
              updateCart();
            } else if (
              event.target.classList.contains("cart-quantity-increase")
            ) {
              const itemId = event.target.dataset.itemId;
              const existingCartItem = cartItems.find(
                (item) => item.id === itemId
              );
              if (existingCartItem) {
                existingCartItem.quantity++;
              }
              updateCart();
            }
          });

          //asdkf
          const updateCart = () => {
            cartContent.innerHTML = cartItems
              .map(
                (item) => `
             <article class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">${nairaFormatter.format(item.price)}</p>
          <div class="cart-item-quantity">
            <button class="cart-quantity-decrease" data-item-id="${
              item.id
            }" data-action="decrease">-</button>
            <span class="cart-quantity">${item.quantity}</span>
            <button class="cart-quantity-increase" data-item-id="${
              item.id
            }"data-action="increase">+</button>
          </div>
          <button class="cart-item-remove" data-item-id="${
            item.id
          }">Remove</button>
        </div>
      </article>
            `
              )
              .join("");
            const totalPrice = cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
            cartTotalPrice.innerHTML = `Total:${nairaFormatter.format(
              totalPrice
            )}`;

            const amount = cartItems.reduce(
              (total, cartItem) => (total += cartItem.quantity),
              0
            );
            cartItemCountDOM.textContent = amount;
          };
        } else {
          productList.innerHTML = `<div class="arrageno">
            <h3>No Products Found, lol tsg don chop the product.</h3>
            <img src="images/chop.jpg" class="chopimage">
            <button class="backtostores">
              <a href="store.html">Back to Store</a>
            </button>
          </div>`;
        }
      };

      renderProducts(data);

      // Add event listener for the search input using submit event
      const searchForm = document.getElementById("name-search");
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchValue = document
          .getElementById("search-input")
          .value.toLowerCase();
        const filteredProducts = originalData.filter((item) =>
          item.name.toLowerCase().includes(searchValue)
        );
        renderProducts(filteredProducts);
        // to clear search input after products display
        document.getElementById("search-input").value = "";

        // Show/hide "Back to Store" button based on filtered products
        const storeLinkContainer = document.getElementById("backtostore");
        if (filteredProducts.length > 0) {
          storeLinkContainer.style.display = "block";
        } else {
          storeLinkContainer.style.display = "none";
        }
      });

      // Add event listener for the filter button
      const filterForm = document.getElementById("filter-button");
      filterForm.addEventListener("click", (event) => {
        event.preventDefault();
        const minPrice =
          parseFloat(document.getElementById("min-price").value) || 0;
        const maxPrice =
          parseFloat(document.getElementById("max-price").value) || Infinity;
        const filteredProducts = originalData.filter((item) => {
          const itemPrice = parseFloat(item.price);
          return itemPrice >= minPrice && itemPrice <= maxPrice;
        });
        renderProducts(filteredProducts);
        // to clear search price after price display
        document.getElementById("min-price").value = "";
        document.getElementById("max-price").value = "";

        // Show/hide "Back to Store" button based on filtered products
        const storeLinkContainer = document.getElementById("backtostore");
        if (filteredProducts.length > 0) {
          storeLinkContainer.style.display = "block";
        } else {
          storeLinkContainer.style.display = "none";
        }
      });
    })
    .catch((error) => console.error("Error fetching utils.json:", error));
});
