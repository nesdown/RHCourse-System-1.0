'use strict';

class DataClass {
  constructor(builder) {
    this.id = builder.id;
    this.class_name = builder.class_name;
    this.students_amount = builder.students_amount;
    this.location = builder.location;
    this.partner = builder.partner;
    this.lesson_date = builder.lesson_date;
    this.price = builder.price;
  }
}

module.exports = DataClass;
