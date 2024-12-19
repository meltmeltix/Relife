'use strict'

import Api from "../../api.js";
import {buildProfile} from "../../template/profile-layout.js";

async function renderProfile(handle, userType, titleBar, contentContainer) {
    titleBar.innerHTML = `${userType === 'GUEST' ? 'User profile' : 'Profile'}`
    titleBar.classList.add("tw-pl-3")

    const profile = await Api.getProfile(handle)
    contentContainer.classList.add('tw-p-2')
    contentContainer.innerHTML = buildProfile(profile)
}

export { renderProfile }