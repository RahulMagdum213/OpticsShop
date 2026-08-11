// =========================================
// CUSTOMER MANAGEMENT
// =========================================

const customerTable = document.getElementById("customerTable");

window.onload = function(){

    loadCustomers();

};

async function loadCustomers(){

    try{

        const response = await fetch(`${BASE_URL}/customer/getAll`);

        if(!response.ok){

            throw new Error();

        }

        const customers = await response.json();

        displayCustomers(customers);

    }

    catch(error){

        showToast("Unable to load customers.", "error");

    }

}

function displayCustomers(customers){

    let html = "";

    customers.forEach(customer=>{

        html += `

        <tr>

            <td>${customer.customerId}</td>

            <td>${customer.customerName}</td>

            <td>${customer.email}</td>

            <td>${customer.mobile}</td>

            <td>${customer.city}</td>

        </tr>

        `;

    });

    customerTable.innerHTML = html;

}