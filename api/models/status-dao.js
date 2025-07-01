'use strict'

require('sqlite3')

const db = require('../database/db.js')

exports.newStatus = function(body, attachment, date, author, thread) {
    return new Promise((resolve, reject) => {
        thread = thread === '' ? null : thread;

        const query = attachment
            ? 'INSERT INTO status(body, attachment, date, author, thread) VALUES (?, ?, ?, ?, ?)'
            : 'INSERT INTO status(body, date, author, thread) VALUES (?, ?, ?, ?)'
        const status = attachment
            ? [body, attachment, date, author, thread]
            : [body, date, author, thread]

        db.run(query, status, (err) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }
            resolve({author})
        })
    })
}

exports.getAllStatuses = function(orderByLikes = false, loggedUser = null) {
    return new Promise((resolve, reject) => {
        const orderClause = orderByLikes
            ? 'ORDER BY likes DESC, status.date DESC'
            : 'ORDER BY status.date DESC';

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".status = status.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                status.id, status.body, status.attachment, status.date,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".status = status.id) AS likes,
                (SELECT COUNT(*) FROM status AS comments WHERE comments.thread = status.id) AS comments,
                ${isLikedSelect}
            FROM status
            JOIN user ON status.author = user.handle
            ${orderClause};
        `;

        const params = loggedUser ? [loggedUser] : [];

        db.all(query, params, (err, rows) => {
            if (err) return reject(err);

            const statuses = rows.map((p) => ({
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
            resolve(statuses);
        });
    });
};

exports.getStatusesByQuery = function (searchQuery, loggedUser = null) {
    return new Promise((resolve, reject) => {
        console.log('Searching statuses with query:', searchQuery);

        const trimmedQuery = searchQuery.trim();
        const likeQuery = `%${trimmedQuery}%`;

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".status = status.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                status.id, status.body, status.attachment, status.date,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".status = status.id) AS likes,
                (SELECT COUNT(*) FROM status AS comments WHERE comments.thread = status.id) AS comments,
                ${isLikedSelect}
            FROM status
                     JOIN user ON status.author = user.handle
            WHERE status.body LIKE ? COLLATE NOCASE
            ORDER BY status.date DESC;
        `;

        const params = loggedUser ? [loggedUser, likeQuery] : [likeQuery];

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Error executing search query:', err);
                return reject(err);
            }

            const statuses = rows.map((p) => ({
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

            resolve(statuses);
        });
    });
};

