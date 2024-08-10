'use strict'

const { rejects } = require('assert')
const db = require('../database/db.js')
const sqlite3 = require('sqlite3')

exports.getAllPosts = function() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM post'

        db.all(query, (err, rows) => {
            if (err) {
                console.error('Database error: ', err)
                return reject(err)
            }

            const posts = rows.map((p) => ({ 
                id: p.id, 
                body: p.body, 
                attachment: p.attachment, 
                date: p.date,
                author: p.author
            }))
            resolve(posts)
        })
    })
}