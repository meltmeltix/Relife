'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', function (req, res, next) {
    const isLogged = req.isAuthenticated()
    if (isLogged) res.render('home')
    else res.render('index')
})

// TODO Create EJS logic to display information
router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err)
        if (!user) return res.render('index') // info.message
    
        // Success
        req.login(user, function(err) {
            // req.user = logged user
            if (err) { return next(err) }
            res.redirect('feed')
        })
    }) (req, res, next)
})

// Handle issues
// Handle logout

module.exports = router