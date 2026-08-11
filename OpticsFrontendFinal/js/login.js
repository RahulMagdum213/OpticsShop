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