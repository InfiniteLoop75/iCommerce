const apiRouter = require('express').Router();
const async = require('async');
const faker = require('faker');

const {Category} = require('../models/category');
const {Product} = require('../models/product');


apiRouter.get('/:name', function(req,res,next){
    async.waterfall([
        function(callback){
            Category.findOne({name: req.params.name}, function(err,category){
                if(err)  {
                    console.log(err);
                    return next(err);
                }
                callback(null, category);
            });
        },
        function(category, callback){
            for(var i = 0; i<30; i++){
                var product = new Product();
                product.category = category._id;
                product.name = faker.commerce.productName();
                product.price = faker.commerce.price();
                product.image = faker.image.image();
                product.save().then((product)=>{
                    console.log(product);
                });
            }
        }
    ]);
    res.json({message: 'Success'});
});

module.exports = {apiRouter}