'use strict'

const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.redirect('/')
})

router.get('/signup', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.render('access', { accessType: "SIGNUP", title: "Sign Up", buttonText: "Next", message: null })
})

router.get('/login', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.render('access', { accessType: "LOGIN", title: "Log In", buttonText: "Log In", message: null })
})

module.exports = router