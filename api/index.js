'use strict'

require('console')
require("node:util");

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
const forgotRouter = require('./routes/forgot')

const newUploadRoute = require('./routes/new-upload')
const feedRouter = require('./routes/feed')

const userDao = require('./models/user-dao')
const statusDao = require('./models/status-dao')

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

app.get('/api/users/:handle/profile', async (req, res) => {
    const { handle } = req.params;
    const logPrefix = `Fetching profile for user ${handle}`;

    console.log(`${logPrefix}...`);
    try {
        const user = await userDao.getUserProfile(handle);
        console.log(`${logPrefix}: Success`);
        res.json(user);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.get('/api/users/:handle/status', async (req, res) => {
    const { handle } = req.params;
    const { statusType, orderByLikes, loggedUser } = req.query;
    const orderLikes = orderByLikes === 'true';
    const logPrefix = `Fetching statuses by user ${handle}`;

    console.log(`${logPrefix}...`);
    try {
        const statuses = await statusDao.getUserStatuses(handle, statusType, orderLikes, loggedUser);
        console.log(`${logPrefix}: Success`);
        res.json(statuses);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.get('/api/users/:handle/likes', async (req, res) => {
    const { handle } = req.params;
    const logPrefix = `Fetching liked statuses by user ${handle}`;

    console.log(`${logPrefix}...`);
    try {
        const statuses = await statusDao.getUserLikes(handle);
        console.log(`${logPrefix}: Success`);
        res.json(statuses);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.get('/api/users/search', async (req, res) => {
    const { q } = req.query;
    const logPrefix = `Searching users with query "${q}"`;

    console.log(`${logPrefix}...`);
    try {
        const users = await userDao.getUsersByQuery(q);
        console.log(`${logPrefix}: Success (${users.length} results)`);
        res.json(users);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.get('/api/status', async (req, res) => {
    const { orderByLikes, loggedUser } = req.query;
    const orderLikes = orderByLikes === 'true';
    const logPrefix = 'Fetching all statuses';

    console.log(`${logPrefix}...`);
    try {
        const statuses = await statusDao.getAllStatuses(orderLikes, loggedUser);
        console.log(`${logPrefix}: Success`);
        res.json(statuses);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.get('/api/status/search', async (req, res) => {
    const { query, loggedUser } = req.query;
    const logPrefix = `Fetching statuses with search query ${query}`;

    console.log(`${logPrefix}...`);
    try {
        const statuses = await statusDao.getStatusesByQuery(query, loggedUser);
        console.log(`${logPrefix}: Success`);
        res.json(statuses);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
})

app.get('/api/status/:id', async (req, res) => {
    const { id } = req.params;
    const { handle, loggedUser } = req.query;
    const logPrefix = `Fetching status with ID ${id}`;

    console.log(`${logPrefix}...`);
    try {
        const status = await statusDao.getStatus(id, handle, loggedUser);
        console.log(`${logPrefix}: Success`);
        res.json(status);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.delete('/api/status/:id', async (req, res) => {
    const { id } = req.params;
    const logPrefix = `Deleting status with ID ${id}`;

    console.log(`${logPrefix}...`);
    try {
        const status = await statusDao.deleteStatus(id);
        console.log(`${logPrefix}: Success`);
        res.json(status);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
})

app.get('/api/status/:id/like', async (req, res) => {
    const { id } = req.params;
    const { handle } = req.query
    const logPrefix = `Toggling like for ${handle} with ID ${id}`

    console.log(`${logPrefix}...`);
    try {
        await statusDao.toggleLike(id, handle);
        console.log(`${logPrefix}: Success`);
        res.sendStatus(204);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
})

app.get('/api/status/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { loggedUser } = req.query;
    const logPrefix = `Fetching comments for status ${id}`;

    console.log(`${logPrefix}...`);
    try {
        const comments = await statusDao.getStatusComments(id, loggedUser);
        console.log(`${logPrefix}: Success`);
        res.json(comments);
    } catch (error) {
        console.error(`${logPrefix}: Failure`, error);
        res.status(500).end();
    }
});

app.use('/', sessionRouter)
app.use('/', feedRouter)
app.use('/a', accessRouter)
app.use('/sessions', sessionRouter)
app.use('/register', registerRouter)
app.use('/forgot', forgotRouter)
app.use('/new', newUploadRoute)

app.use(function (req, res, next) { next(createError(404)) })
app.use(function (err, req, res, _) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

app.listen(port, () => console.log('Listening at: http://localhost:' + port))
module.exports = app