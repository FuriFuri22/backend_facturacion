const mongoose = require('mongoose');

const repuestoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quality: { type: String, required: false },
  priceGremy: { type: Number, required: true, default: 0 },
  priceUsd: { type: Number, required: false },
  priceMini3Unidades: { type: Number, required: false },
  priceUsdMini3Unid:{type: Number, rquired:false},
  category: {type: String, required: true}
});

const Repuesto = mongoose.model('Repuesto', repuestoSchema);

module.exports = Repuesto;
