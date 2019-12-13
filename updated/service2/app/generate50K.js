'use strict';

const request = require('request');
const Course = require('./course/index.js');

const asyncPost = async(data) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: 'http://localhost:3002/course/new',
            form: data
        }, (err, res, body) => {
            resolve(body);
        });
    });
}

const f = async() => {
    for (let i = 0; i < 50000; ++i) {
        let course = new Course();
        let data = {
            name: course.name,
            students_amount: course.students_amount,
            location: course.location,
            partner: course.partner,
            date: course.date,
            price: course.price
        };
        await asyncPost(data);
    }
    console.log('+ 50K');
}

f();
