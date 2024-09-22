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
    const attachment = req.files
    const date = new Date().toLocaleDateString('en-CA')

    
})

module.exports = router