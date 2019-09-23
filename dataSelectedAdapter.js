const Pool = require('pg').Pool

let DataBase = function() {};
module.exports = DataBase;

DataBase.initDB = function() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'class_tickets',
    password: 'gsNiv9Dy',
    port: 5432
  })
}

// GET all classes query
DataBase.getDBClassesQuery = function(request, response) {
  const getClasses = (request, response) => {
    pool.query('SELECT * FROM classes ORDER BY id ASC', (error, results) => {
      if(error) {
        throw error
      }

      response.status(200).json(results.rows)
    })
  }
}

// GET single class by id
DataBase.getDBClassByIdQuery = function() {
  const getClassById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM classes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.row)
    })
  }
}

// POST a new class
DataBase.createDBClassQuery = function() {
  const createClass = (request, response) => {
    const {class_name, students_amount, location, partner, lesson_date, price} = request.body

    pool.query('INSERT INTO classes (class_name, students_amount, location, partner, lesson_date, price) VALUES ($1, $2, $3, $4, $5, $6)', [class_name, students_amount, location, partner, lesson_date, price], (error, results) => {
        if(error) {
          throw error
        }
        response.status(201).send(`Class added with ID: ${result.insertId}`)
    })
  }
}

// PUT updated data on classes
DataBase.updateDBClassQuery = function() {
  const updateClass = (request, response) => {
    const id = parseInt(request.params.id)
    const {class_name, students_amount, location, partner, lesson_date, price} = request.body

    pool.query('UPDATE classes SET class_name=$1, students_amount=$2, location=$3, partner=$4, lesson_date=$5, price=$6 WHERE id=$7', [class_name, students_amount, location, partner, lesson_date, price, id], (error, results) => {
      if (error) {
        throw error
      }

      response.status(200).send(`Class Modified with ID: ${id}`)
    })
  }
}

// DELETE class
DataBase.deleteDBClassQuery = function() {
  const deleteClass = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM classes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }

      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
}

// module.exports = {
//   getClasses,
//   getClassById,
//   createClass,
//   updateClass,
//   deleteClass
// }
