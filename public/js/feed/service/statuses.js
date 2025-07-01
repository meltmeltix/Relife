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

        return statuses;
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

        return statuses;
    }

    static async getUserStatuses(handle, loggedUser, userType, statusType, disabled = false, sortByLikes, contentContainer) {
        const statuses = await Api.getUserStatuses(handle, statusType, sortByLikes, loggedUser)

        for (let status of statuses) {
            const p = buildStatus(
                status,
                false,
                disabled,
                userType === 'MODERATOR',
                loggedUser
            )
            contentContainer.appendChild(p)
        }

        return statuses;
    }

    static async getUserLikes(handle, userType, disabled = false, contentContainer) {
        const likedStatuses = await Api.getLikedStatuses(handle)

        for (let likedStatus of likedStatuses) {
            const lp = buildStatus(
                likedStatus,
                false,
                disabled,
                userType === 'MODERATOR',
                handle
            )
            contentContainer.appendChild(lp)
        }

        return likedStatuses
    }

    static async getStatusComments(userType, thread, contentContainer, loggedUser) {
        const comments = await Api.getStatusComments(thread, loggedUser)

        for (let comment of comments) {
            const c = buildStatus(
                comment,
                false,
                userType === 'GUEST',
                userType === 'MODERATOR',
                loggedUser
            )
            contentContainer.appendChild(c)
        }

        return comments;
    }
}

export default Statuses;