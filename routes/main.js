const express = require('express');
const {Product} = require('../models/product');
var indexRouter = express.Router();

indexRouter.get('/', function(req, res) {
    res.render('main/home');
});
indexRouter.get('/about', function(req, res){
    res.render('main/about');
});
indexRouter.get('/products/:id', function(req,res,next){
    Product
    .find({category: req.params.id})
    .exec(function(err, products){
        if(err) return next(errr);
        res.render('main/category', {
            products
        });
    });
});

indexRouter.get('/product/:id', function(req,res,next){
    Product.findById({_id: req.params.id}, function(err, product){
        if(err) return next(err);
        res.render('main/product', {
            product
        });
    });
});
module.exports = {indexRouter};