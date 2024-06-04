'use strict'

const express = require('express')
const router = express.Router()

router.get('/login', function (req, res, next) {
    res.render('partials/login')
})

router.get('/signup', function (req, res, next) {
    res.render('partials/onboarding/step1')
})

module.exports = router