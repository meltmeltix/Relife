'use strict';
import { showToast } from '/js/utils/toast.js';

function createAvatar(picture, handle) {
    const avatar = document.createElement('div');
    avatar.classList.add('avatar', 'size-10');
    avatar.innerHTML = `
        <img 
            class="rounded-full" 
            src="${picture || `/webp/no-avatar-24x24.webp`}" 
            alt="${handle}'s avatar"
        />
    `

    return avatar;
}

function createHeader(name, handle, date) {
    const header = document.createElement('div');
    header.classList.add('card-title', 'h-10', 'flex-1', 'font-sans', 'font-normal');
    header.innerHTML = `
        <div class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis leading-4">
            ${name} <br>
            <span class="text-sm opacity-90">@${handle}</span>
        </div>
        
        ${date ? '<div class="ml-auto whitespace-nowrap">' + moment(date).fromNow() + '</div>' : ''}
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
        'w-full', 'h-48', 'bg-cover',
        'bg-center', 'rounded-lg', 'bg-base-200'
    );
    container.style.backgroundImage = `url(${attachment})`;
    container.ariaLabel = 'Status attachment';

    return container;
}

function createActions(status, link, isDisabled, isModerator, loggedUser) {
    let liked = status.isLiked;

    const actions = document.createElement('div');
    actions.classList.add('card-actions', 'place-content-between', 'space-x-5');

    const heartOutline = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-heart-icon lucide-heart">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
    `
    const heartFilled = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" 
            fill="currentColor" class="lucide lucide-heart-icon lucide-heart">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
    `
    const likes = document.createElement('button');
    likes.checked = liked;
    likes.classList.add('btn', 'btn-xs', 'btn-ghost');
    likes.innerHTML = `
        ${liked ? heartFilled : heartOutline}
        ${status.likes}
    `
    likes.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const response = await fetch(
                '/api/status/' + status.id + '/like?' +
                new URLSearchParams({handle: loggedUser})
            )

            if (response.ok) {
                liked = !liked;
                if (liked) status.likes++;
                else status.likes--;

                likes.innerHTML = `
                    ${liked ? heartFilled : heartOutline}
                    ${status.likes}
                `;
            }
        } catch (error) { showToast("An error occurred trying to like post.") }
    });
    likes.disabled = isDisabled;

    const comments = document.createElement('button');
    comments.classList.add('btn', 'btn-xs', 'btn-ghost');
    comments.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="size-[1.6em]">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>     
        </svg>
        ${status.comments}
    `
    comments.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        window.location.href = link + '?commentDialogue=true';
    });
    comments.disabled = isDisabled;

    const share = document.createElement('button');
    share.classList.add('btn', 'btn-xs', 'btn-ghost');
    share.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-share-icon lucide-share">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
        <polyline points="16 6 12 2 8 6"/>
        <line x1="12" x2="12" y1="2" y2="15"/>
        </svg>
    `
    share.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        showToast('Copied post link to clipboard', 'INFO')
        navigator.clipboard.writeText(link)
    });
    share.disabled = isDisabled;

    actions.appendChild(likes)
    actions.appendChild(comments);
    actions.appendChild(share);

    if (isModerator) {
        const removeStatus = document.createElement('button');
        removeStatus.classList.add('btn', 'btn-xs', 'btn-ghost');
        removeStatus.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="lucide lucide-message-circle-off-icon lucide-message-circle-off">
            <path d="M20.5 14.9A9 9 0 0 0 9.1 3.5"/>
            <path d="m2 2 20 20"/>
            <path d="M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7"/>
            </svg>
        `;
        removeStatus.addEventListener('click', async (event) => {
            event.preventDefault();
            event.stopPropagation();

            try {
                const response = await fetch(
                    '/api/status/' + status.id,
                    { method: 'DELETE' }
                );

                if (response.ok) { showToast('Status deleted', 'INFO') }
            } catch (error) { showToast("An error occurred " + error, 'ERROR') }
        });

        actions.appendChild(removeStatus);
    }

    return actions;
}

function buildStatus(status, isFocused, isDisabled = false, isModerator = false, loggedUser) {
    const card = document.createElement('a');
    if (!isFocused) {
        card.href = `/${status.authorHandle}/status/${status.id}`
        card.classList.add('hover:bg-background-950/15');
    }
    card.classList.add(
        'card', 'card-sm', 'rounded-none',
        'border-b', 'border-neutral'
    );

    if (isFocused) {
        const layout = document.createElement('div');
        layout.classList.add('card-body', 'pb-2', 'flex', 'flex-col');

        const header = document.createElement('div');
        header.classList.add('flex', 'flex-row', 'space-x-2');
        header.appendChild(createAvatar(status.authorAvatar, status.authorHandle));
        header.appendChild(createHeader(status.authorName, status.authorHandle, null));

        layout.appendChild(header);

        const statusBody = document.createElement('div');
        statusBody.classList.add('flex-1', 'flex-col', 'text-base', 'space-y-2');

        if (status.body) statusBody.appendChild(createParagraph(status.body));
        if (status.attachment) statusBody.appendChild(createAttachment(status.attachment));

        const statusDate = document.createElement('div');
        statusDate.classList.add('opacity-70');
        statusDate.innerText = moment(status.date).format('MM/DD/YYYY • HH:mm:ss');

        layout.appendChild(statusBody);
        layout.appendChild(statusDate);
        layout.appendChild(createActions(status, card.href, isDisabled, isModerator, loggedUser));

        card.appendChild(layout);
        return card;
    }

    const layout = document.createElement('div');
    layout.classList.add('card-body', 'pb-2', 'flex', 'flex-row');
    layout.appendChild(createAvatar(status.authorAvatar, status.authorHandle));

    const statusBody = document.createElement('div');
    statusBody.classList.add('flex-1', 'flex-col', 'text-base', 'space-y-2');
    statusBody.appendChild(createHeader(status.authorName, status.authorHandle, status.date));

    if (status.body) statusBody.appendChild(createParagraph(status.body));
    if (status.attachment) statusBody.appendChild(createAttachment(status.attachment));

    statusBody.appendChild(createActions(status, card.href, isDisabled, isModerator, loggedUser));
    layout.appendChild(statusBody);

    card.appendChild(layout);
    return card;
}

function buildUserItem(user) {
    const item = document.createElement('div');
    item.classList.add(
        'w-full', 'flex', 'flex-row', 'space-x-2', 'hover:bg-background-950/15',
        'p-2', 'border-b', 'border-neutral'
    );

    item.appendChild(createAvatar(user.avatar, user.handle));
    item.appendChild(createHeader(user.name, user.handle, null));

    return item;
}

export { buildStatus, createActions, buildUserItem };