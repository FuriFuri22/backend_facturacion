const mongoose = require('mongoose');

const celularesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    romMemory:{
        type: String,
        required: false
    },
    ramMemory:{
        type: String,
        required: false
    },
    priceUsd:{
        type: Number,
        required: false,
        default: 0
    }
});

const Celulares = mongoose.model('Celulares', celularesSchema);

module.exports = Celulares