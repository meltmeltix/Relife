'use strict'

require('sqlite3')

const db = require('../database/db.js')

exports.newPost = function(body, attachment, date, author, thread) {
    return new Promise((resolve, reject) => {
        const query = attachment
            ? 'INSERT INTO post(body, attachment, date, author, thread) VALUES (?, ?, ?, ?, ?)'
            : 'INSERT INTO post(body, date, author, thread) VALUES (?, ?, ?, ?)'
        const post = attachment
            ? [body, attachment, date, author, thread]
            : [body, date, author, thread]

        db.run(query, post, (err) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }
            resolve({author})
        })
    })
}

exports.getAllPosts = function(orderByLikes = false, loggedUser = null) {
    return new Promise((resolve, reject) => {
        const orderClause = orderByLikes
            ? 'ORDER BY likes DESC, post.date DESC'
            : 'ORDER BY post.date DESC';

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".post = post.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                post.id, post.body, post.attachment, post.date,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".post = post.id) AS likes,
                (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = post.id) AS comments,
                ${isLikedSelect}
            FROM post
            JOIN user ON post.author = user.handle
            ${orderClause};
        `;

        const params = loggedUser ? [loggedUser] : [];

        db.all(query, params, (err, rows) => {
            if (err) return reject(err);

            const posts = rows.map((p) => ({
                id: p.id,
                body: p.body,
                attachment: p.attachment ? `data:image/webp;base64,${p.attachment.toString('base64')}` : null,
                date: p.date,
                authorHandle: p.handle,
                authorName: p.name,
                authorAvatar: p.avatar ? `data:image/webp;base64,${p.avatar.toString('base64')}` : null,
                likes: p.likes,
                comments: p.comments,
                isLiked: !!p.isLiked
            }));
            resolve(posts);
        });
    });
};

exports.getUserPosts = function(handle, postType, orderByLikes = false, loggedUser = null) {
    return new Promise((resolve, reject) => {
        console.log('Querying for posts with handle:', handle, 'postType:', postType);

        const orderClause = orderByLikes
            ? 'ORDER BY likes DESC, p.date DESC'
            : 'ORDER BY p.date DESC';

        const hasMediaOnly = postType === 'MEDIA';
        const mediaFilter = hasMediaOnly ? 'AND p.attachment IS NOT NULL' : '';

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".post = p.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                p.id, p.body, p.attachment, p.date,
                u.handle AS author_handle, u.name AS author_name, u.avatar AS author_avatar, 
                t.handle AS thread_handle, t.name AS thread_name,
                (SELECT COUNT(*) FROM "like" WHERE "like".post = p.id) AS likes,
                (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = p.id) AS comments,
                ${isLikedSelect}
            FROM post p
            LEFT JOIN user u ON p.author = u.handle
            LEFT JOIN post pt ON p.thread = pt.id
            LEFT JOIN user t ON pt.author = t.handle
            WHERE u.handle = ?
            ${mediaFilter}
            ${orderClause};
        `;

        const params = loggedUser ? [loggedUser, handle] : [handle];

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject(err);
            }

            const posts = rows.map((p) => ({
                id: p.id,
                body: p.body,
                attachment: p.attachment ? `data:image/webp;base64,${p.attachment.toString('base64')}` : null,
                date: p.date,
                authorHandle: p.author_handle,
                authorName: p.author_name,
                authorAvatar: p.author_avatar ? `data:image/webp;base64,${p.author_avatar.toString('base64')}` : null,
                threadHandle: p.thread_handle,
                threadName: p.thread_name,
                likes: p.likes,
                comments: p.comments,
                isLiked: !!p.isLiked
            }));

            resolve(posts);
        });
    });
};

exports.getUserLikes = function(handle) {
    return new Promise((resolve, reject) => {
        console.log('Querying for posts liked by user with handle:', handle);

        const query = `
            SELECT
                p.id,
                p.body,
                p.attachment,
                p.date,
                u.handle AS author_handle,
                u.name AS author_name,
                u.avatar AS author_avatar,
                t.handle AS thread_handle,
                t.name AS thread_name,
                (SELECT COUNT(*) FROM "like" WHERE "like".post = p.id) AS likes,
                (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = p.id) AS comments
            FROM "like" l
                JOIN post p ON l.post = p.id
                LEFT JOIN user u ON p.author = u.handle
                LEFT JOIN post pt ON p.thread = pt.id
                LEFT JOIN user t ON pt.author = t.handle
            WHERE l."user" = ?
            ORDER BY p.date DESC
        `;

        db.all(query, [handle], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject(err);
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
            }));

            resolve(posts);
        });
    });
};

exports.getStatus = function(id, handle, loggedUser) {
    return new Promise((resolve, reject) => {
        console.log('Querying for user', handle, 'status with id', id)

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".post = post.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                post.id, post.body, post.attachment, post.date,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".post = post.id) AS likes,
                (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = post.id) AS comments,
                ${isLikedSelect}
            FROM post
            JOIN user ON post.author = user.handle
            WHERE post.id = ? AND user.handle = ?;
        `;

        const params = loggedUser ? [loggedUser, id, handle] : [id, handle];

        db.get(query, params, (err, row) => {
            if (err) {
                console.error('Database error:', err)
                return reject(err)
            }

            if (!row) {
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
                likes: row.likes,
                comments: row.comments,
                isLiked: !!row.isLiked
            }

            resolve(status)
        })
    })
}

exports.getStatusComments = function (postId) {
    return new Promise((resolve, reject) => {
        console.log('Querying comments for status', postId)

        const query = `
            SELECT
                post.id, post.body, post.attachment, post.date, post.thread,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".post = post.id) AS likes,
                (SELECT COUNT(*) FROM post AS comments WHERE comments.thread = post.id) AS comments
            FROM post
            JOIN user ON post.author = user.handle
            WHERE post.thread = ?;
        `

        db.all(query, [postId], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }

            const posts = rows.map((p) => ({
                id: p.id,
                body: p.body,
                attachment: p.attachment ? `data:image/jpeg;base64,${p.attachment.toString('base64')}` : null,
                date: p.date,
                authorHandle: p.handle,
                authorName: p.name,
                authorAvatar: p.avatar ? `data:image/jpeg;base64,${p.avatar.toString('base64')}` : null,
                likes: p.likes,
                comments: p.comments
            }))

            resolve(posts)
        })
    })
}

exports.toggleLike = function(postId, userHandle) {
    return new Promise((resolve, reject) => {
        console.log(`Toggling like: user=${userHandle}, post=${postId}`);

        const checkQuery = `SELECT 1 FROM "like" WHERE post = ? AND "user" = ?`;

        db.get(checkQuery, [postId, userHandle], (err, row) => {
            if (err) {
                console.error('Error checking like status:', err);
                return reject(err);
            }

            if (row) {
                // Like exists — remove it
                const deleteQuery = `DELETE FROM "like" WHERE post = ? AND "user" = ?`;
                db.run(deleteQuery, [postId, userHandle], function(err) {
                    if (err) {
                        console.error('Error removing like:', err);
                        return reject(err);
                    }

                    console.log('Like removed');
                    resolve({ action: 'unliked', postId, userHandle });
                });
            } else {
                // Like does not exist — add it
                const insertQuery = `INSERT INTO "like" (post, "user") VALUES (?, ?)`;
                db.run(insertQuery, [postId, userHandle], function(err) {
                    if (err) {
                        console.error('Error adding like:', err);
                        return reject(err);
                    }

                    console.log('Like added');
                    resolve({ action: 'liked', postId, userHandle });
                });
            }
        });
    });
};
