'use strict'

import App from './app.js'

const titleBar = document.querySelector('#title-bar')

const postThread = document.querySelector('#post_thread');
const postRedirect = document.querySelector('#post_redirect');

const feedTabRow = document.querySelector('#feed-tabs')
const contentContainer = document.querySelector('#content-container')

const sideNavigation = document.querySelector('#side-navigation')
const bottomNavigation = document.querySelector('#bottom-navigation')

const app = new App(
    userType, loggedUser,
    titleBar, feedTabRow, contentContainer, sideNavigation, bottomNavigation,
    postThread, postRedirect
)