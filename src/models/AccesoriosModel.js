const mongoose = require('mongoose');

const accesoriosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    priceUsd: {
        type: Number,
        required: true
    }
})

const Accesorios = mongoose.model('Accesorios', accesoriosSchema);

module.exports = Accesorios