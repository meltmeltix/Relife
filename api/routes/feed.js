'use strict'

const express = require('express')
const router = express.Router()

router.get('/explore', function(req, res, next) {
    res.render('feed', { userType: 'GUEST' })
})

module.exports = router