'use strict'

import {
    populateTitleBar,
    renderNavigation,
    newRenderTabs
} from './util/functions/navigation.js'
import {
    renderProfile,
    renderStatus
} from './util/functions/profile.js';
import Posts from "./service/posts.js";
import { renderSearch } from "./util/functions/search.js";
import {feedTabs, profileTabs, searchTabs} from "./data/constants/navigation.js"

class App {
    constructor(
        userType, loggedUser,
        titleBar, feedTabRow, contentContainer, sideNavigation, bottomNavigation,
        postThread, postRedirect
    ) {
        this.titleBar = titleBar;
        this.feedTabRow = feedTabRow;
        this.contentContainer = contentContainer;
        this.sideNavigation = sideNavigation;
        this.bottomNavigation = bottomNavigation;
        this.postThread = postThread;
        this.postRedirect = postRedirect;

        this.userType = userType;
        this.loggedUser = loggedUser;

        // Route: /explore
        page('/explore', () => {
            document.title = 'Explore | Relife';

            this.postThread.value = null;
            populateTitleBar(this.titleBar, 'Explore', false, false, false);
            renderNavigation(this.userType, this.loggedUser, '', this.sideNavigation, this.bottomNavigation);

            contentContainer.innerHTML = ''
            Posts.getAllPosts(null, this.userType, true, true, this.contentContainer).catch(console.error);
        });

        // Route: /home
        page('/home', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            document.title = 'Home | Relife';
            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            populateTitleBar(this.titleBar, 'Home', false, false, true);
            renderNavigation(this.userType, this.loggedUser, 'HOME', this.sideNavigation, this.bottomNavigation);

            contentContainer.innerHTML = ''
            newRenderTabs(feedTabs, 'HOME', this.contentContainer);
            Posts.getAllPosts(this.loggedUser, this.userType, true, false, this.contentContainer).catch(console.error);
        });

        // Route: /recents
        page('/recents', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            document.title = 'Home | Relife';
            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            populateTitleBar(this.titleBar, 'Home', false, false, false);
            renderNavigation(this.userType, this.loggedUser, 'HOME', this.sideNavigation, this.bottomNavigation);

            contentContainer.innerHTML = ''
            newRenderTabs(feedTabs, 'RECENTS', this.contentContainer);
            Posts.getAllPosts(
                this.loggedUser,
                this.userType,
                false,
                false,
                this.contentContainer
            ).catch(console.error);
        });

        // Route: /search
        page('/search', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');
            document.title = 'Search | Relife';
            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            populateTitleBar(this.titleBar, 'Search', false, true, false);
            renderNavigation(this.userType, this.loggedUser, 'SEARCH', this.sideNavigation, this.bottomNavigation);
            renderFeedTabs(this.userType, 'SEARCH', this.feedTabRow);
            renderSearch(this.contentContainer);
        });

        // Route: /:handle
        page('/:handle', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `${handle} | Relife`;

            const isGuest = this.userType === 'GUEST';

            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'PROFILE', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                this.userType === 'GUEST' ? 'User profile' : 'Profile',
                this.userType === 'GUEST',
                false,
                true
            );

            renderProfile(handle, this.userType, this.titleBar, this.contentContainer)
                .then(() => {
                    if (this.userType !== 'GUEST')
                        newRenderTabs(this.createDestinations(handle), 'POSTS', this.contentContainer);

                    Posts.getUserPosts(
                        handle,
                        this.loggedUser,
                        this.userType,
                        null,
                        this.userType === 'GUEST',
                        true,
                        this.contentContainer
                    );
                });
        });

        // Route: /:handle/replies
        page('/:handle/replies', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `Posts replied by ${handle} | Relife`;

            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'PROFILE', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                this.userType === 'GUEST' ? 'User profile' : 'Profile',
                false,
                false,
                true
            );

            renderProfile(handle, this.userType, this.titleBar, this.contentContainer)
                .then(() => {
                    if (this.userType !== 'GUEST')
                        newRenderTabs(this.createDestinations(handle), 'REPLIES', this.contentContainer);

                    Posts.getUserPosts(
                        handle,
                        this.loggedUser,
                        this.userType,
                        'REPLIES',
                        false,
                        false,
                        this.contentContainer
                    );
                });
        });

        // Route: /:handle/media
        page('/:handle/media', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `Media uploaded by ${handle} | Relife`;

            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'PROFILE', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                this.userType === 'GUEST' ? 'User profile' : 'Profile',
                false,
                false,
                true
            );

            renderProfile(handle, this.userType, this.titleBar, this.contentContainer)
                .then(() => {
                    if (this.userType !== 'GUEST')
                        newRenderTabs(this.createDestinations(handle), 'MEDIA', this.contentContainer);

                    Posts.getUserPosts(
                        handle,
                        this.loggedUser,
                        this.userType,
                        'MEDIA',
                        false,
                        false,
                        this.contentContainer
                    );
                });
        });

        // Route: /:handle/likes
        page('/:handle/likes', (ctx) => {
            const handle = ctx.params.handle;
            if (handle !== loggedUser) return page(`/${handle}`)

            document.title = `Liked by ${handle} | Relife`;

            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'PROFILE', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                this.userType === 'GUEST' ? 'User profile' : 'Profile',
                false,
                false,
                true
            );

            renderProfile(handle, this.userType, this.titleBar, this.contentContainer)
                .then(() => {
                    profileNavigation('LIKES', handle, loggedUser, this.contentContainer);
                    Posts.getUserLikes(
                        handle,
                        this.userType,
                        false,
                        this.contentContainer
                    )
                });
        });

        // Route: /:handle/status/ (invalid/missing ID)
        page('/:handle/status/', (_) => {
            console.log("THROW ERROR");
        });

        // Route: /:handle/status/:post
        page('/:handle/status/:id', (ctx) => {
            const handle = ctx.params.handle;
            const postId = ctx.params.id;
            const params = new URLSearchParams(ctx.querystring);

            if (this.userType === 'GUEST') return page.redirect(`/${handle}`);
            if (params.get('commentDialogue') === 'true') { post_modal.showModal() }

            this.postThread.value = postId;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'STATUS', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                'Post',
                true,
                false,
                false
            );

            renderStatus(handle, this.userType, postId, this.titleBar, this.contentContainer, this.loggedUser)
                .then(() => {
                    Posts.getStatusComments(this.userType, postId, this.contentContainer, this.loggedUser);
                });
        });

        page(); // Activate routes
    }

    createDestinations = function(handle) {
        const destinations = profileTabs.map(pTab => ({ ...pTab }))

        const tabsToRender =
            loggedUser === handle ? destinations : destinations.slice(0, -1);
        tabsToRender.forEach((tab) => { tab.url = `${handle}/` + tab.url });

        return tabsToRender
    }
}

export default App;