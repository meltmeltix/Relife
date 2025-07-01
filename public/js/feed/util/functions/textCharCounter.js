const textarea = document.getElementById('textarea_max_char');
const counter = document.getElementById('textarea_counter');

function updateCounter() {
    const maxLength = textarea.getAttribute("maxlength");
    const currentLength = textarea.value.length;
    counter.innerHTML = currentLength + ' / ' + maxLength;
}

document.addEventListener("DOMContentLoaded", () => {
    updateCounter();
});

textarea.addEventListener("input", () => {
    updateCounter();
});