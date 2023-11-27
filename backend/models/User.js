const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}, 
    nombre: {type: String, require: true}, 
    apellido: {type: String, require: true},
    numero: {type: String, requiere: true},
    image: {type: String, requiere: true},
    usertype: {type: String, require: true}
});

module.exports = mongoose.model('Users', userSchema)
