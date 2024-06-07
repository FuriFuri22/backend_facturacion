const express = require('express');
const cors = require('cors');
const connectDB = require("./src/db/db")
const productRoutes = require('./src/routes/productRoutes')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Conectar a MongoDB Atlas
connectDB();

// Ruta de ejemplo
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

app.use('api/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});