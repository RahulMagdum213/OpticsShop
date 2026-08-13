// Spring Boot Base URL

const BASE_URL = "https://opticsshop.onrender.com";

//
// const BASE_URL = "http://localhost:8080";
// =========================================
// REUSABLE TOAST NOTIFICATION
// =========================================

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    const icon = type === "success"
        ? "fa-circle-check"
        : type === "error"
            ? "fa-circle-exclamation"
            : type === "warning"
                ? "fa-triangle-exclamation"
                : "fa-circle-info";

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}
