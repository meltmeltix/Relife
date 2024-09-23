'use strict'

const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddle = multipart()
const postDao = require('../models/post-dao')
const fs = require('fs')

router.post('/post', multipartMiddle, async function (req, res, next) {
    console.log(req.body, req.files)
    const { author, body } = req.body
    const attachment = req.files.attachment
    const date = new Date().toLocaleDateString('en-CA')
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false })
    const dateTime = `${date} ${time}`

    try {
        const attachmentBuffer = fs.readFileSync(attachment.path)

        if (attachment.size > 0) 
            await postDao.newPost(body, attachmentBuffer, dateTime, author)
        else 
            await postDao.newPost(body, null, dateTime, author)

        res.redirect('/home')
    } catch(error) {
        console.log('Something went wrong')
        // TODO Add a system to show errors
    }
})

module.exports = router