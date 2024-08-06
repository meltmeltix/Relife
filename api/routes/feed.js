'use strict'

const express = require('express')
const router = express.Router()

router.get('/explore', function(req, res, next) {
    if(req.isAuthenticated()) res.redirect('/home')
    else res.render('feed', { sessionType: 'GUEST' })
})

router.get('/home', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/')
    else res.render('feed', { sessionType: "USER" })
})

router.get('/search', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/')
    else res.render('feed', { sessionType: "USER" })
})

router.get('/profile', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/')
    else res.render('feed', { sessionType: "USER" })
})

module.exports = router