const express = require('express');
const { uploadProducts, getAllProducts, getProductById, updateProduct } = require('../controllers/productController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/upload', upload.single('file'), uploadProducts);

router.get('/', getAllProducts);

// Ruta para obtener un producto por ID
router.get('/:id', getProductById);

// Ruta para actualizar un producto
router.put('/:id', updateProduct);


module.exports = router;
