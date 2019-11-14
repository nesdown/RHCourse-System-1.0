const Pool = require('pg').Pool;
const DataClassBuilder = require('./dataClassBuilder');
const Network = require('./network.js');
const { classNameIs, priceIsLowerThan, groupIsBiggerThan } = require('./Specification');

const DataBase = new (function() {
  const single = this;

  this.initDB = () => {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'class_tickets',
      password: 'pass',
      port: 5432
    });
  }

  this.getTable = async(tableName) => {
    return new Promise((resolve, reject) => {
      this.pool.query(`SELECT * FROM ${tableName} ORDER BY id ASC`, (error, results) => {
        if (error) reject(error);
        resolve(results.rows);
      });
    });
  }

  this.getAllProvidersClasses = async() => {
    const network = new Network();
    let allClasses = [];
    let providers = await this.getTable('providers');
    let currClasses = await this.getTable('classes');
    currClasses.forEach((item) => {
      let newItem = {};
      for (let key in item) {
        newItem[key] = item[key];
      }
      newItem.provider = 'current';
      allClasses.push(newItem);
    });
    for (let providerRow of providers) {
      let providerClasses = await network.asyncRequest(providerRow.url);
      providerClasses = JSON.parse(providerClasses);
      for (let item of providerClasses) {
        let newItem = {};
        for (let key in item) {
          newItem[key] = item[key];
        }
        newItem.provider = providerRow.name;
        allClasses.push(newItem);
      }
    }
    return allClasses;
  }

// GET all classes query
  this.getDBClassesQuery = async(request, response) => {
    const page = request.params.page;
    const allClasses = await this.getAllProvidersClasses();
    let i = 1000 * (page - 1);
    let responseClasses = [];
    while (i < 1000 * page) {
      responseClasses.push(allClasses[i++]);
    }
    console.log('GET request');
    response.status(200).json(responseClasses);
  }

// GET single class by id
  this.getDBClassByIdQuery = async(request, response) => {
    const id = parseInt(request.params.id)
    console.log('GET request by id', id);
    const allClasses = await this.getAllProvidersClasses();
    response.status(200).json(allClasses[id - 1]);
  }

// POST a new class
  this.createDBClassQuery = (request, response) => {
    const {class_name, students_amount, location, partner, lesson_date, price} = request.body;
    this.pool.query('INSERT INTO classes (class_name, students_amount, location, partner, lesson_date, price) VALUES ($1, $2, $3, $4, $5, $6)', [class_name, students_amount, location, partner, lesson_date, price], (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(results);
    })
  }

// PUT updated data on classes
  this.updateDBClassQuery = (request, response) => {
    const id = parseInt(request.params.id)
    const {class_name, students_amount, location, partner, lesson_date, price} = request.body
    this.pool.query('UPDATE classes SET class_name=$1, students_amount=$2, location=$3, partner=$4, lesson_date=$5, price=$6 WHERE id=$7', [class_name, students_amount, location, partner, lesson_date, price, id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Class Modified with ID: ${id}`)
    })
  }

// DELETE class
  this.deleteDBClassQuery = (request, response) => {
    const id = parseInt(request.params.id)
    this.pool.query('DELETE FROM classes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  this.getFilteredClasses = async(request, response) => {
    const allClasses = await this.getAllProvidersClasses();
    const class_name = request.params.class_name;
    const st_amount = parseInt(request.params.st_amount);
    const pr = parseInt(request.params.pr);
    let classNameIsObj = new classNameIs(class_name);
    let groupIsBiggerThanObj = new groupIsBiggerThan(st_amount);
    let priceIsLowerThanObj = new priceIsLowerThan(pr);
    responseRows = [];
    allClasses.forEach((row, index) => {
      classNameIsObj
      .and(groupIsBiggerThanObj)
      .and(priceIsLowerThanObj)
      .isSatisfiedBy(row, (err, satisfies) => {
        if (err) throw err;
        if (satisfies) responseRows.push(row);
      });
    });
    console.log('GET request by filters');
    response.status(200).json(responseRows);
  }

  this.addProvider = (request, response) => {
    let { name, url } = request.body;
    this.pool.query('INSERT INTO providers (name, url) VALUES ($1, $2)', [name, url], (error, results) => {
      if (error) throw error;
      response.status(200).send('OK' + results);
    });
  }

  return function() { return single; };
})();

module.exports = DataBase;
