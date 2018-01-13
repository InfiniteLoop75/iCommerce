const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    },
    name: String,
    price: Number,
    image: String
});

var Product = mongoose.model('Product', ProductSchema);
module.exports = {
    Product
}