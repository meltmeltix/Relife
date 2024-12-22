'use strict'

function drawerItem(active, dest) {
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
    return `
        <a href='/${dest.url}' class="${active === dest.id ? 'tw-dy-active' : ''}">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${dest.icon}
            </svg>
        </a>
    `
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

export { drawerItem, bottomNavItem, tabRowItem }