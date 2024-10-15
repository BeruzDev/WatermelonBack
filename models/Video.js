const mongoose = require('mongoose')

//Modelo para las tarjetas de video
const videoSchema = new mongoose.Schema({
    videoUrl: { type: String, required: true },
    description: { type: String, required: true },
    spot: { type: String, required: true },
})

module.exports = mongoose.model('Video', videoSchema)