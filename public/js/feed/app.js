'use strict'

import {
    populateTitleBar,
    renderNavigation,
    renderTabs
} from './util/functions/navigation.js'
import {
    renderProfile,
    renderStatus
} from './util/functions/profile.js';
import Statuses from "./service/statuses.js";
import {feedTabs, profileTabs, searchTabs} from "./data/constants/navigation.js"
import Api from "./service/api.js";
import {buildUserItem} from "./template/status-layout.js";

class App {
    constructor(
        userType, loggedUser,
        titleBar, contentContainer, sideNavigation, bottomNavigation,
        postThread, postRedirect
    ) {
        this.titleBar = titleBar;
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
            Statuses.getAllPosts(null, this.userType, true, true, this.contentContainer).catch(console.error);
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
            renderTabs(feedTabs, 'HOME', this.contentContainer);
            Statuses.getAllPosts(this.loggedUser, this.userType, true, false, this.contentContainer).catch(console.error);
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
            renderTabs(feedTabs, 'RECENTS', this.contentContainer);
            Statuses.getAllPosts(
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

            const params = new URLSearchParams(ctx.querystring);
            const query = params.get('q') || '';

            document.title = 'Search | Relife';
            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'SEARCH', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                'Search',
                false,
                true,
                false,
                query || null,
                this.loggedUser
            );

            contentContainer.innerHTML = ''
            if (query) {
                const destinations = searchTabs.map(sTab => ({ ...sTab }))
                destinations.forEach(d => d.url = `${d.url}?` + params)

                renderTabs(destinations, 'SEARCH', this.contentContainer);

                Statuses.getStatusesByQuery(
                    query,
                    this.loggedUser,
                    this.userType,
                    this.userType === 'GUEST',
                    this.contentContainer
                )
            }
        });

        // Route: /search/users
        page('/search/users', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            const params = new URLSearchParams(ctx.querystring);
            const query = params.get('q') || '';

            document.title = 'Search | Relife';
            this.postThread.value = null;
            this.postRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'SEARCH', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                'Search',
                false,
                true,
                false,
                query || null,
                this.loggedUser
            );

            contentContainer.innerHTML = ''
            if (query) {
                const destinations = searchTabs.map(sTab => ({ ...sTab }))
                destinations.forEach(d => d.url = `${d.url}?` + params)

                renderTabs(destinations, 'USERS', this.contentContainer);

                Api.getUsersByQuery(query).then(users => {
                    console.log(users);
                    users.forEach(user => { this.contentContainer.appendChild(buildUserItem(user)) })
                })
            }
        })

        // Route: /:handle
        page('/:handle', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `${handle} | Relife`;

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
                        renderTabs(this.createProfileDestinations(handle), 'POSTS', this.contentContainer);

                    Statuses.getUserPosts(
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
                        renderTabs(this.createProfileDestinations(handle), 'REPLIES', this.contentContainer);

                    Statuses.getUserPosts(
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
                        renderTabs(this.createProfileDestinations(handle), 'MEDIA', this.contentContainer);

                    Statuses.getUserPosts(
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
                    if (this.userType !== 'GUEST')
                        renderTabs(this.createProfileDestinations(handle), 'LIKES', this.contentContainer);

                    Statuses.getUserLikes(
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
                'Status',
                true,
                false,
                false
            );

            renderStatus(handle, this.userType, postId, this.titleBar, this.contentContainer, this.loggedUser)
                .then(() => {
                    Statuses.getStatusComments(this.userType, postId, this.contentContainer, this.loggedUser);
                });
        });

        page(); // Activate routes
    }

    createProfileDestinations = function(handle) {
        const destinations = profileTabs.map(pTab => ({ ...pTab }))

        const tabsToRender =
            loggedUser === handle ? destinations : destinations.slice(0, -1);
        tabsToRender.forEach((tab) => { tab.url = `${handle}/` + tab.url });

        return tabsToRender
    }
}

export default App;