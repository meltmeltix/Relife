'use strict'

import { populateTitleBar, renderNavigation, renderTabs } from './util/functions/navigation.js'
import { renderProfile, renderStatus } from './util/functions/profile.js';
import Statuses from "./service/statuses.js";
import {feedTabs, profileTabs, searchTabs} from "./data/constants/navigation.js"
import Api from "./service/api.js";
import { buildUserItem } from "./template/status-layout.js";
import { createEmptyMessage } from "../utils/utils.js";

class App {
    constructor(
        userType, loggedUser,
        titleBar, contentContainer, sideNavigation, bottomNavigation,
        statusThread, statusRedirect
    ) {
        this.titleBar = titleBar;
        this.contentContainer = contentContainer;
        this.sideNavigation = sideNavigation;
        this.bottomNavigation = bottomNavigation;
        this.statusThread = statusThread;
        this.statusRedirect = statusRedirect;

        this.userType = userType;
        this.loggedUser = loggedUser;

        page('/explore', () => {
            document.title = 'Explore | Relife';

            this.statusThread.value = null;
            populateTitleBar(this.titleBar, 'Explore', false, false, false);
            renderNavigation(this.userType, this.loggedUser, '', this.sideNavigation, this.bottomNavigation);

            contentContainer.innerHTML = ''
            Statuses.getAllStatuses(
                null,
                this.userType,
                true,
                true,
                this.contentContainer
            ).then(elements => {
                if (elements.length === 0) { this.contentContainer
                    .appendChild(createEmptyMessage("It's pretty silent in here...")) }
            })
        });

        page('/home', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            document.title = 'Home | Relife';
            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

            populateTitleBar(this.titleBar, 'Home', false, false, true);
            renderNavigation(this.userType, this.loggedUser, 'HOME', this.sideNavigation, this.bottomNavigation);

            contentContainer.innerHTML = ''
            renderTabs(feedTabs, 'HOME', this.contentContainer);
            Statuses.getAllStatuses(
                this.loggedUser,
                this.userType,
                true,
                false,
                this.contentContainer
            ).then(elements => {
                if (elements.length === 0) { this.contentContainer
                    .appendChild(createEmptyMessage("It's pretty silent in here...")) }
            })
        });

        page('/recents', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            document.title = 'Home | Relife';
            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

            populateTitleBar(this.titleBar, 'Home', false, false, true);
            renderNavigation(this.userType, this.loggedUser, 'HOME', this.sideNavigation, this.bottomNavigation);

            contentContainer.innerHTML = ''
            renderTabs(feedTabs, 'RECENTS', this.contentContainer);
            Statuses.getAllStatuses(
                this.loggedUser,
                this.userType,
                false,
                false,
                this.contentContainer
            ).then(elements => {
                if (elements.length === 0) { this.contentContainer
                    .appendChild(createEmptyMessage("Nobody posted anything yet...")) }
            })
        });

        page('/search', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            const params = new URLSearchParams(ctx.querystring);
            const query = params.get('q') || '';

            document.title = 'Search | Relife';
            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'SEARCH', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                'Search',
                false,
                true,
                false,
                query || null,
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
                ).then(elements => {
                    if (elements.length === 0) { this.contentContainer
                        .appendChild(createEmptyMessage('There are no posts matching this query'))
                    }
                })
            }
        });

        page('/search/users', (ctx) => {
            if (this.userType === 'GUEST') return page.redirect('/explore');

            const params = new URLSearchParams(ctx.querystring);
            const query = params.get('q') || '';

            document.title = 'Search | Relife';
            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'SEARCH', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                'Search',
                false,
                true,
                false,
                query || null
            );

            contentContainer.innerHTML = ''
            if (query) {
                const destinations = searchTabs.map(sTab => ({ ...sTab }))
                destinations.forEach(d => d.url = `${d.url}?` + params)

                renderTabs(destinations, 'USERS', this.contentContainer);

                Api.getUsersByQuery(query).then(users => {
                    if (users.length > 0) {
                        users.forEach(user => {
                            this.contentContainer.appendChild(buildUserItem(user)) })
                    } else {
                        this.contentContainer
                            .appendChild(createEmptyMessage('There are no users matching this query'))
                    }
                })
            }
        })

        page('/profile/:handle', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `${handle} | Relife`;

            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

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

                    Statuses.getUserStatuses(
                        handle,
                        this.loggedUser,
                        this.userType,
                        null,
                        this.userType === 'GUEST',
                        true,
                        this.contentContainer
                    ).then(elements => {
                        if (elements.length === 0) { this.contentContainer
                            .appendChild(createEmptyMessage("This user has no posts.")) }
                    })
                });
        });

        page('/profile/:handle/replies', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `Statuses replied by ${handle} | Relife`;

            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

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

                    Statuses.getUserStatuses(
                        handle,
                        this.loggedUser,
                        this.userType,
                        'REPLIES',
                        false,
                        false,
                        this.contentContainer
                    ).then(elements => {
                        if (elements.length === 0) { this.contentContainer
                            .appendChild(createEmptyMessage("This user has no replies.")) }
                    })
                });
        });

        page('/profile/:handle/media', (ctx) => {
            const handle = ctx.params.handle;
            document.title = `Media uploaded by ${handle} | Relife`;

            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

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

                    Statuses.getUserStatuses(
                        handle,
                        this.loggedUser,
                        this.userType,
                        'MEDIA',
                        false,
                        false,
                        this.contentContainer
                    ).then(elements => {
                        if (elements.length === 0) { this.contentContainer
                            .appendChild(createEmptyMessage("This user has no media.")) }
                    })
                });
        });

        page('/profile/:handle/likes', (ctx) => {
            const handle = ctx.params.handle;
            if (handle !== loggedUser) return page(`/${handle}`)

            document.title = `Liked by ${handle} | Relife`;

            this.statusThread.value = null;
            this.statusRedirect.value = ctx.path;

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
                    ).then(elements => {
                        if (elements.length === 0) { this.contentContainer
                            .appendChild(createEmptyMessage("This user hasn't liked anything yet.")) }
                    })
                });
        });

        page('/:handle/status/:id', (ctx) => {
            const handle = ctx.params.handle;
            const statusId = ctx.params.id;
            const params = new URLSearchParams(ctx.querystring);

            if (this.userType === 'GUEST') return page.redirect(`/${handle}`);
            if (params.get('commentDialogue') === 'true') { status_modal.showModal() }

            this.statusThread.value = statusId;
            this.statusRedirect.value = ctx.path;

            renderNavigation(this.userType, this.loggedUser, 'STATUS', this.sideNavigation, this.bottomNavigation);
            populateTitleBar(
                this.titleBar,
                'Post',
                true,
                false,
                false
            );

            renderStatus(handle, this.userType, statusId, this.titleBar, this.contentContainer, this.loggedUser)
                .then(() => {
                    Statuses.getStatusComments(
                        this.userType,
                        statusId,
                        this.contentContainer,
                        this.loggedUser
                    ).then(elements => {
                        if (elements.length === 0) { this.contentContainer
                            .appendChild(createEmptyMessage("There doesn't seem to be any comment yet.")) }
                    })
                });
        });

        page(); // Activate routes
    }

    createProfileDestinations = function(handle) {
        const destinations = profileTabs.map(pTab => ({ ...pTab }))

        const tabsToRender =
            loggedUser === handle ? destinations : destinations.slice(0, -1);
        tabsToRender.forEach((tab) => { tab.url = `profile/${handle}/` + tab.url });

        return tabsToRender
    }
}

export default App;