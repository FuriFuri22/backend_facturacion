const mongoose = require('mongoose');

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://canesinfranco7:Bclk2EDpK9F8J9Zq@cluster0.rdct6x6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
  }
};

module.exports = connectDB;