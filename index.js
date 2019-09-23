const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Set up the server usage, with json parsing
// Basic Express server usage
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Basic request data sending - tell a route to look for GET request on / and send answer
app.get('/', (request, response) => {
  response.json({
    info: 'NodeJS, Express and PostgresAPI'
  })
})

// Send data by listening on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
