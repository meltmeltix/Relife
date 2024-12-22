class Post {
    constructor(id, body, attachment, date, authorHandle, authorName, authorAvatar, threadHandle, threadName) {
        this.id = id
        this.body = body
        this.attachment = attachment
        this.date = date
        this.authorHandle = authorHandle
        this.authorName = authorName
        this.authorAvatar = authorAvatar
        this.threadHandle = threadHandle
        this.threadName = threadName
    }

    static from(json) {
        const p = Object.assign(new Post(), json)
        p.date = moment(p.date)
        return p
    }
}

export default Post