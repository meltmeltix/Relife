'use strict'

import Api from "./api.js";
import {createPost} from "../template/post-item.js";

class Posts {
    static async getAllPosts(contentContainer) {
        const posts = await Api.getAllPosts()

        contentContainer.innerHTML = ''
        contentContainer.classList.add('tw-p-2')
        for (let post of posts) {
            const p = createPost(post, false)
            contentContainer.insertAdjacentHTML('beforeend', p)
        }
    }

    static async getUserPosts(handle, postType, contentContainer) {
        const postList = document.createElement('div')
        postList.classList.add('tw-p-2', 'tw-space-y-2')
        postList.innerHTML = ''

        const posts = await Api.getUserPosts(handle, postType)

        for (let post of posts) {
            const p = createPost(post)
            postList.insertAdjacentHTML('beforeend', p)
        }

        contentContainer.appendChild(postList)
    }
}

export default Posts;