const Record = require('../models/record');
const Dropdown = require('../models/dropdown');
const Formula = require('../models/formula');
const User = require('../models/user');
const InfoField = require('../models/info_field');
const moment = require('moment');
const formidable = require('formidable');


exports.postRecord = (req, res, next) => {
    // creates new record
    let shop = req.body.shop,
        servicerFio = req.body.servicerFio,
        servicerNumber = req.body.servicerNumber,
        date = req.body.date,
        registerDate = req.body.registerDate,
        orderNumber = req.body.orderNumber,
        customerFio = req.body.customerFio,
        customerNumber = req.body.customerNumber,
        smartphoneModel = req.body.smartphoneModel,
        imei = req.body.imei,
        complectation = req.body.complectation,
        smartphonePrice = req.body.smartphonePrice,
        status = req.body.status;
    
    let record = new Record({
        shop: shop,
        servicerFio: servicerFio,
        servicerNumber: servicerNumber,
        date: date,
        registerDate: registerDate,
        orderNumber: orderNumber,
        customerFio: customerFio,
        customerNumber: customerNumber,
        smartphoneModel: smartphoneModel,
        imei: imei,
        complectation: complectation,
        smartphonePrice: smartphonePrice,
        status: status
    });

    record
        .save()
        .then((record) => res.send('Record added successfully'))
        .catch(e => console.log(e));
}

exports.getRecords = (req, res, next) => {
    // gets list of records
    Record.find()
        .then(records => res.send(records))
        .catch(e => console.log(e));
};

exports.getRecordById = (req, res , next) => {
    // gets recors by its id
    Record.findById(req.params.recordId)
        .then(record => res.send(record));
}

exports.editRecord = (req, res, next) => {
    // updates record with provided values
    let updatedShop = req.body.shop,
        updatedServicerFio = req.body.servicerFio,
        updatedServicerNumber = req.body.servicerNumber,
        updatedDate = req.body.date,
        updatedRegisterDate = req.body.registerDate,
        updatedOrderNumber = req.body.orderNumber,
        updatedCustomerFio = req.body.customerFio,
        updatedCustomerNumber = req.body.customerNumber,
        updatedSmartphoneModel = req.body.smartphoneModel,
        updatedImei = req.body.imei,
        updatedComplectation = req.body.complectation,
        updatedSmartphonePrice = req.body.smartphonePrice,
        updatedStatus = req.body.status,
        id = req.params.recordId;

    Record.findById(id)
    .then(record => {
            if (req.body.orderDate) {
                record.orderDate = req.body.orderDate;
            }
            if (req.body.compensation) {
                record.compensation = req.body.compensation;
            }
            record.shop = updatedShop;
            record.servicerFio = updatedServicerFio;
            record.servicerNumber = updatedServicerNumber;
            record.date = updatedDate;
            record.registerDate = updatedRegisterDate;
            record.orderNumber = updatedOrderNumber;
            record.customerFio = updatedCustomerFio;
            record.customerNumber = updatedCustomerNumber;
            record.smartphoneModel = updatedSmartphoneModel;
            record.imei = updatedImei;
            record.complectation = updatedComplectation;
            record.smartphonePrice = updatedSmartphonePrice;
            record.status = updatedStatus;
            
            return record.save();
        })
        .then(() => res.send('Record edited successfully'))
        .catch(e => console.log(e));    
}

exports.sortRecords = (req, res, next) => {
    // sort records by provided filter requirements
    let valueToSort = {};
    if (req.body.smartphoneModel && req.body.smartphoneModel != 'Всі') valueToSort['smartphoneModel'] = req.body.smartphoneModel;
    if (req.body.status && req.body.status != 'Всі') valueToSort['status'] = req.body.status;
    
    if (req.body.registerFrom !== 'Invalid data' && req.body.registerTo !== 'Invalid data') {
        valueToSort['registerDate'] = {
            '$gte': req.body.registerFrom,
            '$lt': moment(req.body.registerTo).add(1, 'days')
        }
    }

    if (req.body.purchaseFrom !== 'Invalid data' && req.body.purchaseTo !== 'Invalid data') {
        valueToSort['date'] = {
            '$gte': req.body.purchaseFrom,
            '$lt': moment(req.body.purchaseTo).add(1, 'days')
        }
    }

    if (req.body.numberValue !== '') {
        let query = `{"$where":"function() {return this.customerNumber.slice(0, ${req.body.numberValue.length}) === '${req.body.numberValue}';}"}`;
        valueToSort = {
            ...valueToSort,
            ...JSON.parse(query)
        }
    }

    Record
        .find(valueToSort)
        .then(records => res.send(records))
        .catch(err => console.log(err));
}

