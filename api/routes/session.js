'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', function (req, res, _) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.render('index')
})

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err)
        if (!user) 
            return res.render('access', { 
                accessType: "LOGIN", 
                title: "Log In", 
                messageType: "ERROR",
                message: info.message
            })

        req.logIn(user, function(err) {
            if (err) return next(err)
            return res.redirect('/home')
        })
    })(req, res, next)
})

router.use(function (err, req, res, _) {
    res.render('access', { 
        accessType: "LOGIN", 
        title: "Log In", 
        messageType: "ERROR", 
        message: err.message 
    });
});

router.post('/logout', function(req, res, next) {
    req.logout(function (err) {
        if (err) return next(err)
        return res.redirect('/')
    })
})

module.exports = router