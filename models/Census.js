const mongoose = require('mongoose');

const censusSchema = mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    sub_district: {
        type: String,
        required: true
    }
});

const Census = new mongoose.model('Census', censusSchema);

module.exports = { Census };