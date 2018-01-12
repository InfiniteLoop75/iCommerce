const express = require('express');
const {User} = require('../models/user');
var userRouter = express.Router();
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

module.exports = {userRouter}