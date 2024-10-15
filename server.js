//Dependencias
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const videoRoutes = require('./routes/videoRoutes')

//Configurar dotenv para manejar variables de entorno
dotenv.config()

//Crear la aplicación Express
const app = express()

//Middleware para parsear JSON
app.use(express.json())

//Puerto del servidor
const PORT = process.env.PORT || 5000

//Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('conectado a MongoDB'))
    .catch((err) => console.log('error conectando a MongoDB: ', err.message))

//Rutas
app.use('/api/users', userRoutes)
app.use('/api/videoRoutes', videoRoutes)

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})