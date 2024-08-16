'use strict'

const db = require('../database/db.js')
const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Given a user object, retrieve all of it's information
 * and insert into the user table to create a new user
 * 
 * @param {*} user          Contains all the information about the new user
 * @returns
 */
exports.createUser = function(handle, mail, password, birthDate) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO user(handle, mail, password, birthdate, name, bio, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)'
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = [handle, mail, hashedPassword, birthDate, null, null, null]

        db.run(query, user, (err) => {
            if (err) {
                console.error('Error executing query:', err);  // Log any error from the query execution
                return reject(err);
            }
            resolve({username: handle, password: hashedPassword})
        })
    })
}

/**
 * Given user data, execute select query to retrieve the user
 * 
 * @param {*} id            Can be either handle or mail
 * @param {*} password      Secret to be checked
 * @returns                 User and user existance, fullfilling the promise.
 *                          Otherwise rejects with the respective error
 */
exports.getUser = function(id, password) {
    return new Promise((resolve, reject) => {
        const query = mailRegex.test(id) 
            ? 'SELECT * FROM user WHERE mail = ?'
            : 'SELECT * FROM user WHERE handle = ?';

        console.log('Executing query:', query, 'with ID:', id);

        db.get(query, [id], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            if (!row) {
                console.log('User not found');
                return resolve({ error: 'User not found' });
            }

            const user = { handle: row.handle, mail: row.mail };
            const check = bcrypt.compareSync(password, row.password);

            console.log('Password check result:', check);

            resolve({ user, check });
        });
    });
}

exports.getUserByHandle = function(handle) {
    return new Promise((resolve, reject) => {
        console.log('Querying for user with handle:', handle);  // Log the handle being queried

        const query = 'SELECT * FROM user WHERE handle = ?';

        db.get(query, [handle], (err, row) => {
            if (err) {
                console.error('Error executing query:', err);  // Log any error from the query execution
                return reject(err);
            }

            if (!row) {
                console.log('No user found for handle:', handle);  // Log when no user is found
                return resolve({ error: 'User not found' });
            }

            const user = { handle: row.handle, mail: row.mail };
            console.log('User found:', user);  // Log the user object found
            resolve(user);
        });
    });
}