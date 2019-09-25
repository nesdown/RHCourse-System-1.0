"use strict";

/*
 * Specification base class
 */
let Specification = {
  and: function(spec) {
    return new AndSpecification(this, spec);
  },
  or: function(spec) {
    return new OrSpecification(this, spec);
  },
  not: function(spec) {
    return new NotSpecification(spec);
  }
}


/*
 * And specification class
 */
function AndSpecification(left, right) {
  this.leftSpec = left;
  this.rightSpec = right;
}
AndSpecification.prototype = Object.create(Specification);
AndSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  var self = this;
  if (self.leftSpec && self.leftSpec.isSatisfiedBy) {
    self.leftSpec.isSatisfiedBy(obj, function(err, satisfiesLeft) {
      if (self.rightSpec && self.rightSpec.isSatisfiedBy) {
        self.rightSpec.isSatisfiedBy(obj, function(err, satisfiedRight) {
          return cb(null, satisfiesLeft && satisfiedRight);
        });
      } else {
        return cb(null, false);
      }
    });
  } else {
    return cb(null, false);
  }
};


/*
 * Or specification class
 */
function OrSpecification(left, right) {
  this.leftSpec = left;
  this.rightSpec = right;
}
OrSpecification.prototype = Object.create(Specification);
OrSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  var self = this;
  if (self.leftSpec && self.leftSpec.isSatisfiedBy) {
    self.leftSpec.isSatisfiedBy(obj, function(err, satisfiesLeft) {
      if (self.rightSpec && self.rightSpec.isSatisfiedBy) {
        self.rightSpec.isSatisfiedBy(obj, function(err, satisfiedRight) {
          return cb(null, satisfiesLeft || satisfiedRight);
        });
      } else {
        return cb(null, false);
      }
    });
  } else {
    return cb(null, false);
  }
};


/*
 * Not specification
 */
function NotSpecification(spec) {
  this.spec = spec;
}
NotSpecification.prototype = Object.create(Specification);
NotSpecification.prototype.isSatisfiedBy = function(obj, cb) {
  if (!this.spec || !this.spec.isSatisfiedBy) {
    return false;
  }
  this.spec.isSatisfiedBy(obj, function(err, satisfies) {
    cb(err, !satisfies);
  });
};

function classNameIs(class_name) {
  this.class_name = class_name;
}
classNameIs.prototype = Object.create(Specification);
classNameIs.prototype.isSatisfiedBy = function(dataClass, cb) {
  console.log(dataClass.class_name, this.class_name);
  return cb(null, dataClass.class_name === this.class_name);
};

function priceIsLowerThan(price) {
  this.price = price;
}
priceIsLowerThan.prototype = Object.create(Specification);
priceIsLowerThan.prototype.isSatisfiedBy = function(dataClass, cb) {
  console.log(dataClass.price, this.price);
  return cb(null, dataClass.price < this.price);
};

function groupIsBiggerThan(students_amount) {
  this.students_amount = students_amount;
}
groupIsBiggerThan.prototype = Object.create(Specification);
groupIsBiggerThan.prototype.isSatisfiedBy = function(dataClass, cb) {
  console.log(dataClass.students_amount, this.students_amount);
  return cb(null, dataClass.students_amount > this.students_amount);
};

module.exports = { Specification, classNameIs, priceIsLowerThan, groupIsBiggerThan };