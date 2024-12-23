'use strict'

import {destinationList, profileTabs} from "../../data/constants/navigation.js"
import {bottomNavItem, drawerItem, tabRowItem} from "../../template/navigation-item.js"

function appNavigation(active, navDrawer, navBar, loggedUser) {
    if (navDrawer && navBar) {
        navDrawer.innerHTML = ''
        navBar.innerHTML = ''

        destinationList[destinationList.length - 1].url = loggedUser

        destinationList.forEach(dest => {
            navDrawer.insertAdjacentHTML('beforeend', drawerItem(active, dest));
            navBar.insertAdjacentHTML('beforeend', bottomNavItem(active, dest));
        })
    }
}

function profileNavigation(active, loggedUser, contentContainer) {
    const tabRow = document.createElement('div')
    tabRow.classList.add('tw-dy-tabs', 'tw-dy-tabs-bordered')
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
        backButton.classList.add('tw-dy-btn', 'tw-dy-btn-square', 'tw-dy-btn-ghost')
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
        searchBar.classList.add('tw-dy-input', 'tw-w-full', 'tw-pl-2')
        searchBar.placeholder = 'Search...'

        titleBar.appendChild(searchBar)
    } else {
        const headlineText = document.createElement('span')
        headlineText.classList.add('tw-w-full', 'tw-ml-2')
        headlineText.innerText = headline

        titleBar.appendChild(headlineText)
    }

    if (dropDownMenu) {
        const dropDownMenu = document.createElement('div')
        dropDownMenu.classList.add('tw-flex-none', 'tw-dy-dropdown', 'tw-dy-dropdown-end', 'sm:tw-hidden')
        dropDownMenu.innerHTML = `
            <div tabindex="0" role="button" class="tw-dy-btn tw-dy-btn-square tw-dy-btn-ghost">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                    class="lucide lucide-ellipsis-vertical">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="12" cy="5" r="1"/>
                        <circle cx="12" cy="19" r="1"/>
                </svg>
            </div>
            <form action="/logout" method="post">
                <ul tabindex="0" class="tw-dy-dropdown-content">
                    <li><input type="submit" value="Log out"></li>
                </ul>
            </form>
        `

        titleBar.appendChild(dropDownMenu)
    }
}

export {appNavigation, profileNavigation, populateTitleBar}