exports.sortRecordsTrade = (req, res, next) => {
    // sort records by provided filter requirements

    let valueToSort = {};
    if (req.body.smartphoneModel && req.body.smartphoneModel != 'Всі') valueToSort['smartphoneModel'] = req.body.smartphoneModel;
    if (req.body.status) valueToSort['status'] = req.body.status;
    if (req.body.compensation && req.body.compensation != 'Всі') valueToSort['compensation'] = req.body.compensation;

    if (req.body.tradePurchaseFrom !== 'Invalid data' && req.body.tradePurchaseTo !== 'Invalid data') {
        valueToSort['date'] = {
            '$gte': req.body.tradePurchaseFrom,
            '$lt': moment(req.body.tradePurchaseTo).add(1, 'days')
        }
    }

    if (req.body.tradePeriodFrom !== 'Invalid data' && req.body.tradePeriodTo !== 'Invalid data') {
        valueToSort['orderDate'] = {
            '$gte': req.body.tradePeriodFrom,
            '$lt': moment(req.body.tradePeriodTo).add(1, 'days')
        }
    }
    
    if (req.body.numberValue !== '') {
        let query = `{"$where":"function() {return this.customerNumber.slice(0, ${req.body.numberValue.length}) === '${req.body.numberValue}';}"}`;
        valueToSort = {
            ...valueToSort,
            ...JSON.parse(query)
        }
    }

    Record
        .find(valueToSort)
        .then(records => res.send(records))
        .catch(err => console.log(err));
}

exports.deleteRecord = (req, res, next) => {
    // deletes record
    Record.findByIdAndDelete(req.params.recordId)
        .then(() => res.send('Record removed successfully'))
        .catch(e => console.log(e));
}

exports.uniqueImei = (req, res, next) => {
    // checks if the imei is unique in DB
    Record
        .countDocuments({imei: req.params.imei}, (err, count) => {
            if (err) console.log(err);

            if (count > 0) res.send(false);
            else res.send(true);
        })
        
}

exports.findByImei = (req, res, next) => {
    // finds by imei number
    Record
        .find({imei: req.params.imei})
        .then(record => res.send(record))
        .catch(err => console.log(err));
}

exports.postDropdown = (req, res, next) => {
    // creates dropdown
    let ru = req.body.ru,
        ua = req.body.ua,
        name = req.body.name;
    
    let dropdown = new Dropdown({
        ru: ru,
        ua: ua,
        name: name
    });

    dropdown
        .save()
        .then(() => res.send('Dropdown created successfully'))
        .catch(err => console.log(err));
}

exports.editDropdown = (req, res, next) => {
    // updates dropdown with provided values
    let newRu = req.body.ru,
        newUa = req.body.ua,
        newName = req.body.name;
    
    Dropdown
        .findById(req.params.id)
        .then(dropdown => {
            dropdown.ru = newRu;
            dropdown.ua = newUa;
            dropdown.name = newName;
            return dropdown.save();
        })
        .then((dropdown) => res.send(dropdown))
        .catch(err => console.log(err));
}

exports.getDropdowns = (req, res, next) => {
    
    Dropdown
        .find()
        .then(dropdowns => res.send(dropdowns))
        .catch(err => console.log(err));
        
}

exports.getDropdown = (req, res, next) => {
    Dropdown
        .findById(req.params.id)
        .then(dropdown => res.send(dropdown))
}

exports.updateFormula = (req, res, next) => {
    let updHalfyear = req.body.halfyear;
    let updFullyear = req.body.fullyear;

    Formula
        .findById(req.params.id)
        .then(formula => {
            formula.halfyear = updHalfyear;
            formula.fullyear = updFullyear;

            return formula.save();
        })
        .then(result => res.send(`formula was updated with values ${result.halfyear} and ${result.fullyear}`))
        .catch(err => console.log(err));
}

exports.getFormula = (req, res, next) => {
    Formula
        .findById(req.params.id)
        .then(formula => res.send(formula))
        .catch(err => console.log(err));
}


exports.deleteUser = (req, res, next) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(() => res.send('User deleted successfully'))
        .catch(err => console.log(err));
};

exports.getUsers = (req, res, next) => {
    User
        .find()
        .then(users => res.send(users))
        .catch(err => console.log(err));
}

exports.updateUser = (req, res, next) => {
    let newLogin = req.body.login,
        newPassword = req.body.password,
        newIsAdmin = req.body.isAdmin;
    
    User
        .findById(req.params.id)
        .then(user => {
            user.login = newLogin;
            user.password = newPassword;
            user.isAdmin = newIsAdmin;
            return user.save();
        })
        .then(user => res.send(`user ${user._id} was updated`))
        .catch(err => console.log(err));
}

exports.updateInfoField = (req, res, next) => {
    const newRu = req.body.ru,
          newUa = req.body.ua;
        
    InfoField
        .findById(req.params.id)
        .then(infoField => {
            infoField.ru = newRu;
            infoField.ua = newUa;
            return infoField.save();
        })
        .then(result => res.send('InfoField ' + result._id + ' was updated successfully'))
        .catch(err => console.log(err));
}

exports.getInfoFields = (req, res, next) => {
    InfoField
        .find()
        .then(infofields => res.send(infofields))
        .catch(err => console.log(err));
}

exports.getInfoField = (req, res, next) => {
    InfoField
        .findById(req.params.id)
        .then(infofield => res.send(infofield))
        .catch(err => console.log(err));
}