'use strict'

function returnNavBarItems(active, loggedUser) {
    return `
        <a href='/home' class="${active === 'HOME' ? 'tw-dy-active' : 'tw-dy-inactive'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </a>
        <a href='/search' class="${active === 'SEARCH' ? 'tw-dy-active' : 'tw-dy-inactive'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </a>
        <a href='/profile/${loggedUser}' class="${active === 'PROFILE' ? 'tw-dy-active' : 'tw-dy-inactive'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </a>
    `
}

function returnDrawerItems(active, loggedUser) {
    return `
        <li>
            <a href='/home' class="${active === 'HOME' ? 'tw-dy-active' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                Home
            </a>
        </li>
        <li>
            <a href='/search' class="${active === 'SEARCH' ? 'tw-dy-active' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                Search
            </a>
        </li>
        <li>
            <a href='/profile/${loggedUser}' class="${active === 'PROFILE' ? 'tw-dy-active' : ''}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Profile
            </a>
        </li>
    `
}

function returnTabRow(active, handle) {
    return `
        <div role="tablist" class="tw-dy-tabs tw-dy-tabs-bordered">
            <a href='/profile/${handle}/' role="tab" class="tw-dy-tab ${active === 'POSTS' ? 'tw-dy-tab-active' : ''}">Posts</a>
            <a href='/profile/${handle}/replies' role="tab" class="tw-dy-tab ${active === 'REPLIES' ? 'tw-dy-tab-active' : ''}">Replies</a>
            <a href='/profile/${handle}/media' role="tab" class="tw-dy-tab ${active === 'MEDIA' ? 'tw-dy-tab-active' : ''}">Media</a>
            <a href='/profile/${handle}/likes' role="tab" class="tw-dy-tab ${active === 'LIKES' ? 'tw-dy-tab-active' : ''}">Likes</a>
        </div>
    `
}

export { returnNavBarItems, returnDrawerItems, returnTabRow }