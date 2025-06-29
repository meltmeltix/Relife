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

db.run('PRAGMA foreign_keys = ON', (err) => {
    if (err) { console.error('Failed to enable foreign key support:', err.message); }
    else { console.log('Foreign key support enabled.'); }
});

module.exports = db     