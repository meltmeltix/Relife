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
    actionButton.classList.add('tw:dy-btn', 'tw:dy-btn-secondary', 'tw:w-full', 'tw:px-3', 'tw:rounded-2xl');
    actionButton.setAttribute('onclick', 'post_modal.showModal()');
    actionButton.innerHTML = `Post`

    const navDrawer = document.createElement('ul')
    navDrawer.classList.add('tw:dy-menu', 'tw:p-0', 'tw:gap-2', 'tw:w-full', 'tw:py-2')
    navDrawer.innerHTML = ''

    const navBar = document.createElement('div');
    navBar.classList.add('tw:dy-dock', 'tw:dy-dock-sm');
    navBar.innerHTML = ''

    destinationList[destinationList.length - 1].url = loggedUser

    destinationList.forEach(dest => {
        navDrawer.appendChild(navItem(active, dest, true));
        navBar.appendChild(navItem(active, dest, false));
    })

    sideNavigation.innerHTML = ''
    sideNavigation.appendChild(actionButton)
    sideNavigation.appendChild(navDrawer)

    bottomNavigation.innerHTML = '';
    bottomNavigation.appendChild(navBar);
}

function profileNavigation(active, loggedUser, contentContainer) {
    const tabRow = document.createElement('div')
    tabRow.classList.add('tw:dy-tabs', 'tw:dy-tabs-bordered')
    tabRow.role = 'tablist'
    tabRow.innerHTML = ''

    profileTabs.forEach(dest => {
        tabRow.insertAdjacentHTML('beforeend', tabRowItem(active, loggedUser, dest));
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
        backButton.classList.add('tw:dy-btn', 'tw:dy-btn-square', 'tw:dy-btn-ghost')
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
        searchBar.classList.add('tw:dy-input', 'tw:w-full', 'tw:pl-2')
        searchBar.placeholder = 'Search...'

        titleBar.appendChild(searchBar)
    } else {
        const headlineText = document.createElement('span')
        headlineText.classList.add('tw:w-full', 'tw:ml-2')
        headlineText.innerText = headline

        titleBar.appendChild(headlineText)
    }

    if (dropDownMenu) {
        const dropDownMenu = document.createElement('div');
        dropDownMenu.classList.add('tw:dy-dropdown', 'tw:dy-dropdown-end', 'tw:sm:hidden');

        const button = document.createElement('div');
        button.tabIndex = 0;
        button.role = 'button';
        button.classList.add('tw:dy-btn', 'tw:dy-btn-square', 'tw:dy-btn-ghost', 'sm:tw:hidden');
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
                <ul tabindex="0" class="tw:dy-dropdown-content tw:dy-menu tw:bg-base-200 tw:w-32 tw:shadow-sm">
                    <li><input type="submit" value="Log out"></li>
                </ul>
            </form>
        `;

        dropDownMenu.appendChild(button);
        dropDownMenu.appendChild(form);
        titleBar.appendChild(dropDownMenu);
    }
}

export {renderNavigation, profileNavigation, populateTitleBar}