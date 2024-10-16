'use strict'

import { destinationList } from "../../data/constants/navigation.js"
import { bottomNavItem, drawerItem } from "../../template/navigation-item.js"

async function appNavigation(active, navDrawer, navBar, loggedUser) {
    navDrawer.innerHTML = ''
    navBar.innerHTML = ''

    destinationList[destinationList.length - 1].url = loggedUser

    destinationList.forEach(dest => {
        navDrawer.insertAdjacentHTML('beforeend', drawerItem(active, dest));
        navBar.insertAdjacentHTML('beforeend', bottomNavItem(active, dest));
    })
}

async function profileNavigation(active, loggedUser) {

}

export default { appNavigation, profileNavigation }