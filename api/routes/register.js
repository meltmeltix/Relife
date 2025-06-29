// routes/register.js
'use strict'

const express = require('express')
const router = express.Router()
const userDao = require('../models/user-dao')

router.post('/', async function (req, res, _) {
    console.log(req.body)
    const { handle, mail, password, birthDate } = req.body

    if (getAge(birthDate) < 18) {
        return res.render('access', { 
            accessType: "SIGNUP", 
            title: "Sign Up", 
            messageType: "ERROR",
            message: 'User must be 18 or older to create an account.'
        })
    }

    const doesUserExist = await userDao.getUserByHandle(handle)
    if (doesUserExist) {
        if (doesUserExist.handle === handle) {
            console.log('User with handle', handle, 'already exists')
            return res.render('access', { 
                accessType: "SIGNUP", 
                title: "Sign Up", 
                messageType: "ERROR",
                message: 'This username has already been taken. Try another one.' 
            })

        } else if (doesUserExist.mail === mail) {
            console.log('User with mail', mail, 'already exists')
            return res.render('access', { 
                accessType: "SIGNUP", 
                title: "Sign Up", 
                messageType: "ERROR",
                message: 'This email has already been used. Try another one.' 
            })
        }
    }

    try {
        await userDao.createUser(handle, mail, password, birthDate)

        return res.render('access', {
            accessType: "LOGIN",
            title: "Log In",
            messageType: "SUCCESS",
            message: "Account created!<br>Now log in to start using Relife."
        })
    } catch (error) {
        console.log('Error creating user', error)
        return res.render('access', { 
            accessType: "SIGNUP", 
            title: "Sign Up",
            messageType: "ERROR", 
            message: 'Something went wrong.'
        })
    }
})

function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = router
