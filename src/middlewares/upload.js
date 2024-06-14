const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define la carpeta donde se almacenarán los archivos subidos
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Verifica si la carpeta existe, si no, la crea
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Se crea una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

module.exports = upload;
