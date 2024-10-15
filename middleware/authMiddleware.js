const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: 'Acceso denegado. token no proporcionado.' })

    try {
        const verified = jwt.verify(token, 'tu_secreto_jwt')
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).json({ error: 'Token no válido.' })
    }
}

const isAdmin = (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).json({ error: 'Acceso denegado. No eres administrador.' })
    }
    next()
}

module.exports = { verifyToken, isAdmin }