'use strict'

import Api from "./api.js";
import { buildPost } from "../template/post-layout.js";

class Posts {
    static async getAllPosts(loggedUser, userType, sortByLikes, disabled = false, contentContainer) {
        contentContainer.innerHTML = ''

        const posts = await Api.getAllStatuses(sortByLikes, loggedUser)
        for (let post of posts) {
            contentContainer.appendChild(buildPost(
                post,
                false,
                disabled,
                userType === 'MODERATOR',
                loggedUser
            ))
        }
    }

    static async getUserPosts(handle, loggedUser, userType, postType, disabled = false, sortByLikes, contentContainer) {
        const postList = document.createElement('div')
        postList.innerHTML = ''

        const posts = await Api.getUserStatuses(handle, postType, sortByLikes, loggedUser)
        for (let post of posts) {
            const p = buildPost(
                post,
                false,
                disabled,
                userType === 'MODERATOR',
                loggedUser
            )
            postList.appendChild(p)
        }

        contentContainer.appendChild(postList)
    }

    static async getUserLikes(handle, userType, disabled = false, contentContainer) {
        const likesList = document.createElement('div')
        likesList.innerHTML = ''

        const likedPosts = await Api.getLikedStatuses(handle)
        for (let likedPost of likedPosts) {
            const lp = buildPost(
                likedPost,
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
            const c = buildPost(
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

export default Posts;