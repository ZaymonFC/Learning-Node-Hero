const http = require('http')
const port = 3000

// Function invoked every time a request lands
const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.JS Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong!')
  }
  console.log(`Server is listening on: ${port}`)
})