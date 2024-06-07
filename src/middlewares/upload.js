const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
    
    // Se define la carpeta donde se almacenarán los archivos subidos
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // Se define el nombre del archivo subido
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Se crea una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

module.exports = upload;