exports.getUserStatuses = function(handle, statusType, orderByLikes = false, loggedUser = null) {
    return new Promise((resolve, reject) => {
        console.log('Querying for statuses with handle:', handle, 'statusType:', statusType);

        const orderClause = orderByLikes
            ? 'ORDER BY likes DESC, p.date DESC'
            : 'ORDER BY p.date DESC';

        const hasMediaOnly = statusType === 'MEDIA';
        const mediaFilter = hasMediaOnly ? 'AND p.attachment IS NOT NULL' : '';

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".status = p.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                p.id, p.body, p.attachment, p.date,
                u.handle AS author_handle, u.name AS author_name, u.avatar AS author_avatar, 
                t.handle AS thread_handle, t.name AS thread_name,
                (SELECT COUNT(*) FROM "like" WHERE "like".status = p.id) AS likes,
                (SELECT COUNT(*) FROM status AS comments WHERE comments.thread = p.id) AS comments,
                ${isLikedSelect}
            FROM status p
            LEFT JOIN user u ON p.author = u.handle
            LEFT JOIN status pt ON p.thread = pt.id
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

            const statuses = rows.map((p) => ({
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

            resolve(statuses);
        });
    });
};

exports.getUserLikes = function(handle) {
    return new Promise((resolve, reject) => {
        console.log('Querying for statuses liked by user with handle:', handle);

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
                (SELECT COUNT(*) FROM "like" WHERE "like".status = p.id) AS likes,
                (SELECT COUNT(*) FROM status AS comments WHERE comments.thread = p.id) AS comments
            FROM "like" l
                JOIN status p ON l.status = p.id
                LEFT JOIN user u ON p.author = u.handle
                LEFT JOIN status pt ON p.thread = pt.id
                LEFT JOIN user t ON pt.author = t.handle
            WHERE l."user" = ?
            ORDER BY p.date DESC
        `;

        db.all(query, [handle], (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject(err);
            }

            const statuses = rows.map((p) => ({
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
                comments: p.comments,
                isLiked: true
            }));

            resolve(statuses);
        });
    });
};

exports.getStatus = function(id, handle, loggedUser) {
    return new Promise((resolve, reject) => {
        console.log('Querying for user', handle, 'status with id', id)

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".status = status.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                status.id, status.body, status.attachment, status.date,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".status = status.id) AS likes,
                (SELECT COUNT(*) FROM status AS comments WHERE comments.thread = status.id) AS comments,
                ${isLikedSelect}
            FROM status
            JOIN user ON status.author = user.handle
            WHERE status.id = ? AND user.handle = ?;
        `;

        const params = loggedUser ? [loggedUser, id, handle] : [id, handle];

        db.get(query, params, (err, row) => {
            if (err) {
                console.error('Database error:', err)
                return reject(err)
            }

            if (!row) {
                console.log('Status not found')
                return resolve({ error: 'Status not found' })
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

exports.getStatusComments = function (statusId, loggedUser = null) {
    return new Promise((resolve, reject) => {
        console.log('Querying comments for status', statusId)

        const isLikedSelect = loggedUser
            ? `(EXISTS (SELECT 1 FROM "like" WHERE "like".status = status.id AND "like"."user" = ?)) AS isLiked`
            : `0 AS isLiked`;

        const query = `
            SELECT
                status.id, status.body, status.attachment, status.date, status.thread,
                user.handle, user.name, user.avatar,
                (SELECT COUNT(*) FROM "like" WHERE "like".status = status.id) AS likes,
                (SELECT COUNT(*) FROM status AS comments WHERE comments.thread = status.id) AS comments,
                ${isLikedSelect}
            FROM status
            JOIN user ON status.author = user.handle
            WHERE status.thread = ?
            ORDER BY status.date ASC;
        `

        const params = loggedUser ? [loggedUser, statusId] : [statusId];

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }

            const statuses = rows.map((p) => ({
                id: p.id,
                body: p.body,
                attachment: p.attachment ? `data:image/jpeg;base64,${p.attachment.toString('base64')}` : null,
                date: p.date,
                authorHandle: p.handle,
                authorName: p.name,
                authorAvatar: p.avatar ? `data:image/jpeg;base64,${p.avatar.toString('base64')}` : null,
                likes: p.likes,
                comments: p.comments,
                isLiked: !!p.isLiked
            }))

            resolve(statuses)
        })
    })
}

exports.toggleLike = function(statusId, userHandle) {
    return new Promise((resolve, reject) => {
        console.log(`Toggling like: user=${userHandle}, status=${statusId}`);

        const checkQuery = `SELECT 1 FROM "like" WHERE status = ? AND "user" = ?`;

        db.get(checkQuery, [statusId, userHandle], (err, row) => {
            if (err) {
                console.error('Error checking like status:', err);
                return reject(err);
            }

            if (row) {
                // Like exists — remove it
                const deleteQuery = `DELETE FROM "like" WHERE status = ? AND "user" = ?`;
                db.run(deleteQuery, [statusId, userHandle], function(err) {
                    if (err) {
                        console.error('Error removing like:', err);
                        return reject(err);
                    }

                    console.log('Like removed');
                    resolve({ action: 'unliked', statusId, userHandle });
                });
            } else {
                // Like does not exist — add it
                const insertQuery = `INSERT INTO "like" (status, "user") VALUES (?, ?)`;
                db.run(insertQuery, [statusId, userHandle], function(err) {
                    if (err) {
                        console.error('Error adding like:', err);
                        return reject(err);
                    }

                    console.log('Like added');
                    resolve({ action: 'liked', statusId, userHandle });
                });
            }
        });
    });
};

exports.deleteStatus = function(id) {
    return new Promise((resolve, reject) => {
        console.log(`Deleting status with ID ${id}`);

        const deleteQuery = `DELETE FROM status WHERE id = ?`;

        db.run(deleteQuery, [id], function(err) {
            if (err) {
                console.error('Error deleting status:', err);
                return reject(err);
            }

            if (this.changes === 0) {
                // No post was deleted (i.e., no match)
                console.warn(`Status with ID ${id} not found.`);
                return resolve({ deleted: false, message: 'Status not found' });
            }

            console.log(`Status with ID ${id} deleted.`);
            resolve({ deleted: true, id });
        });
    });
};
