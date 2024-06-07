const Product = require('../models/productModel');
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

const uploadProducts = async (req, res) => {
    try {
        const filePath = req.file.path;
        const rows = await readXlsxFile(filePath);

        // La primera fila contiene los encabezados
        rows.shift();

        const products = rows.map(row => ({
            name: row[0],
            quality: row[1],
            price: parseFloat(row[2]),
            type: row[3],
            model: row[4]
        }));

        await Product.insertMany(products);
        fs.unlinkSync(filePath); // Eliminar el archivo después de procesarlo

        res.status(201).json({ message: 'Products uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading products', error });
    }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

module.exports = {
    uploadProducts,
    getAllProducts,
    getProductById,
    updateProduct
};
