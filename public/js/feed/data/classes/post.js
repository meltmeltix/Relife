class Post {
    constructor(id, body, attachment, date, handle, name, avatar) {
        this.id = id, 
        this.body = body, 
        this.attachment = attachment, 
        this.date = date,
        this.handle = handle,
        this.name = name,
        this.avatar = avatar
    }

    static from(json) {
        const p = Object.assign(new Post(), json)
        p.date = moment(p.date)
        return p
    }
}

export default Post