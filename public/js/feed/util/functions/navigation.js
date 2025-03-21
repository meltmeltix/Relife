'use strict'

import {destinationList, profileTabs} from "../../data/constants/navigation.js"
import {navItem, tabRowItem} from "../../template/navigation-item.js"

function renderNavigation(userType, loggedUser, active, sideNavigation, bottomNavigation) {
    if (userType === 'GUEST')
        guestNavigation(sideNavigation, bottomNavigation)
    else if (userType === 'USER') {
        appNavigation(active, sideNavigation, bottomNavigation, loggedUser)
    }
}

function guestNavigation() {

}

function appNavigation(active, sideNavigation, bottomNavigation, loggedUser) {
    const actionButton = document.createElement('button');
    actionButton.classList.add('btn', 'btn-secondary', 'w-full', 'px-3', 'rounded-2xl');
    actionButton.setAttribute('onclick', 'post_modal.showModal()');
    actionButton.innerHTML = `Post`

    const fab = document.createElement('button');
    fab.classList.add('btn', 'btn-secondary')
    fab.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen">
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
        </svg>
        Post
    `
    fab.onclick = () => { post_modal.showModal() }

    const navDrawer = document.createElement('ul')
    navDrawer.classList.add('menu', 'p-0', 'gap-2', 'w-full', 'py-2')
    navDrawer.innerHTML = ''

    const spacer = document.createElement('div')
    spacer.classList.add('grow', 'w-full', 'h-full')

    const navBar = document.createElement('div');
    navBar.classList.add('dock', 'dock-sm');
    navBar.innerHTML = ''

    destinationList[destinationList.length - 1].url = loggedUser

    destinationList.forEach(dest => {
        navDrawer.appendChild(navItem(active, dest, true));
        navBar.appendChild(navItem(active, dest, false));
    })

    sideNavigation.innerHTML = ''
    sideNavigation.appendChild(actionButton)
    sideNavigation.appendChild(navDrawer)
    sideNavigation.appendChild(spacer)
    sideNavigation.appendChild(logOutOption())

    bottomNavigation.innerHTML = '';
    bottomNavigation.appendChild(fab)
    bottomNavigation.appendChild(navBar);
}

function profileNavigation(active, loggedUser, contentContainer) {
    const tabRow = document.createElement('div')
    tabRow.classList.add('tabs', 'tabs-border')
    tabRow.role = 'tablist'
    tabRow.innerHTML = ''

    profileTabs.forEach(dest => {
        tabRow.appendChild(tabRowItem(active, loggedUser, dest));
    })

    contentContainer.appendChild(tabRow)
}

function populateTitleBar(
    titleBar,
    headline = 'Relife',
    backButton = false,
    searchBar = false,
    dropDownMenu = true
) {
    titleBar.innerHTML = ''
    if (backButton) {
        const backButton = document.createElement('button')
        backButton.classList.add('btn', 'btn-square', 'btn-ghost')
        backButton.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
        `
        backButton.addEventListener('click', () => { history.back() })

        titleBar.appendChild(backButton)
    }

    if (searchBar) {
        const searchBar = document.createElement('input')
        searchBar.type = 'search'
        searchBar.classList.add('input', 'w-full', 'pl-2')
        searchBar.placeholder = 'Search...'

        titleBar.appendChild(searchBar)
    } else {
        const headlineText = document.createElement('span')
        headlineText.classList.add('w-full', 'ml-2')
        headlineText.innerText = headline

        titleBar.appendChild(headlineText)
    }

    if (dropDownMenu) {
        const dropDownMenu = document.createElement('div');
        dropDownMenu.classList.add('dropdown', 'dropdown-end', 'sm:hidden');

        const button = document.createElement('div');
        button.tabIndex = 0;
        button.role = 'button';
        button.classList.add('btn', 'btn-square', 'btn-ghost', 'sm:hidden');
        button.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="lucide lucide-ellipsis-vertical">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
            </svg>
        `;

        const form = document.createElement('form');
        form.action = '/logout';
        form.method = 'POST';
        form.innerHTML = `
            <form action="/logout" method="post">
                <ul tabindex="0" class="dropdown-content menu bg-base-200 w-32 shadow-sm">
                    <li><input type="submit" value="Log out"></li>
                </ul>
            </form>
        `;

        dropDownMenu.appendChild(button);
        dropDownMenu.appendChild(form);
        titleBar.appendChild(dropDownMenu);
    }
}

function logOutOption() {
    const form = document.createElement('form');
    form.action = '/logout';
    form.method = 'POST';

    const menu = document.createElement('div');
    menu.classList.add('menu', 'p-0', 'gap-2', 'w-full', 'py-2')

    const menuItem = document.createElement('li');

    const logout = document.createElement('button');
    logout.type = 'submit';
    logout.innerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" 
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
            stroke-linejoin="round" class="size-[1.4em]"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
        Log out
    `;

    menuItem.appendChild(logout);
    menu.appendChild(menuItem);
    form.appendChild(menu);

    return form;
}

export {renderNavigation, profileNavigation, populateTitleBar}