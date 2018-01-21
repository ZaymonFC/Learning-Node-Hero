const bodyParser = require('body-parser')
const RedisStore = require('connect-redis')
const express    = require('express')
const exphbs     = require('express-handlebars')
const session    = require('express-session')
const passport   = require('passport')
const path       = require('path')

const config = require('../config')
const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))

require('./authentication').init(app)

app.use(session({
    store: new RedisStore({
        url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views')
