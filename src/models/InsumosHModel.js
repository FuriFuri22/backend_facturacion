const mongoose = require('mongoose');

const insumosHSchema = new mongoose.Schema({
name:{
    type: String,
    required: false
},
marca: {
    type: String,
    required: false
},
price:{
    type: Number,
    required: false,
    default: 0
},
priceUsd: {
    type:Number,
    required: false,
    default: 0
}
});

const InsumosH = mongoose.model('InsumosH', insumosHSchema);

module.exports = InsumosH