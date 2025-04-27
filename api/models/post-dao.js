'use strict'

const db = require('../database/db.js')
const sqlite3 = require('sqlite3')

exports.newPost = function(body, attachment, date, author) {
    return new Promise((resolve, reject) => {
        const query = attachment
            ? 'INSERT INTO post(body, attachment, date, author) VALUES (?, ?, ?, ?)'
            : 'INSERT INTO post(body, date, author) VALUES (?, ?, ?)'
        const post = attachment
            ? [body, attachment, date, author]
            : [body, date, author]

        db.run(query, post, (err) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }
            resolve({author})
        })
    })
}

exports.newReply = function(body, attachment, date, author) {
    
}

exports.getAllPosts = function() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                post.id, post.body, post.attachment, post.date,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".post = post.id) AS likes,
                (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = post.id) AS comments
            FROM post
            JOIN user ON post.author = user.handle
            ORDER BY post.date DESC;
        `

        db.all(query, (err, rows) => {
            if (err) {
                console.error('Database error: ', err)
                return reject(err)
            }

            const posts = rows.map((p) => ({ 
                id: p.id, 
                body: p.body, 
                attachment: p.attachment ? `data:image/webp;base64,${p.attachment.toString('base64')}` : null,
                date: p.date,
                authorHandle: p.handle,
                authorName: p.name,
                authorAvatar: p.avatar ? `data:image/webp;base64,${p.avatar.toString('base64')}` : null,
                likes: p.likes,
                comments: p.comments
            }))
            resolve(posts)
        })
    })
}

exports.getUserPosts = function(handle, postType) {
    return new Promise((resolve, reject) => {
        console.log('Querying for posts with handle:', handle)

        let query

        if (postType === 'MEDIA') {
            query = `
                SELECT
                    p.id, p.body, p.attachment, p.date,
                    u.handle AS author_handle, u.name AS author_name, u.avatar AS author_avatar, 
                    t.handle AS thread_handle, t.name AS thread_name,
                    (SELECT COUNT(*) FROM "like" WHERE "like".post = p.id) AS likes,
                    (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = p.id) AS comments
                FROM
                    post p
                        LEFT JOIN user u ON p.author = u.handle
                        LEFT JOIN post pt ON p.thread = pt.id
                        LEFT JOIN user t ON pt.author = t.handle
                WHERE u.handle = ?
                AND p.attachment IS NOT NULL
                ORDER BY p.date DESC;
            `
        } else {
            query = `
                SELECT
                    p.id, p.body, p.attachment, p.date,
                    u.handle AS author_handle, u.name AS author_name, u.avatar AS author_avatar,
                    t.handle AS thread_handle, t.name AS thread_name,
                    (SELECT COUNT(*) FROM "like" WHERE "like".post = p.id) AS likes,
                    (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = p.id) AS comments
                FROM
                    post p
                        LEFT JOIN user u ON p.author = u.handle
                        LEFT JOIN post pt ON p.thread = pt.id
                        LEFT JOIN user t ON pt.author = t.handle
                WHERE u.handle = ?
                ORDER BY p.date DESC;
            `
        }

        db.all(query, [handle], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }

            const posts = rows.map((p) => ({
                id: p.id, 
                body: p.body, 
                attachment: p.attachment ? `data:image/jpeg;base64,${p.attachment.toString('base64')}` : null,
                date: p.date,
                authorHandle: p.author_handle,
                authorName: p.author_name,
                authorAvatar: p.author_avatar ? `data:image/jpeg;base64,${p.author_avatar.toString('base64')}` : null,
                threadHandle: p.thread_handle,
                threadName: p.thread_name,
                likes: p.likes,
                comments: p.comments
            }))
            resolve(posts)
        })
    })
}

exports.getStatus = function(id, handle) {
    return new Promise((resolve, rejects) => {
        console.log('Querying for user', handle, 'status with id', id)

        const query = `
            SELECT id, body, attachment, date, handle, name, avatar
            FROM post, user
            WHERE id = ? AND handle = ?
        `

        db.get(query, [id, handle], (err, row) => {
            if (err) {
                console.error('Database error:', err)
                return reject(err)
            }
            if(!row) {
                console.log('Status not found')
                return resolve({ error: 'Post not found' })
            }

            const status = {
                id: row.id, 
                body: row.body, 
                attachment: row.attachment ? `data:image/jpeg;base64,${row.attachment.toString('base64')}` : null,
                date: row.date,
                authorHandle: row.handle,
                authorName: row.name,
                authorAvatar: row.avatar ? `data:image/jpeg;base64,${row.avatar.toString('base64')}` : null,
            }

            resolve(status)
        })
    })
}