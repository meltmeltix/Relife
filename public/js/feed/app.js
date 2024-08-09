import page from '//unpkg.com/page/page.mjs'
import { returnSearchBar } from './template/search-components.js'
import { returnDrawerItem, returnNavBarItem } from './template/drawer-item.js'

class App {
    constructor(userType, navDrawer, navBar, titleBar, contentContainer) {

        if (userType === 'GUEST') {
            page('/explore', () => {
                titleBar.innerHTML = 'Explore'
                this.showAllPosts()
            })

            page()
        } else {
            if (navDrawer || navBar) {
                page('/home', () => {
                    document.title = 'Home'
                    titleBar.innerHTML = 'Home'
                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('HOME') )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItem('HOME') )
                })
    
                page('/search', () => {
                    document.title = 'Search'

                    titleBar.innerHTML = returnSearchBar()

                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('SEARCH') )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItem('SEARCH') )
                })
    
                page('/profile', () => {
                    document.title = 'Profile'
                    titleBar.innerHTML = 'Profile'
                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('PROFILE') )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItem('PROFILE') )
                })
    
                page()
            }
        }
    }
}

export default App