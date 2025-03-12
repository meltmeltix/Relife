// Create avatar HTML
function createAvatar(avatar, name) {
    return `
        <div class="tw:dy-avatar">
            <div class="tw:w-20 tw:rounded-full">
                <img 
                    class="tw:rounded-full tw:w-full tw:h-full" 
                    src="${avatar || '/webp/no-avatar-96x96.webp'}"
                    alt="${name}'s profile picture"
                />
            </div>
        </div>
    `;
}

// Create user information HTML
function createUserInfo(profile) {
    return `
        <div class="tw:flex tw:flex-col tw:w-full tw:justify-center">
            <span class="tw:text-xl tw:w-full">${profile.name || profile.handle}</span>
            <span class="tw:text-sm tw:w-full tw:opacity-90">@${profile.handle}</span>
            <span class="tw:text-sm tw:w-full tw:opacity-90">0 following · 0 followers</span>
        </div>
    `;
}

// Create bio HTML
function createBio(bio) {
    return bio ? `<p>${bio}</p>` : '';
}

// Main function to return the full profile header
function buildProfile(profile) {
    const avatarHtml = createAvatar(profile.avatar, profile.name);
    const userInfoHtml = createUserInfo(profile);
    const bioHtml = createBio(profile.bio);

    return `
        <div class="tw:flex tw:flex-col tw:p-4 tw:space-y-2.5">
            <div class="tw:flex tw:flex-row tw:space-x-3">
                ${avatarHtml}
                ${userInfoHtml}
            </div>
            ${bioHtml}
        </div>
    `;
}

export { buildProfile };