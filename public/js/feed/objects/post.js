class Post {
    constructor(id, body, attachment, date, author) {
        this.id = id
        this.body = body
        this.attachment = attachment
        this.date = date
        this.author = author
    }

    static from(json) {
        const p = Object.assign(new Post(), json)
        p.date = moment(p.date)
        return p
    }
}

export default Post