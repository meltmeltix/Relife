'use strict'

const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddle = multipart()
const statusDao = require('../models/status-dao')
const fs = require('fs')

router.post('/status', multipartMiddle, async function (req, res, _) {
    const { author, body, thread, redirect } = req.body
    const attachment = req.files.attachment
    const date = new Date().toLocaleDateString('en-CA')
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false })
    const dateTime = `${date} ${time}`

    try {
        const attachmentBuffer = fs.readFileSync(attachment.path)

        if (attachment.size > 0) 
            await statusDao.newStatus(body, attachmentBuffer, dateTime, author, thread)
        else 
            await statusDao.newStatus(body, null, dateTime, author, thread)

        res.redirect(redirect)
    } catch(error) {
        console.log('Something went wrong')
        // TODO Add a system to show errors
    }
})

module.exports = router