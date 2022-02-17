const express = require('express');
const router = express.Router();

const { Census } = require('../models/Census');
const { Demand } = require('../models/Demand');
const { Supply } = require('../models/Supply');

// GET request handlers
router.get('/', (req, res) => {
    res.render('welcome');
});

router.get('/insights', (req, res) => {
    res.render('insights');
});

router.get('/demand', (req, res) => {
    res.render('demand');
});

router.get('/supply', (req, res) => {
    res.render('supply');
});

// Census request handlers

router.get('/states', async (req, res) => {
    const states = await Census.collection.distinct('state');
    res.send(states);
});

router.post('/districts', async (req, res) => {
    const districts = await Census.collection.distinct('district', { state: req.body.state });
    res.send(districts);
});

router.post('/subDistricts', async (req, res) => {
    const subDistricts = await Census.collection.distinct('subDistrict', { state: req.body.state, district: req.body.district });
    res.send(subDistricts);
});

// router.get('/census', async (req, res) => {
//     const census = await Census.find();
//     res.json(census);
// });

// POST request handlers
router.post('/insights', async (req, res) => {
    const demandList = await Demand.find({
        state: req.body.state,
        district: req.body.district,
        subDistrict: req.body.subDistrict
    });
    const supplyList = await Supply.find({
        state: req.body.state,
        district: req.body.district,
        subDistrict: req.body.subDistrict
    });
    const demands = {
        cotton: 0,
        sugarcane: 0,
        jowar: 0,
        wheat: 0,
        turmeric: 0,
        soyabean: 0,
    };
    const supplies = {
        cotton: 0,
        sugarcane: 0,
        jowar: 0,
        wheat: 0,
        turmeric: 0,
        soyabean: 0,
    };
    demandList.forEach(demand => {
        demands.cotton += demand.cotton;
        demands.sugarcane += demand.sugarcane;
        demands.jowar += demand.jowar;
        demands.wheat += demand.wheat;
        demands.turmeric += demand.turmeric;
        demands.soyabean += demand.soyabean;
    });
    supplyList.forEach(supply => {
        supplies.cotton += supply.cotton;
        supplies.sugarcane += supply.sugarcane;
        supplies.jowar += supply.jowar;
        supplies.wheat += supply.wheat;
        supplies.turmeric += supply.turmeric;
        supplies.soyabean += supply.soyabean;
    });
    res.json({ demands, supplies });
});

router.post('/demand', async (req, res) => {
    const data = {
        state: req.body.state,
        district: req.body.district,
        subDistrict: req.body.subDistrict,
        duns: req.body.id,
        cotton: req.body.cotton,
        sugarcane: req.body.sugarcane,
        jowar: req.body.jowar,
        wheat: req.body.wheat,
        turmeric: req.body.turmeric,
        soyabean: req.body.soyabean
    }

    const demand = await new Demand(data).save();
    res.status(201).json(data);
});

router.post('/supply', async (req, res) => {
    const data = {
        state: req.body.state,
        district: req.body.district,
        subDistrict: req.body.subDistrict,
        aadhar: req.body.id,
        cotton: req.body.cotton,
        sugarcane: req.body.sugarcane,
        jowar: req.body.jowar,
        wheat: req.body.wheat,
        turmeric: req.body.turmeric,
        soyabean: req.body.soyabean
    }
    const supply = await new Supply(data).save();
    res.status(201).json(data);
});

module.exports = router;