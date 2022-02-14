const mongoose = require('mongoose');

const supplySchema = mongoose.Schema({
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
    },
    aadhar: {
        type: Number,
        required: true
    },
    cotton: {
        type: Number,
        required: true,
        default: 0
    },
    sugarcane: {
        type: Number,
        required: true,
        default: 0
    },
    jowar: {
        type: Number,
        required: true,
        default: 0
    },
    wheat: {
        type: Number,
        required: true,
        default: 0
    },
    turmeric: {
        type: Number,
        required: true,
        default: 0
    },
    soyabean: {
        type: Number,
        required: true,
        default: 0
    }
});

const Supply = new mongoose.model('Supply', supplySchema);

module.exports = { Supply };