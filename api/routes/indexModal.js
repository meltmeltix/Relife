'use strict'

const express = require('express')
const router = express.Router()

router.post('/showModalContent', function(req, res) {
    const action = req.body.action

    if (action === 'LOGIN') {
        res.render('partials/login', (err, html) => {
            if (err) return res.status(500).send("Error rendering partial")
            res.send(html)
        })
    } else if (action === 'SIGNUP') {
        res.render('partials/onboarding/step1', (err, html) => {
            if (err) return res.status(500).send("Error rendering partial")
            res.send(html)
        })
    } else {
        res.status(400).send('Invalid action')
    }
})

module.exports = router