const express = require('express');
const {User} = require('../models/user');
const passport = require('passport');
const passportConfig = require('../config/passport');
var userRouter = express.Router();


userRouter.get('/login', function(req, res){
    if(req.user) return res.redirect('/profile');
    res.render('accounts/login', {message: req.flash('loginMessage')});    
});
userRouter.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));
userRouter.get('/profile', function(req, res){
    if(req.user){
        User.findOne({_id: req.user._id}, function(err, user){
            if(err) return next(err);
            res.render('accounts/profile', {user});
        });
    }else{
        res.redirect('/login');
    }
    
});
userRouter.get('/signup', (req, res)=>{
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});
userRouter.post('/signup', function(req, res, next){
    var user = new User({
        profile: {
            name: req.body.name
        },
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email: user.email}, function(err, found){
        if(found){
            req.flash('errors', 'Account with email address already exists')
            //res.status(401).send('This user already exist');
            return res.redirect('/signup');
        }else{
            user.save(function(err, user){
                if(err){
                    return next(err);
                }
                return res.redirect('/');
            });
        }
    });

});
userRouter.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});
module.exports = {userRouter}