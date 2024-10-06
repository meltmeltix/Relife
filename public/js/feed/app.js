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
            document.title = 'Explore | Relife'

            titleBar.innerHTML = 'Explore'
            titleBar.classList.add("tw-pl-3")

            this.getAllPosts()
        })

        page('/home', () => {
            if (userType == 'GUEST') page.redirect('/explore')

            document.title = 'Home | Relife'

            titleBar.innerHTML = 'Home'
            titleBar.classList.add("tw-pl-3")

            navDrawer.innerHTML = '';
            navDrawer.insertAdjacentHTML('beforeend', returnDrawerItems('HOME', loggedUser) )

            navBar.innerHTML = '';
            navBar.insertAdjacentHTML('beforeend', returnNavBarItems('HOME', loggedUser) )

            this.getAllPosts()
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

        page('/:handle', (ctx) => {
            const handle = ctx.params.handle
            document.title = handle + ' | Relife'
            this.buildProfile(handle, 'POSTS', userType, navDrawer, navBar, titleBar)
            this.getUserPosts(handle)
        })

        page('/:handle/replies', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts replied by ' + handle + ' | Relife'
            this.buildProfile(handle, 'REPLIES', userType, navDrawer, navBar, titleBar)
        })

        page('/:handle/media', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Media uploaded by ' + handle + ' | Relife'
            this.buildProfile(handle, 'MEDIA', userType, navDrawer, navBar, titleBar)
        })

        page('/:handle/likes', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts liked by ' + handle + ' | Relife'
            this.buildProfile(handle, 'LIKES', userType, navDrawer, navBar, titleBar)
        })

        page('/:handle/status/', (ctx) => {
            const handle = ctx.params.handle
            page.redirect('/' + handle)
        })

        page('/:handle/status/:post', (ctx) => {
            const handle = ctx.params.handle
            const post = ctx.params.post

            if (userType == 'GUEST') page.redirect('/' + handle)

            this.buildStatus(hande, post, userType, navDrawer, navBar, titleBar)
        })

        page()
    }

    buildStatus = async(hande, post, userType, navDrawer, navBar, titleBar) => {
        titleBar.innerHTML = 'Post'
        titleBar.classList.add("tw-pl-3")

        // TODO
    }

    buildProfile = async(handle, page, userType, navDrawer, navBar, titleBar) => {
        titleBar.innerHTML = `${userType == 'GUEST' ? 'User profile' : 'Profile'}`
        titleBar.classList.add("tw-pl-3")
        
        if (userType == 'USER') {
            navDrawer.innerHTML = '';
            navDrawer.insertAdjacentHTML('beforeend', returnDrawerItems('PROFILE', loggedUser) )

            navBar.innerHTML = '';
            navBar.insertAdjacentHTML('beforeend', returnNavBarItems('PROFILE', loggedUser) )
        }

        this.getProfile(handle, page, userType)
    }

    getAllPosts = async () => {
        const posts = await Api.getAllPosts()

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.add('tw-p-2')
        for (let post of posts) {
            const p = createPost(post, false)
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

    getStatus = async (id) => {
        const post = await Api.getPost(id, handle)

    }

    getProfile = async (handle, active, userType) => {
        const profile = await Api.getProfile(handle)

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.add('tw-p-2')
        this.contentContainer.insertAdjacentHTML('beforeend', returnProfileHeader(profile))

        if (userType != 'GUEST')
            this.contentContainer.insertAdjacentHTML('beforeend', returnTabRow(active, handle))
    }
}

export default App