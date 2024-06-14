const Repuesto = require('../models/RepuestoModel');
const Accesorios = require('../models/AccesoriosModel');
const Celulares = require('../models/CelularesModel');
const InsumosH = require('../models/InsumosHModel')
const parsersF = require('../helpers/parserProducts')
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx')



const uploadProducts = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);

        const sheetNames = workbook.SheetNames;

        const parsers = {
            'Repuestos': parsersF.parseRepuestos,
            'Insumos y Herramientas': parsersF.parseInsumosH,
            'Celulares y Tablets': parsersF.parseCelulares,
            'Accesorios Mayorista': parsersF.parseAccesorios,
        };

        const models = {
            'Repuestos': Repuesto,
            'Insumos y Herramientas': InsumosH,
            'Celulares y Tablets': Celulares,
            'Accesorios Mayorista': Accesorios,
        };

        for (const sheetName of sheetNames) {
            const trimmedSheetName = sheetName.trim();
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
            
            const parser = parsers[trimmedSheetName];
            const model = models[trimmedSheetName];
            
            if (parser && model) {
                const productsToInsert = parser(data);

                // Verificar que los productos no sean nulos ni indefinidos
                const filteredProducts = productsToInsert.filter(product => product.name);

                await model.insertMany(filteredProducts);
            }
        }

        res.status(200).send({ message: 'Productos subidos exitosamente' });
    } catch (error) {
        console.error(`Error uploading products: ${error}`);
        res.status(500).send({ message: 'Error subiendo productos', error });
    }
};


// Obtener todos los productos de un modelo específico
const getAllProducts = (model) => async (req, res) => {
    try {
        const products = await model.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

// Obtener un producto por ID de un modelo específico
const getProductById = (model) => async (req, res) => {
    try {
        const product = await model.findById(req.params.id);
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
