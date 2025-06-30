'use strict'

const express = require('express')
const router = express.Router()

router.get('/explore', function(req, res, _) {
    if(req.isAuthenticated()) res.redirect('/home')
    else res.render('feed', { sessionType: 'GUEST', userHandle: null })
})

router.get('/home', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/explore')
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/search', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/explore')
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/search/users', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/explore')
    if(!req.params.q) res.redirect('/search')
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/:handle', function(req, res, _) {
    if(!req.isAuthenticated()) res.render('feed', { sessionType: "GUEST", userHandle: null })
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/:handle/replies', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/:handle/media', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/:handle/likes', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

router.get('/:handle/status/:post', function(req, res, _) {
    if(!req.isAuthenticated()) res.redirect('/' + req.params.handle)
    else res.render('feed', { sessionType: req.user.type, userHandle: req.user.handle })
})

module.exports = router