const express = require('express');
const {Product} = require('../models/product');
var indexRouter = express.Router();
var mongosastic = require('mongoosastic');
Product.createMapping(function(err, mapping){
    if(err){
        console.log('error creating mapping');
        console.log(err);
    }else{
        console.log(mapping);
        console.log("mapping created");
    }
});
var stream = Product.synchronize();
var count = 0;
stream.on('data', function(){
    count++;
});
stream.on('close', function(){
    console.log("Indexed " + count + " documents");
});
stream.on('error', function(err){
    console.error(error);
    
});

indexRouter.post('/search', function(req, res){
    res.redirect('/search?q=' + req.body.q);
});

indexRouter.get('/', function(req, res) {
    res.render('main/home');
});
indexRouter.get('/about', function(req, res, next){
    res.render('main/about');
});
indexRouter.get('/search', function(req, res, next){
     if(req.query.q){
         Product.search({
             query_string: {query: req.query.q}
         }, function(err, results){
            if(err) return next(err);
            var data = results.hits.hits.map(function(hit){
                return hit;
            });
            res.render('main/search-results', {
                query: req.query.q,
                data
            });
         });
     }
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