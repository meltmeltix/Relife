import Api from './api.js'
import page from '//unpkg.com/page/page.mjs'
import { returnSearchBar } from './template/search-components.js'
import { returnProfileHeader } from './template/profile-layout.js'
import { createPost } from './template/post-item.js'
import { returnNavBarItems, returnDrawerItems, returnTabRow } from './template/navigation-item.js'

class App {
    constructor(userType, loggedUser, navDrawer, navBar, titleBar, contentContainer) {
        this.contentContainer = contentContainer

        if (userType === 'GUEST') {
            page('/explore', () => {
                titleBar.innerHTML = 'Explore'
                titleBar.classList.add("tw-pl-3")

                this.getPosts()
            })

            page('/profile/:handle', (ctx) => {
                const handle = ctx.params.handle
                console.log("Page handle:", handle)

                document.title = handle + ' | Relife'
                titleBar.innerHTML = 'User profile'
                titleBar.classList.add("tw-pl-3")

                this.getProfile(handle)
            })

            page()
        } else {
            if (navDrawer || navBar) {
                page('/home', () => {
                    document.title = 'Home | Relife'

                    titleBar.innerHTML = 'Home'
                    titleBar.classList.add("tw-pl-3")

                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItems('HOME', loggedUser) )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItems('HOME', loggedUser) )

                    this.getPosts()
                })
    
                page('/search', () => {
                    document.title = 'Search | Relife'
                    titleBar.innerHTML = returnSearchBar()
                    titleBar.classList.remove("tw-pl-3")
                    
                    // to remove
                    this.contentContainer.innerHTML = ''
                    this.contentContainer.classList.add('tw-p-2')

                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItems('SEARCH', loggedUser) )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItems('SEARCH', loggedUser) )
                })
    
                page('/profile/:handle', (ctx) => {
                    const handle = ctx.params.handle
                    console.log("Page handle:", handle)

                    document.title = handle + ' | Relife'
                    titleBar.innerHTML = ''
                    titleBar.classList.add("tw-pl-3")

                    navDrawer.innerHTML = '';
                    navDrawer.insertAdjacentHTML('beforeend', returnDrawerItems('PROFILE', loggedUser) )
    
                    navBar.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', returnNavBarItems('PROFILE', loggedUser) )

                    this.getProfile(handle)
                })
    
                page()
            }
        }
    }

    getPosts = async () => {
        console.log('Getting posts...')
        const posts = await Api.getPosts()

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.add('tw-p-2')
        for (let post of posts) {
            const p = createPost(post)
            this.contentContainer.insertAdjacentHTML('beforeend', p)
        }
    }

    getProfile = async (handle) => {
        console.log('Getting user profile...')
        const profile = await Api.getProfile(handle)

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.remove('tw-p-2')
        this.contentContainer.insertAdjacentHTML('beforeend', returnProfileHeader(profile))
        this.contentContainer.insertAdjacentHTML('beforeend', returnTabRow())
    }
}

export default App