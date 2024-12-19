'use strict'

import {destinationList, profileTabs} from "../../data/constants/navigation.js"
import {bottomNavItem, drawerItem, tabRowItem} from "../../template/navigation-item.js"

async function appNavigation(active, navDrawer, navBar, loggedUser) {
    navDrawer.innerHTML = ''
    navBar.innerHTML = ''

    destinationList[destinationList.length - 1].url = loggedUser

    destinationList.forEach(dest => {
        navDrawer.insertAdjacentHTML('beforeend', drawerItem(active, dest));
        navBar.insertAdjacentHTML('beforeend', bottomNavItem(active, dest));
    })
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

export {appNavigation, profileNavigation}