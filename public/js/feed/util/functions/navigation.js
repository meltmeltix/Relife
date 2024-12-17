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

async function profileNavigation(active, tabRow, loggedUser) {
    tabRow.innerHTML = ''

    profileTabs[destinationList.length - 1].url = loggedUser

    profileTabs.forEach(dest => {
        tabRow.insertAdjacentHTML('beforeend', tabRowItem(active, loggedUser, dest));
    })
}

export {appNavigation, profileNavigation}