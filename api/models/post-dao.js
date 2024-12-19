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
            SELECT id, body, attachment, date, handle, name, avatar
            FROM post, user
            WHERE author = handle
            ORDER BY date DESC
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
                handle: p.handle,
                name: p.name,
                avatar: p.avatar ? `data:image/webp;base64,${p.avatar.toString('base64')}` : null,
            }))
            resolve(posts)
        })
    })
}

exports.getUserPosts = function(handle) {
    return new Promise((resolve, reject) => {
        console.log('Querying for posts with handle:', handle)

        const query = `
            SELECT id, body, attachment, date, handle, name, avatar
            FROM post, user
            WHERE author = handle AND author = ?
            ORDER BY date DESC
        `

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
                handle: p.handle,
                name: p.name,
                avatar: p.avatar ? `data:image/jpeg;base64,${p.avatar.toString('base64')}` : null,
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
                handle: row.handle,
                name: row.name,
                avatar: row.avatar ? `data:image/jpeg;base64,${row.avatar.toString('base64')}` : null,
            }

            resolve(status)
        })
    })
}