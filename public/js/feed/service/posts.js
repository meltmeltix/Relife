'use strict'

import Api from "./api.js";
import { buildPost } from "../template/post-layout.js";

class Posts {
    static async getAllPosts(contentContainer) {
        const posts = await Api.getAllPosts()

        contentContainer.innerHTML = ''
        for (let post of posts) {
            contentContainer.appendChild(buildPost(post, false))
        }
    }

    static async getUserPosts(handle, postType, contentContainer) {
        const postList = document.createElement('div')
        postList.innerHTML = ''

        const posts = await Api.getUserPosts(handle, postType)

        for (let post of posts) {
            const p = buildPost(post, false)
            postList.appendChild(p)
        }

        contentContainer.appendChild(postList)
    }

    static async getStatusComments() {
        const commentsList = document.createElement('div')
        commentsList.innerHTML = ''


    }
}

export default Posts;