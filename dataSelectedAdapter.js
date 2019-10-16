const Pool = require('pg').Pool;
const DataClassBuilder = require('./dataClassBuilder');
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
    })
  }

// GET all classes query
  this.getDBClassesQuery = (request, response) => {
    this.pool.query('SELECT * FROM classes ORDER BY id ASC', (error, results) => {
      if(error) {
        throw error
      }
      console.log(results);
      response.status(200).json(results.rows)
    })
  }

// GET single class by id
  this.getDBClassByIdQuery = (request, response) => {
    console.log(request.params);
    const id = parseInt(request.params.id)
    console.log(id);
    this.pool.query('SELECT * FROM classes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results);
      response.status(200).json(results.rows);
    })
  }

// POST a new class
  this.createDBClassQuery = (request, response) => {
    console.log(request.url, request.body);
    const {id, class_name, students_amount, location, partner, lesson_date, price} = request.body
    this.pool.query('INSERT INTO classes (id, class_name, students_amount, location, partner, lesson_date, price) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, class_name, students_amount, location, partner, lesson_date, price], (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(`Class added with ID: ${id}`)
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

  this.getFilteredClasses = (request, response) => {
    const class_name = request.params.class_name;
    const st_amount = parseInt(request.params.st_amount);
    const pr = parseInt(request.params.pr);
    let classNameIsObj = new classNameIs(class_name);
    let groupIsBiggerThanObj = new groupIsBiggerThan(st_amount);
    let priceIsLowerThanObj = new priceIsLowerThan(pr);
    this.pool.query('SELECT * FROM classes ORDER BY id ASC', (error, results) => {
      if (error) throw error;
      responseRows = [];
      results.rows.forEach((row, index) => {
        classNameIsObj
        .and(groupIsBiggerThanObj)
        .and(priceIsLowerThanObj)
        .isSatisfiedBy(row, (err, satisfies) => {
          if (err) throw err;
          if (satisfies) responseRows.push(row);
        });
      });
      console.log(class_name, st_amount, pr);
      console.log(responseRows);
      response.status(200).json(responseRows);
    });
  }

  return function() { return single; };
})();

module.exports = DataBase;
