'use strict'

function navItem(active, dest, isDrawerItem) {
    const a = document.createElement('a');
    a.href = '/' + dest.url;
    a.classList.add(active === dest.id ? (isDrawerItem ? 'menu-active' : 'dock-active') : null);
    a.innerHTML = `
        <svg 
            class="size-[1.4em]"
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${dest.icon}
        </svg>
        ${isDrawerItem ? dest.friendlyName : ''}
    `

    if (isDrawerItem) {
        const item = document.createElement('li');
        item.appendChild(a);
        return item;
    } else
        return a;
}

function tabRowItem(active, handle, dest) {
    return `
        <a 
            href='/${handle}/${dest.url}' 
            role="tab"
            class="tab ${active === dest.id ? 'tab-active' : ''}">
                ${dest.friendlyName}
        </a>
    `
}

export { navItem, tabRowItem }