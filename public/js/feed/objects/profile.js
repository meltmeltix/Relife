class Profile {
    constructor(handle, name, bio, avatar) {
        this.handle = handle
        this.name = name
        this.bio = bio
        this.avatar = avatar
    }

    static from(json) {
        const p = Object.assign(new Profile(), json)
        return p
    }
}

export default Profile