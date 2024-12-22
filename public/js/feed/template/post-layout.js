'use strict';

function renderAvatar(authorHandle, authorAvatar, size = 10) {
    return `
        <div class="avatar tw-w-${size}">
            <img 
                class="tw-rounded-full tw-w-full tw-h-full" 
                src="${authorAvatar || `/webp/no-avatar-24x24.webp`}" 
                alt="${authorHandle}'s avatar"
            />
        </div>
    `;
}

function createHeader({ authorHandle, authorAvatar, authorName, date }, isFocused) {
    const avatarHtml = renderAvatar(authorHandle, authorAvatar, isFocused ? 10 : 6);

    return `
        <a 
            href="/${authorHandle}" class="tw-flex tw-items-center tw-w-full ${
        isFocused ? 'tw-gap-4 tw-h-10' : 'tw-gap-1.5 tw-h-6'
    }">
            ${avatarHtml}
            <div class="tw-flex-1 tw-overflow-hidden tw-whitespace-nowrap tw-text-ellipsis ${
        isFocused ? 'tw-leading-5' : ''
    }">
                ${authorName}${isFocused ? `<br><span class="tw-opacity-90 tw-text-sm">@${authorHandle}</span>` : ` · @${authorHandle}`}
            </div>
            ${!isFocused ? `<div class="tw-ml-auto tw-whitespace-nowrap">${moment(date).fromNow()}</div>` : ''}
        </a>
    `;
}

function createBody({ authorHandle, id, body, attachment, date }, isFocused) {
    const formattedDate = isFocused ? `<span class="tw-opacity-70">${moment(date).format('h:mm · DD MMM YY')}</span>` : '';

    const attachmentHtml = attachment
        ? `
            <div 
                class="tw-w-full tw-h-48 tw-bg-cover tw-bg-center tw-rounded-lg tw-bg-base-300" 
                style="background-image: url(${attachment})"
                aria-label="Post attachment"
            ></div>
        `
        : '';

    return `
        ${!isFocused ? `
            <a 
                href="/${authorHandle}/status/${id}"
                class="tw-flex tw-flex-col tw-gap-1.5">
                ${body || ''}
                ${attachmentHtml}
            </a>
        ` : `
            ${body || ''}
            ${attachmentHtml}
        `}
        
        ${formattedDate}
    `;
}

function createButtons() {
    return `
        <div class="tw-grid tw-grid-cols-3 tw-w-full tw-gap-1.5">
            ${['Like', 'Comment', 'Share'].map(
                (action, index) => `
                    <button class="tw-dy-btn tw-dy-btn-sm" aria-label="${action}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                            class="tw-w-5">
                            ${
                                index === 0
                                    ? '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' 
                                    : index === 1
                                    ? '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>' 
                                    : '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>'
                            }
                        </svg>
                        0
                    </button>
                `
            ).join('')}
        </div>
    `;
}

function createDropDown() {
    return `
        <div class="tw-dy-dropdown tw-dy-dropdown-left tw-dy-dropdown-end">
            <div tabindex="0" role="button" class="tw-dy-btn tw-dy-btn-square tw-dy-btn-sm tw-z-0" aria-label="More options">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tw-w-5">
                    <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                </svg>
            </div>
            <ul tabindex="0" class="tw-dy-dropdown-content">
                <li><a href="#" aria-label="Report this post">Report</a></li>
            </ul>
        </div>
    `;
}

function buildPost(post, isFocused) {
    const headerHtml = createHeader(post, isFocused);
    const bodyHtml = createBody(post, isFocused);
    const buttonsHtml = createButtons();
    const dropDownHtml = createDropDown();

    return `
        <div class="tw-post ${isFocused ? '' : 'tw-post-background'}">
            ${headerHtml}
            ${bodyHtml}
            <div class="tw-flex tw-flex-row tw-gap-1.5 tw-w-full">
                ${buttonsHtml}
                ${dropDownHtml}
            </div>
        </div>
    `;
}

export { buildPost };