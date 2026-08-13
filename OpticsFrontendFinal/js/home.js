// =========================================
// HOME PAGE JAVASCRIPT
// =========================================

let allProducts = [];
let filteredProducts = [];
let allCategories = [];

const productContainer = document.getElementById("productContainer");
const categoryContainer = document.getElementById("categoryContainer");

const searchBox = document.getElementById("search");

const customerName = document.getElementById("customerName");

const cartBtn = document.getElementById("cartBtn");
const ordersBtn = document.getElementById("ordersBtn");
const accountBtn = document.getElementById("accountBtn");
const adminBtn = document.getElementById("adminBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ==========================
// INITIALIZE PAGE
// ==========================

window.onload = function () {

    loadCustomer();

    loadProducts();

    loadCategories();

};

// ==========================
// LOAD CUSTOMER
// ==========================

function loadCustomer() {

    const customer = JSON.parse(localStorage.getItem("customer"));

    // User is not logged in
    // Still allow access to index.html
    if (!customer) {

        customerName.innerHTML = "Welcome";

        return;
    }

    customerName.innerHTML = "Hi, " + customer.customerName;

}

// ==========================
// LOAD ALL PRODUCTS
// ==========================

async function loadProducts() {

    try {

        const response = await fetch(`${BASE_URL}/product/getAll`);

        if (!response.ok) {

            throw new Error("Unable to fetch products.");

        }

        const products = await response.json();

        allProducts = products;

        filteredProducts = [...products];

        displayProducts(filteredProducts);

    }

    catch (error) {

        console.error(error);

        productContainer.innerHTML = `

            <h2 style="color:white">

                Unable to load products.

            </h2>

        `;

    }

}

// ==========================
// LOAD ALL CATEGORIES
// ==========================

async function loadCategories() {

    try {

        const response = await fetch(`${BASE_URL}/category/getAll`);

        if (!response.ok) {

            throw new Error("Unable to fetch categories.");

        }

        const categories = await response.json();

        allCategories = categories;

        displayCategories();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(products) {

    if (products.length === 0) {

        productContainer.innerHTML = `

            <h2 style="color:white">

                No Products Found

            </h2>

        `;

        return;

    }

    let cards = "";

    products.forEach(product => {

        let image = product.imageUrl;

        if (!image || image.trim() === "") {

            image = "images/no-image.png";

        }

        cards += `

        <div class="product-card">

            <img src="${image}"
                 alt="${product.productName}">

            <div class="product-body">

                <h3>${product.productName}</h3>

                <p class="brand">

                    ${product.brand}

                </p>

                <p class="price">

                    ₹${product.price}

                </p>

                <p class="stock">

                    Stock : ${product.stock}

                </p>

                <p class="description">

                    ${product.description}

                </p>

                <button onclick="addToCart(${product.productId})">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add To Cart

                </button>

            </div>

        </div>

        `;

    });

    productContainer.innerHTML = cards;

}

// ==========================
// DISPLAY CATEGORIES
// ==========================

function displayCategories() {

    let html = `

        <div class="category"
             onclick="showAllProducts()">

            All Products

        </div>

    `;

    allCategories.forEach(category => {

        html += `

        <div class="category"
             onclick="filterCategory(${category.categoryId})">

            ${category.categoryName}

        </div>

        `;

    });

    categoryContainer.innerHTML = html;

}

// ==========================
// SHOW ALL PRODUCTS
// ==========================

function showAllProducts() {

    searchBox.value = "";

    loadProducts();

}

// ==========================
// FILTER BY CATEGORY
// ==========================

async function filterCategory(categoryId) {

    try {

        const response =
            await fetch(`${BASE_URL}/product/category/${categoryId}`);

        if (!response.ok) {

            throw new Error("Unable to filter products.");

        }

        const products = await response.json();

        filteredProducts = products;

        displayProducts(filteredProducts);

    }

    catch (error) {

        console.error(error);

        showToast("Unable to load category products.", "error");

    }

}

// ==========================
// SEARCH PRODUCTS
// ==========================

let searchTimer;

searchBox.addEventListener("keyup", function () {

    clearTimeout(searchTimer);

    const keyword = searchBox.value.trim();

    searchTimer = setTimeout(function () {

        searchProducts(keyword);

    }, 300);

});

async function searchProducts(keyword) {

    if (keyword === "") {

        loadProducts();

        return;

    }

    try {

        const response = await fetch(
            `${BASE_URL}/product/search?productName=${encodeURIComponent(keyword)}`
        );

        if (!response.ok) {

            throw new Error("Unable to search products.");

        }

        const products = await response.json();

        filteredProducts = products;

        displayProducts(filteredProducts);

    }

    catch (error) {

        console.error(error);

        showToast("Unable to search products.", "error");

    }

}

// ==========================
// PRICE SORT
// ==========================

async function sortProducts(order) {

    if (!order) {

        loadProducts();

        return;

    }

    try {

        const response = await fetch(
            `${BASE_URL}/product/sort?sortBy=${order}`
        );

        if (!response.ok) {

            throw new Error("Unable to sort products.");

        }

        const products = await response.json();

        filteredProducts = products;

        displayProducts(filteredProducts);

    }

    catch (error) {

        console.error(error);

        showToast("Unable to sort products.", "error");

    }

}

// ==========================
// ADD PRODUCT TO CART
// ==========================

async function addToCart(productId) {

    const customer = JSON.parse(localStorage.getItem("customer"));

    // User is not logged in
    if (!customer) {

        window.location.href = "login.html";

        return;
    }

    const cart = {

        customer: {

            customerId: customer.customerId

        },

        product: {

            productId: productId

        },

        quantity: 1

    };

    try {

        const response = await fetch(`${BASE_URL}/cart/add`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(cart)

        });

        if (!response.ok) {

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        showToast(
            "Product Added To Cart Successfully",
            "success"
        );

    }

    catch (error) {

        console.error(error);

        showToast(
            "Unable to connect to server.",
            "error"
        );

    }

}

// ==========================
// CART PAGE
// ==========================

cartBtn.addEventListener("click", function () {

    const customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {

        window.location.href = "login.html";

        return;
    }

    window.location.href = "cart.html";

});

// ==========================
// ORDERS PAGE
// ==========================

ordersBtn.addEventListener("click", function () {

    const customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {

        window.location.href = "login.html";

        return;
    }

    window.location.href = "orders.html";

});

// ==========================
// ACCOUNT PAGE
// ==========================

accountBtn.addEventListener("click", function () {

    const customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {

        window.location.href = "login.html";

        return;
    }

    window.location.href = "account.html";

});

// ==========================
// ADMIN
// ==========================

adminBtn.addEventListener("click", function () {

    // Admin login is already available
    // on the login page.
    window.location.href = "login.html";

});

// ==========================
// LOGOUT
// ==========================

logoutBtn.addEventListener("click", function () {

    const customer = JSON.parse(localStorage.getItem("customer"));

    // Nobody is logged in
    if (!customer) {

        window.location.href = "login.html";

        return;
    }

    if (confirm("Do you want to logout?")) {

        localStorage.removeItem("customer");

        window.location.href = "index.html";

    }

});