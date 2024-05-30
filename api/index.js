'use strict'

const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const sessionRouter = require('./routes/session')

const userDao = require('./models/user-dao')


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
    secret: 'your-complex-secure-secret-here',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', sessionRouter)
app.use('/sessions', sessionRouter)

// Add is logged in check

app.listen(port, () => console.log('Listening att: http://localhost:' + port))
module.exports = app