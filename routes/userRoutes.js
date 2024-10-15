const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware.js')

//Ruta protegida para crear un usuario administrador
router.post('/create-admin', verifyToken, isAdmin, async (req, res) => {
    const { username, email, password } = req.body
    try {
        const newAdmin = new User({
            username,
            email,
            password,
            isAdmin: true
        })
        await newAdmin.save()
        res.status(201).json({ message: 'Administrador creado con éxito.' })
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el administrador.' })
    }
})

//Ruta para registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try{
        const newUser = new User({
            username, 
            email, 
            password 
        })
        await newUser.save()
        res.status(201).json({ message: 'Usuario registrado con éxito.' })
    }catch(error){
        res.status(400).json({ error: 'Error al registrar el usuario' })
    }
})

//Ruta para inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if(!user) return res.status(404).json({ error: 'Usuario no encontrado' })

        console.log('Usuario encontrado:', user);

        const isMatch = await user.comparePassword(password)
        
        console.log('¿Coincide la contraseña?', isMatch);

        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' })   
            
        //Generar token
        const token = jwt.sign({ id: user._id }, 'tu_secreto_jwt', { expiresIn: '1h'})
        res.json({ 
            token,
            user: { 
                id:user._id,
                username: user.username,
                isAdmin: user.isAdmin
            }
        })
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el inicio de sesión.'})
    }
})

//Ruta para recuperar todos los usuarios
router.get('/getUsers', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({error: 'Error al recuperar los usuarios'})
    }
})

//Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.json({ message: 'Usuario Eliminado' })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router