// ====================================
// ORDERS MANAGEMENT
// ====================================

const ordersTable = document.getElementById("ordersTable");

window.onload = function(){

    loadOrders();

}

// ===============================
// LOAD ORDERS
// ===============================

async function loadOrders(){

    try{

        const response = await fetch(`${BASE_URL}/orders/getAll`);

        if(!response.ok){

            throw new Error("Unable to load orders.");

        }

        const orders = await response.json();

        displayOrders(orders);

    }

    catch(error){

        console.error(error);

        showToast("Unable to load orders.", "error");

    }

}

// ===============================
// DISPLAY ORDERS
// ===============================

function displayOrders(orders){

    let html="";

    orders.forEach(order=>{

        html += `

        <tr>

            <td>${order.orderId}</td>

            <td>${order.customer.customerName}</td>

            <td>${order.orderDate}</td>

            <td>${order.status}</td>

            <td>₹${order.totalAmount}</td>

        </tr>

        `;

    });

    ordersTable.innerHTML = html;

}