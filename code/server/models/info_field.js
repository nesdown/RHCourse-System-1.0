const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoFieldSchema = new Schema({
    ru: {
        type: String,
        required: true
    },
    ua: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('InfoField', infoFieldSchema);