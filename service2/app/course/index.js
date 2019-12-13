'use strict';

const properties = require('./properties');

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const DEFAULT_PROPERTIES = {
    get name() {
        let courseName = "";
        properties.forEach(property => {
            if (property.name === "name") courseName = property.values[getRandomInt(5)];
        });
        return courseName;
    },
    get students_amount() {
        return getRandomInt(10) + 5;
    },
    get partner() {
        let coursePartner = "";
        properties.forEach(property => {
            if (property.name === "partner") coursePartner = property.values[getRandomInt(5)];
        });
        return coursePartner;
    },
    get location() {
        let courseLocation = "";
        properties.forEach(property => {
            if (property.name === "location") courseLocation = property.values[getRandomInt(5)];
        });
        return courseLocation;
    },
    get price() {
        return getRandomInt(1000) + 500;
    },
    get date() {
        return new Date(Date.now() + getRandomInt(1000000));
    }
};

class Course {
    constructor(builder = { name: undefined }) {
        this.name = builder.name || DEFAULT_PROPERTIES.name;
        this.students_amount = builder.students_amount || DEFAULT_PROPERTIES.students_amount;
        this.location = builder.location || DEFAULT_PROPERTIES.location;
        this.price = builder.price || DEFAULT_PROPERTIES.price;
        this.date = builder.date || DEFAULT_PROPERTIES.date;
        this.partner = builder.partner || DEFAULT_PROPERTIES.partner;
    }
}

module.exports = Course;
