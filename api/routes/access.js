'use strict'

const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.redirect('/')
})

router.get('/signup', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.render('access', { accessType: "SIGNUP", title: "Sign Up", message: null })
})

router.get('/login', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.render('access', { accessType: "LOGIN", title: "Log In", message: null })
})

router.get('/forgot', function (req, res, next) {
    if (req.isAuthenticated()) res.redirect('/home')
    else res.render('access', { accessType: "FORGOT", title: "Password recovery", message: null })
})

module.exports = router