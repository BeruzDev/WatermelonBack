const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Modelo para almacenar usuarios
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false}
})

//Middleware para encriptar la password antes de guardarla
userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

//Método para comparar passwords
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)