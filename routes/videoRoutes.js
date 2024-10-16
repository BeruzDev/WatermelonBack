const express = require('express')
const router = express.Router()
const Video = require('../models/Video')

//Rutas

//Obtener todos los videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find()
        res.json(videos)
    } catch (err) {
        res.status(500).json({ err: 'Error al obtener los videos.' })
    }
})

//Obtener un video por ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return res.status(404).json({ message: 'Video no encontrado' })
        res.json(video)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Guardar un nuevo video
router.post('/', async (req, res) => {
    const video = new Video({
        description: req.body.description,
        videoUrl: req.body.videoUrl,
        spot: req.body.spot,
    })
    try {
        const nuevoVideo = await video.save()
        res.status(201).json(nuevoVideo)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Actualizar un video
router.put('/:id', async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!video) return res.status(404).json({ message: 'Video no encontrado' })
        res.json(video)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Eliminar un video
router.delete('/:id', async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id)
        if(!video) return res.status(404).json({ message: 'Video no encontrado' })
        res.json({ message: 'Video eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router