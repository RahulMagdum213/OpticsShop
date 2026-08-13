// =========================================
// ORDERS PAGE JAVASCRIPT
// =========================================


// ==========================
// GLOBAL VARIABLES
// ==========================

let ordersList = [];


const ordersContainer =
    document.getElementById("ordersContainer");


const homeBtn =
    document.getElementById("homeBtn");


const cartBtn =
    document.getElementById("cartBtn");


const accountBtn =
    document.getElementById("accountBtn");


const logoutBtn =
    document.getElementById("logoutBtn");


// ==========================
// INITIALIZE PAGE
// ==========================

window.onload = function(){

    checkLogin();

    loadOrders();

};


// ==========================
// CHECK LOGIN
// ==========================

function checkLogin(){

    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );


    if(!customer){

        window.location.href =
            "login.html";

        return false;

    }


    return true;

}


// ==========================
// LOAD ORDERS
// ==========================

async function loadOrders(){


    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );


    if(!customer){

        window.location.href =
            "login.html";

        return;

    }


    try{


        const response =
            await fetch(
                `${BASE_URL}/orders/getOrdersByCustomer/${customer.customerId}`
            );


        if(!response.ok){

            throw new Error(
                "Unable to load orders."
            );

        }


        ordersList =
            await response.json();


        // ==========================
        // LATEST ORDER FIRST
        // ==========================

        ordersList.sort(function(a, b){

            return new Date(b.orderDate)
                 - new Date(a.orderDate);

        });


        displayOrders();


    }


    catch(error){


        console.error(error);


        showToast(
            "Unable to load orders.",
            "error"
        );

    }

}


// ==========================
// DISPLAY ORDERS
// ==========================

async function displayOrders(){


    if(ordersList.length === 0){


        ordersContainer.innerHTML = `

            <h2
                style="
                    text-align:center;
                    color:white;
                "
            >

                No Orders Found

            </h2>

        `;


        return;

    }


    let html = "";


    for(const order of ordersList){


        try{


            const response =
                await fetch(
                    `${BASE_URL}/orderItem/getAll/${order.orderId}`
                );


            if(!response.ok){

                throw new Error(
                    "Unable to load order items."
                );

            }


            const orderItems =
                await response.json();


            let itemsHtml = "";


            orderItems.forEach(function(item){


                const subtotal =
                    item.price *
                    item.quantity;


                itemsHtml += `

                    <div class="order-item">


                        <h4>

                            ${item.product.productName}

                        </h4>


                        <p>

                            Brand :
                            ${item.product.brand}

                        </p>


                        <p>

                            Quantity :
                            ${item.quantity}

                        </p>


                        <p>

                            Price :
                            ₹${item.price}

                        </p>


                        <p>

                            Subtotal :
                            ₹${subtotal}

                        </p>


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

                        Order Date :
                        ${order.orderDate}

                    </p>


                    <p>

                        Status :

                        <span class="status">

                            ${order.status}

                        </span>

                    </p>


                    <br>


                    <h3>

                        Products

                    </h3>


                    ${itemsHtml}


                    <h3 class="total">

                        Total Amount :
                        ₹${order.totalAmount}

                    </h3>


                </div>

            `;


        }


        catch(error){


            console.error(error);


            html += `

                <div class="order-card">

                    <h2>

                        Order #${order.orderId}

                    </h2>


                    <p>

                        Unable to load order items.

                    </p>

                </div>

            `;

        }

    }


    ordersContainer.innerHTML =
        html;

}


// ==========================
// HOME
// ==========================

homeBtn.addEventListener(
    "click",
    function(){

        window.location.href =
            "index.html";

    }
);


// ==========================
// CART
// ==========================

cartBtn.addEventListener(
    "click",
    function(){


        const customer =
            JSON.parse(
                localStorage.getItem("customer")
            );


        if(!customer){

            window.location.href =
                "login.html";

            return;

        }


        window.location.href =
            "cart.html";

    }
);


// ==========================
// ACCOUNT
// ==========================

accountBtn.addEventListener(
    "click",
    function(){


        const customer =
            JSON.parse(
                localStorage.getItem("customer")
            );


        if(!customer){

            window.location.href =
                "login.html";

            return;

        }


        window.location.href =
            "account.html";

    }
);


// ==========================
// LOGOUT
// ==========================

logoutBtn.addEventListener(
    "click",
    function(){


        if(
            confirm(
                "Do you want to logout?"
            )
        ){


            localStorage.removeItem(
                "customer"
            );


            window.location.href =
                "login.html";

        }

    }
);