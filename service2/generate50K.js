'use strict';

const DataClassBuilder = require('./dataClassBuilder.js');
const DataClass = require('./dataClass.js');
const Network = require('./network.js');

const network = new Network();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomClass = () => {
  let dataClass = new DataClassBuilder().add_class_name("Class" + (getRandomInt(100) + 1).toString())
                                        .add_location("Street " + (getRandomInt(100) + 1).toString())
                                        .add_students_amount(getRandomInt(20) + 10)
                                        .add_partner("KFC")
                                        .add_lesson_date("[2020-" + (getRandomInt(12) + 1).toString() + "-" + (getRandomInt(30) + 1).toString() + "]")
                                        .add_price(getRandomInt(500) + 500).build();
  return dataClass;
}

const record100K = async() => {
  for (let i = 0; i < 50000; ++i) {
    let randomClass = getRandomClass();
    await network.asyncPost('http://localhost:3002/classes', randomClass);
  }
}

record100K();