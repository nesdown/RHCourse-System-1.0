'use strict';

const Course = require('./index');

class CourseBuilder {
    constructor(name) {
        this.name = name;
    }

    add_students_amount(students_amount) {
        this.students_amount = students_amount;
        return this;
    }

    add_location(location) {
        this.location = location;
        return this;
    }

    add_partner(partner) {
        this.partner = partner;
        return this;
    }

    add_date(date) {
        this.date = date;
        return this;
    }

    add_price(price) {
        this.price = price;
        return this;
    }

    build() {
        return new Course(this);
    }
}
