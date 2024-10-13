import Post from './objects/post.js'
import Profile from './objects/profile.js'

class Api {
    static getAllPosts = async() => {
        let response = await fetch('/api/posts')
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

    static getUserPosts = async(handle) => {
        let response = await fetch('/api/posts?' + new URLSearchParams({handle: handle}))
        const postsJson = await response.json()

        if (response.ok) return postsJson.map((pt) => Post.from(pt))
        else throw postsJson
    }

    static getProfile = async(handle) => {
        let response = await fetch('/api/user-profile?' + new URLSearchParams({handle: handle}))
        const profileJson = await response.json()

        if (response.ok) return Profile.from(profileJson)
        else throw profileJson
    }
}

export default Api