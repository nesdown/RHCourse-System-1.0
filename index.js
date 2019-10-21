const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// const db = require('./queries')
const DataBase = require('./dataSelectedAdapter');
const HandlerBuilder = require('./handlerBuilder');
const ServiceHandler = require('./serviceHandler');
const db = new DataBase();
const db2 = new DataBase();
console.log(db === db2, 'true is for singleton');

const handlerBuilder = new HandlerBuilder();
const serviceHandler = new ServiceHandler();

const data = serviceHandler.fetchData();
serviceHandler.outputFormatter(data);

db.initDB();
// Set up the server usage, with json parsing
// Basic Express server usage
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
app.get('/classes/:id', db.getDBClassByIdQuery);
app.post('/classes', db.createDBClassQuery);
app.put('/classes/:id', db.updateDBClassQuery);
app.delete('/classes/:id', db.deleteDBClassQuery);
app.get('/classes/:class_name/:st_amount/:pr', db.getFilteredClasses);

// Send data by listening on port
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
