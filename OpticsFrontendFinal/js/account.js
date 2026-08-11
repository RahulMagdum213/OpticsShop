// =========================================
// CUSTOMER ACCOUNT / EDIT PROFILE
// =========================================

const accountForm = document.getElementById("accountForm");

const customerIdInput = document.getElementById("customerId");
const customerNameInput = document.getElementById("customerName");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const dateOfBirthInput = document.getElementById("dateOfBirth");
const cityInput = document.getElementById("city");

const togglePassword = document.getElementById("togglePassword");

const homeBtn = document.getElementById("homeBtn");
const ordersBtn = document.getElementById("ordersBtn");
const logoutBtn = document.getElementById("logoutBtn");

window.onload = function () {

    loadCustomerDetails();

};

// ==========================
// LOAD CUSTOMER
// ==========================

function loadCustomerDetails() {

    const customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {

        window.location.href = "login.html";

        return;

    }

    customerIdInput.value = customer.customerId || "";
    customerNameInput.value = customer.customerName || "";
    emailInput.value = customer.email || "";
    mobileInput.value = customer.mobile || "";
    dateOfBirthInput.value = customer.dateOfBirth || "";
    cityInput.value = customer.city || "";

    // Password is not returned by CustomerResponseDTO.
    // The user must enter the password before saving.
    passwordInput.value = "";

}

// ==========================
// SHOW / HIDE PASSWORD
// ==========================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    } else {

        passwordInput.type = "password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});

// ==========================
// UPDATE CUSTOMER
// ==========================

accountForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const customer = {

        customerId: Number(customerIdInput.value),

        customerName: customerNameInput.value.trim(),

        email: emailInput.value.trim(),

        mobile: Number(mobileInput.value),

        password: passwordInput.value,

        dateOfBirth: dateOfBirthInput.value,

        city: cityInput.value.trim()

    };

    if (!customer.customerId) {

        showToast("Customer information not found.", "error");

        return;

    }
if (!customer.customerName ||
    !customer.email ||
    !customer.city) {

    showToast("Please fill all required fields.", "warning");

    return;
}

    if (!/^\d{10}$/.test(String(customer.mobile))) {

        showToast("Mobile number must contain exactly 10 digits.", "warning");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/customer/update`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(customer)

        });

        if (!response.ok) {

            const message = await response.text();

            showToast(message || "Unable to update customer.", "error");

            return;

        }

        const updatedCustomer = await response.json();

        // Store the returned CustomerResponseDTO.
        localStorage.setItem(
            "customer",
            JSON.stringify(updatedCustomer)
        );

        showToast("Profile updated successfully.", "success");

        window.location.href = "index.html";

    }

    catch (error) {

        console.error(error);

        showToast("Unable to connect to server.", "error");

    }

});

// ==========================
// NAVIGATION
// ==========================

homeBtn.addEventListener("click", function () {

    window.location.href = "index.html";

});

ordersBtn.addEventListener("click", function () {

    window.location.href = "orders.html";

});

logoutBtn.addEventListener("click", function () {

    if (confirm("Do you want to logout?")) {

        localStorage.removeItem("customer");

        window.location.href = "login.html";

    }

});

// ==========================
// CANCEL
// ==========================

document.getElementById("cancelBtn").addEventListener("click", function () {

    window.location.href = "index.html";

});
