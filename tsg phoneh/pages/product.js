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
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
console.log("sa");

// storage wahala
import { fetchAndStoreData, getStoredData } from "/storage.js";

fetchAndStoreData();

// To retrieve the stored data
const storedUtils = getStoredData() || [];

console.log(storedUtils);
//asdfasdfasdfasdfasdfasd*******************//////////
const urlSearchParams = new URLSearchParams(window.location.search);
const productId = urlSearchParams.get("id");

// fetch from json
// Keep a copy of the original data

console.log("ID from URL:", productId);

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

const product = storedUtils.find((item) => item.id === productId);
const cartContent = document.querySelector(".cart-content");
if (product) {
  // Display the product details on the page
  const productDetailsContainer = document.getElementById("tsgAllView");

  productDetailsContainer.innerHTML = `
     <section class="tsgAllView cart-content" id="tsgAllView">
      <section class="aboutdesigns">
        <div class="aboutdesign"></div>
      </section>
      <div class="p-animation"><p class="pickedname">${product.name}</p></div>
      <section class="oneproduct" id="oneproduct">
        <div class="oneproduct-one">
          <img src="${product.image}" />
          <p class="">${product.name}</p>
          <h4 class="oneproduct-one-price">${nairaFormatter.format(
            product.price
          )}</h4>
          <button class="single-cart-btn " data-id="${product.id}">
            <h5><i class="fas fa-shopping-cart"></i>Add To Cart</h5>
          </button>
        </div>
        <article class="oneproduct-description">
          ${product.description}
        </article>
      </section>
      <div class="idontire">
        <button class="backtostse" id="backtostorse">
          <a href="store.html">Back to Store</a>
        </button>
      </div>
    </section>
    `;
  const addToCartButton = document.querySelector(".single-cart-btn");

  document.addEventListener("DOMContentLoaded", () => {
    const cartOverlay = document.getElementById("cart-overlay");
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const cartItemCountDOM = document.querySelector(".cart-item-count");
    let cartItems = [];

    fetch("utils.json")
      .then((response) => response.json())
      .then((data) => {
        const nairaFormatter = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        });

        const addToCart = (productId) => {
          const selectedProduct = data.find((item) => item.id === productId);
          if (selectedProduct) {
            const existingCartItem = cartItems.find(
              (item) => item.id === productId
            );
            if (existingCartItem) {
              existingCartItem.quantity += 1; // Increase quantity if item is already in the cart
            } else {
              cartItems.push({ ...selectedProduct, quantity: 1 }); // Add new item with quantity 1
            }
            updateCart();
          } else {
            console.log("Product not found");
          }
          cartOverlay.classList.add("show");
        };

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

        // Add event listeners for quantity increase, decrease, and remove buttons
        cartContent.addEventListener("click", (event) => {
          if (event.target.classList.contains("cart-item-remove")) {
            const itemId = event.target.dataset.itemId;
            const itemIndex = cartItems.findIndex((item) => item.id === itemId);
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

        const openCartButtons = document.querySelectorAll(".single-cart-btn");
        openCartButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const productId = event.currentTarget.dataset.id; // Adjust this line
            addToCart(productId);
          });
        });

        // Continue with your existing search and filter logic...
      })
      .catch((error) => console.error("Error fetching utils.json:", error));
  });
} else {
  console.log("hello");
}
