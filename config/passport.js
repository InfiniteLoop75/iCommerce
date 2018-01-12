const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/user');
passport.serializeUser(function(user, done){
    done(null, user._id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({email: email},function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }
        if(!user){
            console.log('No such user found');
            return done(null, false, req.flash('loginMessage', 'Failed to login. No such user'));
        }
        if(!user.comparePassword(password)){
            console.log('Password mismash');
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password mate'));
        }
        console.log('success');
        return done(null, user);
    });
}));
exports.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        console.log('authenticated');
        return next();
    }
        console.log('Not authenticated');
        res.redirect('/login');
      
};