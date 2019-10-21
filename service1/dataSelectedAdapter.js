const Pool = require('pg').Pool;
const ftp = require('basic-ftp');
const DataClassBuilder = require('./dataClassBuilder');
const fs = require('fs');
const { classNameIs, priceIsLowerThan, groupIsBiggerThan } = require('./Specification');

const DataBase = new (function() {
  const single = this;

  this.initDB = () => {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'service1',
      password: 'pass',
      port: 5432
    });
    this.pool.query('SELECT * FROM classes ORDER BY id ASC', async(error, results) => {
      if (error) throw error;
      fs.writeFileSync('temp.txt', JSON.stringify(results.rows));
      const client = new ftp.Client();
      client.ftp.verbose = true;
      await client.access({
        host: "zdigital.ftp.tools",
        user: "zdigital_bg",
        password: "3ZrOJeM86n5i",
        secure: true
      });
      await client.upload(fs.createReadStream('temp.txt'), '/z-digital.net/rhcrm/first-data.html');
    });
    
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
    const class_name = request.params.query;
    let classNameIsObj = new classNameIs(class_name);
    this.pool.query('SELECT * FROM classes ORDER BY id ASC', (error, results) => {
      if (error) throw error;
      responseRows = [];
      results.rows.forEach((row, index) => {
        classNameIsObj
        .isSatisfiedBy(row, (err, satisfies) => {
          if (err) throw err;
          if (satisfies) responseRows.push(row);
        });
      });
      console.log(class_name);
      console.log(responseRows);
      response.status(200).json(responseRows);
    });
  }

  return function() { return single; };
})();

module.exports = DataBase;
