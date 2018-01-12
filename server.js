const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {User} = require('./models/user');
var app = express();

mongoose.connect('mongodb://localhost:27017/iCommerce', {useMongoClient: true});

app.get('/test', (req,res)=>{
    var user = new User({
        email: 'ibrohim@emai.com',
        password: '1ogizon10'
    });
    user.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
    
});
app.use(morgan('dev'));
app.get('/', (req, res)=>{
    var obj = {name: 'ibrokhim', age: 22, married: false};
    res.json(obj);
});
app.listen(3000, (err)=>{
    if(err) throw err;
    console.log('Server is running');
});