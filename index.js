const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Connect database
mongoose.connect('mongodb+srv://nikhilhore:Pratik204@cluster0.dgkl7.mongodb.net/kisaan?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const { Census } = require('./models/Census');
const { Demand } = require('./models/Demand');
const { Supply } = require('./models/Supply');

// static resources
app.use('/assets', express.static(__dirname + '/public'));

// View Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET request handlers
app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/insights', (req, res) => {
    res.render('insights');
});

app.get('/demand', (req, res) => {
    res.render('demand');
});

app.get('/supply', (req, res) => {
    res.render('supply');
});

app.get('/census', async (req, res) => {
    const census = await Census.find();
    res.json(census);
});

// POST request handlers
app.post('/insights', async (req, res) => {
    const demandList = await Demand.find({
        state: req.body.state,
        district: req.body.district,
        sub_district: req.body.subDistrict
    });
    const supplyList = await Supply.find({
        state: req.body.state,
        district: req.body.district,
        sub_district: req.body.subDistrict
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

app.post('/demand', async (req, res) => {
    const data = {
        state: req.body.state,
        district: req.body.district,
        sub_district: req.body.subDistrict,
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

app.post('/supply', async (req, res) => {
    const data = {
        state: req.body.state,
        district: req.body.district,
        sub_district: req.body.subDistrict,
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

app.listen(port, () => {
    console.log(`Kisaan Crop Suggestor is live on port ${port}..!`);
});