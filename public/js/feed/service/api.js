import Status from '../data/classes/status.js'
import Profile from '../data/classes/profile.js'

class Api {
    static getAllStatuses = async(sortByLikes = false, loggedUser = null) => {
        let response = await fetch(
            '/api/status?' +
            new URLSearchParams({orderByLikes: sortByLikes, loggedUser: loggedUser})
        )
        const statusJson = await response.json()

        if (response.ok) return statusJson.map((pt) => Status.from(pt))
        else throw statusJson
    }

    static getStatusesByQuery = async(query, loggedUser = null) => {
        let response = await fetch(
            '/api/status/search?' +
            new URLSearchParams({query: query, loggedUser: loggedUser})
        )
        const statusJson = await response.json()

        if (response.ok) return statusJson.map((st) => Status.from(st))
        else throw statusJson
    }

    static getStatus = async(id, handle, loggedUser = null) => {
        let response = await fetch(
            '/api/status/' + id + '?' +
            new URLSearchParams({handle: handle, loggedUser: loggedUser})
        )
        const statusJson = await response.json()

        if (response.ok) return Status.from(statusJson)
        else throw statusJson
    }

    static getStatusComments = async(thread, loggedUser = null) => {
        let response = await fetch(
            '/api/status/' + thread + '/comments?' +
            new URLSearchParams({loggedUser: loggedUser})
        )
        const commentsJson = await response.json()

        if (response.ok) return commentsJson.map((c) => Status.from(c))
        else throw commentsJson
    }

    static getUserStatuses = async(handle, postType, sortByLikes = false, loggedUser = null) => {
        let params = new URLSearchParams({handle: handle, orderByLikes: sortByLikes, loggedUser: loggedUser})
        if (postType) { params.append('postType', postType) }

        let response = await fetch('/api/users/' + handle + '/status?' + params)
        const postsJson = await response.json()

        if (response.ok) return postsJson.map((st) => Status.from(st))
        else throw postsJson
    }

    static async getLikedStatuses(handle) {
        let response = await fetch(
            '/api/users/' + handle + '/likes?' +
            new URLSearchParams({handle: handle})
        )
        const likedPostsJson = await response.json()

        if (response.ok) return likedPostsJson.map((st) => Status.from(st))
        else throw likedPostsJson
    }

    static getProfile = async(handle) => {
        let response = await fetch('/api/users/' + handle + '/profile')
        const profileJson = await response.json()

        if (response.ok) return Profile.from(profileJson)
        else throw profileJson
    }
}

export default Api