'use strict'

const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const sessionRouter = require('./routes/session')

const indexRouting = require('./routes/indexFlow')

const homeRouter = require('./routes/home')
const searchRouter = require('./routes/search')
const profileRouter = require('./routes/profile')

const userDao = require('./models/user-dao')
const { profile } = require('console')

// Views setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

// Static folder setup
app.use(bodyParser.json())
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

const isLogged = (req, res, next) => {
    if (req.isAuthenticated() && !req.user.error) next()
    else res.redirect('/')
}

app.use('/', sessionRouter)
app.use('/sessions', sessionRouter)
app.use('/i', indexRouting)
//app.use('/home', homeRouter)
//app.use('/search', isLogged, searchRouter)
//app.use('/profile', isLogged, profileRouter)

app.use(function (req, res, next) { next(createError(404)) })
app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

app.listen(port, () => console.log('Listening at: http://localhost:' + port))
module.exports = app