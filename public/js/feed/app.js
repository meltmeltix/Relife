'use strict'

import Api from './api.js'
import page from '//unpkg.com/page/page.mjs'
import { returnSearchBar } from './template/search-components.js'
import { buildProfile } from './template/profile-layout.js'
import { createPost } from './template/post-item.js'
import { returnTabRow } from './template/navigation-item.js'
import { appNavigation } from './util/functions/navigation.js'
import { renderProfile } from './util/functions/profile.js';

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
            if (userType === 'GUEST') page.redirect('/explore')

            document.title = 'Home | Relife'

            titleBar.innerHTML = 'Home'
            titleBar.classList.add("tw-pl-3")

            appNavigation('HOME', navDrawer, navBar, loggedUser)

            this.getAllPosts()
        })

        page('/search', () => {
            document.title = 'Search | Relife'
            titleBar.innerHTML = returnSearchBar()
            titleBar.classList.remove("tw-pl-3")
            
            // to remove
            this.contentContainer.innerHTML = ''
            this.contentContainer.classList.add('tw-p-2')

            appNavigation('SEARCH', navDrawer, navBar, loggedUser)
        })

        page('/:handle', (ctx) => {
            const handle = ctx.params.handle
            document.title = handle + ' | Relife'

            appNavigation('PROFILE', navDrawer, navBar, loggedUser)

            renderProfile(handle, userType, titleBar, contentContainer)
                .then()
        })

        page('/:handle/replies', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts replied by ' + handle + ' | Relife'
            //this.buildProfile(handle, 'REPLIES', userType, navDrawer, navBar, titleBar)
        })

        page('/:handle/media', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Media uploaded by ' + handle + ' | Relife'
            //this.buildProfile(handle, 'MEDIA', userType, navDrawer, navBar, titleBar)
        })

        page('/:handle/likes', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts liked by ' + handle + ' | Relife'
            //this.buildProfile(handle, 'LIKES', userType, navDrawer, navBar, titleBar)
        })

        page('/:handle/status/', (ctx) => {
            console.log("THROW ERROR")
        })

        page('/:handle/status/:post', (ctx) => {
            const handle = ctx.params.handle
            const post = ctx.params.post

            if (userType === 'GUEST') page.redirect('/' + handle)

            this.buildStatus(handle, post, navDrawer, navBar, titleBar)
        })

        page()
    }

    buildStatus = async(handle, post, navDrawer, navBar, titleBar) => {
        titleBar.innerHTML = 'Post'
        titleBar.classList.add("tw-pl-3")

        appNavigation('', navDrawer, navBar, loggedUser)

        this.getStatus(post, handle)
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

    getStatus = async (id, handle) => {
        const post = await Api.getStatus(id, handle)

        this.contentContainer.innerHTML = ''
        this.contentContainer.classList.add('tw-p-2')
        this.contentContainer.insertAdjacentHTML('beforeend', createPost(post, true))
    }
}

export default App