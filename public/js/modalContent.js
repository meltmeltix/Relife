'use strict'

const actions = {
    LOGIN: 1,
    SIGNUP: 2
}

document.addEventListener('DOMContentLoaded', function() {
    const signup = document.getElementById('signupBtn')
    const login = document.getElementById('loginBtn')

    signup.addEventListener('click', function() { modalContent(actions.SIGNUP) })
    login.addEventListener('click', function() { modalContent(actions.LOGIN) })

    function modalContent(action) {
        
    }
})