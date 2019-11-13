'use strict';

const request = require('request');
const DataClassBuilder = require('./dataClassBuilder');

let dataClass = new DataClassBuilder().add_id(10)
                                      .add_class_name("Course1")
                                      .add_location("STR2")
                                      .add_students_amount(6)
                                      .add_partner("KFC")
                                      .add_lesson_date("[2039-09-07]")
                                      .add_price(10).build();
console.log(dataClass.toString());

request.post({
  url: "http://127.0.0.1:3000/",
  form: {
    id: dataClass.id,
    class_name: dataClass.class_name,
    students_amount: dataClass.students_amount,
    location: dataClass.location,
    partner: dataClass.partner,
    lesson_date: dataClass.lesson_date,
    price: dataClass.price
  }
}, (err, res, body) => {
  //if (err) throw err;
  //console.log(res.statusCode);
  console.log(body);
});
/*
dataClass.class_name = 'Not ML Course';

request.put({
  url: "http://127.0.0.1:3000/classes/8",
  form: {
    class_name: dataClass.class_name,
    students_amount: dataClass.students_amount,
    location: dataClass.location,
    partner: dataClass.partner,
    lesson_date: dataClass.lesson_date,
    price: dataClass.price
  }
}, (err, res, body) => {
  console.log(body);
});*/
/*
request.delete({
  url: "http://127.0.0.1:3000/classes/5"
}, (err, res, body) => {
  console.log(body);
});
request.delete({
  url: "http://127.0.0.1:3000/classes/7"
}, (err, res, body) => {
  console.log(body);
});

request.delete({
  url: "http://127.0.0.1:3000/classes/6"
}, (err, res, body) => {
  console.log(body);
});*/