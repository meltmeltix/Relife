import Post from '../data/classes/post.js'
import Profile from '../data/classes/profile.js'

class Api {
    static getAllPosts = async(sortByLikes = false, loggedUser = null) => {
        let response = await fetch(
            '/api/posts?' +
            new URLSearchParams({orderByLikes: sortByLikes, loggedUser: loggedUser})
        )
        const postsJson = await response.json()

        if (response.ok) return postsJson.map((pt) => Post.from(pt))
        else throw postsJson
    }

    static getStatus = async(id, handle) => {
        let response = await fetch('/api/status?' + new URLSearchParams({id: id, handle: handle}))
        const statusJson = await response.json()

        if (response.ok) return Post.from(statusJson)
        else throw statusJson
    }

    static getStatusComments = async(thread) => {
        let response = await fetch('/api/status/' + thread + '/comments')
        const commentsJson = await response.json()

        if (response.ok) return commentsJson.map((c) => Post.from(c))
        else throw commentsJson
    }

    static getUserPosts = async(handle, postType, sortByLikes = false, loggedUser = null) => {
        let params = new URLSearchParams({handle: handle, orderByLikes: sortByLikes, loggedUser: loggedUser})
        if (postType) { params.append('postType', postType) }

        let response = await fetch('/api/posts/' + handle + '?' + params)
        const postsJson = await response.json()

        if (response.ok) return postsJson.map((pt) => Post.from(pt))
        else throw postsJson
    }

    static async getLikedPosts(handle) {
        let response = await fetch('/api/likes?' + new URLSearchParams({handle: handle}))
        const likedPostsJson = await response.json()

        if (response.ok) return likedPostsJson.map((pt) => Post.from(pt))
        else throw likedPostsJson
    }

    static getProfile = async(handle) => {
        let response = await fetch('/api/user-profile?' + new URLSearchParams({handle: handle}))
        const profileJson = await response.json()

        if (response.ok) return Profile.from(profileJson)
        else throw profileJson
    }
}

export default Api