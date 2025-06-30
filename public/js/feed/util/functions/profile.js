'use strict'

import Api from "../../service/api.js";
import {buildProfile} from "../../template/profile-layout.js";
import {buildPost} from "../../template/status-layout.js";
import {commentsField} from "./navigation.js";

async function renderProfile(handle, userType, titleBar, contentContainer) {
    const profile = await Api.getProfile(handle)
    contentContainer.innerHTML = buildProfile(profile)
}

async function renderStatus(handle, userType, statusId, titleBar, contentContainer, loggedUser) {
    const status = await Api.getStatus(statusId, handle, loggedUser)
    contentContainer.innerHTML = ''
    contentContainer.appendChild(buildPost(
        status,
        true,
        userType === 'GUEST',
        userType === 'MODERATOR',
        loggedUser
    ))

    const field = commentsField(false).cloneNode(true)
    field.classList.add('hidden', 'sm:block')
    field.onclick = () => { post_modal.showModal() }
    contentContainer.appendChild(field);
}

export { renderProfile, renderStatus }