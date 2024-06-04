const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Conectar a MongoDB Atlas
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB Atlas');
}).catch((error) => {
  console.error('Error al conectar a MongoDB Atlas', error);
});

// Ruta de ejemplo
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hola desde el backend!' });
});

app.use('api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});