'use strict';

function createAvatar(picture, handle) {
    const avatar = document.createElement('div');
    avatar.classList.add('tw:dy-avatar', 'tw:size-10');
    avatar.innerHTML = `
        <img 
            class="tw:rounded-full" 
            src="${picture || `/webp/no-avatar-24x24.webp`}" 
            alt="${handle}'s avatar"
        />
    `

    return avatar;
}

function createHeader(name, handle, date) {
    const header = document.createElement('div');
    header.classList.add('tw:dy-card-title', 'tw:h-10', 'tw:flex-1', 'tw:font-sans', 'tw:font-normal');
    header.innerHTML = `
        <div class="tw:flex-1 tw:overflow-hidden tw:whitespace-nowrap tw:text-ellipsis tw:leading-4">
            ${name} <br>
            <span class="tw:text-sm tw:opacity-90">@${handle}</span>
        </div>
        
        <div class="tw:ml-auto tw:whitespace-nowrap">${moment(date).fromNow()}</div>
    `;

    return header;
}

function createParagraph(body) {
    const paragraph = document.createElement('p');
    paragraph.innerText = body;
    return paragraph;
}

function createAttachment(attachment) {
    const container = document.createElement('div');
    container.classList.add(
        'tw:w-full', 'tw:h-48', 'tw:bg-cover',
        'tw:bg-center', 'tw:rounded-lg', 'tw:bg-base-200'
    );
    container.style.backgroundImage = `url(${attachment})`;
    container.ariaLabel = 'Post attachment';

    return container;
}

function createActions() {
    const actions = document.createElement('div');
    actions.classList.add('tw:dy-card-actions', 'tw:place-content-between', 'tw:space-x-5');

    const comments = document.createElement('a');
    comments.classList.add('tw:dy-btn', 'tw:dy-btn-xs', 'tw:dy-btn-ghost');
    comments.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="size-[1.6em]">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>     
        </svg>
        100
    `

    const dropDownMenu = document.createElement('div');
    dropDownMenu.classList.add('tw:dy-dropdown', 'tw:dy-dropdown-end', 'tw:sm:hidden');

    const button = document.createElement('div');
    button.tabIndex = 0;
    button.role = 'button';
    button.classList.add(
        'tw:dy-btn', 'tw:dy-btn-xs', 'tw:dy-btn-square',
        'tw:dy-btn-ghost', 'sm:tw:hidden'
    );
    button.innerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-ellipsis-vertical">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
        </svg>
    `;

    const form = document.createElement('form');
    //form.action = '';
    //form.method = 'POST';
    form.innerHTML = `
        <form action="" method="post">
            <ul tabindex="0" class="tw:dy-dropdown-content tw:dy-menu tw:bg-base-200 tw:w-32 tw:shadow-sm">
                <li><input type="submit" value="Report"></li>
            </ul>
        </form>
    `;
    dropDownMenu.appendChild(button);
    dropDownMenu.appendChild(form);

    actions.appendChild(comments);
    actions.appendChild(dropDownMenu);
    return actions;
}

function buildPost(post, isFocused) {
    const card = document.createElement('div');
    card.classList.add(
        'tw:dy-card', 'tw:dy-card-sm', 'tw:rounded-none',
        'tw:border-b', 'tw:border-neutral'
    );

    const layout = document.createElement('div');
    layout.classList.add('tw:dy-card-body', 'tw:pb-2', 'tw:flex', 'tw:flex-row');
    layout.appendChild(createAvatar(post.authorAvatar, post.authorHandle));

    const postBody = document.createElement('div');
    postBody.classList.add('tw:flex-1', 'tw:flex-col', 'tw:text-base', 'tw:space-y-2');
    postBody.appendChild(createHeader(post.authorName, post.authorHandle, post.date));

    if (post.body) postBody.appendChild(createParagraph(post.body));
    if (post.attachment) postBody.appendChild(createAttachment(post.attachment));

    postBody.appendChild(createActions());
    layout.appendChild(postBody);

    card.appendChild(layout);
    return card;
}

export { buildPost };