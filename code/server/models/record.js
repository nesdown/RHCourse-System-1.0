const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    shop: {
        type: String,
        required: true
    },
    servicerFio: { 
        type: String,
        required: true
    },
    servicerNumber: { 
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: true
    },
    registerDate: {
        type: Date,
        required: true
    },
    orderNumber: { 
        type: Number,
        required: true
    },
    customerFio: { 
        type: String,
        required: true
    },
    customerNumber: { 
        type: String,
        required: true
    },
    smartphoneModel: { 
        type: String,
        required: true
    },
    imei: { 
        type: String,
        required: true
    },
    complectation: { 
        type: String,
        required: true
    },
    smartphonePrice: { 
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    orderDate: {
        required: false,
        type: Date
    },
    compensation: {
        required: false,
        type: Number
    }
});

module.exports = mongoose.model('Record', recordSchema);