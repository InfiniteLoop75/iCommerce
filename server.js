const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
//Custom modules
const {User} = require('./models/user');
const {indexRouter} = require('./routes/main');
const {userRouter} = require('./routes/user');
//Finishing import
var app = express();
var publicPath = __dirname + '/public';
app.use(express.static(publicPath));
mongoose.connect('mongodb://localhost:27017/iCommerce', {
    useMongoClient: true
});
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: "Ibrokhim@4144"}));
app.use(flash());

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(indexRouter);
app.use(userRouter);

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running');
});