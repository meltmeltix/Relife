'use strict'

const { rejects } = require('assert');
const db = require('../database/db.js')
const bcrypt = require('bcrypt');
const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

exports.createUser = function() {
    return new Promise((resolve, rejects) => {

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
        let isIdMail = false
        let query = () => {
            if (mailRegex.test(id)) return 'SELECT * FROM user WHERE id = ?'
            else return 'SELECT * FROM user WHERE mail = ?'
        }

        db.get(query, [id], (err, row) => {
            if (err) reject(err)
            else if (row === undefined) resolve({error: 'User not found'})
            else {
                const user = { handle: row.handle, mail: row.mail }
                let check = false

                if (bcrypt.compareSync(password, row.password)) check = true

                resolve({user, check})
            }
        })
    })
}

exports.getUserByHandle = function(handle) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE handle = ?'
        
        db.get(query, [handle], (err, row) => {
            if (err) reject(err)
            else if (row === undefined) resolve({error: 'User not fount'})
            else {
                const user = { handle: row.handle, mail: row.mail }
                resolve(user)
            }
        })
    })
}