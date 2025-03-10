'use strict'

function navItem(active, dest, isDrawerItem) {
    const a = document.createElement('a');
    a.href = '/' + dest.url;
    a.classList.add(active === dest.id ? 'tw-dy-active' : null);
    a.innerHTML = `
        <svg 
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

function drawerItem(active, dest) {
    const item = document.createElement('li');
    const a = document.createElement('a');

    a.href = '/' + dest.url;


    return `
        <li>
            <a href='/${dest.url}' class="${active === dest.id ? 'tw-dy-active' : ''}">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${dest.icon}
                </svg>
                ${dest.friendlyName}
            </a>
        </li>
    `
}

function bottomNavItem(active, dest) {
    const item = document.createElement('a');
    item.href = '/' + dest.url;
    item.classList.add(active === dest.id ? 'tw-dy-active' : '');
    item.text = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${dest.icon}
        </svg>
    `

    return item;

    /*return `
        <a href='/${dest.url}' class="${active === dest.id ? 'tw-dy-active' : ''}">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${dest.icon}
            </svg>
        </a>
    `*/
}

function tabRowItem(active, handle, dest) {
    return `
        <a 
            href='/${handle}/${dest.url}' 
            role="tab"
            class="tw-dy-tab ${active === dest.id ? 'tw-dy-tab-active' : ''}">
                ${dest.friendlyName}
        </a>
    `
}

export { navItem, drawerItem, bottomNavItem, tabRowItem }