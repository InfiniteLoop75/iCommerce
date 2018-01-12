const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const path = require('path');
//Custom modules
const {
    User
} = require('./models/user');
//Finishing import
var app = express();
// var publicPath = path.join(__dirname, './public');
mongoose.connect('mongodb://localhost:27017/iCommerce', {
    useMongoClient: true
});
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
// app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/test', (req, res, next) => {
    var user = new User({
        profile: {
            name: req.body.name
        },
        email: req.body.email,
        password: req.body.password
    });
    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
        console.log(e);
    });

});
app.use(morgan('dev'));

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running');
});