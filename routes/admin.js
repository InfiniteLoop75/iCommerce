const adminRouter = require('express').Router();
const {Category} = require('../models/category');

adminRouter.get('/add-category', function(req,res,next){
    res.render('admin/add-category', {message: req.flash('success')});
});
adminRouter.post('/add-category', function(req,res,next){
    var category = new Category({
        name: req.body.name
    });
    category.save(function(err){
        if(err)return next(err);
        req.flash('success', 'Successfully added a category');
        return res.redirect('/add-category');
    });
});