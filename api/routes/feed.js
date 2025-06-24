'use strict'

const express = require('express')
const router = express.Router()

router.get('/explore', function(req, res, next) {
    if(req.isAuthenticated()) res.redirect('/home')
    else res.render('feed', { sessionType: 'GUEST', userHandle: null })
})

router.get('/home', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/explore')
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})

router.get('/search', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/explore')
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})


router.get('/:handle', function(req, res, next) {
    if(!req.isAuthenticated()) res.render('feed', { sessionType: "GUEST", userHandle: null })
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})

router.get('/:handle/replies', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})

router.get('/:handle/media', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})

router.get('/:handle/likes', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})

router.get('/:handle/status/:post', function(req, res, next) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: "USER", userHandle: req.user.handle })
})

module.exports = router