const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')

const userDao = require('models/user-dao.js')

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

app.get("/", (req, res) => res.render('pages/index'))
app.get("/home", (req, res) => res.render('pages/feed', {'content': 'HOME'}))

app.listen(port, () => console.log("Server ready on port 3000."))

module.exports = app