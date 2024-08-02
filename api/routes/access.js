'use strict'

const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.redirect('/')
})

router.get('/signup', function (req, res, next) {
    res.render('access', { accessType: "SIGNUP", title: "Sign Up", buttonText: "Next" })
})

router.get('/login', function (req, res, next) {
    res.render('access', { accessType: "LOGIN", title: "Log In", buttonText: "Log In" })
})

module.exports = router