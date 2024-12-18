'use strict'

import Api from "../../api.js";
import {buildProfile} from "../../template/profile-layout.js";

async function renderProfile(handle, userType, titleBar, contentContainer) {
    titleBar.innerHTML = `${userType === 'GUEST' ? 'User profile' : 'Profile'}`
    titleBar.classList.add("tw-pl-3")

    Api.getProfile(handle)
        .then((profile) => {
            fetchProfileEjs(contentContainer, profile)
        })
}

function fetchProfileEjs(contentContainer, profile) {
    contentContainer.innerHTML = ''
    contentContainer.classList.add('tw-p-2')

    contentContainer.innerHTML = buildProfile(profile)
}

export { renderProfile }