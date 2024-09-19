import Api from './api.js'
import page from '//unpkg.com/page/page.mjs'
import { returnSearchBar } from './template/search-components.js'
import { returnProfileHeader } from './template/profile-layout.js'
import { createPost } from './template/post-item.js'
import { returnNavBarItems, returnDrawerItems, returnTabRow } from './template/navigation-item.js'

class App {
    constructor(userType, loggedUser, navDrawer, navBar, titleBar, contentContainer) {
        this.contentContainer = contentContainer

        page('/explore', () => {
            if (userType == 'USER') page.redirect('/home')

            document.title = 'Explore | Relife'

            titleBar.innerHTML = 'Explore'
            titleBar.classList.add("tw-pl-3")

            this.getPosts()
        })

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

        page('/profile', () => {
            // handle logic to send guest back to explore and registered user to personal profile
        })

        page('/profile/:handle', (ctx) => {
            const handle = ctx.params.handle
            document.title = handle + ' | Relife'
            this.buildProfile(handle, 'POSTS', userType, navDrawer, navBar, titleBar)
            this.getUserPosts(handle)
        })

        page('/profile/:handle/replies', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts replied by ' + handle + ' | Relife'
            this.buildProfile(handle, 'REPLIES', userType, navDrawer, navBar, titleBar)
        })

        page('/profile/:handle/media', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Media uploaded by ' + handle + ' | Relife'
            this.buildProfile(handle, 'MEDIA', userType, navDrawer, navBar, titleBar)
        })

        page('/profile/:handle/likes', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts liked by ' + handle + ' | Relife'
            this.buildProfile(handle, 'LIKES', userType, navDrawer, navBar, titleBar)
        })

        page()
    }

    buildProfile = async(handle, page, userType, navDrawer, navBar, titleBar) => {
        titleBar.innerHTML = `${userType == 'GUEST' ? 'User profile' : ''}`
        titleBar.classList.add("tw-pl-3")
        
        if (userType == 'USER') {
            navDrawer.innerHTML = '';
            navDrawer.insertAdjacentHTML('beforeend', returnDrawerItems('PROFILE', loggedUser) )

            navBar.innerHTML = '';
            navBar.insertAdjacentHTML('beforeend', returnNavBarItems('PROFILE', loggedUser) )
        }

        this.getProfile(handle, page, userType)
    }

    getPosts = async () => {
        const posts = await Api.getPosts()

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.add('tw-p-2')
        for (let post of posts) {
            const p = createPost(post)
            this.contentContainer.insertAdjacentHTML('beforeend', p)
        }
    }

    getUserPosts = async(handle) => {
        const posts = await Api.getUserPosts(handle)

        // TODO Add padding to content
        for (let post of posts) {
            const p = createPost(post)
            this.contentContainer.insertAdjacentHTML('beforeend', p)
        }
    }

    getProfile = async (handle, active, userType) => {
        const profile = await Api.getProfile(handle)

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.remove('tw-p-2')
        this.contentContainer.insertAdjacentHTML('beforeend', returnProfileHeader(profile))
        this.contentContainer.insertAdjacentHTML('beforeend', returnTabRow(active, handle, userType))
    }
}

export default App