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

// POST request handlers
router.post('/insights', async (req, res) => {
    const demand = await Demand.aggregate([
        {
            $match: {
                state: req.body.state,
                district: req.body.district,
                subDistrict: req.body.subDistrict
            }
        },
        {
            $group: {
                _id: null,
                cotton: { $sum: "$cotton" },
                sugarcane: { $sum: "$sugarcane" },
                jowar: { $sum: "$jowar" },
                wheat: { $sum: "$wheat" },
                turmeric: { $sum: "$turmeric" },
                soyabean: { $sum: "$soyabean" }
            }
        }
    ]);

    const supply = await Supply.aggregate([
        {
            $match: {
                state: req.body.state,
                district: req.body.district,
                subDistrict: req.body.subDistrict
            }
        },
        {
            $group: {
                _id: null,
                cotton: { $sum: "$cotton" },
                sugarcane: { $sum: "$sugarcane" },
                jowar: { $sum: "$jowar" },
                wheat: { $sum: "$wheat" },
                turmeric: { $sum: "$turmeric" },
                soyabean: { $sum: "$soyabean" }
            }
        }
    ]);

    res.send({ demands: demand[0], supplies: supply[0] });
});

router.post('/demand', async (req, res) => {

    const duns = req.body.id;
    delete req.body.id;
    const data = { duns, ...req.body }

    const demand = await new Demand(data).save();
    res.status(201).json(demand);
});

router.post('/supply', async (req, res) => {

    const aadhar = req.body.id;
    delete req.body.id;
    const data = { aadhar, ...req.body }

    const supply = await new Supply(data).save();
    res.status(201).json(supply);
});

module.exports = router;