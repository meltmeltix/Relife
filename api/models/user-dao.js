'use strict'

require('sqlite3');

const db = require('../database/db.js')
const bcrypt = require('bcrypt');
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

exports.createUser = function(handle, mail, name, password, birthDate, bio) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO user(handle, mail, password, birthdate, name, bio, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)'
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = [handle, mail, hashedPassword, birthDate, name, bio, null]

        db.run(query, user, (err) => {
            if (err) {
                console.error('Error executing query:', err);  // Log any error from the query execution
                return reject(err);
            }
            resolve({username: handle, password: hashedPassword})
        })
    })
}

exports.getUser = function(id, password) {
    return new Promise((resolve, reject) => {
        const query = mailRegex.test(id) 
            ? 'SELECT * FROM user WHERE mail = ?'
            : 'SELECT * FROM user WHERE handle = ?'

        console.log('Executing query:', query, 'with ID:', id)

        db.get(query, [id], (err, row) => {
            if (err) {
                console.error('Database error:', err)
                return reject(err)
            }
            if (!row) {
                console.log('User not found')
                return resolve({ error: 'User not found' })
            }

            const user = { handle: row.handle, mail: row.mail, type: row.type }
            const check = bcrypt.compareSync(password, row.password)

            console.log('Password check result:', check)

            resolve({ user, check })
        })
    })
}

exports.getUserByHandle = function(handle) {
    return new Promise((resolve, reject) => {
        console.log('Querying for user with handle:', handle)

        const query = 'SELECT * FROM user WHERE handle = ?'

        db.get(query, [handle], (err, row) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }

            if (!row) {
                console.log('No user found for handle:', handle)
                return resolve({ error: 'User not found' })
            }

            const user = { handle: row.handle, mail: row.mail, type: row.type }
            console.log('User found!')
            resolve(user)
        })
    })
}

exports.getUserProfile = function(handle) {
    return new Promise((resolve, reject) => {
        console.log('Querying for user profile with handle:', handle)

        const query = 'SELECT handle, name, bio, avatar FROM user WHERE handle=?'

        db.get(query, [handle], (err, row) => {
            if (err) {
                console.error('Error executing query:', err)
                return reject(err)
            }

            if (!row) {
                console.log('No user profile found for handle:', handle)
                return resolve({ error: 'User not found' })
            }

            const user = { 
                handle: row.handle, 
                name: row.name, 
                bio: row.bio,
                avatar: row.avatar ? `data:image/webp;base64,${row.avatar.toString('base64')}` : null,
                type: row.type
            }
            console.log('User found!')
            resolve(user)
        })
    })
}

exports.updateUserPassword = function(id, newPassword) {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const isEmail = mailRegex.test(id);
        const query = isEmail
            ? 'UPDATE user SET password = ? WHERE mail = ?'
            : 'UPDATE user SET password = ? WHERE handle = ?';

        db.run(query, [hashedPassword, id], function(err) {
            if (err) {
                console.error('Error updating password:', err);
                return reject(err);
            }

            if (this.changes === 0) {
                console.warn('No user found to update password for:', id);
                return reject(new Error('User not found'));
            }

            console.log('Password updated successfully for', id);
            resolve({ success: true });
        });
    });
}

exports.getUsersByQuery = function(searchQuery) {
    return new Promise((resolve, reject) => {
        console.log('Searching users with query:', searchQuery);

        const trimmedQuery = searchQuery.trim().toLowerCase();
        const likeQuery = `%${trimmedQuery}%`;

        const sql = `
            SELECT handle, name, bio, avatar
            FROM user
            WHERE LOWER(handle) LIKE ?
               OR LOWER(name) LIKE ?
            ORDER BY name
        `;

        db.all(sql, [likeQuery, likeQuery], (err, rows) => {
            if (err) {
                console.error('Error executing user search query:', err);
                return reject(err);
            }

            const users = rows.map((u) => ({
                handle: u.handle,
                name: u.name,
                bio: u.bio,
                avatar: u.avatar ? `data:image/webp;base64,${u.avatar.toString('base64')}` : null,
            }));

            resolve(users);
        });
    });
};

