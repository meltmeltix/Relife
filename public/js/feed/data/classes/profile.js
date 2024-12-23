class Profile {
    constructor(handle, name, bio, avatar) {
        this.handle = handle
        this.name = name
        this.bio = bio
        this.avatar = avatar
    }

    static from(json) {
        return Object.assign(new Profile(), json)
    }
}

export default Profile