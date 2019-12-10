const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dropdownSchema = new Schema({
    ru: [{
        type: String
    }],
    ua: [{
        type: String,
        required: true
    }],
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Dropdown', dropdownSchema);