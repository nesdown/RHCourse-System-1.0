'use strict';

const dataClass = require('./dataClass');

class DataClassBuilder {
  constructor() {}

  add_id(idInput) {
    this.id = idInput;
    return this;
  }

  add_class_name(class_nameInput) {
    this.class_name = class_nameInput;
    return this;
  }

  add_students_amount(students_amountInput) {
    this.students_amount = students_amountInput;
    return this;
  }

  add_location(locationInput) {
    this.location = locationInput;
    return this;
  }

  add_partner(partnerInput) {
    this.partner = partnerInput;
    return this;
  }

  add_lesson_date(lesson_dateInput) {
    this.lesson_date = lesson_dateInput;
    return this;
  }

  add_price(priceInput) {
    this.price = priceInput;
    return this;
  }

  build() {
    return new DataClass(this);
  }
}

module.exports = DataClassBuilder;
