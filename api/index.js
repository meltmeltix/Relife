'use strict'

const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 4000

const logger = require('morgan')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const sessionRouter = require('./routes/session')
const accessRouter = require('./routes/access')
const registerRouter = require('./routes/register')

const newUploadRoute = require('./routes/new-upload')
const feedRouter = require('./routes/feed')

const userDao = require('./models/user-dao')
const postDao = require('./models/post-dao')
const { profile } = require('console')
const {log} = require("node:util");

// Views setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Login strategy
passport.use(new LocalStrategy(
    function verify(username, password, done) {
        userDao.getUser(username, password).then(({user, check}) => {
            if (!check) return done(null, false, { message: 'Incorrect password' });
            if (!user) return done(null, false, { message: 'User not found' });
            
            return done(null, user); // Pass only the user object
        }).catch(err => done(err));
    }
));

// User de/serialization
passport.serializeUser(function (user, done) {
    if (!user || !user.handle) return done(new Error('Invalid user object during serialization.'));

    done(null, user.handle);
});

passport.deserializeUser(function (handle, done) {
    if (!handle) return done(new Error('Invalid handle during deserialization.'));

    userDao.getUserByHandle(handle).then(user => {
        if (!user) return done(new Error('User not found.'));

        done(null, user);
    }).catch(err => done(err));
});

// Session setup
app.use(session({
    secret: 'your-complex-secure-secret-here',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/api/posts', async (req, res) => {
    const { loggedUser, orderByLikes } = req.query;
    const orderLikes = orderByLikes === 'true';
    const logPrefix = 'Fetching posts';

    console.log(`${logPrefix}...`);

    try {
        const posts = await postDao.getAllPosts(orderLikes, loggedUser);
        console.log(`${logPrefix}: Success`);
        res.json(posts);
    } catch (error) {
        console.log(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
})

app.get('/api/posts/:user', async (req, res) => {
    const user = req.params.user;
    const { postType, orderByLikes } = req.query;
    const orderLikes = orderByLikes === 'true';
    const logPrefix = user ? `Fetching ${user} posts` : 'Fetching posts';

    console.log(`${logPrefix}...`);

    try {
        const posts = await postDao.getUserPosts(user, postType, orderLikes);
        console.log(`${logPrefix}: Success`);
        res.json(posts);
    } catch (error) {
        console.log(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
})

app.get('/api/likes', async (req, res) => {
    const handle = req.query.handle;

    console.log(`Fetching ${handle} liked posts`)

    try {
        const posts = await postDao.getUserLikes(handle)
        console.log(`Fetching ${handle} liked posts: Success`)
        res.json(posts);
    } catch (error) {
        console.log(`Fetching ${handle} liked posts: Failure`, error);
        res.status(500).end();
    }
})

app.get('/api/status', (req, res) => {
    const id = req.query.id
    const handle = req.query.handle
    console.log('Fetching post with', id, 'as id')

    postDao.getStatus(id, handle)
        .then((status) => {
            console.log('Fetching post with', id, 'as id: Success')
            res.json(status)
        })
        .catch(() => {
            console.log('Fetching post with', id, 'as id: Failure')
            res.status(500).end()
        })
})

app.get('/api/status/:id/comments', (req, res) => {
    const id = req.params.id
    console.log('Fetching comments for post', id)

    postDao.getStatusComments(id)
        .then((comments) => {
            console.log('Fetching comments with for post:', id,' Success')
            res.json(comments)
        })
        .catch(() => {
            console.log('Fetching comments with for post:', id,' Failure')
            res.status(500).end()
        })
})

app.get('/api/user-profile', (req, res) => {
    const handle = req.query.handle
    console.log('Fetching user', handle, 'profile...')
    
    userDao.getUserProfile(handle)
        .then((user) => {
            console.log('Fetching user', handle, 'profile: Success')
            res.json(user)
        })
        .catch(() => {
            console.log('Fetching user', handle, 'profile: Failure')
            res.status(500).end()
        })
})

app.use('/', sessionRouter)
app.use('/', feedRouter)
app.use('/a', accessRouter)
app.use('/sessions', sessionRouter)
app.use('/register', registerRouter)
app.use('/new', newUploadRoute)

app.use(function (req, res, next) { next(createError(404)) })
app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

app.listen(port, () => console.log('Listening at: http://localhost:' + port))
module.exports = app