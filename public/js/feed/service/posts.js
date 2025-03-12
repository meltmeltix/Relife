'use strict'

import Api from "./api.js";
import { buildPost } from "../template/post-layout.js";

class Posts {
    static async getAllPosts(contentContainer) {
        const posts = await Api.getAllPosts()

        contentContainer.innerHTML = ''
        contentContainer.classList.add('tw:p-2')
        for (let post of posts) {
            const p = buildPost(post, false)
            contentContainer.insertAdjacentHTML('beforeend', p)
        }
    }

    static async getUserPosts(handle, postType, contentContainer) {
        const postList = document.createElement('div')
        postList.classList.add('tw:p-2', 'tw:space-y-2')
        postList.innerHTML = ''

        const posts = await Api.getUserPosts(handle, postType)

        for (let post of posts) {
            const p = buildPost(post, false)
            postList.insertAdjacentHTML('beforeend', p)
        }

        contentContainer.appendChild(postList)
    }

    static async getStatusComments() {
        const commentsList = document.createElement('div')
        commentsList.classList.add('tw:p-2', 'tw:space-y-2')
        commentsList.innerHTML = ''


    }
}

export default Posts;