'use strict'

function createPost(post) {
    return `
        <div class="tw-flex tw-flex-col tw-p-3.5 tw-gap-2.5 tw-rounded-2xl tw-bg-background-100 dark:tw-bg-background-900">
            <div class="tw-flex tw-flex-row tw-w-full tw-gap-1.5 tw-h-6">
                <div class="avatar tw-w-6">
                    <img class="tw-rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
                ${post.name} · @${post.handle}
                <div class="tw-ml-auto">${moment(post.date).fromNow()}</div>
            </div>

            ${post.body}

            <div class="tw-flex tw-flex-row tw-gap-1.5 tw-w-full">
                <div class="tw-grid tw-grid-cols-3 tw-w-full tw-gap-1.5">
                    <button class="tw-dy-btn tw-dy-btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tw-w-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        1k
                    </button>
                    <button class="tw-dy-btn tw-dy-btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tw-w-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                        500
                    </button>
                    <button class="tw-dy-btn tw-dy-btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tw-w-5"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
                        1.5k
                    </button>
                </div>

                <div class="tw-dy-dropdown tw-dy-dropdown-left tw-dy-dropdown-end">
                    <div tabindex="0" role="button"  class="tw-dy-btn tw-dy-btn-square tw-dy-btn-sm tw-z-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tw-w-5"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </div>
                    <ul tabindex="0" class="tw-dy-dropdown-content">
                        <li><a>Report</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `
}

export { createPost }