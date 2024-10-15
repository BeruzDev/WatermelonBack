require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Conectarse a la base de datos MongoDB usando la URL desde el archivo .env
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Conectado a MongoDB');
        crearAdmin();  // Llamamos a la función para crear el usuario administrador
    })
    .catch((error) => {
        console.error('Error conectando a MongoDB:', error);
    });

// Crear usuario administrador
const crearAdmin = async () => {
    try {
        const admin = new User({
            username: 'RollerBoy',
            email: 'juanjoselanchazo@hotmail.com',
            password: 'RollerBoy1234',  // Se encriptará automáticamente por el middleware en el modelo
            isAdmin: true
        });

        await admin.save();  // Guardamos el administrador en la base de datos
        console.log('Usuario administrador creado exitosamente.');
        mongoose.connection.close();  // Cerrar conexión a MongoDB después de crear el admin
    } catch (error) {
        console.error('Error creando el administrador:', error);
    }
};
