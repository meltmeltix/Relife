function returnProfileHeader(profile) {
    return `
        <div class="tw-flex tw-flex-col tw-p-4 tw-space-y-2.5">
            <div class="tw-flex tw-flex-row tw-space-x-3">
                <!-- Avatar -->
                <div class="tw-dy-avatar">
                    <div class="tw-w-20 tw-rounded-full">
                        <img 
                            class="tw-rounded-full tw-w-full tw-h-full" 
                            src="${profile.avatar != null ? profile.avatar : `/webp/no-avatar-96x96.webp`}"
                        />
                    </div>
                </div>

                <!-- Username, handle and followers -->
                <div class="tw-flex tw-flex-col tw-w-full tw-justify-center">
                    <span class="tw-text-xl tw-w-full">${profile.name !== null ? profile.name : profile.handle}</span>
                    <span class="tw-text-sm tw-w-full tw-opacity-90">@${profile.handle}</span>
                    <span class="tw-text-sm tw-w-full tw-opacity-90">0 following · 0 followers</span>
                </div>
            </div>

            <!-- Bio -->
            ${profile.bio !== null ? `<p>${profile.bio}</p>` : ''}
        </div>
    `
}

export { returnProfileHeader }