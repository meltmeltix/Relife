'use strict'

const sqlite = require('sqlite')
const dbSrc = './relife.db'
const db = new sqlite.Database(dbSrc, (err) => {
    if (err) throw err
})