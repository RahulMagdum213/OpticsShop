// =========================================
// CART PAGE JAVASCRIPT
// =========================================

// ==========================
// GLOBAL VARIABLES
// ==========================

let cartList = [];

const cartItems = document.getElementById("cartItems");

const totalAmount = document.getElementById("totalAmount");

const placeOrderBtn = document.getElementById("placeOrderBtn");

const homeBtn = document.getElementById("homeBtn");

const ordersBtn = document.getElementById("ordersBtn");

const logoutBtn = document.getElementById("logoutBtn");

// ==========================
// INITIALIZE
// ==========================

window.onload = function(){

    loadCart();

};

// ==========================
// LOAD CART
// ==========================

async function loadCart(){

    const customer = JSON.parse(localStorage.getItem("customer"));

    if(!customer){

        window.location.href = "login.html";

        return;

    }

    try{

        const response = await fetch(`${BASE_URL}/cart/getCartByCustomer/${customer.customerId}`);

        if(!response.ok){

            throw new Error("Unable to load cart.");

        }

        cartList = await response.json();

        displayCart();

    }

    catch(error){

        console.error(error);

        showToast("Unable to load cart.", "error");

    }

}

// ==========================
// DISPLAY CART
// ==========================

function displayCart(){

    if(cartList.length==0){

        cartItems.innerHTML=`

            <h2 style="text-align:center;color:white;">

                Your cart is empty.

            </h2>

        `;

        totalAmount.innerHTML=0;

        return;

    }

    let html="";

    let total=0;

    cartList.forEach(cart=>{

        const product=cart.product;

        const subtotal=product.price * cart.quantity;

        total += subtotal;

        let image = product.imageUrl;

        if(!image || image.trim()===""){

            image="images/no-image.png";

        }

        html += `

        <div class="cart-card">

            <img src="${image}">

            <div class="cart-details">

                <h2>${product.productName}</h2>

                <p>

                    Brand : ${product.brand}

                </p>

                <p class="price">

                    ₹${product.price}

                </p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${cart.cartId})">

                        -

                    </button>

                    <span>

                        ${cart.quantity}

                    </span>

                    <button onclick="increaseQuantity(${cart.cartId})">

                        +

                    </button>

                </div>

                <p>

                    Subtotal :
                    ₹${subtotal}

                </p>

                <button
                    class="remove-btn"

                    onclick="removeCart(${cart.cartId})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    cartItems.innerHTML=html;

    totalAmount.innerHTML=total;

}

// ==========================
// INCREASE QUANTITY
// ==========================

function increaseQuantity(cartId){

    const cart = cartList.find(c => c.cartId === cartId);

    cart.quantity++;

    updateCart(cart);

}

// ==========================
// DECREASE QUANTITY
// ==========================

function decreaseQuantity(cartId){

    const cart = cartList.find(c => c.cartId === cartId);

    if(cart.quantity > 1){

        cart.quantity--;

        updateCart(cart);

    }

}

// ==========================
// UPDATE CART
// ==========================

async function updateCart(cart){

    try{

        const response = await fetch(`${BASE_URL}/cart/update`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(cart)

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        loadCart();

    }

    catch(error){

        console.error(error);

        showToast("Unable to update cart.", "error");

    }

}

// ==========================
// REMOVE CART
// ==========================

async function removeCart(cartId){

    if(!confirm("Remove this product from cart?")){

        return;

    }

    try{

        const response = await fetch(`${BASE_URL}/cart/delete/${cartId}`,{

            method:"DELETE"

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        loadCart();

    }

    catch(error){

        console.error(error);

        showToast("Unable to remove product.", "error");

    }

}

// ==========================
// PLACE ORDER
// ==========================

placeOrderBtn.addEventListener("click", placeOrder);

async function placeOrder(){

    if(cartList.length===0){

        showToast("Cart is empty.", "warning");

        return;

    }

    const customer = JSON.parse(localStorage.getItem("customer"));

    try{

        const response = await fetch(`${BASE_URL}/orders/placeOrder/${customer.customerId}`,{

            method:"POST"

        });

        if(!response.ok){

            const message = await response.text();

            showToast(message, "error");

            return;

        }

        showToast("Order Placed Successfully.", "success");

        window.location.href="orders.html";

    }

    catch(error){

        console.error(error);

        showToast("Unable to place order.", "error");

    }

}

// ==========================
// HOME
// ==========================

homeBtn.addEventListener("click",function(){

    window.location.href="index.html";

});

// ==========================
// ORDERS
// ==========================

ordersBtn.addEventListener("click",function(){

    window.location.href="orders.html";

});

// ==========================
// LOGOUT
// ==========================

logoutBtn.addEventListener("click",function(){

    if(confirm("Do you want to logout?")){

        localStorage.removeItem("customer");

        window.location.href="login.html";

    }

});