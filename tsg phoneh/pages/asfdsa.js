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

// Fetch the JSON data and populate product list
fetch("utils.json")
  .then((response) => response.json())
  .then((data) => {
    originalData = data; // Store the original data
    const productList = document.getElementById("single-item-catalog");
    // Initial rendering of all products
    renderProducts(data);

    // Add event listener for the search input using input event
    const searchInput = document.getElementById("name-search");
    searchInput.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchValue = document
        .getElementById("search-input")
        .value.toLowerCase();
      const filteredProducts = originalData.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      renderProducts(filteredProducts);
      // to clear search inpput after products display
      document.getElementById("search-input").value = "";
      // Show/hide "Go Back to Store" button container based on filtered products
      const storeLinkContainer = document.getElementById("backtostore");
      if (filteredProducts.length > 0) {
        storeLinkContainer.style.display = "block";
      } else {
        storeLinkContainer.style.display = "none";
      }
    });
    // filter
    const filterButton = document.getElementById("filter-button");
    filterButton.addEventListener("click", function (event) {
      event.preventDefault();
      const minPrice =
        parseFloat(document.getElementById("min-price").value) || 0;
      const maxPrice =
        parseFloat(document.getElementById("max-price").value) || infinity;
      const filteredProducts = originalData.filter((item) => {
        const itemPrice = parseFloat(item.price);
        return itemPrice >= minPrice && itemPrice <= maxPrice;
      });
      renderProducts(filteredProducts);

      // to clear search price after price display
      document.getElementById("min-price").value = "";
      document.getElementById("max-price").value = "";
      const storeLinkContainers = document.getElementById("backtostorse");
      if (filteredProducts.length > 0) {
        storeLinkContainers.style.display = "block";
      } else {
        storeLinkContainers.style.display = "none";
      }
    });

    // Show/hide "Go Back to Store" button container based on filtered products
  })
  .catch((error) => console.error("Error fetching utils.json:", error));

function renderProducts(products) {
  let productList = document.getElementById("single-item-catalog");
  const nairaFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });
  //No product found

  if (products.length > 0) {
    const storeLink = document.getElementById("backtostore");
    productList.innerHTML = products
      .map(
        (item) => `
        <div class="single-item-catalog" id="single-item-catalog">
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
        }" > 
          <p><i class="fas fa-shopping-cart"></i>Add To Cart</p>
        </button>
         </div>
    `
      )
      .join("");
  } else {
    productList.innerHTML = `<div class="arrageno"><h3> No Products Found, lol tsg don chop the product.</h3>
    <img src="images/chop.jpg" class="chopimage">
     <button class="backtostores" >
      <a href="store.html">Back to Store</a>
    </button> </div>`;
  }
  const foredach = products.forEach((data) => {
    productList.innerHTML;
  });

  // clicking of add to cart to open cart
  const openMyCart = document.getElementById("openmycart");

  openMyCart.addEventListener("click", (e) => {
    if (e.target && e.target.matches("single-cart-btn")) {
      console.log("hy");
      cartOverlay.classList.add("show");
      const productId = e.target.dataset.productId;
    } else {
      console.log("error with id ${productId}");
    }
  });
}
// Function to apply the filter based on price range
