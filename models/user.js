const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    profile: {
        name: {
            type: String,
            default: 'User'
        },
        picture: {
            type: String,
            default: ''
        },
        address: String,
        history: [{
            date: Date,
            paid:{type: Number, default: 0},
            item: {type: mongoose.Schema.Types.ObjectId, ref: ''}
        }]
    }
});

UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null,function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User', UserSchema);
module.exports = {
    User
};