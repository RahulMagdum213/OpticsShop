// =========================================
// CATEGORY MANAGEMENT
// =========================================

// ==========================
// GLOBAL VARIABLES
// ==========================

let categoryList = [];

const categoryId = document.getElementById("categoryId");
const categoryName = document.getElementById("categoryName");
const description = document.getElementById("description");

const saveBtn = document.getElementById("saveBtn");

const categoryTable = document.getElementById("categoryTable");

// ==========================
// INITIALIZE
// ==========================

window.onload = function(){

    loadCategories();

};

// ==========================
// LOAD CATEGORIES
// ==========================

async function loadCategories(){

    try{

        const response = await fetch(`${BASE_URL}/category/getAll`);

        if(!response.ok){

            throw new Error("Unable to load categories.");

        }

        categoryList = await response.json();

        displayCategories();

    }

    catch(error){

        console.error(error);

        showToast("Unable to load categories.", "error");

    }

}

// ==========================
// DISPLAY CATEGORIES
// ==========================

function displayCategories(){

    let html = "";

    categoryList.forEach(category=>{

        html += `

        <tr>

            <td>${category.categoryId}</td>

            <td>${category.categoryName}</td>

            <td>${category.description}</td>

            <td>

                <button
                    class="edit-btn"

                    onclick="editCategory(${category.categoryId})">

                    Edit

                </button>

                <button
                    class="delete-btn"

                    onclick="deleteCategory(${category.categoryId})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    categoryTable.innerHTML = html;

}

// ==========================
// SAVE BUTTON
// ==========================

saveBtn.addEventListener("click", saveCategory);

// ==========================
// ADD / UPDATE CATEGORY
// ==========================

async function saveCategory(){

    const category = {

        categoryId : categoryId.value,

        categoryName : categoryName.value,

        description : description.value

    };

    let url = `${BASE_URL}/category/add`;

    let method = "POST";

    if(category.categoryId){

        url = `${BASE_URL}/category/update`;

        method = "PUT";

    }

    try{

        const response = await fetch(url,{

            method:method,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(category)

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        showToast("Category Saved Successfully", "success");

        clearForm();

        loadCategories();

    }

    catch(error){

        console.error(error);

        showToast("Unable to save category.", "error");

    }

}

// ==========================
// EDIT CATEGORY
// ==========================

function editCategory(id){

    const category = categoryList.find(c=>c.categoryId===id);

    categoryId.value = category.categoryId;

    categoryName.value = category.categoryName;

    description.value = category.description;

}

// ==========================
// DELETE CATEGORY
// ==========================

async function deleteCategory(id){

    if(!confirm("Delete this category?")){

        return;

    }

    try{

        const response = await fetch(`${BASE_URL}/category/delete/${id}`,{

            method:"DELETE"

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        showToast("Category Deleted Successfully", "success");

        loadCategories();

    }

    catch(error){

        console.error(error);

        showToast("Unable to delete category.", "error");

    }

}

// ==========================
// CLEAR FORM
// ==========================

function clearForm(){

    categoryId.value="";

    categoryName.value="";

    description.value="";

}

function editCategory(id){

    const category = categoryList.find(c => c.categoryId === id);

    categoryId.value = category.categoryId;

    categoryName.value = category.categoryName;

    description.value = category.description;

    // Scroll to category form
    document.getElementById("categoryForm").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}