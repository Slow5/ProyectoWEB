const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    titulo: {type: String, require: true},
    descripcion: {type: String, require: true},
    precio: {type: String, require: true}
});

module.exports = mongoose.model('Menu', postSchema); 
