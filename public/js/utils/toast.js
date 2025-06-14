import Toastify from "/js/utils/libs/toastify-es.js";

function showToast(message, type) {
    const style =
        type === 'SUCCESS' ? {
            color: "var(--color-success-content)",
            background: "var(--color-success)",
            boxShadow: "none" } :
        type === 'ERROR' ? {
            color: "var(--color-error-content)",
            background: "var(--color-error)",
            boxShadow: "none" } :
        type === 'INFO' ? {
            color: "var(--color-info-content)",
            background: "var(--color-info)",
            boxShadow: "none" } :
        type === 'WARNING' ? {
            color: "var(--color-warning-content)",
            background: "var(--color-warning)",
            boxShadow: "none" } :
        null;

    Toastify({
        text: message,
        style: style,
        position: "right",
    }).showToast()
}

export { showToast };