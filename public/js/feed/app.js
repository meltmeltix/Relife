'use strict'

import page from '//unpkg.com/page/page.mjs'
import { returnSearchBar } from './template/search-components.js'
import { appNavigation, profileNavigation } from './util/functions/navigation.js'
import { renderProfile, renderStatus } from './util/functions/profile.js';
import Posts from "./service/posts.js";

class App {
    constructor(userType, loggedUser, navDrawer, navBar, titleBar, contentContainer) {
        this.contentContainer = contentContainer

        page('/explore', () => {
            document.title = 'Explore | Relife'

            titleBar.innerHTML = 'Explore'
            titleBar.classList.add("tw-pl-3")

            Posts.getAllPosts(contentContainer)
        })

        page('/home', () => {
            if (userType === 'GUEST') page.redirect('/explore')

            document.title = 'Home | Relife'

            titleBar.innerHTML = 'Home'
            titleBar.classList.add("tw-pl-3")

            appNavigation('HOME', navDrawer, navBar, loggedUser)

            Posts.getAllPosts(contentContainer)
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

            renderProfile(handle, userType, titleBar, this.contentContainer)
                .then(() => {
                    profileNavigation('POSTS', handle, this.contentContainer)
                    Posts.getUserPosts(handle, null, this.contentContainer).then(() => {})
                })
        })

        page('/:handle/replies', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts replied by ' + handle + ' | Relife'

            renderProfile(handle, userType, titleBar, this.contentContainer)
                .then(() => {
                    profileNavigation('REPLIES', handle, this.contentContainer)
                })
        })

        page('/:handle/media', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Media uploaded by ' + handle + ' | Relife'

            renderProfile(handle, userType, titleBar, this.contentContainer)
                .then(() => {
                    profileNavigation('MEDIA', handle, this.contentContainer)
                    Posts.getUserPosts(handle, 'MEDIA', this.contentContainer).then(() => {})
                })
        })

        page('/:handle/likes', (ctx) => {
            const handle = ctx.params.handle
            document.title = 'Posts liked by ' + handle + ' | Relife'

            renderProfile(handle, userType, titleBar, this.contentContainer)
                .then(() => {
                    profileNavigation('LIKES', handle, this.contentContainer)
                })
        })

        page('/:handle/status/', (ctx) => {
            console.log("THROW ERROR")
        })

        page('/:handle/status/:post', (ctx) => {
            const handle = ctx.params.handle
            const postId = ctx.params.post
            if (userType === 'GUEST') page.redirect('/' + handle)

            appNavigation('', navDrawer, navBar, loggedUser)

            renderStatus(handle, postId, titleBar, contentContainer).then(() => {

            })
        })

        page()
    }
}

export default App