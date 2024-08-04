'use strict'

const sqlite3 = require('sqlite3')
const path = require('path')

const dbSrc = path.resolve(__dirname, 'relife.db')
console.log('Database path:', dbSrc);

const db = new sqlite3.Database(dbSrc, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        throw err;
    } else console.log('Connected to the database.');
});

module.exports = db     