import { request } from 'https';

const passport = require('passport')

const initUser = (app) => {
    app.get('/', renderWelcome)
    app.get('/profile', passport.authenticationMiddleware(), renderProfile)
    app.post('/login', passport.authenticate('local', {
        successRedirect: './profile',
        failure: '/'
    }))
}

const renderWelcome = (req, res) => {
    res.render('user/welcome')
}

const renderProfile = (req, res) => {
     res.render('user/profile', {
         username: req.user.username
     })
}

module.exports = initUser

