'use strict';

const app = require('../app/index');
const dotenv = require('dotenv');
const Database = require('../app/database/index');

const db = new Database();

db.initDB();
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
