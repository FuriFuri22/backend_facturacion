const parsers = {};

// Parser para la hoja de Repuestos
const KEYWORDS = ['SAMSUNG', 'MOTOROLA', 'LG', 'IPHONE', 'HUAWEI', 'Xiaomi'];

parsers.parseRepuestos = (data) => {
    let products = [];
    let currentCategory = null;
    let startProcessing = false;
    let currentBrand = null;
    let columnRanges = {
        SAMSUNG: [0, 9], // Columnas A a J
        MOTOROLA: [11, 20], // Columnas L a U
        LG: [11, 20], // Columnas L a U
        IPHONE: [0, 9], // Columnas A a J
        HUAWEI: [11, 20],// Columnas L a U
        Xiaomi: [0, 9] //Columnas A a J
    };

    data.forEach((row, rowIndex) => {
        // Busca la categoría primero
        if (row.some(cell => typeof cell === 'string' && cell.match(/\bMODULOS\b|\bBATERIAS\b|\bPLACAS DE CARGA\b|\bDISPLAYS\b|\bTOUCHS\b|\bVISORES DE CAMARA\b|\bPINES DE CARGA\b/i))) {
            currentCategory = row.find(cell => typeof cell === 'string' && cell.match(/\bMODULOS\b|\bBATERIAS\b|\bPLACAS DE CARGA\b|\bDISPLAYS\b|\bTOUCHS\b|\bVISORES DE CAMARA\b|\bPINES DE CARGA\b/i)).trim();
            startProcessing = false; // Reinicia el procesamiento al encontrar una nueva categoría
        }
        
        // Si la categoría ya ha sido encontrada, busca las palabras clave
        if (currentCategory) {
            const foundKeyword = row.find(cell => typeof cell === 'string' && KEYWORDS.some(keyword => cell.toUpperCase().includes(keyword.toUpperCase())));
            if (foundKeyword) {
                currentBrand = KEYWORDS.find(keyword => foundKeyword.toUpperCase().includes(keyword.toUpperCase()));
                startProcessing = true;  // Inicia el procesamiento al encontrar una palabra clave
            }

            // Si está en modo de procesamiento, añade los productos
            if (startProcessing && currentBrand && columnRanges[currentBrand]) {
                if (row.every(cell => cell === null || cell === undefined || cell.toString().trim() === '')) {
                    startProcessing = false; // Detiene el procesamiento al encontrar una fila vacía
                } else {
                    const [startCol, endCol] = columnRanges[currentBrand];
                    const rowData = row.slice(startCol, endCol + 1);
                    if (rowData[0] && !isNaN(rowData[2])) {
                        const [name, quality, priceGremy, priceUsd, priceMini3Unidades, priceUsdMini3Unid] = rowData;
                        products.push({
                            name: name ? name.trim() : null,
                            quality: quality ? quality.toString().trim() : null,
                            priceGremy: parseFloat(priceGremy),
                            priceUsd: priceUsd ? parseFloat(priceUsd) : null,
                            priceMini3Unidades: priceMini3Unidades ? parseFloat(priceMini3Unidades) : null,
                            priceUsdMini3Unid: priceUsdMini3Unid ? parseFloat(priceUsdMini3Unid) : null,
                            category: currentCategory,
                            brand: currentBrand
                        });
                    }
                }
            }
        }
    });

    return products;
};

// Parser para la hoja de Insumos y Herramientas
parsers.parseInsumosH = (data) => {
    let products = [];
    let startProcessing = false;

    data.forEach(row => {
        if (row.some(cell => typeof cell === 'string' && cell.match(/\bHERRAMIENTAS\b/))) {
            startProcessing = true;  // Inicia el procesamiento después de encontrar la categoría
        } else if (startProcessing && row[0] && row[1] && !isNaN(row[2]) && !isNaN(row[3])) {
            const [name, marca, price, priceUsd] = row;
            products.push({
                name: name ? name.trim() : null,
                marca: marca ? marca.trim() : null,
                price: price ? parseFloat(price) : 0,
                priceUsd: priceUsd ? parseFloat(priceUsd) : 0
            });
        }
    });

    return products;
};

// Parser para la hoja de Celulares y Tablets
parsers.parseCelulares = (data) => {
    let products = [];
    let startProcessing = false;

    data.forEach(row => {
        if (row.some(cell => typeof cell === 'string' && cell.match(/\bCelulares\b/))) {
            startProcessing = true;  // Inicia el procesamiento después de encontrar la categoría
        } else if (startProcessing && row[0] && row[1] && row[2] && !isNaN(row[3])) {
            const [name, romMemory, ramMemory, priceUsd] = row;
            products.push({
                name: name ? name.trim() : null,
                romMemory: romMemory ? romMemory.trim() : null,
                ramMemory: ramMemory ? ramMemory.trim() : null,
                priceUsd: priceUsd ? parseFloat(priceUsd) : 0
            });
        }
    });

    return products;
};


// Parser para la hoja de Accesorios
parsers.parseAccesorios = (data) => {
    let products = [];
    let startProcessing = false;

    data.forEach(row => {
        if (row.some(cell => typeof cell === 'string' && cell.match(/\bAccesorios\b/))) {
            startProcessing = true;  // Inicia el procesamiento después de encontrar la categoría
        } else if (startProcessing && row[0] && !isNaN(row[1]) && !isNaN(row[2])) {
            const [name, price, priceUsd] = row;
            products.push({
                name: name ? name.trim() : null,
                price: price ? parseFloat(price) : 0,
                priceUsd: priceUsd ? parseFloat(priceUsd) : 0
            });
        }
    });

    return products;
};


module.exports = parsers;
