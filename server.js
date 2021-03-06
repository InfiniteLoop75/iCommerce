const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
//Custom modules
const {User} = require('./models/user');
const {Category} = require('./models/category');
const {indexRouter} = require('./routes/main');
const {userRouter} = require('./routes/user');
const {apiRouter} = require('./api/api');
const {adminRouter} = require('./routes/admin');
const {database, port, secretKey} = require('./config/secret');
//Finishing import
var app = express();
var publicPath = __dirname + '/public';
app.use(express.static(publicPath));
mongoose.connect(database, {
    useMongoClient: true
});
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: secretKey, 
    store: new MongoStore({url: database, autoReconnect: true}),
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});
app.use(function(req,res,next){
    Category.find({}, function(err,categories){
        if(err) return next(err);
        res.locals.categories = categories;
        next();
    });
});

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(indexRouter);
app.use(userRouter);
app.use(adminRouter);
app.use('/api',apiRouter);
app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server is running');
});