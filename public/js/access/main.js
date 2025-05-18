import Toastify from "/js/utils/toastify-es.js";

if (toastMessage != null) {
    if (toastType === 'SUCCESS') showSuccessToast(toastMessage);
    if (toastType === 'ERROR') showErrorToast(toastMessage);
}

function showSuccessToast(message) {
    Toastify({
        text: message,
        style: {
            color: "var(--color-success-content)",
            background: "var(--color-success)",
            boxShadow: "none"
        }
    }).showToast()
}

function showErrorToast(message) {
    Toastify({
        text: message,
        style: {
            color: "var(--color-error-content)",
            background: "var(--color-error)",
            boxShadow: "none"
        }
    }).showToast()
}