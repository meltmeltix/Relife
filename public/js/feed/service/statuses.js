'use strict'

import Api from "./api.js";
import { buildStatus } from "../template/status-layout.js";

class Statuses {
    static async getAllStatuses(loggedUser, userType, sortByLikes, disabled = false, contentContainer) {
        const statuses = await Api.getAllStatuses(sortByLikes, loggedUser)
        for (let status of statuses) {
            contentContainer.appendChild(buildStatus(
                status,
                false,
                disabled,
                userType === 'MODERATOR',
                loggedUser
            ))
        }
    }

    static async getStatusesByQuery(query, loggedUser, userType, disabled, contentContainer) {
        const statuses = await Api.getStatusesByQuery(query, loggedUser)
        for (let status of statuses) {
            contentContainer.appendChild(buildStatus(
                status,
                false,
                disabled,
                userType === 'MODERATOR',
                loggedUser
            ))
        }
    }

    static async getUserStatuses(handle, loggedUser, userType, statusType, disabled = false, sortByLikes, contentContainer) {
        const statusList = document.createElement('div')
        statusList.innerHTML = ''

        const statuses = await Api.getUserStatuses(handle, statusType, sortByLikes, loggedUser)
        for (let status of statuses) {
            const p = buildStatus(
                status,
                false,
                disabled,
                userType === 'MODERATOR',
                loggedUser
            )
            statusList.appendChild(p)
        }

        contentContainer.appendChild(statusList)
    }

    static async getUserLikes(handle, userType, disabled = false, contentContainer) {
        const likesList = document.createElement('div')
        likesList.innerHTML = ''

        const likedStatuses = await Api.getLikedStatuses(handle)
        for (let likedStatus of likedStatuses) {
            const lp = buildStatus(
                likedStatus,
                false,
                disabled,
                userType === 'MODERATOR',
                handle
            )
            likesList.appendChild(lp)
        }

        contentContainer.appendChild(likesList)
    }

    static async getStatusComments(userType, thread, contentContainer, loggedUser) {
        const commentsList = document.createElement('div')
        commentsList.innerHTML = ''

        const comments = await Api.getStatusComments(thread, loggedUser)
        for (let comment of comments) {
            const c = buildStatus(
                comment,
                false,
                userType === 'GUEST',
                userType === 'MODERATOR',
                loggedUser
            )
            commentsList.appendChild(c)
        }

        contentContainer.appendChild(commentsList)
    }
}

export default Statuses;