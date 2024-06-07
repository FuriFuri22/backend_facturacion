const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    quality: String,
    price: Number,
    type: String,
    model: String
});

module.exports = mongoose.model('Product', productSchema);
