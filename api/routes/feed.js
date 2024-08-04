'use strict'

const express = require('express')
const router = express.Router()

router.get('/explore', function(req, res, next) {
    res.render('feed', { userType: 'GUEST', title: 'Explore' })
})

router.get('/home', function(req, res, next) {
    res.render('feed', { userType: "USER", "tab": "HOME", title: "Home" })
})

router.get('/search', function(req, res, next) {
    res.render('feed', { userType: "USER", "tab": "SEARCH", title: "Search" })
})

router.get('/profile', function(req, res, next) {
    res.render('feed', { userType: "USER", "tab": "PROFILE", title: "Profile" })
})

module.exports = router