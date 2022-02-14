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

// static resources
app.use('/assets', express.static(__dirname + '/public'));

// View Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/main'));

app.listen(port, () => {
    console.log(`Kisaan Crop Suggestor is live on port ${port}..!`);
});