const mongoose = require('mongoose');

const demandSchema = mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    subDistrict: {
        type: String,
        required: true
    },
    duns: {
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

const Demand = new mongoose.model('Demand', demandSchema);

module.exports = { Demand };