// =========================================
// CUSTOMER ACCOUNT / EDIT PROFILE
// =========================================


// ==========================
// FORM ELEMENTS
// ==========================

const accountForm =
    document.getElementById("accountForm");


const customerIdInput =
    document.getElementById("customerId");


const customerNameInput =
    document.getElementById("customerName");


const emailInput =
    document.getElementById("email");


const mobileInput =
    document.getElementById("mobile");


const passwordInput =
    document.getElementById("password");


const dateOfBirthInput =
    document.getElementById("dateOfBirth");


const cityInput =
    document.getElementById("city");


const togglePassword =
    document.getElementById("togglePassword");


// ==========================
// NAVIGATION BUTTONS
// ==========================

const homeBtn =
    document.getElementById("homeBtn");


const cartBtn =
    document.getElementById("cartBtn");


const ordersBtn =
    document.getElementById("ordersBtn");


const logoutBtn =
    document.getElementById("logoutBtn");


// ==========================
// INITIALIZE
// ==========================

window.onload = function () {

    loadCustomerDetails();

};


// ==========================
// LOAD CUSTOMER DETAILS
// ==========================

function loadCustomerDetails() {


    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );


    // ==========================
    // GUEST USER
    // ==========================

    if (!customer) {

        window.location.href =
            "login.html";

        return;

    }


    // ==========================
    // LOAD CUSTOMER DATA
    // ==========================

    customerIdInput.value =
        customer.customerId || "";


    customerNameInput.value =
        customer.customerName || "";


    emailInput.value =
        customer.email || "";


    mobileInput.value =
        customer.mobile || "";


    dateOfBirthInput.value =
        customer.dateOfBirth || "";


    cityInput.value =
        customer.city || "";


    // Password is not returned
    // by CustomerResponseDTO.

    passwordInput.value = "";

}


// ==========================
// SHOW / HIDE PASSWORD
// ==========================

togglePassword.addEventListener(
    "click",
    function () {


        if (
            passwordInput.type ===
            "password"
        ) {


            passwordInput.type =
                "text";


            togglePassword.classList.remove(
                "fa-eye"
            );


            togglePassword.classList.add(
                "fa-eye-slash"
            );


        }
        else {


            passwordInput.type =
                "password";


            togglePassword.classList.remove(
                "fa-eye-slash"
            );


            togglePassword.classList.add(
                "fa-eye"
            );

        }

    }
);


// ==========================
// UPDATE CUSTOMER
// ==========================

accountForm.addEventListener(
    "submit",
    async function (e) {


        e.preventDefault();


        const customer = {


            customerId:
                Number(
                    customerIdInput.value
                ),


            customerName:
                customerNameInput.value.trim(),


            email:
                emailInput.value.trim(),


            mobile:
                Number(
                    mobileInput.value
                ),


            password:
                passwordInput.value,


            dateOfBirth:
                dateOfBirthInput.value,


            city:
                cityInput.value.trim()

        };


        // ==========================
        // CUSTOMER ID VALIDATION
        // ==========================

        if (!customer.customerId) {


            showToast(
                "Customer information not found.",
                "error"
            );


            return;

        }


        // ==========================
        // REQUIRED FIELD VALIDATION
        // ==========================

        if (
            !customer.customerName ||
            !customer.email ||
            !customer.city
        ) {


            showToast(
                "Please fill all required fields.",
                "warning"
            );


            return;

        }


        // ==========================
        // MOBILE VALIDATION
        // ==========================

        if (
            !/^\d{10}$/.test(
                String(customer.mobile)
            )
        ) {


            showToast(
                "Mobile number must contain exactly 10 digits.",
                "warning"
            );


            return;

        }


        try {


            const response =
                await fetch(
                    `${BASE_URL}/customer/update`,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                customer
                            )

                    }
                );


            // ==========================
            // API ERROR
            // ==========================

            if (!response.ok) {


                const message =
                    await response.text();


                showToast(
                    message ||
                    "Unable to update customer.",
                    "error"
                );


                return;

            }


            // ==========================
            // UPDATED CUSTOMER
            // ==========================

            const updatedCustomer =
                await response.json();


            // Update localStorage

            localStorage.setItem(
                "customer",
                JSON.stringify(
                    updatedCustomer
                )
            );


            showToast(
                "Profile updated successfully.",
                "success"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                700
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
);


// ==========================
// HOME
// ==========================

homeBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "index.html";

    }
);


// ==========================
// CART
// ==========================

cartBtn.addEventListener(
    "click",
    function () {


        const customer =
            JSON.parse(
                localStorage.getItem("customer")
            );


        if (!customer) {

            window.location.href =
                "login.html";

            return;

        }


        window.location.href =
            "cart.html";

    }
);


// ==========================
// ORDERS
// ==========================

ordersBtn.addEventListener(
    "click",
    function () {


        const customer =
            JSON.parse(
                localStorage.getItem("customer")
            );


        if (!customer) {

            window.location.href =
                "login.html";

            return;

        }


        window.location.href =
            "orders.html";

    }
);


// ==========================
// LOGOUT
// ==========================

logoutBtn.addEventListener(
    "click",
    function () {


        if (
            confirm(
                "Do you want to logout?"
            )
        ) {


            localStorage.removeItem(
                "customer"
            );


            window.location.href =
                "login.html";

        }

    }
);


// ==========================
// CANCEL
// ==========================

document
    .getElementById("cancelBtn")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );