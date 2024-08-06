import page from '//unpkg.com/page/page.mjs'
import { returnDrawerItem, returnNavBarItem } from './template/drawer-item.js'

class App {
    constructor(userType, navDrawer, navBar) {

        if (navDrawer || navBar) {
            page('/home', () => {
                document.title = 'Home'
                navDrawer.innerHTML = '';
                navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('HOME') )

                navBar.innerHTML = '';
                navBar.insertAdjacentHTML('beforeend', returnNavBarItem('HOME') )
            })

            page('/search', () => {
                document.title = 'Search'
                navDrawer.innerHTML = '';
                navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('SEARCH') )

                navBar.innerHTML = '';
                navBar.insertAdjacentHTML('beforeend', returnNavBarItem('SEARCH') )
            })

            page('/profile', () => {
                document.title = 'Profile'
                navDrawer.innerHTML = '';
                navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('PROFILE') )

                navBar.innerHTML = '';
                navBar.insertAdjacentHTML('beforeend', returnNavBarItem('PROFILE') )
            })

            page()
        }
    }
}

export default App