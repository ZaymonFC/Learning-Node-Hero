const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

//
// ─── SETUP THE DATABASE CONNECTION ──────────────────────────────────────────────
//
const { Client } = require('pg')


const client = new Client ({
    host: 'localhost',
    port: 5432,
    database: 'node_hero',
    user: 'postgres',
    password: 'postgrespassword'
})
client.connect()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//
// ─── SETUP THE HANDLEBARS RENDERING ENGINE ──────────────────────────────────────
//
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
    response.render('home', {
        name: 'Zaymon'
    })
})

app.post('/users', (req, res, next) => {
    const user = req.body

    const query = {
        text: 'INSERT INTO users (name, age) VALUES ($1, $2)',
        values: [user.name, user.age]
    }

    client.query(query)
    .then(res.sendStatus(200))
    .catch((error) => {
        console.log("Error inserting into users: ", error.stack)
    })

})

app.get('/users', (req, res, next) => {

    client.query('select name, age from users')
    .then((data) => {
        console.log("Retrieved data: ", data.rows)
        res.json(data.rows)
    })
    .catch(e => console.log("Error: ", e))

})

app.listen(port, (err) => {
    if (err) {
        console.log("Something went wrong")
    }

    console.log(`Listening on port: ${port}`);
    
})