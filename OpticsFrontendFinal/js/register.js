const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", registerCustomer);

async function registerCustomer(e){

    e.preventDefault();

    const customer={

        customerName:document.getElementById("customerName").value.trim(),

        email:document.getElementById("email").value.trim(),

        mobile:Number(document.getElementById("mobile").value),

        password:document.getElementById("password").value.trim(),

        dateOfBirth:document.getElementById("dateOfBirth").value,

        city:document.getElementById("city").value.trim()

    };

    try{

        const response=await fetch(`${BASE_URL}/customer/add`,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(customer)

        });

        if(!response.ok){

            const message=await response.text();

            showToast(message, "error");

            return;

        }

        showToast("Registration Successful", "success");

        window.location.href="login.html";

    }

    catch(error){

        console.log(error);

        showToast("Unable to connect to server.", "error");

    }

}

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

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