'use strict'

import App from './app.js'

console.log("Got ", userType)

const navDrawer = document.querySelector('#nav-drawer')
const navBar = document.querySelector('#nav-bar')

const app = new App(userType, navDrawer, navBar)