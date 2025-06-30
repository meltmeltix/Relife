const textarea = document.getElementById('post_textarea')
const counter = document.getElementById('post_textarea_counter')
const upload = document.getElementById('post_upload')
const submit = document.getElementById('post_submit')

document.getElementById('post_author').value = loggedUser

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

textarea.addEventListener("input", ({ currentTarget: target }) => {
    updateCounter();
    checkFormValidity();
});

upload.addEventListener("change", () => {
    checkFormValidity();
});