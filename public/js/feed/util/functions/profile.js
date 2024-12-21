'use strict'

import Api from "../../service/api.js";
import {buildProfile} from "../../template/profile-layout.js";
import {buildPost} from "../../template/post-layout.js";

async function renderProfile(handle, userType, titleBar, contentContainer) {
    titleBar.innerHTML = `${userType === 'GUEST' ? 'User profile' : 'Profile'}`
    titleBar.classList.add("tw-pl-3")

    const profile = await Api.getProfile(handle)
    contentContainer.classList.add('tw-p-2')
    contentContainer.innerHTML = buildProfile(profile)
}

async function renderStatus(handle, postId, titleBar, contentContainer) {
    titleBar.innerHTML = 'Post'
    titleBar.classList.add("tw-pl-3")

    const post = await Api.getStatus(postId, handle)
    contentContainer.innerHTML = ''
    contentContainer.classList.add('tw-p-2')
    contentContainer.insertAdjacentHTML('beforeend', buildPost(post, true))
}

export { renderProfile, renderStatus }