'use strict'

import App from './app.js'

const titleBar = document.querySelector('#title-bar')

const contentContainer = document.querySelector('#content-container')

const navDrawer = document.querySelector('#nav-drawer')
const navBar = document.querySelector('#nav-bar')

const app = new App(userType, loggedUser, navDrawer, navBar, titleBar, contentContainer)