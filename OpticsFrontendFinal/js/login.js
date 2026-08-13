const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", loginCustomer);

async function loginCustomer(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    if(email==="" || password===""){

        showToast("Please fill all fields.", "warning");

        return;
    }

    const customer={

        email:email,

        password:password

    };

    try{

        const response = await fetch(`${BASE_URL}/customer/login`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(customer)

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;
        }

        const data = await response.json();

        localStorage.setItem("customer",JSON.stringify(data));

        showToast("Login Successful", "success");

        window.location.href="index.html";

    }
    catch(error){

        console.error(error);

        showToast("Unable to connect to server.", "error");

    }

}

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function(){

    if(password.type === "password"){

        password.type = "text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    }
    else{

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});


// ==========================
// ADMIN LOGIN
// ==========================

const adminLoginBtn = document.getElementById("adminLoginBtn");

const adminModal = document.getElementById("adminModal");

const closeAdminModal = document.getElementById("closeAdminModal");

const adminLoginForm = document.getElementById("adminLoginForm");

const adminPassword = document.getElementById("adminPassword");

const toggleAdminPassword =
    document.getElementById("toggleAdminPassword");


// Open Admin Login

adminLoginBtn.addEventListener("click", function(){

    adminModal.classList.add("show");

});


// Close Admin Login

closeAdminModal.addEventListener("click", function(){

    adminModal.classList.remove("show");

});


// Close when clicking outside modal

adminModal.addEventListener("click", function(e){

    if(e.target === adminModal){

        adminModal.classList.remove("show");

    }

});


// Admin Password Eye

toggleAdminPassword.addEventListener("click", function(){

    if(adminPassword.type === "password"){

        adminPassword.type = "text";

        toggleAdminPassword.classList.remove("fa-eye");

        toggleAdminPassword.classList.add("fa-eye-slash");

    }
    else{

        adminPassword.type = "password";

        toggleAdminPassword.classList.remove("fa-eye-slash");

        toggleAdminPassword.classList.add("fa-eye");

    }

});


// Admin Login

adminLoginForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const username =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value.trim();


    if(username === "" || password === ""){

        showToast("Please enter username and password.", "warning");

        return;

    }


    try{

        const response = await fetch(`${BASE_URL}/admin/login`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username: username,

                password: password

            })

        });


        if(!response.ok){

            showToast("Admin login failed.", "error");

            return;

        }


        const success = await response.json();


        if(success){

            showToast("Admin Login Successful", "success");

            setTimeout(function(){

                window.location.href = "admin/dashboard.html";

            }, 800);

        }
        else{

            showToast("Invalid admin username or password.", "error");

        }

    }
    catch(error){

        console.error(error);

        showToast("Unable to connect to server.", "error");

    }

});