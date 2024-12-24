'use strict'

import page from '//unpkg.com/page/page.mjs'
import {appNavigation, populateTitleBar, profileNavigation} from './util/functions/navigation.js'
import {renderProfile, renderStatus} from './util/functions/profile.js';
import Posts from "./service/posts.js";
import {renderSearch} from "./util/functions/search.js";

class App {
    constructor(userType, loggedUser, navDrawer, navBar, titleBar, contentContainer) {
        this.contentContainer = contentContainer

        page('/explore', () => {
            document.title = 'Explore | Relife'

            populateTitleBar(titleBar, 'Explore', false, false, false)
            Posts.getAllPosts(contentContainer).catch((error) => {

            })
        })

        page('/home', () => {
            if (userType === 'GUEST') page.redirect('/explore')

            document.title = 'Home | Relife'

            populateTitleBar(titleBar, 'Home', false, false, true)
            appNavigation('HOME', navDrawer, navBar, loggedUser)
            Posts.getAllPosts(contentContainer).catch((error) => {

            })
        })

        page('/search', () => {
            document.title = 'Search | Relife'

            populateTitleBar(titleBar, 'Search', false, true, false)
            appNavigation('SEARCH', navDrawer, navBar, loggedUser)
            renderSearch(this.contentContainer)
        })

        page('/:handle', (ctx) => {
            const handle = ctx.params.handle
            document.title = handle + ' | Relife'

            appNavigation('PROFILE', navDrawer, navBar, loggedUser)
            populateTitleBar(titleBar, userType === 'GUEST' ? 'User profile' : 'Profile', false, false, true)
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

            populateTitleBar(titleBar, 'Post', true, false, false)
            appNavigation('', navDrawer, navBar, loggedUser)
            renderStatus(handle, postId, titleBar, contentContainer)
                .then(() => {

                })
        })

        page()
    }
}

export default App