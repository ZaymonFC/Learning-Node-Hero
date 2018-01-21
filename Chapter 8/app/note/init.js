const passport = require('passport')

const initUser = (app) => {
    app.get('./notes/:id',
    passport.authenticationMiddleware(),
    (request, response) => {
        res.render('./note/overview', {
            id: req.params.id
        })
    })
}

module.exports = initUser