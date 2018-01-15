const express = require('express')
const app = express()
const port = 3000


//
// ─── EXAMPLE OF THE MIDDLEWARE PIPELINE PATTERN ─────────────────────────────────
//

app.use((request, response, next) => {
    console.log(request.headers)
    next() // Calls next function in the middleware pipeline
})

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
})

// ────────────────────────────────────────────────────────────────────────────────
// Middleware can append and modify properties of the request and response
// as you move down the pipeline.
app.get('/', (request, response) => {
    response.send(`Hello Node JS, Your Roll Is: ${request.chance}`)
})


app.listen(port, (err) => {
    if (err) {
        console.log("Something went wrong", err)
    }
    console.log(`Server is listening on port ${3000}`)
})
