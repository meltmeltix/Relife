'use strict'

import Destination from "../classes/destination.js"

export const destinationList = [
    new Destination(
        'HOME',
        'home',
        'Home',
        '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
    ),
    new Destination(
        'SEARCH',
        'search',
        'Search',
        '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'
    ),
    new Destination(
        'PROFILE',
        'profile',
        'Profile',
        '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
    ),
]

export const profileTabs = [
    new Destination(
        'POST',
        'post',
        'Post',
        ''
    ),
    new Destination(
        'REPLIES',
        'replies',
        'Replies',
        ''
    ),
    new Destination(
        'MEDIA',
        'media',
        'Media',
        ''
    ),
    new Destination(
        'LIKES',
        'likes',
        'Likes',
        ''
    )
]