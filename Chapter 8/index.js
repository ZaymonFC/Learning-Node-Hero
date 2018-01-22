const app = require('./app/index')
const port = process.env.PORT || 3000

app.listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log(`Server is Listening on port: ${port}`)
})