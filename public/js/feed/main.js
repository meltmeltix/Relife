'use strict'

import App from './app.js'

const titleBar = document.querySelector('#title-bar')

const statusThread = document.querySelector('#status_thread');
const statusRedirect = document.querySelector('#status_redirect');

const contentContainer = document.querySelector('#content-container')

const sideNavigation = document.querySelector('#side-navigation')
const bottomNavigation = document.querySelector('#bottom-navigation')

new App(
    userType, loggedUser,
    titleBar, contentContainer, sideNavigation, bottomNavigation,
    statusThread, statusRedirect
)