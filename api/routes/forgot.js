const express = require('express');
const router = express.Router();
const userDao = require('../models/user-dao');

router.post('/', async function (req, res, _) {
    console.log(req.body);
    const { username, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.render('access', {
            accessType: 'FORGOT',
            title: 'Password recovery',
            messageType: 'ERROR',
            message: 'Passwords not matching.'
        })
    }

    try {
        await userDao.updateUserPassword(username, newPassword)

        return res.render('access', {
            accessType: 'LOGIN',
            title: 'Log in',
            messageType: 'SUCCESS',
            message: 'Successfully updated user password!'
        })
    } catch (error) {
        return res.render('access', {
            accessType: 'FORGOT',
            title: 'Password recovery',
            messageType: 'ERROR',
            message: error.message
        })
    }
})

module.exports = router