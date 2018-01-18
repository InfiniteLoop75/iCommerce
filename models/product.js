const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    },
    name: String,
    price: Number,
    image: String
});
ProductSchema.plugin(mongoosastic, {
    hosts:[
        'localhost:9200'
    ]
});
/**
 * 
 */
var Product = mongoose.model('Product', ProductSchema);
module.exports = {
    Product
}