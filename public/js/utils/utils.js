function createEmptyMessage(message) {
    const infoText = document.createElement('p');
    infoText.classList.add('p-4', 'opacity-75');
    infoText.textContent = message;

    const container = document.createElement("div");
    container.classList.add('flex', 'flex-col', 'h-1/3', 'items-center', 'justify-center');
    container.appendChild(infoText);
    return container;
}

export { createEmptyMessage }