'use strict'

const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')

const userDao = require('./models/user-dao')

const sessionRouter = require('./routes/session')

// Views setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))

// Login strategy
passport.use(new LocalStrategy(function verify(id, password, callback) {
    userDao.getUser(id, password).then((user, check) => {
        if (!user) return callback(null, false, { message: "Invalid identifier or password"})
        if (!check) return callback(null, false, { message: "Invalid password" })
        return callback(null, user)
    })
}))

// User de/serialization
passport.serializeUser(function (user, callback) { callback(null, user.handle) })
passport.deserializeUser(function (handle, callback) {
    userDao.getUserByHandle(handle).then(user => {
        callback(null, user)
    })
})

// Session setup
app.use(session({
    secret: 'super duper fun secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', sessionRouter)
app.use('/sessions', sessionRouter)

// Add is logged in check

app.listen(port, () => console.log('Listening att: http://localhost:' + port))
module.exports = app