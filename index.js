const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// const db = require('./queries')
const DataBase = require('./dataSelectedAdapter');

const db = new DataBase();
const db2 = new DataBase();
console.log(db === db2, 'true is for singleton');

db.initDB();
// Set up the server usage, with json parsing
// Basic Express server usage
app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
}));

// Basic request data sending - tell a route to look for GET request on / and send answer
app.get('/', (request, response) => {
  response.json({
    info: 'NodeJS, Express and PostgresAPI'
  })
})

// Basic server endpoints
app.get('/classes', db.getDBClassesQuery);
app.get('/class/:id', db.getDBClassByIdQuery);
app.post('/classes', db.createDBClassQuery);
app.put('/classes/:id', db.updateDBClassQuery);
app.delete('/classes/:id', db.deleteDBClassQuery);
app.get('/classes/:class_name/:st_amount/:pr', db.getFilteredClasses);
app.post('/provider', db.addProvider);
app.get('/classes/:page', db.getDBClassesQuery);

// Send data by listening on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
