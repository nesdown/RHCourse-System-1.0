'use strict';

const express = require('express');
const courseRouter = require('./api/course');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
}));

//Routers
app.use('/course', courseRouter);

module.exports = app;
