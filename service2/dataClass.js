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

  toString() {/*
    let str = '';
    for (let key in this) {
      str += `&${key}=` + this[key];
    }
    str = str.slice(1, str.length);
    return str;*/
    let str = {};
    for (let key in this) {
      str[key] = this[key];
    }
    return str;
  }
}

module.exports = DataClass;
