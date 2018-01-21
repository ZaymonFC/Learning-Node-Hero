const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

// Generate Passwords
const saltRounds = 10
const myPlainTextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlainTextPassword, salt)

const user = {
    username: 'test-user',
    passwordHash,
    id: 1
}

const findUser = (username, callback) => {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

passport.serializeUser((user, callback) => {
    callback(null, user.username)
})

passport.deserializeUser((username, callback) => {
    findUser(username, callback)
})

const initPassport = () => {
    passport.use(new LocalStrategy (
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err)
                }
                // User not found
                if (!user) {
                    console.log('User Not Found')
                    return done(null, false)
                }

                // Always used hashed pw and fixed time comparrison
                bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                    if (err) return done(err)
                    if (!isValid) return done(null, false)
                    return done(null, user)
                })
            })
        }
    ))
    passport.AuthenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport