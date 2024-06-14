const express = require('express');
const router = express.Router();
const {uploadProducts, getAllProducts, getProductById } = require('../controllers/productController');
const upload = require('../middlewares/upload');
const Repuestos = require('../models/RepuestoModel');
const InsumosH = require('../models/InsumosHModel');
const Celulares = require('../models/CelularesModel');
const Accesorios = require('../models/AccesoriosModel');

// Ruta para subir productos
router.post('/upload', upload.single('file'), uploadProducts);

// Rutas para Repuestos
router.get('/repuestos', getAllProducts(Repuestos));
router.get('/repuestos/:id', getProductById(Repuestos));

// Rutas para Insumos y Herramientas
router.get('/insumos', getAllProducts(InsumosH));
router.get('/insumos/:id', getProductById(InsumosH));

// Rutas para Celulares y Tablets
router.get('/celulares', getAllProducts(Celulares));
router.get('/celulares/:id', getProductById(Celulares));

// Rutas para Accesorios
router.get('/accesorios', getAllProducts(Accesorios));
router.get('/accesorios/:id', getProductById(Accesorios));

module.exports = router;
