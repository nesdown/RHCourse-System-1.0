const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formulaSchema = new Schema({
    halfyear: {
        type: Number,
        required: true
    },
    fullyear: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Formula', formulaSchema);

