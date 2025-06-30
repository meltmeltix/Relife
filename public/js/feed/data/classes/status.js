class Status {
    constructor(id, body, attachment, date, authorHandle, authorName, authorAvatar, threadHandle, threadName, likes, comments) {
        this.id = id
        this.body = body
        this.attachment = attachment
        this.date = date
        this.authorHandle = authorHandle
        this.authorName = authorName
        this.authorAvatar = authorAvatar
        this.threadHandle = threadHandle
        this.threadName = threadName
        this.likes = likes
        this.comments = comments
    }

    static from(json) {
        const p = Object.assign(new Status(), json)
        p.date = moment(p.date)
        return p
    }
}

export default Status