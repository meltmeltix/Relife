import Post from './objects/post.js'

class Api {
    static getPosts = async() => {
        let response = await fetch('/api/posts')
        const postsJson = await response.json()

        if (response.ok) return postsJson.map((pt) => Post.from(pt))
        else throw postsJson
    }
}

export default Api