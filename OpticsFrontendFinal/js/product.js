// =========================================
// PRODUCT MANAGEMENT
// =========================================

// ==========================
// GLOBAL VARIABLES
// ==========================

let productList = [];
let categoryList = [];

const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const brand = document.getElementById("brand");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const description = document.getElementById("description");
const imageUrl = document.getElementById("imageUrl");
const category = document.getElementById("category");

const saveBtn = document.getElementById("saveBtn");

const productTable = document.getElementById("productTable");

// ==========================
// INITIALIZE
// ==========================

window.onload = function(){

    loadCategories();

    loadProducts();

};

// ==========================
// LOAD CATEGORIES
// ==========================

async function loadCategories(){

    try{

        const response = await fetch(`${BASE_URL}/category/getAll`);

        if(!response.ok){

            throw new Error("Unable to load categories");

        }

        categoryList = await response.json();

        displayCategories();

    }

    catch(error){

        console.error(error);

        showToast("Unable to load categories", "error");

    }

}

// ==========================
// DISPLAY CATEGORY DROPDOWN
// ==========================

function displayCategories(){

    let html = "<option value=''>Select Category</option>";

    categoryList.forEach(cat=>{

        html += `

            <option value="${cat.categoryId}">

                ${cat.categoryName}

            </option>

        `;

    });

    category.innerHTML = html;

}

// ==========================
// LOAD PRODUCTS
// ==========================

async function loadProducts(){

    try{

        const response = await fetch(`${BASE_URL}/product/getAll`);

        if(!response.ok){

            throw new Error("Unable to load products");

        }

        productList = await response.json();

        displayProducts();

    }

    catch(error){

        console.error(error);

        showToast("Unable to load products", "error");

    }

}

// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(){

    let html = "";

    productList.forEach(product=>{

        html += `

        <tr>

            <td>${product.productId}</td>

            <td>${product.productName}</td>

            <td>${product.brand}</td>

            <td>₹${product.price}</td>

            <td>${product.stock}</td>

            <td>${product.category.categoryName}</td>

            <td>

                <button

                    class="edit-btn"

                    onclick="editProduct(${product.productId})">

                    Edit

                </button>

                <button

                    class="delete-btn"

                    onclick="deleteProduct(${product.productId})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    productTable.innerHTML = html;

}

// ==========================
// SAVE BUTTON
// ==========================

saveBtn.addEventListener("click", saveProduct);

// ==========================
// ADD / UPDATE PRODUCT
// ==========================

async function saveProduct(){

    const product = {

        productId : productId.value,

        productName : productName.value,

        brand : brand.value,

        price : Number(price.value),

        stock : Number(stock.value),

        description : description.value,

        imageUrl : imageUrl.value,

        category : {

            categoryId : Number(category.value)

        }

    };

    let url = `${BASE_URL}/product/add`;

    let method = "POST";

    if(product.productId){

        url = `${BASE_URL}/product/update`;

        method = "PUT";

    }

    try{

        const response = await fetch(url,{

            method:method,

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(product)

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        showToast("Product Saved Successfully", "success");

        clearForm();

        loadProducts();

    }

    catch(error){

        console.error(error);

        showToast("Unable to save product", "error");

    }

}

// ==========================
// EDIT PRODUCT
// ==========================

function editProduct(id){

    const product = productList.find(p=>p.productId===id);

    productId.value = product.productId;

    productName.value = product.productName;

    brand.value = product.brand;

    price.value = product.price;

    stock.value = product.stock;

    description.value = product.description;

    imageUrl.value = product.imageUrl;

    category.value = product.category.categoryId;

    document.getElementById("productForm").scrollIntoView({
    behavior: "smooth",
    block: "start"
});

}

// ==========================
// DELETE PRODUCT
// ==========================

async function deleteProduct(id){

    if(!confirm("Delete this product?")){

        return;

    }

    try{

        const response = await fetch(`${BASE_URL}/product/delete/${id}`,{

            method:"DELETE"

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        showToast("Product Deleted Successfully", "success");

        loadProducts();

    }

    catch(error){

        console.error(error);

        showToast("Unable to delete product", "error");

    }

}

// ==========================
// CLEAR FORM
// ==========================

function clearForm(){

    productId.value="";

    productName.value="";

    brand.value="";

    price.value="";

    stock.value="";

    description.value="";

    imageUrl.value="";

    category.value="";

}