import Api from './api.js'
import page from '//unpkg.com/page/page.mjs'
import { returnSearchBar } from './template/search-components.js'
import { createPost } from './template/post-item.js'
import { returnDrawerItem, returnNavBarItem } from './template/drawer-item.js'

class App {
    constructor(userType, navDrawer, navBar, titleBar, contentContainer) {
        this.contentContainer = contentContainer

        if (userType === 'GUEST') {
            page('/explore', () => {
                titleBar.innerHTML = 'Explore'

                this.getPosts()
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

                    this.getPosts()
                })
    
                page('/search', () => {
                    document.title = 'Search'
                    titleBar.innerHTML = returnSearchBar()
                    
                    // to remove
                    this.contentContainer.innerHTML = ''

                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('SEARCH') )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItem('SEARCH') )
                })
    
                page('/profile', () => {
                    document.title = 'Profile'
                    titleBar.innerHTML = 'Profile'

                    // to remove
                    this.contentContainer.innerHTML = ''

                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItem('PROFILE') )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItem('PROFILE') )
                })
    
                page()
            }
        }
    }

    getPosts = async () => {
        console.log('Getting posts...')

        const posts = await Api.getPosts()
        this.contentContainer.innerHTML = ''

        for (let post of posts) {
            const p = createPost(post)
            this.contentContainer.insertAdjacentHTML('beforeend', p)
        }
    }
}

export default App