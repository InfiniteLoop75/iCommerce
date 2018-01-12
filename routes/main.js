const express = require('express');
var indexRouter = express.Router();
indexRouter.get('/', function(req, res) {
    res.render('main/home');
});
indexRouter.get('/about', function(req, res){
    res.render('main/about');
});

module.exports = {indexRouter};