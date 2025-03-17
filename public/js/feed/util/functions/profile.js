'use strict'

import Api from "../../service/api.js";
import {buildProfile} from "../../template/profile-layout.js";
import {buildPost} from "../../template/post-layout.js";

async function renderProfile(handle, userType, titleBar, contentContainer) {
    const profile = await Api.getProfile(handle)
    contentContainer.innerHTML = buildProfile(profile)
}

async function renderStatus(handle, postId, titleBar, contentContainer) {
    const post = await Api.getStatus(postId, handle)
    contentContainer.appendChild(buildPost(post, true))
}

export { renderProfile, renderStatus }