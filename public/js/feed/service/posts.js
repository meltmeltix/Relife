'use strict'

import Api from "./api.js";
import { buildPost } from "../template/post-layout.js";

class Posts {
    static async getAllPosts(contentContainer, sortByLikes) {
        contentContainer.innerHTML = ''

        const posts = await Api.getAllPosts(sortByLikes)
        for (let post of posts) {
            contentContainer.appendChild(buildPost(post, false))
        }
    }

    static async getUserPosts(handle, postType, contentContainer, sortByLikes) {
        const postList = document.createElement('div')
        postList.innerHTML = ''

        const posts = await Api.getUserPosts(handle, postType, sortByLikes)
        for (let post of posts) {
            const p = buildPost(post, false)
            postList.appendChild(p)
        }

        contentContainer.appendChild(postList)
    }

    static async getStatusComments(thread, contentContainer) {
        const commentsList = document.createElement('div')
        commentsList.innerHTML = ''

        const comments = await Api.getStatusComments(thread)
        for (let comment of comments) {
            const c = buildPost(comment, false)
            commentsList.appendChild(c)
        }

        contentContainer.appendChild(commentsList)
    }
}

export default Posts;