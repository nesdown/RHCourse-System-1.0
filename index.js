const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

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

// Basic server endpoints
app.get('/classes', db.getClasses);
app.get('/classes/:id', db.getClassById)
app.post('/classes', db.createClass)
app.put('/classes/:id', db.updateClass)
app.delete('/classes/:id', db.deleteClass)

// Send data by listening on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
