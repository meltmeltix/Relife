'use strict'

const actions = {
    LOGIN: 1,
    SIGNUP: 2
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal')
    const content = document.getElementById('modal-content')
    const signup = document.getElementById('signupBtn')
    const login = document.getElementById('loginBtn')

    signup.addEventListener('click', function() { modalContent(actions.SIGNUP) })
    login.addEventListener('click', function() { modalContent(actions.LOGIN) })

    function modalContent(action) {
        fetch('/showModalContent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: action })
        })
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            modal.showModal()
        })
        .catch(error => console.error('Error:', error))
    }
})