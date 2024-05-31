'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', function (req, res, next) {
    //const isLogged = req.isAuthenticated()
    res.render('index')
})

// TODO Create EJS logic to display information
router.post('/sessions', function(req, res, next) {
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