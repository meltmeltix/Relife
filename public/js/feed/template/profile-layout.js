// Create avatar HTML
function createAvatar(avatar, name) {
    return `
        <div class="avatar">
            <div class="w-20 rounded-full">
                <img 
                    class="rounded-full w-full h-full" 
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
        <div class="flex flex-col w-full justify-center">
            <span class="text-xl w-full">${profile.name || profile.handle}</span>
            <span class="text-sm w-full opacity-90">@${profile.handle}</span>
            <span class="text-sm w-full opacity-90">0 following · 0 followers</span>
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
        <div class="flex flex-col p-4 space-y-2.5">
            <div class="flex flex-row space-x-3">
                ${avatarHtml}
                ${userInfoHtml}
            </div>
            ${bioHtml}
        </div>
    `;
}

export { buildProfile };