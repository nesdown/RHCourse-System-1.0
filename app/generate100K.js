'use strict';

const request = require('request');
const Course = require('./course/index.js');

const f = async() => {
    for (let i = 0; i < 5000; ++i) {
        let course = new Course();
        let data = {
            name: course.name,
            students_amount: course.students_amount,
            location: course.location,
            partner: course.partner,
            date: course.date,
            price: course.price
        };
        request.post({
            url: 'http://localhost:3000/course/new',
            form: data
        });
    }
}

//const interval = setInterval(f, 30000);
