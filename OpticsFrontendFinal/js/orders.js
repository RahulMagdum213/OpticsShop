// =========================================
// ORDERS PAGE JAVASCRIPT
// =========================================

// ==========================
// GLOBAL VARIABLES
// ==========================

let ordersList = [];

const ordersContainer = document.getElementById("ordersContainer");

const homeBtn = document.getElementById("homeBtn");

const cartBtn = document.getElementById("cartBtn");

const logoutBtn = document.getElementById("logoutBtn");

// ==========================
// INITIALIZE PAGE
// ==========================

window.onload = function(){

    loadOrders();

};

// ==========================
// LOAD ORDERS
// ==========================

async function loadOrders(){

    const customer = JSON.parse(localStorage.getItem("customer"));

    if(!customer){

        window.location.href = "login.html";

        return;
    }

    try{

        const response = await fetch(
            `${BASE_URL}/orders/getOrdersByCustomer/${customer.customerId}`
        );

        if(!response.ok){

            throw new Error("Unable to load orders.");

        }

        ordersList = await response.json();

        // Sort orders: latest order first
        ordersList.sort((a, b) => {
            return new Date(b.orderDate) - new Date(a.orderDate);
        });

        displayOrders();

    }

    catch(error){

        console.error(error);

        alert("Unable to load orders.");

    }
}

// ==========================
// DISPLAY ORDERS
// ==========================

async function displayOrders() {

    if (ordersList.length === 0) {

        ordersContainer.innerHTML = `

            <h2 style="text-align:center;color:white;">

                No Orders Found

            </h2>

        `;

        return;

    }

    let html = "";

    for (const order of ordersList) {

        const response = await fetch(`${BASE_URL}/orderItem/getAll/${order.orderId}`);

        const orderItems = await response.json();

        let itemsHtml = "";

        orderItems.forEach(item => {

            const subtotal = item.price * item.quantity;

            itemsHtml += `

                <div class="order-item">

                    <h4>${item.product.productName}</h4>

                    <p>Brand : ${item.product.brand}</p>

                    <p>Quantity : ${item.quantity}</p>

                    <p>Price : ₹${item.price}</p>

                    <p>Subtotal : ₹${subtotal}</p>

                    <hr>

                </div>

            `;

        });

        html += `

        <div class="order-card">

           <h2>

    Order Summary

</h2>

            <p>

                Order Date : ${order.orderDate}

            </p>

            <p>

                Status :

                <span class="status">

                    ${order.status}

                </span>

            </p>

            <br>

            <h3>Products</h3>

            ${itemsHtml}

            <h3 class="total">

                Total Amount : ₹${order.totalAmount}

            </h3>

        </div>

        `;

    }

    ordersContainer.innerHTML = html;

}

// ==========================
// HOME
// ==========================

homeBtn.addEventListener("click",function(){

    window.location.href="index.html";

});

// ==========================
// CART
// ==========================

cartBtn.addEventListener("click",function(){

    window.location.href="cart.html";

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