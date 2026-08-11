function getCustomer(){

    return JSON.parse(localStorage.getItem("customer"));

}

function getCustomerId(){

    const customer=getCustomer();

    return customer.customerId;

}

function logout(){

    localStorage.removeItem("customer");

    window.location.href="login.html";

}