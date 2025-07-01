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

    static getUserStatuses = async(handle, statusType, sortByLikes = false, loggedUser = null) => {
        let params = new URLSearchParams({handle: handle, orderByLikes: sortByLikes, loggedUser: loggedUser})
        if (statusType) { params.append('statusType', statusType) }

        let response = await fetch('/api/users/' + handle + '/status?' + params)
        const statusesJson = await response.json()

        if (response.ok) return statusesJson.map((st) => Status.from(st))
        else throw statusesJson
    }

    static async getLikedStatuses(handle) {
        let response = await fetch(
            '/api/users/' + handle + '/likes?' +
            new URLSearchParams({handle: handle})
        )
        const likedStatusesJson = await response.json()

        if (response.ok) return likedStatusesJson.map((st) => Status.from(st))
        else throw likedStatusesJson
    }

    static getProfile = async(handle) => {
        let response = await fetch('/api/users/' + handle + '/profile')
        const profileJson = await response.json()

        if (response.ok) return Profile.from(profileJson)
        else throw profileJson
    }

    static getUsersByQuery = async (query) => {
        let response = await fetch(
            '/api/users/search?' + new URLSearchParams({ q: query })
        );
        const profilesJson = await response.json();

        if (response.ok) return profilesJson.map((p) => Profile.from(p));
        else throw profilesJson;
    }

}

export default Api