const textarea = document.getElementById('status_textarea')
const counter = document.getElementById('status_textarea_counter')
const upload = document.getElementById('status_upload')
const submit = document.getElementById('status_submit')

document.getElementById('status_author').value = loggedUser

function updateCounter() {
    const maxLength = textarea.getAttribute("maxlength");
    const currentLength = textarea.value.length;
    counter.innerHTML = currentLength + ' / ' + maxLength;
}

function checkFormValidity() {
    const file = upload.files[0];
    const isTextareaFilled = textarea.value.length > 0;
    const isFileValid = file && file.size <= 200 * 1024; // 200KB in bytes

    submit.disabled = !(isTextareaFilled || isFileValid);
}

document.addEventListener("DOMContentLoaded", () => {
    updateCounter();
    checkFormValidity();
});

textarea.addEventListener("input", () => {
    updateCounter();
    checkFormValidity();
});

upload.addEventListener("change", () => {
    checkFormValidity();
});